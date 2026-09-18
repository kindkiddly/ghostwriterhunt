"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * GhostWriterHunt — Testimonials
 * Reedsy-length author quotes + Superside carousel (name, title, photo).
 * Auto-rotates every 5s in sets of 3; pauses on hover.
 */

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Working with GhostWriterHunt was the best decision I made for my book. Sarah understood my voice from our very first conversation and the final manuscript moved me to tears. My memoir has since touched thousands of readers and I could not be more grateful.",
    author: "Margaret Thompson",
    details: "Author of 'Finding My Way Home' · Jan 2026",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=96&h=96&fit=crop&crop=face",
  },
  {
    id: 2,
    quote:
      "I had an idea for a business book but no idea how to structure it. Dr. Amanda Clarke not only wrote it beautifully but helped me develop ideas I had not even considered. The book has become my most powerful marketing tool and has brought me dozens of new clients.",
    author: "David Harrison",
    details: "Author of 'The Entrepreneur's Edge' · Mar 2026",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=96&h=96&fit=crop&crop=face",
  },
  {
    id: 3,
    quote:
      "James Whitmore captured my thriller concept perfectly — the pacing, the tension, the twists. Every chapter was better than I imagined. My book hit the Amazon bestseller list in its first week and I am already working on my second book with GhostWriterHunt.",
    author: "Kevin O'Brien",
    details: "Author of 'Shadows at Midnight' · Feb 2026",
    photo:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=96&h=96&fit=crop&crop=face",
  },
  {
    id: 4,
    quote:
      "Priya has a gift for writing children's stories that feel magical and real at the same time. My daughter reads the book we created together every single night. Knowing that our family story will live on forever as a beautiful book means everything to me.",
    author: "Linda Chen",
    details: "Author of 'The Little Star' · Apr 2026",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&h=96&fit=crop&crop=face",
  },
  {
    id: 5,
    quote:
      "The entire process from consultation to published book took just 6 weeks. The team was professional, responsive and genuinely passionate about my story. My biography of my grandfather is now a cherished family treasure and I am so proud to have it published globally.",
    author: "Thomas Williams",
    details: "Author of 'A Life Remembered' · May 2026",
    photo:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=96&h=96&fit=crop&crop=face",
  },
  {
    id: 6,
    quote:
      "Isabella Romano wrote my romance novel with such emotional depth and passion. Readers have told me they could not put it down. The cover design is stunning and the whole experience of working with GhostWriterHunt was seamless and truly enjoyable from start to finish.",
    author: "Sofia Martinez",
    details: "Author of 'When Hearts Collide' · Jun 2026",
    photo:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=96&h=96&fit=crop&crop=face",
  },
  {
    id: 7,
    quote:
      "As a scientist I had never written a book before. Dr. Marcus Chen translated my complex research into a book that is both accessible and compelling. My colleagues were amazed at how readable it is. GhostWriterHunt exceeded every expectation I had.",
    author: "Prof. Rachel Adams",
    details: "Author of 'The Science of Success' · Jul 2026",
    photo:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=96&h=96&fit=crop&crop=face",
  },
  {
    id: 8,
    quote:
      "Robert Callahan spent weeks interviewing me and my family before writing a single word. The level of care and dedication he showed to getting every detail right was extraordinary. Our family history is now preserved forever in a beautifully written book.",
    author: "Charles Bennett",
    details: "Author of 'My Father's Legacy' · Aug 2026",
    photo:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=96&h=96&fit=crop&crop=face",
  },
  {
    id: 9,
    quote:
      "I gave GhostWriterHunt just a rough outline and some notes. What came back was a fully realized self-help book that captured my philosophy perfectly. The editing, cover design and publishing support were all exceptional. I cannot recommend them highly enough.",
    author: "Jennifer Walsh",
    details: "Author of 'The Power Within' · Sep 2026",
    photo:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=96&h=96&fit=crop&crop=face",
  },
];

const TOTAL_SETS = 3; // 9 testimonials → 3 sets of 3

function Stars() {
  return (
    <div className="mb-4 flex gap-1" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="#C9A84C"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M8 1.5l1.76 3.56 3.93.57-2.84 2.77.67 3.91L8 10.9l-3.52 1.85.67-3.91L2.31 5.63l3.93-.57L8 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ item }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-9 py-10 shadow-[0_4px_24px_rgba(201,168,76,0.08)]">
      <Stars />

      <span
        className="mb-2 block font-playfair text-[80px] font-bold leading-none text-[var(--color-border)]"
        aria-hidden="true"
      >
        “
      </span>

      <p className="mb-6 flex-1 font-playfair text-[16px] italic leading-[1.8] text-[#444444]">
        {item.quote}
      </p>

      <div className="flex items-center gap-3">
        <Image
          src={item.photo}
          alt={item.author}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full border-2 border-[var(--color-border)] object-cover object-top"
        />
        <div>
          <p className="font-playfair text-[16px] font-bold text-[var(--color-text)]">
            {item.author}
          </p>
          <p className="font-inter text-[13px] font-normal text-[#999999]">
            {item.details}
          </p>
        </div>
      </div>
    </article>
  );
}

