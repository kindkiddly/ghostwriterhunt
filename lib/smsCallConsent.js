/**
 * Call/SMS opt-in metadata for lead forms (contact form + chat intake).
 */

export const SMS_CALL_CONSENT_VERSION = "2026-10-05";

/**
 * @param {boolean} checked
 */
export function buildSmsCallConsentFields(checked) {
  const smsCallConsent = checked === true;
  return {
    smsCallConsent,
    consentTimestamp: new Date().toISOString(),
    consentVersion: SMS_CALL_CONSENT_VERSION,
  };
}

/**
 * @param {Record<string, unknown> | null | undefined} body
 */
export function parseSmsCallConsentFromBody(body) {
  const smsCallConsent = body?.smsCallConsent === true;
  const rawTimestamp = body?.consentTimestamp;
  const consentTimestamp =
    typeof rawTimestamp === "string" && rawTimestamp.trim()
      ? rawTimestamp.trim()
      : new Date().toISOString();
  const rawVersion = body?.consentVersion;
  const consentVersion =
    typeof rawVersion === "string" && rawVersion.trim()
      ? rawVersion.trim()
      : SMS_CALL_CONSENT_VERSION;
  return { smsCallConsent, consentTimestamp, consentVersion };
}

/**
 * @param {{ smsCallConsent: boolean, consentTimestamp: string, consentVersion?: string }} consent
 */
export function formatSmsCallConsentNote(consent) {
  const { smsCallConsent, consentTimestamp, consentVersion = SMS_CALL_CONSENT_VERSION } = consent;
  return `Call/SMS consent: ${smsCallConsent ? "Yes" : "No"}\nConsent timestamp: ${consentTimestamp}\nConsent version: ${consentVersion}`;
}

/**
 * @param {{ smsCallConsent: boolean, consentTimestamp: string }} consent
 */
export function formatSmsCallConsentEmailFields(consent) {
  return {
    smsCallConsent: consent.smsCallConsent ? "Yes" : "No",
    consentTimestamp: consent.consentTimestamp,
  };
}
