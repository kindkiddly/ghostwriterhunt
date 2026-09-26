"use client";

import HeroTitleFrame from "@/components/HeroTitleFrame";

/**
 * GhostWriterHunt — Hero section
 * Full-viewport (100vh) behind transparent navbar.
 * Right side: 3 continuous book-cover ticker columns
 * with seamless -50% loop (images duplicated once).
 * Uses verified Unsplash URLs (gallery-confirmed + extras).
 */

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=180&h=220&fit=crop";

const COLUMN_1 = [
  "/images/carousel-book-H5.webp",
  "/images/carousel-book-H6.webp",
  "/images/carousel-book-H8.webp",
  "/images/carousel-book-H9.webp",
  "/images/carousel-book-H13.webp",
  "/images/carousel-book-H14.webp",
  "/images/carousel-books-3.webp",
  "/images/carousel-books-7.webp",
];

const COLUMN_2 = [
  "/images/carousel-books-9.webp",
  "/images/carousel-books-11.webp",
  "/images/carousel-books-14.webp",
  "/images/carousel-Books-2.webp",
  "/images/carousel-book-H2.webp",
  "/images/carousel-books-6.webp",
  "/images/carousel-books-fairy-lights.webp",
  "/images/carousel-e-book-publishing.webp",
];

const COLUMN_3 = [
  "/images/carousel-books-flatlay.webp",
  "/images/carousel-books-stack-pink.webp",
  "/images/carousel-books-reading.webp",
  "/images/carousel-book-H12.webp",
  "/images/carousel-books-5.webp",
  "/images/carousel-books-8.webp",
  "/images/carousel-books-10.webp",
  "/images/carousel-flipping-book.webp",
];

function BookCover({
  src,
  alt,
  loading = "lazy",
  fetchPriority,
  ariaHidden,
}) {
  return (
    // Regular img — fixed 220px height + 12px margin for exact -50% loop math
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="gwh-book-cover"
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      aria-hidden={ariaHidden}
      onError={(e) => {
        // Swap to a verified gallery cover if Unsplash fails
        if (e.currentTarget.src !== FALLBACK_COVER) {
          e.currentTarget.src = FALLBACK_COVER;
        }
      }}
      style={{
        width: "100%",
        height: "220px",
        objectFit: "cover",
        objectPosition: "center center",
        borderRadius: "10px",
        marginBottom: "12px",
        display: "block",
        flexShrink: 0,
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
      }}
    />
  );
}

/**
 * One vertical ticker column.
 * Structure: wrapper (overflow hidden) → scroll-track (animated, images × 2).
 * translateY(-50%) moves exactly one image set → seamless loop.
 */
function ScrollColumn({
  images,
  animationClass,
  animationDelay,
  label,
  priorityColumn = false,
}) {
  return (
    <div
      className="h-full w-[calc(33.333%-8px)] shrink-0 overflow-hidden"
      aria-label={label}
    >
      <div
        className={`scroll-track flex flex-col ${animationClass}`}
        style={animationDelay ? { animationDelay } : undefined}
      >
        {images.map((src, i) => (
          <BookCover
            key={`${label}-a-${i}`}
            src={src}
            alt={`Book cover ${i + 1}`}
            loading={priorityColumn && i < 3 ? "eager" : "lazy"}
            fetchPriority={priorityColumn && i === 0 ? "high" : "low"}
          />
        ))}
        {images.map((src, i) => (
          <BookCover
            key={`${label}-b-${i}`}
            src={src}
            alt=""
            aria-hidden={true}
            loading="lazy"
            fetchPriority="low"
          />
        ))}
      </div>
    </div>
  );
}

function HeroTrustPeopleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 text-[#C9A84C]"
    >
      <circle cx="9" cy="8" r="3" fill="currentColor" />
      <circle cx="16" cy="9" r="2.5" fill="currentColor" />
      <path
        d="M4 19c0-2.5 2.2-4 5-4s5 1.5 5 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 19c0-1.8 1.4-3 3.5-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookTicker() {
  return (
    <div
      className="gwh-books-ticker relative flex h-[50vh] w-full flex-row items-start gap-3 overflow-hidden lg:h-screen"
      aria-label="Featured book covers"
    >
      <ScrollColumn
        images={COLUMN_1}
        animationClass="gwh-scroll-col-1"
        label="Book column 1"
        priorityColumn
      />
      <ScrollColumn
        images={COLUMN_2}
        animationClass="gwh-scroll-col-2"
        animationDelay="-12s"
        label="Book column 2"
      />
      <ScrollColumn
        images={COLUMN_3}
        animationClass="gwh-scroll-col-3"
        animationDelay="-6s"
        label="Book column 3"
      />
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
      className="gwh-hero-root relative flex min-h-screen flex-col items-center justify-start overflow-hidden bg-[var(--color-background)] px-6 pb-0 pt-0"
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

        /* Seamless loop: track is images×2, so -50% = exactly one set */
        @keyframes scrollUp {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(0, -50%, 0); }
        }

        @keyframes scrollDown {
          from { transform: translate3d(0, -50%, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        .gwh-books-ticker {
          contain: layout style paint;
        }

        .scroll-track {
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        .gwh-hero-animate {
          opacity: 1;
          animation: gwh-fade-up 0.7s ease-out both;
        }

        .gwh-hero-delay-0 { animation-delay: 0s; }
        .gwh-hero-delay-1 { animation-delay: 0.2s; }
        .gwh-hero-delay-2 { animation-delay: 0.4s; }
        .gwh-hero-delay-3 { animation-delay: 0.6s; }
        .gwh-hero-delay-4 { animation-delay: 0.8s; }

        .gwh-scroll-bounce {
          animation: gwh-bounce 1.6s ease-in-out infinite;
        }

        .gwh-scroll-col-1 {
          animation: scrollUp 42s linear infinite;
        }

        .gwh-scroll-col-2 {
          animation: scrollDown 48s linear infinite;
        }

        .gwh-scroll-col-3 {
          animation: scrollUp 40s linear infinite;
        }

        .gwh-books-ticker:hover .gwh-scroll-col-1,
        .gwh-books-ticker:hover .gwh-scroll-col-2,
        .gwh-books-ticker:hover .gwh-scroll-col-3 {
          animation-play-state: paused;
        }

        .gwh-hero-left {
          isolation: isolate;
        }

        .gwh-hero-head-content {
          position: relative;
          z-index: 1;
          width: 100%;
        }

        @media (min-width: 1024px) {
          .gwh-hero-head-content {
            padding-left: 20px;
          }
          .gwh-hero-root {
            justify-content: flex-start;
          }
          .gwh-hero-inner {
            align-items: flex-start;
            min-height: auto;
            padding-top: 0;
          }
          .gwh-hero-left {
            min-height: auto !important;
            padding-top: 70px !important;
            padding-bottom: 40px !important;
            justify-content: flex-start !important;
          }
          .gwh-hero-title-frame--home-glass {
            margin-top: 0;
          }
        }

        .gwh-hero-lede {
          position: relative;
          z-index: 1;
        }

        .gwh-hero-lede-rule {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 18px;
        }

        .gwh-hero-lede-rule--after {
          margin-bottom: 0;
          margin-top: 16px;
        }

        .gwh-hero-lede-line {
          flex: 1 1 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(201, 168, 76, 0.85) 50%,
            transparent 100%
          );
        }

        .gwh-hero-lede-ornament {
          flex-shrink: 0;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #6b7c3a;
          white-space: nowrap;
        }

        .gwh-hero-lede-text {
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 26px;
          line-height: 1.4;
          color: #1c1c1c;
          margin: 0;
          max-width: 520px;
        }

        .gwh-hero-lede-text em {
          font-style: italic;
          font-weight: 700;
          color: #c9a84c;
        }

        .gwh-hero-lede-rule {
          max-width: 520px;
        }

        @media (min-width: 1024px) {
          .gwh-hero-lede {
            text-align: left;
          }
        }

        /* Desktop — matched-width floating CTAs (static shadow, no loop animation) */
        @media (min-width: 769px) {
          .gwh-hero-cta-row {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
            width: 100%;
            max-width: 432px;
          }

          .gwh-hero-cta-row .gwh-hero-cta-primary,
          .gwh-hero-cta-row .gwh-hero-cta-secondary {
            width: 100%;
            min-height: 48px;
            height: 48px;
            padding-left: 12px !important;
            padding-right: 12px !important;
            border-radius: 8px !important;
            border-width: 1.5px !important;
            border-style: solid !important;
            box-sizing: border-box;
            justify-content: center;
            text-align: center;
            white-space: nowrap;
            box-shadow:
              0 10px 26px rgba(201, 168, 76, 0.26),
              0 4px 14px rgba(28, 28, 28, 0.08);
            transition:
              background-color 0.3s ease,
              color 0.3s ease,
              border-color 0.3s ease,
              box-shadow 0.3s ease,
              transform 0.3s ease;
          }

          .gwh-hero-cta-row .gwh-hero-cta-primary {
            border-color: rgba(255, 255, 255, 0.95) !important;
          }

          .gwh-hero-cta-row .gwh-hero-cta-secondary {
            background: rgba(255, 255, 255, 0.96) !important;
            border-color: var(--color-accent-gold) !important;
            box-shadow:
              0 10px 26px rgba(201, 168, 76, 0.16),
              0 4px 14px rgba(28, 28, 28, 0.08);
          }

          .gwh-hero-cta-row .gwh-hero-cta-primary:hover,
          .gwh-hero-cta-row .gwh-hero-cta-secondary:hover {
            transform: translateY(-3px);
          }

          .gwh-hero-cta-row .gwh-hero-cta-primary:hover {
            box-shadow:
              0 18px 40px rgba(201, 168, 76, 0.45),
              0 10px 24px rgba(28, 28, 28, 0.12);
          }

          .gwh-hero-cta-row .gwh-hero-cta-secondary:hover {
            box-shadow:
              0 16px 36px rgba(201, 168, 76, 0.35),
              0 10px 24px rgba(28, 28, 28, 0.1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gwh-scroll-col-1,
          .gwh-scroll-col-2,
          .gwh-scroll-col-3 {
            animation: none !important;
          }
        }

        /* ——— Mobile only ——— */
        @media (max-width: 768px) {
          .gwh-hero-root {
            min-height: auto;
          }
          .gwh-hero-inner {
            gap: 24px !important;
          }
          .gwh-hero-cta-shift {
            transform: translateY(0) !important;
          }
          .gwh-books-ticker {
            height: 340px !important;
            max-height: 340px;
            width: min(100%, calc(100vw - 32px));
            margin-left: auto;
            margin-right: auto;
          }
          .gwh-book-cover {
            height: 248px !important;
          }
          .gwh-hero-left {
            min-height: auto !important;
            padding-top: 70px !important;
            padding-bottom: 8px !important;
            justify-content: flex-start !important;
          }
          .gwh-hero-lede {
            width: 100%;
            max-width: 520px;
            margin-left: auto;
            margin-right: auto;
            text-align: center;
          }
          .gwh-hero-lede-rule {
            margin-left: auto;
            margin-right: auto;
          }
          .gwh-hero-lede-text {
            margin-left: auto;
            margin-right: auto;
          }
          .gwh-hero-lede-ornament {
            white-space: normal;
            text-align: center;
            line-height: 1.45;
            max-width: 9.5rem;
          }
          .gwh-hero-lede-rule--after .gwh-hero-lede-ornament {
            max-width: 13.5rem;
          }
          .gwh-hero-cta-secondary {
            display: none !important;
          }
          .gwh-hero-cta-row {
            margin-bottom: 18px !important;
          }
          .gwh-hero-cta-primary {
            width: auto;
            max-width: none;
            height: 44px !important;
            border-radius: 9999px !important;
            padding-left: 22px !important;
            padding-right: 22px !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            box-shadow: 0 6px 18px rgba(201, 168, 76, 0.22);
          }
          .gwh-hero-trust-legacy {
            display: none !important;
          }
          .gwh-hero-trust-bar {
            display: flex !important;
            width: 100%;
            max-width: 340px;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 22px !important;
            align-items: center;
            gap: 10px;
          }
          .gwh-hero-trust-line {
            flex: 1 1 0;
            height: 1px;
            background: linear-gradient(
              90deg,
              transparent 0%,
              rgba(201, 168, 76, 0.85) 50%,
              transparent 100%
            );
          }
          .gwh-hero-trust-copy {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            flex-shrink: 0;
            font-family: var(--font-inter), Inter, sans-serif;
            font-size: 12px;
            font-weight: 400;
            color: #8a8a8a;
            white-space: nowrap;
          }
          .gwh-hero-genres {
            display: flex !important;
            flex-wrap: nowrap !important;
            justify-content: flex-start !important;
            overflow-x: auto;
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            width: min(100%, calc(100vw - 32px));
            max-width: none;
            margin-left: auto;
            margin-right: auto;
            padding-bottom: 4px;
            gap: 8px !important;
          }
          .gwh-hero-genres::-webkit-scrollbar {
            display: none;
          }
          .gwh-hero-genre-pill {
            flex: 0 0 auto;
            width: auto;
            min-width: 96px;
            min-height: 36px;
            padding-left: 14px !important;
            padding-right: 14px !important;
            justify-content: center;
            border-radius: 9999px !important;
            border: 1px solid #e3e3e3 !important;
            background: #ffffff !important;
            color: #333333 !important;
            font-size: 12px !important;
            font-weight: 500 !important;
          }
        }
      `}</style>

      <div className="gwh-hero-inner mx-auto flex w-full max-w-[1200px] flex-col items-center gap-10 lg:min-h-0 lg:flex-row lg:items-start lg:gap-10">
        {/* ——— Left column: headline image flush under fixed nav ——— */}
        <div className="gwh-hero-left relative flex w-full flex-col items-center justify-start overflow-visible pb-[40px] pt-[70px] text-center lg:w-[55%] lg:items-start lg:text-left">
          <div className="gwh-hero-head-content">
          <HeroTitleFrame
            line1="Where Ideas"
            line2="Become Books."
            variant="home"
            titleStyle="home-glass"
            illustrationBg={{
              desktop: "/images/background-H1.webp",
              mobile: "/images/background-H1-mobile.webp",
            }}
            className="gwh-hero-animate gwh-hero-delay-0"
          />

          <div className="gwh-hero-lede gwh-hero-animate gwh-hero-delay-1 mb-7 mt-5 max-w-[520px]">
            <div className="gwh-hero-lede-rule" aria-hidden="true">
              <span className="gwh-hero-lede-line" />
              <span className="gwh-hero-lede-ornament">Full-service publishing</span>
              <span className="gwh-hero-lede-line" />
            </div>
            <p className="gwh-hero-lede-text">
              Professional ghostwriters, designers and editors — everything your
              book needs,{" "}
              <em>under one roof.</em>
            </p>
            <div
              className="gwh-hero-lede-rule gwh-hero-lede-rule--after"
              aria-hidden="true"
            >
              <span className="gwh-hero-lede-line" />
              <span className="gwh-hero-lede-ornament">
                Writing · Design · Editing · Publishing
              </span>
              <span className="gwh-hero-lede-line" />
            </div>
          </div>

          <div className="gwh-hero-cta-shift" style={{ transform: "translateY(24px)" }}>
            <div className="gwh-hero-cta-row gwh-hero-animate gwh-hero-delay-2 mb-6 mt-2 flex w-full flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href="#start"
                className="gwh-hero-cta-primary inline-flex h-11 min-w-0 flex-1 items-center justify-center rounded-[6px] bg-[var(--color-accent-gold)] px-7 font-inter text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#B8960C] md:max-w-none md:flex-none"
              >
                <span className="md:hidden">Start Your Book →</span>
                <span className="hidden md:inline">Start Your Book</span>
              </a>
              <a
                href="#how-it-works"
                className="gwh-hero-cta-secondary inline-flex h-11 min-w-0 flex-1 items-center justify-center rounded-[6px] border-[1.5px] border-[var(--color-accent-gold)] bg-transparent px-7 font-inter text-[14px] font-semibold text-[var(--color-accent-gold)] transition-colors duration-300 hover:bg-[var(--color-accent-gold)] hover:text-white md:max-w-none md:flex-none"
              >
                See How It Works
              </a>
            </div>

            <div
              className="gwh-hero-trust-bar gwh-hero-animate gwh-hero-delay-3 mx-auto hidden max-w-[340px] max-lg:flex"
              aria-label="Trust indicator"
            >
              <span className="gwh-hero-trust-line" aria-hidden="true" />
              <span className="gwh-hero-trust-copy">
                <HeroTrustPeopleIcon />
                Trusted by 500+ authors worldwide
              </span>
              <span className="gwh-hero-trust-line" aria-hidden="true" />
            </div>

            <p className="gwh-hero-trust-legacy gwh-hero-animate gwh-hero-delay-3 mb-6 hidden items-center justify-center gap-3 font-inter text-[13px] font-normal text-[#999999] lg:flex lg:justify-start">
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

            {/* Genre pills — sample row of four on mobile */}
            <ul className="gwh-hero-genres gwh-hero-animate gwh-hero-delay-4 mb-0 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              {genres.map((genre) => (
                <li key={genre} className="shrink-0">
                  <span className="gwh-hero-genre-pill inline-flex h-8 items-center justify-center whitespace-nowrap rounded-[20px] border border-[var(--color-border)] bg-[var(--color-card)] px-4 font-inter text-[12px] font-medium text-[var(--color-accent-olive)] transition-colors duration-300 hover:border-[var(--color-accent-gold)]">
                    {genre}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          </div>
        </div>

        {/* ——— Right column: seamless continuous book ticker ——— */}
        <div className="w-full lg:w-[45%] lg:self-stretch">
          <BookTicker />
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
