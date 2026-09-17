/**
 * GhostWriterHunt — Hero section
 * Reedsy warmth + cream canvas, Superside-level headline impact.
 * Entrance motion via CSS keyframes only (no animation libraries).
 */
export default function Hero() {
  const genres = [
    "Fiction",
    "Non-Fiction",
    "Biography",
    "Self-Help",
    "Business",
    "Memoir",
  ];

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center bg-[var(--color-background)] px-6 pb-20 pt-[140px]"
      aria-label="Hero"
    >
      {/* Scoped entrance + bounce animations (CSS only) */}
      <style>{`
        @keyframes gwh-fade-up {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gwh-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }

        .gwh-hero-animate {
          opacity: 0;
          animation: gwh-fade-up 0.7s ease-out forwards;
        }

        .gwh-hero-delay-0 { animation-delay: 0s; }
        .gwh-hero-delay-1 { animation-delay: 0.2s; }
        .gwh-hero-delay-2 { animation-delay: 0.4s; }
        .gwh-hero-delay-3 { animation-delay: 0.6s; }
        .gwh-hero-delay-4 { animation-delay: 0.8s; }

        .gwh-scroll-bounce {
          animation: gwh-bounce 1.6s ease-in-out infinite;
        }
      `}</style>

      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
        {/* ——— Headline: clarity (Reedsy) + impact (Superside) ——— */}
        <h1 className="gwh-hero-animate gwh-hero-delay-0 font-playfair text-[36px] leading-[1.15] text-[var(--color-text)] sm:text-[48px] lg:text-[72px]">
          <span className="block font-normal">Where Ideas</span>
          <span className="block italic">Become Books.</span>
        </h1>

        {/* ——— Subheadline ——— */}
        <p className="gwh-hero-animate gwh-hero-delay-1 mt-6 max-w-[600px] font-inter text-[18px] font-normal leading-[1.8] text-[#666666] lg:text-[20px]">
          Professional ghostwriters, designers and editors — everything your
          book needs, under one roof.
        </p>

        {/* ——— CTA row ——— */}
        <div className="gwh-hero-animate gwh-hero-delay-2 mt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#start"
            className="rounded-[6px] bg-[var(--color-accent-gold)] px-8 py-4 font-inter text-base font-semibold text-white transition-colors duration-300 hover:bg-[#B8960C]"
          >
            Start Your Book
          </a>
          <a
            href="#how-it-works"
            className="rounded-[6px] border-2 border-[var(--color-accent-gold)] bg-transparent px-8 py-4 font-inter text-base font-semibold text-[var(--color-accent-gold)] transition-colors duration-300 hover:bg-[var(--color-accent-gold)] hover:text-white"
          >
            See How It Works
          </a>
        </div>

        {/* ——— Trust line with gold dot separators ——— */}
        <p className="gwh-hero-animate gwh-hero-delay-3 mt-6 flex items-center justify-center gap-3 font-inter text-[14px] font-normal text-[#999999]">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent-gold)]"
            aria-hidden="true"
          />
          Trusted by 500+ authors worldwide
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent-gold)]"
            aria-hidden="true"
          />
        </p>

        {/* ——— Genre pills ——— */}
        <ul className="gwh-hero-animate gwh-hero-delay-4 mt-6 flex max-w-[720px] flex-wrap items-center justify-center gap-3">
          {genres.map((genre) => (
            <li key={genre}>
              <span className="inline-block cursor-default rounded-[20px] border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-2 font-inter text-[13px] font-medium text-[var(--color-accent-olive)] transition-colors duration-300 hover:border-[var(--color-accent-gold)]">
                {genre}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ——— Scroll indicator ——— */}
      <a
        href="#how-it-works"
        className="gwh-scroll-bounce absolute bottom-8 left-1/2 flex -translate-x-1/2 text-[var(--color-accent-gold)]"
        aria-label="Scroll to next section"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}
