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
        I agree to receive calls and SMS text messages from GhostWriterHunt, including by automated
        technology, regarding my inquiry, including information about book-related packages, quotes,
        updates, and follow-up regarding my request. Message frequency may vary. Message and data
        rates may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of
        purchase. See our{" "}
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
