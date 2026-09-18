"use client";

import { useEffect } from "react";

/**
 * GhostWriterHunt — Narrative Block 3
 * Dark charcoal global publishing band: platforms, reach stats, CTA.
 * Scroll-reveal via nb4- prefixed CSS classes.
 */

const PLATFORMS = [
  "Amazon KDP",
  "Apple Books",
  "Google Play",
  "Kobo",
  "Barnes & Noble",
  "Draft2Digital",
];

const STATS = [
  { number: "47", suffix: "+", label: "Platforms" },
  { number: "100", suffix: "%", label: "Rights Yours" },
  { number: "30", suffix: "", label: "Days to Publish" },
];

function WhiteGlobeIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="9" stroke="#FFFFFF" strokeWidth="1.6" />
      <path
        d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-5.8-3.8-9s1.3-6.2 3.8-9z"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function NarrativeBlock3() {
  // Reveal once when targets scroll 100px into the viewport
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".nb4-reveal-left, .nb4-reveal-right, .nb4-reveal-card"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("nb4-is-visible");
            }, 100);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    elements.forEach((el) => {
      el.classList.remove("nb4-is-visible");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden border-0 bg-[#1C1C1C] py-[80px]"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 0% 0%, rgba(201,168,76,0.08) 0%, transparent 60%),
          radial-gradient(ellipse at 100% 100%, rgba(201,168,76,0.08) 0%, transparent 60%)
        `,
      }}
      aria-label="Global Publishing"
    >
      {/* Scroll-reveal states — nb4- prefix avoids clashes with other blocks */}
      <style>{`
        .nb4-reveal-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }

        .nb4-reveal-right {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
          transition-delay: 0.15s;
        }

        .nb4-reveal-card {
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
          transition-delay: 0.4s;
        }

        .nb4-reveal-left.nb4-is-visible,
        .nb4-reveal-right.nb4-is-visible,
        .nb4-reveal-card.nb4-is-visible {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      `}</style>

      {/* Text first → on top for mobile; left on desktop */}
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-6 lg:flex-row lg:gap-[60px] lg:px-8">
        {/* ——— Left (55%): publishing copy, platforms, stats, CTA ——— */}
        <div className="nb4-reveal-left w-full lg:w-[55%]">
          <p className="mb-5 font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[#C9A84C]">
            GLOBAL PUBLISHING
          </p>

          <h2 className="mb-6 font-playfair text-[36px] font-bold leading-[1.1] tracking-[-0.02em] lg:text-[56px]">
            <span className="block text-[#FFFFFF]">Your book.</span>
            <span className="block italic text-[#C9A84C]">
              Published globally.
            </span>
          </h2>

          <p className="mb-9 max-w-[480px] font-inter text-[16px] font-normal leading-[1.7] text-[#999999]">
            Once your book is complete we handle everything — formatting for
            every platform, ISBN registration, metadata optimization and global
            distribution. Your book goes live on 47+ platforms worldwide. You
            keep 100% of your rights and every dollar of royalties.
          </p>

          {/* Platform chips */}
          <ul className="mb-9 flex flex-wrap gap-2.5">
            {PLATFORMS.map((platform) => (
              <li key={platform}>
                <span
                  className="inline-block rounded-lg border border-[rgba(255,255,255,0.12)] px-5 py-2.5 font-inter text-[13px] font-semibold text-[#FFFFFF]"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  {platform}
                </span>
              </li>
            ))}
          </ul>

          {/* Mini stats */}
          <div className="mb-0 flex flex-wrap items-start gap-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-playfair text-[28px] font-bold leading-none text-[#FFFFFF]">
                  {stat.number}
                  {stat.suffix ? (
                    <span className="text-[#C9A84C]">{stat.suffix}</span>
                  ) : null}
                </p>
                <p className="mt-1.5 font-inter text-[12px] font-normal text-[#666666]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <a
            href="#start"
            className="mt-9 inline-flex items-center justify-center rounded-[6px] bg-[#C9A84C] px-8 py-3.5 font-inter text-[15px] font-semibold text-[#FFFFFF] transition-colors duration-300 ease-in-out hover:bg-[#B8960C]"
          >
            Start Publishing Today
          </a>
        </div>

        {/* ——— Right (45%): image + floating platforms card ——— */}
        <div className="nb4-reveal-right relative w-full lg:w-[45%]">
          <div className="relative w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=700&fit=crop"
              alt="Stack of books ready for global publishing"
              className="h-[600px] w-full rounded-[12px] object-cover"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(201,168,76,0.2), 0 20px 60px rgba(0,0,0,0.4)",
              }}
            />

            {/* Floating gold card — top-right overlap */}
            <div
              className="nb4-reveal-card absolute right-[-20px] top-[30px] rounded-xl bg-[#C9A84C] px-5 py-4"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}
            >
              <div className="flex items-start gap-2.5">
                <WhiteGlobeIcon />
                <div>
                  <p className="font-playfair text-[20px] font-bold leading-tight text-[#FFFFFF]">
                    47+ Platforms
                  </p>
                  <p
                    className="mt-1 font-inter text-[12px] font-normal"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    worldwide distribution
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
