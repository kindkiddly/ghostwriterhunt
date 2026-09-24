import Footer from "@/components/Footer";
import { legalContent } from "./legalContent";

/**
 * Full-page legal document — same site chrome as About Us (Navbar from layout + Footer).
 */

const styles = `
  .legal-page {
    width: 100%;
    overflow-x: hidden;
    background: #FAFAF7;
  }
  .legal-page-hero {
    padding: 120px 24px 48px;
    text-align: center;
    background: #FAFAF7;
    border-bottom: 1px solid #E8D5A3;
  }
  .legal-page-hero-inner {
    max-width: 800px;
    margin: 0 auto;
  }
  .legal-page-label {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 500;
    font-size: 11px;
    color: #6B7C3A;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin: 0 0 16px;
  }
  .legal-page-title {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 48px;
    line-height: 1.15;
    color: #1C1C1C;
    margin: 0 0 12px;
  }
  .legal-page-updated {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #888888;
    margin: 0;
  }
  .legal-page-body-wrap {
    max-width: 800px;
    margin: 0 auto;
    padding: 48px 24px 80px;
  }
  .legal-page-body h2 {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 22px;
    color: #1C1C1C;
    margin: 32px 0 16px;
  }
  .legal-page-body h2:first-child {
    margin-top: 0;
  }
  .legal-page-body h3 {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 18px;
    color: #1C1C1C;
    margin: 24px 0 12px;
  }
  .legal-page-body p {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 15px;
    color: #444444;
    line-height: 1.8;
    margin: 0 0 16px;
  }
  .legal-page-body ul,
  .legal-page-body ol {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 15px;
    color: #444444;
    line-height: 1.8;
    margin: 0 0 16px;
    padding-left: 20px;
  }
  .legal-page-body ul {
    list-style: disc;
  }
  .legal-page-body li {
    margin-bottom: 8px;
  }
  .legal-page-body strong {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 600;
    color: #1C1C1C;
  }
  .legal-page-body a {
    color: #C9A84C;
    text-decoration: none;
  }
  .legal-page-body a:hover {
    text-decoration: underline;
  }
  .legal-page-body hr {
    border: none;
    border-top: 1px solid #E8D5A3;
    margin: 24px 0;
  }
  @media (max-width: 768px) {
    .legal-page-hero {
      padding: 100px 20px 36px;
    }
    .legal-page-title {
      font-size: 32px;
    }
    .legal-page-body-wrap {
      padding: 36px 20px 60px;
    }
  }
`;

export default function LegalDocumentPage({ type }) {
  const doc = legalContent[type] || legalContent.privacy;

  return (
    <main className="legal-page">
      <style>{styles}</style>

      <header className="legal-page-hero">
        <div className="legal-page-hero-inner">
          <p className="legal-page-label">LEGAL</p>
          <h1 className="legal-page-title">{doc.title}</h1>
          <p className="legal-page-updated">Last updated: {doc.lastUpdated}</p>
        </div>
      </header>

      <div className="legal-page-body-wrap">
        <div
          className="legal-page-body"
          dangerouslySetInnerHTML={{ __html: doc.content }}
        />
      </div>

      <Footer />
    </main>
  );
}
