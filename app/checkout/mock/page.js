"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function formatMoney(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

function MockCheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get("paymentId");

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    if (!paymentId) {
      setError("Missing payment reference.");
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/stripe/mock/payment?paymentId=${encodeURIComponent(paymentId)}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not load payment");
        if (!cancelled) setPayment(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [paymentId]);

  async function handleComplete() {
    if (!paymentId || completing) return;
    setCompleting(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/mock/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not complete payment");
      router.push("/checkout/success?mock=1");
    } catch (err) {
      setError(err.message);
      setCompleting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-6 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-[0_8px_48px_rgba(28,28,28,0.08)]">
        <div className="border-b border-[var(--color-border)] bg-[#1C1C1C] px-6 py-5 rounded-t-2xl">
          <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C9A84C]">
            Demo checkout
          </p>
          <h1 className="mt-1 font-playfair text-[24px] font-bold text-white">GhostWriterHunt</h1>
          <p className="mt-1 font-inter text-[13px] text-[#999999]">
            Mock payment mode — Stripe is not connected yet. No real charge is made.
          </p>
        </div>

        <div className="px-6 py-6">
          {loading ? (
            <p className="font-inter text-[14px] text-[#999999]">Loading payment details…</p>
          ) : error ? (
            <div>
              <p className="font-inter text-[14px] text-[#9A2E24]">{error}</p>
              <Link href="/#pricing" className="mt-4 inline-block font-inter text-[14px] text-[var(--color-accent-gold)] hover:underline">
                Back to pricing
              </Link>
            </div>
          ) : payment?.status === "paid" ? (
            <div>
              <p className="font-inter text-[14px] text-[#4F7A3A]">This demo payment is already marked as paid.</p>
              <Link
                href="/checkout/success?mock=1"
                className="mt-4 inline-block rounded-lg bg-[var(--color-accent-gold)] px-5 py-2.5 font-inter text-[14px] font-semibold text-white"
              >
                View confirmation
              </Link>
            </div>
          ) : (
            <>
              <p className="font-inter text-[14px] text-[#666666]">{payment.description}</p>
              <p className="mt-4 font-playfair text-[40px] font-bold leading-none text-[var(--color-text)]">
                {formatMoney(payment.amountCents)}
              </p>
              <p className="mt-1 font-inter text-[13px] text-[#999999]">One-time · USD</p>

              <div className="mt-6 rounded-xl border border-dashed border-[#C9A84C] bg-[#FFFBF0] px-4 py-3">
                <p className="font-inter text-[12px] leading-relaxed text-[#8A6D2C]">
                  This page simulates Stripe Checkout for design and CRM testing. When you add real Stripe
                  keys, customers will be redirected to checkout.stripe.com instead.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <div className="rounded-lg border border-[var(--color-border)] bg-white px-4 py-3">
                  <p className="font-inter text-[11px] font-semibold uppercase tracking-wide text-[#999999]">
                    Card number
                  </p>
                  <p className="mt-1 font-inter text-[14px] text-[#CCCCCC]">4242 4242 4242 4242 (demo)</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-[var(--color-border)] bg-white px-4 py-3">
                    <p className="font-inter text-[11px] font-semibold uppercase tracking-wide text-[#999999]">Expiry</p>
                    <p className="mt-1 font-inter text-[14px] text-[#CCCCCC]">12 / 34</p>
                  </div>
                  <div className="rounded-lg border border-[var(--color-border)] bg-white px-4 py-3">
                    <p className="font-inter text-[11px] font-semibold uppercase tracking-wide text-[#999999]">CVC</p>
                    <p className="mt-1 font-inter text-[14px] text-[#CCCCCC]">123</p>
                  </div>
                </div>
              </div>

              {error && <p className="mt-4 font-inter text-[13px] text-[#9A2E24]">{error}</p>}

              <button
                type="button"
                onClick={handleComplete}
                disabled={completing}
                className="mt-6 w-full rounded-lg bg-[var(--color-accent-gold)] px-6 py-3.5 font-inter text-[15px] font-semibold text-white transition-colors hover:bg-[#B8960C] disabled:opacity-60"
              >
                {completing ? "Processing demo payment…" : "Complete demo payment"}
              </button>

              <Link
                href="/checkout/cancel"
                className="mt-3 block text-center font-inter text-[13px] text-[#666666] hover:text-[var(--color-text)]"
              >
                Cancel
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default function MockCheckoutPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center font-inter text-[#999999]">Loading…</div>}>
      <MockCheckoutContent />
    </Suspense>
  );
}
