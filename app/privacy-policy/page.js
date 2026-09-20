"use client";

import { useEffect } from "react";
import Footer from "@/components/Footer";

/**
 * GhostWriterHunt — Privacy Policy
 */

const styles = `
  .lp-hero {
    background: #1C1C1C;
    padding-bottom: 80px;
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
    .lp-hero { padding-bottom: 60px; }
  }
`;

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Privacy Policy | GhostWriterHunt";
  }, []);

  return (
    <main
      className="m-0 max-w-full p-0"
      style={{
        overflowX: "hidden",
        overflowAnchor: "none",
      }}
    >
      <style>{styles}</style>

      <section
        className="lp-hero"
        style={{
          paddingTop: "80px",
          scrollMarginTop: "80px",
        }}
      >
        <div className="lp-hero-inner">
          <p className="lp-label">LEGAL</p>
          <h1 className="lp-title">Privacy Policy</h1>
          <p className="lp-updated">Last updated: September 2026</p>
        </div>
      </section>

      <section className="lp-content">
        <div className="lp-content-inner">
          <article className="lp-card">
            <h2>Introduction</h2>
            <p>
              GhostWriterHunt (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
              is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose and safeguard your
              information when you visit our website ghostwriterhunt.lumexforge.com
              and use our professional ghostwriting services. Please read this
              policy carefully. If you disagree with its terms, please
              discontinue use of our site.
            </p>

            <hr className="lp-divider" />

            <h2>Information We Collect</h2>
            <h3>Information You Provide Directly</h3>
            <p>
              We collect information you voluntarily provide when you:
            </p>
            <ul>
              <li>Submit a consultation request or contact form</li>
              <li>Purchase or inquire about our services</li>
              <li>Communicate with our team via email or phone</li>
              <li>Subscribe to our newsletter</li>
            </ul>
            <p>
              This information may include your name, email address, phone
              number, book project details and any other information you choose
              to provide.
            </p>

            <h3>Information Collected Automatically</h3>
            <p>
              When you visit our website we automatically collect certain
              information about your device and browsing behavior, including:
            </p>
            <ul>
              <li>IP address and browser type</li>
              <li>Pages visited and time spent on each page</li>
              <li>Referring website addresses</li>
              <li>Device type and operating system</li>
            </ul>

            <hr className="lp-divider" />

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>
                Respond to your consultation requests and service inquiries
              </li>
              <li>
                Provide, manage and improve our ghostwriting services
              </li>
              <li>
                Send project updates and communications related to your book
                project
              </li>
              <li>
                Send marketing communications (only with your consent)
              </li>
              <li>
                Analyze website usage to improve user experience
              </li>
              <li>Comply with legal obligations</li>
            </ul>

            <hr className="lp-divider" />

            <h2>Text Message Communications</h2>
            <p>
              By providing your phone number and opting in to SMS
              communications, you agree to receive text messages from
              GhostWriterHunt related to:
            </p>
            <ol>
              <li>
                <strong>Project Updates</strong> — Notifications regarding your
                book project status, milestones and deliverables.
              </li>
              <li>
                <strong>Client Support</strong> — Assistance with your project
                and responses to your inquiries.
              </li>
              <li>
                <strong>Consultation Reminders</strong> — Reminders about
                scheduled calls and consultations.
              </li>
              <li>
                <strong>Account Alerts</strong> — Important alerts regarding
                your account or project.
              </li>
              <li>
                <strong>Service Updates</strong> — Information about new
                services and offerings from GhostWriterHunt.
              </li>
            </ol>
            <p>
              <strong>To opt out of SMS messages:</strong> Reply STOP to any
              text message from us, or contact us at{" "}
              <a href="mailto:hello@ghostwriterhunt.com">
                hello@ghostwriterhunt.com
              </a>
              . Message and data rates may apply.
            </p>

            <hr className="lp-divider" />

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade or rent your personal information to third
              parties. We may share your information only in the following
              circumstances:
            </p>
            <ul>
              <li>
                With service providers who assist us in operating our website
                and delivering our services
              </li>
              <li>
                When required by law or to protect our legal rights
              </li>
              <li>With your explicit consent</li>
            </ul>

            <hr className="lp-divider" />

            <h2>NDA and Confidentiality</h2>
            <p>
              All client projects are protected by a Non-Disclosure Agreement
              (NDA). Your book ideas, manuscript content, personal story and
              project details are completely confidential and will never be
              disclosed to third parties under any circumstances.
            </p>

            <hr className="lp-divider" />

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure or destruction. All data is
              transmitted using SSL encryption.
            </p>

            <hr className="lp-divider" />

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>
                Access the personal information we hold about you
              </li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>
                Opt out of marketing communications at any time
              </li>
              <li>Withdraw consent for SMS communications</li>
            </ul>

            <hr className="lp-divider" />

            <h2>Cookies</h2>
            <p>
              We use cookies to enhance your browsing experience. Please see
              our{" "}
              <a href="/cookie-policy">Cookie Policy</a> for full details.
            </p>

            <hr className="lp-divider" />

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact
              us at:
            </p>
            <p>
              GhostWriterHunt
              <br />
              Houston, USA
              <br />
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
