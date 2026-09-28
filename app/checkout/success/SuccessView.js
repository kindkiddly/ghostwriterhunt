"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SuccessView() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <main className="gwh-success-page relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-background)] px-5 py-20 sm:px-6">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/books-reading.webp"
          alt=""
          className="gwh-success-bg-img h-[min(520px,85vw)] w-[min(720px,120vw)] max-w-none object-cover opacity-[0.35] blur-[28px] saturate-[0.85]"
        />
      </div>
      <div className="absolute inset-0 bg-[var(--color-background)]/55" aria-hidden="true" />

      <div className="gwh-success-card relative z-[1] w-full max-w-[440px] rounded-[22px] border border-[rgba(232,213,163,0.85)] bg-[rgba(255,255,255,0.72)] p-8 text-center shadow-[0_20px_50px_rgba(28,28,28,0.1)] backdrop-blur-[18px] sm:p-10 supports-[backdrop-filter]:bg-[rgba(255,255,255,0.65)]">
        <div
          className={`mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full border border-[#E8D5A3]/80 bg-[rgba(255,255,255,0.5)] ${reduceMotion ? "" : "gwh-success-check-wrap"}`}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
            <circle
              cx="18"
              cy="18"
              r="16"
              stroke="#C9A84C"
              strokeWidth="1.5"
              className={reduceMotion ? "" : "gwh-success-check-circle"}
            />
            <path
              d="M11 18.5l4.2 4.2L25 12.5"
              stroke="#C9A84C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={reduceMotion ? "" : "gwh-success-check-mark"}
            />
          </svg>
        </div>

        <div className={reduceMotion ? "" : "gwh-success-copy"}>
          <h1 className="font-playfair text-[32px] font-bold leading-tight text-[#1C1C1C] sm:text-[36px]">
            Payment confirmed
          </h1>
          <p className="mt-3 font-playfair text-[17px] italic text-[#C9A84C] sm:text-[18px]">
            Your story is in good hands.
          </p>
          <p className="mt-5 font-inter text-[15px] leading-relaxed text-[#555555]">
            Your invoice is on its way to your inbox. Your project manager will be in touch within 24
            hours.
          </p>
          <div className="mx-auto my-6 h-px w-16 bg-[#C9A84C]/70" />
          <p className="font-inter text-[12px] tracking-wide text-[#888888]">
            100% Confidential · Secured by Stripe
          </p>
          <Link
            href="/"
            className="gwh-gold-btn-fill mt-8 inline-flex h-11 items-center justify-center rounded-[6px] bg-[#C9A84C] px-8 font-inter text-[14px] font-semibold text-white transition-colors hover:bg-[#B8960C]"
          >
            Back to homepage
          </Link>
          <p className="mt-5 font-inter text-[12px] text-[#888888]">
            <a
              href="mailto:ghostwriterhunt@lumexforge.com"
              className="text-[#666666] underline-offset-2 hover:text-[#C9A84C] hover:underline"
            >
              Questions? ghostwriterhunt@lumexforge.com
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gwh-success-draw-circle {
          from {
            stroke-dashoffset: 110;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes gwh-success-draw-mark {
          from {
            stroke-dashoffset: 28;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes gwh-success-fade-copy {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .gwh-success-check-circle {
          stroke-dasharray: 110;
          stroke-dashoffset: 110;
          animation: gwh-success-draw-circle 0.55s ease forwards;
        }
        .gwh-success-check-mark {
          stroke-dasharray: 28;
          stroke-dashoffset: 28;
          animation: gwh-success-draw-mark 0.4s ease forwards 0.45s;
        }
        .gwh-success-copy {
          opacity: 0;
          animation: gwh-success-fade-copy 0.55s ease forwards 0.65s;
        }
        @media (prefers-reduced-motion: reduce) {
          .gwh-success-check-circle,
          .gwh-success-check-mark,
          .gwh-success-copy {
            animation: none !important;
            stroke-dashoffset: 0;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </main>
  );
}
