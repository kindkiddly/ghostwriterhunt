/**
 * GhostWriterHunt — Hero section
 * Reedsy two-column hero: text left, continuous upward
 * book-cover ticker columns on the right (like a conveyor).
 */

const COLUMN_1 = [
  "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1621600411688-4be93c2c1e3f?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1603284569248-821525309698?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1618365908648-e71bd5716ccd?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1604882741050-31e4a9f50e51?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1594666757003-3ee20de41568?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1590953571791-8c547c185428?w=160&h=240&fit=crop",
];

const COLUMN_2 = [
  "https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1612969308146-066d55f37ccb?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1589998059171-988d887df646?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1623521145952-1f3c5e0b3b3b?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=160&h=240&fit=crop",
];

const COLUMN_3 = [
  "https://images.unsplash.com/photo-1606185540834-d6d8f4f7b7c6?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1602992708529-c9fdb12905c9?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=160&h=240&fit=crop",
  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=160&h=240&fit=crop",
];

function BookCover({ src, alt }) {
  return (
    // Regular img — faster / simpler for continuous CSS ticker motion
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={{
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "8px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        flexShrink: 0,
        display: "block",
      }}
    />
  );
}

/**
 * One vertical ticker column.
 * Images are rendered twice so translateY(-50%) loops seamlessly.
 */
function ScrollColumn({ images, className, label }) {
  const loop = [...images, ...images];

  return (
    <div
      className={`flex w-[calc(33.333%-8px)] shrink-0 flex-col gap-3 ${className}`}
      aria-label={label}
    >
      {loop.map((src, i) => (
        <BookCover
          key={`${label}-${i}`}
          src={src}
          alt={`Book cover ${(i % images.length) + 1}`}
        />
      ))}
    </div>
  );
}

function BookTicker() {
  return (
    <div
      className="gwh-books-ticker relative h-[300px] w-full overflow-hidden lg:h-[520px]"
      aria-label="Featured book covers"
    >
      <div className="flex h-full flex-row gap-3">
        <ScrollColumn
          images={COLUMN_1}
          className="gwh-scroll-col-1"
          label="Book column 1"
        />
        <ScrollColumn
          images={COLUMN_2}
          className="gwh-scroll-col-2"
          label="Book column 2"
        />
        <ScrollColumn
          images={COLUMN_3}
          className="gwh-scroll-col-3"
          label="Book column 3"
        />
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

        /* Continuous conveyor — duplicate content → translate ±50% loops seamlessly */
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }

        @keyframes scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
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

        .gwh-scroll-col-1 {
          animation: scrollUp 18s linear infinite;
        }

        .gwh-scroll-col-2 {
          animation: scrollDown 22s linear infinite;
        }

        .gwh-scroll-col-3 {
          animation: scrollUp 15s linear infinite;
        }

        /* Pause all columns when hovering the ticker */
        .gwh-books-ticker:hover .gwh-scroll-col-1,
        .gwh-books-ticker:hover .gwh-scroll-col-2,
        .gwh-books-ticker:hover .gwh-scroll-col-3 {
          animation-play-state: paused;
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

        {/* ——— Right column: continuous upward book ticker ——— */}
        <div className="w-full lg:w-[45%]">
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
