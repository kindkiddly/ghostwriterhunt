import Link from "next/link";

export const metadata = {
  title: "Payment received | GhostWriterHunt",
};

export default function CheckoutSuccessPage({ searchParams }) {
  const isMock = searchParams?.mock === "1";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-6 py-16">
      <div className="max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-10 text-center shadow-sm">
        {isMock && (
          <p className="mb-4 rounded-lg bg-[#FFFBF0] px-3 py-2 font-inter text-[12px] text-[#8A6D2C]">
            Demo payment only. No real charge. Connect Stripe keys to accept live payments.
          </p>
        )}
        <h1 className="font-playfair text-[28px] font-bold leading-snug text-[var(--color-text)]">
          Thank you — your payment is confirmed
        </h1>
        <p className="mt-4 font-inter text-[15px] leading-relaxed text-[#666666]">
          Your payment was processed securely through Stripe. A receipt and invoice have been sent to
          your email.
        </p>
        <p className="mt-4 font-inter text-[15px] leading-relaxed text-[#666666]">
          What happens next: your dedicated project manager will contact you within 24 hours to
          confirm your project details and get started. Everything you share with us stays fully
          confidential.
        </p>
        <p className="mt-4 font-inter text-[14px] leading-relaxed text-[#666666]">
          Questions? Email us at{" "}
          <a
            href="mailto:ghostwriterhunt@lumexforge.com"
            className="font-medium text-[var(--color-accent-gold)] hover:underline"
          >
            ghostwriterhunt@lumexforge.com
          </a>
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-[var(--color-accent-gold)] px-6 py-3 font-inter text-[15px] font-semibold text-white transition-colors hover:bg-[#B8960C]"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
