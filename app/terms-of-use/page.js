"use client";

import { useEffect } from "react";
import Footer from "@/components/Footer";

/**
 * GhostWriterHunt — Terms of Use
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

export default function TermsOfUsePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Terms of Use | GhostWriterHunt";
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
          <h1 className="lp-title">Terms of Use</h1>
          <p className="lp-updated">Last updated: September 2026</p>
        </div>
      </section>

      <section className="lp-content">
        <div className="lp-content-inner">
          <article className="lp-card">
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using the GhostWriterHunt website and services,
              you agree to be bound by these Terms of Use. If you do not agree
              to these terms, please do not use our website or services.
            </p>

            <hr className="lp-divider" />

            <h2>Our Services</h2>
            <p>
              GhostWriterHunt provides professional ghostwriting, editing,
              design and publishing services. All services are delivered by our
              team of vetted professional writers, editors and designers based
              on individual project agreements.
            </p>

            <hr className="lp-divider" />

            <h2>Intellectual Property and Ownership</h2>
            <p>
              Upon full payment for any completed project, GhostWriterHunt
              transfers complete intellectual property rights to the client.
              This includes:
            </p>
            <ul>
              <li>Full copyright ownership of the manuscript</li>
              <li>All publishing rights across all formats</li>
              <li>The right to publish under your name</li>
              <li>100% of royalties earned from publication</li>
            </ul>
            <p>
              GhostWriterHunt retains no rights to any delivered work and will
              not publish, share or reproduce your content in any form.
            </p>

            <hr className="lp-divider" />

            <h2>Confidentiality</h2>
            <p>
              All projects are protected by a comprehensive Non-Disclosure
              Agreement signed before work begins. GhostWriterHunt agrees:
            </p>
            <ul>
              <li>Never to disclose your project details</li>
              <li>
                Never to reveal our professional relationship
              </li>
              <li>
                Never to use your content for any purpose other than your
                project
              </li>
              <li>
                To maintain complete confidentiality in perpetuity
              </li>
            </ul>

            <hr className="lp-divider" />

            <h2>Payment Terms</h2>
            <ul>
              <li>
                A deposit is required to commence any project
              </li>
              <li>
                Payment schedules are agreed upon in individual project
                contracts
              </li>
              <li>
                All payments are non-refundable unless otherwise specified in
                your project agreement
              </li>
              <li>
                Full payment must be received before final file delivery
              </li>
            </ul>

            <hr className="lp-divider" />

            <h2>Revisions and Satisfaction</h2>
            <ul>
              <li>
                Revision rounds are specified in individual service packages
              </li>
              <li>
                We work until you are satisfied within the scope of your chosen
                plan
              </li>
              <li>
                Unlimited revisions are included in Professional and Premium
                plans
              </li>
            </ul>

            <hr className="lp-divider" />

            <h2>Prohibited Uses</h2>
            <p>You agree not to use our website to:</p>
            <ul>
              <li>
                Violate any applicable laws or regulations
              </li>
              <li>Submit false or misleading information</li>
              <li>Infringe on intellectual property rights</li>
              <li>Engage in any fraudulent activity</li>
            </ul>

            <hr className="lp-divider" />

            <h2>Limitation of Liability</h2>
            <p>
              GhostWriterHunt shall not be liable for any indirect, incidental
              or consequential damages arising from your use of our services
              beyond the amount paid for the specific service in question.
            </p>

            <hr className="lp-divider" />

            <h2>Governing Law</h2>
            <p>
              These Terms of Use shall be governed by the laws of the State of
              Texas, United States, without regard to conflict of law
              provisions.
            </p>

            <hr className="lp-divider" />

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms of Use at any time.
              Continued use of our website constitutes acceptance of updated
              terms.
            </p>

            <hr className="lp-divider" />

            <h2>Contact Us</h2>
            <p>Questions about these terms:</p>
            <p>
              Email:{" "}
              <a href="mailto:hello@ghostwriterhunt.com">
                hello@ghostwriterhunt.com
              </a>
              <br />
              Location: Houston, USA
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
