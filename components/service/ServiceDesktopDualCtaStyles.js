"use client";

/**
 * Desktop dual CTAs (≥769px) — matches home hero button pair (equal width, glass shadow).
 */

export default function ServiceDesktopDualCtaStyles() {
  return (
    <style>{`
      @media (min-width: 769px) {
        .svc-dual-ctas {
          display: grid !important;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          width: 100%;
          max-width: 432px;
        }

        .sc-section .svc-dual-ctas {
          margin-left: auto;
          margin-right: auto;
        }

        .svc-dual-ctas .svc-dual-cta-btn {
          width: 100%;
          min-height: 48px !important;
          height: 48px !important;
          padding: 0 12px !important;
          border-radius: 8px !important;
          border-width: 1.5px !important;
          border-style: solid !important;
          box-sizing: border-box !important;
          justify-content: center;
          text-align: center;
          white-space: nowrap;
          font-size: 14px !important;
          font-weight: 600 !important;
          line-height: 1.2 !important;
          box-shadow:
            0 10px 26px rgba(201, 168, 76, 0.26),
            0 4px 14px rgba(28, 28, 28, 0.08) !important;
          filter: none !important;
          transition:
            background-color 0.3s ease,
            color 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease,
            transform 0.3s ease;
        }

        .svc-dual-ctas .svc-dual-cta-btn--primary {
          background: var(--color-accent-gold) !important;
          color: #ffffff !important;
          border-color: rgba(255, 255, 255, 0.95) !important;
        }

        .svc-dual-ctas .svc-dual-cta-btn--primary:hover {
          background: #b8960c !important;
          transform: translateY(-3px);
          box-shadow:
            0 18px 40px rgba(201, 168, 76, 0.45),
            0 10px 24px rgba(28, 28, 28, 0.12) !important;
        }

        .svc-dual-ctas .svc-dual-cta-btn--secondary {
          background: rgba(255, 255, 255, 0.96) !important;
          color: var(--color-accent-gold) !important;
          border-color: var(--color-accent-gold) !important;
          box-shadow:
            0 10px 26px rgba(201, 168, 76, 0.16),
            0 4px 14px rgba(28, 28, 28, 0.08) !important;
        }

        .svc-dual-ctas .svc-dual-cta-btn--secondary:hover {
          background: var(--color-accent-gold) !important;
          color: #ffffff !important;
          transform: translateY(-3px);
          box-shadow:
            0 16px 36px rgba(201, 168, 76, 0.35),
            0 10px 24px rgba(28, 28, 28, 0.1) !important;
        }
      }
    `}</style>
  );
}
