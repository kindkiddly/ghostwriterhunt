import Footer from "@/components/Footer";

/**
 * GhostWriterHunt — Cookie Policy
 */

export const metadata = {
  title: "Cookie Policy | GhostWriterHunt",
  description:
    "GhostWriterHunt cookie policy — how we use cookies on our website.",
};

const styles = `
  .lp-hero {
    background: #1C1C1C;
    padding: 80px 0 80px;
  }
  .lp-hero-inner, .lp-content-inner {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .lp-label {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 500;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #6B7C3A;
    margin: 0 0 16px;
  }
  .lp-title {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 56px;
    color: #FFFFFF;
    line-height: 1.1;
    margin: 0 0 12px;
  }
  .lp-updated {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #999999;
    margin: 0;
  }
  .lp-content {
    background: #FAFAF7;
    padding: 80px 0;
  }
  .lp-card {
    background: #FFFFFF;
    border-radius: 16px;
    padding: 60px;
    border: 1px solid #E8D5A3;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  }
  .lp-card h2 {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 24px;
    color: #1C1C1C;
    margin: 0 0 16px;
  }
  .lp-card h3 {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 20px;
    color: #1C1C1C;
    margin: 0 0 12px;
  }
  .lp-card p {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 15px;
    color: #444444;
    line-height: 1.8;
    margin: 0 0 20px;
  }
  .lp-card ul, .lp-card ol {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 15px;
    color: #444444;
    line-height: 1.8;
    margin: 0 0 20px;
    padding-left: 24px;
  }
  .lp-card li { margin-bottom: 8px; }
  .lp-card strong {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 600;
    color: #1C1C1C;
  }
  .lp-card a {
    color: #C9A84C;
    text-decoration: none;
  }
  .lp-card a:hover { text-decoration: underline; }
  .lp-divider {
    border: none;
    border-top: 1px solid #E8D5A3;
    margin: 32px 0;
  }
  .lp-cta {
    margin-top: 40px;
    text-align: center;
  }
  .lp-cta p {
    font-family: var(--font-inter), Inter, sans-serif;
    font-size: 16px;
    color: #666666;
    margin: 0 0 8px;
  }
  .lp-cta a {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 500;
    color: #C9A84C;
    text-decoration: none;
  }
  .lp-cta a:hover { text-decoration: underline; }
  @media (max-width: 768px) {
    .lp-title { font-size: 36px; }
    .lp-card { padding: 32px 24px; }
    .lp-hero { padding: 80px 0 60px; }
  }
`;

export default function CookiePolicyPage() {
  return (
    <main className="m-0 max-w-full overflow-x-hidden p-0">
      <style>{styles}</style>

      <section className="lp-hero">
        <div className="lp-hero-inner">
          <p className="lp-label">LEGAL</p>
          <h1 className="lp-title">Cookie Policy</h1>
          <p className="lp-updated">Last updated: September 2026</p>
        </div>
      </section>

      <section className="lp-content">
        <div className="lp-content-inner">
          <article className="lp-card">
            <h2>What Are Cookies</h2>
            <p>
              Cookies are small text files stored on your device when you visit
              a website. They help websites remember your preferences and
              improve your browsing experience.
            </p>

            <hr className="lp-divider" />

            <h2>How We Use Cookies</h2>
            <p>
              GhostWriterHunt uses cookies for the following purposes:
            </p>

            <h3>Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly.
              They enable core features such as:
            </p>
            <ul>
              <li>
                Page navigation and access to secure areas
              </li>
              <li>Form submission functionality</li>
              <li>Session management</li>
            </ul>
            <p>
              These cookies cannot be disabled as they are essential to the
              operation of our website.
            </p>

            <h3>Analytics Cookies</h3>
            <p>
              We use analytics cookies to understand how visitors interact with
              our website. This helps us:
            </p>
            <ul>
              <li>Improve website content and structure</li>
              <li>Identify popular pages and content</li>
              <li>Understand visitor behavior patterns</li>
            </ul>
            <p>
              Analytics data is anonymized and does not identify individual
              users.
            </p>

            <h3>Marketing Cookies</h3>
            <p>
              With your consent we may use marketing cookies to:
            </p>
            <ul>
              <li>
                Show you relevant content about our services
              </li>
              <li>
                Measure the effectiveness of our marketing campaigns
              </li>
              <li>
                Personalize your experience based on your interests
              </li>
            </ul>

            <hr className="lp-divider" />

            <h2>Managing Cookies</h2>
            <p>
              You can control cookies through your browser settings:
            </p>
            <ul>
              <li>
                <strong>Chrome:</strong> Settings → Privacy and Security →
                Cookies
              </li>
              <li>
                <strong>Firefox:</strong> Options → Privacy and Security →
                Cookies
              </li>
              <li>
                <strong>Safari:</strong> Preferences → Privacy → Cookies
              </li>
              <li>
                <strong>Edge:</strong> Settings → Cookies and Site Permissions
              </li>
            </ul>
            <p>
              Please note that disabling certain cookies may affect the
              functionality of our website.
            </p>

            <hr className="lp-divider" />

            <h2>Third Party Cookies</h2>
            <p>
              Our website may use third party services that set their own
              cookies, including:
            </p>
            <ul>
              <li>Google Analytics (analytics)</li>
              <li>Other performance measurement tools</li>
            </ul>
            <p>
              These third party cookies are governed by their respective
              privacy policies.
            </p>

            <hr className="lp-divider" />

            <h2>Contact Us</h2>
            <p>Questions about our cookie policy:</p>
            <p>
              Email:{" "}
              <a href="mailto:hello@ghostwriterhunt.com">
                hello@ghostwriterhunt.com
              </a>
            </p>

            <div className="lp-cta">
              <p>Questions about our legal policies?</p>
              <a href="mailto:hello@ghostwriterhunt.com">
                hello@ghostwriterhunt.com
              </a>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
