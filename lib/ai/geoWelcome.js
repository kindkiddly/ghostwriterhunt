/**
 * GhostWriterHunt — Geo-aware opening line for new chats.
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
    return "Our team is currently helping other authors. I'm the GhostWriterHunt virtual assistant and can get your inquiry started.";
  }
  return "Our team is currently assisting other authors. Let's get your inquiry started, and a team member can step in anytime.";
}
