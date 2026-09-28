import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Find CRM contact by email or create a minimal lead for payment flows.
 */
export async function findOrCreateContactByEmail({ name, email, source = "payment_page" }) {
  const admin = createAdminClient();
  const trimmedEmail = String(email || "").trim();
  const trimmedName = String(name || "").trim() || null;

  const { data: existing, error: findErr } = await admin
    .from("contacts")
    .select("id")
    .eq("email", trimmedEmail)
    .maybeSingle();

  if (findErr) {
    console.error("contacts: find by email failed", findErr);
    throw new Error("Could not look up contact");
  }

  if (existing?.id) {
    if (trimmedName) {
      await admin.from("contacts").update({ name: trimmedName }).eq("id", existing.id);
    }
    return existing.id;
  }

  const { data: created, error: insertErr } = await admin
    .from("contacts")
    .insert({
      name: trimmedName,
      email: trimmedEmail,
      source,
    })
    .select("id")
    .single();

  if (insertErr) {
    console.error("contacts: insert failed", insertErr);
    throw new Error("Could not create contact");
  }

  return created.id;
}
