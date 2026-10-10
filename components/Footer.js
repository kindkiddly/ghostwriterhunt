import Link from "next/link";
import {
  BUSINESS_ADDRESS,
  BUSINESS_PHONE_DISPLAY_LABELED,
  BUSINESS_PHONE_TEL,
} from "@/lib/siteAddress";

/**
 * GhostWriterHunt — Footer
 * Brand + quick links + contact + get started + copyright bar.
 */

const QUICK_LINKS = [
  { label: "About", href: "/about" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Legal", href: "/legal" },
];

export default function Footer() {
  return (
    <footer className="gwh-footer" aria-label="Site footer">
      <style dangerouslySetInnerHTML={{ __html: `
        .gwh-footer {
          width: 100%;
          background: #1C1C1C;
          overflow-x: hidden;
        }

        .gwh-ft-main {
          padding: 48px 0;
        }
        .gwh-ft-main-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          align-items: start;
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .gwh-ft-main-inner {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 32px;
          }
        }
        @media (min-width: 1025px) {
          .gwh-ft-main-inner {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 32px;
          }
        }

        .gwh-ft-col {
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .gwh-ft-logo-wrap {
          line-height: 0;
        }
        .gwh-ft-tagline {
          font-family: var(--font-inter), sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #888888;
          line-height: 1.6;
          margin: 12px 0 0;
          max-width: 280px;
        }

        .gwh-ft-heading {
          font-family: var(--font-inter), sans-serif;
          font-weight: 600;
          font-size: 12px;
          color: #C9A84C;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin: 0 0 12px;
          padding: 0;
          flex-shrink: 0;
        }

        .gwh-ft-link-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .gwh-ft-link {
          font-family: var(--font-inter), sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #888888;
          text-decoration: none;
          line-height: 1.4;
        }
        .gwh-ft-link:hover {
          color: #C9A84C;
        }

        .gwh-ft-contact-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
        }
        .gwh-ft-email-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .gwh-ft-email-label {
          font-family: var(--font-inter), sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: #888888;
          line-height: 1.3;
        }
        .gwh-ft-address {
          font-family: var(--font-inter), sans-serif;
          font-weight: 400;
          font-size: 13px;
          color: #888888;
          margin: 0;
          line-height: 1.55;
        }

        .gwh-ft-get-started-line {
          font-family: var(--font-inter), sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #888888;
          line-height: 1.5;
          margin: 0 0 12px;
        }
        .gwh-ft-cta-btn {
          display: inline-block;
          width: fit-content;
          background: transparent;
          border: 1px solid #C9A84C;
          border-radius: 6px;
          padding: 10px 18px;
          font-family: var(--font-inter), sans-serif;
          font-weight: 500;
          font-size: 14px;
          color: #C9A84C;
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .gwh-ft-cta-btn:hover {
          background: #C9A84C;
          color: #FFFFFF;
        }

        .gwh-ft-bottom {
          border-top: 1px solid #2A2A2A;
          padding: 16px 0;
        }
        .gwh-ft-bottom-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .gwh-ft-copy,
        .gwh-ft-bottom-brand {
          font-family: var(--font-inter), sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: #555555;
          margin: 0;
          line-height: 1.5;
        }
        .gwh-ft-bottom-brand a {
          color: #555555;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .gwh-ft-bottom-brand a:hover {
          color: #C9A84C;
        }

        @media (max-width: 768px) {
          .gwh-ft-main {
            padding: 36px 0;
          }
          .gwh-ft-main-inner {
            gap: 24px;
          }
          .gwh-ft-col {
            align-items: center;
            text-align: center;
          }
          .gwh-ft-tagline {
            max-width: 320px;
          }
          .gwh-ft-link-list,
          .gwh-ft-contact-list {
            align-items: center;
          }
          .gwh-ft-cta-btn {
            width: 100%;
            max-width: 280px;
            text-align: center;
            box-sizing: border-box;
          }
          .gwh-ft-bottom-inner {
            flex-direction: column;
            text-align: center;
          }
        }
      ` }} />

      <div className="gwh-ft-main">
        <div className="gwh-ft-main-inner">
          <div className="gwh-ft-col gwh-ft-brand">
            <div className="gwh-ft-logo-wrap">
              <Link href="/" style={{ display: "block", lineHeight: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/GhostWriterHunt-logo-white.webp"
                  alt="GhostWriterHunt"
                  width={400}
                  height={160}
                  loading="lazy"
                  decoding="async"
                  style={{
                    height: "40px",
                    width: "auto",
                    display: "block",
                  }}
                />
              </Link>
            </div>
            <p className="gwh-ft-tagline">
              Professional ghostwriting services for authors worldwide. Your
              story. Your voice. Perfectly told.
            </p>
          </div>

          <div className="gwh-ft-col">
            <h3 className="gwh-ft-heading">Quick Links</h3>
            <ul className="gwh-ft-link-list">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="gwh-ft-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="gwh-ft-col">
            <h3 className="gwh-ft-heading">Contact</h3>
            <div className="gwh-ft-contact-list">
              <div className="gwh-ft-email-block">
                <a
                  href="mailto:ghostwriterhunt@lumexforge.com"
                  className="gwh-ft-link"
                >
                  ghostwriterhunt@lumexforge.com
                </a>
                <span className="gwh-ft-email-label">New projects</span>
              </div>
              <div className="gwh-ft-email-block">
                <a
                  href="mailto:support.gwh@lumexforge.com"
                  className="gwh-ft-link"
                >
                  support.gwh@lumexforge.com
                </a>
                <span className="gwh-ft-email-label">Client support</span>
              </div>
              <a href={BUSINESS_PHONE_TEL} className="gwh-ft-link">
                {BUSINESS_PHONE_DISPLAY_LABELED}
              </a>
              <p className="gwh-ft-address">{BUSINESS_ADDRESS}</p>
            </div>
          </div>

          <div className="gwh-ft-col">
            <h3 className="gwh-ft-heading">Get Started</h3>
            <p className="gwh-ft-get-started-line">Have a book idea?</p>
            <Link href="/#start" className="gwh-ft-cta-btn">
              Book Free Consultation
            </Link>
          </div>
        </div>
      </div>

      <div className="gwh-ft-bottom">
        <div className="gwh-ft-bottom-inner">
          <p className="gwh-ft-copy">
            © 2026 GhostWriterHunt. All rights reserved.
          </p>
          <p className="gwh-ft-bottom-brand">
            GhostWriterHunt is a{" "}
            <a
              href="https://lumexforge.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LumexForge
            </a>{" "}
            brand.
          </p>
        </div>
      </div>
    </footer>
  );
}
