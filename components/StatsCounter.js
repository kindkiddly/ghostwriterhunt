"use client";

import { useEffect, useRef, useState } from "react";

/**
 * GhostWriterHunt — Stats Counters
 * Superside-style count-up digits with Reedsy's warm literary tone.
 * Triggers once via Intersection Observer when the section enters view.
 */

const STATS = [
  { value: 5000, suffix: "+", label: "Books Written" },
  { value: 50, suffix: "+", label: "Genres Covered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 200, suffix: "+", label: "Professional Writers" },
];

/** Ease-out cubic for a natural deceleration into the final number */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function StatItem({ value, suffix, label, active }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;

    const duration = 2000;
    let frameId;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutCubic(progress);
      setDisplay(Math.round(value * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, value]);

  return (
    <div className="border-t-[3px] border-[var(--color-accent-gold)] pt-8 text-center">
      <p className="font-playfair text-[48px] font-bold leading-none text-[var(--color-text)] lg:text-[64px]">
        <span>{display.toLocaleString()}</span>
        <span className="text-[var(--color-accent-gold)]">{suffix}</span>
      </p>
      <p className="mt-2 font-inter text-[15px] font-normal leading-[1.6] text-[#666666]">
        {label}
      </p>
    </div>
  );
}

export default function StatsCounter() {
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Fire count-up once when the section enters the viewport
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full bg-[var(--color-background)] py-[100px]"
        aria-label="Impact statistics"
      >
        <div className="mx-auto max-w-[1100px] px-6">
          {/* Section label */}
          <p className="mb-4 text-center font-inter text-[12px] font-medium uppercase tracking-[0.15em] text-[var(--color-accent-olive)]">
            Our Impact in Numbers
          </p>

          {/* Headline — second line italic gold */}
          <h2 className="mb-16 text-center font-playfair text-[32px] font-bold leading-tight text-[var(--color-text)] lg:text-[42px]">
            <span className="block">Trusted by authors</span>
            <span className="block italic text-[var(--color-accent-gold)]">
              around the world.
            </span>
          </h2>

          {/* Stats grid: 1 → 2 → 4 columns */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                active={hasAnimated}
              />
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
