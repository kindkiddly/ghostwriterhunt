import { SHARED_PRICING } from "@/data/pricing";

/**
 * Fixed checkout packages — synced with data/pricing.js ($150 / $200 / $299).
 */
export const PACKAGE_KEYS = {
  starter: "starter",
  professional: "professional",
  complete: "complete",
};

const SLUG_BY_NAME = {
  Starter: PACKAGE_KEYS.starter,
  Professional: PACKAGE_KEYS.professional,
  "Complete Publishing Package": PACKAGE_KEYS.complete,
};

export const FIXED_PACKAGES = SHARED_PRICING.reduce((acc, tier) => {
  const key = SLUG_BY_NAME[tier.name];
  if (!key || !tier.price?.fullBook) return acc;
  acc[key] = {
    key,
    name: tier.name,
    label: tier.label,
    amountCents: Math.round(tier.price.fullBook * 100),
    description: tier.description,
  };
  return acc;
}, {});

export function getFixedPackage(packageKey) {
  return FIXED_PACKAGES[packageKey] || null;
}

/** Positive whole-dollar USD amounts only (Stripe enforces its own minimum at charge time). */
export function parsePositiveWholeDollarAmountUsd(raw) {
  const text = String(raw ?? "").trim();
  if (!/^\d+$/.test(text)) return null;
  const dollars = parseInt(text, 10);
  if (!Number.isFinite(dollars) || dollars < 1) return null;
  return dollars * 100;
}

/** Admin / API numeric input (must be a positive integer dollar amount). */
export function normalizeCustomAmountCents(amountUsd) {
  const n = Number(amountUsd);
  if (!Number.isFinite(n) || !Number.isInteger(n) || n < 1) return null;
  return n * 100;
}
