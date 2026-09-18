"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * GhostWriterHunt — Writer Profiles
 * Superside-style rich talent cards + Reedsy warm literary profiles.
 * Portrait photos from Unsplash (swappable for local assets later).
 */

const WRITERS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    title: "Fiction and Memoir Specialist",
    bio: "With over 12 years crafting compelling narratives, Sarah has helped more than 80 authors find their voice. Her work spans literary fiction, personal memoir and biography.",
    chips: ["Fiction", "Memoir", "Biography"],
    quote: "Every story deserves to be told with honesty and grace.",
    gender: "female",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "James Whitmore",
    title: "Mystery and Thriller Specialist",
    bio: "A former journalist turned bestselling ghostwriter, James crafts page-turning mysteries and thrillers with authentic detail and relentless pacing that keeps readers hooked.",
    chips: ["Mystery", "Thriller", "Fiction"],
    quote: "Every great thriller starts with one question the reader must answer.",
    gender: "male",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Dr. Amanda Clarke",
    title: "Non-Fiction and Business Expert",
    bio: "A former publisher with a PhD in English Literature, Amanda transforms complex ideas into compelling non-fiction books that establish authority and build lasting reader trust.",
    chips: ["Non-Fiction", "Business", "Self-Help"],
    quote: "A great non-fiction book changes how people think about the world.",
    gender: "female",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Dr. Marcus Chen",
    title: "Academic and Technical Writer",
    bio: "With a background in research and academia, Marcus translates complex technical and scientific content into accessible, engaging books that inform and inspire.",
    chips: ["Technical", "Academic", "Non-Fiction"],
    quote: "Clarity is the highest form of expertise.",
    gender: "male",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Isabella Romano",
    title: "Romance and Fantasy Writer",
    bio: "Isabella brings worlds to life with vivid imagination and emotional depth. Her romance and fantasy novels have captivated readers across three continents.",
    chips: ["Romance", "Fantasy", "Fiction"],
    quote: "I write the stories readers lose themselves in completely.",
    gender: "female",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: 7,
    name: "Robert Callahan",
    title: "Biography and History Expert",
    bio: "Robert has dedicated 15 years to preserving life stories and historical narratives. His meticulous research and powerful storytelling have earned him recognition as one of the finest biography writers in the industry.",
    chips: ["Biography", "History", "Memoir"],
    quote: "Every life lived is a story worth telling beautifully.",
    gender: "male",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Priya Sharma",
    title: "Children's Books and Poetry",
    bio: "Priya specializes in creating magical worlds for young readers. Her gentle, imaginative style has produced over 40 published children's books loved by families worldwide.",
    chips: ["Children's", "Poetry", "Fiction"],
    quote: "The right story at the right age can change a child's life forever.",
    gender: "female",
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face",
  },
];

function WriterCard({ writer, index }) {
  return (
    <article
      className="gwh-wp-card group flex h-full flex-col items-center rounded-[20px] border border-[var(--color-border)] bg-[var(--color-card)] px-7 py-9 text-center shadow-[0_4px_24px_rgba(201,168,76,0.08)] transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[var(--color-accent-gold)] hover:shadow-[0_12px_40px_rgba(201,168,76,0.16)]"
      style={{ animationDelay: `${0.15 + index * 0.1}s` }}
    >
      {/* Replace with real writer photo later */}
      {/* Real photo: /images/writers/writer-{writer.id}.jpg */}
      <Image
        src={writer.photo}
        alt={writer.name}
        width={100}
        height={100}
        className="mb-5 h-[100px] w-[100px] rounded-full border-[3px] border-[var(--color-border)] object-cover object-top"
      />

      <h3 className="mb-1 font-playfair text-[20px] font-bold text-[var(--color-text)]">
        {writer.name}
      </h3>

      <p className="mb-4 font-inter text-[13px] font-medium text-[var(--color-accent-gold)]">
        {writer.title}
      </p>

      <p className="mb-4 font-inter text-[14px] font-normal leading-[1.7] text-[#666666]">
        {writer.bio}
      </p>

      {/* Specialty chips */}
      <ul className="mb-4 flex flex-wrap items-center justify-center gap-2">
        {writer.chips.map((chip) => (
          <li key={chip}>
            <span className="inline-block rounded-[20px] border border-[var(--color-border)] bg-[#FDF6E3] px-3.5 py-1.5 font-inter text-[12px] font-medium text-[var(--color-accent-olive)]">
              {chip}
            </span>
          </li>
        ))}
      </ul>

      {/* Personality quote */}
      <blockquote className="mt-4 w-full border-l-[3px] border-[var(--color-accent-gold)] pl-3 text-left font-playfair text-[14px] italic leading-relaxed text-[#999999]">
        “{writer.quote}”
      </blockquote>

      <a
        href="#start"
        className="mt-5 block w-full rounded-[6px] border border-[var(--color-accent-gold)] bg-transparent px-5 py-2.5 text-center font-inter text-[13px] font-medium text-[var(--color-accent-gold)] transition-all duration-300 ease-in-out hover:bg-[var(--color-accent-gold)] hover:text-white"
      >
        Request a Quote
      </a>
    </article>
  );
}

