"use client";

import HeroTitleFrame from "@/components/HeroTitleFrame";
import FloatingImages from "./FloatingImages";
import ServiceTrustLine from "./ServiceTrustLine";
import ServiceMobileDualCtaStyles from "./ServiceMobileDualCtaStyles";
import ServiceDesktopDualCtaStyles from "./ServiceDesktopDualCtaStyles";
import ServiceHeroLede from "./ServiceHeroLede";
import { useRevealSelector } from "@/lib/useSectionReveal";

/**
 * GhostWriterHunt — ServiceHero
 * Full-viewport hero: left copy + right floating images.
 * Prefix: sh-
 */

/**
 * Desktop-only plain Playfair headline (no background-header strip).
 * Keep baked/illustration heroes: children's book, blog, ghostwriting (custom).
 */
const DESKTOP_BAKED_HEADLINE_SLUGS = new Set(["childrens-book", "blog-writing"]);

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
  const isPlainTextHeadline =
    !isGhostwriting && !DESKTOP_BAKED_HEADLINE_SLUGS.has(service.slug);
  const isBakedHeroImage = isBlogWriting || isGhostwriting;
  const ghostDesktopTextHero = isGhostwriting;

  return (
    <section
      className={`sh-section${isBakedHeroImage ? " sh-section--baked-headline" : ""}${isBlogWriting ? " sh-section--blog-baked" : ""}${isPlainTextHeadline || isGhostwriting ? " sh-section--plain-headline" : ""}`}
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

        .sh-plain-desktop-only {
          display: none;
        }
        .sh-plain-mobile-only {
          display: block;
        }

        @media (min-width: 769px) {
          .sh-plain-desktop-only {
            display: block;
          }
          .sh-plain-mobile-only {
            display: none !important;
          }
          .sh-section--plain-headline .sh-headline-wrap {
            margin-bottom: 20px;
          }
          .sh-section--plain-headline .sh-hero-lede {
            margin-top: 0;
          }
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
          opacity: 1;
          transform: translateX(-24px);
          transition: transform 0.7s ease-out;
        }
        .sh-reveal-left.sh-visible {
          transform: translateX(0);
        }
        .sh-reveal-img {
          opacity: 1;
          transform: translateY(20px);
          transition: transform 0.7s ease-out;
        }
        .sh-reveal-img.sh-visible {
          transform: translateY(0);
        }

        /* Desktop — hero sits flush under nav; float cluster top-aligned (not viewport-centered) */
        @media (min-width: 769px) {
          .sh-section {
            align-items: flex-start;
            justify-content: flex-start;
            min-height: auto;
            padding-top: 70px;
            padding-bottom: 80px;
          }
          .sh-inner {
            align-items: flex-start;
          }
          .sh-right {
            align-self: flex-start;
          }
          .sh-section .fi-float-large {
            top: 0;
          }
          .sh-section .fi-single {
            justify-content: flex-start;
          }
        }

        @media (min-width: 1024px) {
          .sh-left {
            padding-left: 20px;
          }
        }

        /* Ghostwriting — desktop text hero (no background-gwriting strip) */
        .sh-ghost-desktop-only {
          display: none;
        }
        .sh-ghost-mobile-only {
          display: block;
        }
        .sh-ghost-desktop-h1 {
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 56px;
          line-height: 1.08;
          color: #1c1c1c;
          margin: 0;
        }
        .sh-ghost-desktop-h1-line {
          display: block;
        }
        .sh-ghost-desktop-h1-italic {
          display: block;
          font-style: italic;
          color: #c9a84c;
        }
        @media (min-width: 769px) {
          .sh-ghost-desktop-only {
            display: block;
          }
          .sh-ghost-mobile-only {
            display: none !important;
          }
          .sh-ghost-desktop-title {
            margin: 0 0 20px;
          }
        }

        /* Baked headline is taller — top-align columns; float cluster lines up with headline art */
        @media (min-width: 769px) {
          .sh-section--baked-headline .sh-inner {
            align-items: flex-start;
          }
          .sh-section--baked-headline .sh-right {
            padding-top: 36px;
          }
          /* Blog baked strip — align float tops with headline art (default float uses top: 20px) */
          .sh-section--blog-baked .fi-float-large {
            top: 0;
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
          .sh-left {
            text-align: center;
          }
          .sh-left .sh-label {
            margin-left: auto;
            margin-right: auto;
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
      <ServiceDesktopDualCtaStyles />

      <div className="sh-inner">
        <div className="sh-left sh-reveal-left" data-delay="0">
          <p className="sh-label">{service.category}</p>

          {ghostDesktopTextHero ? (
            <>
              <div className="sh-ghost-desktop-title sh-ghost-desktop-only">
                <h1 className="sh-ghost-desktop-h1">
                  <span className="sh-ghost-desktop-h1-line">Your Story,</span>
                  <span className="sh-ghost-desktop-h1-italic">
                    Written Flawlessly.
                  </span>
                </h1>
              </div>
              <div className="sh-headline-wrap sh-ghost-mobile-only">
                <HeroTitleFrame
                  line1={service.tagline}
                  line2={service.taglineItalic}
                  variant="service"
                  titleStyle="mobile-scene"
                  naturalMobileHeight
                  illustrationBg={{
                    mobile: "/images/background-gwriting-mobile.webp",
                  }}
                />
              </div>
            </>
          ) : isPlainTextHeadline ? (
            <>
              <div className="sh-headline-wrap sh-plain-desktop-only">
                <HeroTitleFrame
                  line1={service.tagline}
                  line2={service.taglineItalic}
                  variant="service"
                  titleStyle="plain"
                />
              </div>
              <div className="sh-headline-wrap sh-plain-mobile-only">
                <HeroTitleFrame
                  line1={service.tagline}
                  line2={service.taglineItalic}
                  variant="service"
                  titleStyle="default"
                />
              </div>
            </>
          ) : (
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
                    : null
              }
            />
          )}

          <ServiceHeroLede
            text={service.heroSubtext}
            emphasis={service.heroSubtextEmphasis}
            topLabel={service.title}
            category={service.category}
            slug={service.slug}
          />

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
          <FloatingImages
            images={service.heroImages}
            slug={service.slug}
            layout={isGhostwriting ? "expanded" : "default"}
            eager
          />
        </div>
      </div>
    </section>
  );
}
