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

export const MIN_CUSTOM_AMOUNT_CENTS = 15000;
export const MAX_CUSTOM_AMOUNT_CENTS = 500000;

export function normalizeCustomAmountCents(amountUsd) {
  const cents = Math.round(Number(amountUsd) * 100);
  if (!Number.isFinite(cents)) return null;
  if (cents < MIN_CUSTOM_AMOUNT_CENTS || cents > MAX_CUSTOM_AMOUNT_CENTS) return null;
  return cents;
}
