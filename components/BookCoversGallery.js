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

const BOOKS = [
  {
    id: 1,
    title: "The Last Summer",
    genre: "Fiction",
    writer: "Written by Sarah Mitchell",
    image:
      "/images/book-H6.webp",
  },
  {
    id: 2,
    title: "Leading With Purpose",
    genre: "Non-Fiction",
    writer: "Written by Dr. Amanda Clarke",
    image:
      "/images/book-H13.webp",
  },
  {
    id: 3,
    title: "A Life Remembered",
    genre: "Biography",
    writer: "Written by Robert Callahan",
    image:
      "/images/books-9.webp",
  },
  {
    id: 4,
    title: "Finding My Way Home",
    genre: "Memoir",
    writer: "Written by Sarah Mitchell",
    image:
      "/images/Books-2.webp",
  },
  {
    id: 5,
    title: "The Power Within",
    genre: "Self-Help",
    writer: "Written by Dr. Amanda Clarke",
    image:
      "/images/books-11.webp",
  },
  {
    id: 6,
    title: "The Entrepreneur's Edge",
    genre: "Business",
    writer: "Written by Dr. Marcus Chen",
    image:
      "/images/book-H14.webp",
  },
  {
    id: 7,
    title: "The Little Star",
    genre: "Children's",
    writer: "Written by Priya Sharma",
    image:
      "/images/books-fairy-lights.webp",
  },
  {
    id: 8,
    title: "Shadows at Midnight",
    genre: "Mystery",
    writer: "Written by James Whitmore",
    image:
      "/images/books-7.webp",
  },
  {
    id: 9,
    title: "When Hearts Collide",
    genre: "Romance",
    writer: "Written by Isabella Romano",
    image:
      "/images/books-3.webp",
  },
  {
    id: 10,
    title: "Beyond the Horizon",
    genre: "Fiction",
    writer: "Written by James Whitmore",
    image:
      "/images/book-H2.webp",
  },
  {
    id: 11,
    title: "The Science of Success",
    genre: "Non-Fiction",
    writer: "Written by Dr. Marcus Chen",
    image:
      "/images/book-H8.webp",
  },
  {
    id: 12,
    title: "My Father's Legacy",
    genre: "Biography",
    writer: "Written by Robert Callahan",
    image:
      "/images/books-6.webp",
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
      <style>{`
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
      `}</style>

      <div
        className={`mx-auto max-w-[1200px] overflow-x-hidden px-5 sm:px-6 ${visible ? "gwh-bcg-visible" : ""}`}
      >
        <p className="gwh-bcg-label mb-4 text-center font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent-olive)]">
          Our Work
        </p>

        <h2 className="gwh-bcg-headline mb-4 text-center font-playfair text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] lg:text-[56px]">
          <span className="block font-normal">Books we have</span>
          <span className="block italic text-[var(--color-accent-gold)]">
            brought to life.
          </span>
        </h2>

        <p className="gwh-bcg-sub mx-auto mb-12 max-w-[560px] text-center font-inter text-[16px] font-normal leading-[1.7] text-[#666666]">
          A selection of books written, designed and published by our
          professional team — across every genre and format.
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
              className="gwh-bcg-card group relative aspect-[2/3] cursor-pointer overflow-hidden rounded-xl"
              style={{ animationDelay: `${0.2 + index * 0.08}s` }}
            >
              <Image
                src={book.image}
                alt={`Cover of ${book.title}`}
                width={400}
                height={600}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
                loading={index < 4 ? "eager" : "lazy"}
                fetchPriority={index < 2 ? "auto" : "low"}
              />

              {/* Hover overlay — slides up from bottom */}
              <div className="absolute inset-0 flex translate-y-full flex-col items-center justify-end bg-[rgba(28,28,28,0.85)] p-5 text-center transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                <h3 className="mb-3 font-playfair text-[18px] font-bold text-white">
                  {book.title}
                </h3>
                <span className="mb-2 inline-block rounded-[20px] bg-[var(--color-accent-gold)] px-3 py-1 font-inter text-[12px] font-medium text-white">
                  {book.genre}
                </span>
                <p className="font-inter text-[13px] font-normal text-[var(--color-border)]">
                  {book.writer}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="gwh-bcg-cta mt-12 text-center">
          <a
            href="#our-work"
            className="inline-block rounded-[6px] border-2 border-[var(--color-accent-gold)] bg-transparent px-9 py-3.5 font-inter text-[15px] font-semibold text-[var(--color-accent-gold)] transition-all duration-300 hover:bg-[var(--color-accent-gold)] hover:text-white"
          >
            View All Our Work
          </a>
        </div>
      </div>
    </section>
  );
}
