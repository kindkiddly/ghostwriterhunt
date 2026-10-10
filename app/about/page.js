"use client";

import { useEffect } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useNearViewport } from "@/lib/useNearViewport";

/**
 * GhostWriterHunt — About Us (editorial layout, About-only styles).
 */

const STATS = [
  { number: "100", suffix: "%", label: "Rights & royalties yours" },
  { number: "5", suffix: "", label: "Global publishing platforms" },
  { number: "30", suffix: "", label: "Days to publish" },
  { number: "50", suffix: "+", label: "Genres covered" },
];

const SERVICE_CARDS = [
  {
    title: "Writing",
    description:
      "Ghostwriting, eBooks, children's books, articles, blogs and website content.",
    href: "/services/ghostwriting",
  },
  {
    title: "Editing",
    description: "Manuscript editing and proofreading that sharpen every page.",
    href: "/services/manuscript-editing",
  },
  {
    title: "Design",
    description:
      "Book covers, interior layout, formatting, illustrations and graphics.",
    href: "/services/book-cover-design",
  },
  {
    title: "Publishing",
    description: "eBook and audiobook publishing across 5 major global platforms.",
    href: "/services/ebook-publishing",
  },
  {
    title: "Author Growth",
    description:
      "Author branding, book marketing, author websites and video book trailers.",
    href: "/services/author-branding",
  },
];

const PROCESS_STEPS = [
  {
    title: "Consult",
    description: "The team listens to your idea, goals and voice.",
  },
  {
    title: "Write",
    description: "Your writer brings your story to the page.",
  },
  {
    title: "Edit",
    description: "Every chapter is refined and polished.",
  },
  {
    title: "Design",
    description: "Your cover and interior come to life.",
  },
  {
    title: "Publish",
    description: "Your book goes live on major global platforms.",
  },
  {
    title: "Promote",
    description: "Marketing support helps your book find its readers.",
  },
];

const VALUES = [
  {
    title: "Absolute Confidentiality",
    description:
      "Every project is protected by an NDA from day one. Your story, ideas and identity stay confidential with GhostWriterHunt.",
  },
  {
    title: "Uncompromising Quality",
    description:
      "Carefully selected writers who match your voice and genre, and editors who polish every page.",
  },
  {
    title: "Author First, Always",
    description:
      "Your vision guides everything. Writers work in your voice and deliver a book that feels authentically yours.",
  },
  {
    title: "Global Publishing Reach",
    description:
      "Books go live on 5 major global platforms, and you keep 100% of your rights and royalties.",
  },
];

