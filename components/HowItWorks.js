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

  // Reveal once when ~15% of the section is visible
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
      className="relative w-full overflow-hidden bg-[var(--color-background)] py-[80px]"
      aria-label="How it works"
    >
      {/* Full-height art (no crop) + left merge into page background */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="gwh-hiw-bg-glow" />
        <div className="gwh-hiw-bg-art" role="presentation" />
        <div className="gwh-hiw-bg-scrim" />
      </div>

      {/* Scoped reveal animations + crystal glass panels */}
      <style>{`
        /* Full height, right-anchored — quill never clipped by object-cover */
        .gwh-hiw-bg-art {
          position: absolute;
          inset: 0;
          background-image: url("/images/background-1.webp");
          background-repeat: no-repeat;
          background-position: right center;
          background-size: auto 100%;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            rgba(0, 0, 0, 0.08) 22%,
            rgba(0, 0, 0, 0.38) 48%,
            rgba(0, 0, 0, 0.7) 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            rgba(0, 0, 0, 0.08) 22%,
            rgba(0, 0, 0, 0.38) 48%,
            rgba(0, 0, 0, 0.7) 100%
          );
        }

        .gwh-hiw-bg-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            #fafaf7 0%,
            #fafaf7 18%,
            rgba(250, 250, 247, 0.92) 32%,
            rgba(250, 250, 247, 0.45) 52%,
            transparent 78%
          );
        }

        .gwh-hiw-bg-glow {
          position: absolute;
          right: -4%;
          top: 12%;
          width: min(58vw, 720px);
          height: 76%;
          background: radial-gradient(
            ellipse at 65% 45%,
            rgba(201, 168, 76, 0.14) 0%,
            rgba(201, 168, 76, 0.04) 42%,
            transparent 72%
          );
        }

        .gwh-hiw-glass {
          position: relative;
          isolation: isolate;
          background: linear-gradient(
            152deg,
            rgba(255, 255, 255, 0.82) 0%,
            rgba(255, 255, 255, 0.55) 45%,
            rgba(255, 255, 255, 0.68) 100%
          );
          backdrop-filter: blur(22px) saturate(1.45);
          -webkit-backdrop-filter: blur(22px) saturate(1.45);
          border: 1px solid rgba(255, 255, 255, 0.72);
          box-shadow:
            0 10px 40px rgba(28, 28, 28, 0.07),
            0 2px 8px rgba(201, 168, 76, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.98),
            inset 0 -24px 48px rgba(255, 255, 255, 0.35);
        }

        .gwh-hiw-glass::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: linear-gradient(
            125deg,
            rgba(255, 255, 255, 0.55) 0%,
            transparent 38%,
            transparent 62%,
            rgba(201, 168, 76, 0.08) 100%
          );
          opacity: 0.9;
          z-index: 0;
        }

        .gwh-hiw-glass > * {
          position: relative;
          z-index: 1;
        }

        .gwh-hiw-glass-card {
          transition:
            transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.35s ease,
            background 0.35s ease;
        }

        .gwh-hiw-glass-card:hover {
          background: linear-gradient(
            152deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 255, 255, 0.72) 45%,
            rgba(255, 255, 255, 0.82) 100%
          );
          box-shadow:
            0 18px 48px rgba(201, 168, 76, 0.16),
            0 8px 24px rgba(28, 28, 28, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        @media (min-width: 1024px) {
          .gwh-hiw-content {
            padding-right: clamp(1rem, 5vw, 4.5rem);
          }

          .gwh-hiw-glass-card:nth-child(3) {
            background: linear-gradient(
              152deg,
              rgba(255, 255, 255, 0.72) 0%,
              rgba(255, 255, 255, 0.48) 50%,
              rgba(255, 255, 255, 0.58) 100%
            );
          }
        }

        .gwh-hiw-glass-intro {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.72) 0%,
            rgba(255, 255, 255, 0.42) 100%
          );
          backdrop-filter: blur(16px) saturate(1.25);
          -webkit-backdrop-filter: blur(16px) saturate(1.25);
          border: 1px solid rgba(255, 255, 255, 0.78);
          box-shadow:
            0 8px 32px rgba(28, 28, 28, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);
        }
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

        .gwh-hiw-intro,
        .gwh-hiw-card,
        .gwh-hiw-checklist {
          opacity: 0;
        }

        .gwh-hiw-visible .gwh-hiw-intro {
          animation: gwh-hiw-up 0.6s ease-out forwards;
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
        className={`gwh-hiw-content relative z-10 mx-auto max-w-[1200px] px-5 sm:px-6 lg:max-w-[1140px] xl:max-w-[1180px] ${visible ? "gwh-hiw-visible" : ""}`}
      >
        {/* Intro — light glass; content sits left of quill on desktop */}
        <div className="gwh-hiw-intro gwh-hiw-glass gwh-hiw-glass-intro mx-auto mb-16 max-w-[760px] rounded-3xl px-6 py-10 sm:px-10 lg:mx-0 lg:max-w-[640px] lg:text-left xl:mb-20">
          <p className="gwh-hiw-label mb-4 text-center font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent-olive)] lg:text-left">
            The Process
          </p>

          <h2 className="gwh-hiw-headline mb-4 text-center font-playfair text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] lg:text-left lg:text-[56px]">
            <span className="block font-normal">Your book begins</span>
            <span className="block italic text-[var(--color-accent-gold)]">
              with a single conversation.
            </span>
          </h2>

          <p className="gwh-hiw-sub mx-auto max-w-[580px] text-center font-inter text-[16px] font-normal leading-[1.7] text-[#3d3d3d] lg:mx-0 lg:text-left">
            From first idea to published masterpiece — we guide every step of the
            journey.
          </p>
        </div>

        {/* Steps row with connecting dashed line (desktop) */}
        <div className="relative mx-auto max-w-[1100px] lg:mr-[2%] lg:max-w-[980px] xl:mr-0 xl:max-w-[1020px]">
          {/* Gold dotted connector behind cards */}
          <div
            className="pointer-events-none absolute left-[6%] right-[4%] top-[88px] z-0 hidden border-t-2 border-dashed border-[var(--color-border)]/80 lg:block"
            aria-hidden="true"
          />

          <ol className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8 xl:gap-9">
            {STEPS.map((step) => (
              <li
                key={step.number}
                className="gwh-hiw-card gwh-hiw-glass gwh-hiw-glass-card group relative overflow-hidden rounded-3xl px-8 py-11 sm:px-10 sm:py-12 hover:-translate-y-2"
              >
                {/* Top gold accent + corner shine */}
                <div
                  className="absolute inset-x-0 top-0 z-[2] h-[3px] bg-gradient-to-r from-[var(--color-accent-gold)] via-[#e8c96a] to-[var(--color-accent-gold)]"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/40 blur-2xl"
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

                <p className="font-inter text-[15px] font-normal leading-[1.8] text-[#444444]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* What's included checklist */}
        <ul className="gwh-hiw-checklist gwh-hiw-glass mt-12 grid grid-cols-2 gap-6 rounded-3xl px-5 py-8 sm:px-12 lg:mt-14 lg:max-w-[980px] lg:grid-cols-4 lg:gap-8 xl:max-w-[1020px]">
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
