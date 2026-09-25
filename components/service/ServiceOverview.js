"use client";

import { useEffect } from "react";
import FloatingImages from "./FloatingImages";

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
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".so-reveal-left, .so-reveal-right"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0");
            setTimeout(() => {
              entry.target.classList.add("so-visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    requestAnimationFrame(() => {
      elements.forEach((el) => {
        el.classList.remove("so-visible");
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, [service?.slug]);

  if (!service?.overview) return null;
  const { overview } = service;

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
      <p className="so-body">{overview.body}</p>
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
      <FloatingImages images={overview.images} />
    </div>
  );

  return (
    <section className="so-section" aria-label="About this service">
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

      <div className="so-inner">
        {imagesOnLeft ? (
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
