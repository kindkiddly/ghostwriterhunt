/** [CALLBACK:phone] at end of AI reply (hidden from visitor). */
const CALLBACK_TOKEN_PATTERN = /\[CALLBACK:\s*([^\]]+)\]\s*$/i;

export function parseCallbackToken(text) {
  const match = String(text || "").match(CALLBACK_TOKEN_PATTERN);
  if (!match) return null;
  return match[1].trim();
}

export function stripCallbackToken(text) {
  return String(text || "")
    .replace(/\n?\[CALLBACK:[^\]]*\]\s*$/i, "")
    .trim();
}

/** Digits, +, spaces, dashes, brackets; 7–20 digits after stripping non-digits. */
export function validateCallbackPhone(raw) {
  const trimmed = String(raw || "").trim();
  if (!trimmed) return null;
  if (!/^[\d+\s().-]+$/.test(trimmed)) return null;
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 20) return null;
  return trimmed;
}
