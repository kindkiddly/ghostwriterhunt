import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ensureValidEmail } from "@/lib/validation/email.server";

/**
 * GhostWriterHunt — Chat widget intake (before live chat or follow-up-only).
 * live: link contact + open conversation (no message yet).
 * followup: contact + conversation + callback queue + first message (no AI).
 */

const MAX_MESSAGE_LENGTH = 4000;
async function resolveOrCreateContact(admin, name, email, phone) {
  const trimmedEmail = email;
  const trimmedName = name?.trim() || null;
  const trimmedPhone = phone?.trim() || null;

  const { data: existing } = await admin
    .from("contacts")
    .select("id")
    .eq("email", trimmedEmail)
    .maybeSingle();

  if (existing?.id) {
    await admin
      .from("contacts")
      .update({
        name: trimmedName,
        phone: trimmedPhone,
      })
      .eq("id", existing.id);
    return existing.id;
  }

  const { data: newContact, error: contactError } = await admin
    .from("contacts")
    .insert({
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      source: "chat",
    })
    .select("id")
    .single();

  if (newContact) return newContact.id;

  if (contactError?.code === "23505") {
    const { data: race } = await admin
      .from("contacts")
      .select("id")
      .eq("email", trimmedEmail)
      .maybeSingle();
    if (race?.id) {
      await admin
        .from("contacts")
        .update({ name: trimmedName, phone: trimmedPhone })
        .eq("id", race.id);
      return race.id;
    }
  }

  if (contactError) console.error("chat/intake: failed to create contact", contactError);
  return null;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { accessToken, name, email, phone, mode, message } = body || {};

  if (!accessToken || typeof accessToken !== "string") {
    return NextResponse.json({ error: "Missing access token" }, { status: 401 });
  }

  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedPhone = typeof phone === "string" ? phone.trim() : "";
  const intakeMode = mode === "followup" ? "followup" : "live";
  const trimmedMessage =
    typeof message === "string" ? message.trim().slice(0, MAX_MESSAGE_LENGTH) : "";

  if (!trimmedName) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  const emailCheck = await ensureValidEmail(email);
  if (emailCheck.error) {
    return NextResponse.json({ error: emailCheck.error }, { status: 400 });
  }
  const trimmedEmail = emailCheck.normalized;
  if (intakeMode === "followup" && !trimmedMessage) {
    return NextResponse.json({ error: "Please enter a message for follow-up" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: userData, error: userError } = await admin.auth.getUser(accessToken);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
  const visitorId = userData.user.id;

  const contactId = await resolveOrCreateContact(
    admin,
    trimmedName,
    trimmedEmail,
    trimmedPhone || null
  );
  if (!contactId) {
    return NextResponse.json({ error: "Could not save contact details" }, { status: 500 });
  }

  const { data: openConv } = await admin
    .from("conversations")
    .select("id, contact_id, status")
    .eq("visitor_id", visitorId)
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  let conversationId = openConv?.id || null;

  if (intakeMode === "live") {
    if (conversationId) {
      await admin
        .from("conversations")
        .update({ contact_id: contactId })
        .eq("id", conversationId);
    } else {
      const country = request.headers.get("x-vercel-ip-country") || null;
      const region = request.headers.get("x-vercel-ip-country-region") || null;
      const { data: newConv, error: convError } = await admin
        .from("conversations")
        .insert({
          visitor_id: visitorId,
          country,
          region,
          contact_id: contactId,
          ai_enabled: true,
        })
        .select("id")
        .single();
      if (convError || !newConv) {
        console.error("chat/intake: failed to create conversation", convError);
        return NextResponse.json({ error: "Could not start chat" }, { status: 500 });
      }
      conversationId = newConv.id;
    }

    return NextResponse.json({
      conversationId,
      contactHasEmail: true,
      mode: "live",
    });
  }

  // followup — new conversation or reuse only if empty callback queue
  const country = request.headers.get("x-vercel-ip-country") || null;
  const region = request.headers.get("x-vercel-ip-country-region") || null;
  const now = new Date().toISOString();

  if (conversationId && openConv) {
    await admin
      .from("conversations")
      .update({
        contact_id: contactId,
        callback_requested_at: now,
        callback_reason: trimmedMessage,
        callback_status: "pending",
        ai_enabled: false,
      })
      .eq("id", conversationId);
  } else {
    const { data: newConv, error: convError } = await admin
      .from("conversations")
      .insert({
        visitor_id: visitorId,
        country,
        region,
        contact_id: contactId,
        ai_enabled: false,
        callback_requested_at: now,
        callback_reason: trimmedMessage,
        callback_status: "pending",
      })
      .select("id")
      .single();
    if (convError || !newConv) {
      console.error("chat/intake: failed to create follow-up conversation", convError);
      return NextResponse.json({ error: "Could not submit follow-up" }, { status: 500 });
    }
    conversationId = newConv.id;
  }

  const { error: messageError } = await admin.from("messages").insert({
    conversation_id: conversationId,
    sender: "visitor",
    content: trimmedMessage,
  });
  if (messageError) {
    console.error("chat/intake: failed to save follow-up message", messageError);
    return NextResponse.json({ error: "Could not save your message" }, { status: 500 });
  }

  return NextResponse.json({
    conversationId,
    contactHasEmail: true,
    mode: "followup",
  });
}
