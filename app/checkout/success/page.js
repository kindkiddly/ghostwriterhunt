import Link from "next/link";

export const metadata = {
  title: "Payment received — GhostWriterHunt",
};

export default function CheckoutSuccessPage({ searchParams }) {
  const isMock = searchParams?.mock === "1";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-6 py-16">
      <div className="max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-10 text-center shadow-sm">
        <p className="font-inter text-[12px] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-gold)]">
          Thank you
        </p>
        <h1 className="mt-3 font-playfair text-[28px] font-bold text-[var(--color-text)]">
          Payment received
        </h1>
        {isMock && (
          <p className="mt-3 rounded-lg bg-[#FFFBF0] px-3 py-2 font-inter text-[12px] text-[#8A6D2C]">
            Demo payment only — no real charge. Connect Stripe keys to accept live payments.
          </p>
        )}
        <p className="mt-4 font-inter text-[15px] leading-relaxed text-[#666666]">
          {isMock
            ? "Your demo payment was recorded in the admin CRM for testing. A team member would reach out here on a live site."
            : "Your payment was processed securely through Stripe. A team member will reach out shortly to get your project started."}
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
