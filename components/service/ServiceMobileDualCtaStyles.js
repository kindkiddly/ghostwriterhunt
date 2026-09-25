"use client";

/**
 * Mobile-only dual CTA row (≤768px): equal-width buttons, single row.
 * Used on all service page hero + bottom CTA bands.
 */

export default function ServiceMobileDualCtaStyles() {
  return (
    <style>{`
      @media (max-width: 768px) {
        .svc-dual-ctas {
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          justify-content: center !important;
          align-items: stretch;
          gap: 8px !important;
          width: 100%;
          max-width: 100%;
          overflow: visible;
        }
        .svc-dual-cta-btn {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          flex: 1 1 0 !important;
          min-width: 0;
          width: auto !important;
          max-width: none;
          height: 44px !important;
          padding: 0 10px !important;
          border-radius: 6px !important;
          font-size: 11px !important;
          line-height: 1.2 !important;
          font-weight: 600 !important;
          text-align: center;
          white-space: normal;
          box-sizing: border-box !important;
          border: 1.5px solid transparent !important;
          box-shadow:
            0 4px 0 rgba(0, 0, 0, 0.07),
            0 7px 12px rgba(0, 0, 0, 0.11) !important;
          filter: none !important;
          transition: none;
        }
        .svc-dual-cta-btn--primary {
          background: #c9a84c !important;
          color: #ffffff !important;
          border-color: #c9a84c !important;
        }
        .svc-dual-cta-btn--secondary {
          background: #ffffff !important;
          color: #c9a84c !important;
          border-color: rgba(201, 168, 76, 0.45) !important;
        }
        .svc-dual-cta-btn--primary:hover,
        .svc-dual-cta-btn--primary:active {
          background: #c9a84c !important;
          color: #ffffff !important;
        }
        .svc-dual-cta-btn--secondary:hover,
        .svc-dual-cta-btn--secondary:active {
          background: #ffffff !important;
          color: #b8960c !important;
        }
        .svc-dual-cta-btn--primary:active,
        .svc-dual-cta-btn--secondary:active {
          box-shadow:
            0 2px 0 rgba(0, 0, 0, 0.07),
            0 4px 8px rgba(0, 0, 0, 0.1) !important;
          transform: translateY(2px);
        }
      }
    `}</style>
  );
}
