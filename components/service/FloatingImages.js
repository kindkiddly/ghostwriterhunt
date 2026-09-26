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
        <style>{`
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
              width: min(392px, calc(100vw - 32px));
              max-width: min(392px, calc(100vw - 32px));
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
        `}</style>
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
    return (
      <div className={`fi-single ${className}`}>
        <style>{`
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
          .fi-single-img:hover {
            transform: scale(1.04);
            box-shadow: 0 24px 70px rgba(0,0,0,0.2);
          }
          @media (max-width: 768px) {
            .fi-single-img {
              width: min(340px, calc(100vw - 32px));
              height: 408px;
              object-fit: cover;
              object-position: center center;
            }
            .fi-single-img:hover {
              transform: none;
            }
          }
        `}</style>
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
      <style>{`
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

        @media (max-width: 768px) {
          .fi-float {
            width: min(392px, calc(100vw - 32px));
            max-width: min(392px, calc(100vw - 32px));
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
          /* Mobile: same portrait stack as homepage (ignore hero aspect variants) */
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
            top: 142px;
            left: 50%;
            margin-left: 33px;
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
            margin-left: -141px;
            border-radius: 9px;
            z-index: 3;
            transform: rotate(-4deg);
          }
          .fi-float-small:hover {
            transform: rotate(-4deg);
          }
          .fi-float--expanded {
            height: 468px;
            max-width: min(392px, calc(100vw - 32px));
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
            top: 128px;
            margin-left: 28px;
          }
          .fi-float--expanded .fi-float-small {
            width: 122px;
            height: 156px;
            top: 288px;
            margin-left: -148px;
          }
        }
        @media (max-width: 360px) {
          .fi-float {
            height: 420px;
          }
          .fi-float--expanded {
            height: 448px;
          }
          .fi-float-large,
          .fi-float-large.fi-float-large-landscape,
          .fi-float-large.fi-float-large-square {
            width: 248px;
            height: 314px;
            margin-left: -124px;
          }
          .fi-float-medium {
            width: 148px;
            height: 192px;
            top: 136px;
            margin-left: 16px;
          }
          .fi-float-small {
            width: 108px;
            height: 138px;
            top: 258px;
            margin-left: -132px;
          }
        }
      `}</style>

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
