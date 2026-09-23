import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * GhostWriterHunt — Chat: start a conversation
 * Verifies the visitor's Supabase session, creates the conversation
 * server-side (with Vercel geo headers), links/creates a contact when an
 * email was given, and emails a new-chat alert. Runs on the service role
 * client so it can set country/region and read/write contacts, which are
 * otherwise admin-only under RLS.
 */

const MAX_NEW_CONVERSATIONS_PER_HOUR = 3;
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
    console.warn("chat/start: RESEND_API_KEY not set, skipping new chat alert email");
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
    if (error) console.error("chat/start: Resend error", error);
  } catch (err) {
    console.error("chat/start: failed to send new chat alert", err);
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { accessToken, name, email, firstMessage } = body || {};

  if (!accessToken || typeof accessToken !== "string") {
    return NextResponse.json({ error: "Missing access token" }, { status: 401 });
  }
  if (!firstMessage || typeof firstMessage !== "string" || !firstMessage.trim()) {
    return NextResponse.json({ error: "Missing first message" }, { status: 400 });
  }
  if (email && (typeof email !== "string" || !EMAIL_REGEX.test(email.trim()))) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const admin = createAdminClient();

  const { data: userData, error: userError } = await admin.auth.getUser(accessToken);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
  const visitorId = userData.user.id;

  // Idempotency: if the visitor already has an open conversation, reuse it
  // instead of creating a duplicate (e.g. a retried/duplicate client call).
  const { data: existingConv } = await admin
    .from("conversations")
    .select("id")
    .eq("visitor_id", visitorId)
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingConv) {
    return NextResponse.json({ conversationId: existingConv.id }, { status: 200 });
  }

  // Basic protection: max N new conversations per visitor per hour.
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await admin
    .from("conversations")
    .select("id", { count: "exact", head: true })
    .eq("visitor_id", visitorId)
    .gte("created_at", oneHourAgo);

  if ((count ?? 0) >= MAX_NEW_CONVERSATIONS_PER_HOUR) {
    return NextResponse.json(
      { error: "Too many conversations started. Please try again shortly." },
      { status: 429 }
    );
  }

  const country = request.headers.get("x-vercel-ip-country") || null;
  const region = request.headers.get("x-vercel-ip-country-region") || null;

  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedEmail = typeof email === "string" ? email.trim() : "";

  let contactId = null;
  if (trimmedEmail) {
    const { data: existingContact } = await admin
      .from("contacts")
      .select("id")
      .eq("email", trimmedEmail)
      .maybeSingle();

    if (existingContact) {
      contactId = existingContact.id;
    } else {
      const { data: newContact, error: contactError } = await admin
        .from("contacts")
        .insert({ name: trimmedName || null, email: trimmedEmail, source: "chat" })
        .select("id")
        .single();

      if (newContact) {
        contactId = newContact.id;
      } else if (contactError?.code === "23505") {
        // Unique-violation race: another request just inserted this email.
        const { data: raceContact } = await admin
          .from("contacts")
          .select("id")
          .eq("email", trimmedEmail)
          .maybeSingle();
        if (raceContact) contactId = raceContact.id;
      } else if (contactError) {
        console.error("chat/start: failed to create contact", contactError);
      }
    }
  }

  const { data: conversation, error: conversationError } = await admin
    .from("conversations")
    .insert({
      visitor_id: visitorId,
      contact_id: contactId,
      country,
      region,
    })
    .select("id")
    .single();

  if (conversationError || !conversation) {
    console.error("chat/start: failed to create conversation", conversationError);
    return NextResponse.json({ error: "Could not start conversation" }, { status: 500 });
  }

  await sendNewChatAlert({
    name: trimmedName || null,
    email: trimmedEmail || null,
    country,
    firstMessage: firstMessage.trim(),
  });

  return NextResponse.json({ conversationId: conversation.id }, { status: 201 });
}
