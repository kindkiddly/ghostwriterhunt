"use client";

import { useEffect } from "react";
import FloatingImages from "@/components/service/FloatingImages";

/**
 * GhostWriterHunt — Narrative Block 1
 * Superside-style two-column story section:
 * bold copy + feature bullets left, floating images + card right.
 * Scroll-reveal via Intersection Observer + .nb1-is-visible CSS classes.
 */

const FEATURES = [
  {
    title: "Handpicked Professional Writers",
    description:
      "Every writer on our platform is vetted, experienced and proven — selected from the top 1% of applicants.",
  },
  {
    title: "Your Voice, Perfectly Captured",
    description:
      "We study how you speak and write before a single word is drafted — your book sounds like you.",
  },
  {
    title: "Every Genre Covered",
    description:
      "From literary fiction to business books, memoir to children's stories — we have specialists for every genre and format.",
  },
  {
    title: "100% Confidential Always",
    description:
      "Full NDA protection on every project. Your story, your ideas and your identity are completely safe.",
  },
];

const NB1_IMAGES = [
  {
    url: "/images/ghost-writer-3.webp",
    alt: "Writer at a typewriter under a desk lamp",
    size: "large",
  },
  {
    url: "/images/book-H3.webp",
    alt: "Handwriting a book story in a notebook beside writing books",
    size: "medium",
  },
  {
    url: "/images/Pen-writing.webp",
    alt: "Fountain pen writing on a manuscript page",
    size: "small",
  },
];

function GoldCheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-0.5 shrink-0"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="10" fill="#C9A84C" />
      <path
        d="M6 10.2l2.4 2.4L14 7"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NarrativeBlock1() {
  // Scroll-reveal: fire once when ~15% of each target is visible
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".nb1-reveal-left, .nb1-reveal-right, .nb1-reveal-card"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0");
            setTimeout(() => {
              entry.target.classList.add("nb1-is-visible");
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
        el.classList.remove("nb1-is-visible");
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="nb1-section-mobile relative w-full overflow-hidden bg-[#FFFFFF] py-[80px]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 0% 50%, rgba(201,168,76,0.05) 0%, transparent 60%)",
      }}
      aria-label="Why GhostWriterHunt"
    >
      {/* Scroll-reveal states — nb1- prefix avoids clashes with other sections */}
      <style>{`
        .nb1-reveal-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }

        .nb1-reveal-right {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }

        .nb1-reveal-card {
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }

        .nb1-reveal-left.nb1-is-visible,
        .nb1-reveal-right.nb1-is-visible,
        .nb1-reveal-card.nb1-is-visible {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        .nb1-img-wrap {
          position: relative;
          width: 100%;
          height: 520px;
          overflow: visible;
        }

        .nb1-float-card {
          position: absolute;
          bottom: -20px;
          left: -20px;
          background: #FFFFFF;
          border-radius: 12px;
          padding: 16px 20px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          border-left: 4px solid #C9A84C;
          z-index: 5;
        }

        @media (max-width: 768px) {
          .nb1-reveal-left { transform: translateX(-20px); }
          .nb1-reveal-right { transform: translateX(20px); }
          .nb1-reveal-left.nb1-is-visible,
          .nb1-reveal-right.nb1-is-visible {
            transform: translateX(0) scale(1);
          }
          .nb1-section-mobile {
            padding-top: 56px !important;
            padding-bottom: 56px !important;
          }
          .nb1-section-inner {
            padding-left: 20px !important;
            padding-right: 20px !important;
            gap: 24px !important;
          }
          .nb1-img-wrap {
            height: 408px;
          }
          .nb1-float-card {
            bottom: 0;
            left: 0;
            padding: 12px 14px;
            max-width: 220px;
          }
        }
      `}</style>

      <div className="nb1-section-inner mx-auto flex w-full max-w-[1200px] flex-col-reverse items-center gap-12 px-6 lg:flex-row lg:gap-[60px] lg:px-8">
        {/* ——— Left: label, headline, body, bullets, CTA ——— */}
        <div className="nb1-reveal-left w-full lg:w-1/2" data-delay="0">
          <p className="mb-5 font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[#6B7C3A]">
            WHY GHOSTWRITERHUNT
          </p>

          <h2 className="mb-6 font-playfair text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-[#1C1C1C] lg:text-[56px]">
            <span className="block font-normal">Your story deserves</span>
            <span className="block italic text-[#C9A84C]">
              professional hands.
            </span>
          </h2>

          <p className="mb-9 max-w-[480px] font-inter text-[16px] font-normal leading-[1.7] text-[#666666] break-words">
            Every great book begins with a visionary author and the right
            professional team behind them. At GhostWriterHunt, our dedicated
            project team learns your genre, voice, and vision — then personally
            matches you with a handpicked ghostwriter while keeping your
            communication securely managed through us. We guide you every step
            of the way from first idea to published masterpiece, with complete
            confidentiality throughout.
          </p>

          <ul className="mb-2 flex flex-col">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="mb-5 flex items-start gap-3">
                <GoldCheckIcon />
                <div>
                  <p className="font-inter text-[15px] font-semibold text-[#1C1C1C]">
                    {feature.title}
                  </p>
                  <p className="mt-1 font-inter text-[14px] font-normal leading-[1.6] text-[#666666]">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <a
            href="#writers"
            className="mt-2 inline-block font-inter text-[15px] font-semibold text-[#C9A84C] transition-colors duration-200 hover:text-[#B8960C] hover:underline"
          >
            Meet our writers →
          </a>
        </div>

        {/* ——— Right: floating images + stats card ——— */}
        <div className="nb1-reveal-right relative w-full max-w-full lg:w-1/2" data-delay="150">
          <div className="nb1-img-wrap">
            <FloatingImages images={NB1_IMAGES} eager />

            {/* Floating card — overlaps bottom-left */}
            <div
              className="nb1-float-card nb1-reveal-card"
              data-delay="400"
            >
              <div className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  style={{
                    color: "#C9A84C",
                    fontSize: "18px",
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  ★
                </span>
                <div>
                  <p className="font-playfair text-[16px] font-bold leading-tight text-[#1C1C1C]">
                    5,000+ Books Written
                  </p>
                  <p className="mt-1 font-inter text-[12px] font-normal text-[#666666]">
                    by professional ghostwriters
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
