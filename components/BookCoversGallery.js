"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";

/**
 * GhostWriterHunt — Book Covers Gallery
 * Reedsy #MadeWithReedsy filterable cover grid +
 * Superside portfolio tiles with hover overlays.
 */

const TABS = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Biography",
  "Memoir",
  "Self-Help",
  "Business",
  "Children's",
  "Mystery",
  "Romance",
];

/** Titles and genres match cover art; Book-G4 excluded from gallery. */
const BOOKS = [
  {
    id: 1,
    title: "Art of Moving Forward",
    genre: "Self-Help",
    image: "/images/book-g-1.webp",
  },
  {
    id: 2,
    title: "La Ciudad Fortaleza",
    genre: "Fiction",
    image: "/images/book-g-2.webp",
  },
  {
    id: 3,
    title: "¡Cuenta Conmigo Pana!",
    genre: "Children's",
    image: "/images/book-g-3.webp",
  },
  {
    id: 4,
    title: "Encrypted Allyson",
    genre: "Biography",
    image: "/images/book-g-5.webp",
  },
  {
    id: 5,
    title: "You Can Change Your World By Speaking To It",
    genre: "Non-Fiction",
    image: "/images/book-g-6.webp",
  },
  {
    id: 6,
    title: "Southern Slang",
    genre: "Non-Fiction",
    image: "/images/book-g-7.webp",
  },
  {
    id: 7,
    title: "The Lost Skills of Independence",
    genre: "Self-Help",
    image: "/images/book-g-8.webp",
  },
  {
    id: 8,
    title: "The Ultimate Crown of Leadership",
    genre: "Business",
    image: "/images/book-g-9.webp",
  },
  {
    id: 9,
    title: "Trauma: The New Public Health Emergency in Education",
    genre: "Non-Fiction",
    image: "/images/book-g-10.webp",
  },
  {
    id: 10,
    title: "The Edible Candle Cookbook",
    genre: "Non-Fiction",
    image: "/images/book-g-11.webp",
  },
  {
    id: 11,
    title: "Encrypted Allyson",
    genre: "Biography",
    image: "/images/book-g-12.webp",
  },
  {
    id: 12,
    title: "The Everyday Dry Mix Pantry Cookbook",
    genre: "Non-Fiction",
    image: "/images/book-g-13.webp",
  },
];

