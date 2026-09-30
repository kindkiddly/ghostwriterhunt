import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeCustomerCodeInput } from "@/lib/crm/customerCode";

const MAX_FAILED_ATTEMPTS_PER_HOUR = 5;

async function countRecentFailedAttempts(admin, visitorId) {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count, error } = await admin
    .from("customer_code_attempts")
    .select("id", { count: "exact", head: true })
    .eq("visitor_id", visitorId)
    .eq("success", false)
    .gte("attempted_at", oneHourAgo);

  if (error) {
    console.error("verify-customer-code: rate limit query failed", error);
    return 0;
  }
  return count ?? 0;
}

async function recordAttempt(admin, visitorId, success) {
  const { error } = await admin.from("customer_code_attempts").insert({
    visitor_id: visitorId,
    success,
  });
  if (error) console.error("verify-customer-code: failed to log attempt", error);
}

async function resolveOpenConversation(admin, visitorId, conversationId) {
  if (conversationId && typeof conversationId === "string") {
    const { data } = await admin
      .from("conversations")
      .select("id, status")
      .eq("id", conversationId)
      .eq("visitor_id", visitorId)
      .maybeSingle();
    if (data?.status === "open") return data;
  }

  const { data: openConv } = await admin
    .from("conversations")
    .select("id, status")
    .eq("visitor_id", visitorId)
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return openConv || null;
}

/**
 * Visitor: verify GWH customer code and link the open conversation to that contact.
 * POST { accessToken, code, conversationId? }
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { accessToken, code, conversationId: clientConversationId } = body || {};

  if (!accessToken || typeof accessToken !== "string") {
    return NextResponse.json({ error: "Missing access token" }, { status: 401 });
  }

  const normalized = normalizeCustomerCodeInput(code);
  if (!normalized) {
    return NextResponse.json({ error: "Invalid code format" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: userData, error: userError } = await admin.auth.getUser(accessToken);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
  const visitorId = userData.user.id;

  const failedCount = await countRecentFailedAttempts(admin, visitorId);
  if (failedCount >= MAX_FAILED_ATTEMPTS_PER_HOUR) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again in about an hour." },
      { status: 429 }
    );
  }

  let conversation = await resolveOpenConversation(admin, visitorId, clientConversationId);

  if (!conversation) {
    const country = request.headers.get("x-vercel-ip-country") || null;
    const region = request.headers.get("x-vercel-ip-country-region") || null;
    const { data: newConv, error: convError } = await admin
      .from("conversations")
      .insert({ visitor_id: visitorId, country, region })
      .select("id")
      .single();
    if (convError || !newConv) {
      console.error("verify-customer-code: could not start conversation", convError);
      return NextResponse.json({ error: "Could not start chat session" }, { status: 500 });
    }
    conversation = newConv;
  }

  const { data: contact, error: contactErr } = await admin
    .from("contacts")
    .select("id, name, email, customer_code")
    .eq("customer_code", normalized)
    .maybeSingle();

  if (contactErr) {
    console.error("verify-customer-code: contact lookup failed", contactErr);
    return NextResponse.json({ error: "Could not verify code" }, { status: 500 });
  }

  if (!contact) {
    await recordAttempt(admin, visitorId, false);
    return NextResponse.json(
      {
        ok: false,
        message: "We couldn't find that code. Please check the code on your invoice or receipt email and try again.",
      },
      { status: 404 }
    );
  }

  const verifiedAt = new Date().toISOString();
  const { error: linkErr } = await admin
    .from("conversations")
    .update({
      contact_id: contact.id,
      customer_code_verified_at: verifiedAt,
    })
    .eq("id", conversation.id);

  if (linkErr) {
    console.error("verify-customer-code: link failed", linkErr);
    return NextResponse.json({ error: "Could not link your account" }, { status: 500 });
  }

  await recordAttempt(admin, visitorId, true);

  const firstName = contact.name?.trim().split(/\s+/)[0] || null;

  return NextResponse.json({
    ok: true,
    conversationId: conversation.id,
    customerCodeVerified: true,
    contactHasEmail: !!contact.email,
    firstName,
    message: firstName
      ? `Thanks, ${firstName} — we've linked your account. You can ask about your project status here.`
      : "Thanks — we've linked your account. You can ask about your project status here.",
  });
}
