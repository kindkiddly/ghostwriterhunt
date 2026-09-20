"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { servicesByCategory } from "@/data/services";

/**
 * GhostWriterHunt — primary site navigation
 * Flex row: logo left · links center · CTAs right.
 * Transparent→solid sticky bar on scroll + mobile drawer.
 * Services mega menu (desktop hover) + accordion (mobile).
 */

const CATEGORY_ORDER = [
  "Writing",
  "Editing",
  "Design",
  "Publishing",
  "Marketing",
];

function ChevronIcon({ open }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      style={{
        marginLeft: 6,
        transition: "transform 0.2s ease",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        flexShrink: 0,
      }}
    >
      <path
        d="M2.5 4.5L6 8L9.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname() || "";
  const isLegalPage =
    [
      "/privacy-policy",
      "/terms-of-use",
      "/cookie-policy",
      "/legal",
    ].includes(pathname) || pathname.startsWith("/about");

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const closeTimer = useRef(null);
  const aboutCloseTimer = useRef(null);
  const servicesLinkRef = useRef(null);
  const aboutLinkRef = useRef(null);
  const megaMenuRef = useRef(null);
  const aboutMenuRef = useRef(null);

  useEffect(() => {
    // Smooth in-page jumps for hash nav links
    document.documentElement.style.scrollBehavior = "smooth";

    if (isLegalPage) {
      setScrolled(true);
      return;
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLegalPage]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mega menus on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setMegaMenuOpen(false);
        setAboutMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Clear close timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(closeTimer.current);
      clearTimeout(aboutCloseTimer.current);
    };
  }, []);

  const handleServicesEnter = () => {
    clearTimeout(closeTimer.current);
    setAboutMenuOpen(false);
    setMegaMenuOpen(true);
  };

  const handleServicesLeave = () => {
    closeTimer.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 150);
  };

  const handleMenuEnter = () => {
    clearTimeout(closeTimer.current);
  };

  const handleMenuLeave = () => {
    setMegaMenuOpen(false);
  };

  const handleAboutEnter = () => {
    clearTimeout(aboutCloseTimer.current);
    setMegaMenuOpen(false);
    setAboutMenuOpen(true);
  };

  const handleAboutLeave = () => {
    aboutCloseTimer.current = setTimeout(() => {
      setAboutMenuOpen(false);
    }, 150);
  };

  const handleAboutMenuEnter = () => {
    clearTimeout(aboutCloseTimer.current);
  };

  const handleAboutMenuLeave = () => {
    setAboutMenuOpen(false);
  };

  const navLinks = [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Services", href: "#services", isServices: true },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
    { label: "About Us", href: "/about", isAbout: true },
    { label: "Contact", href: "/#start" },
  ];

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

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
        boxShadow: isLegalPage
          ? "0 1px 20px rgba(0,0,0,0.06)"
          : scrolled || mobileOpen || megaMenuOpen || aboutMenuOpen
            ? "0 1px 20px rgba(0,0,0,0.06)"
            : "none",
        backdropFilter: isLegalPage
          ? "none"
          : scrolled || mobileOpen || megaMenuOpen || aboutMenuOpen
            ? "blur(12px)"
            : "none",
        background: isLegalPage
          ? "rgba(250,250,247,0.98)"
          : scrolled || mobileOpen || megaMenuOpen || aboutMenuOpen
            ? "rgba(250,250,247,0.98)"
            : "linear-gradient(to bottom, rgba(250,250,247,0.95) 0%, rgba(250,250,247,0.6) 60%, rgba(250,250,247,0) 100%)",
        transition: isLegalPage
          ? "none"
          : "background 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      <style>{`
        /* Desktop mega menu */
        .nav-mega {
          display: none;
        }
        @media (min-width: 769px) {
          .nav-mega {
            display: block;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            width: 100%;
            background: #FFFFFF;
            border-bottom: 1px solid #E8D5A3;
            box-shadow: 0 8px 40px rgba(0,0,0,0.08);
            z-index: 999;
            padding: 40px 0 0;
            opacity: 0;
            transform: translateY(-10px);
            pointer-events: none;
            transition:
              opacity 0.2s ease-in,
              transform 0.2s ease-in;
          }
          .nav-mega.open {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
            transition:
              opacity 0.25s ease-out,
              transform 0.25s ease-out;
          }
        }
        .nav-mega-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
        }
        .nav-mega-col {
          padding: 0 28px;
          border-right: 1px solid #F0E8D5;
        }
        .nav-mega-col:last-child {
          border-right: none;
        }
        .nav-mega-heading {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 600;
          font-size: 11px;
          color: #C9A84C;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin: 0 0 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #E8D5A3;
        }
        .nav-mega-link {
          display: block;
          padding: 8px 0;
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #444444;
          text-decoration: none;
          border-radius: 4px;
          transition: color 0.15s ease, padding-left 0.15s ease;
        }
        .nav-mega-link:hover {
          color: #C9A84C;
          padding-left: 4px;
        }
        .nav-mega-footer {
          max-width: 1200px;
          margin: 24px auto 0;
          padding: 16px 24px 24px;
          border-top: 1px solid #F0E8D5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .nav-mega-footer-left {
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #666666;
        }
        .nav-mega-footer-link {
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #C9A84C;
          text-decoration: none;
          margin-left: 6px;
        }
        .nav-mega-footer-link:hover {
          text-decoration: underline;
        }
        .nav-mega-footer-right {
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #C9A84C;
          text-decoration: none;
          white-space: nowrap;
        }
        .nav-mega-footer-right:hover {
          text-decoration: underline;
        }

        /* About Us mega — single column (does not alter Services grid) */
        .nav-mega-about .nav-mega-inner {
          grid-template-columns: minmax(200px, 280px);
        }

        /* Mobile services accordion */
        .nav-mobile-svc-list {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.3s ease, opacity 0.25s ease;
          padding-left: 12px;
        }
        .nav-mobile-svc-list.open {
          max-height: 1200px;
          opacity: 1;
        }
        .nav-mobile-cat {
          margin-top: 8px;
          margin-bottom: 4px;
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #C9A84C;
          padding: 8px 16px 4px;
        }
        .nav-mobile-svc-link {
          display: block;
          padding: 8px 16px;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #444444;
          text-decoration: none;
        }
        .nav-mobile-svc-link:hover {
          color: #C9A84C;
        }
      `}</style>

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
            className="max-h-[48px] max-w-[180px] md:max-h-[64px] md:max-w-[240px]"
          />
        </a>

        {/* CENTER — Desktop nav links */}
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
          {navLinks.map((link) => {
            if (link.isServices) {
              return (
                <li
                  key={link.href}
                  style={{ display: "flex", height: "70px" }}
                  ref={servicesLinkRef}
                  onMouseEnter={handleServicesEnter}
                  onMouseLeave={handleServicesLeave}
                >
                  <a
                    href={link.href}
                    aria-haspopup="true"
                    aria-expanded={megaMenuOpen}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "70px",
                      padding: "0 16px",
                      fontSize: "15px",
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontWeight: 500,
                      color: megaMenuOpen ? "#C9A84C" : "#1C1C1C",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#C9A84C";
                    }}
                    onMouseLeave={(e) => {
                      if (!megaMenuOpen) {
                        e.currentTarget.style.color = "#1C1C1C";
                      }
                    }}
                  >
                    {link.label}
                    <ChevronIcon open={megaMenuOpen} />
                  </a>
                </li>
              );
            }

            if (link.isAbout) {
              return (
                <li
                  key={link.href}
                  style={{ display: "flex", height: "70px" }}
                  ref={aboutLinkRef}
                  onMouseEnter={handleAboutEnter}
                  onMouseLeave={handleAboutLeave}
                >
                  <a
                    href={link.href}
                    aria-haspopup="true"
                    aria-expanded={aboutMenuOpen}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "70px",
                      padding: "0 16px",
                      fontSize: "15px",
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontWeight: 500,
                      color: aboutMenuOpen ? "#C9A84C" : "#1C1C1C",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#C9A84C";
                    }}
                    onMouseLeave={(e) => {
                      if (!aboutMenuOpen) {
                        e.currentTarget.style.color = "#1C1C1C";
                      }
                    }}
                  >
                    {link.label}
                    <ChevronIcon open={aboutMenuOpen} />
                  </a>
                </li>
              );
            }

            return (
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
            );
          })}
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

      {/* Desktop Services mega menu */}
      <div
        ref={megaMenuRef}
        className={`nav-mega${megaMenuOpen ? " open" : ""}`}
        onMouseEnter={handleMenuEnter}
        onMouseLeave={handleMenuLeave}
        aria-hidden={!megaMenuOpen}
      >
        <div className="nav-mega-inner">
          {CATEGORY_ORDER.map((category) => {
            const items = servicesByCategory[category] || [];
            return (
              <div key={category} className="nav-mega-col">
                <p className="nav-mega-heading">{category}</p>
                {items.map((service) => (
                  <a
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="nav-mega-link"
                    onClick={() => setMegaMenuOpen(false)}
                  >
                    {service.title}
                  </a>
                ))}
              </div>
            );
          })}
        </div>

        <div className="nav-mega-footer">
          <p className="nav-mega-footer-left">
            Not sure where to start?
            <a href="/#start" className="nav-mega-footer-link">
              Book a free consultation →
            </a>
          </p>
          <a href="/#services" className="nav-mega-footer-right">
            View all services →
          </a>
        </div>
      </div>

      {/* Desktop About Us mega menu */}
      <div
        ref={aboutMenuRef}
        className={`nav-mega nav-mega-about${aboutMenuOpen ? " open" : ""}`}
        onMouseEnter={handleAboutMenuEnter}
        onMouseLeave={handleAboutMenuLeave}
        aria-hidden={!aboutMenuOpen}
      >
        <div className="nav-mega-inner">
          <div className="nav-mega-col">
            <p className="nav-mega-heading">COMPANY</p>
            <a
              href="/about"
              className="nav-mega-link"
              onClick={() => setAboutMenuOpen(false)}
            >
              About Us
            </a>
          </div>
        </div>

        <div className="nav-mega-footer">
          <p className="nav-mega-footer-left">
            <a
              href="/about"
              className="nav-mega-footer-link"
              style={{ marginLeft: 0 }}
              onClick={() => setAboutMenuOpen(false)}
            >
              Learn more about our team →
            </a>
          </p>
          <a
            href="/#start"
            className="nav-mega-footer-right"
            onClick={() => setAboutMenuOpen(false)}
          >
            Contact Us →
          </a>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`overflow-hidden border-t border-[#E8D5A3] bg-[#FFFFFF] transition-all duration-300 ease-in-out md:hidden ${
          mobileOpen
            ? "max-h-[90vh] overflow-y-auto opacity-100"
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
          {navLinks.map((link) => {
            if (link.isServices) {
              return (
                <li key={link.href}>
                  <button
                    type="button"
                    aria-expanded={mobileServicesOpen}
                    aria-haspopup="true"
                    onClick={() =>
                      setMobileServicesOpen((open) => !open)
                    }
                    className="flex w-full items-center justify-between px-4 py-3 font-inter text-[15px] font-medium text-[#1C1C1C] transition-colors duration-200 hover:text-[#C9A84C]"
                    style={{
                      color: mobileServicesOpen ? "#C9A84C" : "#1C1C1C",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span>{link.label}</span>
                    <ChevronIcon open={mobileServicesOpen} />
                  </button>

                  <div
                    className={`nav-mobile-svc-list${mobileServicesOpen ? " open" : ""}`}
                  >
                    {CATEGORY_ORDER.map((category) => {
                      const items = servicesByCategory[category] || [];
                      return (
                        <div key={category}>
                          <p className="nav-mobile-cat">{category}</p>
                          {items.map((service) => (
                            <a
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              onClick={closeMobile}
                              className="nav-mobile-svc-link"
                            >
                              {service.title}
                            </a>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </li>
              );
            }

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMobile}
                  className="block px-4 py-3 font-inter text-[15px] font-medium text-[#1C1C1C] transition-colors duration-200 hover:text-[#C9A84C]"
                >
                  {link.label}
                </a>
              </li>
            );
          })}
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
