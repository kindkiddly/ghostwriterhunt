"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { IMAGE_DIMENSIONS } from "../data/imageDimensions";

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
  titleStyle = "default",
  illustrationBg = null,
  naturalMobileHeight = false,
}) {
  const isIllustration =
    titleStyle === "illustration" &&
    illustrationBg?.desktop &&
    illustrationBg?.mobile;
  const isHomeGlass =
    titleStyle === "home-glass" &&
    illustrationBg?.desktop &&
    illustrationBg?.mobile;
  const isPlain = titleStyle === "plain";
  const isMobileScene =
    titleStyle === "mobile-scene" && illustrationBg?.mobile;
  const isServiceBakedFull =
    isMobileScene && illustrationBg?.desktop;
  const bakedSceneDims =
    isServiceBakedFull && illustrationBg?.desktop
      ? IMAGE_DIMENSIONS[illustrationBg.desktop]
      : null;
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

    const isMobileViewport =
      typeof window !== "undefined" && window.innerWidth <= 768;
    const isDefaultStrip =
      titleStyle !== "home-glass" &&
      titleStyle !== "illustration" &&
      titleStyle !== "plain" &&
      !(titleStyle === "mobile-scene" && isMobileViewport);
    const usesMobileHeadlineSplit = isDefaultStrip || titleStyle === "plain";

    measureH1.style.width = `${h1.clientWidth}px`;

    if (titleStyle === "mobile-scene" && illustrationBg?.desktop) {
      setHeadlineSplit({
        useThreeRow: false,
        top: line1,
        center: null,
        bottom: line2,
      });
      return;
    }

    if (isMobileViewport && titleStyle === "mobile-scene") {
      setHeadlineSplit({
        useThreeRow: false,
        top: line1,
        center: null,
        bottom: line2,
      });
      return;
    }

    if (isMobileViewport && usesMobileHeadlineSplit) {
      const line1Lines = measureBlockLines(measureBlock1, line1);

      if (line1Lines.length <= 1) {
        setHeadlineSplit({
          useThreeRow: false,
          top: line1,
          center: null,
          bottom: line2,
        });
        return;
      }

      setHeadlineSplit({
        useThreeRow: true,
        top: line1Lines[0],
        center: line1Lines.slice(1).join(" "),
        bottom: line2,
      });
      return;
    }

    setHeadlineSplit(
      splitHeadlineByWrap(measureBlock1, measureBlock2, line1, line2)
    );
  }, [line1, line2, titleStyle]);

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

        .gwh-hero-title-glass-mount {
          position: relative;
          z-index: 2;
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

        /* Gold line — no blur glow here; mobile strip + desktop rules below */
        .gwh-hero-title-frame .gwh-hero-h1-line2 {
          text-shadow: none;
        }

        /* Home strip hero typography (not background-H1 image home) */
        .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
          .gwh-hero-title-frame-h1 {
          font-weight: 400;
          font-size: 36px;
          line-height: 1;
          letter-spacing: -0.03em;
          color: var(--color-text);
        }

        .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
          .gwh-hero-h1-line1 {
          font-weight: 400;
          color: var(--color-text);
        }

        .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
          .gwh-hero-h1-line1-center {
          font-weight: 400;
          color: #fffef9;
        }

        .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
          .gwh-hero-h1-line2 {
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

        .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass) {
          text-align: center;
        }

        .gwh-hero-title-frame--home-glass {
          text-align: center;
        }

        .gwh-hero-title-frame--service {
          text-align: left;
        }

        /* Service — plain Playfair title (no background-header strip; home-style flow) */
        .gwh-hero-title-frame--plain {
          padding: 0;
          text-align: left;
        }

        .gwh-hero-title-frame--plain .gwh-hero-title-frame-h1 {
          font-weight: 700;
          font-size: 36px;
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: #1c1c1c;
          margin: 0;
        }

        .gwh-hero-title-frame--plain .gwh-hero-h1-line1,
        .gwh-hero-title-frame--plain .gwh-hero-h1-line1-center {
          display: block;
          font-weight: 700;
          color: #1c1c1c;
          text-shadow: none;
        }

        .gwh-hero-title-frame--plain .gwh-hero-h1-line2 {
          display: block;
          font-weight: 700;
          font-style: italic;
          color: var(--color-accent-gold);
          text-shadow: none;
        }

        .gwh-hero-title-frame--plain .gwh-hero-title-rule--top {
          margin-bottom: 16px;
        }

        .gwh-hero-title-frame--plain .gwh-hero-title-rule--bottom {
          margin-top: 16px;
        }

        @media (min-width: 769px) {
          .gwh-hero-title-frame--plain .gwh-hero-title-frame-h1 {
            font-size: 56px;
            line-height: 1.08;
          }

          .gwh-hero-title-frame--plain .gwh-hero-title-rule {
            margin-left: 0;
            margin-right: auto;
            width: min(340px, 92%);
          }

          /* Desktop — crisp gold italic; tiny stroke only (no front glow) */
          .gwh-hero-title-frame--plain .gwh-hero-h1-line2 {
            text-shadow: none;
          }

          .gwh-hero-title-frame:not(.gwh-hero-title-frame--plain):not(
              .gwh-hero-title-frame--illustration
            ):not(.gwh-hero-title-frame--home-glass)
            .gwh-hero-h1-line2 {
            text-shadow:
              -0.45px 0 0 rgba(28, 28, 28, 0.36),
              0.45px 0 0 rgba(28, 28, 28, 0.36),
              0 -0.45px 0 rgba(28, 28, 28, 0.36),
              0 0.45px 0 rgba(28, 28, 28, 0.36);
          }

          .gwh-hero-title-frame--illustration .gwh-hero-h1-line2 {
            text-shadow:
              -0.45px 0 0 rgba(18, 18, 18, 0.5),
              0.45px 0 0 rgba(18, 18, 18, 0.5),
              0 -0.45px 0 rgba(18, 18, 18, 0.5),
              0 0.45px 0 rgba(18, 18, 18, 0.5);
          }
        }


        /* Tablet+ — backdrop extends to gold rules; home title scales up (not mobile) */
        @media (min-width: 769px) {
          .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
            .gwh-hero-title-frame-h1 {
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

          .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass) {
            text-align: left;
          }

          .gwh-hero-title-frame--home-glass {
            text-align: center;
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

          .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
            .gwh-hero-title-frame-h1 {
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

        }

        @media (max-width: 768px) {
          .gwh-hero-title-frame:not(.gwh-hero-title-frame--home-glass):not(
              .gwh-hero-title-frame--illustration
            ):not(.gwh-hero-title-frame--baked-full) {
            padding: 2px 12px 4px;
            overflow: hidden;
          }

          .gwh-hero-title-frame--illustration {
            padding: 0;
            overflow: visible;
            max-width: 100%;
          }

          /* Home — background-H1 image only; never use service strip / glass-mount */
          .gwh-hero-title-frame--home-glass {
            padding: 0;
            overflow: visible;
          }

          .gwh-hero-title-frame--home-glass .gwh-home-scene-panel {
            aspect-ratio: 8 / 3;
            width: 100%;
            border-radius: 4px;
          }

          .gwh-hero-title-frame--home-glass .gwh-home-scene-picture img {
            object-fit: cover;
            object-position: center center;
            filter: none;
          }

          /* Mobile strip — taller photo area only (title size unchanged) */
          .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
            .gwh-hero-title-copy,
          .gwh-hero-title-frame--service:not(.gwh-hero-title-frame--illustration)
            .gwh-hero-title-copy {
            position: relative;
            display: block;
            overflow: visible;
            padding: 40px 0 44px;
          }

          .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
            .gwh-hero-title-backdrop,
          .gwh-hero-title-frame--service:not(.gwh-hero-title-frame--illustration)
            .gwh-hero-title-backdrop {
            inset: 0;
            left: -14px;
            right: -14px;
            z-index: 0;
            -webkit-mask-image: none;
            mask-image: none;
          }

          .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
            .gwh-hero-title-backdrop-feather,
          .gwh-hero-title-frame--service:not(.gwh-hero-title-frame--illustration)
            .gwh-hero-title-backdrop-feather {
            display: none;
          }

          .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
            .gwh-hero-title-backdrop-scrim,
          .gwh-hero-title-frame--service:not(.gwh-hero-title-frame--illustration)
            .gwh-hero-title-backdrop-scrim {
            display: none;
          }

          .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
            .gwh-hero-title-backdrop-photo,
          .gwh-hero-title-frame--service:not(.gwh-hero-title-frame--illustration)
            .gwh-hero-title-backdrop-photo {
            inset: 0;
            width: 100%;
            height: 100%;
            transform: none;
            object-fit: cover;
            object-position: 50% 42%;
            filter: none;
          }

          .gwh-hero-title-rule--top {
            margin-bottom: 10px;
          }

          .gwh-hero-title-rule--bottom {
            margin-top: 10px;
          }

          /* Service strip + old home strip — not background-H1 home image */
          .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass),
          .gwh-hero-title-frame--service {
            text-align: center;
          }

          .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
            .gwh-hero-title-rule,
          .gwh-hero-title-frame--service .gwh-hero-title-rule {
            margin-left: auto;
            margin-right: auto;
          }

          .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
            .gwh-hero-title-frame-h1,
          .gwh-hero-title-frame--service:not(.gwh-hero-title-frame--illustration)
            .gwh-hero-title-frame-h1 {
            font-size: clamp(24px, 6.8vw, 31px);
            line-height: 1.08;
            letter-spacing: -0.02em;
          }

          /* Mobile — taller backdrop (default home strip + services; not glass/illustration) */
          .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass),
          .gwh-hero-title-frame--service:not(.gwh-hero-title-frame--illustration) {
            overflow: visible;
          }

          /* Mobile strip — line 1 black, line 2 gold italic (2 lines default, max 3) */
          .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
            .gwh-hero-title-glass-mount
            .gwh-hero-h1-line1:not(.gwh-hero-h1-line1-center),
          .gwh-hero-title-frame--service:not(.gwh-hero-title-frame--illustration)
            .gwh-hero-title-glass-mount
            .gwh-hero-h1-line1:not(.gwh-hero-h1-line1-center) {
            display: block;
            font-weight: 700;
            color: #1c1c1c;
          }

          .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
            .gwh-hero-title-glass-mount
            .gwh-hero-h1-line1-center,
          .gwh-hero-title-frame--service:not(.gwh-hero-title-frame--illustration)
            .gwh-hero-title-glass-mount
            .gwh-hero-h1-line1-center {
            display: block;
            font-weight: 700;
            color: #ffffff;
            text-shadow:
              -0.55px 0 0 rgba(0, 0, 0, 0.88),
              0.55px 0 0 rgba(0, 0, 0, 0.88),
              0 -0.55px 0 rgba(0, 0, 0, 0.88),
              0 0.55px 0 rgba(0, 0, 0, 0.88),
              0 1px 3px rgba(0, 0, 0, 0.65),
              0 0 8px rgba(0, 0, 0, 0.4);
          }

          .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
            .gwh-hero-title-glass-mount
            .gwh-hero-h1-line2,
          .gwh-hero-title-frame--service:not(.gwh-hero-title-frame--illustration)
            .gwh-hero-title-glass-mount
            .gwh-hero-h1-line2 {
            display: block;
            font-style: italic;
            color: var(--color-accent-gold);
            text-shadow:
              -0.55px 0 0 rgba(0, 0, 0, 0.92),
              0.55px 0 0 rgba(0, 0, 0, 0.92),
              0 -0.55px 0 rgba(0, 0, 0, 0.92),
              0 0.55px 0 rgba(0, 0, 0, 0.92),
              0 1px 3px rgba(0, 0, 0, 0.78),
              0 0 10px rgba(0, 0, 0, 0.55);
          }

          .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
            .gwh-hero-title-glass-mount
            .gwh-hero-h1-line2 {
            font-weight: 400;
          }

          .gwh-hero-title-frame--service:not(.gwh-hero-title-frame--illustration)
            .gwh-hero-title-glass-mount
            .gwh-hero-h1-line2 {
            font-weight: 700;
          }

          .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
            .gwh-hero-title-glass-mount,
          .gwh-hero-title-frame--service:not(.gwh-hero-title-frame--illustration)
            .gwh-hero-title-glass-mount {
            --gwh-glass-clip: polygon(
              14px 0,
              calc(100% - 14px) 0,
              100% 14px,
              100% calc(100% - 16px),
              calc(100% - 16px) 100%,
              16px 100%,
              0 calc(100% - 14px),
              0 14px
            );
            box-sizing: border-box;
            width: 100%;
            max-width: 100%;
            margin: 0 auto;
            padding: 16px 20px 18px 22px;
            z-index: 2;
            position: relative;
            background: transparent;
            border: none;
            box-shadow: 0 12px 26px rgba(28, 28, 28, 0.18);
            overflow: hidden;
            clip-path: var(--gwh-glass-clip);
            -webkit-clip-path: var(--gwh-glass-clip);
            -webkit-backdrop-filter: blur(48px) saturate(1.02);
            backdrop-filter: blur(48px) saturate(1.02);
            transform: translateZ(0);
          }

          /* Single pane: whitish top half → charcoal (#1c1c1c) bottom half */
          .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
            .gwh-hero-title-glass-mount::before,
          .gwh-hero-title-frame--service:not(.gwh-hero-title-frame--illustration)
            .gwh-hero-title-glass-mount::before {
            content: "";
            position: absolute;
            inset: 0;
            z-index: 0;
            pointer-events: none;
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.62) 0%,
              rgba(255, 255, 255, 0.52) 16%,
              rgba(255, 255, 255, 0.42) 30%,
              rgba(255, 255, 255, 0.32) 42%,
              rgba(255, 255, 255, 0.18) 50%,
              rgba(28, 28, 28, 0.38) 58%,
              rgba(28, 28, 28, 0.58) 68%,
              rgba(28, 28, 28, 0.74) 80%,
              rgba(28, 28, 28, 0.84) 100%
            );
            border: 1px solid rgba(255, 255, 255, 0.45);
            border-bottom-color: rgba(28, 28, 28, 0.35);
            border-radius: 0;
            box-shadow: none;
          }

          .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
            .gwh-hero-title-glass-mount::after,
          .gwh-hero-title-frame--service:not(.gwh-hero-title-frame--illustration)
            .gwh-hero-title-glass-mount::after {
            content: none;
            display: none;
          }

          .gwh-hero-title-frame--home:not(.gwh-hero-title-frame--home-glass)
            .gwh-hero-title-glass-mount
            .gwh-hero-title-frame-h1,
          .gwh-hero-title-frame--service:not(.gwh-hero-title-frame--illustration)
            .gwh-hero-title-glass-mount
            .gwh-hero-title-frame-h1 {
            position: relative;
            z-index: 2;
            font-size: clamp(24px, 6.8vw, 31px) !important;
            line-height: 1.08 !important;
          }

          .gwh-hero-title-frame--illustration .gwh-hero-h1-line2 {
            text-shadow:
              -0.55px 0 0 rgba(28, 28, 28, 0.52),
              0.55px 0 0 rgba(28, 28, 28, 0.52),
              0 -0.55px 0 rgba(28, 28, 28, 0.52),
              0 0.55px 0 rgba(28, 28, 28, 0.52),
              0 0 1.1px rgba(28, 28, 28, 0.4),
              0 0 2.25px rgba(28, 28, 28, 0.24);
          }

        }

        /* Home — background-H1 artwork (headline baked into image; no overlay text) */
        .gwh-hero-title-frame--home-glass {
          padding: 0;
        }

        .gwh-home-scene-panel {
          position: relative;
          width: 100%;
          aspect-ratio: 8 / 3;
          overflow: hidden;
          border-radius: 4px;
          background: #fafaf7;
        }

        .gwh-home-scene-picture {
          display: block;
          width: 100%;
          height: 100%;
        }

        .gwh-home-scene-picture img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
        }

        .gwh-home-scene-sr-title {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Service — baked headline in image (mobile + desktop when both assets) */
        .gwh-hero-title-frame--mobile-scene {
          padding: 0;
        }

        .gwh-hero-title-frame--baked-full .gwh-service-baked-scene-panel {
          position: relative;
          width: 100%;
          aspect-ratio: auto;
          height: auto;
          overflow: hidden;
          border-radius: 4px;
          background: #fafaf7;
        }

        .gwh-hero-title-frame--baked-full .gwh-service-baked-scene-picture {
          display: block;
          width: 100%;
          height: auto;
          line-height: 0;
        }

        .gwh-hero-title-frame--baked-full .gwh-service-baked-scene-picture img {
          width: 100%;
          height: auto;
          max-height: none;
          object-fit: unset;
          object-position: top center;
          display: block;
        }

        .gwh-service-mobile-scene-panel {
          display: none;
        }

        .gwh-service-desktop-headline {
          display: block;
        }

        .gwh-service-mobile-scene-picture {
          display: block;
          width: 100%;
          height: 100%;
        }

        .gwh-service-mobile-scene-picture img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
        }

        @media (max-width: 768px) {
          .gwh-hero-title-frame--mobile-scene {
            padding: 0;
            overflow: visible;
          }

          .gwh-hero-title-frame--mobile-scene:not(.gwh-hero-title-frame--baked-full)
            .gwh-service-mobile-scene-panel {
            display: block;
            position: relative;
            width: 100%;
            aspect-ratio: 8 / 3;
            overflow: hidden;
            border-radius: 4px;
            background: #fafaf7;
          }

          .gwh-hero-title-frame--mobile-scene:not(.gwh-hero-title-frame--baked-full)
            .gwh-service-desktop-headline {
            display: none;
          }

          /* Baked mobile headline — full image height (no 8:3 crop) */
          .gwh-hero-title-frame--mobile-natural
            .gwh-service-mobile-scene-panel {
            aspect-ratio: auto;
            height: auto;
            overflow: hidden;
          }

          .gwh-hero-title-frame--mobile-natural
            .gwh-service-mobile-scene-picture {
            height: auto;
            line-height: 0;
          }

          .gwh-hero-title-frame--mobile-natural
            .gwh-service-mobile-scene-picture
            img {
            width: 100%;
            height: auto;
            max-height: none;
            object-fit: unset;
            object-position: top center;
          }

        }

        /* Children's book — full illustration panel (not background-header strip) */
        .gwh-hero-title-frame--illustration {
          padding: 0;
        }

        .gwh-childrens-panel {
          position: relative;
          width: 100%;
          aspect-ratio: 8 / 3;
          border-radius: 18px;
          overflow: hidden;
          background: #fafaf7;
          box-shadow:
            0 10px 32px rgba(28, 28, 28, 0.08),
            0 0 0 1px rgba(201, 168, 76, 0.22);
        }

        .gwh-childrens-picture {
          display: block;
          width: 100%;
          height: 100%;
        }

        .gwh-childrens-picture img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center center;
          display: block;
        }

        .gwh-childrens-scrim {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to top,
            rgba(28, 28, 28, 0.72) 0%,
            rgba(28, 28, 28, 0.38) 28%,
            rgba(28, 28, 28, 0.08) 52%,
            transparent 68%
          );
        }

        .gwh-childrens-title-wrap {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          padding: 18px 16px 16px;
        }

        .gwh-hero-title-frame--illustration .gwh-hero-title-frame-h1 {
          text-align: center;
        }

        .gwh-hero-title-frame--illustration
          .gwh-hero-h1-line1:not(.gwh-hero-h1-line1-center) {
          color: #fffef9;
          text-shadow:
            0 0 1px rgba(28, 28, 28, 0.75),
            0 0 4px rgba(28, 28, 28, 0.45);
        }

        .gwh-hero-title-frame--illustration .gwh-hero-h1-line1-center {
          color: #fffef9;
        }

        .gwh-hero-title-frame--illustration .gwh-hero-h1-line2 {
          color: #f3df9a;
          text-shadow: none;
        }

        .gwh-hero-title-frame--illustration .gwh-hero-title-rule--bottom {
          margin-top: 14px;
        }

        @media (min-width: 769px) {
          .gwh-childrens-panel {
            border-radius: 22px;
          }

          .gwh-childrens-title-wrap {
            padding: 12px 20px 10px;
          }

          .gwh-childrens-scrim {
            background: linear-gradient(
              to top,
              rgba(28, 28, 28, 0.62) 0%,
              rgba(28, 28, 28, 0.28) 24%,
              rgba(28, 28, 28, 0.06) 46%,
              transparent 58%
            );
          }

          /* Children's page only — smaller overlay type so the face stays visible */
          .gwh-hero-title-frame--illustration .gwh-hero-title-frame-h1 {
            font-size: 34px;
            line-height: 1.06;
          }

          .gwh-hero-title-frame--illustration.gwh-hero-title-frame--service
            .gwh-hero-title-frame-h1 {
            text-align: left;
          }
        }

        @media (min-width: 1024px) {
          .gwh-hero-title-frame--illustration .gwh-hero-title-frame-h1 {
            font-size: 40px;
            line-height: 1.08;
          }
        }

        @media (max-width: 768px) {
          .gwh-childrens-panel {
            border-radius: 16px;
          }

          .gwh-childrens-scrim {
            background: linear-gradient(
              225deg,
              transparent 42%,
              rgba(28, 28, 28, 0.35) 68%,
              rgba(28, 28, 28, 0.72) 100%
            );
          }

          .gwh-childrens-title-wrap {
            left: 0;
            right: 0;
            bottom: 0;
            box-sizing: border-box;
            max-width: 100%;
            width: 100%;
            padding: 10px 16px 12px;
          }

          .gwh-hero-title-frame--illustration .gwh-hero-title-frame-h1 {
            font-size: clamp(20px, 5.4vw, 26px);
            line-height: 1.08;
            text-align: right;
            max-width: 100%;
            overflow-wrap: break-word;
          }

          .gwh-hero-title-frame--illustration .gwh-hero-h1-line1,
          .gwh-hero-title-frame--illustration .gwh-hero-h1-line2 {
            display: block;
            white-space: normal;
            overflow-wrap: break-word;
          }

          .gwh-hero-title-frame--illustration .gwh-hero-h1-line2 {
            font-size: 0.92em;
            text-shadow:
              0 0 1.5px rgba(18, 18, 18, 0.95),
              0 0 4px rgba(18, 18, 18, 0.65),
              0 0 8px rgba(18, 18, 18, 0.35);
          }

          .gwh-hero-title-frame--illustration
            .gwh-hero-h1-line1:not(.gwh-hero-h1-line1-center) {
            text-shadow:
              0 0 1px rgba(28, 28, 28, 0.75),
              0 0 4px rgba(28, 28, 28, 0.45);
          }
        }
      `}</style>

      {isHomeGlass ? (
        <div
          className={`gwh-hero-title-frame gwh-hero-title-frame--${variant} gwh-hero-title-frame--home-glass ${className}`.trim()}
        >
          <div className="gwh-home-scene-panel">
            <picture className="gwh-home-scene-picture">
              <source
                media="(max-width: 768px)"
                srcSet={illustrationBg.mobile}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={illustrationBg.desktop}
                alt=""
                width={1920}
                height={720}
                decoding="async"
                fetchPriority="high"
              />
            </picture>
            <h1 ref={h1Ref} className="gwh-home-scene-sr-title">
              {line1} {line2}
            </h1>
          </div>
        </div>
      ) : isIllustration ? (
        <div
          className={`gwh-hero-title-frame gwh-hero-title-frame--${variant} gwh-hero-title-frame--illustration ${className}`.trim()}
        >
          <div className="gwh-childrens-panel">
            <picture className="gwh-childrens-picture">
              <source
                media="(max-width: 768px)"
                srcSet={illustrationBg.mobile}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={illustrationBg.desktop}
                alt=""
                decoding="async"
                fetchPriority="high"
              />
            </picture>
            <div className="gwh-childrens-scrim" aria-hidden="true" />
            <div className="gwh-childrens-title-wrap">
              <h1 ref={h1Ref} className="gwh-hero-title-frame-h1 font-playfair">
                <span className="gwh-hero-h1-line1">{line1}</span>
                <span className="gwh-hero-h1-line2">{line2}</span>
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
          </div>
          <span
            className="gwh-hero-title-rule gwh-hero-title-rule--bottom"
            aria-hidden="true"
          />
        </div>
      ) : isPlain ? (
        <div
          className={`gwh-hero-title-frame gwh-hero-title-frame--${variant} gwh-hero-title-frame--plain ${className}`.trim()}
        >
          <span
            className="gwh-hero-title-rule gwh-hero-title-rule--top"
            aria-hidden="true"
          />
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
          <span
            className="gwh-hero-title-rule gwh-hero-title-rule--bottom"
            aria-hidden="true"
          />
        </div>
      ) : isMobileScene ? (
        <div
          className={`gwh-hero-title-frame gwh-hero-title-frame--${variant} gwh-hero-title-frame--mobile-scene${isServiceBakedFull ? " gwh-hero-title-frame--baked-full" : ""}${naturalMobileHeight ? " gwh-hero-title-frame--mobile-natural" : ""} ${className}`.trim()}
        >
          {isServiceBakedFull ? (
            <div className="gwh-service-baked-scene-panel">
              <picture className="gwh-service-baked-scene-picture">
                <source
                  media="(max-width: 768px)"
                  srcSet={illustrationBg.mobile}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={illustrationBg.desktop}
                  alt=""
                  width={bakedSceneDims?.width ?? 1920}
                  height={bakedSceneDims?.height ?? 720}
                  decoding="async"
                  fetchPriority="high"
                />
              </picture>
              <h1 ref={h1Ref} className="gwh-home-scene-sr-title">
                {line1} {line2}
              </h1>
            </div>
          ) : (
            <div className="gwh-service-mobile-scene-panel">
              <div className="gwh-service-mobile-scene-picture">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={illustrationBg.mobile}
                  alt=""
                  width={
                    IMAGE_DIMENSIONS[illustrationBg.mobile]?.width ?? 780
                  }
                  height={
                    IMAGE_DIMENSIONS[illustrationBg.mobile]?.height ?? 293
                  }
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
              <h1 className="gwh-home-scene-sr-title">
                {line1} {line2}
              </h1>
            </div>
          )}
          {!isServiceBakedFull && (
          <div className="gwh-service-desktop-headline">
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
              <div
                className="gwh-hero-title-backdrop-feather"
                aria-hidden="true"
              />
              <div className="gwh-hero-title-glass-mount">
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
            </div>
            <span
              className="gwh-hero-title-rule gwh-hero-title-rule--bottom"
              aria-hidden="true"
            />
          </div>
          )}
        </div>
      ) : (
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
            <div className="gwh-hero-title-glass-mount">
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
          </div>
          <span
            className="gwh-hero-title-rule gwh-hero-title-rule--bottom"
            aria-hidden="true"
          />
        </div>
      )}
    </>
  );
}