function ArrowButton({ direction, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-accent-gold)] transition-all duration-300 hover:bg-[var(--color-accent-gold)] hover:text-white md:flex"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {direction === "prev" ? (
          <path
            d="M11 4L6 9l5 5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M7 4l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [setIndex, setSetIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [perView, setPerView] = useState(3);

  // Responsive cards per view: 3 desktop / 2 tablet / 1 mobile
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerView(1);
      else if (window.innerWidth < 1024) setPerView(2);
      else setPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Total pages depends on cards visible (sets of 3 for desktop matching data groups)
  const pageCount =
    perView === 3
      ? TOTAL_SETS
      : Math.ceil(TESTIMONIALS.length / perView);

  const goTo = useCallback(
    (next) => {
      setSetIndex(((next % pageCount) + pageCount) % pageCount);
    },
    [pageCount]
  );

  const goNext = useCallback(() => goTo(setIndex + 1), [goTo, setIndex]);
  const goPrev = useCallback(() => goTo(setIndex - 1), [goTo, setIndex]);

  // Auto-advance every 5s (paused on hover)
  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(goNext, 5000);
    return () => clearInterval(id);
  }, [paused, goNext]);

  // Keep setIndex in range when pageCount changes
  useEffect(() => {
    if (setIndex >= pageCount) setSetIndex(0);
  }, [pageCount, setIndex]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Slide offset: track is pageCount × viewport wide; move by one page each step
  const trackTranslate = `translateX(-${(setIndex * 100) / pageCount}%)`;

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="w-full bg-[var(--color-card)] py-[80px]"
      aria-label="Client testimonials"
    >
      <style>{`
        @keyframes gwh-tm-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes gwh-tm-up {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gwh-tm-label,
        .gwh-tm-headline,
        .gwh-tm-sub,
        .gwh-tm-carousel {
          opacity: 0;
        }

        .gwh-tm-visible .gwh-tm-label {
          animation: gwh-tm-fade 0.5s ease-out forwards;
        }

        .gwh-tm-visible .gwh-tm-headline {
          animation: gwh-tm-up 0.5s ease-out 0.05s forwards;
        }

        .gwh-tm-visible .gwh-tm-sub {
          animation: gwh-tm-up 0.5s ease-out 0.1s forwards;
        }

        .gwh-tm-visible .gwh-tm-carousel {
          animation: gwh-tm-fade 0.5s ease-out 0.2s forwards;
        }
      `}</style>

      <div
        className={`mx-auto max-w-[1200px] overflow-x-hidden px-5 sm:px-6 ${visible ? "gwh-tm-visible" : ""}`}
      >
        <p className="gwh-tm-label mb-4 text-center font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent-olive)]">
          Client Stories
        </p>

        <h2 className="gwh-tm-headline mb-4 text-center font-playfair text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] lg:text-[56px]">
          <span className="block font-normal">Authors who trusted</span>
          <span className="block italic text-[var(--color-accent-gold)]">
            us with their story.
          </span>
        </h2>

        <p className="gwh-tm-sub mx-auto mb-[70px] max-w-[560px] text-center font-inter text-[16px] font-normal leading-[1.7] text-[#666666]">
          Real authors. Real books. Real results — hear what our clients say
          about working with GhostWriterHunt.
        </p>

        <div
          className="gwh-tm-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex items-center gap-4">
            <ArrowButton direction="prev" onClick={goPrev} label="Previous testimonials" />

            <div className="relative w-full overflow-hidden">
              <div
                className="flex transition-transform duration-[400ms] ease-in-out"
                style={{
                  width: `${pageCount * 100}%`,
                  transform: trackTranslate,
                }}
              >
                {Array.from({ length: pageCount }).map((_, page) => {
                  const start = page * perView;
                  const pageItems = TESTIMONIALS.slice(start, start + perView);

                  return (
                    <div
                      key={page}
                      className="grid gap-6 px-1"
                      style={{
                        width: `${100 / pageCount}%`,
                        gridTemplateColumns: `repeat(${perView}, minmax(0, 1fr))`,
                      }}
                    >
                      {pageItems.map((item) => (
                        <TestimonialCard key={item.id} item={item} />
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            <ArrowButton direction="next" onClick={goNext} label="Next testimonials" />
          </div>

          {/* Navigation dots */}
          <div className="mt-10 flex items-center justify-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial set ${i + 1}`}
                aria-current={setIndex === i}
                onClick={() => goTo(i)}
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  setIndex === i
                    ? "bg-[var(--color-accent-gold)]"
                    : "bg-[var(--color-border)]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
