"use client";

import { useEffect } from "react";

/**
 * GhostWriterHunt — Trust Block
 * Superside-style full-width dark confidence band:
 * bold statement, gold-divided stats, genre trust chips.
 * Scroll-reveal via tb- prefixed CSS classes.
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
  // Scroll-reveal: fire once when ~15% of each target is visible
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".tb-reveal, .tb-reveal-stats, .tb-reveal-chips"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0");
            setTimeout(() => {
              entry.target.classList.add("tb-visible");
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
        el.classList.remove("tb-visible");
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
          radial-gradient(ellipse at 100% 0%, rgba(201,168,76,0.08) 0%, transparent 60%),
          radial-gradient(ellipse at 0% 100%, rgba(201,168,76,0.08) 0%, transparent 60%)
        `,
      }}
      aria-label="Our Standard"
    >
      <style>{`
         .tb-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }

        .tb-reveal-stats {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .tb-reveal-chips {
          opacity: 0;
          transition: opacity 0.5s ease-out;
          transition-delay: 0.4s;
        }

         .tb-reveal.tb-visible,
        .tb-reveal-stats.tb-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .tb-reveal-chips.tb-visible {
          opacity: 1;
        }

        @media (max-width: 768px) {
           .tb-reveal { transform: translateY(20px); }
           .tb-reveal.tb-visible { transform: translateY(0); }
          .tb-stats-row {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            width: 100%;
          }
          .tb-stats-row > div {
            width: 100%;
            justify-content: center;
          }
          .tb-reveal-stats {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
          .tb-reveal-stats p:first-child {
            font-size: 40px !important;
          }
          .tb-section-inner {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
      `}</style>

      <div className="tb-section-inner mx-auto w-full max-w-[1200px] px-6 lg:px-8">
        {/* ——— Part 1: centered statement ——— */}
        <div className="tb-reveal flex flex-col items-center text-center" data-delay="0">
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
        <div className="tb-stats-row flex flex-col items-center justify-center sm:flex-row sm:flex-wrap lg:flex-nowrap">
          {STATS.map((stat, index) => (
            <div key={stat.label} className="flex items-center">
              {index > 0 && (
                <div
                  className="mx-0 hidden h-[60px] w-px shrink-0 bg-[rgba(201,168,76,0.3)] sm:block"
                  aria-hidden="true"
                />
              )}
              <div
                className="tb-reveal-stats px-10 py-6 text-center sm:py-0"
                data-delay={index * 100}
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
        <ul className="tb-reveal-chips mt-12 flex flex-wrap items-center justify-center gap-3" data-delay="400">
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
