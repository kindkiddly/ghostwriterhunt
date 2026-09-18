/**
 * GhostWriterHunt — Logo Ticker
 * Social-proof strip in the Reedsy / Superside style:
 * a continuous, seamless horizontal scroll of publishing platforms.
 * Animation is CSS-only (no JS libraries).
 */
export default function LogoTicker() {
  const platforms = [
    "Amazon KDP",
    "Apple Books",
    "Google Play Books",
    "Kindle Direct",
    "Smashwords",
    "Barnes & Noble Press",
    "Kobo Writing Life",
    "Draft2Digital",
  ];

  // Duplicate the list so the -50% translate loops without a visible jump
  const loopItems = [...platforms, ...platforms];

  return (
    <section
      className="overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-card)] py-6"
      aria-label="Trusted publishing platforms"
    >
      {/* Scoped marquee keyframes */}
      <style>{`
        @keyframes gwh-ticker-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .gwh-ticker-track {
          display: flex;
          width: max-content;
          animation: gwh-ticker-scroll 40s linear infinite;
        }
      `}</style>

      {/* Label above the strip */}
      <p className="mb-5 text-center font-inter text-[13px] font-normal tracking-[0.05em] text-[#999999]">
        Trusted by authors publishing on
      </p>

      {/* Scrolling track — two identical halves for a seamless loop */}
      <div className="relative w-full overflow-hidden" aria-hidden="true">
        <ul className="gwh-ticker-track items-center">
          {loopItems.map((name, index) => (
            <li key={`${name}-${index}`} className="flex items-center">
              <span className="whitespace-nowrap px-6 font-inter text-base font-semibold tracking-[0.05em] text-[var(--color-accent-gold)]">
                {name}
              </span>
              <span
                className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-gold)]"
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Accessible static list for screen readers */}
      <ul className="sr-only">
        {platforms.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </section>
  );
}
