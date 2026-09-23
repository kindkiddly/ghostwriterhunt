import { NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * GhostWriterHunt — Chat: send a message
 * Single-call replacement for the old /api/chat/start + client-side
 * messages insert. In one server-side step: verifies the visitor,
 * creates the conversation if none is open (with Vercel geo headers),
 * links/creates the contact if name/email were given, and saves the
 * message — so a conversation can never exist without its first message.
 * The new-chat alert email is fired with waitUntil so it never blocks
 * the response.
 */

const MAX_NEW_CONVERSATIONS_PER_HOUR = 3;
const MAX_MESSAGES_PER_CONVERSATION_PER_MINUTE = 20;
const MAX_MESSAGE_LENGTH = 4000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendNewChatAlert({ name, email, country, firstMessage }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("chat/send: RESEND_API_KEY not set, skipping new chat alert email");
    return;
  }

  const rows = [
    name && ["Name", name],
    email && ["Email", email],
    country && ["Country", country],
  ].filter(Boolean);

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;color:#1C1C1C;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#333333;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
    <h2 style="color:#1C1C1C;">New live chat started</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">${rowsHtml}</table>
    <p style="font-weight:600;color:#1C1C1C;margin:0 0 4px;">First message</p>
    <p style="color:#333333;white-space:pre-wrap;margin:0;">${escapeHtml(firstMessage)}</p>
  </div>`;

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "First message:",
    firstMessage,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "GhostWriterHunt Chat <noreply@lumexforge.com>",
      to: "ghostwriterhunt@lumexforge.com",
      subject: "New live chat started — GhostWriterHunt",
      html,
      text,
    });
    if (error) console.error("chat/send: Resend error", error);
  } catch (err) {
    console.error("chat/send: failed to send new chat alert", err);
  }
}

/**
 * Finds a contact by email, creating one if it doesn't exist yet.
 * Returns the contact id, or null if it couldn't be resolved.
 */
async function resolveOrCreateContact(admin, name, email) {
  const { data: newContact, error: contactError } = await admin
    .from("contacts")
    .insert({ name: name || null, email, source: "chat" })
    .select("id")
    .single();

  if (newContact) return newContact.id;

  if (contactError?.code === "23505") {
    const { data: race } = await admin.from("contacts").select("id").eq("email", email).maybeSingle();
    return race?.id || null;
  }

  if (contactError) console.error("chat/send: failed to create contact", contactError);
  return null;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { accessToken, name, email, content, conversationId: clientConversationId } = body || {};

  if (!accessToken || typeof accessToken !== "string") {
    return NextResponse.json({ error: "Missing access token" }, { status: 401 });
  }
  const trimmedContent = typeof content === "string" ? content.trim().slice(0, MAX_MESSAGE_LENGTH) : "";
  if (!trimmedContent) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }
  if (email && (typeof email !== "string" || !EMAIL_REGEX.test(email.trim()))) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedEmail = typeof email === "string" ? email.trim() : "";

  const admin = createAdminClient();

  // Verifying the visitor and looking up a contact by email don't depend
  // on each other — run them concurrently instead of back-to-back.
  const [{ data: userData, error: userError }, contactByEmailResult] = await Promise.all([
    admin.auth.getUser(accessToken),
    trimmedEmail
      ? admin.from("contacts").select("id, email").eq("email", trimmedEmail).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
  const visitorId = userData.user.id;

  // Fast path: the client already knows its open conversation id (every
  // message after the first) — one targeted, indexed lookup instead of
  // scanning recent conversations.
  let conversation = null;
  if (clientConversationId && typeof clientConversationId === "string") {
    const { data: knownConv } = await admin
      .from("conversations")
      .select("id, contact_id, status, country")
      .eq("id", clientConversationId)
      .eq("visitor_id", visitorId)
      .maybeSingle();
    if (knownConv && knownConv.status === "open") conversation = knownConv;
  }

  // Cold path (first message, or the known conversation wasn't usable):
  // one query covers both "does an open conversation already exist" and
  // "how many new ones in the last hour" (rate limit), instead of two.
  let newConversationsLastHour = 0;
  if (!conversation) {
    const { data: recentConvs } = await admin
      .from("conversations")
      .select("id, contact_id, status, country, created_at")
      .eq("visitor_id", visitorId)
      .order("created_at", { ascending: false })
      .limit(20);

    conversation = (recentConvs || []).find((c) => c.status === "open") || null;
    const oneHourAgoMs = Date.now() - 60 * 60 * 1000;
    newConversationsLastHour = (recentConvs || []).filter(
      (c) => new Date(c.created_at).getTime() > oneHourAgoMs
    ).length;
  }

  let isNewConversation = false;
  let contactId = conversation?.contact_id || contactByEmailResult.data?.id || null;

  if (!conversation) {
    if (newConversationsLastHour >= MAX_NEW_CONVERSATIONS_PER_HOUR) {
      return NextResponse.json(
        { error: "Too many conversations started. Please try again shortly." },
        { status: 429 }
      );
    }

    if (!contactId && trimmedEmail) {
      contactId = await resolveOrCreateContact(admin, trimmedName, trimmedEmail);
    }

    const country = request.headers.get("x-vercel-ip-country") || null;
    const region = request.headers.get("x-vercel-ip-country-region") || null;

    const { data: newConv, error: convError } = await admin
      .from("conversations")
      .insert({ visitor_id: visitorId, country, region, contact_id: contactId })
      .select("id, contact_id, country")
      .single();

    if (convError || !newConv) {
      console.error("chat/send: failed to create conversation", convError);
      return NextResponse.json({ error: "Could not start conversation" }, { status: 500 });
    }
    conversation = newConv;
    isNewConversation = true;
  } else {
    // An existing conversation can't have violated the per-minute message
    // limit before its first message, so this only runs here.
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();
    const { count: recentMessageCount } = await admin
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("conversation_id", conversation.id)
      .gte("created_at", oneMinuteAgo);

    if ((recentMessageCount ?? 0) >= MAX_MESSAGES_PER_CONVERSATION_PER_MINUTE) {
      return NextResponse.json(
        { error: "Too many messages. Please slow down." },
        { status: 429 }
      );
    }

    if (!conversation.contact_id && !contactId && trimmedEmail) {
      contactId = await resolveOrCreateContact(admin, trimmedName, trimmedEmail);
    }
    if (contactId && contactId !== conversation.contact_id) {
      await admin.from("conversations").update({ contact_id: contactId }).eq("id", conversation.id);
    }
  }

  // A linked contact in this flow was always resolved by email, so its
  // presence alone means an email is on file — no extra lookup needed.
  const contactHasEmail = !!contactId;

  const { data: message, error: messageError } = await admin
    .from("messages")
    .insert({
      conversation_id: conversation.id,
      sender: "visitor",
      content: trimmedContent,
    })
    .select("id, created_at")
    .single();

  if (messageError || !message) {
    console.error("chat/send: failed to save message", messageError);
    // A conversation must never exist without its first message — if this
    // was a brand-new conversation, undo it rather than leaving it empty.
    if (isNewConversation) {
      await admin.from("conversations").delete().eq("id", conversation.id);
    }
    return NextResponse.json({ error: "Could not save message" }, { status: 500 });
  }

  if (isNewConversation) {
    waitUntil(
      sendNewChatAlert({
        name: trimmedName || null,
        email: trimmedEmail || null,
        country: conversation.country,
        firstMessage: trimmedContent,
      })
    );
  }

  return NextResponse.json(
    {
      conversationId: conversation.id,
      messageId: message.id,
      createdAt: message.created_at,
      contactHasEmail,
    },
    { status: isNewConversation ? 201 : 200 }
  );
}
