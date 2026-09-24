import { NextResponse } from "next/server";
import { isStripeMockMode } from "@/lib/stripe/client";
import { getPaymentById } from "@/lib/stripe/payments";

/**
 * GhostWriterHunt — Read mock payment details for the demo checkout page.
 * GET ?paymentId=
 */
export async function GET(request) {
  if (!isStripeMockMode()) {
    return NextResponse.json({ error: "Mock payments are not active" }, { status: 403 });
  }

  const paymentId = request.nextUrl.searchParams.get("paymentId");
  if (!paymentId) {
    return NextResponse.json({ error: "paymentId is required" }, { status: 400 });
  }

  const payment = await getPaymentById(paymentId);
  if (!payment) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: payment.id,
    description: payment.description,
    amountCents: payment.amount_cents,
    currency: payment.currency,
    status: payment.status,
    packageKey: payment.package_key,
  });
}
