"use client";

/**
 * Shared trust micro-copy under service CTAs (hero + bottom CTA).
 * Mobile layout: centered flex wrap, 11px — matches Professional Ghostwriting hero.
 */

export function ServiceTrustLineStyles() {
  return (
    <style>{`
      .svc-trust {
        font-family: var(--font-inter), Inter, sans-serif;
        font-weight: 400;
        font-size: 13px;
        margin: 0;
      }
      .svc-trust--light {
        color: #999999;
      }
      .svc-trust--dark {
        color: rgba(255, 255, 255, 0.5);
      }
      .svc-trust-dot {
        color: #c9a84c;
        margin: 0 6px;
      }

      @media (max-width: 768px) {
        .svc-trust {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 4px 8px;
          width: 100%;
          max-width: 340px;
          margin-left: auto;
          margin-right: auto;
          padding: 0 2px;
          text-align: center;
          font-size: 11px;
          line-height: 1.45;
        }
        .svc-trust--light {
          color: #8a8a8a;
        }
        .svc-trust--dark {
          color: rgba(255, 255, 255, 0.55);
        }
        .svc-trust-part {
          white-space: nowrap;
        }
        .svc-trust-dot {
          margin: 0;
          flex-shrink: 0;
          line-height: 1;
        }
      }
    `}</style>
  );
}

export default function ServiceTrustLine({
  variant = "light",
  className = "",
  dataDelay,
  style,
}) {
  const toneClass =
    variant === "dark" ? "svc-trust--dark" : "svc-trust--light";

  return (
    <>
      <ServiceTrustLineStyles />
      <p
        className={`svc-trust ${toneClass} ${className}`.trim()}
        data-delay={dataDelay != null ? String(dataDelay) : undefined}
        style={style}
      >
        <span className="svc-trust-part">Free consultation</span>
        <span className="svc-trust-dot" aria-hidden="true">
          ·
        </span>
        <span className="svc-trust-part">No commitment</span>
        <span className="svc-trust-dot" aria-hidden="true">
          ·
        </span>
        <span className="svc-trust-part">100% confidential</span>
      </p>
    </>
  );
}
