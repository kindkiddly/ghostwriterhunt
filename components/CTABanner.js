"use client";

import { useEffect } from "react";

/**
 * GhostWriterHunt — CTA Banner
 * Superside-style closing band: full-bleed photo,
 * dark overlay, bold dual CTAs, scroll reveal.
 */

export default function CTABanner() {
  // Reveal stacked content once when the banner scrolls into view
  useEffect(() => {
    const elements = document.querySelectorAll(".cta-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("cta-visible");
            }, 100);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    elements.forEach((el) => {
      el.classList.remove("cta-visible");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="start"
      className="relative flex min-h-[500px] w-full items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.15) 0%, transparent 60%),
          linear-gradient(rgba(28,28,28,0.85) 0%, rgba(28,28,28,0.90) 100%),
          url(https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1920&h=600&fit=crop)
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
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .cta-reveal.cta-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Gold glow sits above the photo via background stack; content centered */}
      <div className="relative z-10 mx-auto w-full max-w-[800px] px-10 py-[80px] text-center">
        <p
          className="cta-reveal mb-5 font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[#C9A84C]"
        >
          GET STARTED TODAY
        </p>

        <h2
          className="cta-reveal mb-6 font-playfair text-[40px] font-bold leading-[1.1] tracking-[-0.02em] lg:text-[64px]"
          style={{ transitionDelay: "0.1s" }}
        >
          <span className="block font-normal text-[#FFFFFF]">
            Your story deserves
          </span>
          <span className="block italic text-[#C9A84C]">to be told.</span>
        </h2>

        <p
          className="cta-reveal mx-auto mb-12 max-w-[560px] font-inter text-[18px] font-normal leading-[1.7]"
          style={{
            color: "rgba(255,255,255,0.75)",
            transitionDelay: "0.2s",
          }}
        >
          Join 5,000+ authors who trusted GhostWriterHunt to bring their book
          to life. From first word to global publication — we handle everything
          so you can focus on your story.
        </p>

        <div
          className="cta-reveal flex flex-wrap items-center justify-center gap-4"
          style={{ transitionDelay: "0.3s" }}
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
          className="cta-reveal mt-6 font-inter text-[13px] font-normal"
          style={{
            color: "rgba(255,255,255,0.5)",
            transitionDelay: "0.4s",
          }}
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
