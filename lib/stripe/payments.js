import { fetchContactCustomerCode } from "@/lib/crm/customerCode";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSiteUrl, getStripe, isStripeMockMode } from "@/lib/stripe/client";
import { stripeInvoiceCreationOptions } from "@/lib/stripe/invoice";
import {
  buildMockCheckoutUrl,
  createMockCheckoutSessionId,
  createMockPaymentLinkId,
} from "@/lib/stripe/mock";
import {
  isProfessionalPackageKey,
  normalizeProfessionalBookCount,
  PROFESSIONAL_CHECKOUT_MAX_BOOKS,
  PROFESSIONAL_MIN_BOOKS,
  PROFESSIONAL_STRIPE_PRODUCT_NAME,
  PROFESSIONAL_UNIT_CENTS,
} from "@/lib/stripe/packages";

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
  const adminForCode = createAdminClient();
  const customerCodeForRow = await fetchContactCustomerCode(adminForCode, contactId);

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
      metadata: {
        ...metadata,
        customer_email: customerEmail || null,
        mock: true,
        ...(customerCodeForRow ? { customer_code: customerCodeForRow } : {}),
      },
    });

    const url = buildMockCheckoutUrl(paymentId);
    const admin = createAdminClient();
    await admin.from("payments").update({ stripe_payment_link_url: url }).eq("id", paymentId);

    return { paymentId, url, mock: true };
  }

  const stripe = getStripe();
  const siteUrl = getSiteUrl();
  const productName = trimmedDescription.slice(0, 200);
  const customerCode = customerCodeForRow;

  const stripeMetadata = {
    ...(packageKey ? { package_key: packageKey } : {}),
    ...(contactId ? { contact_id: contactId } : {}),
    ...(conversationId ? { conversation_id: conversationId } : {}),
    ...(customerCode ? { customer_code: customerCode } : {}),
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
    invoice_creation: stripeInvoiceCreationOptions(trimmedDescription, customerCode),
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
    metadata: {
      ...metadata,
      customer_email: customerEmail || null,
      ...(customerCode ? { customer_code: customerCode } : {}),
    },
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
  bookCount = null,
}) {
  const isProfessionalPerBook = isProfessionalPackageKey(packageKey);
  let quantity = 1;
  let unitAmountCents = packageInfo.amountCents;
  let lineItemName = packageInfo.name;

  if (isProfessionalPerBook) {
    const normalized =
      normalizeProfessionalBookCount(bookCount ?? PROFESSIONAL_MIN_BOOKS) ??
      null;
    if (!normalized) {
      throw new Error("Invalid professional book count");
    }
    quantity = normalized;
    unitAmountCents = PROFESSIONAL_UNIT_CENTS;
    lineItemName = PROFESSIONAL_STRIPE_PRODUCT_NAME;
  }

  const amountCents = unitAmountCents * quantity;
  const description = isProfessionalPerBook
    ? `${lineItemName} × ${quantity} | GhostWriterHunt`
    : `${packageInfo.name} | GhostWriterHunt`;

  const adminClient = createAdminClient();
  const checkoutCustomerCode = await fetchContactCustomerCode(adminClient, contactId);

  if (isStripeMockMode()) {
    const mockSessionId = createMockCheckoutSessionId();
    const paymentId = await insertPaymentRow({
      contact_id: contactId,
      conversation_id: conversationId,
      package_key: packageKey,
      description,
      amount_cents: amountCents,
      currency: "usd",
      status: "pending",
      stripe_checkout_session_id: mockSessionId,
      created_by: "checkout",
      metadata: {
        customer_email: customerEmail || null,
        mock: true,
        ...(isProfessionalPerBook ? { book_count: quantity } : {}),
        ...(checkoutCustomerCode ? { customer_code: checkoutCustomerCode } : {}),
      },
    });

    return {
      url: buildMockCheckoutUrl(paymentId),
      sessionId: mockSessionId,
      paymentId,
      mock: true,
    };
  }

  const stripe = getStripe();
  const siteUrl = getSiteUrl();

  const lineItem = {
    price_data: {
      currency: "usd",
      product_data: {
        name: lineItemName,
        description: isProfessionalPerBook
          ? packageInfo.description?.slice(0, 500) || undefined
          : packageInfo.description?.slice(0, 500) || undefined,
      },
      unit_amount: unitAmountCents,
    },
    quantity,
  };

  if (isProfessionalPerBook) {
    lineItem.adjustable_quantity = {
      enabled: true,
      minimum: PROFESSIONAL_MIN_BOOKS,
      maximum: PROFESSIONAL_CHECKOUT_MAX_BOOKS,
    };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [lineItem],
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout/cancel`,
    invoice_creation: stripeInvoiceCreationOptions(description, checkoutCustomerCode),
    ...(customerEmail ? { customer_email: customerEmail } : {}),
    metadata: {
      package_key: packageKey,
      ...(contactId ? { contact_id: contactId } : {}),
      ...(conversationId ? { conversation_id: conversationId } : {}),
      ...(checkoutCustomerCode ? { customer_code: checkoutCustomerCode } : {}),
      created_by: "checkout",
      ...(isProfessionalPerBook ? { book_count: String(quantity) } : {}),
    },
  });

  const { error } = await adminClient.from("payments").insert({
    contact_id: contactId,
    conversation_id: conversationId,
    package_key: packageKey,
    description,
    amount_cents: amountCents,
    currency: "usd",
    status: "pending",
    stripe_checkout_session_id: session.id,
    created_by: "checkout",
    metadata: {
      customer_email: customerEmail || null,
      ...(isProfessionalPerBook ? { book_count: quantity } : {}),
      ...(checkoutCustomerCode ? { customer_code: checkoutCustomerCode } : {}),
    },
  });

  if (error) {
    console.error("payments: failed to save checkout session row", error);
  }

  return { url: session.url, sessionId: session.id, mock: false };
}

/**
 * Custom amount checkout from /pay (amount agreed after consultation).
 */
export async function createCustomPaymentCheckoutRecord({
  contactId,
  amountCents,
  paymentNote,
  customerEmail,
  customerName,
}) {
  const trimmedNote = String(paymentNote || "").trim().slice(0, 300);
  const description = trimmedNote || "Custom payment | GhostWriterHunt";
  const productTitle = `GhostWriterHunt — ${customerName || "Custom payment"}`.slice(0, 200);
  const payAdmin = createAdminClient();
  const payCustomerCode = await fetchContactCustomerCode(payAdmin, contactId);

  if (isStripeMockMode()) {
    const mockSessionId = createMockCheckoutSessionId();
    const paymentId = await insertPaymentRow({
      contact_id: contactId,
      package_key: null,
      description,
      amount_cents: amountCents,
      currency: "usd",
      status: "pending",
      stripe_checkout_session_id: mockSessionId,
      created_by: "payment_page",
      metadata: {
        customer_email: customerEmail,
        customer_name: customerName,
        payment_note: trimmedNote,
        mock: true,
        ...(payCustomerCode ? { customer_code: payCustomerCode } : {}),
      },
    });

    return {
      url: buildMockCheckoutUrl(paymentId),
      sessionId: mockSessionId,
      paymentId,
      mock: true,
    };
  }

  const stripe = getStripe();
  const siteUrl = getSiteUrl();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: productTitle,
            description: trimmedNote,
          },
          unit_amount: amountCents,
        },
        quantity: 1,
      },
    ],
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/pay`,
    customer_email: customerEmail,
    invoice_creation: stripeInvoiceCreationOptions(trimmedNote, payCustomerCode),
    metadata: {
      contact_id: contactId,
      ...(payCustomerCode ? { customer_code: payCustomerCode } : {}),
      created_by: "payment_page",
      payment_note: trimmedNote.slice(0, 500),
    },
  });

  const paymentId = await insertPaymentRow({
    contact_id: contactId,
    package_key: null,
    description,
    amount_cents: amountCents,
    currency: "usd",
    status: "pending",
    stripe_checkout_session_id: session.id,
    created_by: "payment_page",
    metadata: {
      customer_email: customerEmail,
      customer_name: customerName,
      payment_note: trimmedNote,
      ...(payCustomerCode ? { customer_code: payCustomerCode } : {}),
    },
  });

  return { url: session.url, sessionId: session.id, paymentId, mock: false };
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
  stripeInvoiceId = null,
  stripeInvoiceUrl = null,
  paidAt = new Date().toISOString(),
}) {
  const admin = createAdminClient();
  const patch = {
    status: "paid",
    paid_at: paidAt,
    ...(stripeInvoiceId ? { stripe_invoice_id: stripeInvoiceId } : {}),
    ...(stripeInvoiceUrl ? { stripe_invoice_url: stripeInvoiceUrl } : {}),
  };

  let query = admin.from("payments").update(patch);

  if (stripeCheckoutSessionId) {
    query = query.eq("stripe_checkout_session_id", stripeCheckoutSessionId);
  } else if (stripePaymentLinkId) {
    query = query.eq("stripe_payment_link_id", stripePaymentLinkId);
  } else {
    return null;
  }

  const { data, error } = await query
    .eq("status", "pending")
    .select("id, contact_id, conversation_id, amount_cents")
    .maybeSingle();
  if (error) {
    console.error("payments: mark paid failed", error);
    return null;
  }
  return data;
}

export async function markPaymentExpiredByCheckoutSessionId(stripeCheckoutSessionId) {
  if (!stripeCheckoutSessionId) return null;
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("payments")
    .update({ status: "expired" })
    .eq("stripe_checkout_session_id", stripeCheckoutSessionId)
    .eq("status", "pending")
    .select("id")
    .maybeSingle();
  if (error) {
    console.error("payments: mark expired failed", error);
    return null;
  }
  return data;
}