export default function BookCoversGallery() {
  const { ref: sectionRef, visible } = useSectionReveal();
  const [activeTab, setActiveTab] = useState("All");

  const filteredBooks = useMemo(() => {
    if (activeTab === "All") return BOOKS;
    return BOOKS.filter((book) => book.genre === activeTab);
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="our-work"
      className="w-full bg-[var(--color-background)] py-[80px]"
      aria-label="Book covers gallery"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gwh-bcg-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes gwh-bcg-up {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gwh-bcg-card {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .gwh-bcg-label,
        .gwh-bcg-headline,
        .gwh-bcg-sub,
        .gwh-bcg-tabs,
        .gwh-bcg-card,
        .gwh-bcg-cta {
          opacity: 0;
        }

        .gwh-bcg-visible .gwh-bcg-label {
          animation: gwh-bcg-fade 0.5s ease-out forwards;
        }

        .gwh-bcg-visible .gwh-bcg-headline {
          animation: gwh-bcg-up 0.5s ease-out 0.05s forwards;
        }

        .gwh-bcg-visible .gwh-bcg-sub {
          animation: gwh-bcg-up 0.5s ease-out 0.1s forwards;
        }

        .gwh-bcg-visible .gwh-bcg-tabs {
          animation: gwh-bcg-fade 0.5s ease-out 0.15s forwards;
        }

        .gwh-bcg-visible .gwh-bcg-card {
          animation: gwh-bcg-card 0.5s ease-out forwards;
        }

        .gwh-bcg-visible .gwh-bcg-cta {
          animation: gwh-bcg-fade 0.5s ease-out 0.6s forwards;
        }

        @media (max-width: 768px) {
          .gwh-bcg-tabs {
            flex-wrap: nowrap !important;
            justify-content: flex-start !important;
            overflow-x: auto;
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            gap: 8px !important;
            margin-left: -20px;
            margin-right: -20px;
            padding-left: 20px;
            padding-right: 20px;
            padding-bottom: 6px;
          }
          .gwh-bcg-tabs::-webkit-scrollbar {
            display: none;
          }
          .gwh-bcg-tab {
            flex: 0 0 auto;
            min-width: 92px;
            min-height: 40px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 8px 14px !important;
            font-size: 13px !important;
            letter-spacing: 0.01em;
            border-radius: 999px !important;
            box-shadow: 0 1px 0 rgba(201, 168, 76, 0.12);
          }
        }
      ` }} />

      <div
        className={`mx-auto max-w-[1200px] overflow-x-hidden px-5 sm:px-6 ${visible ? "gwh-bcg-visible" : ""}`}
      >
        <p className="gwh-bcg-label mb-4 text-center font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent-olive)]">
          Published Work
        </p>

        <h2 className="gwh-bcg-headline mb-4 text-center font-playfair text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] lg:text-[56px]">
          <span className="block font-normal">Books brought</span>
          <span className="block italic text-[var(--color-accent-gold)]">
            brought to life.
          </span>
        </h2>

        <p className="gwh-bcg-sub mx-auto mb-12 max-w-[560px] text-center font-inter text-[16px] font-normal leading-[1.7] text-[#666666]">
          A selection of books written, designed and published by the
          GhostWriterHunt team, across every genre and format.
        </p>

        {/* Genre filter tabs — Reedsy style */}
        <div
          className="gwh-bcg-tabs mb-12 flex flex-wrap items-center justify-center gap-2.5"
          role="tablist"
          aria-label="Filter by genre"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab)}
                className={`gwh-bcg-tab rounded-[20px] px-5 py-2 font-inter text-[14px] font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[var(--color-accent-gold)] text-white"
                    : "border border-[var(--color-border)] bg-[var(--color-card)] text-[#666666] hover:border-[var(--color-accent-gold)]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Book covers grid */}
        <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {filteredBooks.map((book, index) => (
            <li
              key={`${activeTab}-${book.id}`}
              className="gwh-bcg-card group relative aspect-[2/3] cursor-pointer overflow-hidden rounded-xl focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--color-accent-gold)]"
              style={{ animationDelay: `${0.2 + index * 0.08}s` }}
            >
              <Image
                src={book.image}
                alt={`Cover of ${book.title}`}
                width={400}
                height={600}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
                loading="lazy"
                fetchPriority={index < 2 ? "auto" : "low"}
              />

              {/* Hover overlay — slides up from bottom */}
              <div className="absolute inset-0 flex translate-y-full flex-col items-center justify-end bg-[rgba(28,28,28,0.85)] p-5 text-center transition-transform duration-300 ease-in-out group-hover:translate-y-0 group-focus-within:translate-y-0 max-md:group-active:translate-y-0">
                <h3 className="mb-3 font-playfair text-[18px] font-bold text-white">
                  {book.title}
                </h3>
                <span className="inline-block rounded-[20px] bg-[var(--color-accent-gold)] px-3 py-1 font-inter text-[12px] font-medium text-white">
                  {book.genre}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="gwh-bcg-cta mt-12 text-center">
          <a
            href="#our-work"
            className="inline-block rounded-[6px] border-2 border-[var(--color-accent-gold)] bg-transparent px-9 py-3.5 font-inter text-[15px] font-semibold text-[var(--color-accent-gold)] transition-all duration-300 hover:bg-[var(--color-accent-gold)] hover:text-white"
          >
            View All Work
          </a>
        </div>
      </div>
    </section>
  );
}
