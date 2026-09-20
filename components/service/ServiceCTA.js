"use client";

import { useEffect } from "react";

/**
 * GhostWriterHunt — ServiceCTA
 * Full-bleed image CTA with dark overlay. Prefix: sc-
 */

export default function ServiceCTA({ service }) {
  useEffect(() => {
    const elements = document.querySelectorAll(".sc-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0");
            setTimeout(() => {
              entry.target.classList.add("sc-visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    requestAnimationFrame(() => {
      elements.forEach((el) => {
        el.classList.remove("sc-visible");
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, [service?.slug]);

  if (!service) return null;

  return (
    <section
      className="sc-section"
      aria-label="Get started"
      style={{
        backgroundImage: `linear-gradient(rgba(28,28,28,0.88), rgba(28,28,28,0.88)), url(${service.ctaImage})`,
      }}
    >
      <style>{`
        .sc-section {
          width: 100%;
          min-height: 480px;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
          text-align: center;
        }
        .sc-inner {
          max-width: 700px;
          margin: 0 auto;
        }
        .sc-label {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 500;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #C9A84C;
          margin: 0 0 20px;
        }
        .sc-headline {
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 56px;
          line-height: 1.1;
          color: #FFFFFF;
          margin: 0 0 20px;
        }
        .sc-headline-italic {
          display: block;
          font-style: italic;
          color: #C9A84C;
        }
        .sc-sub {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 17px;
          color: rgba(255,255,255,0.75);
          max-width: 560px;
          margin: 0 auto 40px;
          line-height: 1.7;
        }
        .sc-ctas {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
        }
        .sc-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #C9A84C;
          color: #FFFFFF;
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 600;
          font-size: 16px;
          padding: 16px 40px;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.3s ease;
        }
        .sc-btn-primary:hover { background: #B8960C; }
        .sc-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: #FFFFFF;
          border: 1.5px solid #FFFFFF;
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 600;
          font-size: 16px;
          padding: 16px 40px;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .sc-btn-secondary:hover {
          background: #FFFFFF;
          color: #1C1C1C;
        }
        .sc-trust {
          margin-top: 24px;
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
        }
        .sc-trust-dot {
          color: #C9A84C;
          margin: 0 6px;
        }
        .sc-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .sc-reveal.sc-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 768px) {
          .sc-headline { font-size: 36px; }
          .sc-ctas { flex-direction: column; align-items: stretch; }
          .sc-btn-primary, .sc-btn-secondary { width: 100%; }
        }
      `}</style>

      <div className="sc-inner">
        <p className="sc-label sc-reveal" data-delay="0">
          GET STARTED
        </p>
        <h2 className="sc-headline sc-reveal" data-delay="80">
          <span className="block">{service.ctaHeadline}</span>
          <span className="sc-headline-italic">
            {service.ctaHeadlineItalic}
          </span>
        </h2>
        <p className="sc-sub sc-reveal" data-delay="140">
          {service.ctaSubtext}
        </p>
        <div className="sc-ctas sc-reveal" data-delay="200">
          <a href="/#start" className="sc-btn-primary">
            Start Your Project
          </a>
          <a href="/#start" className="sc-btn-secondary">
            Book Free Consultation
          </a>
        </div>
        <p className="sc-trust sc-reveal" data-delay="280">
          No commitment required
          <span className="sc-trust-dot">·</span>
          Free consultation
          <span className="sc-trust-dot">·</span>
          100% confidential
        </p>
      </div>
    </section>
  );
}
