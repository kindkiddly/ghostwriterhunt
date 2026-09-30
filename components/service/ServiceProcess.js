"use client";

import { useRevealSelector } from "@/lib/useSectionReveal";
import { getImageDimensions } from "@/data/imageDimensions";

/**
 * GhostWriterHunt — ServiceProcess
 * Alternating image / content process steps. Prefix: sp-
 */

function splitProcessTitle(title) {
  const words = (title ?? "").trim().split(/\s+/).filter(Boolean);
  if (words.length <= 1) {
    return { line1: title ?? "", line2: null };
  }
  const mid = Math.ceil(words.length / 2);
  return {
    line1: words.slice(0, mid).join(" "),
    line2: words.slice(mid).join(" "),
  };
}

export default function ServiceProcess({ service }) {
  useRevealSelector(".sp-reveal", "sp-visible", [service?.slug]);

  if (!service?.process?.length) return null;

  const isGhostwriting = service.slug === "ghostwriting";
  const isManuscriptEditing = service.slug === "manuscript-editing";
  const isBookFormatting = service.slug === "book-formatting";
  const isInteriorLayout = service.slug === "interior-layout";
  const isIllustrationGraphics = service.slug === "illustration-graphics";
  const isVideoBookTrailer = service.slug === "video-book-trailer";
  const isEbookPublishing = service.slug === "ebook-publishing";
  const isAudiobookPublishing = service.slug === "audiobook-publishing";
  const isAuthorBranding = service.slug === "author-branding";
  const authorBrandingMobileProcessSrc = "/images/HERO-S7.webp";
  const authorBrandingMobileProcessDims = isAuthorBranding
    ? getImageDimensions(authorBrandingMobileProcessSrc)
    : null;
  const isBookMarketing = service.slug === "book-marketing";
  const isAuthorWebsite = service.slug === "author-website";
  const bookMarketingMobileProcessImages = [
    { src: "/images/HERO-S8.webp", maxWidth: 280 },
    { src: "/images/book-marketing-overview-1.webp", maxWidth: 640 },
    { src: "/images/HEERO-L07.webp", maxWidth: 800 },
  ];
  /** Mobile-only alternate layouts; desktop keeps standard alternating rows for both. */
  /**
   * Mobile “5 steps in one portrait” package art + per-band glass text strips.
   * Reuse this pattern on other slugs: add art under public/images/*-package-mobile.webp,
   * map slug → src here, and mirror .sp-illustration-package-* styles for that slug.
   */
  const compactProcessPortraitSrc = isInteriorLayout
    ? "/images/HERO-M03.webp"
    : isEbookPublishing
      ? "/images/ebook-publishing-package-mobile.webp"
      : isAudiobookPublishing
        ? "/images/audiobook-publishing-package-mobile.webp"
        : null;
  const usesIllustrationPackageMobile =
    (isEbookPublishing || isAudiobookPublishing) && compactProcessPortraitSrc;
  const usesSplitProcessMobile =
    isAuthorWebsite || isIllustrationGraphics || isVideoBookTrailer;
  const compactProcessPortrait = compactProcessPortraitSrc
    ? getImageDimensions(compactProcessPortraitSrc)
    : null;

  function compactDescExtraLinesClass(stepNumber) {
    if (isInteriorLayout && stepNumber === "04") {
      return " sp-desc--three-lines";
    }
    return "";
  }

  return (
    <section
      className={`sp-section${isGhostwriting ? " sp-section--ghostwriting" : ""}${isManuscriptEditing ? " sp-section--manuscript-editing" : ""}${isBookFormatting ? " sp-section--book-formatting" : ""}${isInteriorLayout ? " sp-section--interior-layout" : ""}${isIllustrationGraphics ? " sp-section--illustration-graphics" : ""}${isVideoBookTrailer ? " sp-section--video-book-trailer" : ""}${isEbookPublishing ? " sp-section--ebook-publishing" : ""}${isAudiobookPublishing ? " sp-section--audiobook-publishing" : ""}${isAuthorBranding ? " sp-section--author-branding" : ""}${isBookMarketing ? " sp-section--book-marketing" : ""}${isAuthorWebsite ? " sp-section--author-website" : ""}`}
      aria-label="The process"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .sp-section {
          background: #FFFFFF;
          padding: 80px 0;
        }
        .sp-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .sp-label {
          font-family: var(--font-inter), sans-serif;
          font-weight: 500;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #6B7C3A;
          text-align: center;
          margin: 0 0 16px;
        }
        .sp-headline {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          font-size: 48px;
          line-height: 1.1;
          text-align: center;
          color: #1C1C1C;
          margin: 0 0 60px;
        }
        .sp-headline-italic {
          display: block;
          font-style: italic;
          color: #C9A84C;
        }
        .sp-steps {
          max-width: 1000px;
          margin: 0 auto;
        }
        .sp-row {
          display: flex;
          align-items: center;
          gap: 60px;
          margin-bottom: 0;
        }
        .sp-row-reverse {
          flex-direction: row-reverse;
        }
        .sp-col {
          flex: 1;
          min-width: 0;
        }
        .sp-img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
          display: block;
        }
        .sp-section--manuscript-editing .sp-img {
          object-fit: contain;
          object-position: center center;
          background: #fafaf7;
        }
        .sp-section--manuscript-editing .sp-img--landscape {
          height: 336px;
        }
        .sp-section--manuscript-editing .sp-img--portrait {
          height: 360px;
        }
        .sp-number {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          font-size: 80px;
          color: #E8D5A3;
          line-height: 1;
          margin: 0 0 8px;
        }
        .sp-title {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          font-size: 24px;
          color: #1C1C1C;
          margin: 0 0 12px;
        }
        .sp-desc {
          font-family: var(--font-inter), sans-serif;
          font-weight: 400;
          font-size: 15px;
          color: #666666;
          line-height: 1.8;
          max-width: 400px;
          margin: 0;
        }
        .sp-connector {
          width: 1px;
          height: 40px;
          background: #E8D5A3;
          margin: 20px auto;
        }
        .sp-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .sp-reveal.sp-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (min-width: 769px) {
          .sp-col-content {
            width: auto;
            margin: 0;
            padding: 0;
          }
          .sp-title-line {
            display: inline;
          }
          .sp-title-line + .sp-title-line::before {
            content: " ";
          }
          /* Book formatting — wide process banners: fit full frame, no cover crop/upscale */
          .sp-section--book-formatting .sp-img {
            height: auto;
            aspect-ratio: 800 / 273;
            object-fit: contain;
            object-position: center center;
            background: #fafaf7;
          }
        }
        @media (max-width: 768px) {
          .sp-section {
            padding: 56px 0;
          }
          .sp-inner {
            padding-left: 32px;
            padding-right: 32px;
          }
          .sp-headline {
            font-size: 32px;
            margin-bottom: 40px;
          }
          .sp-row,
          .sp-row-reverse {
            flex-direction: column;
            align-items: stretch;
            gap: 18px;
          }
          .sp-col {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            overflow: visible;
          }
          .sp-col-content {
            width: min(100%, 360px);
            margin-left: auto;
            margin-right: auto;
            padding: 0;
            overflow: visible;
          }
          .sp-number {
            font-size: 56px;
            text-align: center;
          }
          .sp-title {
            text-align: center;
            font-weight: 700;
            font-size: clamp(19px, 5.2vw, 22px);
            line-height: 1.28;
            margin-bottom: 10px;
            overflow: visible;
            overflow-wrap: break-word;
          }
          .sp-title-line {
            display: block;
          }
          .sp-desc {
            max-width: min(340px, 100%);
            text-align: center;
            margin-left: auto;
            margin-right: auto;
            font-weight: 600;
            font-size: 14px;
            line-height: 1.55;
            color: #555555;
            overflow: visible;
            overflow-wrap: break-word;
            hyphens: auto;
          }
          .sp-connector {
            height: 28px;
            margin: 10px auto;
          }
          /* Process photos — standard mobile landscape (not full-bleed) */
          .sp-img {
            width: min(100%, 360px);
            height: 200px;
            margin-left: auto;
            margin-right: auto;
            object-fit: cover;
            object-position: center center;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          }
          .sp-section--manuscript-editing .sp-img--landscape {
            width: min(100%, 432px);
            height: 240px;
            object-fit: contain;
            background: #fafaf7;
          }
          .sp-section--manuscript-editing .sp-img--portrait {
            width: min(100%, 432px);
            height: 288px;
            object-fit: contain;
            object-position: center center;
            background: #fafaf7;
          }

          /* Interior layout — mobile: steps left, portrait right (unchanged) */
          .sp-section--interior-layout {
            overflow-x: clip;
          }
          .sp-section--interior-layout .sp-steps {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            overflow: visible;
          }
          .sp-alternating-desktop-steps {
            display: block;
          }
          .sp-interior-mobile-bundle {
            display: none;
          }
          .sp-section--interior-layout .sp-interior-mobile-bundle {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            width: 100%;
            max-width: 100%;
            margin: 0;
            box-sizing: border-box;
          }
          .sp-section--interior-layout .sp-alternating-desktop-steps {
            display: none;
          }

          /* Package slugs — mobile: portrait art + 5 glass text strips */
          .sp-section--illustration-graphics,
          .sp-section--video-book-trailer,
          .sp-section--ebook-publishing,
          .sp-section--audiobook-publishing,
          .sp-section--author-website {
            overflow-x: clip;
          }
          .sp-section--illustration-graphics .sp-steps,
          .sp-section--video-book-trailer .sp-steps,
          .sp-section--ebook-publishing .sp-steps,
          .sp-section--audiobook-publishing .sp-steps,
          .sp-section--author-website .sp-steps {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            overflow: visible;
          }
          .sp-section--illustration-graphics .sp-alternating-desktop-steps,
          .sp-section--video-book-trailer .sp-alternating-desktop-steps,
          .sp-section--ebook-publishing .sp-alternating-desktop-steps,
          .sp-section--audiobook-publishing .sp-alternating-desktop-steps,
          .sp-section--author-website .sp-alternating-desktop-steps {
            display: none;
          }
          .sp-illustration-package-mobile {
            display: none;
          }
          .sp-section--ebook-publishing .sp-illustration-package-mobile,
          .sp-section--audiobook-publishing .sp-illustration-package-mobile {
            display: block;
            width: 100%;
          }

          /* Author website + illustration — mobile: image then copy per step (no overlays) */
          .sp-author-website-mobile-bundle {
            display: none;
          }
          .sp-section--author-website .sp-author-website-mobile-bundle,
          .sp-section--illustration-graphics .sp-author-website-mobile-bundle,
          .sp-section--video-book-trailer .sp-author-website-mobile-bundle {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 32px;
            width: 100%;
            max-width: 100%;
            margin: 0;
            box-sizing: border-box;
          }
          .sp-author-website-mobile-step {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 14px;
            margin: 0;
            padding: 0 0 28px;
            border-bottom: 1px solid rgba(232, 213, 163, 0.45);
          }
          .sp-author-website-mobile-step:last-child {
            padding-bottom: 0;
            border-bottom: none;
          }
          .sp-author-website-mobile-step-media {
            width: 100%;
            line-height: 0;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            background: #fafaf7;
          }
          .sp-author-website-mobile-step-media img {
            width: 100%;
            height: auto;
            display: block;
            object-fit: contain;
            object-position: center center;
          }
          .sp-author-website-mobile-step-copy {
            width: 100%;
            max-width: 100%;
            text-align: left;
            padding: 0 2px;
          }
          .sp-author-website-mobile-step-copy .sp-number {
            font-family: var(--font-playfair), serif;
            font-weight: 700;
            font-size: 44px;
            line-height: 1;
            color: #e8d5a3;
            margin: 0 0 6px;
            text-align: left;
          }
          .sp-author-website-mobile-step-copy .sp-title {
            font-family: var(--font-playfair), serif;
            font-weight: 700;
            font-size: clamp(18px, 4.8vw, 21px);
            line-height: 1.28;
            color: #1c1c1c;
            margin: 0 0 8px;
            text-align: left;
            white-space: normal;
          }
          .sp-author-website-mobile-step-copy .sp-desc {
            font-family: var(--font-inter), sans-serif;
            font-size: 14px;
            line-height: 1.55;
            font-weight: 500;
            color: #555555;
            margin: 0;
            max-width: 100%;
            text-align: left;
            overflow-wrap: break-word;
            white-space: normal;
          }
          /* Illustration mobile — match Professional Ghostwriting process photo frame */
          .sp-section--illustration-graphics .sp-author-website-mobile-step-media {
            display: flex;
            justify-content: center;
            background: transparent;
            box-shadow: none;
            overflow: visible;
          }
          .sp-section--illustration-graphics .sp-author-website-mobile-step-media img,
          .sp-section--video-book-trailer .sp-author-website-mobile-step-media img {
            width: min(100%, 360px);
            height: 200px;
            margin-left: auto;
            margin-right: auto;
            object-fit: cover;
            object-position: center center;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          }
          .sp-section--video-book-trailer .sp-author-website-mobile-step-media {
            display: flex;
            justify-content: center;
            background: transparent;
            box-shadow: none;
            overflow: visible;
          }
          .sp-illustration-package-stack {
            position: relative;
            width: 100%;
            line-height: 0;
            border-radius: 12px;
            overflow: visible;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          }
          .sp-illustration-package-stack-img {
            width: 100%;
            height: auto;
            display: block;
            vertical-align: top;
            border-radius: 12px;
          }
          .sp-illustration-package-slice {
            position: absolute;
            left: 0;
            right: 0;
            height: 20%;
            box-sizing: border-box;
            padding: 0;
            pointer-events: none;
            overflow: visible;
          }
          .sp-illustration-package-slice:nth-child(2) {
            top: 0;
          }
          .sp-illustration-package-slice:nth-child(3) {
            top: 20%;
          }
          .sp-illustration-package-slice:nth-child(4) {
            top: 40%;
          }
          .sp-illustration-package-slice:nth-child(5) {
            top: 60%;
          }
          .sp-illustration-package-slice:nth-child(6) {
            top: 80%;
          }
          .sp-illustration-package-slice-copy {
            position: absolute;
            left: 0;
            bottom: 7px;
            width: max-content;
            max-width: min(82%, calc(100% - 10px));
            text-align: left;
            pointer-events: auto;
            line-height: normal;
            padding: 6px 12px 7px 10px;
            border: none;
            background: transparent;
            box-shadow: none;
            isolation: isolate;
          }
          .sp-illustration-package-slice-copy::before {
            content: "";
            position: absolute;
            inset: 0;
            z-index: -1;
            border-radius: 0 6px 6px 0;
            pointer-events: none;
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.42) 0%,
              rgba(255, 255, 255, 0.3) 58%,
              rgba(255, 255, 255, 0.1) 82%,
              transparent 100%
            );
            backdrop-filter: blur(11px) saturate(1.08);
            -webkit-backdrop-filter: blur(11px) saturate(1.08);
            border: 1px solid rgba(255, 255, 255, 0.38);
            border-left: none;
            border-right: none;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            -webkit-mask-image: linear-gradient(
              to right,
              #000 0%,
              #000 52%,
              rgba(0, 0, 0, 0.75) 72%,
              rgba(0, 0, 0, 0.35) 88%,
              transparent 100%
            );
            mask-image: linear-gradient(
              to right,
              #000 0%,
              #000 52%,
              rgba(0, 0, 0, 0.75) 72%,
              rgba(0, 0, 0, 0.35) 88%,
              transparent 100%
            );
          }
          .sp-illustration-package-slice .sp-title {
            font-family: var(--font-playfair), serif;
            font-size: clamp(12px, 3.35vw, 14px);
            font-weight: 700;
            line-height: 1.22;
            margin: 0 0 4px;
            overflow-wrap: anywhere;
            word-break: break-word;
            text-align: left;
            white-space: normal;
          }
          .sp-illustration-package-slice .sp-desc {
            font-family: var(--font-inter), sans-serif;
            font-size: clamp(10px, 2.85vw, 12px);
            line-height: 1.42;
            font-weight: 500;
            margin: 0;
            overflow-wrap: anywhere;
            word-break: break-word;
            text-align: left;
            white-space: normal;
          }
          /* Per-band type — matched to package art (01/03/05 dark photo, 02/04 light) */
          .sp-illustration-package-slice--step-01 .sp-title,
          .sp-illustration-package-slice--step-01 .sp-desc,
          .sp-illustration-package-slice--step-03 .sp-title,
          .sp-illustration-package-slice--step-03 .sp-desc,
          .sp-illustration-package-slice--step-05 .sp-title,
          .sp-illustration-package-slice--step-05 .sp-desc {
            color: #fffef9;
          }
          .sp-illustration-package-slice--step-01 .sp-desc,
          .sp-illustration-package-slice--step-03 .sp-desc,
          .sp-illustration-package-slice--step-05 .sp-desc {
            color: rgba(255, 255, 255, 0.9);
          }
          .sp-illustration-package-slice--step-01
            .sp-illustration-package-slice-copy::before,
          .sp-illustration-package-slice--step-03
            .sp-illustration-package-slice-copy::before,
          .sp-illustration-package-slice--step-05
            .sp-illustration-package-slice-copy::before {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.22) 0%,
              rgba(255, 255, 255, 0.12) 58%,
              rgba(255, 255, 255, 0.04) 82%,
              transparent 100%
            );
            border-color: rgba(255, 255, 255, 0.28);
            box-shadow: 0 1px 8px rgba(0, 0, 0, 0.14);
          }
          .sp-illustration-package-slice--step-01 .sp-title,
          .sp-illustration-package-slice--step-01 .sp-desc,
          .sp-illustration-package-slice--step-03 .sp-title,
          .sp-illustration-package-slice--step-03 .sp-desc,
          .sp-illustration-package-slice--step-05 .sp-title,
          .sp-illustration-package-slice--step-05 .sp-desc {
            text-shadow: none;
          }
          .sp-illustration-package-slice--step-02 .sp-title,
          .sp-illustration-package-slice--step-04 .sp-title {
            color: #152228;
          }
          .sp-illustration-package-slice--step-02 .sp-desc,
          .sp-illustration-package-slice--step-04 .sp-desc {
            color: #2a3840;
          }
          .sp-section--illustration-graphics
            .sp-illustration-package-slice--step-02
            .sp-illustration-package-slice-copy::before,
          .sp-section--illustration-graphics
            .sp-illustration-package-slice--step-04
            .sp-illustration-package-slice-copy::before {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.58) 0%,
              rgba(255, 255, 255, 0.34) 58%,
              rgba(255, 255, 255, 0.1) 82%,
              transparent 100%
            );
            border-color: rgba(255, 255, 255, 0.5);
          }
          .sp-illustration-package-slice--step-02 .sp-title,
          .sp-illustration-package-slice--step-02 .sp-desc,
          .sp-illustration-package-slice--step-04 .sp-title,
          .sp-illustration-package-slice--step-04 .sp-desc {
            text-shadow: none;
          }
          /* Strip 01 — same text wrap as others; glass width hugs longest line */
          .sp-illustration-package-slice--step-01
            .sp-illustration-package-slice-copy {
            display: inline-table;
            width: auto;
            max-width: min(82%, calc(100% - 10px));
          }
          .sp-illustration-package-slice--step-03
            .sp-illustration-package-slice-copy {
            bottom: 12px;
          }
          .sp-illustration-package-slice--step-04
            .sp-illustration-package-slice-copy,
          .sp-illustration-package-slice--step-05
            .sp-illustration-package-slice-copy {
            bottom: 1px;
          }
          /* Video book trailer — locked strip bottoms (01–05: -1, -1, 18, 34, -3 px) */
          .sp-section--video-book-trailer
            .sp-illustration-package-slice--step-01
            .sp-illustration-package-slice-copy,
          .sp-section--video-book-trailer
            .sp-illustration-package-slice--step-02
            .sp-illustration-package-slice-copy {
            bottom: -1px;
          }
          .sp-section--video-book-trailer
            .sp-illustration-package-slice--step-03
            .sp-illustration-package-slice-copy {
            bottom: 18px;
          }
          .sp-section--video-book-trailer
            .sp-illustration-package-slice--step-04
            .sp-illustration-package-slice-copy {
            bottom: 34px;
          }
          .sp-section--video-book-trailer
            .sp-illustration-package-slice--step-05
            .sp-illustration-package-slice-copy {
            bottom: -3px;
          }
          /* eBook publishing — locked strip bottoms (01–05: -9, -7, 0, 5, -3 px) */
          .sp-section--ebook-publishing
            .sp-illustration-package-slice--step-01
            .sp-illustration-package-slice-copy {
            bottom: -9px;
          }
          .sp-section--ebook-publishing
            .sp-illustration-package-slice--step-02
            .sp-illustration-package-slice-copy {
            bottom: -7px;
          }
          .sp-section--ebook-publishing
            .sp-illustration-package-slice--step-03
            .sp-illustration-package-slice-copy {
            bottom: 0;
          }
          .sp-section--ebook-publishing
            .sp-illustration-package-slice--step-04
            .sp-illustration-package-slice-copy {
            bottom: 5px;
          }
          .sp-section--ebook-publishing
            .sp-illustration-package-slice--step-05
            .sp-illustration-package-slice-copy {
            bottom: -3px;
          }
          .sp-section--audiobook-publishing
            .sp-illustration-package-slice--step-01
            .sp-illustration-package-slice-copy,
          .sp-section--audiobook-publishing
            .sp-illustration-package-slice--step-02
            .sp-illustration-package-slice-copy {
            bottom: -9px;
            display: inline-table;
            width: auto;
            max-width: min(82%, calc(100% - 10px));
          }
          .sp-section--audiobook-publishing
            .sp-illustration-package-slice--step-03
            .sp-illustration-package-slice-copy {
            bottom: 2px;
          }
          .sp-section--audiobook-publishing
            .sp-illustration-package-slice--step-04
            .sp-illustration-package-slice-copy {
            bottom: 3px;
          }
          .sp-section--audiobook-publishing
            .sp-illustration-package-slice--step-05
            .sp-illustration-package-slice-copy {
            bottom: -1px;
          }
          /* Author website — locked strip bottoms (01–05: -7, -5, 6, 19, -2 px) */
          .sp-section--author-website
            .sp-illustration-package-slice--step-01
            .sp-illustration-package-slice-copy {
            bottom: -7px;
            display: inline-table;
            width: auto;
            max-width: min(82%, calc(100% - 10px));
          }
          .sp-section--author-website
            .sp-illustration-package-slice--step-02
            .sp-illustration-package-slice-copy {
            bottom: -5px;
          }
          .sp-section--author-website
            .sp-illustration-package-slice--step-03
            .sp-illustration-package-slice-copy {
            bottom: 6px;
          }
          .sp-section--author-website
            .sp-illustration-package-slice--step-04
            .sp-illustration-package-slice-copy {
            bottom: 19px;
          }
          .sp-section--author-website
            .sp-illustration-package-slice--step-05
            .sp-illustration-package-slice-copy {
            bottom: -2px;
          }

          /* Illustration — band colors (01 dark photo; 02–05 light) */
          .sp-section--illustration-graphics
            .sp-illustration-package-slice--step-03
            .sp-title,
          .sp-section--illustration-graphics
            .sp-illustration-package-slice--step-03
            .sp-desc,
          .sp-section--illustration-graphics
            .sp-illustration-package-slice--step-05
            .sp-title,
          .sp-section--illustration-graphics
            .sp-illustration-package-slice--step-05
            .sp-desc {
            color: #152228;
          }
          .sp-section--illustration-graphics
            .sp-illustration-package-slice--step-03
            .sp-desc,
          .sp-section--illustration-graphics
            .sp-illustration-package-slice--step-05
            .sp-desc {
            color: #2a3840;
          }
          .sp-section--illustration-graphics
            .sp-illustration-package-slice--step-03
            .sp-illustration-package-slice-copy::before,
          .sp-section--illustration-graphics
            .sp-illustration-package-slice--step-05
            .sp-illustration-package-slice-copy::before {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.58) 0%,
              rgba(255, 255, 255, 0.34) 58%,
              rgba(255, 255, 255, 0.1) 82%,
              transparent 100%
            );
            border-color: rgba(255, 255, 255, 0.5);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          }

          /* Video / eBook / audiobook — bands 01–04 dark (light type), 05 light (dark type) */
          .sp-section--video-book-trailer
            .sp-illustration-package-slice--step-01
            .sp-title,
          .sp-section--video-book-trailer
            .sp-illustration-package-slice--step-02
            .sp-title,
          .sp-section--video-book-trailer
            .sp-illustration-package-slice--step-03
            .sp-title,
          .sp-section--video-book-trailer
            .sp-illustration-package-slice--step-04
            .sp-title,
          .sp-section--ebook-publishing
            .sp-illustration-package-slice--step-01
            .sp-title,
          .sp-section--ebook-publishing
            .sp-illustration-package-slice--step-02
            .sp-title,
          .sp-section--ebook-publishing
            .sp-illustration-package-slice--step-03
            .sp-title,
          .sp-section--ebook-publishing
            .sp-illustration-package-slice--step-04
            .sp-title,
          .sp-section--audiobook-publishing
            .sp-illustration-package-slice--step-01
            .sp-title,
          .sp-section--audiobook-publishing
            .sp-illustration-package-slice--step-02
            .sp-title,
          .sp-section--audiobook-publishing
            .sp-illustration-package-slice--step-03
            .sp-title,
          .sp-section--audiobook-publishing
            .sp-illustration-package-slice--step-04
            .sp-title {
            color: #fffef9;
          }
          .sp-section--video-book-trailer
            .sp-illustration-package-slice--step-01
            .sp-desc,
          .sp-section--video-book-trailer
            .sp-illustration-package-slice--step-02
            .sp-desc,
          .sp-section--video-book-trailer
            .sp-illustration-package-slice--step-03
            .sp-desc,
          .sp-section--video-book-trailer
            .sp-illustration-package-slice--step-04
            .sp-desc,
          .sp-section--ebook-publishing
            .sp-illustration-package-slice--step-01
            .sp-desc,
          .sp-section--ebook-publishing
            .sp-illustration-package-slice--step-02
            .sp-desc,
          .sp-section--ebook-publishing
            .sp-illustration-package-slice--step-03
            .sp-desc,
          .sp-section--ebook-publishing
            .sp-illustration-package-slice--step-04
            .sp-desc,
          .sp-section--audiobook-publishing
            .sp-illustration-package-slice--step-01
            .sp-desc,
          .sp-section--audiobook-publishing
            .sp-illustration-package-slice--step-02
            .sp-desc,
          .sp-section--audiobook-publishing
            .sp-illustration-package-slice--step-03
            .sp-desc,
          .sp-section--audiobook-publishing
            .sp-illustration-package-slice--step-04
            .sp-desc {
            color: rgba(255, 255, 255, 0.9);
          }
          .sp-section--video-book-trailer
            .sp-illustration-package-slice--step-01
            .sp-illustration-package-slice-copy::before,
          .sp-section--video-book-trailer
            .sp-illustration-package-slice--step-02
            .sp-illustration-package-slice-copy::before,
          .sp-section--video-book-trailer
            .sp-illustration-package-slice--step-03
            .sp-illustration-package-slice-copy::before,
          .sp-section--video-book-trailer
            .sp-illustration-package-slice--step-04
            .sp-illustration-package-slice-copy::before,
          .sp-section--ebook-publishing
            .sp-illustration-package-slice--step-01
            .sp-illustration-package-slice-copy::before,
          .sp-section--ebook-publishing
            .sp-illustration-package-slice--step-02
            .sp-illustration-package-slice-copy::before,
          .sp-section--ebook-publishing
            .sp-illustration-package-slice--step-03
            .sp-illustration-package-slice-copy::before,
          .sp-section--ebook-publishing
            .sp-illustration-package-slice--step-04
            .sp-illustration-package-slice-copy::before,
          .sp-section--audiobook-publishing
            .sp-illustration-package-slice--step-01
            .sp-illustration-package-slice-copy::before,
          .sp-section--audiobook-publishing
            .sp-illustration-package-slice--step-02
            .sp-illustration-package-slice-copy::before,
          .sp-section--audiobook-publishing
            .sp-illustration-package-slice--step-03
            .sp-illustration-package-slice-copy::before,
          .sp-section--audiobook-publishing
            .sp-illustration-package-slice--step-04
            .sp-illustration-package-slice-copy::before {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.22) 0%,
              rgba(255, 255, 255, 0.12) 58%,
              rgba(255, 255, 255, 0.04) 82%,
              transparent 100%
            );
            backdrop-filter: blur(11px) saturate(1.08);
            -webkit-backdrop-filter: blur(11px) saturate(1.08);
            border: 1px solid rgba(255, 255, 255, 0.28);
            border-left: none;
            border-right: none;
            box-shadow: 0 1px 8px rgba(0, 0, 0, 0.14);
            -webkit-mask-image: linear-gradient(
              to right,
              #000 0%,
              #000 52%,
              rgba(0, 0, 0, 0.75) 72%,
              rgba(0, 0, 0, 0.35) 88%,
              transparent 100%
            );
            mask-image: linear-gradient(
              to right,
              #000 0%,
              #000 52%,
              rgba(0, 0, 0, 0.75) 72%,
              rgba(0, 0, 0, 0.35) 88%,
              transparent 100%
            );
          }
          .sp-section--video-book-trailer
            .sp-illustration-package-slice--step-05
            .sp-title,
          .sp-section--ebook-publishing
            .sp-illustration-package-slice--step-05
            .sp-title,
          .sp-section--audiobook-publishing
            .sp-illustration-package-slice--step-05
            .sp-title {
            color: #2a2218;
          }
          .sp-section--video-book-trailer
            .sp-illustration-package-slice--step-05
            .sp-desc,
          .sp-section--ebook-publishing
            .sp-illustration-package-slice--step-05
            .sp-desc,
          .sp-section--audiobook-publishing
            .sp-illustration-package-slice--step-05
            .sp-desc {
            color: #453a30;
          }
          .sp-section--video-book-trailer
            .sp-illustration-package-slice--step-05
            .sp-illustration-package-slice-copy::before,
          .sp-section--ebook-publishing
            .sp-illustration-package-slice--step-05
            .sp-illustration-package-slice-copy::before,
          .sp-section--audiobook-publishing
            .sp-illustration-package-slice--step-05
            .sp-illustration-package-slice-copy::before {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.58) 0%,
              rgba(255, 255, 255, 0.34) 58%,
              rgba(255, 255, 255, 0.1) 82%,
              transparent 100%
            );
            backdrop-filter: blur(11px) saturate(1.08);
            -webkit-backdrop-filter: blur(11px) saturate(1.08);
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-left: none;
            border-right: none;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            -webkit-mask-image: linear-gradient(
              to right,
              #000 0%,
              #000 52%,
              rgba(0, 0, 0, 0.75) 72%,
              rgba(0, 0, 0, 0.35) 88%,
              transparent 100%
            );
            mask-image: linear-gradient(
              to right,
              #000 0%,
              #000 52%,
              rgba(0, 0, 0, 0.75) 72%,
              rgba(0, 0, 0, 0.35) 88%,
              transparent 100%
            );
          }

          /* Author website — per-band glass + type (matched to photo strips) */
          .sp-section--author-website
            .sp-illustration-package-slice--step-01
            .sp-title,
          .sp-section--author-website
            .sp-illustration-package-slice--step-01
            .sp-desc {
            color: #1a2428;
            text-shadow: none;
          }
          .sp-section--author-website
            .sp-illustration-package-slice--step-01
            .sp-desc {
            color: #2e3a42;
          }
          .sp-section--author-website
            .sp-illustration-package-slice--step-01
            .sp-illustration-package-slice-copy::before {
            background: linear-gradient(
              90deg,
              rgba(255, 250, 242, 0.84) 0%,
              rgba(255, 246, 236, 0.58) 58%,
              rgba(255, 242, 230, 0.16) 82%,
              transparent 100%
            );
            backdrop-filter: blur(12px) saturate(1.05);
            -webkit-backdrop-filter: blur(12px) saturate(1.05);
            border: 1px solid rgba(255, 255, 255, 0.62);
            border-left: none;
            border-right: none;
            box-shadow: 0 2px 10px rgba(42, 32, 22, 0.1);
            -webkit-mask-image: linear-gradient(
              to right,
              #000 0%,
              #000 52%,
              rgba(0, 0, 0, 0.75) 72%,
              rgba(0, 0, 0, 0.35) 88%,
              transparent 100%
            );
            mask-image: linear-gradient(
              to right,
              #000 0%,
              #000 52%,
              rgba(0, 0, 0, 0.75) 72%,
              rgba(0, 0, 0, 0.35) 88%,
              transparent 100%
            );
          }
          .sp-section--author-website
            .sp-illustration-package-slice--step-02
            .sp-title,
          .sp-section--author-website
            .sp-illustration-package-slice--step-02
            .sp-desc {
            color: #f8f6f2;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
          }
          .sp-section--author-website
            .sp-illustration-package-slice--step-02
            .sp-desc {
            color: rgba(248, 246, 242, 0.92);
          }
          .sp-section--author-website
            .sp-illustration-package-slice--step-02
            .sp-illustration-package-slice-copy {
            display: inline-table;
            width: auto;
            max-width: min(82%, calc(100% - 10px));
          }
          .sp-section--author-website
            .sp-illustration-package-slice--step-02
            .sp-illustration-package-slice-copy::before {
            background: linear-gradient(
              90deg,
              rgba(22, 32, 42, 0.82) 0%,
              rgba(22, 32, 42, 0.56) 58%,
              rgba(22, 32, 42, 0.14) 82%,
              transparent 100%
            );
            backdrop-filter: blur(12px) saturate(1.1);
            -webkit-backdrop-filter: blur(12px) saturate(1.1);
            border: 1px solid rgba(255, 255, 255, 0.16);
            border-left: none;
            border-right: none;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.22);
            -webkit-mask-image: linear-gradient(
              to right,
              #000 0%,
              #000 52%,
              rgba(0, 0, 0, 0.75) 72%,
              rgba(0, 0, 0, 0.35) 88%,
              transparent 100%
            );
            mask-image: linear-gradient(
              to right,
              #000 0%,
              #000 52%,
              rgba(0, 0, 0, 0.75) 72%,
              rgba(0, 0, 0, 0.35) 88%,
              transparent 100%
            );
          }
          .sp-section--author-website
            .sp-illustration-package-slice--step-03
            .sp-title,
          .sp-section--author-website
            .sp-illustration-package-slice--step-03
            .sp-desc {
            color: #fffef9;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
          }
          .sp-section--author-website
            .sp-illustration-package-slice--step-03
            .sp-desc {
            color: rgba(255, 254, 249, 0.92);
          }
          .sp-section--author-website
            .sp-illustration-package-slice--step-03
            .sp-illustration-package-slice-copy::before {
            background: linear-gradient(
              90deg,
              rgba(10, 18, 28, 0.86) 0%,
              rgba(10, 18, 28, 0.58) 58%,
              rgba(10, 18, 28, 0.12) 82%,
              transparent 100%
            );
            backdrop-filter: blur(12px) saturate(1.12);
            -webkit-backdrop-filter: blur(12px) saturate(1.12);
            border: 1px solid rgba(255, 255, 255, 0.14);
            border-left: none;
            border-right: none;
            box-shadow: 0 2px 14px rgba(0, 0, 0, 0.28);
            -webkit-mask-image: linear-gradient(
              to right,
              #000 0%,
              #000 52%,
              rgba(0, 0, 0, 0.75) 72%,
              rgba(0, 0, 0, 0.35) 88%,
              transparent 100%
            );
            mask-image: linear-gradient(
              to right,
              #000 0%,
              #000 52%,
              rgba(0, 0, 0, 0.75) 72%,
              rgba(0, 0, 0, 0.35) 88%,
              transparent 100%
            );
          }
          .sp-section--author-website
            .sp-illustration-package-slice--step-04
            .sp-title,
          .sp-section--author-website
            .sp-illustration-package-slice--step-04
            .sp-desc {
            color: #121820;
            text-shadow: none;
          }
          .sp-section--author-website
            .sp-illustration-package-slice--step-04
            .sp-desc {
            color: #2a3540;
          }
          .sp-section--author-website
            .sp-illustration-package-slice--step-04
            .sp-illustration-package-slice-copy::before {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.88) 0%,
              rgba(255, 255, 255, 0.62) 58%,
              rgba(255, 255, 255, 0.18) 82%,
              transparent 100%
            );
            backdrop-filter: blur(12px) saturate(1.04);
            -webkit-backdrop-filter: blur(12px) saturate(1.04);
            border: 1px solid rgba(255, 255, 255, 0.72);
            border-left: none;
            border-right: none;
            box-shadow: 0 2px 10px rgba(18, 24, 32, 0.12);
            -webkit-mask-image: linear-gradient(
              to right,
              #000 0%,
              #000 52%,
              rgba(0, 0, 0, 0.75) 72%,
              rgba(0, 0, 0, 0.35) 88%,
              transparent 100%
            );
            mask-image: linear-gradient(
              to right,
              #000 0%,
              #000 52%,
              rgba(0, 0, 0, 0.75) 72%,
              rgba(0, 0, 0, 0.35) 88%,
              transparent 100%
            );
          }
          .sp-section--author-website
            .sp-illustration-package-slice--step-05
            .sp-title,
          .sp-section--author-website
            .sp-illustration-package-slice--step-05
            .sp-desc {
            color: #fffef9;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
          }
          .sp-section--author-website
            .sp-illustration-package-slice--step-05
            .sp-desc {
            color: rgba(255, 254, 249, 0.9);
          }
          .sp-section--author-website
            .sp-illustration-package-slice--step-05
            .sp-illustration-package-slice-copy::before {
            background: linear-gradient(
              90deg,
              rgba(18, 26, 36, 0.8) 0%,
              rgba(18, 26, 36, 0.52) 58%,
              rgba(18, 26, 36, 0.1) 82%,
              transparent 100%
            );
            backdrop-filter: blur(12px) saturate(1.08);
            -webkit-backdrop-filter: blur(12px) saturate(1.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-left: none;
            border-right: none;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.24);
            -webkit-mask-image: linear-gradient(
              to right,
              #000 0%,
              #000 52%,
              rgba(0, 0, 0, 0.75) 72%,
              rgba(0, 0, 0, 0.35) 88%,
              transparent 100%
            );
            mask-image: linear-gradient(
              to right,
              #000 0%,
              #000 52%,
              rgba(0, 0, 0, 0.75) 72%,
              rgba(0, 0, 0, 0.35) 88%,
              transparent 100%
            );
          }

          .sp-interior-mobile-steps {
            flex: 1 1 50%;
            min-width: 0;
            width: 50%;
            padding-left: 10px;
            padding-right: 4px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            overflow: visible;
          }
          .sp-interior-mobile-step {
            margin-bottom: 14px;
          }
          .sp-interior-mobile-step:last-child {
            margin-bottom: 0;
          }
          .sp-interior-mobile-step .sp-number {
            font-size: 32px;
            line-height: 1;
            text-align: left;
            margin: 0 0 4px;
          }
          .sp-interior-mobile-step .sp-title {
            font-size: clamp(16px, 4.4vw, 18px);
            line-height: 1.22;
            text-align: left;
            margin: 0 0 6px;
            white-space: normal;
          }
          .sp-interior-mobile-step .sp-desc {
            font-size: 13px;
            line-height: 1.45;
            font-weight: 500;
            text-align: left;
            margin: 0;
            color: #444444;
            overflow-wrap: break-word;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            min-height: calc(1.45em * 2);
            max-height: calc(1.45em * 2);
          }
          .sp-interior-mobile-step .sp-desc--three-lines {
            -webkit-line-clamp: 3;
            min-height: calc(1.45em * 3);
            max-height: calc(1.45em * 3);
          }
          .sp-interior-mobile-media {
            flex: 1 1 50%;
            width: 50%;
            min-width: 0;
            line-height: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: visible;
            align-self: center;
          }
          .sp-interior-mobile-media img {
            width: 100%;
            height: auto;
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            object-position: center center;
            border-radius: 10px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
            display: block;
            align-self: center;
            transform: translateY(-10px);
          }

          /* Author branding — mobile: fixed-width steps, then full-width HERO-S7 */
          .sp-section--author-branding {
            overflow-x: clip;
          }
          .sp-section--author-branding .sp-steps {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            overflow: visible;
          }
          .sp-author-branding-mobile-bundle {
            display: none;
          }
          .sp-section--author-branding .sp-author-branding-mobile-bundle {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
            width: 100%;
            max-width: 100%;
            margin: 0;
            box-sizing: border-box;
          }
          .sp-section--author-branding .sp-alternating-desktop-steps {
            display: none;
          }
          .sp-author-branding-mobile-steps {
            width: 100%;
            max-width: min(360px, 100%);
            flex: 0 0 auto;
            padding: 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            overflow: visible;
          }
          .sp-author-branding-mobile-step {
            margin-bottom: 14px;
          }
          .sp-author-branding-mobile-step:last-child {
            margin-bottom: 0;
          }
          .sp-author-branding-mobile-step .sp-number {
            font-size: 32px;
            line-height: 1;
            text-align: left;
            margin: 0 0 4px;
          }
          .sp-author-branding-mobile-step .sp-title {
            font-size: clamp(16px, 4.4vw, 18px);
            line-height: 1.22;
            text-align: left;
            margin: 0 0 6px;
            white-space: normal;
          }
          .sp-author-branding-mobile-step .sp-desc {
            font-size: 13px;
            line-height: 1.45;
            font-weight: 500;
            text-align: left;
            margin: 0;
            color: #444444;
            overflow-wrap: break-word;
            white-space: normal;
          }
          .sp-author-branding-mobile-media {
            width: 100%;
            line-height: 0;
            flex: 0 0 auto;
            display: flex;
            justify-content: center;
          }
          .sp-author-branding-mobile-media img {
            width: 100%;
            max-width: 280px;
            height: auto;
            display: block;
            object-fit: contain;
            object-position: center center;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          }

          /* Book marketing — mobile: stacked steps + aligned gallery */
          .sp-section--book-marketing {
            overflow-x: clip;
          }
          .sp-section--book-marketing .sp-steps {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            overflow: visible;
          }
          .sp-book-marketing-mobile-bundle {
            display: none;
          }
          .sp-section--book-marketing .sp-book-marketing-mobile-bundle {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            width: 100%;
            max-width: 100%;
            margin: 0;
            box-sizing: border-box;
          }
          .sp-section--book-marketing .sp-alternating-desktop-steps {
            display: none;
          }
          .sp-book-marketing-mobile-steps {
            width: 100%;
            max-width: 100%;
            padding: 2px 0 0;
            display: flex;
            flex-direction: column;
            gap: 0;
          }
          .sp-book-marketing-mobile-step {
            padding: 20px 0;
            margin: 0;
            border-bottom: 1px solid rgba(232, 213, 163, 0.55);
            text-align: left;
          }
          .sp-book-marketing-mobile-step:first-child {
            padding-top: 0;
          }
          .sp-book-marketing-mobile-step:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
          .sp-book-marketing-mobile-step .sp-number {
            font-family: var(--font-playfair), serif;
            font-weight: 700;
            font-size: 44px;
            line-height: 1;
            color: #e8d5a3;
            margin: 0 0 8px;
            text-align: left;
          }
          .sp-book-marketing-mobile-step .sp-title {
            font-family: var(--font-playfair), serif;
            font-weight: 700;
            font-size: clamp(17px, 4.6vw, 19px);
            line-height: 1.26;
            color: #1c1c1c;
            margin: 0 0 8px;
            text-align: left;
            white-space: normal;
          }
          .sp-book-marketing-mobile-step .sp-desc {
            font-family: var(--font-inter), sans-serif;
            font-size: 14px;
            line-height: 1.55;
            font-weight: 500;
            text-align: left;
            margin: 0;
            color: #555555;
            overflow-wrap: break-word;
            white-space: normal;
          }
          .sp-book-marketing-mobile-gallery {
            width: 100%;
            max-width: 100%;
            margin-top: 32px;
            padding-top: 28px;
            border-top: 1px solid rgba(232, 213, 163, 0.65);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          .sp-book-marketing-mobile-gallery-label {
            width: 100%;
            font-family: var(--font-inter), sans-serif;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #6b7c3a;
            text-align: center;
            margin: 0 0 4px;
          }
          .sp-book-marketing-mobile-gallery-item {
            width: 100%;
            display: flex;
            justify-content: center;
            line-height: 0;
          }
          .sp-book-marketing-mobile-gallery-item img {
            width: auto;
            max-width: 100%;
            height: auto;
            display: block;
            object-fit: contain;
            object-position: center center;
            border-radius: 12px;
            box-shadow: 0 8px 22px rgba(0, 0, 0, 0.09);
          }

        }
        @media (min-width: 769px) {
          .sp-interior-mobile-bundle,
          .sp-illustration-package-mobile,
          .sp-author-branding-mobile-bundle,
          .sp-book-marketing-mobile-bundle,
          .sp-author-website-mobile-bundle {
            display: none !important;
          }
          .sp-section--author-website .sp-alternating-desktop-steps,
          .sp-section--illustration-graphics .sp-alternating-desktop-steps,
          .sp-section--video-book-trailer .sp-alternating-desktop-steps {
            display: block;
          }
        }
      ` }} />

      <div className="sp-inner">
        <p className="sp-label sp-reveal" data-delay="0">
          THE PROCESS
        </p>
        <h2 className="sp-headline sp-reveal" data-delay="80">
          <span className="block">How we bring your</span>
          <span className="sp-headline-italic">project to life.</span>
        </h2>

        <div className="sp-steps">
          {usesIllustrationPackageMobile ? (
            <div
              className="sp-illustration-package-mobile sp-reveal"
              data-delay="120"
              aria-label={
                isEbookPublishing
                  ? "eBook publishing process overview"
                  : isAudiobookPublishing
                    ? "Audiobook publishing process overview"
                    : "Illustration process overview"
              }
            >
              <div className="sp-illustration-package-stack">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="sp-illustration-package-stack-img"
                  src={compactProcessPortraitSrc}
                  alt=""
                  width={compactProcessPortrait?.width ?? 1081}
                  height={compactProcessPortrait?.height ?? 1920}
                  loading="lazy"
                  decoding="async"
                />
                {service.process.map((step) => (
                    <article
                      key={step.number}
                      className={`sp-illustration-package-slice sp-illustration-package-slice--step-${step.number}`}
                      aria-label={`Step ${step.number}: ${step.title}`}
                    >
                      <div className="sp-illustration-package-slice-copy">
                        <h3 className="sp-title">{step.title}</h3>
                        <p className="sp-desc">{step.description}</p>
                      </div>
                    </article>
                ))}
              </div>
            </div>
          ) : null}

          {isInteriorLayout && compactProcessPortraitSrc ? (
            <div className="sp-interior-mobile-bundle sp-reveal" data-delay="120">
              <div className="sp-interior-mobile-steps">
                {service.process.map((step) => (
                  <article
                    key={step.number}
                    className="sp-interior-mobile-step"
                  >
                    <p className="sp-number">{step.number}</p>
                    <h3 className="sp-title">{step.title}</h3>
                    <p
                      className={`sp-desc${compactDescExtraLinesClass(step.number)}`}
                    >
                      {step.description}
                    </p>
                  </article>
                ))}
              </div>
              <div className="sp-interior-mobile-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={compactProcessPortraitSrc}
                  alt=""
                  width={compactProcessPortrait?.width ?? 400}
                  height={compactProcessPortrait?.height ?? 520}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ) : null}

          {isAuthorBranding ? (
            <div
              className="sp-author-branding-mobile-bundle sp-reveal"
              data-delay="120"
              aria-label="Author branding process steps"
            >
              <div className="sp-author-branding-mobile-steps">
                {service.process.map((step) => (
                  <article
                    key={step.number}
                    className="sp-author-branding-mobile-step"
                  >
                    <p className="sp-number">{step.number}</p>
                    <h3 className="sp-title">{step.title}</h3>
                    <p className="sp-desc">{step.description}</p>
                  </article>
                ))}
              </div>
              <div className="sp-author-branding-mobile-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={authorBrandingMobileProcessSrc}
                  alt=""
                  width={authorBrandingMobileProcessDims?.width ?? 280}
                  height={authorBrandingMobileProcessDims?.height ?? 360}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ) : null}

          {usesSplitProcessMobile ? (
            <div
              className="sp-author-website-mobile-bundle sp-reveal"
              data-delay="120"
              aria-label={
                isVideoBookTrailer
                  ? "Video book trailer process steps"
                  : isIllustrationGraphics
                    ? "Illustration process steps"
                    : "Author website process steps"
              }
            >
              {service.process.map((step, index) => {
                const { width, height } = getImageDimensions(step.image);
                return (
                  <article
                    key={step.number}
                    className="sp-author-website-mobile-step sp-reveal"
                    data-delay={120 + index * 80}
                    aria-label={`Step ${step.number}: ${step.title}`}
                  >
                    <div className="sp-author-website-mobile-step-media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={step.image}
                        alt={step.title}
                        width={width}
                        height={height}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="sp-author-website-mobile-step-copy">
                      <p className="sp-number">{step.number}</p>
                      <h3 className="sp-title">{step.title}</h3>
                      <p className="sp-desc">{step.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : null}

          {isBookMarketing ? (
            <div
              className="sp-book-marketing-mobile-bundle sp-reveal"
              data-delay="120"
              aria-label="Book marketing process steps"
            >
              <div className="sp-book-marketing-mobile-steps">
                {service.process.map((step) => (
                  <article
                    key={step.number}
                    className="sp-book-marketing-mobile-step"
                  >
                    <p className="sp-number">{step.number}</p>
                    <h3 className="sp-title">{step.title}</h3>
                    <p className="sp-desc">{step.description}</p>
                  </article>
                ))}
              </div>
              <div className="sp-book-marketing-mobile-gallery">
                <p className="sp-book-marketing-mobile-gallery-label">
                  Visual highlights
                </p>
                {bookMarketingMobileProcessImages.map((item) => {
                  const { width, height } = getImageDimensions(item.src);
                  return (
                    <div
                      key={item.src}
                      className="sp-book-marketing-mobile-gallery-item"
                      style={{ maxWidth: `${item.maxWidth}px` }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src}
                        alt=""
                        width={width}
                        height={height}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div
            className={
              isInteriorLayout ||
              isIllustrationGraphics ||
              isVideoBookTrailer ||
              isEbookPublishing ||
              isAudiobookPublishing ||
              isAuthorBranding ||
              isBookMarketing ||
              isAuthorWebsite
                ? "sp-alternating-desktop-steps"
                : undefined
            }
          >
          {service.process.map((step, index) => {
            // Odd steps (0,2,4): image left — Even: content left (image right)
            const imageLeft = index % 2 === 0;
            const { width, height } = getImageDimensions(step.image);
            const isPortrait = height > width;
            const image = (
              <div className="sp-col">
                <img
                  src={step.image}
                  alt={step.title}
                  className={`sp-img${isPortrait ? " sp-img--portrait" : " sp-img--landscape"}`}
                  width={width}
                  height={height}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            );
            const { line1, line2 } = splitProcessTitle(step.title);
            const content = (
              <div className="sp-col sp-col-content">
                <p className="sp-number">{step.number}</p>
                <h3 className="sp-title">
                  <span className="sp-title-line">{line1}</span>
                  {line2 ? (
                    <span className="sp-title-line">{line2}</span>
                  ) : null}
                </h3>
                <p className="sp-desc">{step.description}</p>
              </div>
            );

            return (
              <div key={step.number}>
                <div
                  className={`sp-row sp-reveal ${imageLeft ? "" : "sp-row-reverse"}`}
                  data-delay={index * 100}
                >
                  {image}
                  {content}
                </div>
                {index < service.process.length - 1 && (
                  <div className="sp-connector" aria-hidden="true" />
                )}
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
