"use client";

import { useSectionReveal } from "@/lib/useSectionReveal";

/**
 * GhostWriterHunt — How It Works
 * Glass process cards over photographic background (background-howitworks-2.webp).
 * Card styling aligned to background-howitworks-1 design reference.
 */

const STEPS = [
  {
    number: "01",
    title: "Share Your Vision",
    description:
      "Tell us about your book — your idea, your audience, and the story you want to tell. Our dedicated project team listens carefully to your goals, genre, and preferred voice, then personally matches your project with the right professional ghostwriter — with complete confidentiality from the start.",
    icon: "chat",
  },
  {
    number: "02",
    title: "We Craft Your Story",
    description:
      "Your matched professional ghostwriter brings your vision to life — chapter by chapter, in your voice. Regular chapter reviews, clear feedback, and unlimited revisions with our Professional and Complete Publishing packages are handled through our project team, so every word is exactly right while your communication stays securely managed.",
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
  "Expert Writer Confidentially Matched",
  "Secure, Managed Communication",
];

function StepIcon({ type }) {
  const common = {
    width: 26,
    height: 26,
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
      className="mt-0.5 shrink-0 text-[#C9A84C]"
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
  const { ref: sectionRef, visible } = useSectionReveal();

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="gwh-hiw-section relative w-full overflow-hidden"
      aria-label="How it works"
    >
      <style>{`
        .gwh-hiw-section {
          background-color: #12141c;
        }

        .gwh-hiw-bg {
          position: absolute;
          inset: 0;
          background-image: url("/images/background-howitworks-2.webp");
          background-size: cover;
          background-position: 72% center;
          background-repeat: no-repeat;
        }

        .gwh-hiw-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              105deg,
              rgba(12, 14, 22, 0.94) 0%,
              rgba(12, 14, 22, 0.82) 42%,
              rgba(12, 14, 22, 0.45) 68%,
              rgba(12, 14, 22, 0.25) 100%
            ),
            linear-gradient(
              180deg,
              rgba(8, 10, 16, 0.55) 0%,
              transparent 28%,
              transparent 72%,
              rgba(8, 10, 16, 0.65) 100%
            );
        }

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

        .gwh-hiw-card {
          border: 1px solid rgba(201, 168, 76, 0.38);
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.11) 0%,
            rgba(255, 255, 255, 0.04) 100%
          );
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.06) inset,
            0 0 28px rgba(201, 168, 76, 0.12),
            0 12px 40px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .gwh-hiw-card:hover {
          border-color: rgba(201, 168, 76, 0.55);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.1) inset,
            0 0 36px rgba(201, 168, 76, 0.22),
            0 16px 48px rgba(0, 0, 0, 0.4);
        }

        .gwh-hiw-icon-ring {
          border: 1px solid rgba(201, 168, 76, 0.55);
          background: rgba(201, 168, 76, 0.08);
          box-shadow: 0 0 20px rgba(201, 168, 76, 0.15);
        }

        .gwh-hiw-card-divider {
          height: 1px;
          width: 100%;
          background: linear-gradient(
            90deg,
            rgba(201, 168, 76, 0.65) 0%,
            rgba(201, 168, 76, 0.15) 100%
          );
        }

        @media (max-width: 1023px) {
          .gwh-hiw-bg {
            background-position: 80% center;
          }
          .gwh-hiw-overlay {
            background:
              linear-gradient(
                180deg,
                rgba(12, 14, 22, 0.92) 0%,
                rgba(12, 14, 22, 0.88) 55%,
                rgba(12, 14, 22, 0.75) 100%
              );
          }
        }

        @media (max-width: 767px) {
          .gwh-hiw-bg {
            background-image: url("/images/background-howitworks-M.webp");
            background-position: center 38%;
          }
          .gwh-hiw-overlay {
            background:
              linear-gradient(
                180deg,
                rgba(12, 14, 22, 0.88) 0%,
                rgba(12, 14, 22, 0.72) 32%,
                rgba(12, 14, 22, 0.78) 68%,
                rgba(12, 14, 22, 0.9) 100%
              );
          }
          .gwh-hiw-checklist {
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            justify-content: flex-start !important;
            flex-wrap: nowrap !important;
            gap: 11px !important;
            width: min(100%, calc(100vw - 40px));
            max-width: 340px;
            margin-left: auto !important;
            margin-right: auto !important;
            margin-top: 28px !important;
            padding-left: 4px !important;
            padding-right: 4px !important;
          }
          .gwh-hiw-checklist li {
            width: 100%;
            display: flex !important;
            align-items: flex-start !important;
            gap: 10px !important;
            font-size: 13px !important;
            line-height: 1.45 !important;
          }
          .gwh-hiw-checklist li svg {
            margin-top: 2px !important;
          }
          .gwh-hiw-checklist-text {
            flex: 1 1 auto;
            text-align: left !important;
            white-space: normal !important;
          }
        }
      `}</style>

      <div className="gwh-hiw-bg" aria-hidden="true" />
      <div className="gwh-hiw-overlay" aria-hidden="true" />

      <div
        className={`relative z-10 mx-auto max-w-[1200px] px-5 py-16 sm:px-6 lg:py-20 ${visible ? "gwh-hiw-visible" : ""}`}
      >
        <div className="mb-10 text-center lg:mb-12 lg:text-left">
          <p className="gwh-hiw-label mb-3 font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[#C9A84C]">
            The Process
          </p>

          <h2 className="gwh-hiw-headline mb-3 font-playfair text-[32px] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-[40px] lg:text-[48px]">
            <span className="block font-normal">Your book begins</span>
            <span className="block italic text-[#C9A84C]">
              with a single conversation.
            </span>
          </h2>

          <p className="gwh-hiw-sub mx-auto max-w-[540px] font-inter text-[15px] font-normal leading-[1.65] text-[#c8c8c8] lg:mx-0 lg:mb-0">
            From first idea to published masterpiece — we guide every step of the
            journey.
          </p>
        </div>

        <div className="gwh-hiw-steps relative w-full">
          <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6">
            {STEPS.map((step, index) => (
              <li
                key={step.number}
                className={`gwh-hiw-card group relative flex flex-col rounded-2xl px-6 py-7 transition-all duration-300 ease-out hover:-translate-y-1 sm:px-7 sm:py-8 ${
                  index === 2
                    ? "md:col-span-2 md:max-w-xl md:justify-self-center lg:col-span-1 lg:max-w-none lg:justify-self-stretch"
                    : ""
                }`}
              >
                <div
                  className="gwh-hiw-icon-ring mb-5 flex h-12 w-12 items-center justify-center rounded-full text-[#C9A84C]"
                >
                  <StepIcon type={step.icon} />
                </div>

                <div className="mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-inter text-[13px] font-semibold tracking-wide text-[#C9A84C]">
                    {step.number}
                  </span>
                  <h3 className="font-playfair text-[20px] font-bold leading-snug text-white sm:text-[21px]">
                    {step.title}
                  </h3>
                </div>

                <div
                  className="gwh-hiw-card-divider mb-4"
                  aria-hidden="true"
                />

                <p className="font-inter text-[14px] font-normal leading-[1.7] text-[#d4d4d4] sm:text-[15px]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <ul className="gwh-hiw-checklist mx-auto mt-10 flex max-w-[1100px] flex-wrap items-center justify-center gap-x-5 gap-y-3 px-2 lg:mt-12 lg:flex-nowrap lg:justify-start lg:gap-x-8 xl:gap-x-10">
          {CHECKLIST.map((item) => (
            <li
              key={item}
              className="flex shrink-0 items-center gap-2 font-inter text-[12px] font-medium leading-snug text-[#ececec] sm:text-[13px] lg:text-[14px]"
            >
              <CheckIcon />
              <span className="gwh-hiw-checklist-text whitespace-normal sm:whitespace-nowrap">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
