import { createPaymentLinkRecord } from "@/lib/stripe/payments";
import { normalizeCustomAmountCents } from "@/lib/stripe/packages";
import { isPaymentsEnabled } from "@/lib/stripe/client";

const PAYMENT_LINK_PATTERN = /\[PAYMENT_LINK:(\d+(?:\.\d{1,2})?):([^\]]+)\]/i;
const MAX_AI_PAYMENT_LINKS_PER_DAY = 3;

export function parsePaymentLinkToken(text) {
  const match = text.match(PAYMENT_LINK_PATTERN);
  if (!match) return null;
  return {
    amountUsd: parseFloat(match[1]),
    description: match[2].trim(),
  };
}

/** Whole-dollar USD amounts for AI payment links; cents are rounded with a log line. */
function resolveAiPaymentAmountUsd(rawAmount) {
  const n = Number(rawAmount);
  if (!Number.isFinite(n) || n < 1) {
    console.error("paymentLink: invalid AI payment amount", rawAmount);
    return null;
  }
  if (!Number.isInteger(n)) {
    const rounded = Math.round(n);
    if (rounded < 1) {
      console.error("paymentLink: AI payment amount rounded below minimum", rawAmount);
      return null;
    }
    console.warn("paymentLink: AI payment amount had cents, rounded to whole dollars", {
      raw: rawAmount,
      rounded,
    });
    return rounded;
  }
  return n;
}

export function stripPaymentLinkToken(text) {
  return text.replace(/\n?\[PAYMENT_LINK:[^\]]+\]/gi, "").trim();
}

export function responseRequestsPaymentLink(text) {
  return PAYMENT_LINK_PATTERN.test(text);
}

/**
 * Server-side only — AI "creates" a payment link via Stripe API (not admin login).
 */
export async function maybeCreateAiPaymentLink({
  admin,
  conversationId,
  contactId,
  contactHasEmail,
  visitorEmail,
  rawReply,
}) {
  if (!isPaymentsEnabled() || !contactHasEmail) return null;

  const parsed = parsePaymentLinkToken(rawReply);
  if (!parsed) return null;

  const amountUsd = resolveAiPaymentAmountUsd(parsed.amountUsd);
  if (amountUsd === null || !parsed.description) return null;

  const amountCents = normalizeCustomAmountCents(amountUsd);
  if (!amountCents) {
    console.error("paymentLink: could not normalize AI payment amount after resolve", {
      raw: parsed.amountUsd,
      resolvedUsd: amountUsd,
    });
    return null;
  }

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count } = await admin
    .from("payments")
    .select("id", { count: "exact", head: true })
    .eq("conversation_id", conversationId)
    .eq("created_by", "ai")
    .gte("created_at", oneDayAgo);

  if ((count ?? 0) >= MAX_AI_PAYMENT_LINKS_PER_DAY) {
    console.warn("paymentLink: AI daily limit reached for conversation", conversationId);
    return null;
  }

  try {
    const { url } = await createPaymentLinkRecord({
      amountCents,
      description: parsed.description,
      contactId,
      conversationId,
      createdBy: "ai",
      customerEmail: visitorEmail || null,
      metadata: { ai_generated: true },
    });
    return url;
  } catch (err) {
    console.error("paymentLink: AI create failed", err);
    return null;
  }
}
