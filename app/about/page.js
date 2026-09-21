"use client";

import { useEffect } from "react";
import Footer from "@/components/Footer";
import FloatingImages from "@/components/service/FloatingImages";

/**
 * GhostWriterHunt — About Us page
 * Navbar comes from root layout (do not duplicate).
 */

const STORY_IMAGES = [
  {
    url: "/images/team-collaboration.webp",
    alt: "Team collaboration",
    size: "large",
  },
  {
    url: "/images/writing-desk.webp",
    alt: "Professional writing",
    size: "medium",
  },
];

const HERO_PILLS = [
  "500+ Books Published",
  "96% Client Satisfaction",
  "50+ Professional Writers",
];

const STATS = [
  { number: "500", suffix: "+", label: "Books Published" },
  { number: "50", suffix: "+", label: "Professional Writers" },
  { number: "96", suffix: "%", label: "Client Satisfaction" },
  { number: "12", suffix: "+", label: "Publishing Platforms" },
];

const TEAM = [
  {
    name: "A.R",
    role: "Founder",
    bio: "Visionary founder with a passion for connecting authors with the perfect words to tell their story.",
    chip: "Leadership",
    initials: true,
  },
  {
    name: "Elizabeth Jones",
    role: "Co-Founder",
    bio: "Co-founder driving the strategic vision and day-to-day excellence that defines the GhostWriterHunt experience.",
    chip: "Strategy",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Rachel Thompson",
    role: "Head of Editorial",
    bio: "Editorial leader ensuring every manuscript meets the highest standards of craft and quality.",
    chip: "Editorial",
    photo:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "James Harrison",
    role: "Head of Publishing",
    bio: "Publishing veteran managing our global distribution network across 12+ platforms worldwide.",
    chip: "Publishing",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Amanda Foster",
    role: "Client Success Lead",
    bio: "Dedicated to ensuring every author has an exceptional experience from first consultation to published book.",
    chip: "Client Success",
    photo:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Thomas Reed",
    role: "Head of Technology",
    bio: "Technology architect building the platform that powers seamless author and writer collaboration.",
    chip: "Technology",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Michael Carter",
    role: "Creative Director",
    bio: "Creative director overseeing book cover design, interior layout and illustration across all projects.",
    chip: "Creative",
    photo:
      "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Jennifer Hayes",
    role: "Marketing Strategist",
    bio: "Marketing strategist helping authors build their brand and reach the readers they deserve.",
    chip: "Marketing",
    photo:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Caroline Brooks",
    role: "Publishing Manager",
    bio: "Publishing manager coordinating projects from manuscript to global launch with precision and care.",
    chip: "Operations",
    photo:
      "https://images.unsplash.com/photo-1548142813-c348350df52b?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "David Williams",
    role: "Senior Project Manager",
    bio: "Senior project manager ensuring every book project is delivered on time, on brief and beyond expectations.",
    chip: "Project Management",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
  },
];

const WHY_BULLETS = [
  "Top 1% of ghostwriter applicants accepted",
  "Every project protected by full NDA",
  "Your voice captured — not ours",
  "100% of rights and royalties yours",
  "Published on 12+ global platforms",
  "500+ books successfully delivered",
];

function ValueIcon({ type, size = 28, color = "#C9A84C" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (type) {
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      );
    case "globe":
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      );
  }
}

