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
}) {
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
              display: flex;
              flex-direction: row;
              gap: 12px;
              max-width: 100%;
              overflow-x: auto;
            }
            .fi-mosaic-img {
              width: 100px;
              height: 130px !important;
              margin-top: 0 !important;
              flex-shrink: 0;
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
              width: 100px;
              height: 130px;
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
    <div className={`fi-float ${className}`}>
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
        .fi-float-deco {
          position: absolute;
          bottom: 40px;
          right: 20px;
          width: 60px;
          height: 60px;
          background: #C9A84C;
          border-radius: 8px;
          opacity: 0.15;
          z-index: 0;
        }
        @media (max-width: 768px) {
          .fi-float {
            height: auto;
            display: flex;
            flex-direction: row;
            gap: 12px;
            align-items: center;
          }
          .fi-float-img {
            position: static;
            width: 80px;
            height: 130px;
            border-radius: 10px;
            transform: none !important;
            flex-shrink: 0;
          }
          .fi-float-deco { display: none; }
        }
      `}</style>

      <div className="fi-float-deco" aria-hidden="true" />

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
