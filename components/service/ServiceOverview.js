"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import FloatingImages from "./FloatingImages";
import { useRevealSelector } from "@/lib/useSectionReveal";
import { getImageDimensions } from "@/data/imageDimensions";

const EBOOK_OVERVIEW_LANDSCAPE = "/images/ebook-writing-mobile.webp";
const EBOOK_OVERVIEW_ACCENT = "/images/HEERO-L18.webp";
const ILLUSTRATION_ABOUT_PORTRAIT =
  "/images/illustration-graphics-about-portrait.webp";

import Link from "next/link";
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

  const isEbookWriting = service?.slug === "ebook-writing";
  const isIllustrationGraphics = service?.slug === "illustration-graphics";
  const isBookMarketing = service?.slug === "book-marketing";
  const [isDesktopOverview, setIsDesktopOverview] = useState(true);

  useLayoutEffect(() => {
    if (!isEbookWriting && !isIllustrationGraphics && !isBookMarketing) {
      return undefined;
    }

    const mq = window.matchMedia("(min-width: 769px)");
    const sync = () => setIsDesktopOverview(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [isEbookWriting, isIllustrationGraphics, isBookMarketing]);

  const overviewFloatImages = useMemo(() => {
    const imgs = service?.overview?.images ?? [];
    if (isBookMarketing && isDesktopOverview) {
      return imgs.filter(
        (img) => img.url !== "/images/book-marketing-overview-2.webp"
      );
    }
    return imgs;
  }, [isBookMarketing, isDesktopOverview, service?.overview?.images]);

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
      <Link href="/#start" className="so-cta">
        Get Started →
      </Link>
    </div>
  );

  const ebookLandscapeDims = getImageDimensions(EBOOK_OVERVIEW_LANDSCAPE);
  const ebookAccentDims = getImageDimensions(EBOOK_OVERVIEW_ACCENT);
  const useEbookOverviewStack = isEbookWriting && isDesktopOverview;
  const useIllustrationAboutPortrait =
    isIllustrationGraphics && isDesktopOverview;
  const illustrationPortraitDims = getImageDimensions(ILLUSTRATION_ABOUT_PORTRAIT);

  const imageCol = (
    <div
      className={`so-images ${imagesOnLeft ? "so-reveal-left" : "so-reveal-right"}${useEbookOverviewStack ? " so-images--ebook-stack" : ""}${useIllustrationAboutPortrait ? " so-images--illustration-portrait" : ""}`}
      data-delay={imagesOnLeft ? "0" : "150"}
    >
      {useIllustrationAboutPortrait ? (
        <div className="so-illustration-about-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ILLUSTRATION_ABOUT_PORTRAIT}
            alt="Illustration and graphics for books"
            className="so-illustration-about-portrait"
            width={illustrationPortraitDims.width}
            height={illustrationPortraitDims.height}
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : useEbookOverviewStack ? (
        <div className="so-ebook-overview-visual">
          <div className="so-ebook-overview-landscape-slot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={EBOOK_OVERVIEW_LANDSCAPE}
              alt="Professional eBook writing"
              className="so-ebook-overview-landscape"
              width={ebookLandscapeDims.width}
              height={ebookLandscapeDims.height}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="so-ebook-overview-accent-slot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={EBOOK_OVERVIEW_ACCENT}
              alt="eBook author showcase"
              className="so-ebook-overview-accent"
              width={ebookAccentDims.width}
              height={ebookAccentDims.height}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      ) : (
        <FloatingImages
          images={overviewFloatImages}
          layout={isGhostwriting ? "expanded" : "default"}
        />
      )}
    </div>
  );

  return (
    <section
      className={`so-section${isGhostwriting ? " so-section--ghostwriting" : ""}${isEbookWriting ? " so-section--ebook-writing" : ""}${isIllustrationGraphics ? " so-section--illustration-graphics" : ""}`}
      aria-label="About this service"
    >
      <style dangerouslySetInnerHTML={{ __html: `
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
          /* eBook Writing — desktop About: text left (wide), images right, no extra image padding */
          .so-section--ebook-writing .so-inner {
            align-items: flex-start;
            gap: 48px;
          }
          .so-section--ebook-writing .so-text {
            flex: 1 1 62%;
            min-width: 0;
          }
          .so-section--ebook-writing .so-body {
            max-width: 100%;
          }
          .so-section--ebook-writing .so-images--ebook-stack {
            flex: 0 1 38%;
            max-width: 440px;
            min-width: 300px;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: flex-start;
          }
          .so-ebook-overview-visual {
            width: 100%;
            max-width: 440px;
            margin: 0;
            margin-left: auto;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 0;
          }
          .so-ebook-overview-landscape-slot {
            width: 100%;
            line-height: 0;
            z-index: 1;
          }
          .so-ebook-overview-landscape {
            width: 100%;
            height: auto;
            object-fit: contain;
            object-position: right top;
            border-radius: 16px;
            box-shadow: 0 20px 56px rgba(0, 0, 0, 0.12);
            transform: rotate(-2.5deg);
            transform-origin: 100% 12%;
            display: block;
          }
          .so-ebook-overview-accent-slot {
            width: 92%;
            margin-top: -32px;
            margin-left: auto;
            padding: 0;
            line-height: 0;
            z-index: 2;
          }
          .so-ebook-overview-accent {
            width: 100%;
            height: auto;
            object-fit: contain;
            object-position: right bottom;
            border-radius: 14px;
            box-shadow: 0 18px 48px rgba(0, 0, 0, 0.11);
            transform: rotate(4.5deg);
            transform-origin: 88% 88%;
            display: block;
          }

          /* Illustration — desktop About: wider copy, larger portrait, tighter column gap */
          .so-section--illustration-graphics .so-inner {
            align-items: flex-start;
            gap: 24px;
          }
          .so-section--illustration-graphics .so-text {
            flex: 1 1 58%;
            min-width: 0;
          }
          .so-section--illustration-graphics .so-body {
            max-width: 100%;
          }
          .so-section--illustration-graphics .so-images.so-images--illustration-portrait {
            flex: 0 1 42%;
            min-width: 280px;
            max-width: 600px;
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
          }
          .so-illustration-about-frame {
            width: fit-content;
            max-width: calc(100% - 48px);
            margin: 0;
            margin-left: 20px;
            padding: 14px 24px;
            line-height: 0;
            background: #ffffff;
            border-radius: 16px;
            border: 1px solid rgba(0, 0, 0, 0.09);
            box-shadow:
              0 26px 64px rgba(0, 0, 0, 0.16),
              0 10px 28px rgba(0, 0, 0, 0.08);
            overflow: hidden;
          }
          .so-illustration-about-portrait {
            display: block;
            width: auto;
            height: auto;
            max-width: min(100%, 580px);
            max-height: min(780px, 88vh);
            margin: 0;
            padding: 0;
            border-radius: 12px;
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
          font-family: var(--font-inter), sans-serif;
          font-weight: 500;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #6B7C3A;
          margin: 0 0 16px;
        }
        .so-headline {
          font-family: var(--font-playfair), serif;
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
          font-family: var(--font-inter), sans-serif;
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
          font-family: var(--font-inter), sans-serif;
          font-weight: 500;
          font-size: 15px;
          color: #1C1C1C;
        }
        .so-cta {
          display: inline-block;
          margin-top: 24px;
          font-family: var(--font-inter), sans-serif;
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
          .so-section {
            overflow-x: clip;
          }
          .so-inner {
            flex-direction: column;
            gap: 32px;
            padding-left: 32px;
            padding-right: 32px;
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
          .so-headline { font-size: 32px; }
          .so-reveal-left, .so-reveal-right {
            transform: translateY(20px);
          }
          /* Mobile — one hero float cluster only; drop duplicate overview mosaic */
          .so-images,
          .so-gw-float-aside {
            display: none !important;
          }
          .so-gw-mobile-stack {
            display: none;
          }
          .so-gw-editorial--desktop {
            display: block;
          }
          .so-inner--ghostwriting {
            display: flex;
            flex-direction: column;
            align-items: stretch;
          }
          .so-section--ghostwriting .so-gw-editorial--desktop {
            display: none !important;
          }
          .so-section--ghostwriting .so-gw-mobile-stack {
            display: block;
            width: 100%;
          }
          .so-body {
            max-width: 100%;
          }
        }
        @media (min-width: 769px) {
          .so-gw-mobile-stack {
            display: none !important;
          }
        }
      ` }} />

      <div className={`so-inner${isGhostwriting ? " so-inner--ghostwriting" : ""}`}>
        {isGhostwriting ? (
          <>
            <div className="so-gw-editorial so-gw-editorial--desktop">
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
                <p
                  className="so-body so-gw-flow-body so-reveal-left"
                  data-delay="0"
                >
                  {bodyText}
                </p>
              </div>
              <ul
                className="so-bullets so-gw-bullets-grid so-reveal-left"
                data-delay="100"
              >
                {overview.bullets.map((item) => (
                  <li key={item} className="so-bullet">
                    <CheckMark />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/#start"
                className="so-cta so-reveal-left"
                data-delay="100"
              >
                Get Started →
              </Link>
            </div>
            <div className="so-gw-mobile-stack">{textCol}</div>
          </>
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