export default function WriterProfiles() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const rowOne = WRITERS.slice(0, 4);
  const rowTwo = WRITERS.slice(4);

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
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="writers"
      className="w-full bg-[var(--color-card)] py-[120px]"
      aria-label="Writer profiles"
    >
      <style>{`
        @keyframes gwh-wp-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes gwh-wp-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gwh-wp-label,
        .gwh-wp-headline,
        .gwh-wp-sub,
        .gwh-wp-card,
        .gwh-wp-cta {
          opacity: 0;
        }

        .gwh-wp-visible .gwh-wp-label {
          animation: gwh-wp-fade 0.6s ease-out forwards;
        }

        .gwh-wp-visible .gwh-wp-headline {
          animation: gwh-wp-up 0.6s ease-out 0.05s forwards;
        }

        .gwh-wp-visible .gwh-wp-sub {
          animation: gwh-wp-up 0.6s ease-out 0.1s forwards;
        }

        .gwh-wp-visible .gwh-wp-card {
          animation: gwh-wp-up 0.6s ease-out forwards;
        }

        .gwh-wp-visible .gwh-wp-cta {
          animation: gwh-wp-fade 0.6s ease-out 0.95s forwards;
        }
      `}</style>

      <div
        className={`mx-auto max-w-[1200px] px-6 ${visible ? "gwh-wp-visible" : ""}`}
      >
        <p className="gwh-wp-label mb-4 text-center font-inter text-[12px] font-medium uppercase tracking-[0.15em] text-[var(--color-accent-olive)]">
          Our Writers
        </p>

        <h2 className="gwh-wp-headline mb-4 text-center font-playfair text-[36px] font-bold leading-tight text-[var(--color-text)] lg:text-[48px]">
          <span className="block font-normal">Meet the writers behind</span>
          <span className="block italic text-[var(--color-accent-gold)]">
            your story.
          </span>
        </h2>

        <p className="gwh-wp-sub mx-auto mb-[70px] max-w-[560px] text-center font-inter text-[18px] font-normal leading-[1.7] text-[#666666]">
          Handpicked professionals with decades of publishing experience —
          each one dedicated to telling your story perfectly.
        </p>

        {/* Row 1 — 4 writers */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {rowOne.map((writer, index) => (
            <WriterCard key={writer.id} writer={writer} index={index} />
          ))}
        </div>

        {/* Row 2 — 3 writers, centered on desktop */}
        <div className="mt-7 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:mx-auto lg:max-w-[900px] lg:grid-cols-3">
          {rowTwo.map((writer, index) => (
            <WriterCard key={writer.id} writer={writer} index={index + 4} />
          ))}
        </div>

        <div className="gwh-wp-cta mt-12 text-center">
          <a
            href="#writers"
            className="inline-block rounded-[6px] bg-[var(--color-accent-gold)] px-10 py-4 font-inter text-base font-semibold text-white transition-colors duration-300 hover:bg-[#B8960C]"
          >
            Meet All Our Writers
          </a>
        </div>
      </div>
    </section>
  );
}
