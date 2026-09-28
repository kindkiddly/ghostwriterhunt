"use client";

import { useState } from "react";
import Link from "next/link";

const INPUT_CLASS =
  "w-full rounded-lg border border-[#E8D5A3] bg-white px-4 py-3 font-inter text-[15px] text-[#1C1C1C] outline-none transition-shadow focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/25";

export default function PayPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [amountUsd, setAmountUsd] = useState("");
  const [paymentNote, setPaymentNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/stripe/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, amountUsd, paymentNote }),
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
    } catch (err) {
      setError(err.message || "Something went wrong");
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--color-background,#FAFAF7)] pt-[100px] pb-16">
      <div className="mx-auto max-w-[560px] px-6">
        <p className="mb-2 font-inter text-[12px] font-semibold uppercase tracking-[0.14em] text-[#C9A84C]">
          Payment
        </p>
        <h1 className="mb-4 font-playfair text-[32px] font-bold leading-tight text-[#1C1C1C] sm:text-[36px]">
          Custom payment
        </h1>
        <p className="mb-8 font-inter text-[15px] leading-relaxed text-[#555555]">
          Use this page for amounts agreed with our team after discussing your project in a
          consultation. If you have not confirmed the amount with us yet, please{" "}
          <Link href="/#start" className="font-medium text-[#C9A84C] hover:underline">
            book a free consultation
          </Link>{" "}
          first.
        </p>

        <form
          onSubmit={handleSubmit}
          className="rounded-[20px] border border-[#E8D5A3] bg-[var(--color-card,#FFFFFF)] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.04)] sm:p-8"
        >
          <label className="mb-5 block">
            <span className="mb-2 block font-inter text-[13px] font-semibold text-[#1C1C1C]">
              Full name
            </span>
            <input
              type="text"
              name="fullName"
              autoComplete="name"
              required
              maxLength={120}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={INPUT_CLASS}
            />
          </label>

          <label className="mb-5 block">
            <span className="mb-2 block font-inter text-[13px] font-semibold text-[#1C1C1C]">
              Email address
            </span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={INPUT_CLASS}
            />
          </label>

          <label className="mb-5 block">
            <span className="mb-2 block font-inter text-[13px] font-semibold text-[#1C1C1C]">
              Agreed amount (USD)
            </span>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-inter text-[15px] text-[#888888]">
                $
              </span>
              <input
                type="number"
                name="amountUsd"
                min={1}
                step={1}
                required
                value={amountUsd}
                onChange={(e) => setAmountUsd(e.target.value)}
                className={`${INPUT_CLASS} pl-8`}
                placeholder="Amount in USD"
              />
            </div>
            <span className="mt-1.5 block font-inter text-[12px] leading-relaxed text-[#888888]">
              Enter the amount agreed with your project manager. Your payment is fully secure, and
              you&apos;ll receive an invoice by email right away.
            </span>
          </label>

          <label className="mb-6 block">
            <span className="mb-2 block font-inter text-[13px] font-semibold text-[#1C1C1C]">
              Payment note
            </span>
            <textarea
              name="paymentNote"
              required
              maxLength={300}
              rows={4}
              value={paymentNote}
              onChange={(e) => setPaymentNote(e.target.value)}
              placeholder='e.g. "Editing chapters 1–5 as agreed"'
              className={`${INPUT_CLASS} resize-y min-h-[100px]`}
            />
            <span className="mt-1.5 block text-right font-inter text-[11px] text-[#999999]">
              {paymentNote.length}/300
            </span>
          </label>

          {error && (
            <p className="mb-4 font-inter text-[13px] text-[#9A2E24]" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="gwh-gold-btn-fill w-full rounded-lg bg-[#C9A84C] px-6 py-3.5 font-inter text-[15px] font-semibold text-white transition-colors hover:bg-[#B8960C] disabled:opacity-60"
          >
            {submitting ? "Redirecting to Stripe…" : "Continue to secure checkout"}
          </button>

          <p className="mt-5 text-center font-inter text-[12px] leading-relaxed text-[#888888]">
            🔒 Secure payment by Stripe · Instant invoice · 100% confidential
          </p>
        </form>
      </div>
    </main>
  );
}
