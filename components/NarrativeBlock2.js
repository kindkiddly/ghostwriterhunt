"use client";

import { useEffect } from "react";

/**
 * GhostWriterHunt — Narrative Block 2
 * Superside-style reversed layout: image left, approach copy right.
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

function GoldQuoteIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="#C9A84C"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M7.17 6C4.87 6 3 7.87 3 10.17V14h5.5v-4H6.2c.2-1.1 1.15-1.9 2.3-1.9V6H7.17zm9.66 0C14.53 6 12.66 7.87 12.66 10.17V14H18.2v-4h-2.3c.2-1.1 1.15-1.9 2.3-1.9V6h-1.37z" />
    </svg>
  );
}

export default function NarrativeBlock2() {
  // Scroll-reveal: fire once when targets enter the viewport (with bottom inset)
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".nb2-reveal-left, .nb2-reveal-right, .nb2-reveal-card"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("nb2-is-visible");
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
      el.classList.remove("nb2-is-visible");
      observer.observe(el);
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
      `}</style>

      {/* Image first in DOM → on top for mobile; left on desktop */}
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-6 lg:flex-row lg:gap-[60px] lg:px-8">
        {/* ——— Left: image + floating quote card ——— */}
        <div className="nb2-reveal-left relative w-full lg:w-1/2">
          <div className="relative w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=600&h=700&fit=crop"
              alt="Open book and reading atmosphere"
              className="h-[600px] w-full rounded-[12px] object-cover"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
            />

            {/* Floating card — overlaps bottom-right of image */}
            <div
              className="nb2-reveal-card absolute -bottom-5 -right-5 rounded-xl bg-[#FFFFFF] px-5 py-4"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
            >
              <div className="flex items-start gap-2">
                <GoldQuoteIcon />
                <div>
                  <p className="font-playfair text-[16px] italic leading-tight text-[#1C1C1C]">
                    Your voice. Perfectly captured.
                  </p>
                  <p className="mt-1 font-inter text-[13px] font-normal text-[#666666]">
                    every single word
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ——— Right: label, headline, body, process steps, CTA ——— */}
        <div className="nb2-reveal-right w-full lg:w-1/2">
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
