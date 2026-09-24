import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/client";
import { markPaymentPaidByStripeMetadata } from "@/lib/stripe/payments";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * GhostWriterHunt — Stripe webhook (checkout.session.completed).
 * Configure in Stripe Dashboard → Webhooks → /api/stripe/webhook
 */

export const runtime = "nodejs";

export async function POST(request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("stripe/webhook: STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("stripe/webhook: signature verification failed", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const paymentLinkId =
      typeof session.payment_link === "string"
        ? session.payment_link
        : session.payment_link?.id || null;
    const paid = paymentLinkId
      ? await markPaymentPaidByStripeMetadata({ stripePaymentLinkId: paymentLinkId })
      : await markPaymentPaidByStripeMetadata({ stripeCheckoutSessionId: session.id });

    if (paid?.contact_id) {
      const admin = createAdminClient();
      await admin
        .from("contacts")
        .update({ status: "client" })
        .eq("id", paid.contact_id)
        .in("status", ["new", "contacted", "qualified"]);
    }
  }

  return NextResponse.json({ received: true });
}