const styles = `
  .ab-page {
    width: 100%;
    overflow-x: hidden;
    background: #FFFFFF;
  }

  .ab-fade-up {
    opacity: 0;
    transform: translateY(36px);
    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
  }
  .ab-slide-left {
    opacity: 0;
    transform: translateX(-48px);
    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
  }
  .ab-slide-right {
    opacity: 0;
    transform: translateX(48px);
    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
    transition-delay: 0.12s;
  }
  .ab-scale-up {
    opacity: 0;
    transform: scale(0.94);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  .ab-fade-up.ab-visible,
  .ab-slide-left.ab-visible,
  .ab-slide-right.ab-visible,
  .ab-scale-up.ab-visible {
    opacity: 1;
    transform: none;
  }

  .ab-label-gold {
    font-family: var(--font-inter), sans-serif;
    font-weight: 500;
    font-size: 11px;
    color: #C9A84C;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin: 0 0 20px;
  }
  .ab-label-olive {
    font-family: var(--font-inter), sans-serif;
    font-weight: 500;
    font-size: 11px;
    color: #6B7C3A;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin: 0 0 20px;
  }

  .ab-wrap {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .ab-wrap-narrow {
    max-width: 780px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* —— Hero —— */
  .ab-hero {
    background: #FAFAF7;
    padding: 140px 0 0;
    text-align: center;
  }
  .ab-hero-copy {
    padding-bottom: 56px;
  }
  .ab-hero-title {
    font-family: var(--font-playfair), serif;
    font-weight: 700;
    font-size: clamp(36px, 5.5vw, 64px);
    color: #1C1C1C;
    line-height: 1.08;
    margin: 0 0 28px;
    letter-spacing: -0.02em;
  }
  .ab-hero-title em {
    font-style: italic;
    color: #C9A84C;
    font-weight: 700;
  }
  .ab-hero-lead {
    font-family: var(--font-inter), sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: #666666;
    line-height: 1.75;
    max-width: 720px;
    margin: 0 auto 36px;
  }
  .ab-hero-btns {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px;
  }
  .ab-hero-media {
    width: 100%;
    background: #FAFAF7;
    line-height: 0;
  }
  .ab-hero-img {
    display: block;
    width: 100%;
    height: auto;
    max-width: 100%;
  }
  .ab-btn-gold {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 16px 36px;
    border-radius: 6px;
    background: #C9A84C;
    color: #FFFFFF;
    font-family: var(--font-inter), sans-serif;
    font-weight: 600;
    font-size: 15px;
    text-decoration: none;
    border: none;
    transition: background 0.2s ease;
  }
  .ab-btn-gold:hover {
    background: #B8960C;
  }
  .ab-btn-outline-dark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 16px 36px;
    border-radius: 6px;
    background: transparent;
    color: #1C1C1C;
    font-family: var(--font-inter), sans-serif;
    font-weight: 600;
    font-size: 15px;
    text-decoration: none;
    border: 1px solid #1C1C1C;
    transition: background 0.2s ease, color 0.2s ease;
  }
  .ab-btn-outline-dark:hover {
    background: #1C1C1C;
    color: #FFFFFF;
  }

  /* —— Editorial split —— */
  .ab-section {
    padding: 100px 0;
  }
  .ab-section-cream {
    background: #FAFAF7;
  }
  .ab-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 72px;
    align-items: center;
  }
  .ab-split-reverse .ab-split-media {
    order: 2;
  }
  .ab-split-reverse .ab-split-copy {
    order: 1;
  }
  .ab-h2 {
    font-family: var(--font-playfair), serif;
    font-weight: 700;
    font-size: clamp(32px, 4vw, 48px);
    color: #1C1C1C;
    line-height: 1.12;
    margin: 0 0 28px;
    letter-spacing: -0.02em;
  }
  .ab-h2 em {
    font-style: italic;
    color: #C9A84C;
    font-weight: 700;
  }
  .ab-h2-center {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    max-width: 820px;
  }
  .ab-body {
    font-family: var(--font-inter), sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #666666;
    line-height: 1.85;
    margin: 0 0 20px;
  }
  .ab-body:last-child {
    margin-bottom: 0;
  }
  .ab-media-frame {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: 4px;
    overflow: hidden;
    background: #E8D5A3;
  }
  .ab-media-frame-tall {
    aspect-ratio: 3 / 4;
    max-width: 480px;
    margin: 0 auto;
  }
  /* —— Services grid —— */
  .ab-services-intro {
    text-align: center;
    max-width: 640px;
    margin: 0 auto 56px;
  }
  .ab-services-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
  }
  .ab-service-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 28px 22px;
    background: #FFFFFF;
    border: 1px solid #E8D5A3;
    border-radius: 4px;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
    min-height: 100%;
  }
  .ab-service-card:hover {
    border-color: #C9A84C;
    box-shadow: 0 12px 40px rgba(201, 168, 76, 0.12);
    transform: translateY(-4px);
  }
  .ab-service-card:focus-visible {
    outline: 2px solid #C9A84C;
    outline-offset: 3px;
  }
  .ab-service-title {
    font-family: var(--font-playfair), serif;
    font-weight: 700;
    font-size: 22px;
    color: #1C1C1C;
    margin: 0;
  }
  .ab-service-desc {
    font-family: var(--font-inter), sans-serif;
    font-size: 14px;
    line-height: 1.65;
    color: #666666;
    margin: 0;
    flex: 1;
  }
  .ab-service-link {
    font-family: var(--font-inter), sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #C9A84C;
    margin-top: auto;
  }

  /* —— Process —— */
  .ab-process-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
    margin-top: 56px;
  }
  .ab-process-step {
    padding: 24px 16px 0;
    border-top: 2px solid #E8D5A3;
  }
  .ab-process-step-title {
    font-family: var(--font-playfair), serif;
    font-weight: 700;
    font-size: 20px;
    color: #1C1C1C;
    margin: 0 0 10px;
  }
  .ab-process-step-desc {
    font-family: var(--font-inter), sans-serif;
    font-size: 14px;
    line-height: 1.65;
    color: #666666;
    margin: 0;
  }
  .ab-process-media {
    position: relative;
    width: 100%;
    max-width: 900px;
    aspect-ratio: 16 / 10;
    margin: 64px auto 0;
    border-radius: 4px;
    overflow: hidden;
    background: #E8D5A3;
  }
  .ab-process-media img,
  .ab-media-frame img {
    object-fit: cover;
  }

  /* —— Values —— */
  .ab-values-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 48px;
    margin-top: 56px;
  }
  .ab-value-item {
    padding-top: 24px;
    border-top: 1px solid #E8D5A3;
  }
  .ab-value-title {
    font-family: var(--font-playfair), serif;
    font-weight: 700;
    font-size: 24px;
    color: #1C1C1C;
    margin: 0 0 12px;
  }
  .ab-value-desc {
    font-family: var(--font-inter), sans-serif;
    font-size: 15px;
    line-height: 1.75;
    color: #666666;
    margin: 0;
  }

  /* —— Stats (unchanged band styling) —— */
  .ab-stats {
    background: #1C1C1C;
    padding: 80px 0;
  }
  .ab-stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .ab-stat {
    text-align: center;
    padding: 0 24px;
    border-right: 1px solid rgba(201, 168, 76, 0.2);
  }
  .ab-stat:last-child {
    border-right: none;
  }
  .ab-stat-num {
    font-family: var(--font-playfair), serif;
    font-weight: 700;
    font-size: 56px;
    color: #FFFFFF;
    line-height: 1;
    margin: 0 0 8px;
  }
  .ab-stat-num span {
    color: #C9A84C;
  }
  .ab-stat-label {
    font-family: var(--font-inter), sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #999999;
    margin: 0;
  }

  /* —— Privacy —— */
  .ab-inline-link {
    color: #C9A84C;
    text-decoration: underline;
    font-weight: 500;
  }
  .ab-inline-link:hover {
    color: #1C1C1C;
  }

  /* —— CTA —— */
  .ab-cta {
    position: relative;
    min-height: 460px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 80px 24px;
    background-image: url("/images/CTA-AUTHOR.webp");
    background-size: cover;
    background-position: center;
  }
  .ab-cta:not(.ab-cta--bg-ready) {
    background-image: none;
    background-color: #1C1C1C;
  }
  .ab-cta-overlay {
    position: absolute;
    inset: 0;
    background: rgba(28, 28, 28, 0.88);
  }
  .ab-cta-inner {
    position: relative;
    max-width: 700px;
    margin: 0 auto;
  }
  .ab-cta-title {
    font-family: var(--font-playfair), serif;
    font-weight: 700;
    font-size: clamp(32px, 4.5vw, 56px);
    color: #FFFFFF;
    line-height: 1.1;
    margin: 0 0 20px;
  }
  .ab-cta-title em {
    font-style: italic;
    color: #C9A84C;
    font-weight: 700;
  }
  .ab-cta-sub {
    font-family: var(--font-inter), sans-serif;
    font-weight: 400;
    font-size: 17px;
    color: rgba(255, 255, 255, 0.75);
    margin: 0 0 40px;
    line-height: 1.6;
  }
  .ab-cta-btns {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }
  .ab-btn-outline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 16px 40px;
    border-radius: 6px;
    background: transparent;
    color: #FFFFFF;
    font-family: var(--font-inter), sans-serif;
    font-weight: 600;
    font-size: 15px;
    text-decoration: none;
    border: 1px solid #FFFFFF;
    transition: background 0.2s ease, color 0.2s ease;
  }
  .ab-btn-outline:hover {
    background: #FFFFFF;
    color: #1C1C1C;
  }

  @media (max-width: 1100px) {
    .ab-services-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .ab-process-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 768px) {
    .ab-hero {
      padding-top: 120px;
    }
    .ab-section {
      padding: 72px 0;
    }
    .ab-split,
    .ab-split-reverse .ab-split-media,
    .ab-split-reverse .ab-split-copy {
      grid-template-columns: 1fr;
      gap: 36px;
      order: unset;
    }
    .ab-split-reverse .ab-split-media {
      order: -1;
    }
    .ab-services-grid {
      grid-template-columns: 1fr;
    }
    .ab-process-grid {
      grid-template-columns: 1fr;
    }
    .ab-values-grid {
      grid-template-columns: 1fr;
      gap: 28px;
    }
    .ab-stats-row {
      grid-template-columns: 1fr 1fr;
      gap: 32px 0;
    }
    .ab-stat {
      border-right: none;
      border-bottom: 1px solid rgba(201, 168, 76, 0.2);
      padding-bottom: 24px;
    }
    .ab-stat:nth-child(3),
    .ab-stat:nth-child(4) {
      border-bottom: none;
    }
    .ab-stat-num {
      font-size: 40px;
    }
    .ab-slide-left,
    .ab-slide-right {
      transform: translateY(28px);
    }
    .ab-cta-btns,
    .ab-hero-btns {
      flex-direction: column;
      align-items: stretch;
    }
  }
`;

function AboutImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  priority = false,
  sizes,
}) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes}
        quality={85}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      quality={85}
    />
  );
}

export default function AboutPage() {
  const [ctaBgRef, ctaBgReady] = useNearViewport();

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".ab-fade-up, .ab-slide-left, .ab-slide-right, .ab-scale-up"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0", 10);
            setTimeout(() => {
              entry.target.classList.add("ab-visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );
    requestAnimationFrame(() => {
      elements.forEach((el) => observer.observe(el));
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="ab-page">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* 1 — Hero */}
      <section className="ab-hero" data-hero>
        <div className="ab-wrap ab-hero-copy ab-fade-up ab-visible">
          <p className="ab-label-gold">THE STORY</p>
          <h1 className="ab-hero-title">
            Every story deserves to be <em>told beautifully.</em>
          </h1>
          <p className="ab-hero-lead">
            GhostWriterHunt helps authors, experts and dreamers turn their ideas into
            professionally written, designed and published books, with complete
            confidentiality and 100% of the rights and royalties in your name.
          </p>
          <div className="ab-hero-btns">
            <Link href="/#start" className="ab-btn-gold">
              Start Your Book
            </Link>
            <Link href="/#start" className="ab-btn-outline-dark">
              Book Free Consultation
            </Link>
          </div>
        </div>
        <div className="ab-hero-media ab-scale-up ab-visible" data-delay="120">
          <AboutImage
            src="/images/about-us-h1.webp"
            alt="GhostWriterHunt — books, writing and publishing"
            width={1942}
            height={809}
            className="ab-hero-img"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      {/* 2 — How we began */}
      <section className="ab-section">
        <div className="ab-wrap ab-split">
          <div className="ab-split-copy ab-slide-left">
            <p className="ab-label-olive">HOW IT BEGAN</p>
            <h2 className="ab-h2">
              Born from a passion for <em>storytelling.</em>
            </h2>
            <p className="ab-body">
              GhostWriterHunt began in the USA with a simple observation: countless people
              carry extraordinary stories inside them but lack the time or writing
              expertise to bring them to the page. Business leaders with hard-won wisdom.
              Families with histories worth preserving. Visionaries with ideas that could
              change how people think.
            </p>
            <p className="ab-body">
              GhostWriterHunt was built to be more than a writing service: a creative
              partnership based on trust, confidentiality and quality. From your first idea
              to your published book, every step happens under one roof.
            </p>
            <p className="ab-body">
              GhostWriterHunt is part of the LumexForge family of products.
            </p>
          </div>
          <div className="ab-split-media ab-slide-right">
            <div className="ab-media-frame">
              <AboutImage
                src="/images/pen-book2.webp"
                alt="Pen resting on an open notebook manuscript"
                width={800}
                height={600}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3 — What we do */}
      <section className="ab-section ab-section-cream">
        <div className="ab-wrap">
          <div className="ab-services-intro ab-fade-up">
            <p className="ab-label-gold">WHAT GHOSTWRITERHUNT DOES</p>
            <h2 className="ab-h2 ab-h2-center">
              Everything your book needs, <em>in one place.</em>
            </h2>
          </div>
          <div className="ab-services-grid">
            {SERVICE_CARDS.map((card, i) => (
              <Link
                key={card.title}
                href={card.href}
                className="ab-service-card ab-fade-up"
                data-delay={String(i * 80)}
              >
                <h3 className="ab-service-title">{card.title}</h3>
                <p className="ab-service-desc">{card.description}</p>
                <span className="ab-service-link">Explore service →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Process */}
      <section className="ab-section">
        <div className="ab-wrap">
          <div className="ab-fade-up ab-wrap-narrow" style={{ padding: 0 }}>
            <p className="ab-label-olive">HOW IT WORKS</p>
            <h2 className="ab-h2 ab-h2-center">
              From idea to <em>published book.</em>
            </h2>
          </div>
          <div className="ab-process-grid">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.title}
                className="ab-process-step ab-fade-up"
                data-delay={String(i * 70)}
              >
                <h3 className="ab-process-step-title">{step.title}</h3>
                <p className="ab-process-step-desc">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="ab-process-media ab-scale-up" data-delay="200">
            <AboutImage
              src="/images/flipping-book.webp"
              alt="Pages of a book turning as if being read"
              width={900}
              height={900}
              fill
              sizes="(max-width: 900px) 100vw, 900px"
            />
          </div>
        </div>
      </section>

      {/* 5 — Values */}
      <section className="ab-section ab-section-cream">
        <div className="ab-wrap">
          <div className="ab-split ab-split-reverse">
            <div className="ab-split-copy ab-slide-left">
              <p className="ab-label-gold">CORE VALUES</p>
              <h2 className="ab-h2">
                Mission and <em>values.</em>
              </h2>
              <div className="ab-values-grid">
                {VALUES.map((item, i) => (
                  <div
                    key={item.title}
                    className="ab-value-item ab-fade-up"
                    data-delay={String(i * 90)}
                  >
                    <h3 className="ab-value-title">{item.title}</h3>
                    <p className="ab-value-desc">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="ab-split-media ab-slide-right">
              <div className="ab-media-frame ab-media-frame-tall">
                <AboutImage
                  src="/images/books-fairy-lights.webp"
                  alt="Stack of books with warm ambient light"
                  width={600}
                  height={900}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Stats promise */}
      <section className="ab-stats" aria-label="GhostWriterHunt promise">
        <div className="ab-stats-row">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="ab-stat ab-scale-up"
              data-delay={String(i * 100)}
            >
              <p className="ab-stat-num">
                {stat.number}
                <span>{stat.suffix}</span>
              </p>
              <p className="ab-stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7 — Privacy / communication */}
      <section className="ab-section">
        <div className="ab-wrap ab-split">
          <div className="ab-split-copy ab-slide-left">
            <p className="ab-label-olive">YOUR PRIVACY</p>
            <h2 className="ab-h2">
              Respectful communication, <em>always.</em>
            </h2>
            <p className="ab-body">
              GhostWriterHunt only calls or texts you about your inquiry if you opt in on a
              form, and you can opt out at any time by replying STOP. Your mobile number
              and consent are never shared with third parties for marketing. Learn more in
              the{" "}
              <Link href="/privacy-policy" className="ab-inline-link">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms-of-use" className="ab-inline-link">
                Terms of Use
              </Link>
              .
            </p>
          </div>
          <div className="ab-split-media ab-slide-right">
            <div className="ab-media-frame">
              <AboutImage
                src="/images/CTA-LIBRARY.webp"
                alt="Library shelves filled with books"
                width={1920}
                height={998}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8 — CTA */}
      <section
        ref={ctaBgRef}
        className={`ab-cta${ctaBgReady ? " ab-cta--bg-ready" : ""}`}
      >
        <div className="ab-cta-overlay" aria-hidden="true" />
        <div className="ab-cta-inner ab-fade-up">
          <p className="ab-label-gold">START YOUR JOURNEY</p>
          <h2 className="ab-cta-title">
            Your story is waiting <em>to be written.</em>
          </h2>
          <p className="ab-cta-sub">
            Your story deserves to be told. Let&apos;s write it together.
          </p>
          <div className="ab-cta-btns">
            <Link href="/#start" className="ab-btn-gold">
              Start Your Book Today
            </Link>
            <Link href="/#start" className="ab-btn-outline">
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
