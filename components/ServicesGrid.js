"use client";

import { useEffect, useRef, useState } from "react";

/**
 * GhostWriterHunt — Services Grid
 * Superside capability cards + chip tags;
 * Reedsy warm narrative service storytelling.
 * Scroll reveals via Intersection Observer + CSS only.
 */

const SERVICES = [
  {
    id: "ghostwriting",
    icon: "pen",
    title: "Professional Ghostwriting",
    description:
      "Expert ghostwriters craft your complete book in your voice — fiction, non-fiction, memoir, biography, business and more. Any genre, any length.",
  },
  {
    id: "editing",
    icon: "edit",
    title: "Manuscript Editing",
    description:
      "Developmental editing, line editing, copy editing and proofreading — your manuscript refined to publication standard by seasoned editors.",
  },
  {
    id: "cover",
    icon: "palette",
    title: "Book Cover Design",
    description:
      "Custom covers designed to stop readers instantly — crafted for Amazon KDP, Kindle, Apple Books and every major digital platform.",
  },
  {
    id: "layout",
    icon: "layout",
    title: "Interior Layout and Formatting",
    description:
      "Every page designed beautifully — chapter headings, typography, spacing, page numbers and full interior layout formatted for digital reading.",
  },
  {
    id: "illustration",
    icon: "brush",
    title: "Illustration and Graphics",
    description:
      "Custom illustrations, chapter artwork and visual storytelling — from children's book art to non-fiction diagrams and infographics.",
  },
  {
    id: "publishing",
    icon: "ebook",
    title: "eBook Publishing",
    description:
      "Your finished book converted and published on Amazon KDP, Apple Books, Kobo, Google Play Books and 47+ global platforms worldwide.",
  },
  {
    id: "branding",
    icon: "star",
    title: "Author Branding",
    description:
      "Professional author bio, website copy, social media presence and brand identity — establish your voice and authority as a published author.",
  },
  {
    id: "marketing",
    icon: "megaphone",
    title: "Book Marketing",
    description:
      "Strategic book marketing, Amazon listing optimization, review generation and promotional campaigns to maximize your book's visibility and sales.",
  },
];

const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Biography",
  "Memoir",
  "Self-Help",
  "Business",
  "Children's",
  "Mystery",
  "Thriller",
  "Romance",
  "Fantasy",
  "Poetry",
];

