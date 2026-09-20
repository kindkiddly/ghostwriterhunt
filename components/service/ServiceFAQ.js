"use client";

import { useEffect, useState } from "react";

/**
 * GhostWriterHunt — ServiceFAQ
 * Accordion matching homepage FAQ style. Prefix: sf-
 */

function PlusMinusIcon({ open }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M4 10h12"
        stroke="#C9A84C"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 4v12"
        stroke="#C9A84C"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          opacity: open ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      />
    </svg>
  );
}

export default function ServiceFAQ({ service }) {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = service?.faqs || [];

  useEffect(() => {
    const elements = document.querySelectorAll(".sf-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0");
            setTimeout(() => {
              entry.target.classList.add("sf-visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    requestAnimationFrame(() => {
      elements.forEach((el) => {
        el.classList.remove("sf-visible");
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, [service?.slug]);

  if (!faqs.length) return null;

  return (
    <section className="sf-section" aria-label="Frequently asked questions">
      <style>{`
        .sf-section {
          background: #FFFFFF;
          padding: 80px 0;
        }
        .sf-inner {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .sf-label {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 500;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #6B7C3A;
          text-align: center;
          margin: 0 0 16px;
        }
        .sf-headline {
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 48px;
          line-height: 1.1;
          text-align: center;
          color: #1C1C1C;
          margin: 0 0 48px;
        }
        .sf-headline-italic {
          display: block;
          font-style: italic;
          color: #C9A84C;
        }
        .sf-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
        }
        .sf-item {
          margin-bottom: 12px;
        }
        .sf-btn {
          width: 100%;
          cursor: pointer;
          border-radius: 12px;
          border: 1px solid #E8D5A3;
          background: #FFFFFF;
          padding: 24px 28px;
          text-align: left;
          transition: border-color 0.3s ease;
        }
        .sf-btn:hover { border-color: #C9A84C; }
        .sf-btn.open {
          border-color: #C9A84C;
          border-left: 3px solid #C9A84C;
        }
        .sf-q-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .sf-q {
          flex: 1;
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 18px;
          color: #1C1C1C;
        }
        .sf-a-wrap {
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.3s ease;
        }
        .sf-a {
          margin: 16px 0 0;
          padding-top: 16px;
          border-top: 1px solid #E8D5A3;
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 15px;
          color: #666666;
          line-height: 1.8;
        }
        .sf-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .sf-reveal.sf-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 768px) {
          .sf-headline { font-size: 32px; }
          .sf-q { font-size: 16px; word-break: break-word; }
          .sf-btn { padding: 16px; }
        }
      `}</style>

      <div className="sf-inner">
        <p className="sf-label sf-reveal" data-delay="0">
          FAQ
        </p>
        <h2 className="sf-headline sf-reveal" data-delay="80">
          <span className="block">Frequently asked</span>
          <span className="sf-headline-italic">questions.</span>
        </h2>

        <ul className="sf-list">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li
                key={item.question}
                className="sf-item sf-reveal"
                data-delay={120 + index * 80}
              >
                <button
                  type="button"
                  className={`sf-btn${isOpen ? " open" : ""}`}
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenIndex((cur) => (cur === index ? null : index))
                  }
                >
                  <div className="sf-q-row">
                    <span className="sf-q">{item.question}</span>
                    <PlusMinusIcon open={isOpen} />
                  </div>
                  <div
                    className="sf-a-wrap"
                    style={{
                      maxHeight: isOpen ? "500px" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="sf-a">{item.answer}</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
