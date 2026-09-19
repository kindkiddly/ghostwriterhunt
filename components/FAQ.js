"use client";

import { useEffect, useState } from "react";

/**
 * GhostWriterHunt — FAQ
 * Reedsy-warm accordion + Superside confidence:
 * one-open-at-a-time cards with smooth height reveal.
 */

const FAQ_ITEMS = [
  {
    question: "How does the ghostwriting process work?",
    answer:
      "We begin with a free consultation where you share your book idea, goals and vision. We then match you with the perfect ghostwriter for your genre and voice. Your writer conducts an in-depth author interview to understand how you think and speak. Writing begins chapter by chapter with regular reviews and feedback rounds until every word is exactly right.",
  },
  {
    question: "How long does it take to write a book?",
    answer:
      "Timelines vary depending on the length and complexity of your book. A short book of 20,000 words typically takes 4-6 weeks. A full length novel or non-fiction book of 60,000+ words takes 8-16 weeks. We always agree on a clear timeline before starting and keep you updated at every milestone.",
  },
  {
    question: "Will the book sound like me?",
    answer:
      "Absolutely. Before writing a single word your ghostwriter studies your communication style through in-depth interviews and any existing writing you share. We create a personal voice guide and write a sample chapter for your approval before the full manuscript begins. Our clients consistently tell us the finished book sounds more like them than anything they could have written themselves.",
  },
  {
    question: "Do I own the book and all the royalties?",
    answer:
      "Yes — 100%. Once your project is delivered you own the complete manuscript, all publishing rights and every dollar of royalties. We sign a full NDA and transfer all intellectual property rights to you. Your name goes on the cover and GhostWriterHunt remains completely behind the scenes.",
  },
  {
    question: "Is my project completely confidential?",
    answer:
      "Absolutely. Every project begins with a comprehensive Non-Disclosure Agreement. Your ideas, your story and your identity are completely protected. We never disclose client information or project details under any circumstances. Confidentiality is the foundation of everything we do.",
  },
  {
    question: "Can I see a sample before committing?",
    answer:
      "Yes. We offer a free sample chapter with every project before you commit to the full manuscript. This lets you experience your writer's style and confirm the voice is perfect before any significant investment is made.",
  },
  {
    question: "Which platforms will my book be published on?",
    answer:
      "We publish your book on 47+ global digital platforms including Amazon KDP, Kindle, Apple Books, Google Play Books, Kobo, Barnes and Noble Press, Smashwords and Draft2Digital. We handle all ISBN registration, metadata optimization and platform setup so your book is discoverable worldwide.",
  },
  {
    question: "What genres do you cover?",
    answer:
      "We cover every major genre including fiction, non-fiction, biography, memoir, self-help, business, children's books, mystery, thriller, romance, fantasy, horror, poetry and more. Every writer on our platform specializes in specific genres so you are always matched with someone who truly understands your category.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Our pricing starts at $1,499 for shorter books and goes up to $4,999+ for full length premium projects. We offer flexible payment plans to make professional ghostwriting accessible. Book a free consultation and we will give you a detailed quote based on your specific project requirements.",
  },
  {
    question: "What if I am not happy with the writing?",
    answer:
      "Your satisfaction is our priority. Every plan includes multiple revision rounds and we work with you until the manuscript meets your expectations. Our Professional and Masterpiece plans include unlimited revisions. If at any point you are not satisfied we will reassign your project to a different writer at no extra cost.",
  },
];

function PlusMinusIcon({ open }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-300 ease-in-out"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      {/* Horizontal bar always visible */}
      <path
        d="M4 10h12"
        stroke="#C9A84C"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Vertical bar — collapses to minus when open */}
      <path
        d="M10 4v12"
        stroke="#C9A84C"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          opacity: open ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      />
    </svg>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  // Scroll-reveal: fire once when ~15% of each target is visible
  useEffect(() => {
    const elements = document.querySelectorAll(".faq-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0");
            setTimeout(() => {
              entry.target.classList.add("faq-visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    requestAnimationFrame(() => {
      elements.forEach((el) => {
        el.classList.remove("faq-visible");
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, []);

  const toggleItem = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="w-full bg-[#FAFAF7] py-[80px]"
      aria-label="Frequently asked questions"
    >
      <style>{`
        .faq-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }

        .faq-reveal.faq-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .faq-reveal { transform: translateY(20px); }
          .faq-reveal.faq-visible { transform: translateY(0); }
          .faq-section-inner {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .faq-item-btn {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .faq-q-text {
            word-break: break-word;
            font-size: 16px !important;
          }
        }
      `}</style>

      <div className="faq-section-inner mx-auto w-full max-w-[900px] px-6">
        {/* Section header */}
        <div className="faq-reveal mb-[60px] flex flex-col items-center text-center">
          <p className="mb-5 font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[#6B7C3A]">
            FAQ
          </p>

          <h2 className="mb-4 font-playfair text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-[#1C1C1C] lg:text-[56px]">
            <span className="block font-normal">Frequently asked</span>
            <span className="block italic text-[#C9A84C]">questions.</span>
          </h2>

          <p className="max-w-[500px] font-inter text-[16px] font-normal leading-[1.7] text-[#666666]">
            Everything you need to know about working with GhostWriterHunt.
          </p>
        </div>

        {/* Accordion — one open at a time */}
        <ul className="mx-auto flex max-w-[800px] list-none flex-col p-0">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <li
                key={item.question}
                className="faq-reveal mb-3"
                data-delay={index * 80}
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  className={`faq-item-btn w-full cursor-pointer rounded-xl border bg-[#FFFFFF] px-7 py-6 text-left transition-colors duration-300 ${
                    isOpen
                      ? "border-[#C9A84C] border-l-[3px] border-l-[#C9A84C]"
                      : "border-[#E8D5A3] hover:border-[#C9A84C]"
                  }`}
                >
                  {/* Question row */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="faq-q-text flex-1 font-playfair text-[18px] font-bold text-[#1C1C1C]">
                      {item.question}
                    </span>
                    <PlusMinusIcon open={isOpen} />
                  </div>

                  {/* Answer — animated max-height / opacity */}
                  <div
                    className="overflow-hidden transition-all duration-[400ms] ease-in-out"
                    style={{
                      maxHeight: isOpen ? "500px" : "0px",
                      opacity: isOpen ? 1 : 0,
                      transition:
                        "max-height 0.4s ease, opacity 0.3s ease",
                    }}
                  >
                    <p className="mt-4 border-t border-[#E8D5A3] pt-4 font-inter text-[15px] font-normal leading-[1.8] text-[#666666]">
                      {item.answer}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        {/* CTA below accordion */}
        <div className="faq-reveal mt-10 flex flex-col items-center text-center">
          <p className="mb-4 font-inter text-[16px] font-normal text-[#666666]">
            Still have questions?
          </p>
          <a
            href="#start"
            className="inline-flex items-center justify-center rounded-[6px] border-2 border-[#C9A84C] bg-transparent px-8 py-3 font-inter text-[15px] font-semibold text-[#C9A84C] transition-all duration-300 hover:bg-[#C9A84C] hover:text-white"
          >
            Book a Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
