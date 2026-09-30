/**
 * Stripe Checkout / Payment Link option — emails an invoice after one-time payment.
 * @see https://docs.stripe.com/payments/checkout/receipts#invoice-creation
 */
export function stripeInvoiceCreationOptions(invoiceDescription, customerCode = null) {
  const description =
    typeof invoiceDescription === "string" ? invoiceDescription.trim().slice(0, 500) : undefined;
  const code =
    typeof customerCode === "string" && customerCode.trim()
      ? customerCode.trim().slice(0, 30)
      : null;

  const invoice_data = {};
  if (description) invoice_data.description = description;
  if (code) {
    invoice_data.custom_fields = [{ name: "Customer Code", value: code }];
  }

  const hasInvoiceData = Object.keys(invoice_data).length > 0;

  return {
    enabled: true,
    ...(hasInvoiceData ? { invoice_data } : {}),
  };
}

export async function resolveInvoiceFromCheckoutSession(stripe, session) {
  let invoiceRef = session.invoice;
  if (!invoiceRef && session.id) {
    const full = await stripe.checkout.sessions.retrieve(session.id, { expand: ["invoice"] });
    invoiceRef = full.invoice;
  }

  const invoiceId =
    typeof invoiceRef === "string" ? invoiceRef : invoiceRef?.id || null;
  if (!invoiceId) return null;

  const invoice = await stripe.invoices.retrieve(invoiceId);
  return {
    stripeInvoiceId: invoice.id,
    stripeInvoiceUrl: invoice.hosted_invoice_url || null,
  };
}
