"use client";

import { useEffect } from "react";
import FloatingImages from "./FloatingImages";

/**
 * GhostWriterHunt — ServiceHero
 * Full-viewport hero: left copy + right floating images.
 * Prefix: sh-
 */

export default function ServiceHero({ service }) {
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".sh-reveal-left, .sh-reveal-img"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0");
            setTimeout(() => {
              entry.target.classList.add("sh-visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    requestAnimationFrame(() => {
      elements.forEach((el) => {
        el.classList.remove("sh-visible");
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, [service?.slug]);

  if (!service) return null;

  return (
    <section
      className="sh-section"
      aria-label={`${service.title} hero`}
    >
      <style>{`
        .sh-section {
          min-height: 100vh;
          background: #FAFAF7;
          display: flex;
          align-items: center;
          padding: 100px 0 80px;
        }
        .sh-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          gap: 48px;
          width: 100%;
        }
        .sh-left {
          flex: 0 0 55%;
          max-width: 55%;
        }
        .sh-right {
          flex: 0 0 45%;
          max-width: 45%;
        }
        .sh-label {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 500;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #6B7C3A;
          margin: 0 0 20px;
        }
        .sh-headline {
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 56px;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #1C1C1C;
          margin: 0 0 24px;
        }
        .sh-headline-italic {
          display: block;
          font-style: italic;
          color: #C9A84C;
        }
        .sh-subtext {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 17px;
          color: #666666;
          line-height: 1.7;
          max-width: 480px;
          margin: 0 0 36px;
        }
        .sh-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 20px;
        }
        .sh-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #C9A84C;
          color: #FFFFFF;
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 600;
          font-size: 15px;
          padding: 14px 32px;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.3s ease;
        }
        .sh-btn-primary:hover { background: #B8960C; }
        .sh-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: #C9A84C;
          border: 1.5px solid #C9A84C;
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 600;
          font-size: 15px;
          padding: 14px 32px;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .sh-btn-secondary:hover {
          background: #C9A84C;
          color: #FFFFFF;
        }
        .sh-trust {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 13px;
          color: #999999;
        }
        .sh-trust-dot {
          color: #C9A84C;
          margin: 0 6px;
        }

        .sh-reveal-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .sh-reveal-left.sh-visible {
          opacity: 1;
          transform: translateX(0);
        }
        .sh-reveal-img {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .sh-reveal-img.sh-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .sh-section {
            min-height: auto;
            padding: 96px 0 60px;
          }
          .sh-inner {
            flex-direction: column;
            gap: 32px;
          }
          .sh-left, .sh-right {
            flex: 1 1 100%;
            max-width: 100%;
          }
          .sh-headline { font-size: 36px; }
          .sh-reveal-left { transform: translateY(20px); }
          .sh-ctas { flex-direction: column; }
          .sh-btn-primary, .sh-btn-secondary { width: 100%; text-align: center; }
        }
      `}</style>

      <div className="sh-inner">
        <div className="sh-left sh-reveal-left" data-delay="0">
          <p className="sh-label">{service.category}</p>

          <h1 className="sh-headline">
            <span className="block">{service.tagline}</span>
            <span className="sh-headline-italic">{service.taglineItalic}</span>
          </h1>

          <p className="sh-subtext">{service.heroSubtext}</p>

          <div className="sh-ctas">
            <a href="/#start" className="sh-btn-primary">
              Start Your Project
            </a>
            <a href="/#start" className="sh-btn-secondary">
              Book Free Consultation
            </a>
          </div>

          <p className="sh-trust">
            Free consultation
            <span className="sh-trust-dot">·</span>
            No commitment
            <span className="sh-trust-dot">·</span>
            100% confidential
          </p>
        </div>

        <div className="sh-right sh-reveal-img" data-delay="200">
          <FloatingImages images={service.heroImages} slug={service.slug} />
        </div>
      </div>
    </section>
  );
}
