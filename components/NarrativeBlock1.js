"use client";

import { useEffect } from "react";

/**
 * GhostWriterHunt — Narrative Block 1
 * Superside-style two-column story section:
 * bold copy + feature bullets left, editorial image + floating card right.
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

function GoldStarIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="#C9A84C"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.47L12 17.27l-5.8 3.05 1.11-6.47-4.7-4.58 6.49-.94L12 2.5z" />
    </svg>
  );
}

export default function NarrativeBlock1() {
  // Trigger reveal only when elements scroll 100px into the viewport
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".nb1-reveal-left, .nb1-reveal-right, .nb1-reveal-card"
    );

    // rootMargin shrinks the bottom of the root so we don't fire at the edge
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Small delay so the reveal follows a real scroll into view
            setTimeout(() => {
              entry.target.classList.add("nb1-is-visible");
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
      // Reset to hidden first
      el.classList.remove("nb1-is-visible");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#FFFFFF] py-[80px]"
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
          transition-delay: 0.15s;
        }

        .nb1-reveal-card {
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
          transition-delay: 0.4s;
        }

        .nb1-reveal-left.nb1-is-visible,
        .nb1-reveal-right.nb1-is-visible,
        .nb1-reveal-card.nb1-is-visible {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        @media (max-width: 768px) {
          .nb1-reveal-left { transform: translateX(-20px); }
          .nb1-reveal-right { transform: translateX(20px); }
          .nb1-reveal-left.nb1-is-visible,
          .nb1-reveal-right.nb1-is-visible {
            transform: translateX(0) scale(1);
          }
          .nb1-section-inner {
            padding-left: 20px !important;
            padding-right: 20px !important;
            gap: 32px !important;
          }
          .nb1-section-img {
            height: 280px !important;
          }
          .nb1-reveal-card {
            display: none !important;
          }
        }
      `}</style>

      <div className="nb1-section-inner mx-auto flex w-full max-w-[1200px] flex-col-reverse items-center gap-12 px-6 lg:flex-row lg:gap-[60px] lg:px-8">
        {/* ——— Left: label, headline, body, bullets, CTA ——— */}
        <div className="nb1-reveal-left w-full lg:w-1/2">
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
            Every great book is the result of a partnership between a visionary
            author and a skilled professional writer. At GhostWriterHunt, we
            match you with the perfect ghostwriter for your genre, your voice,
            and your vision — then guide you every step of the way from first
            idea to published masterpiece.
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

        {/* ——— Right: image + floating stats card ——— */}
        <div className="nb1-reveal-right relative w-full max-w-full lg:w-1/2">
          {/* Mobile: image on top — flex-col-reverse handles stack order */}
          <div className="relative w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=700&fit=crop"
              alt="Author writing at a desk with manuscript pages"
              className="nb1-section-img h-[600px] w-full max-w-full rounded-[12px] object-cover"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
            />

            {/* Floating card — overlaps bottom-left of image */}
            <div
              className="nb1-reveal-card absolute -bottom-5 -left-5 rounded-xl bg-[#FFFFFF] px-5 py-4"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
            >
              <div className="flex items-start gap-2">
                <GoldStarIcon />
                <div>
                  <p className="font-playfair text-[18px] font-bold leading-tight text-[#1C1C1C]">
                    5,000+ Books Written
                  </p>
                  <p className="mt-1 font-inter text-[13px] font-normal text-[#666666]">
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
