import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/requireAdmin";
import { isPaymentsEnabled, isStripeMockMode } from "@/lib/stripe/client";
import { getFixedPackage, normalizeCustomAmountCents } from "@/lib/stripe/packages";
import { createPaymentLinkRecord } from "@/lib/stripe/payments";
import { ensureValidEmail } from "@/lib/validation/email.server";

/**
 * GhostWriterHunt — Admin: create a Stripe Payment Link (fixed or custom amount).
 * POST { packageKey?, amountUsd?, description, contactId?, conversationId? }
 */

export async function POST(request) {
  if (!isPaymentsEnabled()) {
    return NextResponse.json({ error: "Payments are not enabled" }, { status: 503 });
  }

  const { supabase, user, isAdmin } = await requireAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { packageKey, amountUsd, description, contactId, conversationId } = body || {};

  let amountCents = null;
  let resolvedPackageKey = null;
  let resolvedDescription = typeof description === "string" ? description.trim() : "";

  if (packageKey) {
    const pkg = getFixedPackage(packageKey);
    if (!pkg) {
      return NextResponse.json({ error: "Invalid package" }, { status: 400 });
    }
    amountCents = pkg.amountCents;
    resolvedPackageKey = packageKey;
    if (!resolvedDescription) resolvedDescription = `${pkg.name} | GhostWriterHunt`;
  } else {
    amountCents = normalizeCustomAmountCents(amountUsd);
    if (!amountCents) {
      return NextResponse.json(
        { error: "Custom amount must be a positive whole number of USD" },
        { status: 400 }
      );
    }
    if (!resolvedDescription) {
      return NextResponse.json({ error: "Description is required for custom payments" }, { status: 400 });
    }
  }

  let customerEmail = null;
  let contactName = null;
  if (contactId) {
    const { data: contact } = await supabase
      .from("contacts")
      .select("id, email, name")
      .eq("id", contactId)
      .maybeSingle();
    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }
    customerEmail = contact.email || null;
    contactName = contact.name || null;
    if (customerEmail) {
      const emailCheck = await ensureValidEmail(customerEmail);
      if (emailCheck.error) {
        return NextResponse.json(
          { error: `Contact email invalid: ${emailCheck.error}` },
          { status: 400 }
        );
      }
      customerEmail = emailCheck.normalized;
    }
  }

  try {
    const { paymentId, url, mock } = await createPaymentLinkRecord({
      amountCents,
      description: resolvedDescription,
      packageKey: resolvedPackageKey,
      contactId: contactId || null,
      conversationId: conversationId || null,
      createdBy: "admin",
      createdByUserId: user.id,
      customerEmail,
      metadata: { admin_created: true },
    });

    return NextResponse.json({
      paymentId,
      url,
      mock: mock || isStripeMockMode(),
      amountCents,
      description: resolvedDescription,
      contactId: contactId || null,
      contactEmail: customerEmail,
      contactName,
    });
  } catch (err) {
    console.error("stripe/create-link:", err);
    return NextResponse.json({ error: "Could not create payment link" }, { status: 500 });
  }
}
