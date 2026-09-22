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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            const duration = 2000;
            countUp(entry.target, target, duration);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    requestAnimationFrame(() => {
      counters.forEach((el) => {
        el.textContent = "0";
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        className="w-full bg-[var(--color-background)] py-[80px]"
        aria-label="Impact statistics"
      >
        <div className="mx-auto max-w-[1100px] px-5 sm:px-6">
          {/* Section label */}
          <p className="mb-4 text-center font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent-olive)]">
            Our Impact in Numbers
          </p>

          {/* Headline — second line italic gold */}
          <h2 className="mb-16 text-center font-playfair text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] lg:text-[56px]">
            <span className="block">Trusted by authors</span>
            <span className="block italic text-[var(--color-accent-gold)]">
              around the world.
            </span>
          </h2>

          {/* Stats grid: 1 → 2 → 4 columns */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="border-t-[3px] border-[var(--color-accent-gold)] pt-8 text-center"
              >
                <p className="font-playfair text-[48px] font-bold leading-none text-[var(--color-text)] lg:text-[64px]">
                  <span
                    className="stat-number"
                    data-target={stat.target}
                  >
                    0
                  </span>
                  <span className="stat-suffix text-[var(--color-accent-gold)]">
                    {stat.suffix}
                  </span>
                </p>
                <p className="mt-2 font-inter text-[15px] font-normal leading-[1.6] text-[#666666]">
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
