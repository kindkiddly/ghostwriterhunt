import { NextResponse } from "next/server";
import { isPaymentsEnabled, isStripeMockMode } from "@/lib/stripe/client";
import { parsePositiveWholeDollarAmountUsd } from "@/lib/stripe/packages";
import { findOrCreateContactByEmail } from "@/lib/stripe/contacts";
import { createCustomPaymentCheckoutRecord } from "@/lib/stripe/payments";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * GhostWriterHunt — Custom payment checkout (/pay).
 * POST { fullName, email, amountUsd, paymentNote }
 */
export async function POST(request) {
  if (!isPaymentsEnabled()) {
    return NextResponse.json({ error: "Payments are not enabled" }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const fullName = typeof body?.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const paymentNote = typeof body?.paymentNote === "string" ? body.paymentNote.trim() : "";
  const amountCents = parsePositiveWholeDollarAmountUsd(body?.amountUsd);

  if (!fullName || fullName.length > 120) {
    return NextResponse.json({ error: "Please enter your full name" }, { status: 400 });
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }
  if (!amountCents) {
    return NextResponse.json(
      { error: "Amount must be a positive whole number of USD (no cents)" },
      { status: 400 }
    );
  }
  if (!paymentNote || paymentNote.length > 300) {
    return NextResponse.json(
      { error: "Payment note is required (max 300 characters)" },
      { status: 400 }
    );
  }

  try {
    const contactId = await findOrCreateContactByEmail({
      name: fullName,
      email,
      source: "payment_page",
    });

    const result = await createCustomPaymentCheckoutRecord({
      contactId,
      amountCents,
      paymentNote,
      customerEmail: email,
      customerName: fullName,
    });

    if (!result.url) {
      return NextResponse.json({ error: "Could not start checkout" }, { status: 500 });
    }

    return NextResponse.json({ url: result.url, mock: isStripeMockMode() });
  } catch (err) {
    console.error("stripe/pay:", err);
    return NextResponse.json({ error: "Could not start checkout" }, { status: 500 });
  }
}
