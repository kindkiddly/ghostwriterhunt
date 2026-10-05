"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import HeroTitleFrame from "@/components/HeroTitleFrame";
import FloatingImages from "./FloatingImages";
import ServiceTrustLine from "./ServiceTrustLine";
import ServiceMobileDualCtaStyles from "./ServiceMobileDualCtaStyles";
import ServiceDesktopDualCtaStyles from "./ServiceDesktopDualCtaStyles";
import ServiceHeroLede from "./ServiceHeroLede";
import { useRevealSelector } from "@/lib/useSectionReveal";
import { useMinWidth } from "@/lib/useMinWidth";
import { getImageDimensions } from "@/data/imageDimensions";

import Link from "next/link";
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

/** Mobile-only: plain Playfair title + hero art below (1560×878, home quill ratio). */
const MOBILE_PLAIN_HERO_ART = {
  "book-marketing": "/images/background-bookmarketing-mobile.webp",
  "video-book-trailer": "/images/background-videobook-mobile.webp",
  "ebook-publishing": "/images/background-ebookpublishing-mobile.webp",
  proofreading: "/images/background-proofreading-mobile.webp",
  "audiobook-publishing":
    "/images/background-audiobookpublishing-mobile.webp",
  ghostwriting: "/images/CTA-AUTHOR.webp",
  "ebook-writing": "/images/ebook-writing-mobile.webp",
  "childrens-book": "/images/childrens-book-mobile-plain.webp",
  "article-writing": "/images/article-writing-mobile.webp",
  "blog-writing": "/images/blog-writing-mobile.webp",
  "website-content": "/images/website-content-mobile.webp",
  "manuscript-editing": "/images/manuscript-editing-mobile.webp",
  "book-formatting": "/images/HEERO-L06.webp",
  "book-cover-design": "/images/book-cover-design-mobile.webp",
  "interior-layout": "/images/interior-layout-mobile.webp",
  "illustration-graphics": "/images/illustration-graphics-mobile.webp",
  "author-branding": "/images/background-authorbranding.webp",
  "author-website": "/images/author-website-mobile.webp",
};

