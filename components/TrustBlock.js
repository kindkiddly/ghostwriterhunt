"use client";

import { useEffect, useRef } from "react";

/**
 * GhostWriterHunt — Trust Block
 * Superside-style full-width dark confidence band:
 * bold statement, gold-divided stats, floating specialty ticker.
 * Scroll-reveal via tb- prefixed CSS classes.
 */

const STATS = [
  { number: "1", suffix: "%", label: "of applicants accepted" },
  { number: "5,000", suffix: "+", label: "books written" },
  { number: "98", suffix: "%", label: "client satisfaction rate" },
  { number: "200", suffix: "+", label: "professional writers" },
];

const CHIPS = [
  "Fiction Specialists",
  "Non-Fiction Experts",
  "Biography Writers",
  "Memoir Specialists",
  "Business Book Authors",
  "Children's Book Writers",
];

// Duplicated for seamless CSS loop (translateX -50%)
const TICKER_CHIPS = [...CHIPS, ...CHIPS];

export default function TrustBlock() {
  const trackRef = useRef(null);

  // Scroll-reveal: fire once when ~15% of each target is visible
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".tb-reveal, .tb-reveal-stats, .tb-reveal-chips"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0");
            setTimeout(() => {
              entry.target.classList.add("tb-visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    requestAnimationFrame(() => {
      elements.forEach((el) => {
        el.classList.remove("tb-visible");
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, []);

  // Touch / mouse drag — pause CSS ticker and scrub via transform
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0; // stores translateX at drag start

    const readTranslateX = () => {
      const { transform } = window.getComputedStyle(track);
      if (!transform || transform === "none") return 0;
      try {
        return new DOMMatrixReadOnly(transform).m41;
      } catch {
        return 0;
      }
    };

    const freezeAtCurrent = () => {
      const x = readTranslateX();
      track.style.animation = "none";
      track.style.transform = `translateX(${x}px)`;
      return x;
    };

    const resumeAnimation = () => {
      track.style.removeProperty("animation");
      track.style.removeProperty("transform");
      track.style.animationPlayState = "running";
      track.style.cursor = "grab";
    };

    const onMouseDown = (e) => {
      isDown = true;
      track.style.animationPlayState = "paused";
      track.style.cursor = "grabbing";
      startX = e.pageX - track.offsetLeft;
      scrollLeft = freezeAtCurrent();
    };

    const onMouseLeave = () => {
      if (!isDown) return;
      isDown = false;
      resumeAnimation();
    };

    const onMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      resumeAnimation();
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 2;
      track.style.transform = `translateX(${scrollLeft + walk}px)`;
    };

    const onTouchStart = (e) => {
      isDown = true;
      track.style.animationPlayState = "paused";
      startX = e.touches[0].pageX - track.offsetLeft;
      scrollLeft = freezeAtCurrent();
    };

    const onTouchEnd = () => {
      if (!isDown) return;
      isDown = false;
      resumeAnimation();
    };

    const onTouchMove = (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - track.offsetLeft;
      const walk = (x - startX) * 2;
      track.style.transform = `translateX(${scrollLeft + walk}px)`;
    };

    track.addEventListener("mousedown", onMouseDown);
    track.addEventListener("mouseleave", onMouseLeave);
    track.addEventListener("mouseup", onMouseUp);
    track.addEventListener("mousemove", onMouseMove);
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchend", onTouchEnd);
    track.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      track.removeEventListener("mousedown", onMouseDown);
      track.removeEventListener("mouseleave", onMouseLeave);
      track.removeEventListener("mouseup", onMouseUp);
      track.removeEventListener("mousemove", onMouseMove);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
      track.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden border-0 bg-[#1C1C1C] py-[80px]"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 100% 0%, rgba(201,168,76,0.08) 0%, transparent 60%),
          radial-gradient(ellipse at 0% 100%, rgba(201,168,76,0.08) 0%, transparent 60%)
        `,
      }}
      aria-label="Our Standard"
    >
      <style>{`
        .tb-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }

        .tb-reveal-stats {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .tb-reveal-chips {
          opacity: 0;
          transition: opacity 0.5s ease-out;
        }

        .tb-reveal.tb-visible,
        .tb-reveal-stats.tb-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .tb-reveal-chips.tb-visible {
          opacity: 1;
        }

        /* ——— Specialty ticker — floating gold outline chips ——— */
        .tb-ticker {
          position: relative;
          width: 100%;
          overflow: hidden;
          margin-top: 48px;
          padding: 20px 0;
          background: transparent;
        }

        /* Vertical fades so chips float in the dark band */
        .tb-ticker-fade-top,
        .tb-ticker-fade-bottom {
          position: absolute;
          left: 0;
          right: 0;
          height: 40px;
          z-index: 2;
          pointer-events: none;
        }

        .tb-ticker-fade-top {
          top: 0;
          background: linear-gradient(
            to bottom,
            #1C1C1C 0%,
            transparent 100%
          );
        }

        .tb-ticker-fade-bottom {
          bottom: 0;
          background: linear-gradient(
            to top,
            #1C1C1C 0%,
            transparent 100%
          );
        }

        .tb-ticker-track {
          display: flex;
          flex-direction: row;
          width: max-content;
          animation: tickerScroll 20s linear infinite;
          cursor: grab;
        }

        .tb-ticker-track:hover {
          animation-play-state: paused;
        }

        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .tb-ticker-chip {
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
          white-space: nowrap;
          margin-right: 20px;
          padding: 10px 28px;
          border-radius: 100px;
          background: #C9A84C;
          border: 1px solid #C9A84C;
          cursor: grab;
          transition: all 0.25s ease;
        }

        .tb-ticker-chip:hover {
          background: transparent;
          border: 1px solid #C9A84C;
          transform: translateY(-2px);
        }

        .tb-ticker-chip:hover .tb-ticker-chip-text {
          color: #C9A84C;
        }

        .tb-ticker-chip-text {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 600;
          font-size: 13px;
          color: #1C1C1C;
          letter-spacing: 0.05em;
          transition: color 0.25s ease;
        }

        @media (max-width: 768px) {
          .tb-reveal { transform: translateY(20px); }
          .tb-reveal.tb-visible { transform: translateY(0); }
          .tb-stats-row {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            width: 100%;
          }
          .tb-stats-row > div {
            width: 100%;
            justify-content: center;
          }
          .tb-reveal-stats {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
          .tb-reveal-stats p:first-child {
            font-size: 40px !important;
          }
          .tb-section-inner {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
      `}</style>

      <div className="tb-section-inner mx-auto w-full max-w-[1200px] px-6 lg:px-8">
        {/* ——— Part 1: centered statement ——— */}
        <div className="tb-reveal flex flex-col items-center text-center" data-delay="0">
          <p className="mb-5 font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[#C9A84C]">
            OUR STANDARD
          </p>

          <h2 className="mb-5 font-playfair text-[36px] font-bold leading-[1.1] tracking-[-0.02em] lg:text-[56px]">
            <span className="block text-[#FFFFFF]">Only the best writers</span>
            <span className="block italic text-[#C9A84C]">make our team.</span>
          </h2>

          <p className="mb-[60px] max-w-[600px] font-inter text-[16px] font-normal leading-[1.7] text-[#999999] break-words">
            Every ghostwriter on our platform goes through a rigorous vetting
            process. We accept only the top 1% of applicants — ensuring every
            author receives nothing short of exceptional.
          </p>
        </div>

        {/* ——— Part 2: stats row with gold dividers ——— */}
        <div className="tb-stats-row flex flex-col items-center justify-center sm:flex-row sm:flex-wrap lg:flex-nowrap">
          {STATS.map((stat, index) => (
            <div key={stat.label} className="flex items-center">
              {index > 0 && (
                <div
                  className="mx-0 hidden h-[60px] w-px shrink-0 bg-[rgba(201,168,76,0.3)] sm:block"
                  aria-hidden="true"
                />
              )}
              <div
                className="tb-reveal-stats px-10 py-6 text-center sm:py-0"
                data-delay={index * 100}
              >
                <p className="font-playfair text-[56px] font-bold leading-none text-[#FFFFFF]">
                  {stat.number}
                  <span className="text-[#C9A84C]">{stat.suffix}</span>
                </p>
                <p className="mt-2 font-inter text-[14px] font-normal text-[#999999]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ——— Part 3: full-width specialty ticker ——— */}
      <div
        className="tb-ticker tb-reveal-chips"
        data-delay="400"
        aria-label="Writer specialties"
      >
        <div className="tb-ticker-fade-top" aria-hidden="true" />
        <div className="tb-ticker-fade-bottom" aria-hidden="true" />

        <div ref={trackRef} className="tb-ticker-track">
          {TICKER_CHIPS.map((chip, index) => (
            <span
              key={`${chip}-${index}`}
              className="tb-ticker-chip"
            >
              <span className="tb-ticker-chip-text">{chip}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