const styles = `
  .ab-page {
    width: 100%;
    overflow-x: hidden;
  }

  /* —— Animations —— */
  .ab-fade-up {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
  }
  .ab-slide-left {
    opacity: 0;
    transform: translateX(-60px);
    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
  }
  .ab-slide-right {
    opacity: 0;
    transform: translateX(60px);
    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
    transition-delay: 0.15s;
  }
  .ab-scale-up {
    opacity: 0;
    transform: scale(0.88);
    transition: opacity 0.6s ease-out,
      transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .ab-rotate-in {
    opacity: 0;
    transform: translateY(30px) rotate(-2deg);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  .ab-fade-up.ab-visible,
  .ab-slide-left.ab-visible,
  .ab-slide-right.ab-visible,
  .ab-scale-up.ab-visible,
  .ab-rotate-in.ab-visible {
    opacity: 1;
    transform: none;
  }

  /* —— Hero —— */
  .ab-hero {
    position: relative;
    overflow: hidden;
    background: #1C1C1C;
    padding: 160px 24px 100px;
    text-align: center;
  }
  .ab-hero-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse at 50% 0%,
      rgba(201, 168, 76, 0.08) 0%,
      transparent 60%
    );
    pointer-events: none;
  }
  .ab-hero-inner {
    position: relative;
    max-width: 900px;
    margin: 0 auto;
  }
  .ab-label-gold {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 500;
    font-size: 11px;
    color: #C9A84C;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin: 0 0 20px;
  }
  .ab-label-olive {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 500;
    font-size: 11px;
    color: #6B7C3A;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin: 0 0 20px;
  }
  .ab-hero-title {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 64px;
    color: #FFFFFF;
    line-height: 1.1;
    margin: 0 0 24px;
  }
  .ab-hero-title em {
    font-style: italic;
    color: #C9A84C;
    font-weight: 700;
  }
  .ab-hero-sub {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.75);
    max-width: 680px;
    margin: 0 auto 0;
    line-height: 1.7;
  }
  .ab-pills {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-top: 40px;
  }
  .ab-pill {
    display: inline-flex;
    align-items: center;
    background: #C9A84C;
    border: 1px solid #C9A84C;
    border-radius: 100px;
    padding: 10px 28px;
    margin: 0 8px;
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 600;
    font-size: 13px;
    color: #1C1C1C;
    letter-spacing: 0.05em;
  }

  /* —— Shared —— */
  .ab-wrap {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .ab-section-white {
    background: #FFFFFF;
    padding: 100px 0;
  }
  .ab-section-cream {
    background: #FAFAF7;
    padding: 100px 0;
  }
  .ab-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }
  .ab-h2 {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 44px;
    color: #1C1C1C;
    line-height: 1.15;
    margin: 0 0 24px;
  }
  .ab-h2 em {
    font-style: italic;
    color: #C9A84C;
    font-weight: 700;
  }
  .ab-h2-center {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 48px;
    color: #1C1C1C;
    line-height: 1.15;
    text-align: center;
    margin: 0 0 16px;
  }
  .ab-h2-center em {
    font-style: italic;
    color: #C9A84C;
    font-weight: 700;
  }
  .ab-body {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #666666;
    line-height: 1.8;
    margin: 0 0 20px;
  }
  .ab-sub-center {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #666666;
    text-align: center;
    max-width: 500px;
    margin: 0 auto 60px;
    line-height: 1.7;
  }
  .ab-center {
    text-align: center;
  }

  /* —— Values (asymmetric dark) —— */
  .ab-values {
    background: #1C1C1C;
    padding: 100px 0;
  }
  .ab-values .ab-label-gold {
    text-align: center;
  }
  .ab-values-title {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 48px;
    color: #FFFFFF;
    line-height: 1.15;
    text-align: center;
    margin: 0 0 16px;
  }
  .ab-values-title em {
    font-style: italic;
    color: #C9A84C;
    font-weight: 700;
  }
  .ab-values-sub {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #999999;
    text-align: center;
    max-width: 500px;
    margin: 0 auto 60px;
    line-height: 1.7;
  }
  .ab-values-grid {
    display: grid;
    grid-template-columns: 1.3fr 0.9fr 1fr;
    grid-template-rows: auto auto;
    gap: 20px;
    max-width: 1100px;
    margin: 0 auto;
  }
  .ab-vcard-1 {
    grid-column: 1;
    grid-row: span 2;
    background: #C9A84C;
    border-radius: 24px;
    padding: 48px 40px;
    transition: transform 0.3s ease;
  }
  .ab-vcard-1:hover {
    transform: scale(1.02);
  }
  .ab-vcard-1 .ab-vcard-title {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 26px;
    color: #FFFFFF;
    margin: 16px 0 12px;
  }
  .ab-vcard-1 .ab-vcard-desc {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.8;
    margin: 0;
  }
  .ab-vcard-2 {
    grid-column: 2;
    grid-row: 1;
    background: #2A2A2A;
    border-radius: 20px;
    padding: 36px 32px;
    border: 1px solid rgba(201, 168, 76, 0.2);
    transition: border-color 0.3s ease;
  }
  .ab-vcard-2:hover {
    border-color: rgba(201, 168, 76, 0.6);
  }
  .ab-vcard-3 {
    grid-column: 3;
    grid-row: 1;
    background: #FFFFFF;
    border-radius: 20px;
    padding: 36px 32px;
    border: 1px solid #E8D5A3;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .ab-vcard-3:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }
  .ab-vcard-2 .ab-vcard-title,
  .ab-vcard-4 .ab-vcard-title {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 22px;
    color: #FFFFFF;
    margin: 14px 0 10px;
  }
  .ab-vcard-2 .ab-vcard-desc,
  .ab-vcard-4 .ab-vcard-desc {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #999999;
    line-height: 1.7;
    margin: 0;
  }
  .ab-vcard-3 .ab-vcard-title {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 22px;
    color: #1C1C1C;
    margin: 14px 0 10px;
  }
  .ab-vcard-3 .ab-vcard-desc {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #666666;
    line-height: 1.7;
    margin: 0;
  }
  .ab-vcard-4 {
    grid-column: 2 / span 2;
    grid-row: 2;
    background: rgba(201, 168, 76, 0.08);
    border: 1px solid rgba(201, 168, 76, 0.25);
    border-radius: 20px;
    padding: 36px 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 32px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .ab-vcard-4:hover {
    border-color: rgba(201, 168, 76, 0.55);
    box-shadow: 0 0 24px rgba(201, 168, 76, 0.12);
  }
  .ab-vcard-4 .ab-vcard-title {
    margin-top: 0;
  }

  /* —— Stats —— */
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
    font-family: var(--font-playfair), "Playfair Display", serif;
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
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #999999;
    margin: 0;
  }

  /* —— Team (writer-card style) —— */
  .ab-team-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    max-width: 1100px;
    margin: 0 auto;
  }
  .ab-team-card {
    background: #FFFFFF;
    border: 1px solid #E8D5A3;
    border-radius: 20px;
    padding: 36px 28px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 24px rgba(201, 168, 76, 0.08);
    transition: all 0.3s ease;
  }
  .ab-team-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(201, 168, 76, 0.16);
    border-color: #C9A84C;
  }
  .ab-team-card:nth-child(9) {
    grid-column: 2;
  }
  .ab-team-card:nth-child(10) {
    grid-column: 3;
  }
  .ab-avatar-ar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #1C1C1C;
    border: 3px solid #C9A84C;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 24px;
    color: #C9A84C;
  }
  .ab-avatar-photo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid #E8D5A3;
    object-fit: cover;
    object-position: center top;
    display: block;
    margin: 0 auto 20px;
  }
  .ab-team-name {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 20px;
    color: #1C1C1C;
    margin: 0 0 4px;
  }
  .ab-team-role {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 500;
    font-size: 13px;
    color: #C9A84C;
    margin: 0 0 16px;
  }
  .ab-team-bio {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #666666;
    line-height: 1.7;
    margin: 0 0 16px;
  }
  .ab-team-chip {
    display: inline-flex;
    align-items: center;
    background: #FDF6E3;
    border: 1px solid #E8D5A3;
    border-radius: 20px;
    padding: 6px 14px;
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 500;
    font-size: 12px;
    color: #6B7C3A;
  }

  /* —— Why us —— */
  .ab-bullets {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .ab-bullet {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 500;
    font-size: 15px;
    color: #1C1C1C;
    margin-bottom: 14px;
  }
  .ab-check {
    color: #C9A84C;
    font-size: 16px;
    flex-shrink: 0;
  }
  .ab-why-img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    display: block;
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
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 56px;
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
    font-family: var(--font-inter), Inter, sans-serif;
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
  .ab-btn-gold {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 16px 40px;
    border-radius: 6px;
    background: #C9A84C;
    color: #FFFFFF;
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 600;
    font-size: 15px;
    text-decoration: none;
    border: none;
    transition: background 0.2s ease;
  }
  .ab-btn-gold:hover {
    background: #B8960C;
  }
  .ab-btn-outline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 16px 40px;
    border-radius: 6px;
    background: transparent;
    color: #FFFFFF;
    font-family: var(--font-inter), Inter, sans-serif;
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

  @media (max-width: 1024px) {
    .ab-values-grid {
      grid-template-columns: 1fr 1fr;
    }
    .ab-vcard-1 {
      grid-column: 1 / span 2;
      grid-row: auto;
    }
    .ab-vcard-2 {
      grid-column: 1;
      grid-row: auto;
    }
    .ab-vcard-3 {
      grid-column: 2;
      grid-row: auto;
    }
    .ab-vcard-4 {
      grid-column: 1 / span 2;
      grid-row: auto;
    }
    .ab-team-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .ab-team-card:nth-child(9),
    .ab-team-card:nth-child(10) {
      grid-column: auto;
    }
  }

  @media (max-width: 768px) {
    .ab-slide-left,
    .ab-slide-right {
      transform: translateY(30px);
    }
    .ab-hero {
      padding: 120px 20px 72px;
    }
    .ab-hero-title {
      font-size: 36px;
    }
    .ab-hero-sub {
      font-size: 16px;
    }
    .ab-pill {
      margin: 0;
    }
    .ab-section-white,
    .ab-section-cream,
    .ab-values {
      padding: 72px 0;
    }
    .ab-two-col {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .ab-h2 {
      font-size: 32px;
    }
    .ab-h2-center,
    .ab-values-title {
      font-size: 32px;
    }
    .ab-values-grid {
      grid-template-columns: 1fr;
    }
    .ab-vcard-1,
    .ab-vcard-2,
    .ab-vcard-3,
    .ab-vcard-4 {
      grid-column: 1;
    }
    .ab-vcard-4 {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
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
    .ab-team-grid {
      grid-template-columns: 1fr;
    }
    .ab-why-img {
      height: 320px;
    }
    .ab-cta-title {
      font-size: 36px;
    }
    .ab-cta-btns {
      flex-direction: column;
      align-items: stretch;
    }
  }
`;

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".ab-fade-up, .ab-slide-left, .ab-slide-right, .ab-scale-up, .ab-rotate-in"
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
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      }
    );
    requestAnimationFrame(() => {
      elements.forEach((el) => {
        observer.observe(el);
      });
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="ab-page">
      <style>{styles}</style>

      {/* —— Section 1: Hero —— */}
      <section className="ab-hero">
        <div className="ab-hero-glow" aria-hidden="true" />
        <div className="ab-hero-inner">
          <div className="ab-fade-up" data-delay="0">
            <p className="ab-label-gold">OUR STORY</p>
            <h1 className="ab-hero-title">
              We believe every story
              <br />
              <em>deserves to be told.</em>
            </h1>
            <p className="ab-hero-sub">
              GhostWriterHunt was founded with a single belief — that remarkable
              stories should not go untold simply because their authors need a
              professional hand to tell them. We exist to bridge that gap,
              connecting visionary authors with exceptional ghostwriters who
              bring their stories to life with craft, care and complete
              confidentiality.
            </p>
          </div>
          <div className="ab-pills ab-scale-up" data-delay="200">
            {HERO_PILLS.map((pill) => (
              <span key={pill} className="ab-pill">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* —— Section 2: Our Story —— */}
      <section className="ab-section-white">
        <div className="ab-wrap ab-two-col">
          <div className="ab-slide-left">
            <p className="ab-label-olive">HOW WE BEGAN</p>
            <h2 className="ab-h2">
              Born from a passion for <em>storytelling.</em>
            </h2>
            <p className="ab-body">
              GhostWriterHunt began in the USA with a simple observation —
              thousands of people carry extraordinary stories inside them but
              lack the writing expertise to bring those stories to the page.
              Business leaders with decades of hard-won wisdom. Families with
              histories that deserve to be preserved. Visionaries with ideas that
              could change how people think about the world.
            </p>
            <p className="ab-body">
              We assembled a team of the finest professional ghostwriters,
              editors, designers and publishing specialists — each one vetted,
              proven and passionate about the art of storytelling. We built a
              platform where authors receive not just a writing service but a
              true creative partnership — one built on trust, confidentiality
              and an unwavering commitment to quality.
            </p>
            <p className="ab-body">
              Today GhostWriterHunt has helped more than 500 authors across
              every genre and format bring their books to life — from personal
              memoirs treasured by families to business books that have opened
              doors, and novels that have found readers around the world.
            </p>
          </div>
          <div className="ab-slide-right">
            <FloatingImages images={STORY_IMAGES} />
          </div>
        </div>
      </section>

      {/* —— Section 3: Mission & Values —— */}
      <section className="ab-values">
        <div className="ab-wrap">
          <p className="ab-label-gold">WHAT WE STAND FOR</p>
          <h2 className="ab-values-title">
            Our mission and <em>core values.</em>
          </h2>
          <p className="ab-values-sub">
            Everything we do is guided by four principles that have defined
            GhostWriterHunt from day one.
          </p>

          <div className="ab-values-grid">
            <div className="ab-vcard-1 ab-rotate-in" data-delay="0">
              <ValueIcon type="shield" size={32} color="#FFFFFF" />
              <h3 className="ab-vcard-title">Absolute Confidentiality</h3>
              <p className="ab-vcard-desc">
                Every project is protected by a comprehensive NDA from day one.
                Your story, your ideas and your identity are completely safe
                with us — always and without exception.
              </p>
            </div>

            <div className="ab-vcard-2 ab-rotate-in" data-delay="100">
              <ValueIcon type="star" size={28} color="#C9A84C" />
              <h3 className="ab-vcard-title">Uncompromising Quality</h3>
              <p className="ab-vcard-desc">
                We accept only the top 1% of ghostwriter applicants — each one
                vetted, proven and passionate.
              </p>
            </div>

            <div className="ab-vcard-3 ab-rotate-in" data-delay="200">
              <ValueIcon type="heart" size={28} color="#C9A84C" />
              <h3 className="ab-vcard-title">Author First Always</h3>
              <p className="ab-vcard-desc">
                Your vision guides everything. We write in your voice and
                deliver a book that feels completely and authentically yours.
              </p>
            </div>

            <div className="ab-vcard-4 ab-fade-up" data-delay="300">
              <ValueIcon type="globe" size={36} color="#C9A84C" />
              <div>
                <h3 className="ab-vcard-title">Global Publishing Reach</h3>
                <p className="ab-vcard-desc">
                  We publish your book to 12+ platforms worldwide — and you keep
                  100% of your rights and royalties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* —— Section 4: Stats —— */}
      <section className="ab-stats">
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

      {/* —— Section 5: Team —— */}
      <section className="ab-section-white" id="team">
        <div className="ab-wrap">
          <div className="ab-center">
            <p className="ab-label-olive">THE PEOPLE BEHIND THE PLATFORM</p>
            <h2 className="ab-h2-center">
              Meet the team behind <em>GhostWriterHunt.</em>
            </h2>
            <p className="ab-sub-center">
              A passionate team of publishing professionals dedicated to helping
              authors worldwide share their stories with the world.
            </p>
          </div>
          <div className="ab-team-grid">
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                className="ab-team-card ab-scale-up"
                data-delay={String(i * 80)}
              >
                {member.initials ? (
                  <div className="ab-avatar-ar" aria-hidden="true">
                    A.R
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="ab-avatar-photo"
                  />
                )}
                <h3 className="ab-team-name">{member.name}</h3>
                <p className="ab-team-role">{member.role}</p>
                <p className="ab-team-bio">{member.bio}</p>
                <span className="ab-team-chip">{member.chip}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* —— Section 6: Why Choose Us —— */}
      <section className="ab-section-cream">
        <div className="ab-wrap ab-two-col">
          <div className="ab-slide-left">
            <p className="ab-label-olive">WHY GHOSTWRITERHUNT</p>
            <h2 className="ab-h2">
              The professional choice for <em>serious authors.</em>
            </h2>
            <p className="ab-body">
              We are not a marketplace where anyone can sign up and start
              writing. GhostWriterHunt is a curated platform of proven publishing
              professionals — each one selected for their expertise, their craft
              and their commitment to client confidentiality. When you work with
              us, you work with the best.
            </p>
            <ul className="ab-bullets">
              {WHY_BULLETS.map((item) => (
                <li key={item} className="ab-bullet">
                  <span className="ab-check" aria-hidden="true">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="ab-slide-right">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/modern-office.webp"
              alt="Professional team"
              className="ab-why-img"
              width="800"
              height="533"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* —— Section 7: CTA —— */}
      <section className="ab-cta">
        <div className="ab-cta-overlay" aria-hidden="true" />
        <div className="ab-cta-inner ab-fade-up" data-delay="0">
          <p className="ab-label-gold">START YOUR JOURNEY</p>
          <h2 className="ab-cta-title">
            Your story is waiting
            <br />
            <em>to be written.</em>
          </h2>
          <p className="ab-cta-sub">
            Join thousands of authors who trusted GhostWriterHunt to bring their
            book to life.
          </p>
          <div className="ab-cta-btns">
            <a href="/#start" className="ab-btn-gold">
              Start Your Book Today
            </a>
            <a href="/#start" className="ab-btn-outline">
              Book Free Consultation
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
