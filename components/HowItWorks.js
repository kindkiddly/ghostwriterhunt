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
      "Your dedicated ghostwriter brings your vision to life — chapter by chapter, in your voice. Regular reviews, collaborative feedback, and multiple revision rounds ensure every word is exactly right.",
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
  "Free Sample Chapter",
  "Dedicated Writer Assigned",
];

function StepIcon({ type }) {
  const common = {
    width: 40,
    height: 40,
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
      width="20"
      height="20"
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

  // Reveal once when the section enters the viewport
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
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="w-full bg-[var(--color-card)] py-[120px]"
      aria-label="How it works"
    >
      {/* Scoped reveal animations */}
      <style>{`
        @keyframes gwh-hiw-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes gwh-hiw-up {
          from {
            opacity: 0;
            transform: translateY(40px);
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
        className={`mx-auto max-w-[1200px] px-6 ${visible ? "gwh-hiw-visible" : ""}`}
      >
        {/* Section label */}
        <p className="gwh-hiw-label mb-4 text-center font-inter text-[12px] font-medium uppercase tracking-[0.15em] text-[var(--color-accent-olive)]">
          The Process
        </p>

        {/* Headline — line 2 italic gold */}
        <h2 className="gwh-hiw-headline mb-4 text-center font-playfair text-[36px] font-bold leading-tight text-[var(--color-text)] lg:text-[48px]">
          <span className="block font-normal">Your book begins</span>
          <span className="block italic text-[var(--color-accent-gold)]">
            with a single conversation.
          </span>
        </h2>

        {/* Subtext */}
        <p className="gwh-hiw-sub mx-auto mb-20 max-w-[580px] text-center font-inter text-[18px] font-normal leading-[1.7] text-[#666666]">
          From first idea to published masterpiece — we guide every step of the
          journey.
        </p>

        {/* Steps row with connecting dashed line (desktop) */}
        <div className="relative mx-auto max-w-[1100px]">
          {/* Gold dotted connector behind cards */}
          <div
            className="pointer-events-none absolute left-[8%] right-[8%] top-[88px] z-0 hidden border-t-2 border-dashed border-[var(--color-border)] lg:block"
            aria-hidden="true"
          />

          <ol className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
            {STEPS.map((step) => (
              <li
                key={step.number}
                className="gwh-hiw-card group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-10 py-12 shadow-[0_4px_32px_rgba(201,168,76,0.08)] transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(201,168,76,0.16)]"
              >
                {/* Top gold accent */}
                <div
                  className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-[var(--color-accent-gold)]"
                  aria-hidden="true"
                />

                <span className="mb-6 block font-playfair text-[72px] font-bold leading-none text-[var(--color-border)]">
                  {step.number}
                </span>

                <div className="mb-5 text-[var(--color-accent-gold)]">
                  <StepIcon type={step.icon} />
                </div>

                <h3 className="mb-4 font-playfair text-[24px] font-bold text-[var(--color-text)]">
                  {step.title}
                </h3>

                <p className="font-inter text-[15px] font-normal leading-[1.8] text-[#666666]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* What's included checklist */}
        <ul className="gwh-hiw-checklist mt-[60px] grid grid-cols-1 gap-6 rounded-xl bg-[var(--color-background)] px-8 py-8 sm:grid-cols-2 sm:px-12 lg:grid-cols-4 lg:gap-8">
          {CHECKLIST.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 font-inter text-[15px] font-medium text-[var(--color-text)]"
            >
              <CheckIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
