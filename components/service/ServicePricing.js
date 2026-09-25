"use client";

import { useRevealSelector } from "@/lib/useSectionReveal";

/**
 * GhostWriterHunt — ServicePricing
 * Service-specific pricing cards.
 * Prefix: spr-
 */

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 shrink-0"
    >
      <circle cx="8" cy="8" r="7" stroke="#C9A84C" strokeWidth="1.4" />
      <path
        d="M4.8 8.2l2.1 2.1L11.2 5.8"
        stroke="#C9A84C"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatPrice(n) {
  if (n == null) return null;
  return Number(n).toLocaleString();
}

export default function ServicePricing({ service }) {
  const plans = service?.pricing || [];

  useRevealSelector(".spr-reveal", "spr-visible", [service?.slug]);

  if (!plans.length) return null;

  return (
    <section className="spr-section" aria-label="Pricing">
      <style>{`
        .spr-section {
          background: #FAFAF7;
          padding: 80px 0;
        }
        .spr-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .spr-label {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 500;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #6B7C3A;
          text-align: center;
          margin: 0 0 16px;
        }
        .spr-headline {
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 48px;
          line-height: 1.1;
          text-align: center;
          color: #1C1C1C;
          margin: 0 0 16px;
        }
        .spr-headline-italic {
          display: block;
          font-style: italic;
          color: #C9A84C;
        }
        .spr-sub {
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 16px;
          color: #666666;
          text-align: center;
          max-width: 500px;
          margin: 0 auto 40px;
          line-height: 1.7;
        }
        .spr-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          align-items: center;
        }
        .spr-card {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          border-radius: 20px;
          padding: 48px 36px;
          background: #FFFFFF;
          border: 1px solid #E8D5A3;
          box-shadow: 0 4px 24px rgba(201,168,76,0.08);
        }
        .spr-card.featured {
          background: #1C1C1C;
          border: none;
          box-shadow: 0 8px 48px rgba(28,28,28,0.20);
          transform: scale(1.05);
          z-index: 1;
        }
        .spr-badge {
          display: block;
          width: fit-content;
          margin: 0 auto 24px;
          background: #C9A84C;
          color: #FFFFFF;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 4px 14px;
          border-radius: 20px;
        }
        .spr-plan-label {
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #6B7C3A;
          margin: 0 0 8px;
        }
        .spr-plan-name {
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 28px;
          color: #1C1C1C;
          margin: 0 0 8px;
        }
        .spr-card.featured .spr-plan-name {
          color: #FFFFFF;
          text-align: center;
        }
        .spr-plan-desc {
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 14px;
          color: #666666;
          line-height: 1.6;
          margin: 0 0 24px;
        }
        .spr-card.featured .spr-plan-desc {
          color: #999999;
          text-align: center;
        }
        .spr-head {
          min-height: 278px;
        }
        .spr-price-row {
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          color: #1C1C1C;
          line-height: 1;
        }
        .spr-card.featured .spr-price-row {
          color: #FFFFFF;
          text-align: center;
        }
        .spr-price-currency { font-size: 24px; vertical-align: top; }
        .spr-price-amount { font-size: 56px; }
        .spr-price-label {
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 14px;
          color: #999999;
          margin-top: 4px;
        }
        .spr-card.featured .spr-price-label { color: #666666; text-align: center; }
        .spr-divider {
          height: 1px;
          width: 100%;
          background: #E8D5A3;
          margin: 24px 0;
        }
        .spr-card.featured .spr-divider { background: #333333; }
        .spr-best-label {
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #999999;
          margin: 0 0 4px;
        }
        .spr-card.featured .spr-best-label { color: #666666; }
        .spr-best-for {
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 14px;
          color: #1C1C1C;
          margin: 0 0 24px;
          line-height: 1.6;
        }
        .spr-card.featured .spr-best-for { color: #FFFFFF; }
        .spr-features {
          list-style: none;
          margin: 0 0 32px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }
        .spr-feature {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 14px;
          line-height: 1.7;
          color: #444444;
        }
        .spr-card.featured .spr-feature { color: #CCCCCC; }
        .spr-guarantee {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 500;
          font-size: 13px;
          color: #6B7C3A;
          text-align: center;
          margin: 0 0 16px;
        }
        .spr-card.featured .spr-guarantee { color: #6B7C3A; }
        .spr-cta {
          display: block;
          width: 100%;
          text-align: center;
          padding: 14px 28px;
          border-radius: 8px;
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          margin-top: auto;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        .spr-cta-outline {
          border: 2px solid #C9A84C;
          color: #C9A84C;
          background: transparent;
        }
        .spr-cta-outline:hover {
          background: #C9A84C;
          color: #FFFFFF;
        }
        .spr-cta-filled {
          background: #C9A84C;
          color: #FFFFFF;
          border: 2px solid #C9A84C;
        }
        .spr-cta-filled:hover { background: #B8960C; border-color: #B8960C; }
        .spr-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .spr-reveal.spr-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 900px) {
          .spr-grid { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; }
          .spr-card.featured { transform: none; }
          .spr-headline { font-size: 32px; }
          .spr-head { min-height: 0; }
        }
      `}</style>

      <div className="spr-inner">
        <p className="spr-label spr-reveal" data-delay="0">
          PRICING
        </p>
        <h2 className="spr-headline spr-reveal" data-delay="80">
          <span className="block">Simple, transparent</span>
          <span className="spr-headline-italic">pricing.</span>
        </h2>
        <p className="spr-sub spr-reveal" data-delay="120">
          No hidden fees. No surprises. You own 100% of your work.
        </p>

        <div className="spr-grid">
          {plans.map((plan, index) => {
            const featured = plan.featured;

            return (
              <article
                key={plan.name}
                className={`spr-card spr-reveal${featured ? " featured" : ""}`}
                data-delay={200 + index * 100}
              >
                <div className="spr-head">
                  {featured ? (
                    <span className="spr-badge">Most Popular</span>
                  ) : (
                    <p className="spr-plan-label">{plan.label}</p>
                  )}

                  <h3 className="spr-plan-name">{plan.name}</h3>
                  <p className="spr-plan-desc">{plan.description}</p>
                </div>

                <div className={featured ? "text-center" : ""}>
                  <p className="spr-price-row">
                    <span className="spr-price-currency">$</span>
                    <span className="spr-price-amount">
                      {formatPrice(plan.price.fullBook)}
                    </span>
                  </p>
                  <p className="spr-price-label">one-time</p>
                </div>

                <div className="spr-divider" />

                <p className="spr-best-label">Best for:</p>
                <p className="spr-best-for">{plan.bestFor}</p>

                <ul className="spr-features">
                  {plan.features.map((f) => (
                    <li key={f} className="spr-feature">
                      <CheckIcon />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {plan.guarantee && (
                  <p className="spr-guarantee">{plan.guarantee}</p>
                )}

                <a
                  href="/#start"
                  className={`spr-cta ${featured ? "spr-cta-filled" : "spr-cta-outline"}`}
                >
                  Get Started
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
