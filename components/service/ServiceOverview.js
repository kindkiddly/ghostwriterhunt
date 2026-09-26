"use client";

import FloatingImages from "./FloatingImages";
import { useRevealSelector } from "@/lib/useSectionReveal";

/**
 * GhostWriterHunt — ServiceOverview
 * Two-column about section with floating images.
 * imagesOnLeft: true for even-indexed services.
 * Prefix: so-
 */

function CheckMark() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M3.5 9.5L7 13L14.5 5"
        stroke="#C9A84C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ServiceOverview({ service, imagesOnLeft = false }) {
  useRevealSelector(".so-reveal-left, .so-reveal-right", "so-visible", [
    service?.slug,
  ]);

  if (!service?.overview) return null;
  const { overview } = service;
  const isGhostwriting = service.slug === "ghostwriting";
  const bodyText =
    overview.body ??
    [overview.bodyLead, overview.bodyContinued].filter(Boolean).join(" ");

  const textCol = (
    <div
      className={`so-text ${imagesOnLeft ? "so-reveal-right" : "so-reveal-left"}`}
      data-delay={imagesOnLeft ? "150" : "0"}
    >
      <p className="so-label">ABOUT THIS SERVICE</p>
      <h2 className="so-headline">
        <span className="block">{overview.headline}</span>
        <span className="so-headline-italic">{overview.headlineItalic}</span>
      </h2>
      <p className="so-body">{bodyText}</p>
      <ul className="so-bullets">
        {overview.bullets.map((item) => (
          <li key={item} className="so-bullet">
            <CheckMark />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <a href="/#start" className="so-cta">
        Get Started →
      </a>
    </div>
  );

  const imageCol = (
    <div
      className={`so-images ${imagesOnLeft ? "so-reveal-left" : "so-reveal-right"}`}
      data-delay={imagesOnLeft ? "0" : "150"}
    >
      <FloatingImages
        images={overview.images}
        layout={isGhostwriting ? "expanded" : "default"}
      />
    </div>
  );

  return (
    <section
      className={`so-section${isGhostwriting ? " so-section--ghostwriting" : ""}`}
      aria-label="About this service"
    >
      <style>{`
        .so-section {
          background: #FFFFFF;
          padding: 80px 0;
        }
        .so-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          gap: 60px;
        }
        .so-text, .so-images {
          flex: 1;
          min-width: 0;
        }
        @media (min-width: 769px) {
          .so-inner {
            align-items: flex-start;
          }
          .so-images {
            display: flex;
            justify-content: center;
          }
        }

        /* Ghostwriting — editorial float: fixed photo cluster, text wraps beside then full width */
        .so-inner--ghostwriting {
          display: block;
        }
        .so-gw-editorial {
          max-width: 100%;
        }
        .so-gw-flow::after {
          content: "";
          display: table;
          clear: both;
        }
        @media (min-width: 769px) {
          .so-gw-float-aside {
            float: right;
            width: min(480px, 46%);
            margin: 2px 0 8px 44px;
            display: flex;
            justify-content: flex-end;
          }
          .so-gw-float-aside .fi-float--expanded {
            margin-left: auto;
            margin-right: 0;
          }
          .so-gw-flow-body {
            max-width: none;
            margin-bottom: 28px;
          }
          .so-gw-bullets-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px 40px;
            clear: both;
          }
          .so-gw-bullets-grid .so-bullet {
            margin-bottom: 0;
          }
        }

        .so-label {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 500;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #6B7C3A;
          margin: 0 0 16px;
        }
        .so-headline {
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 44px;
          line-height: 1.15;
          color: #1C1C1C;
          margin: 0 0 20px;
        }
        .so-headline-italic {
          display: block;
          font-style: italic;
          color: #C9A84C;
        }
        .so-body {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 16px;
          color: #666666;
          line-height: 1.8;
          max-width: 480px;
          margin: 0 0 32px;
        }
        .so-bullets {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .so-bullet {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 500;
          font-size: 15px;
          color: #1C1C1C;
        }
        .so-cta {
          display: inline-block;
          margin-top: 24px;
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 600;
          font-size: 15px;
          color: #C9A84C;
          text-decoration: none;
          transition: color 0.2s ease, text-decoration 0.2s ease;
        }
        .so-cta:hover {
          color: #B8960C;
          text-decoration: underline;
        }
        .so-reveal-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .so-reveal-right {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .so-reveal-left.so-visible,
        .so-reveal-right.so-visible {
          opacity: 1;
          transform: translateX(0);
        }
        @media (max-width: 768px) {
          .so-inner {
            flex-direction: column;
            gap: 32px;
            padding-left: 16px;
            padding-right: 16px;
          }
          .so-gw-float-aside {
            float: none;
            width: 100%;
            margin: 0 0 24px;
            display: flex;
            justify-content: center;
          }
          .so-gw-bullets-grid {
            grid-template-columns: 1fr;
          }
          .so-images {
            width: 100%;
            display: flex;
            justify-content: center;
            overflow: visible;
          }
          .so-headline { font-size: 32px; }
          .so-reveal-left, .so-reveal-right {
            transform: translateY(20px);
          }
          .so-images { order: -1; }
        }
      `}</style>

      <div className={`so-inner${isGhostwriting ? " so-inner--ghostwriting" : ""}`}>
        {isGhostwriting ? (
          <div className="so-gw-editorial">
            <p className="so-label so-reveal-left" data-delay="0">
              ABOUT THIS SERVICE
            </p>
            <h2 className="so-headline so-reveal-left" data-delay="0">
              <span className="block">{overview.headline}</span>
              <span className="so-headline-italic">
                {overview.headlineItalic}
              </span>
            </h2>
            <div className="so-gw-flow">
              <aside
                className="so-gw-float-aside so-reveal-right"
                data-delay="150"
              >
                <FloatingImages images={overview.images} layout="expanded" />
              </aside>
              <p className="so-body so-gw-flow-body so-reveal-left" data-delay="0">
                {bodyText}
              </p>
            </div>
            <ul className="so-bullets so-gw-bullets-grid so-reveal-left" data-delay="100">
              {overview.bullets.map((item) => (
                <li key={item} className="so-bullet">
                  <CheckMark />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a href="/#start" className="so-cta so-reveal-left" data-delay="100">
              Get Started →
            </a>
          </div>
        ) : imagesOnLeft ? (
          <>
            {imageCol}
            {textCol}
          </>
        ) : (
          <>
            {textCol}
            {imageCol}
          </>
        )}
      </div>
    </section>
  );
}
