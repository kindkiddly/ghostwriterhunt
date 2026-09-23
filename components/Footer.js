"use client";

import { useState } from "react";
import LegalModal from "./legal/LegalModal";

/**
 * GhostWriterHunt — Footer
 * 3 columns (Brand · Company · Contact) + legal bar.
 */

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact Us", href: "/#start" },
];

const EMAIL_SUBTITLE_STYLE = {
  display: "block",
  marginTop: "2px",
  fontFamily: "var(--font-inter), Inter, sans-serif",
  fontWeight: 500,
  fontSize: "10px",
  color: "#888888",
};

const LEGAL_MODAL_LINKS = [
  { label: "Privacy Policy", type: "privacy" },
  { label: "Terms of Use", type: "terms" },
  { label: "Cookie Policy", type: "cookies" },
  { label: "Legal", type: "legal" },
];

function SocialIcon({ type }) {
  const common = {
    width: 15,
    height: 15,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
  };

  switch (type) {
    case "facebook":
      return (
        <svg {...common}>
          <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z" />
        </svg>
      );
    case "twitter":
      return (
        <svg {...common}>
          <path d="M18.2 7.1c.7-.4 1.2-1 1.4-1.7-.6.4-1.3.6-2 .8A3.1 3.1 0 0013.5 8c0 .2 0 .5.1.7-2.6-.1-4.9-1.4-6.5-3.3-.3.5-.4 1-.4 1.6 0 1.1.6 2.1 1.4 2.6-.5 0-1-.2-1.4-.4v.1c0 1.5 1.1 2.8 2.5 3.1-.3.1-.5.1-.8.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.2 3 2.3A6.3 6.3 0 015 17.5c1.4.9 3.1 1.4 4.9 1.4 5.9 0 9.1-4.9 9.1-9.1v-.4c.6-.5 1.2-1 1.6-1.7-.6.3-1.2.4-1.8.5z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <path d="M12 7.2A4.8 4.8 0 1016.8 12 4.8 4.8 0 0012 7.2zm0 7.9A3.1 3.1 0 1115.1 12 3.1 3.1 0 0112 15.1zm6.1-8A1.1 1.1 0 1119.2 6a1.1 1.1 0 01-1.1 1.1zM21.9 8.1a6.4 6.4 0 00-1.7-4.5 6.4 6.4 0 00-4.5-1.7H8.3A6.4 6.4 0 003.8 3.6 6.4 6.4 0 002.1 8.1v7.8a6.4 6.4 0 001.7 4.5 6.4 6.4 0 004.5 1.7h7.4a6.4 6.4 0 004.5-1.7 6.4 6.4 0 001.7-4.5V8.1zm-1.8 7.8a4.6 4.6 0 01-1.2 3.2 4.6 4.6 0 01-3.2 1.2H8.3a4.6 4.6 0 01-3.2-1.2 4.6 4.6 0 01-1.2-3.2V8.1A4.6 4.6 0 015.1 4.9a4.6 4.6 0 013.2-1.2h7.4a4.6 4.6 0 013.2 1.2 4.6 4.6 0 011.2 3.2z" />
        </svg>
      );
    case "linkedin":
    default:
      return (
        <svg {...common}>
          <path d="M6.5 9.5H3.7V20h2.8V9.5zM5.1 4A1.6 1.6 0 103.5 5.6 1.6 1.6 0 005.1 4zM20.3 13.3c0-2.7-1.4-4-3.4-4a3.1 3.1 0 00-2.8 1.5V9.5h-2.8c0 1.2 0 10.5 0 10.5h2.8v-5.9c0-.3 0-.6.1-.9.3-.6.9-1.3 1.9-1.3 1.3 0 1.9 1 1.9 2.5V20h2.8v-6.7z" />
        </svg>
      );
  }
}

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("privacy");

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <footer className="gwh-footer" aria-label="Site footer">
      <style>{`
        .gwh-footer {
          width: 100%;
          background: #1C1C1C;
          overflow-x: hidden;
        }

        /* Main 3 columns */
        .gwh-ft-main {
          padding: 48px 0 40px;
        }
        .gwh-ft-main-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .gwh-ft-brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        /* Push logo so wordmark bottom aligns with COMPANY/CONTACT headings */
        .gwh-ft-logo-wrap {
          padding-top: 32px;
          line-height: 0;
        }
        .gwh-ft-tagline {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #888888;
          line-height: 1.7;
          max-width: 220px;
          margin: 16px 0 24px;
        }
        .gwh-ft-social {
          display: flex;
          flex-direction: row;
          gap: 12px;
        }
        .gwh-ft-social-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #2A2A2A;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #888888;
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .gwh-ft-social-btn:hover {
          background: #C9A84C;
          color: #FFFFFF;
        }

        .gwh-ft-heading {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 600;
          font-size: 11px;
          color: #C9A84C;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin: 0 0 20px;
          padding: 0 0 10px;
          border-bottom: 1px solid #2A2A2A;
        }
        .gwh-ft-link {
          display: block;
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #888888;
          text-decoration: none;
          padding: 5px 0;
          transition: all 0.15s ease;
        }
        .gwh-ft-link:hover {
          color: #FFFFFF;
          padding-left: 4px;
        }

        .gwh-ft-contact-item {
          margin-bottom: 12px;
        }
        .gwh-ft-contact-email {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 500;
          font-size: 14px;
          color: #C9A84C;
          text-decoration: none;
        }
        .gwh-ft-contact-email:hover { text-decoration: underline; }
        .gwh-ft-contact-text {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #888888;
          margin: 0;
        }
        .gwh-ft-cta-btn {
          display: block;
          width: fit-content;
          margin-top: 20px;
          background: transparent;
          border: 1px solid #C9A84C;
          border-radius: 6px;
          padding: 9px 14px;
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 500;
          font-size: 13px;
          color: #C9A84C;
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .gwh-ft-cta-btn:hover {
          background: #C9A84C;
          color: #FFFFFF;
        }

        /* Bottom bar */
        .gwh-ft-bottom {
          border-top: 1px solid #2A2A2A;
          padding: 18px 0;
        }
        .gwh-ft-bottom-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .gwh-ft-copy {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: #555555;
          margin: 0;
        }
        .gwh-ft-legal {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 20px;
        }
        .gwh-ft-legal button {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: #555555;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .gwh-ft-legal button:hover { color: #C9A84C; }

        @media (max-width: 768px) {
          .gwh-ft-main-inner {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .gwh-ft-brand {
            align-items: center;
            text-align: center;
          }
          .gwh-ft-logo-wrap {
            padding-top: 0;
          }
          .gwh-ft-social {
            justify-content: center;
          }
          .gwh-ft-cta-btn {
            width: 100%;
            text-align: center;
            box-sizing: border-box;
          }
          .gwh-ft-bottom-inner {
            flex-direction: column;
            text-align: center;
          }
          .gwh-ft-legal {
            justify-content: center;
          }
        }
      `}</style>

      {/* Main columns: Brand · Company · Contact */}
      <div className="gwh-ft-main">
        <div className="gwh-ft-main-inner">
          <div className="gwh-ft-brand">
            <div className="gwh-ft-logo-wrap">
              <a href="/" style={{ display: "block", lineHeight: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/GhostWriterHunt-logo-white.webp"
                  alt="GhostWriterHunt"
                  style={{
                    width: "180px",
                    height: "auto",
                    display: "block",
                  }}
                />
              </a>
            </div>
            <p className="gwh-ft-tagline">
              Professional ghostwriting services for authors worldwide. Your
              story. Your voice. Perfectly told.
            </p>
            <div className="gwh-ft-social">
              {[
                { type: "facebook", label: "Facebook", href: "#facebook" },
                { type: "twitter", label: "Twitter", href: "#twitter" },
                { type: "instagram", label: "Instagram", href: "#instagram" },
                { type: "linkedin", label: "LinkedIn", href: "#linkedin" },
              ].map((social) => (
                <a
                  key={social.type}
                  href={social.href}
                  aria-label={social.label}
                  className="gwh-ft-social-btn"
                >
                  <SocialIcon type={social.type} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="gwh-ft-heading">COMPANY</h3>
            <nav aria-label="Footer company">
              {COMPANY_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="gwh-ft-link">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="gwh-ft-contact" id="contact">
            <h3 className="gwh-ft-heading">CONTACT</h3>
            <div className="gwh-ft-contact-item">
              <a
                href="mailto:ghostwriterhunt@lumexforge.com"
                className="gwh-ft-contact-email"
              >
                ghostwriterhunt@lumexforge.com
              </a>
              <span style={EMAIL_SUBTITLE_STYLE}>
                New projects &amp; consultations
              </span>
            </div>
            <div className="gwh-ft-contact-item">
              <a
                href="mailto:support.gwh@lumexforge.com"
                className="gwh-ft-contact-email"
              >
                support.gwh@lumexforge.com
              </a>
              <span style={EMAIL_SUBTITLE_STYLE}>
                Client support &amp; project help
              </span>
            </div>
            <div className="gwh-ft-contact-item">
              <p className="gwh-ft-contact-text">TX, USA</p>
            </div>
            <div className="gwh-ft-contact-item">
              <p className="gwh-ft-contact-text">Mon–Fri: 9am – 6pm CST</p>
            </div>
            <a href="/#start" className="gwh-ft-cta-btn">
              Book Free Consultation
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="gwh-ft-bottom">
        <div className="gwh-ft-bottom-inner">
          <p className="gwh-ft-copy">
            © 2026 GhostWriterHunt. All rights reserved.
          </p>
          <nav className="gwh-ft-legal" aria-label="Legal">
            {LEGAL_MODAL_LINKS.map((link) => (
              <button
                key={link.type}
                type="button"
                onClick={() => openModal(link.type)}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <LegalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />
    </footer>
  );
}
