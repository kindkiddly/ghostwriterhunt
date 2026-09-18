"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";

/**
 * GhostWriterHunt — Hero section
 * Reedsy two-column hero: text left, floating book covers right.
 * Drag/swipe to scroll covers; float animations continue.
 */

const BOOK_IMAGES = [
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1472173148041-00294f0814a2?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=160&h=240&fit=crop",
];

// Interleaved columns so adjacent covers never share the same source set
const COLUMN_1 = [0, 3, 6, 9, 12, 15, 18, 21].map((i) => BOOK_IMAGES[i]);
const COLUMN_2 = [1, 4, 7, 10, 13, 16, 19, 22].map((i) => BOOK_IMAGES[i]);
const COLUMN_3 = [2, 5, 8, 11, 14, 17, 20, 23].map((i) => BOOK_IMAGES[i]);

function BookCover({ src, index }) {
  return (
    <div className="group relative z-0 shrink-0 transition-all duration-300 ease-in-out hover:z-10 hover:scale-105">
      <Image
        src={src}
        alt={`Featured book cover ${index + 1}`}
        width={140}
        height={200}
        className="pointer-events-none h-[200px] w-[140px] rounded-lg object-cover shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-shadow duration-300 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)]"
        draggable={false}
      />
    </div>
  );
}

