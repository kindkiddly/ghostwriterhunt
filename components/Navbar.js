"use client";

import { useEffect, useState } from "react";

/**
 * GhostWriterHunt — primary site navigation
 * Flex row: logo left · links center · CTAs right.
 * Transparent→solid sticky bar on scroll + mobile drawer.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Smooth in-page jumps for hash nav links
    document.documentElement.style.scrollBehavior = "smooth";

    const onScroll = () => {
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
    { label: "Our Writers", href: "#writers" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  const closeMobile = () => setMobileOpen(false);

  const linkHover = {
    onMouseEnter: (e) => {
      e.currentTarget.style.color = "#C9A84C";
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.color = "#1C1C1C";
    },
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[1000] w-full outline-none"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: "100%",
        height: "70px",
        border: "none",
        borderBottom: "none",
        outline: "none",
        boxShadow:
          scrolled || mobileOpen
            ? "0 1px 20px rgba(0,0,0,0.06)"
            : "none",
        backdropFilter:
          scrolled || mobileOpen ? "blur(12px)" : "none",
        background:
          scrolled || mobileOpen
            ? "rgba(250,250,247,0.98)"
            : "linear-gradient(to bottom, rgba(250,250,247,0.95) 0%, rgba(250,250,247,0.6) 60%, rgba(250,250,247,0) 100%)",
        transition: "background 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      {/* Inner bar — logo | nav | CTAs */}
      <nav
        aria-label="Primary"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "70px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT — Logo */}
        <a
          href="/"
          onClick={closeMobile}
          style={{
            display: "flex",
            alignItems: "center",
            height: "70px",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/GhostWriterHunt-LOGO-Transparent.webp"
            alt="GhostWriterHunt"
            style={{
              height: "64px",
              width: "auto",
              maxWidth: "240px",
              objectFit: "contain",
              display: "block",
            }}
          />
        </a>

        {/* CENTER — Desktop nav links (flex:1 keeps them truly centered) */}
        <ul
          className="hidden md:!flex"
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            height: "70px",
            flex: 1,
            padding: "0 40px",
            listStyle: "none",
            margin: 0,
          }}
        >
          {navLinks.map((link) => (
            <li key={link.href} style={{ display: "flex", height: "70px" }}>
              <a
                href={link.href}
                {...linkHover}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "70px",
                  padding: "0 16px",
                  fontSize: "15px",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontWeight: 500,
                  color: "#1C1C1C",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s ease",
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* RIGHT — Desktop CTAs */}
        <div
          className="hidden md:!flex"
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
            height: "70px",
            flexShrink: 0,
          }}
        >
          <a
            href="#sign-in"
            {...linkHover}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "40px",
              padding: "0 16px",
              fontSize: "14px",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontWeight: 500,
              color: "#1C1C1C",
              background: "transparent",
              border: "none",
              textDecoration: "none",
              whiteSpace: "nowrap",
              cursor: "pointer",
              transition: "color 0.2s ease",
            }}
          >
            Sign In
          </a>
          <a
            href="#start"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "40px",
              padding: "0 20px",
              fontSize: "14px",
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontWeight: 600,
              color: "#FFFFFF",
              background: "#C9A84C",
              border: "none",
              borderRadius: "6px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#B8960C";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#C9A84C";
            }}
          >
            Start Your Book
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex md:!hidden"
          style={{
            position: "relative",
            zIndex: 10,
            height: "40px",
            width: "40px",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
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
            ? "max-h-[520px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
        style={{
          position: "absolute",
          top: "70px",
          left: 0,
          right: 0,
        }}
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
