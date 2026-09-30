/**
 * Shared email validation (client-safe — no Node DNS).
 * Server routes should use validateEmailForServer from email.server.js.
 */

export const EMAIL_FORMAT_ERROR = "Please check your email address.";

/** TLDs that are almost always typos for .com (and similar). */
const BLOCKED_TLDS = new Set([
  "con",
  "cmo",
  "comm",
  "cpm",
  "cm",
  "om",
  "coom",
  "commm",
  "nett",
  "orgg",
]);

/**
 * Wrong domain → corrected domain (lowercase keys).
 * Includes repeated-segment typos for major providers.
 */
const DOMAIN_CORRECTIONS = {
  "gmail.com.com": "gmail.com",
  "googlemail.com.com": "googlemail.com",
  "gmial.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gnail.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.con": "gmail.com",
  "gmail.cmo": "gmail.com",
  "gmail.comm": "gmail.com",
  "yahoo.com.com": "yahoo.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "yahoo.con": "yahoo.com",
  "hotmail.com.com": "hotmail.com",
  "hotmial.com": "hotmail.com",
  "hotmal.com": "hotmail.com",
  "hotmail.con": "hotmail.com",
  "outlook.com.com": "outlook.com",
  "outlok.com": "outlook.com",
  "outlook.con": "outlook.com",
  "icloud.com.com": "icloud.com",
  "icloud.con": "icloud.com",
  "aol.com.com": "aol.com",
  "aol.con": "aol.com",
  "live.com.com": "live.com",
  "live.con": "live.com",
  "msn.com.com": "msn.com",
  "msn.con": "msn.com",
  "protonmail.com.com": "protonmail.com",
  "protonmail.con": "protonmail.com",
  "proton.me.com": "proton.me",
};

const COMMON_PROVIDER_ROOTS = [
  "gmail",
  "googlemail",
  "yahoo",
  "hotmail",
  "outlook",
  "icloud",
  "aol",
  "live",
  "msn",
  "protonmail",
];

export function normalizeEmailInput(raw) {
  if (raw == null) return "";
  return String(raw).trim().toLowerCase();
}

function countAtSigns(value) {
  let n = 0;
  for (const ch of value) {
    if (ch === "@") n += 1;
  }
  return n;
}

function hasRepeatedPublicSuffix(labels) {
  if (labels.length < 2) return true;
  const last = labels[labels.length - 1];
  const prev = labels[labels.length - 2];
  if (last === prev && last.length <= 4) return true;
  if (
    labels.length >= 3 &&
    labels[labels.length - 1] === labels[labels.length - 2] &&
    labels[labels.length - 1] === labels[labels.length - 3]
  ) {
    return true;
  }
  const joined = labels.join(".");
  for (const root of COMMON_PROVIDER_ROOTS) {
    if (joined === `${root}.com.com` || joined.endsWith(`.${root}.com.com`)) {
      return true;
    }
  }
  return false;
}

function isValidLocalPart(local) {
  if (!local || local.length > 64) return false;
  if (local.startsWith(".") || local.endsWith(".")) return false;
  if (local.includes("..")) return false;
  return /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(local);
}

function isValidDomainLabels(domain) {
  if (!domain || domain.length > 253) return false;
  if (domain.startsWith(".") || domain.endsWith(".")) return false;
  if (domain.includes("..")) return false;
  const labels = domain.split(".");
  if (labels.length < 2) return false;
  if (hasRepeatedPublicSuffix(labels)) return false;

  for (const label of labels) {
    if (!label || label.length > 63) return false;
    if (!/^[a-z0-9-]+$/i.test(label)) return false;
    if (label.startsWith("-") || label.endsWith("-")) return false;
  }

  const tld = labels[labels.length - 1].toLowerCase();
  if (tld.length < 2 || !/^[a-z]{2,63}$/.test(tld)) return false;
  if (BLOCKED_TLDS.has(tld)) return false;

  return true;
}

export function suggestEmailCorrection(normalized) {
  if (!normalized || !normalized.includes("@")) return null;
  const at = normalized.lastIndexOf("@");
  const local = normalized.slice(0, at);
  const domain = normalized.slice(at + 1);
  if (!local || !domain) return null;

  const direct = DOMAIN_CORRECTIONS[domain];
  if (direct) return `${local}@${direct}`;

  const parts = domain.split(".");
  if (parts.length >= 3 && parts[parts.length - 1] === parts[parts.length - 2]) {
    const trimmed = parts.slice(0, -1).join(".");
    const fixed = DOMAIN_CORRECTIONS[trimmed] || trimmed;
    if (fixed !== domain) return `${local}@${fixed}`;
  }

  return null;
}

/**
 * @returns {{ ok: true, normalized: string } | { ok: false, suggestion?: string }}
 */
export function validateEmailFormat(raw) {
  const normalized = normalizeEmailInput(raw);
  if (!normalized) {
    return { ok: false };
  }
  if (/\s/.test(normalized)) {
    return { ok: false, suggestion: suggestEmailCorrection(normalized.replace(/\s/g, "")) || undefined };
  }
  if (countAtSigns(normalized) !== 1) {
    const collapsed = normalized.replace(/@+/g, "@");
    return {
      ok: false,
      suggestion: suggestEmailCorrection(collapsed) || undefined,
    };
  }

  const at = normalized.indexOf("@");
  const local = normalized.slice(0, at);
  const domain = normalized.slice(at + 1);

  const suggestion = suggestEmailCorrection(normalized);

  if (!isValidLocalPart(local) || !isValidDomainLabels(domain)) {
    return { ok: false, suggestion: suggestion || undefined };
  }

  if (DOMAIN_CORRECTIONS[domain]) {
    return { ok: false, suggestion: `${local}@${DOMAIN_CORRECTIONS[domain]}` };
  }

  if (suggestion && suggestion !== normalized) {
    return { ok: false, suggestion };
  }

  return { ok: true, normalized };
}

/** Client UI: inline error + typo line under email fields. */
export function getClientEmailFeedback(raw) {
  const result = validateEmailFormat(raw);
  if (result.ok) {
    return { error: null, suggestion: null, suggestedEmail: null, normalized: result.normalized };
  }
  const suggestedEmail = result.suggestion || null;
  return {
    error: EMAIL_FORMAT_ERROR,
    suggestedEmail,
    suggestion: suggestedEmail ? `Did you mean ${suggestedEmail}?` : null,
    normalized: null,
  };
}

export function buildServerEmailError(result) {
  if (result.ok) return null;
  if (result.suggestion) {
    return `${EMAIL_FORMAT_ERROR} Did you mean ${result.suggestion}?`;
  }
  return EMAIL_FORMAT_ERROR;
}
