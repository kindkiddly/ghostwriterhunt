import Link from "next/link";
import {
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_TEL,
  BUSINESS_STREET_ADDRESS,
} from "@/lib/siteAddress";

function IconEnvelope() {
  return (
    <svg className="gwh-ft-lux-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg className="gwh-ft-lux-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.5 4h3l1.5 4-2 1.2a11 11 0 005.3 5.3L17.5 12.5 21.5 14v3a2 2 0 01-2.1 2C10.8 19 5 13.2 4.1 6.6A2 2 0 016.5 4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPin() {
  return (
    <svg className="gwh-ft-lux-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconRocket() {
  return (
    <svg className="gwh-ft-lux-icon gwh-ft-lux-icon--heading" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 15l-3 6 3-2 3 2-3-6zM12 15V3m0 0c3.5 0 6 2.5 6 6 0 2.5-1.2 4.5-3 6-1.8-1.5-3-3.5-3-6 0-3.5 2.5-6 6-6z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg className="gwh-ft-lux-btn-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg className="gwh-ft-lux-btn-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="gwh-footer" aria-label="Site footer">
      <style dangerouslySetInnerHTML={{ __html: `
        .gwh-footer {
          width: 100%;
          background: #101010;
          overflow-x: hidden;
          color: #f5f5f5;
        }

        .gwh-ft-lux-main {
          padding: clamp(36px, 4vw, 52px) 0 clamp(28px, 3vw, 40px);
        }

        .gwh-ft-lux-inner {
          width: min(92%, 1680px);
          margin: 0 auto;
          padding: 0 clamp(16px, 2vw, 28px);
        }

        .gwh-ft-lux-grid {
          display: flex;
          flex-direction: column;
          gap: 32px;
          align-items: stretch;
        }

        .gwh-ft-lux-divider {
          display: none;
          width: 1px;
          align-self: stretch;
          min-height: 120px;
          background: linear-gradient(
            180deg,
            rgba(232, 188, 79, 0) 0%,
            rgba(232, 188, 79, 0.85) 18%,
            rgba(245, 206, 105, 0.85) 82%,
            rgba(232, 188, 79, 0) 100%
          );
          flex-shrink: 0;
        }

        .gwh-ft-lux-brand {
          flex: 0 1 30%;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .gwh-ft-lux-logo-link {
          display: inline-block;
          line-height: 0;
          margin-bottom: clamp(14px, 1.5vw, 22px);
        }

        .gwh-ft-lux-logo {
          width: min(100%, 280px);
          height: auto;
          display: block;
        }

        .gwh-ft-lux-tagline {
          font-family: var(--font-inter), sans-serif;
          font-weight: 400;
          font-size: clamp(14px, 1.15vw, 17px);
          color: #d9dde3;
          line-height: 1.65;
          margin: 0;
          max-width: 22em;
        }

        .gwh-ft-lux-contact {
          flex: 0 1 42%;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .gwh-ft-lux-cta {
          flex: 0 1 28%;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .gwh-ft-lux-heading {
          font-family: var(--font-inter), sans-serif;
          font-weight: 600;
          font-size: clamp(13px, 1.05vw, 15px);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #e8bc4f;
          margin: 0 0 clamp(16px, 1.8vw, 22px);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .gwh-ft-lux-icon {
          width: clamp(22px, 1.65vw, 30px);
          height: clamp(22px, 1.65vw, 30px);
          color: #e8bc4f;
          flex-shrink: 0;
        }

        .gwh-ft-lux-icon--heading {
          width: clamp(20px, 1.5vw, 26px);
          height: clamp(20px, 1.5vw, 26px);
        }

        .gwh-ft-lux-rows {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.1vw, 14px);
        }

        .gwh-ft-lux-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(12px, 1.2vw, 16px);
        }

        .gwh-ft-lux-row-text {
          font-family: var(--font-inter), sans-serif;
          font-weight: 400;
          font-size: clamp(14px, 1.1vw, 16px);
          line-height: 1.5;
          color: #f0f0f0;
          text-decoration: none;
          min-width: 0;
        }

        a.gwh-ft-lux-row-text:hover {
          color: #f5ce69;
        }

        .gwh-ft-lux-row-note {
          font-family: var(--font-inter), sans-serif;
          font-size: clamp(12px, 0.95vw, 14px);
          color: #a8adb5;
          margin: 4px 0 0 calc(clamp(22px, 1.65vw, 30px) + clamp(12px, 1.2vw, 16px));
          line-height: 1.4;
        }

        .gwh-ft-lux-cta-copy {
          font-family: var(--font-inter), sans-serif;
          font-weight: 400;
          font-size: clamp(15px, 1.2vw, 17px);
          color: #d9dde3;
          line-height: 1.6;
          margin: 0 0 clamp(18px, 2vw, 24px);
        }

        .gwh-ft-lux-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: clamp(10px, 1vw, 14px);
          width: 100%;
          max-width: min(100%, 420px);
          min-height: clamp(52px, 4.5vw, 64px);
          padding: clamp(12px, 1.2vw, 16px) clamp(20px, 2vw, 28px);
          border-radius: 999px;
          border: 1px solid rgba(255, 224, 128, 0.45);
          background: linear-gradient(180deg, #ffe080 0%, #e8bc4f 45%, #d9a93b 100%);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25);
          font-family: var(--font-inter), sans-serif;
          font-weight: 600;
          font-size: clamp(15px, 1.15vw, 17px);
          color: #111111;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }

        .gwh-ft-lux-btn:hover {
          filter: brightness(0.97);
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25);
        }

        @media (prefers-reduced-motion: reduce) {
          .gwh-ft-lux-btn {
            transition: filter 0.2s ease;
          }
          .gwh-ft-lux-btn:hover {
            transform: none;
          }
        }

        .gwh-ft-lux-btn-icon {
          width: clamp(22px, 1.6vw, 28px);
          height: clamp(22px, 1.6vw, 28px);
          color: #111111;
          flex-shrink: 0;
        }

        .gwh-ft-lux-btn-label {
          flex: 1 1 auto;
          text-align: center;
          white-space: nowrap;
        }

        .gwh-ft-lux-hrule {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(232, 188, 79, 0) 0%,
            rgba(232, 188, 79, 0.75) 15%,
            rgba(245, 206, 105, 0.75) 85%,
            rgba(232, 188, 79, 0) 100%
          );
          border: 0;
          margin: 0;
        }

        .gwh-ft-lux-bottom {
          padding: clamp(20px, 2.5vw, 28px) 0 clamp(22px, 2.8vw, 32px);
        }

        .gwh-ft-lux-bottom-inner {
          width: min(92%, 1680px);
          margin: 0 auto;
          padding: 0 clamp(16px, 2vw, 28px);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .gwh-ft-lux-copy {
          font-family: var(--font-inter), sans-serif;
          font-weight: 400;
          font-size: clamp(12px, 0.95vw, 14px);
          color: #a8adb5;
          margin: 0;
          line-height: 1.5;
        }

        @media (min-width: 900px) {
          .gwh-ft-lux-grid {
            flex-direction: row;
            align-items: center;
            gap: 0;
          }

          .gwh-ft-lux-divider {
            display: block;
            margin: 0 clamp(20px, 2.5vw, 36px);
          }

          .gwh-ft-lux-brand {
            padding-right: clamp(8px, 1vw, 16px);
          }

          .gwh-ft-lux-cta {
            padding-left: clamp(8px, 1vw, 16px);
          }
        }

        @media (max-width: 899px) {
          .gwh-ft-lux-brand,
          .gwh-ft-lux-contact,
          .gwh-ft-lux-cta {
            align-items: flex-start;
            text-align: left;
          }

          .gwh-ft-lux-logo {
            width: min(100%, 240px);
          }

          .gwh-ft-lux-btn {
            max-width: 100%;
          }

          .gwh-ft-lux-btn-label {
            white-space: normal;
          }
        }
      ` }} />

      <div className="gwh-ft-lux-main">
        <div className="gwh-ft-lux-inner">
          <div className="gwh-ft-lux-grid">
            <div className="gwh-ft-lux-brand">
              <Link href="/" className="gwh-ft-lux-logo-link">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/GhostWriterHunt-logo-white.webp"
                  alt="GhostWriterHunt"
                  width={400}
                  height={160}
                  className="gwh-ft-lux-logo"
                  loading="lazy"
                  decoding="async"
                />
              </Link>
              <p className="gwh-ft-lux-tagline">
                Professional ghostwriting services for authors worldwide. Your
                story. Your voice. Perfectly told.
              </p>
            </div>

            <div className="gwh-ft-lux-divider" aria-hidden="true" />

            <div className="gwh-ft-lux-contact">
              <h3 className="gwh-ft-lux-heading">Contact</h3>
              <div className="gwh-ft-lux-rows">
                <div className="gwh-ft-lux-row">
                  <IconEnvelope />
                  <a
                    href="mailto:ghostwriterhunt@lumexforge.com"
                    className="gwh-ft-lux-row-text"
                  >
                    ghostwriterhunt@lumexforge.com
                  </a>
                </div>
                <div>
                  <div className="gwh-ft-lux-row">
                    <IconEnvelope />
                    <a
                      href="mailto:support.gwh@lumexforge.com"
                      className="gwh-ft-lux-row-text"
                    >
                      support.gwh@lumexforge.com
                    </a>
                  </div>
                  <p className="gwh-ft-lux-row-note">Client support</p>
                </div>
                <div className="gwh-ft-lux-row">
                  <IconPhone />
                  <a href={BUSINESS_PHONE_TEL} className="gwh-ft-lux-row-text">
                    {BUSINESS_PHONE_DISPLAY}
                  </a>
                </div>
                <div className="gwh-ft-lux-row">
                  <IconPin />
                  <span className="gwh-ft-lux-row-text">{BUSINESS_STREET_ADDRESS}</span>
                </div>
              </div>
            </div>

            <div className="gwh-ft-lux-divider" aria-hidden="true" />

            <div className="gwh-ft-lux-cta">
              <h3 className="gwh-ft-lux-heading">
                <IconRocket />
                Get Started
              </h3>
              <p className="gwh-ft-lux-cta-copy">
                Have a book idea?
                <br />
                Let&apos;s bring it to life.
              </p>
              <Link href="/#start" className="gwh-ft-lux-btn">
                <IconCalendar />
                <span className="gwh-ft-lux-btn-label">Book Free Consultation</span>
                <IconArrow />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <hr className="gwh-ft-lux-hrule" />

      <div className="gwh-ft-lux-bottom">
        <div className="gwh-ft-lux-bottom-inner">
          <p className="gwh-ft-lux-copy">
            © 2026 GhostWriterHunt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
