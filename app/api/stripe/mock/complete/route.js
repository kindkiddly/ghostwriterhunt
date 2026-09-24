import { NextResponse } from "next/server";
import { isStripeMockMode } from "@/lib/stripe/client";
import { getPaymentById, markPaymentPaidById } from "@/lib/stripe/payments";

/**
 * GhostWriterHunt — Complete a mock payment (demo mode only).
 * POST { paymentId }
 */
export async function POST(request) {
  if (!isStripeMockMode()) {
    return NextResponse.json({ error: "Mock payments are not active" }, { status: 403 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { paymentId } = body || {};
  if (!paymentId || typeof paymentId !== "string") {
    return NextResponse.json({ error: "paymentId is required" }, { status: 400 });
  }

  const payment = await getPaymentById(paymentId);
  if (!payment) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }
  if (payment.status === "paid") {
    return NextResponse.json({ success: true, alreadyPaid: true });
  }

  const paid = await markPaymentPaidById(paymentId);
  if (!paid) {
    return NextResponse.json({ error: "Could not complete mock payment" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