function FloatingBooks({ mobile = false }) {
  const scrollRef = useRef(null);
  const dragState = useRef({ active: false, startY: 0, startScroll: 0 });

  // Mouse / touch drag-to-scroll while float animations keep running
  const onPointerDown = useCallback((e) => {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current = {
      active: true,
      startY: e.clientY,
      startScroll: el.scrollTop,
    };
    el.setPointerCapture?.(e.pointerId);
    el.style.cursor = "grabbing";
  }, []);

  const onPointerMove = useCallback((e) => {
    const el = scrollRef.current;
    if (!el || !dragState.current.active) return;
    const delta = e.clientY - dragState.current.startY;
    el.scrollTop = dragState.current.startScroll - delta;
  }, []);

  const onPointerUp = useCallback((e) => {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current.active = false;
    el.releasePointerCapture?.(e.pointerId);
    el.style.cursor = "grab";
  }, []);

  const col1 = mobile ? COLUMN_1.slice(0, 4) : COLUMN_1;
  const col2 = mobile ? COLUMN_2.slice(0, 4) : COLUMN_2;
  const col3 = mobile ? COLUMN_3.slice(0, 4) : COLUMN_3;

  return (
    <div
      ref={scrollRef}
      className={`gwh-books-scroll relative w-full cursor-grab overflow-y-auto overflow-x-hidden active:cursor-grabbing ${
        mobile ? "h-[280px]" : "h-[520px]"
      }`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      aria-label="Browse book covers"
    >
      {/* No edge fade — covers stay fully visible while scrolling */}
      <div className="flex min-h-full items-start justify-center gap-3 py-2">
        <div className="gwh-float-up flex flex-col gap-3">
          {col1.map((src, i) => (
            <BookCover key={`c1-${i}`} src={src} index={i} />
          ))}
        </div>

        <div className="gwh-float-down mt-10 flex flex-col gap-3">
          {col2.map((src, i) => (
            <BookCover key={`c2-${i}`} src={src} index={i + 8} />
          ))}
        </div>

        <div className="gwh-float-mid mt-5 flex flex-col gap-3">
          {col3.map((src, i) => (
            <BookCover key={`c3-${i}`} src={src} index={i + 16} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const genres = [
    "Fiction",
    "Non-Fiction",
    "Biography",
    "Self-Help",
    "Business",
    "Memoir",
  ];

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--color-background)] px-6 pb-20 pt-[140px]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
      }}
      aria-label="Hero"
    >
      <style>{`
        @keyframes gwh-fade-up {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gwh-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }

        @keyframes floatUp {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        @keyframes floatDown {
          0% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
          100% { transform: translateY(0px); }
        }

        @keyframes floatMid {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }

        .gwh-hero-animate {
          opacity: 0;
          animation: gwh-fade-up 0.7s ease-out forwards;
        }

        .gwh-hero-delay-0 { animation-delay: 0s; }
        .gwh-hero-delay-1 { animation-delay: 0.2s; }
        .gwh-hero-delay-2 { animation-delay: 0.4s; }
        .gwh-hero-delay-3 { animation-delay: 0.6s; }
        .gwh-hero-delay-4 { animation-delay: 0.8s; }

        .gwh-scroll-bounce {
          animation: gwh-bounce 1.6s ease-in-out infinite;
        }

        .gwh-float-up {
          animation: floatUp 6s ease-in-out infinite;
        }

        .gwh-float-down {
          animation: floatDown 8s ease-in-out infinite;
        }

        .gwh-float-mid {
          animation: floatMid 7s ease-in-out infinite;
        }

        /* Hide scrollbar but keep scroll / drag */
        .gwh-books-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
          touch-action: pan-y;
          -webkit-overflow-scrolling: touch;
          user-select: none;
        }

        .gwh-books-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-10">
        {/* ——— Left column: existing text content ——— */}
        <div className="flex w-full flex-col items-center text-center lg:w-[55%] lg:items-start lg:text-left">
          <h1 className="gwh-hero-animate gwh-hero-delay-0 font-playfair text-[36px] leading-[1.15] text-[var(--color-text)] sm:text-[48px] lg:text-[72px]">
            <span className="block font-normal">Where Ideas</span>
            <span className="block italic">Become Books.</span>
          </h1>

          <p className="gwh-hero-animate gwh-hero-delay-1 mt-6 max-w-[600px] font-inter text-[18px] font-normal leading-[1.8] text-[#666666] lg:text-[20px]">
            Professional ghostwriters, designers and editors — everything your
            book needs, under one roof.
          </p>

          {/* CTA row — matched 52px height buttons */}
          <div className="gwh-hero-animate gwh-hero-delay-2 mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a
              href="#start"
              className="inline-flex h-[52px] items-center justify-center rounded-[6px] bg-[var(--color-accent-gold)] px-8 font-inter text-base font-semibold text-white transition-colors duration-300 hover:bg-[#B8960C]"
            >
              Start Your Book
            </a>
            <a
              href="#how-it-works"
              className="inline-flex h-[52px] items-center justify-center rounded-[6px] border-2 border-[var(--color-accent-gold)] bg-transparent px-8 font-inter text-base font-semibold text-[var(--color-accent-gold)] transition-colors duration-300 hover:bg-[var(--color-accent-gold)] hover:text-white"
            >
              See How It Works
            </a>
          </div>

          <p className="gwh-hero-animate gwh-hero-delay-3 mt-6 flex items-center justify-center gap-3 font-inter text-[14px] font-normal text-[#999999] lg:justify-start">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent-gold)]"
              aria-hidden="true"
            />
            Trusted by 500+ authors worldwide
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent-gold)]"
              aria-hidden="true"
            />
          </p>

          {/* Genre pills — matched 36px height */}
          <ul className="gwh-hero-animate gwh-hero-delay-4 mt-6 flex max-w-[720px] flex-wrap items-center justify-center gap-3 lg:justify-start">
            {genres.map((genre) => (
              <li key={genre}>
                <span className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-[20px] border border-[var(--color-border)] bg-[var(--color-card)] px-5 font-inter text-[13px] font-medium text-[var(--color-accent-olive)] transition-colors duration-300 hover:border-[var(--color-accent-gold)]">
                  {genre}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ——— Right column: floating + scrollable book covers ——— */}
        <div className="hidden w-full lg:block lg:w-[45%]">
          <FloatingBooks />
        </div>

        <div className="w-full lg:hidden">
          <FloatingBooks mobile />
        </div>
      </div>

      <a
        href="#how-it-works"
        className="gwh-scroll-bounce absolute bottom-8 left-1/2 flex -translate-x-1/2 text-[var(--color-accent-gold)]"
        aria-label="Scroll to next section"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}
