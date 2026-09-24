/**
 * GhostWriterHunt — Geo-aware opening line for new chats.
 * Does NOT mention AI — the assistant presents as a helpful team
 * representative until the visitor directly asks.
 */

const EU_EEA_UK = new Set([
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "IS",
  "LI",
  "NO",
  "GB",
  "UK",
]);

export function isGeoWelcomeRegion(country, region) {
  if (!country) return false;
  const code = country.toUpperCase();
  if (EU_EEA_UK.has(code)) return true;
  if (code === "US" && region?.toUpperCase() === "CA") return true;
  return false;
}

export function getGeoWelcomeMessage(country, region) {
  if (isGeoWelcomeRegion(country, region)) {
    return "Our team is currently helping other authors — I'll help get your inquiry started and share any current offers that fit your project.";
  }
  return "Our team is currently assisting other authors — let's get your inquiry started, and a team member can step in anytime.";
}
