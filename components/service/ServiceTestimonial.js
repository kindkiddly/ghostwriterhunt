"use client";

import { useEffect } from "react";

/**
 * GhostWriterHunt — ServiceTestimonial
 * Dark charcoal single-quote band. Prefix: st-
 */

function StarIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="#C9A84C"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function ServiceTestimonial({ service }) {
  useEffect(() => {
    const elements = document.querySelectorAll(".st-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0");
            setTimeout(() => {
              entry.target.classList.add("st-visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    requestAnimationFrame(() => {
      elements.forEach((el) => {
        el.classList.remove("st-visible");
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, [service?.slug]);

  if (!service?.testimonial) return null;
  const t = service.testimonial;

  return (
    <section className="st-section" aria-label="Client testimonial">
      <style>{`
        .st-section {
          background: #1C1C1C;
          padding: 80px 0;
        }
        .st-inner {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px;
          text-align: center;
        }
        .st-stars {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-bottom: 24px;
        }
        .st-quote-mark {
          display: block;
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 120px;
          color: rgba(201,168,76,0.2);
          line-height: 1;
          margin-bottom: -40px;
        }
        .st-quote {
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-style: italic;
          font-size: 22px;
          color: #FFFFFF;
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto 40px;
        }
        .st-author-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        .st-photo {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #C9A84C;
        }
        .st-name {
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 18px;
          color: #FFFFFF;
          margin: 0 0 4px;
          text-align: left;
        }
        .st-book {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #C9A84C;
          margin: 0;
          text-align: left;
        }
        .st-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .st-reveal.st-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 768px) {
          .st-quote { font-size: 18px; }
          .st-quote-mark { font-size: 80px; margin-bottom: -24px; }
        }
      `}</style>

      <div className="st-inner">
        <div className="st-stars st-reveal" data-delay="0">
          {[0, 1, 2, 3, 4].map((i) => (
            <StarIcon key={i} />
          ))}
        </div>

        <span className="st-quote-mark st-reveal" data-delay="80" aria-hidden="true">
          &ldquo;
        </span>

        <blockquote className="st-quote st-reveal" data-delay="120">
          {t.quote}
        </blockquote>

        <div className="st-author-row st-reveal" data-delay="200">
          <img
            src={t.image}
            alt={t.author}
            className="st-photo"
          />
          <div>
            <p className="st-name">{t.author}</p>
            <p className="st-book">Author of {t.book}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
