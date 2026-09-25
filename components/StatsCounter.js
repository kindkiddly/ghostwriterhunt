"use client";

import { useEffect } from "react";

/**
 * GhostWriterHunt — Stats Counters
 * Superside-style count-up digits with Reedsy's warm literary tone.
 * Triggers once via Intersection Observer when each digit enters view.
 */

const STATS = [
  { target: 5000, suffix: "+", label: "Books Written" },
  { target: 50, suffix: "+", label: "Genres Covered" },
  { target: 98, suffix: "%", label: "Client Satisfaction" },
  { target: 200, suffix: "+", label: "Professional Writers" },
];

/** Animate a DOM node from 0 → target over `duration` ms (~60fps) */
const countUp = (element, target, duration) => {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(start).toLocaleString();
  }, 16);
};

export default function StatsCounter() {
  // Count-up once when each .stat-number scrolls into view
  useEffect(() => {
    const counters = document.querySelectorAll(".stat-number");

    const runCount = (el) => {
      if (el.dataset.animated === "true") return;
      el.dataset.animated = "true";
      const target = parseInt(el.dataset.target, 10);
      el.textContent = "0";
      countUp(el, target, 2000);
      observer.unobserve(el);
    };

    const checkAll = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      counters.forEach((el) => {
        if (el.dataset.animated === "true") return;
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.95 && rect.bottom > vh * 0.05) runCount(el);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) runCount(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px" }
    );

    counters.forEach((el) => observer.observe(el));
    requestAnimationFrame(checkAll);
    window.addEventListener("scroll", checkAll, { passive: true });
    window.addEventListener("resize", checkAll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkAll);
      window.removeEventListener("resize", checkAll);
    };
  }, []);

  return (
    <>
      <section
        className="gwh-stats-section w-full bg-[var(--color-background)] py-[80px]"
        aria-label="Impact statistics"
      >
        <style>{`
          @media (max-width: 768px) {
            .gwh-stats-section {
              padding-top: 52px !important;
              padding-bottom: 52px !important;
            }
            .gwh-stats-headline {
              margin-bottom: 24px !important;
              font-size: 28px !important;
            }
            .gwh-stats-grid {
              display: grid !important;
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              gap: 10px !important;
            }
            .gwh-stat-item {
              border-top: none !important;
              padding: 14px 10px 16px !important;
              text-align: center;
              border-radius: 14px;
              background: var(--color-card);
              border: 1px solid var(--color-border);
              box-shadow: 0 6px 20px rgba(201, 168, 76, 0.1);
              position: relative;
              overflow: hidden;
            }
            .gwh-stat-item::before {
              content: "";
              position: absolute;
              top: 0;
              left: 12px;
              right: 12px;
              height: 3px;
              border-radius: 0 0 4px 4px;
              background: var(--color-accent-gold);
            }
            .gwh-stat-value {
              position: relative;
              z-index: 1;
              font-size: 34px !important;
            }
            .gwh-stat-label {
              margin-top: 6px !important;
              font-size: 11px !important;
              line-height: 1.35 !important;
              letter-spacing: 0.01em;
            }
          }
        `}</style>
        <div className="mx-auto max-w-[1100px] px-5 sm:px-6">
          {/* Section label */}
          <p className="mb-3 text-center font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent-olive)] max-lg:mb-2">
            Our Impact in Numbers
          </p>

          {/* Headline — second line italic gold */}
          <h2 className="gwh-stats-headline mb-16 text-center font-playfair text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] lg:text-[56px]">
            <span className="block">Trusted by authors</span>
            <span className="block italic text-[var(--color-accent-gold)]">
              around the world.
            </span>
          </h2>

          {/* Stats grid: 1 → 2 → 4 columns */}
          <div className="gwh-stats-grid grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="gwh-stat-item border-t-[3px] border-[var(--color-accent-gold)] pt-8 text-center"
              >
                <p className="gwh-stat-value font-playfair text-[48px] font-bold leading-none text-[var(--color-text)] lg:text-[64px]">
                  <span
                    className="stat-number"
                    data-target={stat.target}
                  >
                    {stat.target.toLocaleString()}
                  </span>
                  <span className="stat-suffix text-[var(--color-accent-gold)]">
                    {stat.suffix}
                  </span>
                </p>
                <p className="gwh-stat-label mt-2 font-inter text-[15px] font-normal leading-[1.6] text-[#666666]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width gold divider after the section */}
      <div
        className="h-px w-full bg-[var(--color-border)]"
        aria-hidden="true"
      />
    </>
  );
}
