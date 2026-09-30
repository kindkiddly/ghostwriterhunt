import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Visitor ends their open chat (server-side close).
 * POST { accessToken, conversationId? }
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { accessToken, conversationId: clientConversationId } = body || {};
  if (!accessToken || typeof accessToken !== "string") {
    return NextResponse.json({ error: "Missing access token" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data: userData, error: userError } = await admin.auth.getUser(accessToken);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  const visitorId = userData.user.id;
  let conversationId = typeof clientConversationId === "string" ? clientConversationId : null;

  if (conversationId) {
    const { data: conv } = await admin
      .from("conversations")
      .select("id, status")
      .eq("id", conversationId)
      .eq("visitor_id", visitorId)
      .maybeSingle();
    if (!conv || conv.status !== "open") {
      return NextResponse.json({ ok: true, alreadyClosed: true });
    }
  } else {
    const { data: openConv } = await admin
      .from("conversations")
      .select("id, status")
      .eq("visitor_id", visitorId)
      .eq("status", "open")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    conversationId = openConv?.id || null;
    if (!conversationId) {
      return NextResponse.json({ ok: true, alreadyClosed: true });
    }
  }

  const { error: updateErr } = await admin
    .from("conversations")
    .update({ status: "closed", ai_enabled: false })
    .eq("id", conversationId)
    .eq("visitor_id", visitorId)
    .eq("status", "open");

  if (updateErr) {
    console.error("chat/end: failed to close conversation", updateErr);
    return NextResponse.json({ error: "Could not end chat" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, conversationId });
}
