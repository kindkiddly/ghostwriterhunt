import Footer from "@/components/Footer";

/**
 * GhostWriterHunt — Legal hub
 * Links to all legal documents + SMS consent agreement.
 */

export const metadata = {
  title: "Legal | GhostWriterHunt",
  description:
    "GhostWriterHunt legal information — privacy policy, terms of use, cookie policy and consent agreements.",
};

const DOCUMENTS = [
  {
    title: "Privacy Policy",
    description:
      "How we collect, use and protect your personal information when you use our website and services.",
    href: "/privacy-policy",
  },
  {
    title: "Terms of Use",
    description:
      "The terms and conditions governing your use of our website and the services we provide.",
    href: "/terms-of-use",
  },
  {
    title: "Cookie Policy",
    description:
      "How we use cookies and similar tracking technologies on our website.",
    href: "/cookie-policy",
  },
  {
    title: "Text Message Consent Agreement",
    description:
      "Your rights and our obligations regarding SMS and text message communications.",
    href: "#sms-consent",
  },
];

function DocIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C9A84C"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

const styles = `
  .lp-nav {
    position: sticky;
    top: 0;
    background: #FFFFFF;
    border-bottom: 1px solid #E8D5A3;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 100;
    gap: 16px;
  }
  .lp-nav-back {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: #1C1C1C;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .lp-nav-back:hover { color: #C9A84C; }
  .lp-nav-title {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 16px;
    color: #1C1C1C;
    margin: 0;
    text-align: center;
  }
  .lp-nav-home {
    background: #C9A84C;
    border-radius: 6px;
    padding: 8px 16px;
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 600;
    font-size: 13px;
    color: #FFFFFF;
    text-decoration: none;
    transition: background 0.2s ease;
  }
  .lp-nav-home:hover { background: #B8960C; }
  @media (max-width: 640px) {
    .lp-nav-title { display: none; }
  }
  .lp-hero {
    background: #1C1C1C;
    padding: 120px 0 80px;
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
  .lp-doc-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background: #FFFFFF;
    border: 1px solid #E8D5A3;
    border-left: 3px solid #C9A84C;
    border-radius: 12px;
    padding: 24px 28px;
    margin-bottom: 16px;
    text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .lp-doc-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    text-decoration: none;
  }
  .lp-doc-left {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    min-width: 0;
  }
  .lp-doc-title {
    font-family: var(--font-playfair), "Playfair Display", serif;
    font-weight: 700;
    font-size: 18px;
    color: #1C1C1C;
    margin: 0 0 6px;
  }
  .lp-doc-desc {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #666666;
    line-height: 1.5;
    margin: 0;
  }
  .lp-doc-read {
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 600;
    font-size: 14px;
    color: #C9A84C;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .lp-doc-card:hover .lp-doc-read {
    text-decoration: underline;
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
    .lp-hero { padding: 100px 0 60px; }
    .lp-doc-card {
      flex-direction: column;
      align-items: flex-start;
      padding: 20px;
    }
  }
`;

export default function LegalPage() {
  return (
    <main className="m-0 max-w-full overflow-x-hidden p-0">
      <style>{styles}</style>

      <nav className="lp-nav" aria-label="Legal page navigation">
        <a href="/" className="lp-nav-back">
          <span aria-hidden="true">←</span>
          Back to GhostWriterHunt
        </a>
        <p className="lp-nav-title">Legal</p>
        <a href="/" className="lp-nav-home">
          Home
        </a>
      </nav>

      <section className="lp-hero">
        <div className="lp-hero-inner">
          <p className="lp-label">LEGAL</p>
          <h1 className="lp-title">Legal</h1>
          <p className="lp-updated">Last updated: September 2026</p>
        </div>
      </section>

      <section className="lp-content">
        <div className="lp-content-inner">
          <article className="lp-card">
            <h2>Legal Information</h2>
            <p>
              This page provides access to all legal documents governing your
              use of GhostWriterHunt&apos;s website and professional
              ghostwriting services.
            </p>

            <hr className="lp-divider" />

            <h2>Our Legal Documents</h2>

            {DOCUMENTS.map((doc) => (
              <a key={doc.title} href={doc.href} className="lp-doc-card">
                <div className="lp-doc-left">
                  <DocIcon />
                  <div>
                    <p className="lp-doc-title">{doc.title}</p>
                    <p className="lp-doc-desc">{doc.description}</p>
                  </div>
                </div>
                <span className="lp-doc-read">Read →</span>
              </a>
            ))}

            <hr className="lp-divider" />

            <div id="sms-consent">
              <h2>Text Message Consent Agreement</h2>
              <p>
                By providing your phone number and opting in to text message
                communications, you agree to receive SMS messages from
                GhostWriterHunt related to the following purposes:
              </p>
              <ol>
                <li>
                  <strong>Project Updates</strong> — Notifications regarding
                  the status of your book project, including milestone
                  completions, draft deliveries and revision updates.
                </li>
                <li>
                  <strong>Client Support</strong> — Assistance with your
                  project, responses to your inquiries and resolution of any
                  issues related to your ghostwriting or publishing services.
                </li>
                <li>
                  <strong>Consultation Reminders</strong> — Reminders about
                  upcoming consultation calls, project review meetings and
                  scheduled check-ins with your assigned writer.
                </li>
                <li>
                  <strong>Account Alerts</strong> — Important notifications
                  regarding your account, payment confirmations, contract
                  updates and project timeline changes.
                </li>
                <li>
                  <strong>Service Communications</strong> — Information about
                  new services, relevant updates and important announcements
                  from GhostWriterHunt.
                </li>
              </ol>

              <h3>How to Withdraw Your Consent</h3>
              <p>
                You have the right to withdraw your consent to receive text
                messages from GhostWriterHunt at any time using any of the
                following methods:
              </p>
              <ol>
                <li>
                  <strong>Reply STOP</strong> — Reply to any text message you
                  receive from us with the word &quot;STOP.&quot; This will
                  automatically unsubscribe you from further text
                  communications.
                </li>
                <li>
                  <strong>Contact Us</strong> — Reach out to our client support
                  team at{" "}
                  <a href="mailto:hello@ghostwriterhunt.com">
                    hello@ghostwriterhunt.com
                  </a>{" "}
                  and request to be unsubscribed from text message
                  communications.
                </li>
                <li>
                  <strong>Update Preferences</strong> — Contact us directly to
                  update your communication preferences and opt out of
                  receiving text messages.
                </li>
              </ol>
              <p>
                Please note that even if you opt out of promotional text
                messages, you may still receive transactional messages directly
                related to your active book project.
              </p>
              <p>
                By opting in, you confirm that you are the owner or authorized
                user of the phone number provided and that you understand and
                agree to the terms outlined above.
              </p>
              <p>
                Message and data rates may apply. Message frequency varies based
                on your project status and activity.
              </p>
              <p>
                For questions or concerns regarding this consent agreement,
                please contact us at:
              </p>
              <p>
                Email:{" "}
                <a href="mailto:hello@ghostwriterhunt.com">
                  hello@ghostwriterhunt.com
                </a>
                <br />
                Location: Houston, USA
              </p>
            </div>

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
