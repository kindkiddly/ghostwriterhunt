"use client";

import Image from "next/image";
import { useEffect } from "react";

/**
 * GhostWriterHunt — Writer Profiles
 * Mixed magazine grid: one large vertical feature card +
 * horizontal editorial cards. wp- scroll reveals.
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

const CARD_DELAYS = [0, 100, 200, 100, 200, 100, 200];

/** Large vertical feature card (Sarah Mitchell) */
function VerticalCard({ writer, delay }) {
  return (
    <article
      data-delay={delay}
      className="wp-reveal group flex flex-col overflow-hidden rounded-2xl border border-[#E8D5A3] bg-[#FFFFFF] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#C9A84C] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] lg:row-span-2"
    >
      <div className="relative h-[200px] w-full shrink-0 overflow-hidden lg:h-[320px]">
        <Image
          src={writer.photo}
          alt={writer.name}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover object-top"
        />
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-playfair text-[22px] font-bold text-[#1C1C1C]">
          {writer.name}
        </h3>
        <p className="mt-1 font-inter text-[13px] font-medium text-[#C9A84C]">
          {writer.title}
        </p>
        <p className="my-3 font-inter text-[14px] font-normal leading-[1.7] text-[#666666]">
          {writer.bio}
        </p>

        <ul className="mb-4 flex flex-wrap gap-2">
          {writer.chips.map((chip) => (
            <li key={chip}>
              <span className="inline-block rounded-[20px] border border-[#E8D5A3] bg-[#FDF6E3] px-3.5 py-1.5 font-inter text-[12px] font-medium text-[#6B7C3A]">
                {chip}
              </span>
            </li>
          ))}
        </ul>

        <blockquote className="mb-5 border-l-[3px] border-[#C9A84C] pl-3 font-playfair text-[14px] italic leading-relaxed text-[#999999]">
          “{writer.quote}”
        </blockquote>

        <a
          href="#start"
          className="mt-auto block w-full rounded-[6px] border border-[#C9A84C] bg-transparent px-5 py-2.5 text-center font-inter text-[13px] font-medium text-[#C9A84C] transition-all duration-300 hover:bg-[#C9A84C] hover:text-white"
        >
          Request a Quote
        </a>
      </div>
    </article>
  );
}

/** Compact horizontal editorial card */
function HorizontalCard({ writer, delay }) {
  return (
    <article
      data-delay={delay}
      className="wp-reveal group flex flex-col overflow-hidden rounded-2xl border border-[#E8D5A3] bg-[#FFFFFF] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#C9A84C] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:flex-row"
    >
      <div className="relative h-[200px] w-full shrink-0 overflow-hidden sm:h-auto sm:min-h-[180px] sm:w-[140px]">
        <Image
          src={writer.photo}
          alt={writer.name}
          fill
          sizes="140px"
          className="object-cover object-top"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="font-playfair text-[18px] font-bold text-[#1C1C1C]">
            {writer.name}
          </h3>
          <p className="mt-1 font-inter text-[12px] font-medium text-[#C9A84C]">
            {writer.title}
          </p>
          <p className="my-2 line-clamp-3 font-inter text-[13px] font-normal leading-[1.6] text-[#666666]">
            {writer.bio}
          </p>
          <ul className="mb-3 flex flex-wrap gap-1.5">
            {writer.chips.map((chip) => (
              <li key={chip}>
                <span className="inline-block rounded-[20px] border border-[#E8D5A3] bg-[#FDF6E3] px-2.5 py-1 font-inter text-[11px] font-medium text-[#6B7C3A]">
                  {chip}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href="#writers"
          className="mt-auto inline-block font-inter text-[13px] font-medium text-[#C9A84C] no-underline transition-all duration-200 hover:underline"
        >
          View Profile →
        </a>
      </div>
    </article>
  );
}

export default function WriterProfiles() {
  // Staggered scroll reveal via data-delay on each card
  useEffect(() => {
    const elements = document.querySelectorAll(".wp-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0");
            setTimeout(() => {
              entry.target.classList.add("wp-visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    requestAnimationFrame(() => {
      elements.forEach((el) => {
        el.classList.remove("wp-visible");
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, []);

  const [
    sarah,
    james,
    amanda,
    marcus,
    isabella,
    robert,
    priya,
  ] = WRITERS;

  return (
    <section
      id="writers"
      className="w-full bg-[#FAFAF7] py-[80px]"
      aria-label="Writer profiles"
    >
      <style>{`
        .wp-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out,
                      transform 0.6s ease-out;
        }
        .wp-reveal.wp-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="mx-auto max-w-[1200px] px-6">
        <p className="mb-4 text-center font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent-olive)]">
          Our Writers
        </p>

        <h2 className="mb-4 text-center font-playfair text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--color-text)] lg:text-[56px]">
          <span className="block font-normal">Meet the writers behind</span>
          <span className="block italic text-[var(--color-accent-gold)]">
            your story.
          </span>
        </h2>

        <p className="mx-auto mb-[70px] max-w-[560px] text-center font-inter text-[16px] font-normal leading-[1.7] text-[#666666]">
          Handpicked professionals with decades of publishing experience —
          each one dedicated to telling your story perfectly.
        </p>

        {/* Row 1 — large vertical (left) + 2 horizontals stacked (right) */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_3fr]">
          <VerticalCard writer={sarah} delay={CARD_DELAYS[0]} />
          <div className="grid grid-cols-1 gap-5">
            <HorizontalCard writer={james} delay={CARD_DELAYS[1]} />
            <HorizontalCard writer={amanda} delay={CARD_DELAYS[2]} />
          </div>
        </div>

        {/* Row 2 — 60% / 40% horizontals */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[3fr_2fr]">
          <HorizontalCard writer={marcus} delay={CARD_DELAYS[3]} />
          <HorizontalCard writer={isabella} delay={CARD_DELAYS[4]} />
        </div>

        {/* Row 3 — equal 50% / 50% horizontals */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <HorizontalCard writer={robert} delay={CARD_DELAYS[5]} />
          <HorizontalCard writer={priya} delay={CARD_DELAYS[6]} />
        </div>

        <div className="mt-12 text-center">
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
