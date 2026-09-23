import { NextResponse } from "next/server";
import { Resend } from "resend";
import { requireAdmin } from "@/lib/supabase/requireAdmin";

/**
 * GhostWriterHunt — Admin: send an email to a contact
 * Requires RESEND_API_KEY (secret) so this must run server-side; logs the
 * sent email into the contact's notes.
 */

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request) {
  const { supabase, isAdmin } = await requireAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { contactId, subject, message } = body || {};
  if (!contactId || !subject?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "contactId, subject and message are required" },
      { status: 400 }
    );
  }

  const { data: contact, error: contactError } = await supabase
    .from("contacts")
    .select("id, email, notes")
    .eq("id", contactId)
    .maybeSingle();

  if (contactError || !contact || !contact.email) {
    return NextResponse.json({ error: "Contact not found or has no email" }, { status: 404 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error: sendError } = await resend.emails.send({
      from: "GhostWriterHunt <ghostwriterhunt@lumexforge.com>",
      to: contact.email,
      replyTo: "ghostwriterhunt@lumexforge.com",
      subject: subject.trim(),
      text: message,
      html: `<div style="font-family:Arial,Helvetica,sans-serif;white-space:pre-wrap;">${escapeHtml(message)}</div>`,
    });

    if (sendError) {
      console.error("admin/send-email: Resend error", sendError);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
  } catch (err) {
    console.error("admin/send-email: failed to send", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  const logEntry = `[${new Date().toISOString()}] Email sent — Subject: "${subject.trim()}"\n${message.trim()}`;
  const updatedNotes = contact.notes ? `${contact.notes}\n\n${logEntry}` : logEntry;

  const { error: notesError } = await supabase
    .from("contacts")
    .update({ notes: updatedNotes })
    .eq("id", contactId);

  if (notesError) {
    console.error("admin/send-email: failed to log notes", notesError);
  }

  return NextResponse.json({ success: true });
}
