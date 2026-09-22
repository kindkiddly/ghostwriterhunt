"use client";

import { useEffect, useState } from "react";

/**
 * GhostWriterHunt — Contact & Booking Form
 * Two-column cream section: left trust copy, right booking card.
 * Anchors #start and #contact both land here.
 */

const GENRE_OPTIONS = [
  "Fiction",
  "Non-Fiction",
  "Biography",
  "Memoir",
  "Self-Help",
  "Business",
  "Children's Book",
  "Mystery & Thriller",
  "Romance",
  "Fantasy",
  "Poetry",
  "Other",
];

const PROJECT_OPTIONS = [
  "Full Book Ghostwriting",
  "Manuscript Editing",
  "Book Cover Design",
  "Interior Layout",
  "eBook Publishing",
  "Author Branding",
  "Book Marketing",
  "Complete Package",
];

const REFERRAL_OPTIONS = [
  "Google Search",
  "Social Media",
  "Referral from a friend",
  "Blog or Article",
  "Other",
];

const TRUST_POINTS = [
  "Free consultation — no commitment",
  "Full NDA confidentiality guaranteed",
  "Free sample chapter before you commit",
];

const EMAIL_SUBTITLE_STYLE = {
  display: "block",
  marginTop: "2px",
  fontFamily: "var(--font-inter), Inter, sans-serif",
  fontWeight: 500,
  fontSize: "11px",
  color: "#888888",
};

const INITIAL_FORM = {
  fullName: "",
  email: "",
  phone: "",
  genre: "",
  projectType: "",
  about: "",
  referral: "",
};

function CheckIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="10" cy="10" r="9" stroke="#C9A84C" strokeWidth="1.5" />
      <path
        d="M6 10.2L8.6 12.8L14 7.4"
        stroke="#C9A84C"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Scroll-reveal: left copy, right card, staggered form rows
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".cf-reveal-left, .cf-reveal-right"
    );
    const fieldElements = document.querySelectorAll(".cf-reveal-field");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0");
            setTimeout(() => {
              entry.target.classList.add("cf-visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    const fieldObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0");
            setTimeout(() => {
              entry.target.classList.add("cf-visible");
            }, delay);
            fieldObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    requestAnimationFrame(() => {
      elements.forEach((el) => {
        el.classList.remove("cf-visible");
        observer.observe(el);
      });
      fieldElements.forEach((el) => {
        el.classList.remove("cf-visible");
        fieldObserver.observe(el);
      });
    });

    return () => {
      observer.disconnect();
      fieldObserver.disconnect();
    };
  }, [success]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (submitting || success) return;
    setSubmitting(true);
    // Fake submit — show success after 1s (no backend yet)
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1000);
  }

  return (
    <>
      <style>{`
        .cf-reveal-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.7s ease-out,
                      transform 0.7s ease-out;
        }
        .cf-reveal-right {
          opacity: 0;
          transform: translateY(40px) scale(0.97);
          transition: opacity 0.7s ease-out,
                      transform 0.7s ease-out;
        }
        .cf-reveal-field {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease-out,
                      transform 0.5s ease-out;
        }
        .cf-reveal-left.cf-visible,
        .cf-reveal-right.cf-visible,
        .cf-reveal-field.cf-visible {
          opacity: 1;
          transform: translateX(0)
                     translateY(0)
                     scale(1);
        }
        @media (max-width: 768px) {
          .cf-reveal-left {
            transform: translateY(20px);
          }
          .cf-reveal-right {
            transform: translateY(20px) scale(0.97);
          }
        }

        .cf-section {
          width: 100%;
          background: #FAFAF7;
          padding: 80px 0;
        }
        .cf-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          gap: 60px;
        }
        .cf-left {
          flex: 0 0 45%;
          max-width: 45%;
        }
        .cf-right {
          flex: 0 0 55%;
          max-width: 55%;
        }
        .cf-label {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 500;
          font-size: 11px;
          color: #6B7C3A;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin: 0 0 20px;
        }
        .cf-headline {
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 48px;
          line-height: 1.1;
          margin: 0 0 24px;
        }
        .cf-headline-line1 {
          display: block;
          color: #1C1C1C;
          font-style: normal;
        }
        .cf-headline-line2 {
          display: block;
          color: #C9A84C;
          font-style: italic;
          font-weight: 700;
        }
        .cf-subtext {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 16px;
          color: #666666;
          line-height: 1.7;
          max-width: 380px;
          margin: 0 0 36px;
        }
        .cf-trust-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .cf-trust-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 500;
          font-size: 14px;
          color: #1C1C1C;
        }
        .cf-divider {
          border: none;
          border-top: 1px solid #E8D5A3;
          margin: 24px 0;
        }
        .cf-email-label {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 12px;
          color: #999999;
          margin: 0 0 6px;
        }
        .cf-email-link {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 500;
          font-size: 15px;
          color: #C9A84C;
          text-decoration: none;
          transition: text-decoration 0.2s ease;
        }
        .cf-email-link:hover {
          text-decoration: underline;
        }

        .cf-card {
          background: #FFFFFF;
          border: 1px solid #E8D5A3;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 8px 40px rgba(201, 168, 76, 0.10);
        }
        .cf-form-row {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
        }
        .cf-form-row.cf-full {
          flex-direction: column;
        }
        .cf-field {
          flex: 1;
          min-width: 0;
        }
        .cf-field-label {
          display: block;
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 500;
          font-size: 13px;
          color: #1C1C1C;
          margin-bottom: 8px;
        }
        .cf-input,
        .cf-select,
        .cf-textarea {
          width: 100%;
          background: #FAFAF7;
          border: 1px solid #E8D5A3;
          border-radius: 8px;
          padding: 14px 16px;
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 15px;
          color: #1C1C1C;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          box-sizing: border-box;
        }
        .cf-input::placeholder,
        .cf-textarea::placeholder {
          color: #999999;
        }
        .cf-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999999' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 40px;
          cursor: pointer;
        }
        .cf-select:invalid,
        .cf-select.cf-placeholder {
          color: #999999;
        }
        .cf-input:focus,
        .cf-select:focus,
        .cf-textarea:focus {
          border-color: #C9A84C;
          outline: none;
          box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.15);
        }
        .cf-textarea {
          resize: vertical;
          min-height: 110px;
        }
        .cf-submit {
          width: 100%;
          background: #C9A84C;
          color: #FFFFFF;
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 600;
          font-size: 16px;
          padding: 16px;
          border-radius: 8px;
          border: none;
          margin-top: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .cf-submit:hover:not(:disabled) {
          background: #B8960C;
        }
        .cf-submit:disabled {
          opacity: 0.75;
          cursor: wait;
        }

        .cf-success {
          text-align: center;
          padding: 48px 16px;
        }
        .cf-success-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .cf-success-heading {
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 28px;
          color: #1C1C1C;
          margin: 0 0 12px;
        }
        .cf-success-text {
          font-family: var(--font-inter), Inter, sans-serif;
          font-weight: 400;
          font-size: 16px;
          color: #666666;
          line-height: 1.6;
          margin: 0;
          max-width: 360px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 768px) {
          .cf-inner {
            flex-direction: column;
            gap: 40px;
            align-items: stretch;
          }
          .cf-left,
          .cf-right {
            flex: 1 1 100%;
            max-width: 100%;
          }
          .cf-headline {
            font-size: 32px;
          }
          .cf-form-row {
            flex-direction: column;
          }
          .cf-card {
            padding: 28px 20px;
          }
        }
      `}</style>

      {/* Both #start and #contact land on this section */}
      <section
        id="start"
        className="cf-section"
        aria-labelledby="cf-heading"
      >
        <div id="contact" className="sr-only" aria-hidden="true" />

        <div className="cf-inner">
          {/* LEFT — copy & trust */}
          <div className="cf-left cf-reveal-left" data-delay="0">
            <p className="cf-label">GET STARTED</p>

            <h2 id="cf-heading" className="cf-headline">
              <span className="cf-headline-line1">Start your book</span>
              <span className="cf-headline-line2">journey today.</span>
            </h2>

            <p className="cf-subtext">
              Book a free consultation with our team. We will match you with
              the perfect ghostwriter for your project — no commitment required.
            </p>

            <ul className="cf-trust-list">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="cf-trust-item">
                  <CheckIcon />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <hr className="cf-divider" />

            <p className="cf-email-label">Email us directly</p>
            <div>
              <a
                href="mailto:ghostwriterhunt@lumexforge.com"
                className="cf-email-link"
              >
                ghostwriterhunt@lumexforge.com
              </a>
              <span style={EMAIL_SUBTITLE_STYLE}>
                New projects &amp; consultations
              </span>
            </div>
            <div style={{ marginTop: "12px" }}>
              <a
                href="mailto:support.gwh@lumexforge.com"
                className="cf-email-link"
              >
                support.gwh@lumexforge.com
              </a>
              <span style={EMAIL_SUBTITLE_STYLE}>
                Client support &amp; project help
              </span>
            </div>
          </div>

          {/* RIGHT — form card */}
          <div
            className="cf-right cf-reveal-right"
            data-delay="150"
          >
            <div className="cf-card">
              {success ? (
                <div className="cf-success" role="status">
                  <div className="cf-success-icon">
                    <CheckIcon size={56} />
                  </div>
                  <h3 className="cf-success-heading">Thank you!</h3>
                  <p className="cf-success-text">
                    We have received your request and will be in touch within 24
                    hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate={false}>
                  {/* Row 1 — name + email */}
                  <div
                    className="cf-form-row cf-reveal-field"
                    data-delay="300"
                  >
                    <div className="cf-field">
                      <label className="cf-field-label" htmlFor="cf-fullName">
                        Full Name*
                      </label>
                      <input
                        id="cf-fullName"
                        className="cf-input"
                        type="text"
                        name="fullName"
                        placeholder="Your full name"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="cf-field">
                      <label className="cf-field-label" htmlFor="cf-email">
                        Email Address*
                      </label>
                      <input
                        id="cf-email"
                        className="cf-input"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Row 2 — phone + genre */}
                  <div
                    className="cf-form-row cf-reveal-field"
                    data-delay="380"
                  >
                    <div className="cf-field">
                      <label className="cf-field-label" htmlFor="cf-phone">
                        Phone Number
                      </label>
                      <input
                        id="cf-phone"
                        className="cf-input"
                        type="tel"
                        name="phone"
                        placeholder="+1 (optional)"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="cf-field">
                      <label className="cf-field-label" htmlFor="cf-genre">
                        Book Genre*
                      </label>
                      <select
                        id="cf-genre"
                        className={`cf-select${form.genre ? "" : " cf-placeholder"}`}
                        name="genre"
                        value={form.genre}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Select genre
                        </option>
                        {GENRE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3 — project type */}
                  <div
                    className="cf-form-row cf-full cf-reveal-field"
                    data-delay="460"
                  >
                    <div className="cf-field">
                      <label
                        className="cf-field-label"
                        htmlFor="cf-projectType"
                      >
                        Project Type*
                      </label>
                      <select
                        id="cf-projectType"
                        className={`cf-select${form.projectType ? "" : " cf-placeholder"}`}
                        name="projectType"
                        value={form.projectType}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>
                          Select project type
                        </option>
                        {PROJECT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4 — about book */}
                  <div
                    className="cf-form-row cf-full cf-reveal-field"
                    data-delay="540"
                  >
                    <div className="cf-field">
                      <label className="cf-field-label" htmlFor="cf-about">
                        Tell us about your book*
                      </label>
                      <textarea
                        id="cf-about"
                        className="cf-textarea"
                        name="about"
                        rows={4}
                        placeholder="Describe your book idea, target audience, and any specific requirements..."
                        value={form.about}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Row 5 — referral */}
                  <div
                    className="cf-form-row cf-full cf-reveal-field"
                    data-delay="620"
                  >
                    <div className="cf-field">
                      <label className="cf-field-label" htmlFor="cf-referral">
                        How did you hear about us?
                      </label>
                      <select
                        id="cf-referral"
                        className={`cf-select${form.referral ? "" : " cf-placeholder"}`}
                        name="referral"
                        value={form.referral}
                        onChange={handleChange}
                      >
                        <option value="">Select an option</option>
                        {REFERRAL_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="cf-submit cf-reveal-field"
                    data-delay="700"
                    disabled={submitting}
                  >
                    {submitting
                      ? "Sending..."
                      : "Book My Free Consultation"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
