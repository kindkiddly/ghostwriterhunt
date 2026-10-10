import Link from "next/link";
import {
  BUSINESS_ADDRESS,
  BUSINESS_PHONE_DISPLAY_LABELED,
  BUSINESS_PHONE_TEL,
} from "@/lib/siteAddress";

/**
 * GhostWriterHunt — Footer
 * Brand + contact + copyright bar.
 */

const EMAIL_SUBTITLE_STYLE = {
  display: "block",
  marginTop: "2px",
  fontFamily: "var(--font-inter), sans-serif",
  fontWeight: 500,
  fontSize: "10px",
  color: "#888888",
};

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
          padding: 48px 0 40px;
        }
        .gwh-ft-main-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 48px;
          align-items: start;
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .gwh-ft-main-inner {
            gap: 40px;
          }
        }
        .gwh-ft-brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 0;
        }
        .gwh-ft-contact {
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .gwh-ft-logo-wrap {
          line-height: 0;
        }
        .gwh-ft-tagline {
          font-family: var(--font-inter), sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #888888;
          line-height: 1.7;
          margin: 16px 0 8px;
        }
        .gwh-ft-brand-line {
          font-family: var(--font-inter), sans-serif;
          font-weight: 400;
          font-size: 13px;
          color: #888888;
          line-height: 1.6;
          margin: 0 0 0;
        }
        .gwh-ft-brand-line a {
          color: #888888;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .gwh-ft-brand-line a:hover {
          color: #C9A84C;
        }

        .gwh-ft-heading {
          font-family: var(--font-inter), sans-serif;
          font-weight: 600;
          font-size: 11px;
          color: #C9A84C;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin: 0 0 20px;
          padding: 0 0 10px;
          border-bottom: 1px solid #2A2A2A;
          flex-shrink: 0;
        }

        .gwh-ft-contact-body {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
        }
        .gwh-ft-contact-item {
          margin-bottom: 12px;
        }
        .gwh-ft-contact-email {
          font-family: var(--font-inter), sans-serif;
          font-weight: 500;
          font-size: 14px;
          color: #C9A84C;
          text-decoration: none;
        }
        .gwh-ft-contact-email:hover { text-decoration: underline; }
        .gwh-ft-contact-text {
          font-family: var(--font-inter), sans-serif;
          font-weight: 400;
          font-size: 13px;
          color: #888888;
          margin: 0;
          line-height: 1.55;
        }
        .gwh-ft-cta-btn {
          display: block;
          width: fit-content;
          margin-top: auto;
          background: transparent;
          border: 1px solid #C9A84C;
          border-radius: 6px;
          padding: 9px 14px;
          font-family: var(--font-inter), sans-serif;
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
          font-family: var(--font-inter), sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: #555555;
          margin: 0;
        }
        @media (max-width: 768px) {
          .gwh-ft-main {
            padding: 40px 0 36px;
          }
          .gwh-ft-main-inner {
            display: flex;
            flex-direction: column;
            gap: 28px;
            align-items: stretch;
          }
          .gwh-ft-brand {
            align-items: center;
            text-align: center;
          }
          .gwh-ft-contact {
            display: flex;
            flex-direction: column;
            width: 100%;
          }
          .gwh-ft-heading {
            text-align: center;
          }
          .gwh-ft-contact-body {
            display: block;
          }
          .gwh-ft-cta-btn {
            width: 100%;
            text-align: center;
            box-sizing: border-box;
            margin-top: 20px;
          }
          .gwh-ft-tagline,
          .gwh-ft-brand-line {
            max-width: 320px;
            margin-left: auto;
            margin-right: auto;
          }
          .gwh-ft-tagline {
            margin-bottom: 6px;
          }
          .gwh-ft-bottom-inner {
            flex-direction: column;
            text-align: center;
          }
        }
      ` }} />

      <div className="gwh-ft-main">
        <div className="gwh-ft-main-inner">
          <div className="gwh-ft-brand">
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
                    width: "180px",
                    height: "auto",
                    display: "block",
                  }}
                />
              </Link>
            </div>
            <p className="gwh-ft-tagline">
              Professional ghostwriting services for authors worldwide. Your
              story. Your voice. Perfectly told.
            </p>
            <p className="gwh-ft-brand-line">
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

          <div className="gwh-ft-contact">
              <h3 className="gwh-ft-heading">CONTACT</h3>
              <div className="gwh-ft-contact-body">
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
                  <a
                    href={BUSINESS_PHONE_TEL}
                    className="gwh-ft-contact-email"
                  >
                    {BUSINESS_PHONE_DISPLAY_LABELED}
                  </a>
                </div>
                <div className="gwh-ft-contact-item">
                  <p className="gwh-ft-contact-text">{BUSINESS_ADDRESS}</p>
                </div>
                <Link href="/#start" className="gwh-ft-cta-btn">
                  Book Free Consultation
                </Link>
              </div>
          </div>
        </div>
      </div>

      <div className="gwh-ft-bottom">
        <div className="gwh-ft-bottom-inner">
          <p className="gwh-ft-copy">
            © 2026 GhostWriterHunt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
