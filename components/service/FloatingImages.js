"use client";

import { getImageDimensions } from "@/data/imageDimensions";

/**
 * GhostWriterHunt — FloatingImages
 * Reusable floating / mosaic image cluster for service pages.
 * Props: { images, className, slug, eager }
 * size: 'large' | 'medium' | 'small'
 *
 * `eager` is opt-in (2–3 image floating layout only): loads the images
 * immediately and promotes them to their own GPU layer so scroll-reveal
 * animations don't pop. Only the homepage narrative blocks pass it.
 *
 * `slug` is optional and only passed by ServiceHero — it selects the large
 * frame's aspect ratio for that service's hero image. Every other caller
 * (NarrativeBlock1/2, ServiceOverview, the About page) omits it and keeps
 * the default portrait large frame.
 */

const LANDSCAPE_HERO_SLUGS = new Set([
  "manuscript-editing",
  "author-branding",
  "childrens-book",
  "article-writing",
  "audiobook-publishing",
  "author-website",
]);

const SQUARE_HERO_SLUGS = new Set([
  "blog-writing",
  "proofreading",
  "website-content",
]);

export default function FloatingImages({
  images = [],
  className = "",
  slug = null,
  eager = false,
  layout = "default",
}) {
  const isExpanded = layout === "expanded";
  const list = images.slice(0, 4);
  const count = list.length;

  if (count === 0) return null;

  // 4 images → mosaic grid
  if (count === 4) {
    return (
      <div className={`fi-mosaic ${className}`}>
        <style dangerouslySetInnerHTML={{ __html: `
          .fi-mosaic {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            width: 100%;
            max-width: 420px;
          }
          .fi-mosaic-img {
            width: 100%;
            object-fit: cover;
            border-radius: 12px;
            border: 4px solid #FFFFFF;
            box-shadow: 0 12px 40px rgba(0,0,0,0.12);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .fi-mosaic-img:nth-child(1) { height: 220px; margin-top: 24px; }
          .fi-mosaic-img:nth-child(2) { height: 180px; }
          .fi-mosaic-img:nth-child(3) { height: 180px; }
          .fi-mosaic-img:nth-child(4) { height: 220px; margin-top: -24px; }
          .fi-mosaic-img:hover {
            transform: scale(1.04);
            box-shadow: 0 20px 50px rgba(0,0,0,0.18);
          }
          @media (max-width: 768px) {
            .fi-mosaic {
              grid-template-columns: 1fr 1fr;
              gap: 10px;
              width: min(392px, calc(100vw - 64px));
              max-width: min(392px, calc(100vw - 64px));
              margin: 0 auto;
            }
            .fi-mosaic-img {
              object-fit: cover;
              object-position: center center;
            }
            .fi-mosaic-img:nth-child(1) {
              width: 100%;
              height: 200px !important;
              margin-top: 12px !important;
            }
            .fi-mosaic-img:nth-child(2) {
              height: 168px !important;
            }
            .fi-mosaic-img:nth-child(3) {
              height: 168px !important;
            }
            .fi-mosaic-img:nth-child(4) {
              height: 200px !important;
              margin-top: -16px !important;
            }
            .fi-mosaic-img:hover {
              transform: none;
            }
          }
        ` }} />
        {list.map((img) => {
          const { width, height } = getImageDimensions(img.url);
          return (
            <img
              key={img.url}
              src={img.url}
              alt={img.alt || ""}
              className="fi-mosaic-img"
              width={width}
              height={height}
              loading="lazy"
              decoding="async"
            />
          );
        })}
      </div>
    );
  }

  // 1 image → centered large
  if (count === 1) {
    const isGhostHero = slug === "ghostwriting";
    return (
      <div className={`fi-single${isGhostHero ? " fi-single--ghostwriting" : ""} ${className}`}>
        <style dangerouslySetInnerHTML={{ __html: `
          .fi-single {
            position: relative;
            width: 100%;
            display: flex;
            justify-content: center;
          }
          .fi-single-img {
            width: 320px;
            max-width: 100%;
            height: 400px;
            object-fit: cover;
            border-radius: 16px;
            border: 4px solid #FFFFFF;
            box-shadow: 0 20px 60px rgba(0,0,0,0.15);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .fi-single--ghostwriting .fi-single-img {
            width: 100%;
            max-width: 420px;
            height: auto;
            object-fit: contain;
            object-position: center top;
          }
          .fi-single-img:hover {
            transform: scale(1.04);
            box-shadow: 0 24px 70px rgba(0,0,0,0.2);
          }
          .fi-single--ghostwriting .fi-single-img:hover {
            transform: none;
          }
          @media (max-width: 768px) {
            .fi-single-img {
              width: min(340px, calc(100vw - 64px));
              height: 408px;
              object-fit: cover;
              object-position: center center;
            }
            .fi-single--ghostwriting .fi-single-img {
              width: min(340px, calc(100vw - 64px));
              height: auto;
              object-fit: contain;
            }
            .fi-single-img:hover {
              transform: none;
            }
          }
        ` }} />
        {(() => {
          const { width, height } = getImageDimensions(list[0].url);
          return (
            <img
              src={list[0].url}
              alt={list[0].alt || ""}
              className="fi-single-img"
              width={width}
              height={height}
              loading="lazy"
              decoding="async"
            />
          );
        })()}
      </div>
    );
  }

  // 2–3 images → floating overlap (desktop) / row (mobile)
  return (
    <div
      className={`fi-float${isExpanded ? " fi-float--expanded" : ""} ${className}`.trim()}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .fi-float {
          position: relative;
          width: 100%;
          height: 520px;
        }
        .fi-float-img {
          position: absolute;
          object-fit: cover;
          border: 4px solid #FFFFFF;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .fi-float-img:hover {
          transform: scale(1.04);
          box-shadow: 0 24px 60px rgba(0,0,0,0.22);
        }
        .fi-float-large {
          width: 320px;
          height: 400px;
          top: 20px;
          left: 40px;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          z-index: 1;
        }
        .fi-float-large.fi-float-large-landscape {
          width: 400px;
          height: 260px;
        }
        .fi-float-large.fi-float-large-square {
          width: 320px;
          height: 320px;
        }
        .fi-float-medium {
          width: 200px;
          height: 260px;
          top: 160px;
          left: 280px;
          border-radius: 12px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
          z-index: 2;
          transform: rotate(3deg);
        }
        .fi-float-medium:hover {
          transform: rotate(3deg) scale(1.04);
        }
        .fi-float-small {
          width: 140px;
          height: 180px;
          top: 320px;
          left: 80px;
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          z-index: 3;
          transform: rotate(-4deg);
        }
        .fi-float-small:hover {
          transform: rotate(-4deg) scale(1.04);
        }

        /* Ghostwriting — larger frames, tighter cluster (hero + overview) */
        .fi-float--expanded {
          height: 548px;
          max-width: 520px;
          margin-left: auto;
        }
        .fi-float--expanded .fi-float-large {
          width: 372px;
          height: 464px;
          top: 0;
          left: 0;
          border-radius: 18px;
        }
        .fi-float--expanded .fi-float-medium {
          width: 232px;
          height: 300px;
          top: 108px;
          left: 272px;
          border-radius: 14px;
        }
        .fi-float--expanded .fi-float-medium:hover {
          transform: rotate(3deg) scale(1.04);
        }
        .fi-float--expanded .fi-float-small {
          width: 162px;
          height: 208px;
          top: 328px;
          left: 44px;
          border-radius: 12px;
        }
        .fi-float--expanded .fi-float-small:hover {
          transform: rotate(-4deg) scale(1.04);
        }

        /* Book marketing hero — desktop: accent on main image bottom-right, larger */
        @media (min-width: 769px) {
          .fi-float.fi-float--service-hero.fi-float--book-marketing-hero {
            height: 540px;
            max-width: 420px;
            margin-left: auto;
            margin-right: -8px;
          }
          .fi-float.fi-float--book-marketing-hero .fi-float-large {
            top: 12px;
            left: 28px;
          }
          .fi-float.fi-float--book-marketing-hero .fi-float-small {
            width: 220px;
            height: 284px;
            top: auto;
            left: auto;
            right: -4px;
            bottom: -20px;
            z-index: 3;
            transform: rotate(5deg);
            border-radius: 14px;
            box-shadow: 0 18px 48px rgba(0, 0, 0, 0.16);
          }
          .fi-float.fi-float--book-marketing-hero .fi-float-small:hover {
            transform: rotate(5deg) scale(1.04);
          }
        }

        @media (max-width: 768px) {
          .fi-float {
            --fi-m-sm-nudge: 14px;
            --fi-m-md-nudge-x: 12px;
            --fi-m-md-nudge-y: 10px;
            width: min(392px, calc(100vw - 64px));
            max-width: min(392px, calc(100vw - 64px));
            height: 444px;
            margin: 0 auto;
          }
          .fi-float-img {
            position: absolute;
            border-width: 3px;
            object-fit: cover;
            object-position: center center;
          }
          .fi-float-large {
            width: 264px;
            height: 334px;
            top: 6px;
            left: 50%;
            margin-left: -132px;
            border-radius: 14px;
            z-index: 1;
            transform: none;
          }
          .fi-float-large:hover {
            transform: none;
          }
          .fi-float-large.fi-float-large-landscape,
          .fi-float-large.fi-float-large-square {
            width: 264px;
            height: 334px;
            margin-left: -132px;
            top: 6px;
          }
          .fi-float-medium {
            width: 158px;
            height: 204px;
            top: calc(142px + var(--fi-m-md-nudge-y));
            left: 50%;
            margin-left: calc(33px - var(--fi-m-md-nudge-x));
            border-radius: 11px;
            z-index: 2;
            transform: rotate(3deg);
          }
          .fi-float-medium:hover {
            transform: rotate(3deg);
          }
          .fi-float-small {
            width: 115px;
            height: 148px;
            top: 272px;
            left: 50%;
            margin-left: calc(-141px + var(--fi-m-sm-nudge));
            border-radius: 9px;
            z-index: 3;
            transform: rotate(-4deg);
          }
          .fi-float-small:hover {
            transform: rotate(-4deg);
          }
          .fi-float--expanded {
            height: 468px;
            max-width: min(392px, calc(100vw - 64px));
          }
          .fi-float--expanded .fi-float-large {
            width: 278px;
            height: 348px;
            top: 0;
            margin-left: -139px;
          }
          .fi-float--expanded .fi-float-medium {
            width: 172px;
            height: 222px;
            top: calc(128px + var(--fi-m-md-nudge-y));
            margin-left: calc(28px - var(--fi-m-md-nudge-x));
          }
          .fi-float--expanded .fi-float-small {
            width: 122px;
            height: 156px;
            top: 288px;
            margin-left: calc(-148px + var(--fi-m-sm-nudge));
          }

          /* Service hero — wide cluster; accent cards tuck to corners (minimal face overlap) */
          .fi-float.fi-float--service-hero {
            --fi-m-lg: min(100%, 268px);
            --fi-m-md: min(44%, 142px);
            --fi-m-sm: min(36%, 112px);
            --fi-m-overlap: 24px;
            --fi-m-sm-nudge: 8px;
            --fi-m-md-nudge-x: 8px;
            --fi-m-md-nudge-y: 8px;
            width: 100%;
            max-width: 100%;
            height: calc(var(--fi-m-lg) * 1.24 + var(--fi-m-sm) * 0.42);
          }
          .fi-float.fi-float--service-hero .fi-float-large,
          .fi-float.fi-float--service-hero .fi-float-large.fi-float-large-landscape,
          .fi-float.fi-float--service-hero .fi-float-large.fi-float-large-square {
            width: var(--fi-m-lg);
            height: calc(var(--fi-m-lg) * 1.24);
            top: 0;
            left: 50%;
            margin-left: calc(var(--fi-m-lg) / -2);
            z-index: 1;
            object-position: center 28%;
          }
          .fi-float.fi-float--service-hero .fi-float-medium {
            width: var(--fi-m-md);
            height: calc(var(--fi-m-md) * 1.28);
            top: calc(var(--fi-m-lg) * 0.58 + var(--fi-m-md-nudge-y));
            left: calc(
              50% + var(--fi-m-lg) / 2 - var(--fi-m-overlap)
              - var(--fi-m-md-nudge-x)
            );
            margin-left: 0;
            z-index: 2;
            transform: rotate(4deg);
          }
          .fi-float.fi-float--service-hero .fi-float-medium:hover {
            transform: rotate(4deg);
          }
          .fi-float.fi-float--service-hero .fi-float-small {
            width: var(--fi-m-sm);
            height: calc(var(--fi-m-sm) * 1.28);
            top: calc(var(--fi-m-lg) * 1.24 - var(--fi-m-sm) * 0.42);
            left: calc(
              50% - var(--fi-m-lg) / 2 - var(--fi-m-sm) + var(--fi-m-overlap)
              + var(--fi-m-sm-nudge)
            );
            margin-left: 0;
            z-index: 2;
            transform: rotate(-5deg);
          }
          .fi-float.fi-float--service-hero .fi-float-small:hover {
            transform: rotate(-5deg);
          }
          .fi-float.fi-float--service-hero.fi-float--expanded {
            --fi-m-lg: min(100%, 276px);
            --fi-m-md: min(46%, 148px);
            --fi-m-sm: min(38%, 116px);
            --fi-m-overlap: 26px;
            --fi-m-sm-nudge: 10px;
            --fi-m-md-nudge-x: 10px;
            --fi-m-md-nudge-y: 10px;
            height: calc(var(--fi-m-lg) * 1.24 + var(--fi-m-sm) * 0.45);
          }
          .fi-float.fi-float--service-hero.fi-float--expanded .fi-float-medium {
            top: calc(var(--fi-m-lg) * 0.56 + var(--fi-m-md-nudge-y));
          }
          .fi-float.fi-float--service-hero.fi-float--expanded .fi-float-small {
            top: calc(var(--fi-m-lg) * 1.24 - var(--fi-m-sm) * 0.4);
          }

          /* Tighter shadows — avoid grey wash in the gap below trust / CTAs */
          .fi-float.fi-float--service-hero .fi-float-large {
            box-shadow: 0 12px 26px -10px rgba(0, 0, 0, 0.11);
          }
          .fi-float.fi-float--service-hero .fi-float-medium {
            box-shadow: 0 10px 22px -10px rgba(0, 0, 0, 0.1);
          }
          .fi-float.fi-float--service-hero .fi-float-small {
            box-shadow: 0 8px 18px -8px rgba(0, 0, 0, 0.1);
          }
        }
      ` }} />

      {list.map((img) => {
        const sizeClass =
          img.size === "medium"
            ? "fi-float-medium"
            : img.size === "small"
              ? "fi-float-small"
              : "fi-float-large";
        const largeVariant =
          sizeClass === "fi-float-large" && slug
            ? LANDSCAPE_HERO_SLUGS.has(slug)
              ? "fi-float-large-landscape"
              : SQUARE_HERO_SLUGS.has(slug)
                ? "fi-float-large-square"
                : ""
            : "";
        const { width, height } = getImageDimensions(img.url);
        return (
          <img
            key={img.url}
            src={img.url}
            alt={img.alt || ""}
            className={`fi-float-img ${sizeClass}${largeVariant ? ` ${largeVariant}` : ""}`}
            width={width}
            height={height}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={
              eager && sizeClass === "fi-float-large" ? "high" : undefined
            }
            decoding="async"
            style={
              eager
                ? { willChange: "transform", backfaceVisibility: "hidden" }
                : undefined
            }
          />
        );
      })}
    </div>
  );
}
