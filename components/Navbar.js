"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Link from "next/link";
import { SHARED_PRICING } from "@/data/pricing";
import { startPackageCheckout } from "@/lib/stripe/checkoutButton";

/**
 * GhostWriterHunt — primary site navigation
 * Flex row: logo left · links center · CTAs right.
 * Transparent→solid sticky bar on scroll + mobile drawer.
 * Services mega menu (desktop hover) + accordion (mobile).
 */

/** Desktop/mobile Services mega menu — 3 columns (sources unchanged: same slugs/URLs). */
const SERVICES_MEGA_GROUPS = [
  { id: "writing", heading: "Writing", categories: ["Writing"] },
  { id: "editing-design", heading: "Editing & Design", categories: ["Editing", "Design"] },
  {
    id: "publishing-marketing",
    heading: "Publishing & Marketing",
    categories: ["Publishing", "Marketing"],
  },
];

function servicesForMegaGroup(servicesByCategory, group) {
  return group.categories.flatMap((cat) => servicesByCategory[cat] || []);
}

function ServiceLineIcon({ category }) {
  const svgProps = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    className: "shrink-0",
  };
  const stroke = "#C9A84C";
  const sw = 1.5;

  switch (category) {
    case "Editing":
      return (
        <svg {...svgProps}>
          <path d="M5 5h14v14H5z" stroke={stroke} strokeWidth={sw} />
          <path d="M8 9h8M8 13h8M8 17h5" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "Design":
      return (
        <svg {...svgProps}>
          <rect x="4" y="4" width="16" height="16" rx="2" stroke={stroke} strokeWidth={sw} />
          <path d="M4 15l4-4 3 3 5-6 4 4" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "Publishing":
      return (
        <svg {...svgProps}>
          <path d="M6 4h10a2 2 0 012 2v14H8a2 2 0 00-2 2V4z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <path d="M8 4v16" stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    case "Marketing":
      return (
        <svg {...svgProps}>
          <path d="M4 10v4l12-4-12-4z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          <path d="M16 8v8" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "Writing":
    default:
      return (
        <svg {...svgProps}>
          <path d="M12 20h9" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path
            d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

const PAYMENT_PACKAGE_KEY = {
  Starter: "starter",
  Professional: "professional",
  "Complete Publishing Package": "complete",
};

const PAYMENT_PACKAGES = SHARED_PRICING.map((tier) => ({
  packageKey: PAYMENT_PACKAGE_KEY[tier.name],
  name: tier.name,
  priceUsd: tier.price.fullBook,
}));

const ABOUT_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Legal", href: "/legal" },
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

/**
 * Links inside the dropdown / mobile menus stay mounted while closed, so
 * viewport prefetching would fetch every service page on each load.
 * Prefetch only on intent (hover, focus, touch) instead.
 */
function MenuLink({ href, onMouseEnter, onFocus, onTouchStart, ...props }) {
  const router = useRouter();
  const prefetchOnIntent = (handler) => (e) => {
    router.prefetch(href);
    handler?.(e);
  };
  return (
    <Link
      href={href}
      prefetch={false}
      onMouseEnter={prefetchOnIntent(onMouseEnter)}
      onFocus={prefetchOnIntent(onFocus)}
      onTouchStart={prefetchOnIntent(onTouchStart)}
      {...props}
    />
  );
}

export default function Navbar({ servicesByCategory = {} }) {
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
  const [paymentMenuOpen, setPaymentMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobilePaymentOpen, setMobilePaymentOpen] = useState(false);
  const [paymentCheckoutKey, setPaymentCheckoutKey] = useState(null);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  const closeTimer = useRef(null);
  const aboutCloseTimer = useRef(null);
  const paymentCloseTimer = useRef(null);
  const servicesLinkRef = useRef(null);
  const aboutLinkRef = useRef(null);
  const paymentLinkRef = useRef(null);
  const megaMenuRef = useRef(null);
  const aboutMenuRef = useRef(null);
  const paymentMenuRef = useRef(null);

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

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => setIsMobileViewport(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Close mega menus on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setMegaMenuOpen(false);
        setAboutMenuOpen(false);
        setPaymentMenuOpen(false);
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
      clearTimeout(paymentCloseTimer.current);
    };
  }, []);

  async function handleNavPackageCheckout(packageKey) {
    if (!packageKey || paymentCheckoutKey) return;
    setPaymentCheckoutKey(packageKey);
    try {
      await startPackageCheckout(packageKey);
    } catch (err) {
      console.error("nav checkout:", err);
      setPaymentCheckoutKey(null);
    }
  }

  const handleServicesEnter = () => {
    clearTimeout(closeTimer.current);
    setAboutMenuOpen(false);
    setPaymentMenuOpen(false);
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
    setPaymentMenuOpen(false);
    setAboutMenuOpen(true);
  };

  const handlePaymentEnter = () => {
    clearTimeout(paymentCloseTimer.current);
    setMegaMenuOpen(false);
    setAboutMenuOpen(false);
    setPaymentMenuOpen(true);
  };

  const handlePaymentLeave = () => {
    paymentCloseTimer.current = setTimeout(() => {
      setPaymentMenuOpen(false);
    }, 150);
  };

  const handlePaymentMenuEnter = () => {
    clearTimeout(paymentCloseTimer.current);
  };

  const handlePaymentMenuLeave = () => {
    setPaymentMenuOpen(false);
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
    { label: "Payment", href: "#payment", isPayment: true },
    { label: "FAQ", href: "/#faq" },
    { label: "About Us", href: "/about", isAbout: true },
    { label: "Contact", href: "/#start" },
  ];

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setMobileAboutOpen(false);
    setMobilePaymentOpen(false);
  };

  const linkHover = {
    onMouseEnter: (e) => {
      e.currentTarget.style.color = "#C9A84C";
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.color = "#1C1C1C";
    },
  };

  if (pathname.startsWith("/admin")) return null;

  const isHome = pathname === "/";
  const navBarSolid =
    isLegalPage ||
    scrolled ||
    mobileOpen ||
    megaMenuOpen ||
    aboutMenuOpen ||
    paymentMenuOpen;
  const navTopGradient =
    !navBarSolid && !(isHome && isMobileViewport);

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
        boxShadow: navBarSolid ? "0 1px 20px rgba(0,0,0,0.06)" : "none",
        backdropFilter:
          navBarSolid && !isLegalPage ? "blur(12px)" : "none",
        background: navBarSolid || !navTopGradient
          ? "rgba(250,250,247,0.98)"
          : "linear-gradient(to bottom, rgba(250,250,247,0.95) 0%, rgba(250,250,247,0.6) 60%, rgba(250,250,247,0) 100%)",
        transition: isLegalPage
          ? "none"
          : "background 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
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
        .nav-mega-link {
          font-family: var(--font-inter), sans-serif;
          text-decoration: none;
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
          font-family: var(--font-inter), sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #666666;
        }
        .nav-mega-footer-link {
          font-family: var(--font-inter), sans-serif;
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
          font-family: var(--font-inter), sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #C9A84C;
          text-decoration: none;
          white-space: nowrap;
        }
        .nav-mega-footer-right:hover {
          text-decoration: underline;
        }

        /* About Us — slim horizontal bar */
        .nav-mega-about {
          padding: 0;
          border-bottom: 1px solid #E8D5A3;
          box-shadow: 0 6px 24px rgba(0,0,0,0.06);
        }
        .nav-mega-about .nav-mega-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 24px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 6px 22px;
        }
        .nav-about-link {
          display: inline-block;
          padding: 4px 0;
          font-family: var(--font-inter), sans-serif;
          font-weight: 500;
          font-size: 14px;
          color: #444444;
          white-space: nowrap;
          transition: color 0.15s ease;
        }
        .nav-about-link:hover {
          color: #C9A84C;
        }

        /* Services mega — frosted panel + tile grid */
        .nav-mega-services {
          padding: 0;
          background: transparent;
          border-bottom: none;
          box-shadow: none;
          transform: none;
          transition: opacity 0s;
        }
        .nav-mega-services.open {
          transform: none;
          transition: opacity 0s;
        }
        .nav-mega-services-panel {
          max-width: 1200px;
          margin: 0 auto;
          padding: 18px 24px 14px;
          background: rgba(250, 250, 247, 0.92);
          border: 1px solid rgba(232, 213, 163, 0.9);
          border-top: none;
          border-radius: 0 0 14px 14px;
          box-shadow: 0 14px 44px rgba(28, 28, 28, 0.1);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
          .nav-mega-services-panel {
            background: rgba(250, 250, 247, 0.98);
          }
        }
        .nav-mega-services-inner {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px 28px;
        }
        .nav-svc-col-heading {
          margin: 0 0 10px;
          font-family: var(--font-inter), sans-serif;
          font-weight: 600;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C9A84C;
        }
        .nav-svc-col-tiles {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
        }
        .nav-svc-tile {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          min-height: 76px;
          height: 100%;
          padding: 12px 12px 10px;
          border-radius: 10px;
          border: 1px solid transparent;
          background: rgba(255, 255, 255, 0.45);
          text-decoration: none;
          opacity: 0;
          transform: translateY(2px);
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }
        .nav-mega-services.open .nav-svc-tile {
          animation: nav-svc-tile-in 0.12s ease forwards;
          animation-delay: calc(var(--tile-i, 0) * 12ms);
        }
        @keyframes nav-svc-tile-in {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .nav-svc-tile:hover {
          transform: translateY(-2px);
          border-color: rgba(201, 168, 76, 0.35);
          background: rgba(255, 255, 255, 0.75);
        }
        .nav-svc-tile-name {
          position: relative;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-family: var(--font-inter), sans-serif;
          font-weight: 500;
          font-size: 13px;
          line-height: 1.35;
          text-align: left;
          color: #1C1C1C;
          transition: color 0.2s ease;
        }
        .nav-svc-tile-name::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 1px;
          background: #C9A84C;
          transition: width 0.2s ease;
        }
        .nav-svc-tile:hover .nav-svc-tile-name {
          color: #C9A84C;
        }
        .nav-svc-tile:hover .nav-svc-tile-name::after {
          width: 100%;
        }
        .nav-mega-services-footer {
          max-width: 1200px;
          margin: 10px auto 0;
          padding: 12px 24px 16px;
          border-top: 1px solid rgba(232, 213, 163, 0.65);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        @media (prefers-reduced-motion: reduce) {
          .nav-svc-tile,
          .nav-mega-services.open .nav-svc-tile {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .nav-svc-tile:hover {
            transform: none;
          }
        }

        .nav-mega-payment {
          padding: 28px 0 24px;
        }
        .nav-mega-payment .nav-mega-inner {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: stretch;
          justify-content: center;
          gap: 12px;
          max-width: 1200px;
          padding: 0 24px;
        }
        .nav-payment-pkg {
          flex: 1 1 200px;
          max-width: 260px;
          text-align: left;
          padding: 16px 18px;
          border: 1px solid #F0E8D5;
          border-radius: 10px;
          background: #FFFCF5;
          cursor: pointer;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .nav-payment-pkg:hover:not(:disabled) {
          border-color: #C9A84C;
          box-shadow: 0 4px 16px rgba(201, 168, 76, 0.15);
        }
        .nav-payment-pkg:disabled {
          opacity: 0.65;
          cursor: wait;
        }
        .nav-payment-pkg-name {
          display: block;
          font-family: var(--font-playfair), serif;
          font-size: 17px;
          font-weight: 700;
          color: #1C1C1C;
          margin-bottom: 4px;
        }
        .nav-payment-pkg-price {
          font-family: var(--font-inter), sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #C9A84C;
        }
        .nav-payment-custom {
          flex: 1 1 240px;
          max-width: 320px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 16px 18px;
          border: 1px solid #E8D5A3;
          border-radius: 10px;
          background: #FFFFFF;
          text-decoration: none;
          transition: border-color 0.15s ease;
        }
        .nav-payment-custom:hover {
          border-color: #C9A84C;
        }
        .nav-payment-custom-title {
          font-family: var(--font-inter), sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #1C1C1C;
          margin-bottom: 6px;
        }
        .nav-payment-custom-note {
          font-family: var(--font-inter), sans-serif;
          font-size: 13px;
          line-height: 1.45;
          color: #666666;
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
          font-family: var(--font-inter), sans-serif;
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
          font-family: var(--font-inter), sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #444444;
          text-decoration: none;
        }
        .nav-mobile-svc-link:hover {
          color: #C9A84C;
        }
        .nav-mobile-svc-tiles {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
          padding: 4px 8px 12px 12px;
        }
        .nav-mobile-svc-tile {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          min-height: 64px;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid #F0E8D5;
          background: #FFFCF5;
          text-decoration: none;
        }
        .nav-mobile-svc-tile-name {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-family: var(--font-inter), sans-serif;
          font-weight: 500;
          font-size: 13px;
          line-height: 1.35;
          color: #1C1C1C;
        }
        .nav-mobile-svc-tile:active,
        .nav-mobile-svc-tile:hover {
          border-color: #E8D5A3;
          color: #C9A84C;
        }
        .nav-mobile-svc-tile:active .nav-mobile-svc-tile-name,
        .nav-mobile-svc-tile:hover .nav-mobile-svc-tile-name {
          color: #C9A84C;
        }
      ` }} />

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
        <Link
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
            width={400}
            height={160}
            fetchPriority="high"
            style={{
              height: "64px",
              width: "auto",
              maxWidth: "240px",
              objectFit: "contain",
              display: "block",
            }}
            className="max-h-[48px] max-w-[180px] md:max-h-[64px] md:max-w-[240px]"
          />
        </Link>

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
                      fontFamily: "var(--font-inter), sans-serif",
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
                  <Link
                    href={link.href}
                    aria-haspopup="true"
                    aria-expanded={aboutMenuOpen}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "70px",
                      padding: "0 16px",
                      fontSize: "15px",
                      fontFamily: "var(--font-inter), sans-serif",
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
                  </Link>
                </li>
              );
            }

            if (link.isPayment) {
              return (
                <li
                  key={link.href}
                  style={{ display: "flex", height: "70px" }}
                  ref={paymentLinkRef}
                  onMouseEnter={handlePaymentEnter}
                  onMouseLeave={handlePaymentLeave}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={paymentMenuOpen}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "70px",
                      padding: "0 16px",
                      fontSize: "15px",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontWeight: 500,
                      color: paymentMenuOpen ? "#C9A84C" : "#1C1C1C",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#C9A84C";
                    }}
                    onMouseLeave={(e) => {
                      if (!paymentMenuOpen) {
                        e.currentTarget.style.color = "#1C1C1C";
                      }
                    }}
                  >
                    {link.label}
                    <ChevronIcon open={paymentMenuOpen} />
                  </button>
                </li>
              );
            }

            return (
              <li key={link.href} style={{ display: "flex", height: "70px" }}>
                <Link
                  href={link.href}
                  {...linkHover}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "70px",
                    padding: "0 16px",
                    fontSize: "15px",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 500,
                    color: "#1C1C1C",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "color 0.2s ease",
                  }}
                >
                  {link.label}
                </Link>
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
            href="#start"
            className="gwh-gold-btn-fill"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "40px",
              padding: "0 20px",
              fontSize: "14px",
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 600,
              color: "#FFFFFF",
              background: "#C9A84C",
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
        className={`nav-mega nav-mega-services${megaMenuOpen ? " open" : ""}`}
        onMouseEnter={handleMenuEnter}
        onMouseLeave={handleMenuLeave}
        aria-hidden={!megaMenuOpen}
      >
        <div className="nav-mega-services-panel">
          <div className="nav-mega-services-inner">
            {(() => {
              let tileI = 0;
              return SERVICES_MEGA_GROUPS.map((group) => (
                <div key={group.id}>
                  <p className="nav-svc-col-heading">{group.heading}</p>
                  <div className="nav-svc-col-tiles">
                    {servicesForMegaGroup(servicesByCategory, group).map((service) => {
                      tileI += 1;
                      return (
                        <MenuLink
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="nav-svc-tile"
                          style={{ "--tile-i": tileI }}
                          onClick={() => setMegaMenuOpen(false)}
                        >
                          <ServiceLineIcon category={service.category} />
                          <span className="nav-svc-tile-name">{service.title}</span>
                        </MenuLink>
                      );
                    })}
                  </div>
                </div>
              ));
            })()}
          </div>

          <div className="nav-mega-services-footer">
            <p className="nav-mega-footer-left">
              Not sure where to start?
              <MenuLink href="/#start" className="nav-mega-footer-link">
                Book a free consultation →
              </MenuLink>
            </p>
            <MenuLink href="/#services" className="nav-mega-footer-right">
              View all services →
            </MenuLink>
          </div>
        </div>
      </div>

      {/* Desktop Payment menu */}
      <div
        ref={paymentMenuRef}
        className={`nav-mega nav-mega-payment${paymentMenuOpen ? " open" : ""}`}
        onMouseEnter={handlePaymentMenuEnter}
        onMouseLeave={handlePaymentMenuLeave}
        aria-hidden={!paymentMenuOpen}
      >
        <div className="nav-mega-inner">
          {PAYMENT_PACKAGES.map((pkg) => (
            <button
              key={pkg.packageKey}
              type="button"
              className="nav-payment-pkg"
              disabled={!!paymentCheckoutKey}
              onClick={() => handleNavPackageCheckout(pkg.packageKey)}
            >
              <span className="nav-payment-pkg-name">{pkg.name}</span>
              <span className="nav-payment-pkg-price">
                {paymentCheckoutKey === pkg.packageKey ? "Opening checkout…" : `$${pkg.priceUsd}`}
              </span>
            </button>
          ))}
          <MenuLink
            href="/pay"
            className="nav-payment-custom"
            onClick={() => setPaymentMenuOpen(false)}
          >
            <span className="nav-payment-custom-title">Custom Payment</span>
            <span className="nav-payment-custom-note">
              For project amounts agreed with our team after your consultation.
            </span>
          </MenuLink>
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
          {ABOUT_LINKS.map((item) => (
            <MenuLink
              key={item.href}
              href={item.href}
              className="nav-about-link"
              onClick={() => setAboutMenuOpen(false)}
            >
              {item.label}
            </MenuLink>
          ))}
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
                    {SERVICES_MEGA_GROUPS.map((group) => (
                      <div key={group.id}>
                        <p className="nav-mobile-cat">{group.heading}</p>
                        <div className="nav-mobile-svc-tiles">
                          {servicesForMegaGroup(servicesByCategory, group).map((service) => (
                            <MenuLink
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              onClick={closeMobile}
                              className="nav-mobile-svc-tile"
                            >
                              <ServiceLineIcon category={service.category} />
                              <span className="nav-mobile-svc-tile-name">{service.title}</span>
                            </MenuLink>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </li>
              );
            }

            if (link.isAbout) {
              return (
                <li key={link.href}>
                  <button
                    type="button"
                    aria-expanded={mobileAboutOpen}
                    aria-haspopup="true"
                    onClick={() => setMobileAboutOpen((open) => !open)}
                    className="flex w-full items-center justify-between px-4 py-3 font-inter text-[15px] font-medium text-[#1C1C1C] transition-colors duration-200 hover:text-[#C9A84C]"
                    style={{
                      color: mobileAboutOpen ? "#C9A84C" : "#1C1C1C",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span>{link.label}</span>
                    <ChevronIcon open={mobileAboutOpen} />
                  </button>

                  <div
                    className={`nav-mobile-svc-list${mobileAboutOpen ? " open" : ""}`}
                  >
                    {ABOUT_LINKS.map((item) => (
                      <MenuLink
                        key={item.href}
                        href={item.href}
                        onClick={closeMobile}
                        className="nav-mobile-svc-link"
                      >
                        {item.label}
                      </MenuLink>
                    ))}
                  </div>
                </li>
              );
            }

            if (link.isPayment) {
              return (
                <li key={link.href}>
                  <button
                    type="button"
                    aria-expanded={mobilePaymentOpen}
                    aria-haspopup="true"
                    onClick={() => setMobilePaymentOpen((open) => !open)}
                    className="flex w-full items-center justify-between px-4 py-3 font-inter text-[15px] font-medium text-[#1C1C1C] transition-colors duration-200 hover:text-[#C9A84C]"
                    style={{
                      color: mobilePaymentOpen ? "#C9A84C" : "#1C1C1C",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span>{link.label}</span>
                    <ChevronIcon open={mobilePaymentOpen} />
                  </button>

                  <div className={`nav-mobile-svc-list${mobilePaymentOpen ? " open" : ""}`}>
                    {PAYMENT_PACKAGES.map((pkg) => (
                      <button
                        key={pkg.packageKey}
                        type="button"
                        disabled={!!paymentCheckoutKey}
                        onClick={() => handleNavPackageCheckout(pkg.packageKey)}
                        className="nav-mobile-svc-link w-full text-left"
                        style={{ background: "transparent", border: "none", cursor: "pointer" }}
                      >
                        {pkg.name} · ${pkg.priceUsd}
                        {paymentCheckoutKey === pkg.packageKey ? " …" : ""}
                      </button>
                    ))}
                    <MenuLink href="/pay" onClick={closeMobile} className="nav-mobile-svc-link">
                      Custom Payment — amounts agreed after consultation
                    </MenuLink>
                  </div>
                </li>
              );
            }

            return (
              <li key={link.href}>
                <MenuLink
                  href={link.href}
                  onClick={closeMobile}
                  className="block px-4 py-3 font-inter text-[15px] font-medium text-[#1C1C1C] transition-colors duration-200 hover:text-[#C9A84C]"
                >
                  {link.label}
                </MenuLink>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col items-center gap-3 border-t border-[#E8D5A3] px-6 py-5">
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
