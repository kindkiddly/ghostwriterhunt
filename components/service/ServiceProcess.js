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
  const isInteriorLayout = service.slug === "interior-layout";
  const isIllustrationGraphics = service.slug === "illustration-graphics";
  /** Mobile-only alternate layouts; desktop keeps standard alternating rows for both. */
  /**
   * Mobile “5 steps in one portrait” package art + per-band glass text strips.
   * Reuse this pattern on other slugs: add art under public/images/*-package-mobile.webp,
   * map slug → src here, and mirror .sp-illustration-package-* styles for that slug.
   */
  const compactProcessPortraitSrc = isInteriorLayout
    ? "/images/HERO-M03.webp"
    : isIllustrationGraphics
      ? "/images/illustration-package-mobile.webp"
      : null;
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
      className={`sp-section${isGhostwriting ? " sp-section--ghostwriting" : ""}${isManuscriptEditing ? " sp-section--manuscript-editing" : ""}${isInteriorLayout ? " sp-section--interior-layout" : ""}${isIllustrationGraphics ? " sp-section--illustration-graphics" : ""}`}
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

          /* Illustration graphics — mobile: full-width package art, then 5 text blocks */
          .sp-section--illustration-graphics {
            overflow-x: clip;
          }
          .sp-section--illustration-graphics .sp-steps {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            overflow: visible;
          }
          .sp-section--illustration-graphics .sp-alternating-desktop-steps {
            display: none;
          }
          .sp-illustration-package-mobile {
            display: none;
          }
          .sp-section--illustration-graphics .sp-illustration-package-mobile {
            display: block;
            width: 100%;
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
          .sp-illustration-package-slice--step-02
            .sp-illustration-package-slice-copy::before,
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
        }
        @media (min-width: 769px) {
          .sp-interior-mobile-bundle,
          .sp-illustration-package-mobile {
            display: none !important;
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
          {isIllustrationGraphics && compactProcessPortraitSrc ? (
            <div
              className="sp-illustration-package-mobile sp-reveal"
              data-delay="120"
              aria-label="Illustration process overview"
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

          <div
            className={
              isInteriorLayout || isIllustrationGraphics
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
