"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

/**
 * Shared hero headline frame: background-header backdrop, gold rules, two-line title.
 * Used on home Hero and all service ServiceHero pages.
 */

function measureBlockLines(blockEl, text) {
  const words = (text ?? "").trim().split(/\s+/).filter(Boolean);
  if (!blockEl || words.length === 0) return [];

  blockEl.replaceChildren();
  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.textContent = word + (index < words.length - 1 ? " " : "");
    blockEl.appendChild(span);
  });

  const lineGroups = [];
  let group = [];
  let lastTop = null;

  words.forEach((word, index) => {
    const top = blockEl.children[index].offsetTop;
    if (lastTop !== null && top > lastTop + 1) {
      lineGroups.push(group.join(" "));
      group = [];
    }
    group.push(word);
    lastTop = top;
  });
  if (group.length) lineGroups.push(group.join(" "));

  return lineGroups;
}

function splitHeadlineByWrap(measureBlock1, measureBlock2, line1, line2) {
  if (!measureBlock1 || !measureBlock2) {
    return { useThreeRow: false, top: line1, center: null, bottom: line2 };
  }

  const allLines = [
    ...measureBlockLines(measureBlock1, line1),
    ...measureBlockLines(measureBlock2, line2),
  ];

  if (allLines.length >= 3) {
    return {
      useThreeRow: true,
      top: allLines[0],
      center: allLines.slice(1, -1).join(" "),
      bottom: allLines[allLines.length - 1],
    };
  }

  return { useThreeRow: false, top: line1, center: null, bottom: line2 };
}

