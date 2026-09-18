"use client";

import { useEffect } from "react";

/**
 * GhostWriterHunt — Trust Block
 * Superside-style full-width dark confidence band:
 * bold statement, gold-divided stats, genre trust chips.
 * Scroll-reveal via nb3- prefixed CSS classes.
 */

const STATS = [
  { number: "1", suffix: "%", label: "of applicants accepted" },
  { number: "5,000", suffix: "+", label: "books written" },
  { number: "98", suffix: "%", label: "client satisfaction rate" },
  { number: "200", suffix: "+", label: "professional writers" },
];

const CHIPS = [
  "Fiction Specialists",
  "Non-Fiction Experts",
  "Biography Writers",
  "Memoir Specialists",
  "Business Book Authors",
  "Children's Book Writers",
];

export default function TrustBlock() {
  // Reveal headline, stats, and chips once when section scrolls into view
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".nb3-reveal-up, .nb3-reveal-stats, .nb3-reveal-chips"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("nb3-is-visible");
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
      el.classList.remove("nb3-is-visible");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden border-0 bg-[#1C1C1C] py-[80px]"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 100% 0%, rgba(201,168,76,0.08) 0%, transparent 60%),
          radial-gradient(ellipse at 0% 100%, rgba(201,168,76,0.08) 0%, transparent 60%)
        `,
      }}
      aria-label="Our Standard"
    >
      <style>{`
        .nb3-reveal-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }

        .nb3-reveal-stats {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .nb3-reveal-chips {
          opacity: 0;
          transition: opacity 0.5s ease-out;
          transition-delay: 0.4s;
        }

        .nb3-reveal-up.nb3-is-visible,
        .nb3-reveal-stats.nb3-is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .nb3-reveal-chips.nb3-is-visible {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .nb3-reveal-up { transform: translateY(20px); }
          .nb3-reveal-up.nb3-is-visible { transform: translateY(0); }
          .nb3-stats-row {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            width: 100%;
          }
          .nb3-stats-row > div {
            width: 100%;
            justify-content: center;
          }
          .nb3-reveal-stats {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
          .nb3-reveal-stats p:first-child {
            font-size: 40px !important;
          }
          .nb3-section-inner {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
      `}</style>

      <div className="nb3-section-inner mx-auto w-full max-w-[1200px] px-6 lg:px-8">
        {/* ——— Part 1: centered statement ——— */}
        <div className="nb3-reveal-up flex flex-col items-center text-center">
          <p className="mb-5 font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[#C9A84C]">
            OUR STANDARD
          </p>

          <h2 className="mb-5 font-playfair text-[36px] font-bold leading-[1.1] tracking-[-0.02em] lg:text-[56px]">
            <span className="block text-[#FFFFFF]">Only the best writers</span>
            <span className="block italic text-[#C9A84C]">make our team.</span>
          </h2>

          <p className="mb-[60px] max-w-[600px] font-inter text-[16px] font-normal leading-[1.7] text-[#999999] break-words">
            Every ghostwriter on our platform goes through a rigorous vetting
            process. We accept only the top 1% of applicants — ensuring every
            author receives nothing short of exceptional.
          </p>
        </div>

        {/* ——— Part 2: stats row with gold dividers ——— */}
        <div className="nb3-stats-row flex flex-col items-center justify-center sm:flex-row sm:flex-wrap lg:flex-nowrap">
          {STATS.map((stat, index) => (
            <div key={stat.label} className="flex items-center">
              {index > 0 && (
                <div
                  className="mx-0 hidden h-[60px] w-px shrink-0 bg-[rgba(201,168,76,0.3)] sm:block"
                  aria-hidden="true"
                />
              )}
              <div
                className="nb3-reveal-stats px-10 py-6 text-center sm:py-0"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <p className="font-playfair text-[56px] font-bold leading-none text-[#FFFFFF]">
                  {stat.number}
                  <span className="text-[#C9A84C]">{stat.suffix}</span>
                </p>
                <p className="mt-2 font-inter text-[14px] font-normal text-[#999999]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ——— Part 3: feature chips ——— */}
        <ul className="nb3-reveal-chips mt-12 flex flex-wrap items-center justify-center gap-3">
          {CHIPS.map((chip) => (
            <li key={chip}>
              <span
                className="inline-flex items-center rounded-[20px] border border-[rgba(201,168,76,0.3)] px-6 py-2.5 font-inter text-[14px] font-medium text-[#C9A84C]"
                style={{ background: "rgba(201,168,76,0.1)" }}
              >
                ✦ {chip}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
