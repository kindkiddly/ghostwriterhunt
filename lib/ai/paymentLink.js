import { createPaymentLinkRecord } from "@/lib/stripe/payments";
import { normalizeCustomAmountCents } from "@/lib/stripe/packages";
import { isPaymentsEnabled } from "@/lib/stripe/client";
import {
  MAX_AI_PAYMENT_USD,
  validateAiPaymentAmount,
} from "@/data/agentCatalog";

/** [PAYMENT_LINK:amount:catalog_ref:description] */
const PAYMENT_LINK_PATTERN =
  /\[PAYMENT_LINK:(\d+(?:\.\d{1,2})?):([a-z0-9_+,]+):([^\]]+)\]/i;
/** Legacy [PAYMENT_LINK:amount:description] — rejected unless catalog ref present */
const PAYMENT_LINK_LEGACY_PATTERN = /\[PAYMENT_LINK:(\d+(?:\.\d{1,2})?):([^\]:]+)\]/i;

const MAX_AI_PAYMENT_LINKS_PER_DAY = 3;

export function parsePaymentLinkToken(text) {
  const match = text.match(PAYMENT_LINK_PATTERN);
  if (match) {
    return {
      amountUsd: parseFloat(match[1]),
      catalogRef: match[2].trim(),
      description: match[3].trim(),
    };
  }
  const legacy = text.match(PAYMENT_LINK_LEGACY_PATTERN);
  if (legacy) {
    return {
      amountUsd: parseFloat(legacy[1]),
      catalogRef: null,
      description: legacy[2].trim(),
      legacy: true,
    };
  }
  return null;
}

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
  return PAYMENT_LINK_PATTERN.test(text) || PAYMENT_LINK_LEGACY_PATTERN.test(text);
}

/**
 * Server-side only — AI creates a payment link via Stripe API.
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

  if (parsed.legacy || !parsed.catalogRef) {
    console.warn("paymentLink: rejected legacy or missing catalog ref", {
      conversationId,
      amountUsd,
    });
    return null;
  }

  const validation = validateAiPaymentAmount(amountUsd, parsed.catalogRef);
  if (!validation.ok) {
    console.warn("paymentLink: catalog validation failed", {
      conversationId,
      amountUsd,
      catalogRef: parsed.catalogRef,
      reason: validation.reason,
      floor: validation.floor,
    });
    return null;
  }

  if (validation.amountUsd > MAX_AI_PAYMENT_USD) {
    console.warn("paymentLink: amount above max — handover required", amountUsd);
    return null;
  }

  const amountCents = normalizeCustomAmountCents(validation.amountUsd);
  if (!amountCents) {
    console.error("paymentLink: could not normalize AI payment amount", validation.amountUsd);
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
      metadata: {
        ai_generated: true,
        catalog_ref: parsed.catalogRef,
      },
    });
    return url;
  } catch (err) {
    console.error("paymentLink: AI create failed", err);
    return null;
  }
}
