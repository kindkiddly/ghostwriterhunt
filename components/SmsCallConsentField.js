"use client";

/**
 * Optional call/SMS consent checkbox — styles scoped per form (contact vs chat).
 */

const PRIVACY_HREF = "/privacy-policy";
const TERMS_HREF = "/terms-of-use";

function stopLinkToggle(e) {
  e.stopPropagation();
}

export default function SmsCallConsentField({ id, checked, onChange, variant = "contact" }) {
  const isContact = variant === "contact";
  const rowClass = isContact ? "cf-consent-row cf-reveal-field" : "gcw-consent-row";
  const inputClass = isContact ? "cf-consent-checkbox" : "gcw-consent-checkbox";
  const labelClass = isContact ? "cf-consent-label" : "gcw-consent-label";
  const linkClass = isContact ? "cf-consent-link" : "gcw-consent-link";

  return (
    <div className={rowClass} data-delay={isContact ? "650" : undefined}>
      <input
        type="checkbox"
        id={id}
        className={inputClass}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label className={labelClass} htmlFor={id}>
        I agree to receive SMS text messages from GhostWriterHunt related to my submitted inquiry,
        requested service information, quotes, consultation scheduling, and related project
        communications. Providing my phone number alone is not consent. Message frequency varies.
        Message and data rates may apply. Reply STOP to opt out or HELP for assistance. Consent is
        not a condition of purchase. See the{" "}
        <a
          href={PRIVACY_HREF}
          className={linkClass}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stopLinkToggle}
          onMouseDown={stopLinkToggle}
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href={TERMS_HREF}
          className={linkClass}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stopLinkToggle}
          onMouseDown={stopLinkToggle}
        >
          Terms
        </a>
        .
      </label>
    </div>
  );
}
