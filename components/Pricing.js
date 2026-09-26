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

  return (
    <article
      className={`gwh-price-card gwh-price-card--${tier} relative flex h-full flex-col rounded-[22px] px-7 py-10 sm:px-9 sm:py-11`}
      style={{ animationDelay: `${0.2 + index * 0.15}s` }}
    >
      <div className="gwh-price-card-scroll flex min-h-0 flex-1 flex-col">
        {/* Label/name/description — equal height so prices align in one row */}
        <div className="gwh-price-head">
          {featured ? (
            <span className="gwh-price-badge mb-6 mx-auto rounded-full font-inter text-[11px] font-semibold uppercase tracking-[0.14em]">
              Most Popular
            </span>
          ) : (
            <span className="gwh-price-badge gwh-price-badge--tier mb-6 mx-auto rounded-full font-inter text-[11px] font-semibold uppercase tracking-[0.14em]">
              {plan.label}
            </span>
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
              <CheckIcon className="gwh-price-check shrink-0" />
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
            className="gwh-price-pay-btn block w-full px-7 py-3.5 text-center font-inter text-[15px] font-semibold transition-all duration-300 disabled:opacity-60"
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

        @keyframes gwh-price-card-enter {
          from {
            opacity: 0;
            transform: translateY(22px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes gwh-price-card-enter-featured {
          from {
            opacity: 0;
            transform: translateY(22px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(-8px) scale(1);
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

        @media (max-width: 1023px) {
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

        .gwh-price-cards-stage {
          position: relative;
          margin-top: 8px;
          padding: 0;
          background: transparent;
        }

        .gwh-price-cards-stage::before,
        .gwh-price-cards-stage::after {
          display: none;
        }

        .gwh-price-cards-grid {
          position: relative;
          z-index: 1;
        }

        .gwh-price-head {
          min-height: 200px;
          display: flex;
          flex-direction: column;
        }

        .gwh-price-amount {
          text-align: center;
        }

        .gwh-price-card {
          border: 1.5px solid rgba(255, 255, 255, 0.14);
          background: rgba(10, 12, 20, 0.55);
          backdrop-filter: blur(14px) saturate(1.15);
          -webkit-backdrop-filter: blur(14px) saturate(1.15);
          box-shadow: none;
          text-shadow: none;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .gwh-price-card,
        .gwh-price-card * {
          text-shadow: none;
        }

        .gwh-price-card > * {
          position: relative;
          z-index: 1;
        }

        .gwh-price-title,
        .gwh-price-value {
          color: #ffffff;
        }

        .gwh-price-desc,
        .gwh-price-best-text,
        .gwh-price-features {
          color: rgba(255, 255, 255, 0.88);
        }

        .gwh-price-best-label,
        .gwh-price-term {
          color: rgba(255, 255, 255, 0.55);
        }

        .gwh-price-divider {
          width: 52px;
          height: 2px;
          margin-left: auto;
          margin-right: auto;
          border-radius: 999px;
          opacity: 0.95;
        }

        .gwh-price-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          width: 168px;
          min-height: 34px;
          padding: 8px 16px;
          text-align: center;
          line-height: 1.2;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: none;
        }

        .gwh-price-pay-btn {
          border-radius: 999px;
          border: 1.5px solid rgba(255, 255, 255, 0.28);
          background: rgba(0, 0, 0, 0.22);
          color: #ffffff;
          box-shadow: none;
        }

        .gwh-price-pay-btn:hover {
          background: rgba(0, 0, 0, 0.34);
          box-shadow: none;
        }

        .gwh-price-contact {
          color: rgba(255, 255, 255, 0.58);
        }

        .gwh-price-contact:hover {
          color: #ffffff;
        }

        /* Starter — teal glass */
        .gwh-price-card--starter {
          border-color: rgba(45, 212, 191, 0.82);
          background: linear-gradient(
            155deg,
            rgba(4, 47, 46, 0.74) 0%,
            rgba(8, 10, 18, 0.58) 100%
          );
        }
        .gwh-price-card--starter .gwh-price-badge {
          color: #2dd4bf;
          border-color: rgba(45, 212, 191, 0.75);
        }
        .gwh-price-card--starter .gwh-price-divider {
          background: linear-gradient(90deg, #14b8a6, #2dd4bf);
        }
        .gwh-price-card--starter .gwh-price-check {
          color: #2dd4bf;
        }
        .gwh-price-card--starter .gwh-price-pay-btn {
          border-color: rgba(45, 212, 191, 0.85);
        }

        /* Professional — purple glass */
        .gwh-price-card--professional {
          z-index: 2;
          border-color: rgba(168, 85, 247, 0.85);
          background: linear-gradient(
            155deg,
            rgba(46, 16, 72, 0.76) 0%,
            rgba(8, 10, 18, 0.58) 100%
          );
        }
        .gwh-price-card--professional .gwh-price-badge {
          color: #d8b4fe;
          border-color: rgba(168, 85, 247, 0.78);
        }
        .gwh-price-card--professional .gwh-price-divider {
          background: linear-gradient(90deg, #9333ea, #a855f7);
        }
        .gwh-price-card--professional .gwh-price-check {
          color: #c084fc;
        }
        .gwh-price-card--professional .gwh-price-pay-btn {
          border-color: rgba(168, 85, 247, 0.88);
        }

        /* Complete — amber / gold glass */
        .gwh-price-card--complete {
          border-color: rgba(245, 158, 11, 0.85);
          background: linear-gradient(
            155deg,
            rgba(69, 26, 3, 0.76) 0%,
            rgba(8, 10, 18, 0.58) 100%
          );
        }
        .gwh-price-card--complete .gwh-price-badge {
          color: #fbbf24;
          border-color: rgba(245, 158, 11, 0.78);
        }
        .gwh-price-card--complete .gwh-price-divider {
          background: linear-gradient(90deg, #d97706, #f59e0b);
        }
        .gwh-price-card--complete .gwh-price-check {
          color: #f59e0b;
        }
        .gwh-price-card--complete .gwh-price-pay-btn {
          border-color: rgba(245, 158, 11, 0.88);
        }

        @media (min-width: 1024px) {
          .gwh-price-cards-stage {
            padding: 52px 32px 56px;
            border-radius: 24px;
            overflow: hidden;
          }

          .gwh-price-cards-stage::before {
            display: block;
            content: "";
            position: absolute;
            inset: 0;
            z-index: 0;
            border-radius: inherit;
            opacity: 0;
            background: url(/images/background-cards.webp) center center / cover
              no-repeat;
          }

          .gwh-price-visible .gwh-price-cards-stage::before {
            animation: gwh-price-fade 0.7s ease-out forwards;
          }

          .gwh-price-card {
            backdrop-filter: blur(16px) saturate(1.2);
            -webkit-backdrop-filter: blur(16px) saturate(1.2);
          }

          .gwh-price-card--starter {
            background: linear-gradient(
              155deg,
              rgba(4, 47, 46, 0.7) 0%,
              rgba(8, 10, 18, 0.54) 100%
            );
          }

          .gwh-price-card--professional {
            background: linear-gradient(
              155deg,
              rgba(46, 16, 72, 0.72) 0%,
              rgba(8, 10, 18, 0.54) 100%
            );
          }

          .gwh-price-card--complete {
            background: linear-gradient(
              155deg,
              rgba(69, 26, 3, 0.72) 0%,
              rgba(8, 10, 18, 0.54) 100%
            );
          }

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
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .gwh-price-card-scroll::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
          }

          .gwh-price-card-scroll::before,
          .gwh-price-card-scroll::after,
          .gwh-price-card::before,
          .gwh-price-card::after {
            display: none !important;
            content: none !important;
          }

          .gwh-price-visible .gwh-price-card {
            animation: gwh-price-card-enter 0.55s cubic-bezier(0.22, 1, 0.36, 1)
              forwards;
            animation-fill-mode: forwards;
            transition: transform 0.28s ease, border-color 0.28s ease;
          }

          .gwh-price-visible .gwh-price-card:nth-child(1) {
            animation-delay: 0.12s;
          }
          .gwh-price-visible .gwh-price-card:nth-child(2) {
            animation-delay: 0.24s;
          }
          .gwh-price-visible .gwh-price-card:nth-child(3) {
            animation-delay: 0.36s;
          }

          .gwh-price-visible .gwh-price-card--professional {
            animation-name: gwh-price-card-enter-featured;
          }

          .gwh-price-visible .gwh-price-card:hover {
            transform: translateY(-4px);
          }

          .gwh-price-visible .gwh-price-card--professional:hover {
            transform: translateY(-12px);
          }
        }

        @media (max-width: 1023px) {
          .gwh-price-card {
            backdrop-filter: blur(12px) saturate(1.05);
            -webkit-backdrop-filter: blur(12px) saturate(1.05);
            background: linear-gradient(
              180deg,
              rgba(12, 14, 22, 0.82) 0%,
              rgba(0, 0, 0, 0.84) 100%
            );
          }

          .gwh-price-card--starter {
            background: linear-gradient(
              180deg,
              rgba(6, 42, 40, 0.86) 0%,
              rgba(0, 0, 0, 0.86) 100%
            );
          }

          .gwh-price-card--professional {
            background: linear-gradient(
              180deg,
              rgba(42, 14, 68, 0.86) 0%,
              rgba(0, 0, 0, 0.86) 100%
            );
          }

          .gwh-price-card--complete {
            background: linear-gradient(
              180deg,
              rgba(58, 32, 6, 0.86) 0%,
              rgba(0, 0, 0, 0.86) 100%
            );
          }

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

        {/* Plan cards — desktop: background-cards behind cards; mobile: no backdrop */}
        <div className="gwh-price-cards-stage mx-auto max-w-[1140px]">
          <div className="gwh-price-cards-grid grid grid-cols-1 items-stretch gap-7 lg:grid-cols-3">
            {PLANS.map((plan, index) => (
              <PlanCard key={plan.id} plan={plan} index={index} />
            ))}
          </div>
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