function ServiceIcon({ type }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 28 28",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  };

  switch (type) {
    case "pen":
      return (
        <svg {...common}>
          <path
            d="M18.5 5.5l4 4L11 21H7v-4L18.5 5.5z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M16.5 7.5l4 4M6 24h16"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "edit":
      return (
        <svg {...common}>
          <path
            d="M5 14l5 5L23 6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 22h18"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "palette":
      return (
        <svg {...common}>
          <rect
            x="5"
            y="6"
            width="18"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="11" cy="12" r="1.5" fill="currentColor" />
          <circle cx="17" cy="12" r="1.5" fill="currentColor" />
          <path
            d="M9 16h10"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "layout":
      return (
        <svg {...common}>
          <path
            d="M8 5h9a3 3 0 013 3v12a1 1 0 01-1 1H8a3 3 0 01-3-3V8a3 3 0 013-3z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M10 10h6M10 14h6M10 18h4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "brush":
      return (
        <svg {...common}>
          <path
            d="M8 20c0-2 1.5-3.5 3.5-3.5S15 18 15 20c0 1.5-1 2.5-2.5 2.5H10C8.5 22.5 8 21.5 8 20z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M11.5 16.5L20 5.5l2.5 2.5-8.5 11"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "ebook":
      return (
        <svg {...common}>
          <rect
            x="8"
            y="4"
            width="12"
            height="20"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M12 7h4M14 21h.01"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <circle
            cx="14"
            cy="10"
            r="3.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M7 23c1.5-3.5 4-5 7-5s5.5 1.5 7 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M20 6.5l1 2 2 .3-1.5 1.5.4 2.2L20 11.5l-2 .9.4-2.2L17 8.8l2-.3 1-2z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "megaphone":
    default:
      return (
        <svg {...common}>
          <path
            d="M5 12v4h3l7 4V8L8 12H5z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M18 11c1 .8 1.5 1.8 1.5 3s-.5 2.2-1.5 3M8 16v3.5a1.5 1.5 0 003 0V16"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export default function ServicesGrid() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Reveal once when ~15% of the section is visible
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
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    requestAnimationFrame(() => {
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full overflow-hidden border-0 bg-[#1C1C1C] py-[80px]"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 100% 0%, rgba(201,168,76,0.06) 0%, transparent 60%),
          radial-gradient(ellipse at 0% 100%, rgba(201,168,76,0.06) 0%, transparent 60%)
        `,
      }}
      aria-label="Services"
    >
      <style>{`
        @keyframes gwh-svc-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes gwh-svc-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gwh-svc-label,
        .gwh-svc-headline,
        .gwh-svc-sub,
        .gwh-svc-card,
        .gwh-svc-genres {
          opacity: 0;
        }

        .gwh-svc-visible .gwh-svc-label {
          animation: gwh-svc-fade 0.5s ease-out forwards;
        }

        .gwh-svc-visible .gwh-svc-headline {
          animation: gwh-svc-up 0.5s ease-out 0.05s forwards;
        }

        .gwh-svc-visible .gwh-svc-sub {
          animation: gwh-svc-up 0.5s ease-out 0.1s forwards;
        }

        .gwh-svc-visible .gwh-svc-card:nth-child(1) { animation: gwh-svc-up 0.5s ease-out 0.15s forwards; }
        .gwh-svc-visible .gwh-svc-card:nth-child(2) { animation: gwh-svc-up 0.5s ease-out 0.25s forwards; }
        .gwh-svc-visible .gwh-svc-card:nth-child(3) { animation: gwh-svc-up 0.5s ease-out 0.35s forwards; }
        .gwh-svc-visible .gwh-svc-card:nth-child(4) { animation: gwh-svc-up 0.5s ease-out 0.45s forwards; }
        .gwh-svc-visible .gwh-svc-card:nth-child(5) { animation: gwh-svc-up 0.5s ease-out 0.55s forwards; }
        .gwh-svc-visible .gwh-svc-card:nth-child(6) { animation: gwh-svc-up 0.5s ease-out 0.65s forwards; }
        .gwh-svc-visible .gwh-svc-card:nth-child(7) { animation: gwh-svc-up 0.5s ease-out 0.75s forwards; }
        .gwh-svc-visible .gwh-svc-card:nth-child(8) { animation: gwh-svc-up 0.5s ease-out 0.85s forwards; }

        .gwh-svc-visible .gwh-svc-genres {
          animation: gwh-svc-fade 0.5s ease-out 1s forwards;
        }

        @media (max-width: 768px) {
          .gwh-svc-inner {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>

      <div
        className={`gwh-svc-inner mx-auto max-w-[1200px] px-6 ${visible ? "gwh-svc-visible" : ""}`}
      >
        {/* Section label */}
        <p className="gwh-svc-label mb-4 text-center font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[#C9A84C]">
          What We Do
        </p>

        {/* Headline */}
        <h2 className="gwh-svc-headline mb-4 text-center font-playfair text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-[#FFFFFF] lg:text-[56px]">
          <span className="block font-normal">Every service your book</span>
          <span className="block italic text-[#C9A84C]">
            will ever need.
          </span>
        </h2>

        {/* Subtext */}
        <p className="gwh-svc-sub mx-auto mb-[70px] max-w-[560px] text-center font-inter text-[16px] font-normal leading-[1.7] text-[#999999]">
          From the first word to the final published page — our professionals
          handle every detail.
        </p>

        {/* Services grid: 1 → 2 → 4 columns */}
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <li
              key={service.id}
              className="gwh-svc-card group relative overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.2)] bg-[#2A2A2A] p-7 shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:border-[rgba(201,168,76,0.6)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.4)]"
            >
              {/* Top gold accent */}
              <div
                className="absolute inset-x-0 top-0 h-[3px] bg-[#C9A84C]"
                aria-hidden="true"
              />

              {/* Icon circle */}
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(201,168,76,0.1)] text-[#C9A84C]">
                <ServiceIcon type={service.icon} />
              </div>

              <h3 className="mb-3 font-playfair text-[20px] font-bold text-[#FFFFFF]">
                {service.title}
              </h3>

              <p className="font-inter text-[14px] font-normal leading-[1.8] text-[#999999]">
                {service.description}
              </p>

              <a
                href={`#${service.id}`}
                className="mt-4 inline-block font-inter text-[14px] font-medium text-[#C9A84C] no-underline transition-colors duration-300 hover:text-[#B8960C] hover:underline"
              >
                Learn more →
              </a>
            </li>
          ))}
        </ul>

        {/* Genre chips — centered wrap inside a soft bordered panel */}
        <div className="gwh-svc-genres mx-auto mt-12 flex max-w-[900px] flex-wrap items-center justify-center gap-2.5 rounded-2xl border border-[rgba(201,168,76,0.2)] bg-[#2A2A2A] px-6 py-8">
          <p className="mb-4 w-full text-center font-inter text-[14px] font-medium text-[#999999]">
            Genres we cover:
          </p>
          {GENRES.map((genre) => (
            <span
              key={genre}
              className="inline-block shrink-0 cursor-default whitespace-nowrap rounded-[20px] border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.1)] px-[18px] py-2 font-inter text-[13px] font-medium text-[#C9A84C] transition-colors duration-300 hover:border-[rgba(201,168,76,0.6)]"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
