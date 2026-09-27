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

  return (
    <section
      className={`sp-section${isGhostwriting ? " sp-section--ghostwriting" : ""}`}
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
            padding-left: 12px;
            padding-right: 12px;
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
            padding: 0 6px;
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
            max-width: min(340px, calc(100vw - 40px));
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
          {service.process.map((step, index) => {
            // Odd steps (0,2,4): image left — Even: content left (image right)
            const imageLeft = index % 2 === 0;
            const { width, height } = getImageDimensions(step.image);
            const image = (
              <div className="sp-col">
                <img
                  src={step.image}
                  alt={step.title}
                  className="sp-img"
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
    </section>
  );
}
