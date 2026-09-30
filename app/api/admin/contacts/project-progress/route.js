import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/supabase/requireAdmin";
import { isAllowedProjectProgress } from "@/lib/crm/customerCode";
import { appendProgressEmailNote, sendProjectProgressEmail } from "@/lib/crm/progressEmail";

/**
 * Admin: set contact project progress and email the customer once per change.
 * POST { contactId, projectProgress } — projectProgress null or 0|25|50|75|100
 */
export async function POST(request) {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const contactId = body?.contactId;
  let projectProgress = body?.projectProgress;

  if (!contactId || typeof contactId !== "string") {
    return NextResponse.json({ error: "contactId is required" }, { status: 400 });
  }

  if (projectProgress === "" || projectProgress === "null") {
    projectProgress = null;
  } else if (projectProgress != null) {
    projectProgress = parseInt(String(projectProgress), 10);
  }

  if (!isAllowedProjectProgress(projectProgress)) {
    return NextResponse.json({ error: "Invalid project progress value" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: contact, error: loadErr } = await admin
    .from("contacts")
    .select("id, email, name, customer_code, project_progress, notes")
    .eq("id", contactId)
    .maybeSingle();

  if (loadErr || !contact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  const previous = contact.project_progress ?? null;
  const next = projectProgress ?? null;

  if (previous === next) {
    return NextResponse.json({ ok: true, unchanged: true, projectProgress: next });
  }

  if (next != null && !contact.email) {
    return NextResponse.json({ error: "Contact needs an email before progress can be set" }, { status: 400 });
  }

  if (next != null) {
    try {
      await sendProjectProgressEmail({
        to: contact.email,
        name: contact.name,
        customerCode: contact.customer_code,
        projectProgress: next,
      });
    } catch (err) {
      console.error("admin/contacts/project-progress: email failed", err);
      return NextResponse.json({ error: "Failed to send progress email" }, { status: 500 });
    }
  }

  const notes =
    next != null
      ? appendProgressEmailNote(contact.notes, next)
      : (contact.notes || "").trim() || null;

  const { error: updateErr } = await admin
    .from("contacts")
    .update({ project_progress: next, notes })
    .eq("id", contactId);

  if (updateErr) {
    console.error("admin/contacts/project-progress: update failed", updateErr);
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, projectProgress: next, emailed: next != null });
}
