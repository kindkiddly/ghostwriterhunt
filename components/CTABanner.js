"use client";

import { useEffect } from "react";

/**
 * GhostWriterHunt — CTA Banner
 * Superside-style closing band: full-bleed photo,
 * dark overlay, bold dual CTAs, scroll reveal.
 */

export default function CTABanner() {
  // Scroll-reveal: fire once when ~15% of each target is visible
  useEffect(() => {
    const elements = document.querySelectorAll(".cta-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0");
            setTimeout(() => {
              entry.target.classList.add("cta-visible");
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
        el.classList.remove("cta-visible");
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="start"
      className="cta-banner-section relative flex min-h-[500px] w-full items-center justify-center overflow-hidden py-[80px]"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.15) 0%, transparent 60%),
          linear-gradient(rgba(28,28,28,0.85) 0%, rgba(28,28,28,0.90) 100%),
          url(/images/CTA-AUTHOR.webp)
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label="Get started today"
    >
      <style>{`
        .cta-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease-out,
                      transform 0.8s ease-out;
        }
        .cta-reveal.cta-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .cta-reveal { transform: translateY(20px); }
          .cta-reveal.cta-visible { transform: translateY(0); }
          .cta-banner-inner {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .cta-buttons-row {
            flex-direction: column !important;
            width: 100%;
          }
          .cta-buttons-row a {
            width: 100%;
            max-width: 100%;
          }
          .cta-banner-section {
            min-height: auto !important;
          }
        }
      `}</style>

      {/* Gold glow sits above the photo via background stack; content centered */}
      <div className="cta-banner-inner relative z-10 mx-auto w-full max-w-[800px] px-10 text-center">
        <p
          data-delay="0"
          className="cta-reveal mb-5 font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[#C9A84C]"
        >
          GET STARTED TODAY
        </p>

        <h2
          data-delay="100"
          className="cta-reveal mb-6 font-playfair text-[40px] font-bold leading-[1.1] tracking-[-0.02em] lg:text-[64px]"
        >
          <span className="block font-normal text-[#FFFFFF]">
            Your story deserves
          </span>
          <span className="block italic text-[#C9A84C]">to be told.</span>
        </h2>

        <p
          data-delay="200"
          className="cta-reveal mx-auto mb-12 max-w-[560px] font-inter text-[18px] font-normal leading-[1.7] break-words"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          Join 5,000+ authors who trusted GhostWriterHunt to bring their book
          to life. From first word to global publication — we handle everything
          so you can focus on your story.
        </p>

        <div
          data-delay="300"
          className="cta-reveal cta-buttons-row flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#start"
            className="inline-flex items-center justify-center rounded-[6px] bg-[#C9A84C] px-10 py-4 font-inter text-[16px] font-semibold text-[#FFFFFF] transition-colors duration-300 ease-in-out hover:bg-[#B8960C]"
          >
            Start Your Book Today
          </a>
          <a
            href="#start"
            className="inline-flex items-center justify-center rounded-[6px] border-2 border-[rgba(255,255,255,0.4)] bg-transparent px-10 py-4 font-inter text-[16px] font-semibold text-[#FFFFFF] transition-colors duration-300 ease-in-out hover:border-white"
          >
            Book a Free Consultation
          </a>
        </div>

        <p
          data-delay="400"
          className="cta-reveal mt-6 font-inter text-[13px] font-normal"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          No commitment required
          <span className="mx-1.5 text-[#C9A84C]" aria-hidden="true">
            ·
          </span>
          Free sample chapter
          <span className="mx-1.5 text-[#C9A84C]" aria-hidden="true">
            ·
          </span>
          100% confidential
        </p>
      </div>
    </section>
  );
}
