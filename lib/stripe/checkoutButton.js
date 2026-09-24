/**
 * GhostWriterHunt — start fixed-package Stripe Checkout from the browser.
 */
export async function startPackageCheckout(packageKey, options = {}) {
  const res = await fetch("/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      packageKey,
      accessToken: options.accessToken || null,
      conversationId: options.conversationId || null,
      email: options.email || null,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Could not start checkout");
  }
  if (data.url) {
    window.location.href = data.url;
    return;
  }
  throw new Error("Checkout URL missing");
}
