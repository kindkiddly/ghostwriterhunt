import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * GhostWriterHunt — Chat: restore status
 * On page load, tells the widget whether this visitor already has an open
 * conversation and whether it has a contact with an email on file.
 * Visitors have no RLS access to `contacts`, so the email check has to run
 * server-side; the message history itself is still fetched directly by
 * the client (RLS already allows that).
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { accessToken } = body || {};
  if (!accessToken || typeof accessToken !== "string") {
    return NextResponse.json({ error: "Missing access token" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data: userData, error: userError } = await admin.auth.getUser(accessToken);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  const { data: conversation } = await admin
    .from("conversations")
    .select("id, contact_id")
    .eq("visitor_id", userData.user.id)
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  let contactHasEmail = false;
  if (conversation?.contact_id) {
    const { data: contact } = await admin
      .from("contacts")
      .select("email")
      .eq("id", conversation.contact_id)
      .maybeSingle();
    contactHasEmail = !!contact?.email;
  }

  return NextResponse.json({
    conversationId: conversation?.id || null,
    contactHasEmail,
  });
}
