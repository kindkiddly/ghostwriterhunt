/** GhostWriterHunt — published contact details (Footer, legal). */
export const SITE_URL = "https://ghostwriterhunt.lumexforge.com";

export const BUSINESS_LOCATION = "Rosenberg, Texas, USA";

/** Full street address on file; use publicly only where required. */
export const BUSINESS_STREET_ADDRESS =
  "6008 Whitewing Rd, Rosenberg, TX 77469, USA";

/** Public location line for footer and legal contact blocks. */
export const BUSINESS_ADDRESS = BUSINESS_LOCATION;

export const BUSINESS_PHONE_DISPLAY = "(832) 278-1766";
export const BUSINESS_PHONE_ALT_DISPLAY = "(713) 344-4544";
export const BUSINESS_PHONE_DISPLAY_LABELED = `Call: ${BUSINESS_PHONE_DISPLAY}`;
export const BUSINESS_PHONE_TEL = "tel:+18322781766";
export const BUSINESS_PHONE_ALT_TEL = "tel:+17133444544";
export const BUSINESS_PHONE_SCHEMA = "+1-832-278-1766";

/** Both lines as inline links (legal body copy). */
export const BUSINESS_PHONES_LEGAL_HTML = `<a href="${BUSINESS_PHONE_TEL}">${BUSINESS_PHONE_DISPLAY}</a><span aria-hidden="true"> · </span><a href="${BUSINESS_PHONE_ALT_TEL}">${BUSINESS_PHONE_ALT_DISPLAY}</a>`;

/** Both lines for the legal contact card (same row). */
export const BUSINESS_PHONES_LEGAL_CARD_HTML = `<a href="${BUSINESS_PHONE_TEL}" class="legal-contact-email">${BUSINESS_PHONE_DISPLAY}</a><span class="legal-contact-phone-sep" aria-hidden="true"> · </span><a href="${BUSINESS_PHONE_ALT_TEL}" class="legal-contact-email">${BUSINESS_PHONE_ALT_DISPLAY}</a>`;
