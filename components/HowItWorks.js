"use client";

import { useEffect, useRef, useState } from "react";

/**
 * GhostWriterHunt — How It Works
 * Reedsy: warm 3-step literary clarity.
 * Superside: bold step numbers + scroll-reveal confidence.
 * Animations via Intersection Observer + CSS (no libraries).
 */

const STEPS = [
  {
    number: "01",
    title: "Share Your Vision",
    description:
      "Tell us about your book — your idea, your audience, and the story you want to tell. We listen deeply and match you with the perfect ghostwriter for your genre and voice.",
    icon: "chat",
  },
  {
    number: "02",
    title: "We Craft Your Story",
    description:
      "Your dedicated ghostwriter brings your vision to life — chapter by chapter, in your voice. Regular reviews, collaborative feedback, and unlimited revisions with our Professional and Complete Publishing packages ensure every word is exactly right.",
    icon: "pen",
  },
  {
    number: "03",
    title: "Publish and Shine",
    description:
      "From cover design and interior layout to global digital publishing — your book goes live on Amazon KDP, Apple Books, Kobo, Google Play Books and 47+ platforms worldwide. You keep 100% of your rights and royalties.",
    icon: "globe",
  },
];

const CHECKLIST = [
  "100% Rights and Royalties Yours",
  "Full NDA Confidentiality",
  "Dedicated Writer Assigned",
  "Secure, Managed Communication",
];

function StepIcon({ type }) {
  const common = {
    width: 32,
    height: 32,
    viewBox: "0 0 40 40",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  };

  if (type === "chat") {
    return (
      <svg {...common}>
        <path
          d="M8 10.5C8 8.567 9.567 7 11.5 7h17C30.433 7 32 8.567 32 10.5v12c0 1.933-1.567 3.5-3.5 3.5H18l-6 5.5V26H11.5C9.567 26 8 24.433 8 22.5v-12z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M14 15h12M14 20h8"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "pen") {
    return (
      <svg {...common}>
        <path
          d="M26.5 8.5l5 5L16 29H11v-5L26.5 8.5z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M23.5 11.5l5 5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M10 33h20"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle
        cx="20"
        cy="20"
        r="12"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <ellipse
        cx="20"
        cy="20"
        rx="5.5"
        ry="12"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M8.5 20h23M9.5 14.5h21M9.5 25.5h21"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-[var(--color-accent-gold)]"
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6 10.2l2.4 2.4L14 7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    requestAnimationFrame(() => {
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative w-full overflow-hidden bg-[var(--color-background)] py-16 lg:py-20"
      aria-label="How it works"
    >
      <style>{`
        @keyframes gwh-hiw-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes gwh-hiw-up {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gwh-hiw-label,
        .gwh-hiw-headline,
        .gwh-hiw-sub,
        .gwh-hiw-card,
        .gwh-hiw-checklist {
          opacity: 0;
        }

        .gwh-hiw-visible .gwh-hiw-label {
          animation: gwh-hiw-fade 0.6s ease-out forwards;
        }

        .gwh-hiw-visible .gwh-hiw-headline {
          animation: gwh-hiw-up 0.6s ease-out 0.08s forwards;
        }

        .gwh-hiw-visible .gwh-hiw-sub {
          animation: gwh-hiw-up 0.6s ease-out 0.16s forwards;
        }

        .gwh-hiw-visible .gwh-hiw-card:nth-child(1) {
          animation: gwh-hiw-up 0.6s ease-out 0.28s forwards;
        }

        .gwh-hiw-visible .gwh-hiw-card:nth-child(2) {
          animation: gwh-hiw-up 0.6s ease-out 0.43s forwards;
        }

        .gwh-hiw-visible .gwh-hiw-card:nth-child(3) {
          animation: gwh-hiw-up 0.6s ease-out 0.58s forwards;
        }

        .gwh-hiw-visible .gwh-hiw-checklist {
          animation: gwh-hiw-fade 0.6s ease-out 0.8s forwards;
        }
      `}</style>

      <div
        className={`relative z-10 mx-auto max-w-[1200px] px-5 sm:px-6 ${visible ? "gwh-hiw-visible" : ""}`}
      >
        <p className="gwh-hiw-label mb-3 text-center font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent-olive)]">
          The Process
        </p>

        <h2 className="gwh-hiw-headline mb-3 text-center font-playfair text-[32px] font-bold leading-[1.12] tracking-[-0.02em] text-[var(--color-text)] sm:text-[40px] lg:text-[48px]">
          <span className="block font-normal">Your book begins</span>
          <span className="block italic text-[var(--color-accent-gold)]">
            with a single conversation.
          </span>
        </h2>

        <p className="gwh-hiw-sub mx-auto mb-12 max-w-[540px] text-center font-inter text-[15px] font-normal leading-[1.65] text-[#666666] lg:mb-14">
          From first idea to published masterpiece — we guide every step of the
          journey.
        </p>

        <div className="gwh-hiw-steps relative mx-auto w-full max-w-[1040px] lg:mr-auto lg:max-w-[min(100%,640px)] xl:max-w-[min(100%,660px)]">
          <div
            className="pointer-events-none absolute left-[4%] right-[4%] top-[56px] z-0 hidden border-t border-dashed border-[var(--color-border)] lg:block lg:right-[6%]"
            aria-hidden="true"
          />

          <ol className="relative z-10 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-5">
            {STEPS.map((step) => (
              <li
                key={step.number}
                className="gwh-hiw-card group relative rounded-xl border border-[var(--color-border)]/90 bg-white/90 px-5 py-7 shadow-[0_2px_20px_rgba(28,28,28,0.04)] backdrop-blur-[10px] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--color-border)] hover:bg-white hover:shadow-[0_8px_28px_rgba(201,168,76,0.12)] sm:px-6"
              >
                <div
                  className="absolute inset-x-0 top-0 h-[2px] rounded-t-xl bg-[var(--color-accent-gold)]"
                  aria-hidden="true"
                />

                <div className="mb-4 flex items-start justify-between gap-3">
                  <span className="font-playfair text-[44px] font-bold leading-none tracking-tight text-[var(--color-border)] sm:text-[48px]">
                    {step.number}
                  </span>
                  <div className="mt-1 text-[var(--color-accent-gold)]">
                    <StepIcon type={step.icon} />
                  </div>
                </div>

                <h3 className="mb-2.5 font-playfair text-[18px] font-bold leading-snug text-[var(--color-text)] sm:text-[19px]">
                  {step.title}
                </h3>

                <p className="font-inter text-[13px] font-normal leading-[1.65] text-[#5c5c5c] sm:text-[14px] sm:leading-[1.7]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <ul className="gwh-hiw-checklist mx-auto mt-10 flex max-w-[1100px] flex-wrap items-center justify-center gap-x-5 gap-y-3 px-2 lg:mt-12 lg:flex-nowrap lg:gap-x-8 xl:gap-x-10">
          {CHECKLIST.map((item) => (
            <li
              key={item}
              className="flex shrink-0 items-center gap-2 font-inter text-[12px] font-medium leading-snug text-[var(--color-text)] sm:text-[13px] lg:text-[14px]"
            >
              <CheckIcon />
              <span className="whitespace-nowrap">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
