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

  // Toggle solid background + warm shadow after a short scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
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
      className={`fixed top-0 left-0 right-0 z-[9999] w-full border-b border-[#E8D5A3] transition-all duration-300 ease-in-out ${
        scrolled || mobileOpen
          ? "bg-[#FFFFFF] shadow-[0_4px_24px_rgba(201,168,76,0.12)]"
          : "bg-[#FFFFFF]/90 backdrop-blur-sm shadow-none"
      }`}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}
    >
      <nav
        className="relative mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6 lg:px-8"
        aria-label="Primary"
      >
        {/* ——— Logo (left) ——— */}
        <a
          href="/"
          className="font-playfair text-[22px] font-bold leading-none text-[#1C1C1C] transition-colors duration-200 hover:text-[#C9A84C]"
          onClick={closeMobile}
        >
          GhostWriterHunt
        </a>

        {/* ——— Desktop nav links (center) ——— */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-inter text-[15px] font-medium text-[#1C1C1C] transition-colors duration-200 hover:text-[#C9A84C]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ——— Desktop CTAs (right) ——— */}
        <div className="hidden items-center gap-6 md:flex">
          <a
            href="#sign-in"
            className="font-inter text-[15px] font-medium text-[#1C1C1C] transition-colors duration-200 hover:text-[#C9A84C]"
          >
            Sign In
          </a>
          <a
            href="#start"
            className="rounded-[6px] bg-[#C9A84C] px-6 py-3 font-inter text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#B8960C]"
          >
            Start Your Book
          </a>
        </div>

        {/* ——— Mobile hamburger ——— */}
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

      {/* ——— Mobile dropdown panel ——— */}
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
                className="block py-3 font-inter text-[15px] font-medium text-[#1C1C1C] transition-colors duration-200 hover:text-[#C9A84C]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 border-t border-[#E8D5A3] px-6 py-5">
          <a
            href="#sign-in"
            onClick={closeMobile}
            className="py-2 text-center font-inter text-[15px] font-medium text-[#1C1C1C] transition-colors duration-200 hover:text-[#C9A84C]"
          >
            Sign In
          </a>
          <a
            href="#start"
            onClick={closeMobile}
            className="rounded-[6px] bg-[#C9A84C] px-6 py-3 text-center font-inter text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#B8960C]"
          >
            Start Your Book
          </a>
        </div>
      </div>
    </header>
  );
}
