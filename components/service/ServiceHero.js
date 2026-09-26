"use client";

import HeroTitleFrame from "@/components/HeroTitleFrame";
import FloatingImages from "./FloatingImages";
import ServiceTrustLine from "./ServiceTrustLine";
import ServiceMobileDualCtaStyles from "./ServiceMobileDualCtaStyles";
import { useRevealSelector } from "@/lib/useSectionReveal";

/**
 * GhostWriterHunt — ServiceHero
 * Full-viewport hero: left copy + right floating images.
 * Prefix: sh-
 */

export default function ServiceHero({ service }) {
  useRevealSelector(
    ".sh-reveal-left, .sh-reveal-img",
    "sh-visible",
    [service?.slug]
  );

  if (!service) return null;

  const isChildrensBook = service.slug === "childrens-book";
  const isBlogWriting = service.slug === "blog-writing";
  const isGhostwriting = service.slug === "ghostwriting";
  const isBakedHeroImage =
    isBlogWriting || isGhostwriting;

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
          position: relative;
          z-index: 3;
        }
        .sh-headline-wrap {
          margin: 0 0 24px;
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

        @media (min-width: 1024px) {
          .sh-left {
            padding-left: 20px;
          }
        }

        @media (max-width: 768px) {
          .sh-section {
            min-height: auto;
            padding: 96px 0 60px;
          }
          .sh-inner {
            flex-direction: column;
            gap: 32px;
            padding-left: 16px;
            padding-right: 16px;
          }
          .sh-left, .sh-right {
            flex: 1 1 100%;
            max-width: 100%;
            min-width: 0;
          }

          .sh-headline-wrap {
            max-width: 100%;
            overflow: visible;
          }
          .sh-right {
            display: flex;
            justify-content: center;
            width: 100%;
            overflow: visible;
          }
          .sh-reveal-left { transform: translateY(20px); }

          .sh-section .sh-ctas {
            padding-bottom: 0;
            margin-bottom: 20px;
          }

          .sh-section .svc-trust {
            margin-top: 4px;
          }
        }
      `}</style>
      <ServiceMobileDualCtaStyles />

      <div className="sh-inner">
        <div className="sh-left sh-reveal-left" data-delay="0">
          <p className="sh-label">{service.category}</p>

          <HeroTitleFrame
            line1={service.tagline}
            line2={service.taglineItalic}
            variant="service"
            className="sh-headline-wrap"
            titleStyle={
              isChildrensBook
                ? "illustration"
                : isBakedHeroImage
                  ? "mobile-scene"
                  : "default"
            }
            illustrationBg={
              isChildrensBook
                ? {
                    desktop: "/images/childrens-book-hero-bg.webp",
                    mobile: "/images/childrens-book-hero-bg-mobile.webp",
                  }
                : isBlogWriting
                  ? {
                      desktop: "/images/background-blog.webp",
                      mobile: "/images/background-blog-mobile.webp",
                    }
                  : isGhostwriting
                    ? {
                        desktop: "/images/background-gwriting.webp",
                        mobile: "/images/background-gwriting-mobile.webp",
                      }
                    : null
            }
          />

          <p className="sh-subtext">{service.heroSubtext}</p>

          <div className="sh-ctas svc-dual-ctas">
            <a
              href="/#start"
              className="sh-btn-primary svc-dual-cta-btn svc-dual-cta-btn--primary"
            >
              <span className="lg:hidden">Start Your Project →</span>
              <span className="hidden lg:inline">Start Your Project</span>
            </a>
            <a
              href="/#start"
              className="sh-btn-secondary svc-dual-cta-btn svc-dual-cta-btn--secondary"
            >
              Book Free Consultation
            </a>
          </div>

          <ServiceTrustLine variant="light" />
        </div>

        <div className="sh-right sh-reveal-img" data-delay="200">
          <FloatingImages images={service.heroImages} slug={service.slug} />
        </div>
      </div>
    </section>
  );
}
