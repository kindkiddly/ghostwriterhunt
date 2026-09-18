"use client";

import { useEffect, useState } from "react";

/**
 * GhostWriterHunt — primary site navigation
 * Inspired by Reedsy / Superside: logo left, centered links,
 * dual CTAs right, transparent→solid sticky bar on scroll,
 * and a clean mobile drawer.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Solid white navbar only after scrolling past the hero / nav zone
      setScrolled(window.scrollY > 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
  ];

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] w-full transition-all duration-[400ms] ease-in-out ${
        scrolled || mobileOpen
          ? "border-b border-[#E8D5A3] shadow-[0_2px_20px_rgba(0,0,0,0.06)] backdrop-blur-[12px]"
          : "border-b border-transparent shadow-none backdrop-blur-none"
      }`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: "100%",
        // At top: cream fades to transparent so hero books show through
        // After scroll: near-solid cream for readability
        background:
          scrolled || mobileOpen
            ? "rgba(250,250,247,0.98)"
            : "linear-gradient(to bottom, rgba(250,250,247,0.95) 0%, rgba(250,250,247,0.7) 50%, rgba(250,250,247,0) 100%)",
        transition: "background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
      }}
    >
      <nav
        className="relative mx-auto flex h-[70px] max-w-[1200px] items-center justify-between px-6 lg:px-8"
        aria-label="Primary"
      >
        {/* Logo (left) */}
        <a
          href="/"
          className="flex h-[70px] items-center font-playfair text-[22px] font-bold leading-none text-[#1C1C1C] transition-colors duration-200 hover:text-[#C9A84C]"
          onClick={closeMobile}
        >
          GhostWriterHunt
        </a>

        {/* Desktop nav links — equal spacing, matched padding */}
        <ul className="absolute left-1/2 hidden h-[70px] -translate-x-1/2 items-center md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex h-[70px] items-center px-4 font-inter text-[15px] font-medium text-[#1C1C1C] transition-colors duration-200 hover:text-[#C9A84C]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs — matched 40px height */}
        <div className="hidden h-[70px] items-center gap-3 md:flex">
          <a
            href="#sign-in"
            className="inline-flex h-10 items-center justify-center px-4 font-inter text-[14px] font-medium text-[#1C1C1C] transition-colors duration-200 hover:text-[#C9A84C]"
          >
            Sign In
          </a>
          <a
            href="#start"
            className="inline-flex h-10 items-center justify-center rounded-[6px] bg-[#C9A84C] px-5 font-inter text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#B8960C]"
          >
            Start Your Book
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="relative z-10 flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="sr-only">{mobileOpen ? "Close" : "Menu"}</span>
          <span className="flex w-5 flex-col gap-[5px]">
            <span
              className={`block h-[1.5px] w-full origin-center bg-[#1C1C1C] transition-transform duration-300 ${
                mobileOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-full bg-[#1C1C1C] transition-opacity duration-300 ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-[1.5px] w-full origin-center bg-[#1C1C1C] transition-transform duration-300 ${
                mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`overflow-hidden border-t border-[#E8D5A3] bg-[#FFFFFF] transition-all duration-300 ease-in-out md:hidden ${
          mobileOpen
            ? "max-h-[420px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMobile}
                className="block px-4 py-3 font-inter text-[15px] font-medium text-[#1C1C1C] transition-colors duration-200 hover:text-[#C9A84C]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-3 border-t border-[#E8D5A3] px-6 py-5">
          <a
            href="#sign-in"
            onClick={closeMobile}
            className="inline-flex h-10 items-center justify-center px-4 font-inter text-[14px] font-medium text-[#1C1C1C] transition-colors duration-200 hover:text-[#C9A84C]"
          >
            Sign In
          </a>
          <a
            href="#start"
            onClick={closeMobile}
            className="inline-flex h-10 w-full items-center justify-center rounded-[6px] bg-[#C9A84C] px-5 font-inter text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#B8960C]"
          >
            Start Your Book
          </a>
        </div>
      </div>
    </header>
  );
}
