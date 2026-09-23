import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * GhostWriterHunt — Cron: email backup for unseen replies
 * Called every minute by Supabase pg_cron + pg_net (see migration 003),
 * authenticated via the x-cron-secret header. Finds agent/AI messages
 * older than 3 minutes that the visitor hasn't seen and haven't already
 * been emailed, and sends ONE email per conversation, then marks those
 * messages emailed_at so they're never emailed twice.
 */

const UNSEEN_THRESHOLD_MS = 3 * 60 * 1000;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request) {
  const secret = process.env.CRON_SECRET;
  const provided = request.headers.get("x-cron-secret");
  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("cron/unseen-replies: RESEND_API_KEY not set");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const admin = createAdminClient();
  const cutoff = new Date(Date.now() - UNSEEN_THRESHOLD_MS).toISOString();

  const { data: candidates, error } = await admin
    .from("messages")
    .select(
      `id, conversation_id, sender, content, created_at,
       conversations ( id, contacts ( id, name, email ) )`
    )
    .in("sender", ["agent", "ai"])
    .lt("created_at", cutoff)
    .is("seen_at", null)
    .is("emailed_at", null);

  if (error) {
    console.error("cron/unseen-replies: query failed", error);
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }

  const eligible = (candidates || []).filter((m) => m.conversations?.contacts?.email);

  const groups = new Map();
  for (const m of eligible) {
    const convId = m.conversation_id;
    if (!groups.has(convId)) {
      groups.set(convId, { contact: m.conversations.contacts, messages: [] });
    }
    groups.get(convId).messages.push(m);
  }

  const resend = new Resend(apiKey);
  let emailsSent = 0;
  let messagesMarked = 0;

  for (const [conversationId, { contact, messages }] of groups) {
    messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    const rowsHtml = messages
      .map(
        (m) =>
          `<p style="margin:0 0 14px;padding:12px 16px;background:#F7F5EF;border-radius:10px;color:#1C1C1C;white-space:pre-wrap;">${escapeHtml(m.content)}</p>`
      )
      .join("");

    const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#1C1C1C;">You have a new reply from GhostWriterHunt</h2>
      <p style="color:#333333;">Hi${contact.name ? " " + escapeHtml(contact.name) : ""}, here's what you may have missed:</p>
      ${rowsHtml}
      <p style="color:#666666;font-size:13px;">Simply reply to this email to continue the conversation.</p>
    </div>`;

    const text = [
      `Hi${contact.name ? " " + contact.name : ""}, here's what you may have missed:`,
      "",
      ...messages.map((m) => `- ${m.content}`),
      "",
      "Simply reply to this email to continue the conversation.",
    ].join("\n");

    try {
      const { error: sendError } = await resend.emails.send({
        from: "GhostWriterHunt <ghostwriterhunt@lumexforge.com>",
        to: contact.email,
        replyTo: "ghostwriterhunt@lumexforge.com",
        subject: "You have a new reply from GhostWriterHunt",
        html,
        text,
      });

      if (sendError) {
        console.error("cron/unseen-replies: Resend error for conversation", conversationId, sendError);
        continue;
      }

      const messageIds = messages.map((m) => m.id);
      const { error: updateError } = await admin
        .from("messages")
        .update({ emailed_at: new Date().toISOString() })
        .in("id", messageIds);

      if (updateError) {
        console.error("cron/unseen-replies: failed to mark emailed_at", updateError);
        continue;
      }

      emailsSent += 1;
      messagesMarked += messageIds.length;
    } catch (err) {
      console.error("cron/unseen-replies: failed to send for conversation", conversationId, err);
    }
  }

  return NextResponse.json({ conversationsChecked: groups.size, emailsSent, messagesMarked });
}
