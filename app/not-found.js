import Footer from "@/components/Footer";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <>
      <main className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-[var(--color-background)] px-6 py-32 text-center">
        <p className="mb-4 font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent-olive)]">
          404
        </p>
        <h1 className="mb-4 font-playfair text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] lg:text-[48px]">
          <span className="block">This page isn&apos;t</span>
          <span className="block italic text-[var(--color-accent-gold)]">
            part of the story.
          </span>
        </h1>
        <p className="mb-9 max-w-[420px] font-inter text-[16px] font-normal leading-[1.7] text-[#666666]">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-[6px] bg-[#C9A84C] px-8 py-3.5 font-inter text-[15px] font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-[#B8960C]"
        >
          Back to Home
        </a>
      </main>
      <Footer />
    </>
  );
}
