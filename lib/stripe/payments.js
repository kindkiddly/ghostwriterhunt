import { createAdminClient } from "@/lib/supabase/admin";
import { getSiteUrl, getStripe, isStripeMockMode } from "@/lib/stripe/client";
import {
  buildMockCheckoutUrl,
  createMockCheckoutSessionId,
  createMockPaymentLinkId,
} from "@/lib/stripe/mock";

async function insertPaymentRow(row) {
  const admin = createAdminClient();
  const { data, error } = await admin.from("payments").insert(row).select("id").single();
  if (error) {
    console.error("payments: failed to save payment row", error);
    throw new Error("Could not save payment record");
  }
  return data.id;
}

/**
 * Create a Stripe Payment Link and persist a pending payment row.
 * Used by admin CRM and by the AI agent (server-side, not admin login).
 */
export async function createPaymentLinkRecord({
  amountCents,
  description,
  packageKey = null,
  contactId = null,
  conversationId = null,
  createdBy,
  createdByUserId = null,
  customerEmail = null,
  metadata = {},
}) {
  const trimmedDescription = String(description || "GhostWriterHunt service").trim().slice(0, 500);

  if (isStripeMockMode()) {
    const paymentId = await insertPaymentRow({
      contact_id: contactId,
      conversation_id: conversationId,
      package_key: packageKey,
      description: trimmedDescription,
      amount_cents: amountCents,
      currency: "usd",
      status: "pending",
      stripe_payment_link_id: createMockPaymentLinkId(),
      stripe_payment_link_url: null,
      created_by: createdBy,
      created_by_user_id: createdByUserId,
      metadata: { ...metadata, customer_email: customerEmail || null, mock: true },
    });

    const url = buildMockCheckoutUrl(paymentId);
    const admin = createAdminClient();
    await admin.from("payments").update({ stripe_payment_link_url: url }).eq("id", paymentId);

    return { paymentId, url, mock: true };
  }

  const stripe = getStripe();
  const siteUrl = getSiteUrl();
  const productName = trimmedDescription.slice(0, 200);

  const stripeMetadata = {
    ...(packageKey ? { package_key: packageKey } : {}),
    ...(contactId ? { contact_id: contactId } : {}),
    ...(conversationId ? { conversation_id: conversationId } : {}),
    created_by: createdBy,
  };

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: productName },
          unit_amount: amountCents,
        },
        quantity: 1,
      },
    ],
    metadata: stripeMetadata,
    after_completion: {
      type: "redirect",
      redirect: { url: `${siteUrl}/checkout/success` },
    },
  });

  const paymentId = await insertPaymentRow({
    contact_id: contactId,
    conversation_id: conversationId,
    package_key: packageKey,
    description: trimmedDescription,
    amount_cents: amountCents,
    currency: "usd",
    status: "pending",
    stripe_payment_link_id: paymentLink.id,
    stripe_payment_link_url: paymentLink.url,
    created_by: createdBy,
    created_by_user_id: createdByUserId,
    metadata: { ...metadata, customer_email: customerEmail || null },
  });

  return {
    paymentId,
    url: paymentLink.url,
    mock: false,
  };
}

/**
 * Create a Stripe Checkout Session for a fixed package (public paywall).
 */
export async function createCheckoutSessionRecord({
  packageKey,
  packageInfo,
  contactId = null,
  conversationId = null,
  customerEmail = null,
}) {
  const description = `${packageInfo.name} — GhostWriterHunt`;

  if (isStripeMockMode()) {
    const mockSessionId = createMockCheckoutSessionId();
    const paymentId = await insertPaymentRow({
      contact_id: contactId,
      conversation_id: conversationId,
      package_key: packageKey,
      description,
      amount_cents: packageInfo.amountCents,
      currency: "usd",
      status: "pending",
      stripe_checkout_session_id: mockSessionId,
      created_by: "checkout",
      metadata: { customer_email: customerEmail || null, mock: true },
    });

    return {
      url: buildMockCheckoutUrl(paymentId),
      sessionId: mockSessionId,
      paymentId,
      mock: true,
    };
  }

  const stripe = getStripe();
  const admin = createAdminClient();
  const siteUrl = getSiteUrl();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: packageInfo.name,
            description: packageInfo.description?.slice(0, 500) || undefined,
          },
          unit_amount: packageInfo.amountCents,
        },
        quantity: 1,
      },
    ],
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout/cancel`,
    ...(customerEmail ? { customer_email: customerEmail } : {}),
    metadata: {
      package_key: packageKey,
      ...(contactId ? { contact_id: contactId } : {}),
      ...(conversationId ? { conversation_id: conversationId } : {}),
      created_by: "checkout",
    },
  });

  const { error } = await admin.from("payments").insert({
    contact_id: contactId,
    conversation_id: conversationId,
    package_key: packageKey,
    description,
    amount_cents: packageInfo.amountCents,
    currency: "usd",
    status: "pending",
    stripe_checkout_session_id: session.id,
    created_by: "checkout",
    metadata: { customer_email: customerEmail || null },
  });

  if (error) {
    console.error("payments: failed to save checkout session row", error);
  }

  return { url: session.url, sessionId: session.id, mock: false };
}

export async function markPaymentPaidById(paymentId, paidAt = new Date().toISOString()) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("payments")
    .update({ status: "paid", paid_at: paidAt })
    .eq("id", paymentId)
    .eq("status", "pending")
    .select("id, contact_id, conversation_id, amount_cents")
    .maybeSingle();

  if (error) {
    console.error("payments: mark paid by id failed", error);
    return null;
  }

  if (data?.contact_id) {
    await admin
      .from("contacts")
      .update({ status: "client" })
      .eq("id", data.contact_id)
      .in("status", ["new", "contacted", "qualified"]);
  }

  return data;
}

export async function getPaymentById(paymentId) {
  const admin = createAdminClient();
  const { data, error } = await admin.from("payments").select("*").eq("id", paymentId).maybeSingle();
  if (error) {
    console.error("payments: get by id failed", error);
    return null;
  }
  return data;
}

export async function markPaymentPaidByStripeMetadata({
  stripeCheckoutSessionId = null,
  stripePaymentLinkId = null,
  paidAt = new Date().toISOString(),
}) {
  const admin = createAdminClient();
  let query = admin.from("payments").update({ status: "paid", paid_at: paidAt });

  if (stripeCheckoutSessionId) {
    query = query.eq("stripe_checkout_session_id", stripeCheckoutSessionId);
  } else if (stripePaymentLinkId) {
    query = query.eq("stripe_payment_link_id", stripePaymentLinkId);
  } else {
    return null;
  }

  const { data, error } = await query.select("id, contact_id, conversation_id, amount_cents").maybeSingle();
  if (error) {
    console.error("payments: mark paid failed", error);
    return null;
  }
  return data;
}
