"use client";

import { useEffect } from "react";
import { getImageDimensions } from "@/data/imageDimensions";

/**
 * GhostWriterHunt — ServiceProcess
 * Alternating image / content process steps. Prefix: sp-
 */

export default function ServiceProcess({ service }) {
  useEffect(() => {
    const elements = document.querySelectorAll(".sp-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0");
            setTimeout(() => {
              entry.target.classList.add("sp-visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    requestAnimationFrame(() => {
      elements.forEach((el) => {
        el.classList.remove("sp-visible");
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, [service?.slug]);

  if (!service?.process?.length) return null;

  return (
    <section className="sp-section" aria-label="The process">
      <style>{`
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
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 500;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #6B7C3A;
          text-align: center;
          margin: 0 0 16px;
        }
        .sp-headline {
          font-family: var(--font-playfair), "Playfair Display", serif;
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
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 80px;
          color: #E8D5A3;
          line-height: 1;
          margin: 0 0 8px;
        }
        .sp-title {
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 24px;
          color: #1C1C1C;
          margin: 0 0 12px;
        }
        .sp-desc {
          font-family: var(--font-inter), Inter, sans-serif;
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
        @media (max-width: 768px) {
          .sp-headline { font-size: 32px; }
          .sp-row, .sp-row-reverse {
            flex-direction: column;
            gap: 24px;
          }
          .sp-number { font-size: 56px; }
          .sp-img { height: 200px; }
        }
      `}</style>

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
            const content = (
              <div className="sp-col">
                <p className="sp-number">{step.number}</p>
                <h3 className="sp-title">{step.title}</h3>
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
