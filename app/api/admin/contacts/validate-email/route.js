import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/requireAdmin";
import { ensureValidEmail } from "@/lib/validation/email.server";

/** Admin: validate (and normalize) a contact email before saving in CRM. */
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

  const raw = body?.email;
  if (raw == null || String(raw).trim() === "") {
    return NextResponse.json({ ok: true, normalized: null });
  }

  const result = await ensureValidEmail(raw);
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true, normalized: result.normalized });
}
