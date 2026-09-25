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
  // Scroll-reveal: fire once when ~15% of each target is visible
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".nb4-reveal-left, .nb4-reveal-right, .nb4-reveal-card"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0");
            setTimeout(() => {
              entry.target.classList.add("nb4-is-visible");
            }, delay);
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
      elements.forEach((el) => {
        el.classList.remove("nb4-is-visible");
        observer.observe(el);
      });
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
        }

        .nb4-reveal-card {
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }

        .nb4-reveal-left.nb4-is-visible,
        .nb4-reveal-right.nb4-is-visible,
        .nb4-reveal-card.nb4-is-visible {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        @media (max-width: 768px) {
          .nb4-reveal-left { transform: translateX(-20px); }
          .nb4-reveal-right { transform: translateX(20px); }
          .nb4-reveal-left.nb4-is-visible,
          .nb4-reveal-right.nb4-is-visible {
            transform: translateX(0) scale(1);
          }
          .nb4-section-inner {
            padding-left: 20px !important;
            padding-right: 20px !important;
            gap: 32px !important;
          }
          .nb4-section-img {
            height: 280px !important;
          }
          .nb4-reveal-card {
            display: none !important;
          }
          .nb4-platform-list {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            gap: 8px;
            margin-bottom: 28px !important;
            margin-left: -4px;
            margin-right: -4px;
            padding-bottom: 6px;
          }
          .nb4-platform-list::-webkit-scrollbar {
            display: none;
          }
          .nb4-platform-list > li {
            flex: 0 0 auto;
          }
          .nb4-platform-chip {
            min-width: 118px;
            min-height: 42px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 8px 12px !important;
            font-size: 12px !important;
            line-height: 1.25;
            border-radius: 999px !important;
          }
          .nb4-mini-stats {
            display: grid !important;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
            align-items: start;
            width: 100%;
          }
          .nb4-mini-stats > div {
            text-align: center;
            min-width: 0;
          }
          .nb4-mini-stats p:first-child {
            font-size: 26px !important;
          }
          .nb4-mini-stats p:last-child {
            font-size: 11px !important;
            line-height: 1.35;
          }
        }
      `}</style>

      {/* Text first → on top for mobile; left on desktop */}
      <div className="nb4-section-inner mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-6 lg:flex-row lg:gap-[60px] lg:px-8">
        {/* ——— Left (55%): publishing copy, platforms, stats, CTA ——— */}
        <div className="nb4-reveal-left w-full max-w-full lg:w-[55%]" data-delay="0">
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
            every platform, ISBN setup and publishing guidance, metadata
            optimization and global distribution. Your book goes live on 47+
            platforms worldwide. You keep 100% of your rights and every
            dollar of royalties.
          </p>

          {/* Platform chips */}
          <ul className="nb4-platform-list mb-9 flex flex-wrap gap-2.5">
            {PLATFORMS.map((platform) => (
              <li key={platform}>
                <span
                  className="nb4-platform-chip inline-block rounded-lg border border-[rgba(255,255,255,0.12)] px-5 py-2.5 font-inter text-[13px] font-semibold text-[#FFFFFF]"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  {platform}
                </span>
              </li>
            ))}
          </ul>

          {/* Mini stats */}
          <div className="nb4-mini-stats mb-0 flex flex-wrap items-start gap-8">
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
        <div className="nb4-reveal-right relative w-full lg:w-[45%]" data-delay="150">
          <div className="relative w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/library.webp"
              alt="Grand library with shelves of books reaching worldwide readers"
              className="nb4-section-img h-[600px] w-full max-w-full rounded-[12px] object-cover"
              width="800"
              height="1200"
              loading="eager"
              decoding="async"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(201,168,76,0.2), 0 20px 60px rgba(0,0,0,0.4)",
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            />

            {/* Floating gold card — top-right overlap */}
            <div
              className="nb4-reveal-card nb4-float-card-pos absolute right-[-20px] top-[30px] rounded-xl bg-[#C9A84C] px-5 py-4"
              data-delay="400"
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
