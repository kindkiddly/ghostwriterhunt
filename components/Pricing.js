"use client";

import { useState } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";
import { SHARED_PRICING } from "@/data/pricing";
import { startPackageCheckout } from "@/lib/stripe/checkoutButton";

const PACKAGE_KEY_BY_NAME = {
  Starter: "starter",
  Professional: "professional",
  "Complete Publishing Package": "complete",
};

const HOME_PUBLISHING_PLATFORMS = "Publishing on 5 major global platforms";
const HOME_STARTER_BEST_FOR =
  "Perfect for authors who have already written their manuscript";
const HOME_PROFESSIONAL_BEST_FOR =
  "For Authors Seeking a Complete, Professionally Crafted Book Series";

/**
 * GhostWriterHunt — Pricing
 * Superside 3-plan cards + shared inclusions;
 * Reedsy warm literary pricing presentation.
 *
 * Plan data is derived from the shared pricing packages (same source as
 * every service page's Professional Ghostwriting-based pricing cards).
 */

const PLANS = SHARED_PRICING.map((tier) => ({
  id: tier.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  packageKey: PACKAGE_KEY_BY_NAME[tier.name] || null,
  label: tier.label,
  title: tier.name,
  description: tier.description,
  price: tier.price.fullBook.toLocaleString("en-US"),
  priceAmount: tier.price.fullBook,
  bestFor:
    tier.name === "Starter"
      ? HOME_STARTER_BEST_FOR
      : tier.name === "Professional"
        ? HOME_PROFESSIONAL_BEST_FOR
        : tier.bestFor,
  features: tier.features.map((feature) =>
    feature === "Publishing on 47+ platforms"
      ? HOME_PUBLISHING_PLATFORMS
      : feature
  ),
  cta: "Get Started",
  featured: tier.featured,
}));

