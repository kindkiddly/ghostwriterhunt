"use client";

import { useEffect } from "react";
import FloatingImages from "@/components/service/FloatingImages";

/**
 * GhostWriterHunt — Narrative Block 2
 * Superside-style reversed layout: floating images left, approach copy right.
 * Visual foil to Block 1. Scroll-reveal via nb2- prefixed CSS classes.
 */

const STEPS = [
  {
    number: "01",
    title: "Deep Author Interview",
    description:
      "We begin by listening — learning how you think, speak and tell stories through in-depth conversations.",
  },
  {
    number: "02",
    title: "Voice Style Guide Created",
    description:
      "We document your unique tone, vocabulary and style into a personal guide that governs every word written.",
  },
  {
    number: "03",
    title: "Sample Chapter For Approval",
    description:
      "Before the full manuscript begins you receive a sample chapter to confirm the voice is perfect.",
  },
];

const NB2_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=600&h=700&fit=crop",
    alt: "Author working on manuscript",
    size: "large",
  },
  {
    url: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=300&h=350&fit=crop",
    alt: "Writing and storytelling",
    size: "medium",
  },
  {
    url: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=200&h=240&fit=crop",
    alt: "Pen and paper",
    size: "small",
  },
];

export default function NarrativeBlock2() {
  // Scroll-reveal: fire once when ~15% of each target is visible
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".nb2-reveal-left, .nb2-reveal-right, .nb2-reveal-card"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0");
            setTimeout(() => {
              entry.target.classList.add("nb2-is-visible");
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
        el.classList.remove("nb2-is-visible");
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#FAFAF7] py-[80px]"
      aria-label="Our Approach"
    >
      <style>{`
        .nb2-reveal-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.7s ease-out,
                      transform 0.7s ease-out;
        }
        .nb2-reveal-right {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.7s ease-out,
                      transform 0.7s ease-out;
          transition-delay: 0.15s;
        }
        .nb2-reveal-card {
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.5s ease-out,
                      transform 0.5s ease-out;
          transition-delay: 0.4s;
        }
        .nb2-reveal-left.nb2-is-visible,
        .nb2-reveal-right.nb2-is-visible,
        .nb2-reveal-card.nb2-is-visible {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        .nb2-img-wrap {
          position: relative;
          width: 100%;
          height: 520px;
          overflow: visible;
        }

        .nb2-float-card {
          position: absolute;
          bottom: -20px;
          right: -20px;
          background: #C9A84C;
          border-radius: 12px;
          padding: 16px 20px;
          box-shadow: 0 8px 32px rgba(201,168,76,0.3);
          z-index: 5;
        }

        @media (max-width: 768px) {
          .nb2-reveal-left { transform: translateX(-20px); }
          .nb2-reveal-right { transform: translateX(20px); }
          .nb2-reveal-left.nb2-is-visible,
          .nb2-reveal-right.nb2-is-visible {
            transform: translateX(0) scale(1);
          }
          .nb2-section-inner {
            padding-left: 20px !important;
            padding-right: 20px !important;
            gap: 32px !important;
          }
          .nb2-img-wrap {
            height: 320px;
          }
          .nb2-reveal-card,
          .nb2-float-card {
            display: none !important;
          }
        }
      `}</style>

      {/* Image first in DOM → on top for mobile; left on desktop */}
      <div className="nb2-section-inner mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-6 lg:flex-row lg:gap-[60px] lg:px-8">
        {/* ——— Left: floating images + quote card ——— */}
        <div className="nb2-reveal-left relative w-full max-w-full lg:w-1/2" data-delay="0">
          <div className="nb2-img-wrap">
            <FloatingImages images={NB2_IMAGES} />

            {/* Floating card — overlaps bottom-right */}
            <div
              className="nb2-float-card nb2-reveal-card"
              data-delay="400"
            >
              <p
                aria-hidden="true"
                className="font-playfair text-[32px] font-bold leading-none text-white"
                style={{ marginBottom: 4 }}
              >
                &ldquo;
              </p>
              <p className="font-playfair text-[14px] italic leading-tight text-white">
                Your voice. Perfectly captured.
              </p>
              <p
                className="mt-1 font-inter text-[12px] font-normal"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                every single word
              </p>
            </div>
          </div>
        </div>

        {/* ——— Right: label, headline, body, process steps, CTA ——— */}
        <div className="nb2-reveal-right w-full lg:w-1/2" data-delay="150">
          <p className="mb-5 font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[#6B7C3A]">
            OUR APPROACH
          </p>

          <h2 className="mb-6 font-playfair text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-[#1C1C1C] lg:text-[56px]">
            <span className="block font-normal">We write in</span>
            <span className="block italic text-[#C9A84C]">your voice.</span>
          </h2>

          <p className="mb-9 max-w-[480px] font-inter text-[16px] font-normal leading-[1.7] text-[#666666]">
            Your book should sound like you — only better. Before writing a
            single word, your dedicated ghostwriter studies your communication
            style, your personality and your vision. We capture the rhythm of
            how you speak, the words you naturally use and the tone that is
            uniquely yours. The result is a book that feels completely authentic
            — because it is.
          </p>

          {/* Reedsy-style numbered process steps */}
          <ul className="mb-2 flex flex-col">
            {STEPS.map((step) => (
              <li
                key={step.number}
                className="mb-7 border-l-[3px] border-[#E8D5A3] pl-5"
              >
                <p className="font-playfair text-[32px] font-bold leading-none text-[#E8D5A3]">
                  {step.number}
                </p>
                <p className="mt-2 font-inter text-[15px] font-semibold text-[#1C1C1C]">
                  {step.title}
                </p>
                <p className="mt-1 font-inter text-[14px] font-normal leading-[1.6] text-[#666666]">
                  {step.description}
                </p>
              </li>
            ))}
          </ul>

          <a
            href="#start"
            className="mt-2 inline-block font-inter text-[15px] font-semibold text-[#C9A84C] transition-colors duration-200 hover:text-[#B8960C] hover:underline"
          >
            Start with a free consultation →
          </a>
        </div>
      </div>
    </section>
  );
}
