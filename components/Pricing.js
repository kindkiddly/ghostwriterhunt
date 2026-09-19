"use client";

import { useEffect, useRef, useState } from "react";

/**
 * GhostWriterHunt — Pricing
 * Superside 3-plan cards + shared inclusions;
 * Reedsy warm literary pricing presentation.
 * Toggle switches Per Chapter ↔ Full Book prices.
 */

const PLANS = [
  {
    id: "essentials",
    label: "ESSENTIALS",
    title: "Starter",
    description:
      "Perfect for short books, novellas and first-time authors.",
    chapterPrice: "299",
    fullPrice: "1,499",
    bestFor: "First-time authors and short book projects",
    features: [
      "Up to 20,000 words",
      "1 professional ghostwriter assigned",
      "2 revision rounds per chapter",
      "Basic manuscript editing",
      "eBook formatting included",
      "Publishing on 3 major platforms",
      "You keep 100% royalties",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    id: "professional",
    label: "MOST POPULAR",
    title: "Professional",
    description:
      "Our most popular plan for full-length books across all genres.",
    chapterPrice: "499",
    fullPrice: "2,999",
    bestFor: "Authors who want a complete, professionally published book",
    features: [
      "Up to 60,000 words",
      "1 senior ghostwriter assigned",
      "Unlimited revision rounds",
      "Full developmental editing",
      "Professional cover design included",
      "Interior layout and formatting",
      "Publishing on 47+ global platforms",
      "Author branding package",
      "You keep 100% royalties",
    ],
    cta: "Start Your Book",
    featured: true,
  },
  {
    id: "premium",
    label: "PREMIUM",
    title: "Masterpiece",
    description:
      "The complete white-glove experience for ambitious authors.",
    chapterPrice: "799",
    fullPrice: "4,999",
    bestFor: "Authors who want the very best — no compromises",
    features: [
      "Unlimited word count",
      "Elite senior ghostwriter assigned",
      "Unlimited revisions — perfection only",
      "Full editorial suite included",
      "Premium cover and interior design",
      "Custom illustrations included",
      "Publishing on 47+ global platforms",
      "Full author branding and marketing",
      "Book launch strategy included",
      "You keep 100% royalties",
    ],
    cta: "Go Premium",
    featured: false,
  },
];

const INCLUSIONS = [
  "Full NDA confidentiality",
  "100% rights and royalties",
  "Free sample chapter",
  "Dedicated writer assigned",
  "Regular progress updates",
  "Secure file handling",
  "Direct writer access",
  "Satisfaction guarantee",
  "Professional project management",
];

function CheckIcon({ className = "text-[var(--color-accent-gold)]" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`mt-0.5 shrink-0 ${className}`}
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4.8 8.2l2.1 2.1L11.2 5.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlanCard({ plan, fullBook, index }) {
  const featured = plan.featured;
  const price = fullBook ? plan.fullPrice : plan.chapterPrice;
  const priceLabel = fullBook ? "per full book" : "per chapter";

  return (
    <article
      className={`gwh-price-card relative flex h-full flex-col rounded-[20px] px-9 py-12 ${
        featured
          ? "z-10 scale-100 bg-[var(--color-text)] shadow-[0_8px_48px_rgba(28,28,28,0.20)] lg:scale-105"
          : "border border-[var(--color-border)] bg-[var(--color-card)] shadow-[0_4px_24px_rgba(201,168,76,0.08)]"
      }`}
      style={{ animationDelay: `${0.2 + index * 0.15}s` }}
    >
      {/* Featured badge or standard plan label */}
      {featured ? (
        <span className="mb-6 inline-block self-center rounded-[20px] bg-[var(--color-accent-gold)] px-3.5 py-1 font-inter text-[11px] font-semibold uppercase tracking-wide text-white">
          Most Popular
        </span>
      ) : (
        <p className="mb-2 font-inter text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-olive)]">
          {plan.label}
        </p>
      )}

      <h3
        className={`mb-2 font-playfair text-[28px] font-bold ${
          featured ? "text-center text-white" : "text-[var(--color-text)]"
        }`}
      >
        {plan.title}
      </h3>

      <p
        className={`mb-6 font-inter text-[14px] font-normal leading-relaxed ${
          featured ? "text-center text-[#999999]" : "text-[#666666]"
        }`}
      >
        {plan.description}
      </p>

      {/* Price */}
      <div className={featured ? "text-center" : ""}>
        <p
          className={`font-playfair font-bold leading-none ${
            featured ? "text-white" : "text-[var(--color-text)]"
          }`}
        >
          <span className="align-top text-[24px]">$</span>
          <span className="text-[56px]">{price}</span>
        </p>
        <p
          className={`mt-1 font-inter text-[14px] font-normal ${
            featured ? "text-[#666666]" : "text-[#999999]"
          }`}
        >
          {priceLabel}
        </p>
      </div>

      <div
        className={`my-6 h-px w-full ${
          featured ? "bg-[#333333]" : "bg-[var(--color-border)]"
        }`}
      />

      <p
        className={`mb-1 font-inter text-[13px] font-medium ${
          featured ? "text-[#666666]" : "text-[#999999]"
        }`}
      >
        Best for:
      </p>
      <p
        className={`mb-6 font-inter text-[14px] font-normal leading-relaxed ${
          featured ? "text-white" : "text-[var(--color-text)]"
        }`}
      >
        {plan.bestFor}
      </p>

      <ul className="mb-8 flex flex-1 flex-col gap-3">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-2.5 font-inter text-[14px] leading-[1.7] ${
              featured ? "text-[#CCCCCC]" : "text-[#444444]"
            }`}
          >
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href="#start"
        className={`mt-auto block w-full rounded-lg px-7 py-3.5 text-center font-inter text-[15px] font-semibold transition-all duration-300 ${
          featured
            ? "bg-[var(--color-accent-gold)] text-white hover:bg-[#B8960C]"
            : "border-2 border-[var(--color-accent-gold)] bg-transparent text-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)] hover:text-white"
        }`}
      >
        {plan.cta}
      </a>
    </article>
  );
}

export default function Pricing() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [fullBook, setFullBook] = useState(false);

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
      id="pricing"
      className="w-full bg-[var(--color-card)] py-[80px]"
      aria-label="Pricing plans"
    >
      <style>{`
        @keyframes gwh-price-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes gwh-price-up {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gwh-price-label,
        .gwh-price-headline,
        .gwh-price-sub,
        .gwh-price-toggle,
        .gwh-price-card,
        .gwh-price-includes,
        .gwh-price-consult {
          opacity: 0;
        }

        .gwh-price-visible .gwh-price-label {
          animation: gwh-price-fade 0.5s ease-out forwards;
        }

        .gwh-price-visible .gwh-price-headline {
          animation: gwh-price-up 0.5s ease-out 0.05s forwards;
        }

        .gwh-price-visible .gwh-price-sub {
          animation: gwh-price-up 0.5s ease-out 0.1s forwards;
        }

        .gwh-price-visible .gwh-price-toggle {
          animation: gwh-price-fade 0.5s ease-out 0.15s forwards;
        }

        .gwh-price-visible .gwh-price-card {
          animation: gwh-price-up 0.5s ease-out forwards;
        }

        .gwh-price-visible .gwh-price-includes {
          animation: gwh-price-fade 0.5s ease-out 0.7s forwards;
        }

        .gwh-price-visible .gwh-price-consult {
          animation: gwh-price-fade 0.5s ease-out 0.85s forwards;
        }
      `}</style>

      <div
        className={`mx-auto max-w-[1200px] px-5 sm:px-6 ${visible ? "gwh-price-visible" : ""}`}
      >
        <p className="gwh-price-label mb-4 text-center font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent-olive)]">
          Pricing Plans
        </p>

        <h2 className="gwh-price-headline mb-4 text-center font-playfair text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] lg:text-[56px]">
          <span className="block font-normal">Simple, transparent</span>
          <span className="block italic text-[var(--color-accent-gold)]">
            pricing for every author.
          </span>
        </h2>

        <p className="gwh-price-sub mx-auto mb-[70px] max-w-[560px] text-center font-inter text-[16px] font-normal leading-[1.7] text-[#666666]">
          Choose the plan that fits your book project — no hidden fees, no
          surprises. You own 100% of your book and all royalties.
        </p>

        {/* Billing toggle — Per Chapter / Full Book */}
        <div className="gwh-price-toggle mb-12 flex items-center justify-center gap-3">
          <span
            className={`font-inter text-[14px] font-medium transition-colors duration-200 ${
              !fullBook ? "text-[var(--color-text)]" : "text-[#666666]"
            }`}
          >
            Per Chapter
          </span>

          <button
            type="button"
            role="switch"
            aria-checked={fullBook}
            aria-label="Toggle between per chapter and full book pricing"
            onClick={() => setFullBook((v) => !v)}
            className="relative h-6 w-12 rounded-[20px] bg-[var(--color-border)] transition-colors duration-200"
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-[var(--color-accent-gold)] transition-transform duration-200 ${
                fullBook ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>

          <span
            className={`font-inter text-[14px] font-medium transition-colors duration-200 ${
              fullBook ? "text-[var(--color-text)]" : "text-[#666666]"
            }`}
          >
            Full Book
          </span>
        </div>

        {/* Plan cards */}
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-stretch gap-7 lg:grid-cols-3 lg:items-center">
          {PLANS.map((plan, index) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              fullBook={fullBook}
              index={index}
            />
          ))}
        </div>

        {/* Shared inclusions — Superside checklist style */}
        <div className="gwh-price-includes mx-auto mt-12 max-w-[1100px] rounded-2xl bg-[var(--color-background)] px-8 py-10 sm:px-12">
          <h3 className="mb-8 font-playfair text-[24px] font-bold text-[var(--color-text)]">
            Every plan includes:
          </h3>

          <ul className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-4">
            {INCLUSIONS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 font-inter text-[14px] font-medium text-[var(--color-text)]"
              >
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Consultation CTA */}
        <div className="gwh-price-consult mt-8 text-center">
          <p className="mb-4 font-inter text-[16px] font-normal text-[#666666]">
            Not sure which plan is right for you?
          </p>
          <a
            href="#start"
            className="mt-2 inline-block w-full max-w-full rounded-lg border-2 border-[var(--color-accent-gold)] bg-transparent px-9 py-3.5 text-center font-inter text-[15px] font-semibold text-[var(--color-accent-gold)] transition-all duration-300 hover:bg-[var(--color-accent-gold)] hover:text-white sm:w-auto"
          >
            Book a Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
