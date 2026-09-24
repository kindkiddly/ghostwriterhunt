import Link from "next/link";

export const metadata = {
  title: "Payment cancelled — GhostWriterHunt",
};

export default function CheckoutCancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-6 py-16">
      <div className="max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-10 text-center shadow-sm">
        <h1 className="font-playfair text-[28px] font-bold text-[var(--color-text)]">
          Payment cancelled
        </h1>
        <p className="mt-4 font-inter text-[15px] leading-relaxed text-[#666666]">
          No charge was made. You can try again from our pricing page or chat with us if you need
          help choosing a package.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/#pricing"
            className="inline-block rounded-lg bg-[var(--color-accent-gold)] px-6 py-3 font-inter text-[15px] font-semibold text-white transition-colors hover:bg-[#B8960C]"
          >
            View pricing
          </Link>
          <Link
            href="/"
            className="inline-block rounded-lg border-2 border-[var(--color-accent-gold)] px-6 py-3 font-inter text-[15px] font-semibold text-[var(--color-accent-gold)] transition-colors hover:bg-[var(--color-accent-gold)] hover:text-white"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