export default function HeroTitleFrame({
  line1,
  line2,
  variant = "home",
  className = "",
}) {
  const h1Ref = useRef(null);
  const measureBlock1Ref = useRef(null);
  const measureBlock2Ref = useRef(null);
  const measureH1Ref = useRef(null);
  const [headlineSplit, setHeadlineSplit] = useState({
    useThreeRow: false,
    top: line1,
    center: null,
    bottom: line2,
  });

  const recomputeHeadlineSplit = useCallback(() => {
    const h1 = h1Ref.current;
    const measureBlock1 = measureBlock1Ref.current;
    const measureBlock2 = measureBlock2Ref.current;
    const measureH1 = measureH1Ref.current;
    if (!h1 || !measureBlock1 || !measureBlock2 || !measureH1) {
      setHeadlineSplit({
        useThreeRow: false,
        top: line1,
        center: null,
        bottom: line2,
      });
      return;
    }
    measureH1.style.width = `${h1.clientWidth}px`;
    setHeadlineSplit(
      splitHeadlineByWrap(measureBlock1, measureBlock2, line1, line2)
    );
  }, [line1, line2]);

  useLayoutEffect(() => {
    let cancelled = false;
    const run = () => {
      if (!cancelled) recomputeHeadlineSplit();
    };

    run();
    document.fonts?.ready?.then(run);

    const h1 = h1Ref.current;
    if (!h1) return undefined;

    const observer = new ResizeObserver(run);
    observer.observe(h1);
    window.addEventListener("resize", run);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("resize", run);
    };
  }, [recomputeHeadlineSplit, variant]);

  return (
    <>
      <style>{`
        .gwh-hero-title-frame {
          position: relative;
          width: 100%;
          padding: 8px 18px 12px;
          isolation: isolate;
        }

        .gwh-hero-title-copy {
          position: relative;
        }

        .gwh-hero-title-backdrop {
          position: absolute;
          z-index: 0;
          inset: -20px -52px;
          overflow: hidden;
          pointer-events: none;
          -webkit-mask-image:
            linear-gradient(
              to right,
              transparent 0%,
              #000 14%,
              #000 86%,
              transparent 100%
            ),
            linear-gradient(
              to bottom,
              transparent 0%,
              #000 12%,
              #000 88%,
              transparent 100%
            );
          -webkit-mask-composite: source-in;
          mask-image:
            linear-gradient(
              to right,
              transparent 0%,
              #000 14%,
              #000 86%,
              transparent 100%
            ),
            linear-gradient(
              to bottom,
              transparent 0%,
              #000 12%,
              #000 88%,
              transparent 100%
            );
          mask-composite: intersect;
        }

        .gwh-hero-title-backdrop-photo {
          position: absolute;
          inset: -4%;
          width: 108%;
          height: 108%;
          max-width: none;
          object-fit: cover;
          object-position: 38% 36%;
          transform: scale(1.04);
          filter: blur(3px) saturate(1.12);
        }

        /* Light title contrast — keeps photo vivid */
        .gwh-hero-title-backdrop-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(252, 250, 245, 0.22) 0%,
            rgba(252, 248, 238, 0.04) 24%,
            rgba(252, 248, 238, 0) 38%,
            rgba(252, 248, 238, 0) 48%,
            rgba(8, 6, 4, 0.1) 58%,
            rgba(4, 3, 2, 0.26) 100%
          );
        }

        /* Edge merge via page-color opacity — not heavy blur */
        .gwh-hero-title-backdrop-feather {
          position: absolute;
          inset: -20px -52px;
          z-index: 0;
          pointer-events: none;
          background:
            linear-gradient(
              to right,
              var(--color-background) 0%,
              rgba(250, 250, 247, 0.55) 6%,
              transparent 20%,
              transparent 80%,
              rgba(250, 250, 247, 0.55) 94%,
              var(--color-background) 100%
            ),
            linear-gradient(
              to bottom,
              var(--color-background) 0%,
              rgba(250, 250, 247, 0.5) 5%,
              transparent 18%,
              transparent 82%,
              rgba(250, 250, 247, 0.5) 95%,
              var(--color-background) 100%
            );
        }

        .gwh-hero-title-frame .gwh-hero-title-rule,
        .gwh-hero-title-frame
          .gwh-hero-title-frame-h1:not(.gwh-hero-title-frame-h1-measure) {
          position: relative;
          z-index: 1;
        }

        .gwh-hero-title-rule {
          display: block;
          height: 1px;
          width: min(300px, 78%);
          margin-left: auto;
          margin-right: auto;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(201, 168, 76, 0.5) 20%,
            rgba(201, 168, 76, 0.82) 50%,
            rgba(201, 168, 76, 0.5) 80%,
            transparent 100%
          );
        }

        .gwh-hero-title-rule--top {
          margin-bottom: 16px;
        }

        .gwh-hero-title-rule--bottom {
          margin-top: 16px;
        }

        .gwh-hero-title-frame-h1 {
          margin: 0;
          font-family: var(--font-playfair), "Playfair Display", serif;
        }

        .gwh-hero-h1-line1,
        .gwh-hero-h1-line2 {
          display: block;
          -webkit-font-smoothing: antialiased;
        }

        /* Tight edge lift — minimal blur so type stays grounded on the backdrop */
        .gwh-hero-title-frame .gwh-hero-h1-line1:not(.gwh-hero-h1-line1-center) {
          text-shadow:
            0 0 0.75px rgba(255, 255, 255, 0.58),
            0 0 2.75px rgba(255, 255, 255, 0.22),
            0 0 4.25px rgba(255, 255, 255, 0.09);
        }

        .gwh-hero-title-frame .gwh-hero-h1-line1-center {
          color: #fffef9;
          text-shadow:
            0 0 0.75px rgba(28, 28, 28, 0.58),
            0 0 2.5px rgba(28, 28, 28, 0.24),
            0 0 4px rgba(28, 28, 28, 0.1);
        }

        .gwh-hero-title-frame-h1-measure {
          position: absolute !important;
          left: 0;
          top: 0;
          visibility: hidden;
          pointer-events: none;
          opacity: 0;
          margin: 0;
          padding: 0;
          width: 100%;
          height: auto;
          overflow: visible;
          z-index: -1;
        }

        .gwh-hero-h1-measure-block {
          display: block;
          font: inherit;
          letter-spacing: inherit;
          line-height: inherit;
          font-weight: inherit;
          font-style: inherit;
        }

        .gwh-hero-h1-measure-block--italic {
          font-style: italic;
        }

        .gwh-hero-title-frame .gwh-hero-h1-line2 {
          text-shadow:
            0 0 1.15px rgba(28, 28, 28, 0.74),
            0 0 3.5px rgba(28, 28, 28, 0.36),
            0 0 6px rgba(28, 28, 28, 0.17);
        }

        /* Home hero — matches Hero.js Tailwind h1 (normal line 1, italic accent line 2) */
        .gwh-hero-title-frame--home .gwh-hero-title-frame-h1 {
          font-weight: 400;
          font-size: 36px;
          line-height: 1;
          letter-spacing: -0.03em;
          color: var(--color-text);
        }

        .gwh-hero-title-frame--home .gwh-hero-h1-line1 {
          font-weight: 400;
          color: var(--color-text);
        }

        .gwh-hero-title-frame--home .gwh-hero-h1-line1-center {
          font-weight: 400;
          color: #fffef9;
        }

        .gwh-hero-title-frame--home .gwh-hero-h1-line2 {
          font-weight: 400;
          font-style: italic;
          color: var(--color-accent-gold);
        }

        /* Service hero — matches former .sh-headline / .sh-headline-italic */
        .gwh-hero-title-frame--service .gwh-hero-title-frame-h1 {
          font-weight: 700;
          font-size: 36px;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #1c1c1c;
        }

        .gwh-hero-title-frame--service .gwh-hero-h1-line1 {
          font-weight: 700;
          color: #1c1c1c;
        }

        .gwh-hero-title-frame--service .gwh-hero-h1-line1-center {
          font-weight: 700;
          color: #fffef9;
        }

        .gwh-hero-title-frame--service .gwh-hero-h1-line2 {
          font-weight: 700;
          font-style: italic;
          color: var(--color-accent-gold);
        }

        .gwh-hero-title-frame--home {
          text-align: center;
        }

        .gwh-hero-title-frame--service {
          text-align: left;
        }

        /* Tablet+ — backdrop extends to gold rules; home title scales up (not mobile) */
        @media (min-width: 769px) {
          .gwh-hero-title-frame--home .gwh-hero-title-frame-h1 {
            font-size: 48px;
          }

          .gwh-hero-title-backdrop,
          .gwh-hero-title-backdrop-feather {
            inset: auto;
            top: -37px;
            bottom: -37px;
            left: -52px;
            right: -52px;
          }
        }

        @media (min-width: 1024px) {
          .gwh-hero-title-frame {
            padding: 10px 22px 14px;
          }

          .gwh-hero-title-frame--home {
            text-align: left;
          }

          .gwh-hero-title-backdrop,
          .gwh-hero-title-backdrop-feather {
            top: -41px;
            bottom: -41px;
            left: -56px;
            right: -56px;
          }

          .gwh-hero-title-backdrop-photo {
            object-position: 32% 34%;
            filter: blur(3px) saturate(1.12);
          }

          .gwh-hero-title-rule {
            margin-left: 0;
            margin-right: auto;
            width: min(340px, 92%);
          }

          .gwh-hero-title-frame--home .gwh-hero-title-frame-h1 {
            font-size: 80px;
          }

          .gwh-hero-title-frame--service .gwh-hero-title-frame-h1 {
            font-size: 56px;
          }

          .gwh-hero-title-frame .gwh-hero-h1-line1:not(.gwh-hero-h1-line1-center) {
            text-shadow:
              0 0 0.95px rgba(255, 255, 255, 0.62),
              0 0 3.25px rgba(255, 255, 255, 0.24),
              0 0 5px rgba(255, 255, 255, 0.1);
          }

          .gwh-hero-title-frame .gwh-hero-h1-line1-center {
            text-shadow:
              0 0 0.95px rgba(28, 28, 28, 0.62),
              0 0 3px rgba(28, 28, 28, 0.28),
              0 0 5px rgba(28, 28, 28, 0.12);
          }

          .gwh-hero-title-frame .gwh-hero-h1-line2 {
            text-shadow:
              0 0 1.25px rgba(28, 28, 28, 0.78),
              0 0 4px rgba(28, 28, 28, 0.38),
              0 0 6.5px rgba(28, 28, 28, 0.18);
          }
        }

        @media (max-width: 768px) {
          .gwh-hero-title-frame {
            padding: 2px 12px 4px;
            overflow: hidden;
          }

          /* Photo height = headline only (rules sit on plain page background) */
          .gwh-hero-title-backdrop,
          .gwh-hero-title-backdrop-feather {
            inset: 0 -22px;
            border-radius: 2px;
          }

          .gwh-hero-title-backdrop {
            -webkit-mask-image:
              linear-gradient(
                to right,
                transparent 0%,
                #000 8%,
                #000 92%,
                transparent 100%
              ),
              linear-gradient(
                to bottom,
                transparent 0%,
                #000 10%,
                #000 90%,
                transparent 100%
              );
            mask-image:
              linear-gradient(
                to right,
                transparent 0%,
                #000 8%,
                #000 92%,
                transparent 100%
              ),
              linear-gradient(
                to bottom,
                transparent 0%,
                #000 10%,
                #000 90%,
                transparent 100%
              );
          }

          .gwh-hero-title-backdrop-feather {
            background:
              linear-gradient(
                to right,
                var(--color-background) 0%,
                rgba(250, 250, 247, 0.5) 5%,
                transparent 16%,
                transparent 84%,
                rgba(250, 250, 247, 0.5) 95%,
                var(--color-background) 100%
              ),
              linear-gradient(
                to bottom,
                var(--color-background) 0%,
                rgba(250, 250, 247, 0.45) 8%,
                transparent 22%,
                transparent 78%,
                rgba(250, 250, 247, 0.45) 92%,
                var(--color-background) 100%
              );
          }

          /* Mobile only: sharp photo — edge merge via mask/feather/scrim, not blur */
          .gwh-hero-title-backdrop-photo {
            inset: auto;
            top: -8%;
            left: -4%;
            width: 108%;
            height: 116%;
            transform: none;
            object-position: 50% 18%;
            filter: saturate(1.08);
          }

          .gwh-hero-title-backdrop-scrim {
            background: linear-gradient(
              to bottom,
              rgba(252, 250, 245, 0.32) 0%,
              rgba(252, 248, 238, 0.1) 20%,
              rgba(252, 248, 238, 0) 38%,
              rgba(8, 6, 4, 0.08) 55%,
              rgba(4, 3, 2, 0.2) 78%,
              rgba(4, 3, 2, 0.32) 100%
            );
          }

          .gwh-hero-title-rule--top {
            margin-bottom: 10px;
          }

          .gwh-hero-title-rule--bottom {
            margin-top: 10px;
          }

          /* Home + all service heroes — identical mobile title theme */
          .gwh-hero-title-frame--home,
          .gwh-hero-title-frame--service {
            text-align: center;
          }

          .gwh-hero-title-frame--home .gwh-hero-title-rule,
          .gwh-hero-title-frame--service .gwh-hero-title-rule {
            margin-left: auto;
            margin-right: auto;
          }

          .gwh-hero-title-frame--home .gwh-hero-title-frame-h1,
          .gwh-hero-title-frame--service .gwh-hero-title-frame-h1 {
            font-size: 36px;
            line-height: 1.08;
          }

          .gwh-hero-title-frame .gwh-hero-h1-line1:not(.gwh-hero-h1-line1-center) {
            text-shadow:
              0 0 0.75px rgba(255, 255, 255, 0.62),
              0 0 2.75px rgba(255, 255, 255, 0.26),
              0 0 4.5px rgba(255, 255, 255, 0.11);
          }

          .gwh-hero-title-frame .gwh-hero-h1-line1-center {
            text-shadow:
              0 0 0.85px rgba(28, 28, 28, 0.68),
              0 0 2.75px rgba(28, 28, 28, 0.3),
              0 0 4.75px rgba(28, 28, 28, 0.14);
          }

          .gwh-hero-title-frame .gwh-hero-h1-line2 {
            text-shadow:
              0 0 1.35px rgba(18, 18, 18, 0.95),
              0 0 2.25px rgba(18, 18, 18, 0.88),
              0 0 4px rgba(18, 18, 18, 0.62),
              0 0 7px rgba(18, 18, 18, 0.4),
              0 0 10px rgba(18, 18, 18, 0.22),
              0 1px 2px rgba(12, 12, 12, 0.35);
          }
        }
      `}</style>

      <div
        className={`gwh-hero-title-frame gwh-hero-title-frame--${variant} ${className}`.trim()}
      >
        <span
          className="gwh-hero-title-rule gwh-hero-title-rule--top"
          aria-hidden="true"
        />
        <div className="gwh-hero-title-copy">
          <div className="gwh-hero-title-backdrop" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/background-header.webp"
              alt=""
              className="gwh-hero-title-backdrop-photo"
              decoding="async"
              fetchPriority="low"
            />
            <div className="gwh-hero-title-backdrop-scrim" />
          </div>
          <div className="gwh-hero-title-backdrop-feather" aria-hidden="true" />
          <h1 ref={h1Ref} className="gwh-hero-title-frame-h1 font-playfair">
          {headlineSplit.useThreeRow ? (
            <>
              <span className="gwh-hero-h1-line1">{headlineSplit.top}</span>
              <span className="gwh-hero-h1-line1 gwh-hero-h1-line1-center">
                {headlineSplit.center}
              </span>
              <span className="gwh-hero-h1-line2">{headlineSplit.bottom}</span>
            </>
          ) : (
            <>
              <span className="gwh-hero-h1-line1">{line1}</span>
              <span className="gwh-hero-h1-line2">{line2}</span>
            </>
          )}
          </h1>
          <div
            ref={measureH1Ref}
            className="gwh-hero-title-frame-h1 gwh-hero-title-frame-h1-measure font-playfair"
            aria-hidden="true"
          >
            <div
              ref={measureBlock1Ref}
              className="gwh-hero-h1-measure-block gwh-hero-h1-line1"
            />
            <div
              ref={measureBlock2Ref}
              className="gwh-hero-h1-measure-block gwh-hero-h1-measure-block--italic gwh-hero-h1-line2"
            />
          </div>
        </div>
        <span
          className="gwh-hero-title-rule gwh-hero-title-rule--bottom"
          aria-hidden="true"
        />
      </div>
    </>
  );
}
