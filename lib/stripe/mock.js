import { randomUUID } from "crypto";
import { getSiteUrl } from "@/lib/stripe/client";

/**
 * GhostWriterHunt — Mock Stripe mode when keys are not configured yet.
 * Set STRIPE_MOCK_MODE=false to disable mock even without keys (blocks checkout).
 * Set STRIPE_MOCK_MODE=true to force mock even if keys exist (for demos).
 */
export function isStripeMockMode() {
  const flag = process.env.STRIPE_MOCK_MODE;
  if (flag === "false") return false;
  if (flag === "true") return true;
  return !process.env.STRIPE_SECRET_KEY;
}

export function createMockCheckoutSessionId() {
  return `cs_mock_${randomUUID()}`;
}

export function createMockPaymentLinkId() {
  return `plink_mock_${randomUUID()}`;
}

export function buildMockCheckoutUrl(paymentId) {
  return `${getSiteUrl()}/checkout/mock?paymentId=${encodeURIComponent(paymentId)}`;
}
