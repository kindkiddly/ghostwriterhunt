import Footer from "@/components/Footer";
import { legalContent } from "./legalContent";

/**
 * Full-page legal document — polished layout aligned with About Us brand standards.
 */

const styles = `
  .legal-page {
    width: 100%;
    overflow-x: hidden;
    background: #FAFAF7;
  }

  /* —— Hero (matches About Us dark header tone) —— */
  .legal-page-hero {
    position: relative;
    overflow: hidden;
    padding: 140px 24px 72px;
    text-align: center;
    background: #1C1C1C;
  }
  .legal-page-hero-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at 50% 0%,
      rgba(201, 168, 76, 0.1) 0%,
      transparent 60%
    );
    pointer-events: none;
  }
  .legal-page-hero-inner {
    position: relative;
    max-width: 720px;
    margin: 0 auto;
  }
  .legal-page-label {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 500;
    font-size: 11px;
    color: #C9A84C;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin: 0 0 16px;
  }
  .legal-page-title {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 52px;
    line-height: 1.12;
    color: #FFFFFF;
    margin: 0 0 14px;
  }
  .legal-page-updated {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.65);
    margin: 0;
  }

  /* —— Content shell —— */
  .legal-page-body-outer {
    padding: 56px 24px 80px;
  }
  .legal-page-body-wrap {
    max-width: 760px;
    margin: 0 auto;
    background: #FFFFFF;
    border: 1px solid #E8D5A3;
    border-radius: 16px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
    padding: 48px 56px;
  }

  /* —— Prose —— */
  .legal-page-body h2 {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 26px;
    color: #1C1C1C;
    line-height: 1.25;
    margin: 36px 0 14px;
    padding-top: 4px;
  }
  .legal-page-body h2:first-child {
    margin-top: 0;
  }
  .legal-page-body h3 {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 19px;
    color: #1C1C1C;
    line-height: 1.3;
    margin: 28px 0 10px;
  }
  .legal-page-body p {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #666666;
    line-height: 1.85;
    margin: 0 0 18px;
  }
  .legal-page-body ul,
  .legal-page-body ol {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #666666;
    line-height: 1.85;
    margin: 0 0 18px;
    padding-left: 22px;
  }
  .legal-page-body ul {
    list-style: disc;
  }
  .legal-page-body li {
    margin-bottom: 10px;
  }
  .legal-page-body li::marker {
    color: #C9A84C;
  }
  .legal-page-body strong {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 600;
    color: #1C1C1C;
  }
  .legal-page-body a {
    color: #C9A84C;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .legal-page-body a:hover {
    color: #B8960C;
    text-decoration: underline;
  }
  .legal-page-body hr {
    border: none;
    border-top: 1px solid #E8D5A3;
    margin: 32px 0;
  }

  /* —— Legal document index (Legal page) —— */
  .legal-doc-list {
    list-style: none;
    margin: 0 0 8px;
    padding: 0;
  }
  .legal-doc-item {
    margin: 0 0 16px;
    padding: 18px 20px;
    background: #FAFAF7;
    border: 1px solid #F0E8D5;
    border-radius: 10px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .legal-doc-item:hover {
    border-color: #E8D5A3;
    box-shadow: 0 4px 16px rgba(201, 168, 76, 0.08);
  }
  .legal-doc-link {
    display: block;
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 18px;
    color: #1C1C1C !important;
    margin-bottom: 6px;
  }
  .legal-doc-link:hover {
    color: #C9A84C !important;
  }
  .legal-doc-desc {
    font-family: var(--font-inter), Inter, sans-serif;
    font-size: 14px;
    color: #888888;
    line-height: 1.65;
    margin: 0;
  }

  /* —— Contact section —— */
  .legal-contact-section {
    margin-top: 8px;
    padding-top: 8px;
  }
  .legal-contact-heading {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 26px;
    color: #1C1C1C;
    margin: 0 0 10px;
  }
  .legal-contact-intro {
    font-family: var(--font-inter), Inter, sans-serif;
    font-size: 16px;
    color: #666666;
    line-height: 1.75;
    margin: 0 0 24px;
  }
  .legal-contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 20px;
  }
  .legal-contact-card {
    background: #FAFAF7;
    border: 1px solid #E8D5A3;
    border-radius: 12px;
    padding: 20px 22px;
  }
  .legal-contact-label {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 600;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #6B7C3A;
    margin: 0 0 10px;
  }
  .legal-contact-email {
    display: block;
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 600;
    font-size: 15px;
    color: #C9A84C !important;
    word-break: break-word;
    margin: 0 0 8px;
    line-height: 1.4;
  }
  .legal-contact-email:hover {
    color: #B8960C !important;
  }
  .legal-contact-note {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 13px;
    color: #888888;
    line-height: 1.5;
    margin: 0;
  }
  .legal-contact-location {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: #888888;
    text-align: center;
    margin: 8px 0 0;
    padding-top: 16px;
    border-top: 1px solid #F0E8D5;
  }

  @media (max-width: 768px) {
    .legal-page-hero {
      padding: 110px 20px 48px;
    }
    .legal-page-title {
      font-size: 34px;
    }
    .legal-page-body-outer {
      padding: 32px 16px 60px;
    }
    .legal-page-body-wrap {
      padding: 32px 24px;
      border-radius: 12px;
    }
    .legal-page-body h2,
    .legal-contact-heading {
      font-size: 22px;
    }
    .legal-contact-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default function LegalDocumentPage({ type }) {
  const doc = legalContent[type] || legalContent.privacy;

  return (
    <main className="legal-page">
      <style>{styles}</style>

      <header className="legal-page-hero">
        <div className="legal-page-hero-glow" aria-hidden="true" />
        <div className="legal-page-hero-inner">
          <p className="legal-page-label">LEGAL</p>
          <h1 className="legal-page-title">{doc.title}</h1>
          <p className="legal-page-updated">Last updated: {doc.lastUpdated}</p>
        </div>
      </header>

      <div className="legal-page-body-outer">
        <div className="legal-page-body-wrap">
          <div
            className="legal-page-body"
            dangerouslySetInnerHTML={{ __html: doc.content }}
          />
        </div>
      </div>

      <Footer />
    </main>
  );
}
