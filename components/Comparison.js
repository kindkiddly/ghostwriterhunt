"use client";

import { useEffect, useRef, useState } from "react";

/**
 * GhostWriterHunt — Comparison
 * Superside-style “Neither.” framing with tabs that contrast
 * alternatives against GhostWriterHunt as the clear winner.
 */

const TABS = [
  "Writing Yourself",
  "Hiring Freelancers",
  "Traditional Agencies",
  "GhostWriterHunt",
];

const TAB_CONTENT = {
  "Writing Yourself": {
    leftTitle: "Writing It Yourself",
    leftDescription:
      "Going it alone takes months and rarely produces professional results.",
    leftItems: [
      "Takes 6-18 months of your time",
      "Requires professional writing skills",
      "No editorial guidance or feedback",
      "Poor formatting and cover design",
      "Limited publishing knowledge",
    ],
    leftPositive: false,
    rightItems: [
      "Dedicated professional writer assigned",
      "Your story told in your voice",
      "Expert editorial guidance throughout",
      "Professional design and formatting",
      "Complete publishing support included",
    ],
  },
  "Hiring Freelancers": {
    leftTitle: "Hiring Freelancers",
    leftDescription:
      "Freelancers can be unreliable with inconsistent quality and no end-to-end support.",
    leftItems: [
      "Inconsistent quality and reliability",
      "No project management support",
      "Multiple vendors for each service",
      "No publishing or distribution help",
      "Risk of abandoned projects",
    ],
    leftPositive: false,
    rightItems: [
      "Vetted professionals with proven track record",
      "Dedicated project manager assigned",
      "All services under one roof",
      "Full publishing and distribution included",
      "100% project completion guaranteed",
    ],
  },
  "Traditional Agencies": {
    leftTitle: "Traditional Agencies",
    leftDescription:
      "Traditional agencies are slow, expensive and built around rigid processes.",
    leftItems: [
      "High costs with long contracts",
      "Slow turnaround — months of waiting",
      "Generic approach to your story",
      "Limited genre specialization",
      "You lose creative control",
    ],
    leftPositive: false,
    rightItems: [
      "Transparent affordable pricing",
      "Fast 30-day publishing process",
      "Personalized approach to every book",
      "Specialists matched to your genre",
      "You retain 100% creative control",
    ],
  },
  GhostWriterHunt: {
    leftTitle: "Everything Included",
    leftDescription:
      "One platform. Every service. Complete support from first word to global publication.",
    leftItems: [
      "Professional ghostwriting in your voice",
      "Expert editing and proofreading",
      "Stunning cover and interior design",
      "Global digital publishing on 47+ platforms",
      "Full NDA confidentiality guaranteed",
    ],
    leftPositive: true,
    rightItems: [
      "100% rights and royalties yours",
      "Free sample chapter before you commit",
      "Dedicated writer matched to your genre",
      "Regular chapter reviews and feedback",
      "5,000+ books published successfully",
    ],
  },
};

function CrossIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-[#E85D4A]"
    >
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6 6l6 6M12 6l-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
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
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-[var(--color-accent-gold)]"
    >
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.5 9.2l2.3 2.3L12.5 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Comparison() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Writing Yourself");
  const [contentKey, setContentKey] = useState(0);

  const content = TAB_CONTENT[activeTab];

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
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setContentKey((k) => k + 1);
  };

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="w-full bg-[var(--color-background)] py-[80px]"
      aria-label="Comparison"
    >
      <style>{`
        @keyframes gwh-cmp-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes gwh-cmp-up {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gwh-cmp-label,
        .gwh-cmp-headline,
        .gwh-cmp-sub,
        .gwh-cmp-tabs,
        .gwh-cmp-card,
        .gwh-cmp-cta {
          opacity: 0;
        }

        .gwh-cmp-visible .gwh-cmp-label {
          animation: gwh-cmp-fade 0.5s ease-out forwards;
        }

        .gwh-cmp-visible .gwh-cmp-headline {
          animation: gwh-cmp-up 0.5s ease-out 0.05s forwards;
        }

        .gwh-cmp-visible .gwh-cmp-sub {
          animation: gwh-cmp-up 0.5s ease-out 0.1s forwards;
        }

        .gwh-cmp-visible .gwh-cmp-tabs {
          animation: gwh-cmp-fade 0.5s ease-out 0.15s forwards;
        }

        .gwh-cmp-visible .gwh-cmp-card {
          animation: gwh-cmp-up 0.5s ease-out 0.25s forwards;
        }

        .gwh-cmp-visible .gwh-cmp-cta {
          animation: gwh-cmp-fade 0.5s ease-out 0.4s forwards;
        }

        .gwh-cmp-panel {
          animation: gwh-cmp-fade 0.3s ease forwards;
        }
      `}</style>

      <div
        className={`mx-auto max-w-[1200px] px-6 ${visible ? "gwh-cmp-visible" : ""}`}
      >
        <p className="gwh-cmp-label mb-4 text-center font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent-olive)]">
          Why Choose Us
        </p>

        <h2 className="gwh-cmp-headline mb-4 text-center font-playfair text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] lg:text-[56px]">
          <span className="block font-normal">Writing it yourself or hiring</span>
          <span className="block italic text-[var(--color-accent-gold)]">
            freelancers? Neither.
          </span>
        </h2>

        <p className="gwh-cmp-sub mx-auto mb-[60px] max-w-[600px] text-center font-inter text-[16px] font-normal leading-[1.7] text-[#666666]">
          See how GhostWriterHunt compares to the alternatives — and why
          thousands of authors choose us to bring their book to life.
        </p>

        {/* Comparison tabs */}
        <div
          className="gwh-cmp-tabs mb-[60px] flex flex-wrap items-center justify-center gap-3"
          role="tablist"
          aria-label="Compare alternatives"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabChange(tab)}
                className={`rounded-lg px-7 py-3 font-inter text-[14px] font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--color-text)] text-white"
                    : "border border-[var(--color-border)] bg-[var(--color-card)] text-[#666666] hover:border-[var(--color-accent-gold)]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Comparison content card */}
        <div className="gwh-cmp-card mx-auto max-w-[900px] rounded-[20px] border border-[var(--color-border)] bg-[var(--color-card)] px-6 py-10 shadow-[0_8px_40px_rgba(201,168,76,0.10)] sm:px-10 lg:px-[60px] lg:py-[60px]">
          <div
            key={contentKey}
            className="gwh-cmp-panel grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-[60px]"
          >
            {/* Left column — challenges or included benefits */}
            <div className="lg:border-r lg:border-[var(--color-border)] lg:pr-[60px]">
              <h3 className="mb-2 font-playfair text-[24px] font-bold text-[var(--color-text)]">
                {content.leftTitle}
              </h3>
              <p className="mb-8 font-inter text-[15px] font-normal leading-[1.7] text-[#666666]">
                {content.leftDescription}
              </p>

              <ul className="space-y-4">
                {content.leftItems.map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-3 font-inter text-[15px] leading-[1.7] ${
                      content.leftPositive
                        ? "text-[var(--color-text)]"
                        : "text-[#666666]"
                    }`}
                  >
                    {content.leftPositive ? <CheckIcon /> : <CrossIcon />}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column — GhostWriterHunt solutions */}
            <div>
              <h3 className="mb-2 font-playfair text-[24px] font-bold text-[var(--color-accent-gold)]">
                GhostWriterHunt
              </h3>
              <p className="mb-8 font-inter text-[15px] font-normal italic leading-[1.7] text-[var(--color-accent-olive)]">
                The professional choice
              </p>

              <ul className="space-y-4">
                {content.rightItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-inter text-[15px] leading-[1.7] text-[var(--color-text)]"
                  >
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA + trust line */}
        <div className="gwh-cmp-cta mt-12 text-center">
          <a
            href="#start"
            className="inline-block rounded-[6px] bg-[var(--color-accent-gold)] px-10 py-4 font-inter text-base font-semibold text-white transition-colors duration-300 hover:bg-[#B8960C]"
          >
            Start with a free consultation
          </a>

          <p className="mt-5 flex flex-wrap items-center justify-center gap-2 font-inter text-[13px] font-normal text-[#999999]">
            <span>No commitment required</span>
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent-gold)]"
              aria-hidden="true"
            />
            <span>Free sample chapter</span>
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent-gold)]"
              aria-hidden="true"
            />
            <span>100% confidential</span>
          </p>
        </div>
      </div>
    </section>
  );
}