const INCLUSIONS = [
  "Full NDA confidentiality",
  "100% rights and royalties",
  "Dedicated writer assigned",
  "Regular progress updates",
  "Secure file handling",
  "Secure, managed communication",
  "Satisfaction guarantee",
  "Professional project management",
  "100% original, plagiarism-free writing",
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

function planTier(plan) {
  if (plan.packageKey === "starter") return "starter";
  if (plan.packageKey === "professional") return "professional";
  return "complete";
}

function PlanCard({ plan, index }) {
  const featured = plan.featured;
  const tier = planTier(plan);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState(null);

  async function handlePaySecurely() {
    if (!plan.packageKey || paying) return;
    setPayError(null);
    setPaying(true);
    try {
      await startPackageCheckout(plan.packageKey);
    } catch (err) {
      setPayError(err.message || "Checkout unavailable");
      setPaying(false);
    }
  }

  const isDark = tier === "professional";

  return (
    <article
      className={`gwh-price-card gwh-price-card--${tier} relative flex h-full flex-col rounded-[20px] px-7 py-10 sm:px-9 sm:py-12`}
      style={{ animationDelay: `${0.2 + index * 0.15}s` }}
    >
      <div className="gwh-price-card-scroll flex min-h-0 flex-1 flex-col">
        {/* Label/name/description — equal height so prices align in one row */}
        <div className="gwh-price-head">
          {featured ? (
            <span className="gwh-price-badge mb-6 block w-fit rounded-[20px] px-3.5 py-1 font-inter text-[11px] font-semibold uppercase tracking-wide mx-auto">
              Most Popular
            </span>
          ) : (
            <p className="gwh-price-tier-label mb-2 text-center font-inter text-[13px] font-semibold uppercase tracking-[0.12em]">
              {plan.label}
            </p>
          )}

          <h3 className="gwh-price-title mb-2 text-center font-playfair text-[28px] font-bold">
            {plan.title}
          </h3>

          <p className="gwh-price-desc mb-6 text-center font-inter text-[14px] font-normal leading-relaxed">
            {plan.description}
          </p>
        </div>

        <div className="gwh-price-amount">
          <p className="gwh-price-value font-playfair font-bold leading-none">
            <span className="align-top text-[24px]">$</span>
            <span className="text-[56px]">{plan.price}</span>
          </p>
          <p className="gwh-price-term mt-1 font-inter text-[14px] font-normal">
            one-time
          </p>
        </div>

        <div className="gwh-price-divider my-6 h-px w-full" />

        <p className="gwh-price-best-label mb-1 font-inter text-[13px] font-medium">
          Best for:
        </p>
        <p className="gwh-price-best-text mb-6 font-inter text-[14px] font-normal leading-relaxed">
          {plan.bestFor}
        </p>

        <ul className="gwh-price-features mb-8 flex flex-1 flex-col gap-3">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 font-inter text-[14px] leading-[1.7]"
            >
              <CheckIcon
                className={
                  isDark ? "text-[#C9A84C]" : "text-[var(--color-accent-gold)]"
                }
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="gwh-price-actions mt-auto flex shrink-0 flex-col gap-2.5 pt-2">
        {plan.packageKey && (
          <button
            type="button"
            onClick={handlePaySecurely}
            disabled={paying}
            className={`gwh-price-pay-btn block w-full rounded-lg px-7 py-3.5 text-center font-inter text-[15px] font-semibold transition-all duration-300 disabled:opacity-60 ${
              featured ? "gwh-price-pay-btn--featured" : ""
            }`}
          >
            {paying ? "Opening checkout…" : `Pay securely — $${plan.priceAmount}`}
          </button>
        )}
        <a
          href="#start"
          className="gwh-price-contact block w-full rounded-lg px-7 py-3 text-center font-inter text-[14px] font-medium transition-colors"
        >
          Questions? Get in touch
        </a>
        {payError && (
          <p className="text-center font-inter text-[12px] text-[#9A2E24]">{payError}</p>
        )}
      </div>
    </article>
  );
}

export default function Pricing() {
  const { ref: sectionRef, visible } = useSectionReveal();

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
        .gwh-price-card,
        .gwh-price-includes,
        .gwh-price-consult {
          opacity: 0;
        }

        .gwh-price-visible .gwh-price-label {
          animation: gwh-price-fade 0.5s ease-out forwards;
          animation-fill-mode: forwards;
        }

        .gwh-price-visible .gwh-price-headline {
          animation: gwh-price-up 0.5s ease-out 0.05s forwards;
          animation-fill-mode: forwards;
        }

        .gwh-price-visible .gwh-price-sub {
          animation: gwh-price-up 0.5s ease-out 0.1s forwards;
          animation-fill-mode: forwards;
        }

        .gwh-price-visible .gwh-price-card {
          animation: gwh-price-up 0.5s ease-out forwards;
          animation-fill-mode: forwards;
        }

        .gwh-price-visible .gwh-price-card:nth-child(1) {
          animation-delay: 0.15s;
        }
        .gwh-price-visible .gwh-price-card:nth-child(2) {
          animation-delay: 0.3s;
        }
        .gwh-price-visible .gwh-price-card:nth-child(3) {
          animation-delay: 0.45s;
        }

        .gwh-price-visible .gwh-price-includes {
          animation: gwh-price-fade 0.5s ease-out 0.7s forwards;
          animation-fill-mode: forwards;
        }

        .gwh-price-visible .gwh-price-consult {
          animation: gwh-price-fade 0.5s ease-out 0.85s forwards;
          animation-fill-mode: forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .gwh-price-label,
          .gwh-price-headline,
          .gwh-price-sub,
          .gwh-price-card,
          .gwh-price-includes,
          .gwh-price-consult {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
        }

        .gwh-price-head {
          min-height: 200px;
          display: flex;
          flex-direction: column;
        }

        .gwh-price-amount {
          text-align: center;
        }

        .gwh-price-card--starter {
          border: 1px solid rgba(107, 124, 58, 0.28);
          background: linear-gradient(
            155deg,
            rgba(255, 255, 255, 0.92) 0%,
            rgba(245, 248, 238, 0.78) 100%
          );
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.65) inset,
            0 12px 36px rgba(107, 124, 58, 0.12);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .gwh-price-card--starter .gwh-price-tier-label {
          color: #6b7c3a;
        }
        .gwh-price-card--starter .gwh-price-title,
        .gwh-price-card--starter .gwh-price-best-text {
          color: #1c1c1c;
        }
        .gwh-price-card--starter .gwh-price-desc,
        .gwh-price-card--starter .gwh-price-best-label,
        .gwh-price-card--starter .gwh-price-term {
          color: #666666;
        }
        .gwh-price-card--starter .gwh-price-value {
          color: #1c1c1c;
        }
        .gwh-price-card--starter .gwh-price-divider {
          background: rgba(107, 124, 58, 0.2);
        }
        .gwh-price-card--starter .gwh-price-features {
          color: #444444;
        }
        .gwh-price-card--starter .gwh-price-pay-btn {
          border: 2px solid #c9a84c;
          background: transparent;
          color: #c9a84c;
        }
        .gwh-price-card--starter .gwh-price-pay-btn:hover {
          background: #c9a84c;
          color: #ffffff;
        }
        .gwh-price-card--starter .gwh-price-contact {
          color: #666666;
        }
        .gwh-price-card--starter .gwh-price-contact:hover {
          color: #1c1c1c;
        }

        .gwh-price-card--professional {
          z-index: 2;
          border: 1px solid rgba(201, 168, 76, 0.45);
          background: linear-gradient(
            155deg,
            rgba(32, 32, 36, 0.97) 0%,
            rgba(18, 20, 28, 0.94) 100%
          );
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.06) inset,
            0 0 32px rgba(201, 168, 76, 0.18),
            0 16px 48px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .gwh-price-card--professional .gwh-price-badge {
          background: #c9a84c;
          color: #ffffff;
        }
        .gwh-price-card--professional .gwh-price-title,
        .gwh-price-card--professional .gwh-price-value,
        .gwh-price-card--professional .gwh-price-best-text {
          color: #ffffff;
        }
        .gwh-price-card--professional .gwh-price-desc,
        .gwh-price-card--professional .gwh-price-best-label,
        .gwh-price-card--professional .gwh-price-term {
          color: #999999;
        }
        .gwh-price-card--professional .gwh-price-divider {
          background: #333333;
        }
        .gwh-price-card--professional .gwh-price-features {
          color: #cccccc;
        }
        .gwh-price-card--professional .gwh-price-pay-btn--featured {
          background: #c9a84c;
          color: #ffffff;
        }
        .gwh-price-card--professional .gwh-price-pay-btn--featured:hover {
          background: #b8960c;
        }
        .gwh-price-card--professional .gwh-price-contact {
          color: #cccccc;
        }
        .gwh-price-card--professional .gwh-price-contact:hover {
          color: #ffffff;
        }

        .gwh-price-card--complete {
          border: 1px solid rgba(201, 168, 76, 0.42);
          background: linear-gradient(
            155deg,
            rgba(255, 252, 245, 0.95) 0%,
            rgba(253, 246, 227, 0.82) 55%,
            rgba(255, 255, 255, 0.88) 100%
          );
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.7) inset,
            0 0 28px rgba(201, 168, 76, 0.16),
            0 14px 40px rgba(201, 168, 76, 0.14);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .gwh-price-card--complete .gwh-price-tier-label {
          color: #b8960c;
        }
        .gwh-price-card--complete .gwh-price-title {
          color: #1c1c1c;
        }
        .gwh-price-card--complete .gwh-price-value {
          color: #9a7b2e;
        }
        .gwh-price-card--complete .gwh-price-desc,
        .gwh-price-card--complete .gwh-price-best-label,
        .gwh-price-card--complete .gwh-price-term {
          color: #777777;
        }
        .gwh-price-card--complete .gwh-price-best-text,
        .gwh-price-card--complete .gwh-price-features {
          color: #3d3d3d;
        }
        .gwh-price-card--complete .gwh-price-divider {
          background: rgba(201, 168, 76, 0.35);
        }
        .gwh-price-card--complete .gwh-price-pay-btn {
          border: 2px solid #c9a84c;
          background: rgba(201, 168, 76, 0.12);
          color: #8a6d1f;
        }
        .gwh-price-card--complete .gwh-price-pay-btn:hover {
          background: #c9a84c;
          color: #ffffff;
        }
        .gwh-price-card--complete .gwh-price-contact {
          color: #666666;
        }
        .gwh-price-card--complete .gwh-price-contact:hover {
          color: #1c1c1c;
        }

        @media (min-width: 1024px) {
          .gwh-price-head {
            min-height: 228px;
          }

          .gwh-price-cards-grid {
            align-items: stretch;
          }

          .gwh-price-card {
            max-height: 560px;
            min-height: 520px;
          }

          .gwh-price-card-scroll {
            overflow-y: auto;
            overscroll-behavior: contain;
            padding-right: 4px;
            scrollbar-width: thin;
            scrollbar-color: rgba(201, 168, 76, 0.45) transparent;
          }

          .gwh-price-card-scroll::-webkit-scrollbar {
            width: 6px;
          }

          .gwh-price-card-scroll::-webkit-scrollbar-thumb {
            background: rgba(201, 168, 76, 0.45);
            border-radius: 999px;
          }

          .gwh-price-card--professional {
            transform: translateY(-6px);
          }
        }

        @media (max-width: 768px) {
          .gwh-price-head {
            min-height: 188px;
          }
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

        {/* Plan cards */}
        <div className="gwh-price-cards-grid mx-auto grid max-w-[1100px] grid-cols-1 items-stretch gap-7 lg:grid-cols-3">
          {PLANS.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} index={index} />
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
