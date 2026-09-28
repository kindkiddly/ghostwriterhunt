import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/supabase/requireAdmin";
import { isStripeMockMode } from "@/lib/stripe/client";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Admin: manually email a pending payment link to the linked contact.
 * POST { paymentId }
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

  const paymentId = body?.paymentId;
  if (!paymentId || typeof paymentId !== "string") {
    return NextResponse.json({ error: "paymentId is required" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: payment, error: payErr } = await admin
    .from("payments")
    .select("id, status, amount_cents, description, stripe_payment_link_url, contact_id")
    .eq("id", paymentId)
    .maybeSingle();

  if (payErr || !payment) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }
  if (payment.status !== "pending" || !payment.stripe_payment_link_url) {
    return NextResponse.json({ error: "Payment link is not available to send" }, { status: 400 });
  }
  if (!payment.contact_id) {
    return NextResponse.json({ error: "No contact linked to this payment" }, { status: 400 });
  }

  const { data: contact } = await admin
    .from("contacts")
    .select("id, email, name")
    .eq("id", payment.contact_id)
    .maybeSingle();

  if (!contact?.email) {
    return NextResponse.json({ error: "Contact has no email address" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const amountLabel = `$${(payment.amount_cents / 100).toFixed(2)}`;
  const url = payment.stripe_payment_link_url;
  const mock = isStripeMockMode();

  try {
    const resend = new Resend(apiKey);
    const { error: sendError } = await resend.emails.send({
      from: "GhostWriterHunt <ghostwriterhunt@lumexforge.com>",
      to: contact.email,
      replyTo: "ghostwriterhunt@lumexforge.com",
      subject: `Your GhostWriterHunt payment link (${amountLabel})`,
      html: `<div style="font-family:Arial,sans-serif;max-width:560px;">
        <h2 style="color:#1C1C1C;">Complete your secure payment</h2>
        <p style="color:#333;">${escapeHtml(payment.description)}</p>
        <p style="color:#333;"><strong>Amount:</strong> ${amountLabel}</p>
        <p style="margin:24px 0;"><a href="${escapeHtml(url)}" style="background:#C9A84C;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Pay securely</a></p>
        <p style="color:#666;font-size:13px;">${mock ? "Demo payment link. No real charge until Stripe is connected." : "This link is hosted by Stripe. If you have questions, reply to this email."}</p>
      </div>`,
      text: `Complete your payment (${amountLabel}): ${url}\n\n${payment.description}`,
    });

    if (sendError) {
      console.error("admin/payments/send-link: Resend error", sendError);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
  } catch (err) {
    console.error("admin/payments/send-link:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  const emailedAt = new Date().toISOString();
  const { error: updateErr } = await admin
    .from("payments")
    .update({ payment_link_emailed_at: emailedAt })
    .eq("id", paymentId);

  if (updateErr) {
    console.error("admin/payments/send-link: failed to save emailed_at", updateErr);
  }

  return NextResponse.json({ success: true, emailedAt });
}
