"use client";

/**
 * GhostWriterHunt — Footer
 * Premium 3-section dark band: newsletter strip, 4 columns, legal bar.
 */

const SERVICE_LINKS = [
  { label: "Professional Ghostwriting", href: "/services/ghostwriting" },
  { label: "Manuscript Editing", href: "/services/manuscript-editing" },
  { label: "Book Cover Design", href: "/services/book-cover-design" },
  { label: "Interior Layout", href: "/services/interior-layout" },
  { label: "Illustration & Graphics", href: "/services/illustration-graphics" },
  { label: "eBook Publishing", href: "/services/ebook-publishing" },
  { label: "Author Branding", href: "/services/author-branding" },
  { label: "Book Marketing", href: "/services/book-marketing" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Writers", href: "/#writers" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact Us", href: "/#start" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Legal", href: "/legal" },
];

function SocialIcon({ type }) {
  const common = {
    width: 16,
    height: 16,
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

function MailIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C9A84C"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#888888"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#888888"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="gwh-footer" aria-label="Site footer">
      <style>{`
        .gwh-footer {
          width: 100%;
          background: #1C1C1C;
          overflow-x: hidden;
        }

        /* ——— Section 1: Newsletter strip ——— */
        .gwh-ft-strip {
          background: #242424;
          border-bottom: 1px solid #2A2A2A;
          padding: 32px 0;
        }
        .gwh-ft-strip-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }
        .gwh-ft-strip-heading {
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 20px;
          color: #FFFFFF;
          margin: 0;
        }
        .gwh-ft-strip-sub {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #999999;
          margin: 4px 0 0;
        }
        .gwh-ft-form {
          display: flex;
          flex-direction: row;
          flex-shrink: 0;
        }
        .gwh-ft-input {
          width: 260px;
          background: #1C1C1C;
          border: 1px solid #333333;
          border-radius: 6px 0 0 6px;
          padding: 12px 20px;
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #FFFFFF;
          outline: none;
        }
        .gwh-ft-input::placeholder {
          color: #555555;
        }
        .gwh-ft-input:focus {
          border-color: #C9A84C;
        }
        .gwh-ft-submit {
          background: #C9A84C;
          border: none;
          border-radius: 0 6px 6px 0;
          padding: 12px 24px;
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: #FFFFFF;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .gwh-ft-submit:hover {
          background: #B8960C;
        }

        /* ——— Section 2: Main columns ——— */
        .gwh-ft-main {
          padding: 60px 0 48px;
        }
        .gwh-ft-main-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .gwh-ft-brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-top: 0;
          margin-top: 0;
        }
        .gwh-ft-tagline {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #888888;
          line-height: 1.7;
          max-width: 220px;
          margin: 0 0 24px;
        }
        .gwh-ft-social {
          display: flex;
          flex-direction: row;
          gap: 16px;
          margin-top: 0;
        }
        .gwh-ft-social-btn {
          width: 36px;
          height: 36px;
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
          padding: 0 0 12px;
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
          transition: color 0.2s ease, padding-left 0.2s ease;
        }
        .gwh-ft-link:hover {
          color: #FFFFFF;
          padding-left: 4px;
        }

        .gwh-ft-contact-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .gwh-ft-contact-email {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 500;
          font-size: 14px;
          color: #C9A84C;
          text-decoration: none;
        }
        .gwh-ft-contact-email:hover {
          text-decoration: underline;
        }
        .gwh-ft-contact-text {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #888888;
          margin: 0;
        }
        .gwh-ft-contact-divider {
          border: none;
          border-top: 1px solid #2A2A2A;
          margin: 20px 0;
        }
        .gwh-ft-cta-label {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 13px;
          color: #666666;
          margin: 0 0 10px;
        }
        .gwh-ft-cta-btn {
          display: block;
          width: 100%;
          box-sizing: border-box;
          text-align: center;
          background: transparent;
          border: 1px solid #C9A84C;
          border-radius: 6px;
          padding: 10px 16px;
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

        /* ——— Section 3: Bottom bar ——— */
        .gwh-ft-bottom {
          border-top: 1px solid #2A2A2A;
          padding: 20px 0;
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
          font-size: 13px;
          color: #555555;
          margin: 0;
        }
        .gwh-ft-legal {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 24px;
        }
        .gwh-ft-legal a {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 13px;
          color: #555555;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .gwh-ft-legal a:hover {
          color: #C9A84C;
        }

        @media (max-width: 768px) {
          .gwh-ft-strip-inner {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .gwh-ft-form {
            flex-direction: column;
            width: 100%;
          }
          .gwh-ft-input {
            width: 100%;
            box-sizing: border-box;
            border-radius: 6px;
          }
          .gwh-ft-submit {
            width: 100%;
            border-radius: 6px;
            margin-top: 8px;
          }
          .gwh-ft-main-inner {
            grid-template-columns: 1fr 1fr;
            gap: 36px 24px;
          }
          .gwh-ft-brand {
            grid-column: 1 / -1;
            align-items: center;
            text-align: center;
          }
          .gwh-ft-tagline {
            max-width: 280px;
          }
          .gwh-ft-social {
            justify-content: center;
          }
          .gwh-ft-contact {
            grid-column: 1 / -1;
          }
          .gwh-ft-bottom-inner {
            flex-direction: column;
            text-align: center;
          }
          .gwh-ft-legal {
            justify-content: center;
            gap: 16px;
          }
        }
      `}</style>

      {/* ——— Section 1: Newsletter strip ——— */}
      <div className="gwh-ft-strip">
        <div className="gwh-ft-strip-inner">
          <div>
            <p className="gwh-ft-strip-heading">
              Stay updated with publishing tips
            </p>
            <p className="gwh-ft-strip-sub">
              Join 10,000+ authors getting weekly writing and publishing
              insights.
            </p>
          </div>

          <form
            className="gwh-ft-form"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Newsletter signup"
          >
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              className="gwh-ft-input"
              required
            />
            <button type="submit" className="gwh-ft-submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* ——— Section 2: Main columns ——— */}
      <div className="gwh-ft-main">
        <div className="gwh-ft-main-inner">
          {/* Column 1 — Brand */}
          <div className="gwh-ft-brand">
            <a href="/" style={{ display: "block", lineHeight: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/GhostWriterHunt-logo-white.webp"
                alt="GhostWriterHunt"
                style={{
                  width: "180px",
                  height: "auto",
                  display: "block",
                  marginBottom: "16px",
                  marginTop: 0,
                }}
              />
            </a>
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

          {/* Column 2 — Services */}
          <div>
            <h3 className="gwh-ft-heading">SERVICES</h3>
            <nav aria-label="Footer services">
              {SERVICE_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="gwh-ft-link">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3 — Company */}
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

          {/* Column 4 — Contact */}
          <div className="gwh-ft-contact" id="contact">
            <h3 className="gwh-ft-heading">CONTACT</h3>

            <div className="gwh-ft-contact-row">
              <MailIcon />
              <a
                href="mailto:hello@ghostwriterhunt.com"
                className="gwh-ft-contact-email"
              >
                hello@ghostwriterhunt.com
              </a>
            </div>

            <div className="gwh-ft-contact-row">
              <MapPinIcon />
              <p className="gwh-ft-contact-text">Houston, Texas, USA</p>
            </div>

            <div className="gwh-ft-contact-row">
              <ClockIcon />
              <p className="gwh-ft-contact-text">Mon-Fri: 9am - 6pm CST</p>
            </div>

            <hr className="gwh-ft-contact-divider" />

            <p className="gwh-ft-cta-label">Ready to start your book?</p>
            <a href="/#start" className="gwh-ft-cta-btn">
              Book Free Consultation
            </a>
          </div>
        </div>
      </div>

      {/* ——— Section 3: Bottom bar ——— */}
      <div className="gwh-ft-bottom">
        <div className="gwh-ft-bottom-inner">
          <p className="gwh-ft-copy">
            © 2026 GhostWriterHunt. All rights reserved.
          </p>
          <nav className="gwh-ft-legal" aria-label="Legal">
            {LEGAL_LINKS.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
