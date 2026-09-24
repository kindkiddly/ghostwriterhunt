import Stripe from "stripe";
import { isStripeMockMode } from "@/lib/stripe/mock";

let stripeClient = null;

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  if (!stripeClient) {
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

export function isStripeConfigured() {
  return !!process.env.STRIPE_SECRET_KEY;
}

export { isStripeMockMode };

/** Payments work in live Stripe mode OR mock demo mode. */
export function isPaymentsEnabled() {
  return isStripeConfigured() || isStripeMockMode();
}

export function getSiteUrl() {
  // Local dev must stay on localhost — NEXT_PUBLIC_SITE_URL is for production only.
  if (process.env.NODE_ENV === "development") {
    const port = process.env.PORT || "3000";
    return `http://localhost:${port}`;
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
