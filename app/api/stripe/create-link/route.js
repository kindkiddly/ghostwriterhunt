import { NextResponse } from "next/server";
import { Resend } from "resend";
import { requireAdmin } from "@/lib/supabase/requireAdmin";
import { isPaymentsEnabled, isStripeMockMode } from "@/lib/stripe/client";
import { getFixedPackage, normalizeCustomAmountCents } from "@/lib/stripe/packages";
import { createPaymentLinkRecord } from "@/lib/stripe/payments";

/**
 * GhostWriterHunt — Admin: create a Stripe Payment Link (fixed or custom amount).
 * POST { packageKey?, amountUsd?, description, contactId?, conversationId?, sendEmail? }
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

  const { packageKey, amountUsd, description, contactId, conversationId, sendEmail } = body || {};

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
    if (!resolvedDescription) resolvedDescription = `${pkg.name} — GhostWriterHunt`;
  } else {
    amountCents = normalizeCustomAmountCents(amountUsd);
    if (!amountCents) {
      return NextResponse.json(
        { error: "Custom amount must be between $150 and $5,000" },
        { status: 400 }
      );
    }
    if (!resolvedDescription) {
      return NextResponse.json({ error: "Description is required for custom payments" }, { status: 400 });
    }
  }

  let customerEmail = null;
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

    if (sendEmail && customerEmail) {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        const amountLabel = `$${(amountCents / 100).toFixed(2)}`;
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: "GhostWriterHunt <ghostwriterhunt@lumexforge.com>",
          to: customerEmail,
          subject: `Your GhostWriterHunt payment link (${amountLabel})`,
          html: `<div style="font-family:Arial,sans-serif;max-width:560px;">
            <h2 style="color:#1C1C1C;">Complete your secure payment</h2>
            <p style="color:#333;">${escapeHtml(resolvedDescription)}</p>
            <p style="color:#333;"><strong>Amount:</strong> ${amountLabel}</p>
            <p style="margin:24px 0;"><a href="${escapeHtml(url)}" style="background:#C9A84C;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Pay securely</a></p>
            <p style="color:#666;font-size:13px;">${mock ? "Demo payment link — no real charge until Stripe is connected." : "This link is hosted by Stripe. If you have questions, reply to this email."}</p>
          </div>`,
          text: `Complete your payment (${amountLabel}): ${url}\n\n${resolvedDescription}`,
        });
      }
    }

    return NextResponse.json({ paymentId, url, mock: mock || isStripeMockMode() });
  } catch (err) {
    console.error("stripe/create-link:", err);
    return NextResponse.json({ error: "Could not create payment link" }, { status: 500 });
  }
}
