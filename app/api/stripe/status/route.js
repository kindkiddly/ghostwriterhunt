import { NextResponse } from "next/server";
import { isPaymentsEnabled, isStripeConfigured, isStripeMockMode } from "@/lib/stripe/client";

/** Public read-only payment mode (no secrets). */
export async function GET() {
  return NextResponse.json({
    enabled: isPaymentsEnabled(),
    mock: isStripeMockMode(),
    live: isStripeConfigured() && !isStripeMockMode(),
  });
}