export default function ServiceHero({ service }) {
  const slug = service?.slug;
  const splitDesktopMobileHeadline =
    slug === "blog-writing" || slug === "childrens-book";

  useRevealSelector(
    ".sh-reveal-left, .sh-reveal-img",
    "sh-visible",
    [slug]
  );
  const isWideViewport = useMinWidth(769);

  const [splitHeadlineMode, setSplitHeadlineMode] = useState(
    splitDesktopMobileHeadline ? "unknown" : "desktop"
  );

  useLayoutEffect(() => {
    if (!splitDesktopMobileHeadline) return undefined;

    const mq = window.matchMedia("(min-width: 769px)");
    const sync = () =>
      setSplitHeadlineMode(mq.matches ? "desktop" : "mobile");
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [splitDesktopMobileHeadline]);

  const isEbookWriting = slug === "ebook-writing";
  const isBookMarketing = slug === "book-marketing";
  const [isEbookDesktop, setIsEbookDesktop] = useState(true);
  const [isDesktopHero, setIsDesktopHero] = useState(true);

  useLayoutEffect(() => {
    if (!isEbookWriting) return undefined;

    const mq = window.matchMedia("(min-width: 769px)");
    const sync = () => setIsEbookDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [isEbookWriting]);

  useLayoutEffect(() => {
    if (!isBookMarketing) return undefined;

    const mq = window.matchMedia("(min-width: 769px)");
    const sync = () => setIsDesktopHero(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [isBookMarketing]);

  const heroFloatImages = useMemo(() => {
    let heroImages = service?.heroImages ?? [];
    if (isBookMarketing && isDesktopHero) {
      heroImages = heroImages.filter(
        (img) => img.url !== "/images/collaboration-laptop.webp"
      );
    }
    if (isEbookWriting && isEbookDesktop) {
      return heroImages.map((img) =>
        img.url === "/images/books-education.webp"
          ? {
              url: "/images/ebook-writing-process-3.webp",
              alt: "eBook writing in progress",
              size: "small",
            }
          : img
      );
    }
    return heroImages;
  }, [
    isBookMarketing,
    isDesktopHero,
    isEbookWriting,
    isEbookDesktop,
    service?.heroImages,
  ]);

  if (!service) return null;

  const isChildrensBook = service.slug === "childrens-book";
  const isBlogWriting = service.slug === "blog-writing";
  const isGhostwriting = service.slug === "ghostwriting";
  const mobilePlainHeroArt = MOBILE_PLAIN_HERO_ART[service.slug] ?? null;
  const mobilePlainHeroDims = mobilePlainHeroArt
    ? getImageDimensions(mobilePlainHeroArt)
    : null;
  const mobileHeroArtClass = `sh-mobile-hero-art${
    mobilePlainHeroDims &&
    mobilePlainHeroDims.height > mobilePlainHeroDims.width
      ? " sh-mobile-hero-art--portrait"
      : ""
  }`;
  const isPlainTextHeadline =
    !isGhostwriting && !DESKTOP_BAKED_HEADLINE_SLUGS.has(service.slug);
  const isBakedHeroImage = isBlogWriting || isGhostwriting;
  const ghostDesktopTextHero = isGhostwriting;

  const showSplitDesktopHeadline = splitHeadlineMode === "desktop";
  const showSplitMobileHeadline =
    splitHeadlineMode === "mobile" || splitHeadlineMode === "unknown";
  const floatEager = isWideViewport || !mobilePlainHeroArt;

  return (
    <section
      data-hero
      className={`sh-section${isBakedHeroImage ? " sh-section--baked-headline" : ""}${isBlogWriting ? " sh-section--blog-baked" : ""}${splitDesktopMobileHeadline ? " sh-section--split-headline" : ""}${isPlainTextHeadline || isGhostwriting ? " sh-section--plain-headline" : ""}${mobilePlainHeroArt ? " sh-section--mobile-plain-art" : ""}${isEbookWriting ? " sh-section--ebook-writing" : ""}${isBookMarketing ? " sh-section--book-marketing" : ""}`}
      aria-label={`${service.title} hero`}
    >
      <style dangerouslySetInnerHTML={{ __html: `
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
          font-family: var(--font-inter), sans-serif;
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
          font-family: var(--font-inter), sans-serif;
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
          font-family: var(--font-inter), sans-serif;
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
          font-family: var(--font-playfair), serif;
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
            padding: 72px 0 56px;
            overflow-x: clip;
          }
          .sh-inner {
            flex-direction: column;
            gap: 12px;
            padding-left: 32px;
            padding-right: 32px;
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
            display: none;
          }

          .sh-headline-wrap {
            max-width: 100%;
            overflow: visible;
          }
          .sh-right {
            display: flex;
            justify-content: center;
            width: 100%;
            max-width: 100%;
            margin-left: 0;
            margin-right: 0;
            padding-left: 4px;
            padding-right: 4px;
            box-sizing: border-box;
            overflow: visible;
          }
          .sh-reveal-left { transform: translateY(20px); }

          .sh-section .sh-ctas {
            padding-bottom: 0;
            margin-bottom: 20px;
          }

          .sh-section .svc-trust {
            margin-top: 4px;
            margin-bottom: 0;
          }

          /* Blog / children's — no hidden desktop headline layer on mobile */
          .sh-section--split-headline .sh-plain-desktop-only {
            display: none !important;
          }

          /* Plain-title services — mobile hero art (home quill proportions) */
          .sh-section--mobile-plain-art .sh-mobile-plain-head {
            width: 100%;
          }
          .sh-section--mobile-plain-art
            .sh-mobile-plain-head
            .gwh-hero-title-frame--plain {
            padding: 0;
            overflow: visible;
            text-align: center;
          }
          .sh-section--mobile-plain-art
            .sh-mobile-plain-head
            .gwh-hero-title-frame--plain
            .gwh-hero-title-frame-h1 {
            font-size: clamp(24px, 6.8vw, 31px);
            line-height: 1.08;
            letter-spacing: -0.02em;
          }
          .sh-section--mobile-plain-art
            .sh-mobile-plain-head
            .gwh-hero-title-frame--plain
            .gwh-hero-title-rule {
            margin-left: auto;
            margin-right: auto;
          }
          .sh-mobile-hero-art {
            width: 100%;
            margin-top: 16px;
            line-height: 0;
          }
          .sh-mobile-hero-art img {
            width: 100%;
            height: auto;
            max-width: 100%;
            object-fit: contain;
            object-position: center top;
            display: block;
          }
          .sh-mobile-hero-art--portrait img {
            width: 100%;
            max-width: min(440px, 100%);
            margin-left: auto;
            margin-right: auto;
          }
        }
      ` }} />
      <ServiceMobileDualCtaStyles />
      <ServiceDesktopDualCtaStyles />

      <div className="sh-inner">
        <div className="sh-left sh-reveal-left sh-visible" data-delay="0">
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
              <div className="sh-headline-wrap sh-ghost-mobile-only sh-mobile-plain-head">
                <HeroTitleFrame
                  line1="Your story written"
                  line2="flawlessly."
                  variant="service"
                  titleStyle="plain"
                />
                {mobilePlainHeroArt ? (
                  <div className={mobileHeroArtClass} aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={mobilePlainHeroArt}
                      alt=""
                      width={mobilePlainHeroDims?.width ?? 1560}
                      height={mobilePlainHeroDims?.height ?? 878}
                      decoding="async"
                      fetchPriority="high"
                    />
                  </div>
                ) : null}
              </div>
            </>
          ) : isChildrensBook ? (
            <>
              {showSplitDesktopHeadline ? (
                <div className="sh-headline-wrap sh-plain-desktop-only">
                  <HeroTitleFrame
                    line1={service.tagline}
                    line2={service.taglineItalic}
                    variant="service"
                    titleStyle="illustration"
                    illustrationBg={{
                      desktop: "/images/childrens-book-hero-bg.webp",
                      mobile: "/images/childrens-book-hero-bg-mobile.webp",
                    }}
                  />
                </div>
              ) : null}
              {showSplitMobileHeadline ? (
              <div className="sh-headline-wrap sh-plain-mobile-only sh-mobile-plain-head">
                <HeroTitleFrame
                  line1={service.tagline}
                  line2={service.taglineItalic}
                  variant="service"
                  titleStyle="plain"
                />
                {mobilePlainHeroArt ? (
                  <div className={mobileHeroArtClass} aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={mobilePlainHeroArt}
                      alt=""
                      width={mobilePlainHeroDims?.width ?? 1560}
                      height={mobilePlainHeroDims?.height ?? 878}
                      decoding="async"
                      fetchPriority="high"
                    />
                  </div>
                ) : null}
              </div>
              ) : null}
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
              {mobilePlainHeroArt ? (
                <div className="sh-headline-wrap sh-plain-mobile-only sh-mobile-plain-head">
                  <HeroTitleFrame
                    line1={service.tagline}
                    line2={service.taglineItalic}
                    variant="service"
                    titleStyle="plain"
                  />
                  <div className={mobileHeroArtClass} aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={mobilePlainHeroArt}
                      alt=""
                      width={mobilePlainHeroDims?.width ?? 1560}
                      height={mobilePlainHeroDims?.height ?? 878}
                      decoding="async"
                      fetchPriority="high"
                    />
                  </div>
                </div>
              ) : (
                <div className="sh-headline-wrap sh-plain-mobile-only">
                  <HeroTitleFrame
                    line1={service.tagline}
                    line2={service.taglineItalic}
                    variant="service"
                    titleStyle="default"
                  />
                </div>
              )}
            </>
          ) : isBlogWriting ? (
            <>
              {showSplitDesktopHeadline ? (
                <div className="sh-headline-wrap sh-plain-desktop-only">
                  <HeroTitleFrame
                    line1={service.tagline}
                    line2={service.taglineItalic}
                    variant="service"
                    titleStyle="mobile-scene"
                    illustrationBg={{
                      desktop: "/images/background-blog.webp",
                      mobile: "/images/background-blog-mobile.webp",
                    }}
                  />
                </div>
              ) : null}
              {showSplitMobileHeadline ? (
              <div className="sh-headline-wrap sh-plain-mobile-only sh-mobile-plain-head">
                <HeroTitleFrame
                  line1={service.tagline}
                  line2={service.taglineItalic}
                  variant="service"
                  titleStyle="plain"
                />
                {mobilePlainHeroArt ? (
                  <div className={mobileHeroArtClass} aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={mobilePlainHeroArt}
                      alt=""
                      width={mobilePlainHeroDims?.width ?? 1560}
                      height={mobilePlainHeroDims?.height ?? 878}
                      decoding="async"
                      fetchPriority="high"
                    />
                  </div>
                ) : null}
              </div>
              ) : null}
            </>
          ) : null}

          <ServiceHeroLede
            text={service.heroSubtext}
            emphasis={service.heroSubtextEmphasis}
            topLabel={service.title}
            category={service.category}
            slug={service.slug}
          />

          <div className="sh-ctas svc-dual-ctas">
            <Link
              href="/#start"
              className="sh-btn-primary gwh-gold-btn-fill svc-dual-cta-btn svc-dual-cta-btn--primary"
            >
              <span className="lg:hidden">Start Your Project →</span>
              <span className="hidden lg:inline">Start Your Project</span>
            </Link>
            <Link
              href="/#start"
              className="sh-btn-secondary svc-dual-cta-btn svc-dual-cta-btn--secondary"
            >
              Book Free Consultation
            </Link>
          </div>

          <ServiceTrustLine variant="light" />
        </div>

        <div className="sh-right sh-reveal-img sh-visible" data-delay="200">
          <FloatingImages
            images={heroFloatImages}
            slug={service.slug}
            layout={isGhostwriting ? "expanded" : "default"}
            className={`fi-float--service-hero${
              isBookMarketing && isDesktopHero
                ? " fi-float--book-marketing-hero"
                : ""
            }`}
            eager={floatEager}
          />
        </div>
      </div>
    </section>
  );
}
