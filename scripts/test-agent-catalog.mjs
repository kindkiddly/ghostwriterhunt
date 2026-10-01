/**
 * GhostWriterHunt — agent catalog & payment validation checks (no network).
 * Run: node scripts/test-agent-catalog.mjs
 */

import {
  validateAiPaymentAmount,
  getPlanById,
  getWebsiteCardsFromPricing,
  resolvePaymentLinkFloorUsd,
  formatCatalogForPrompt,
  CATALOG_PLANS,
  PROFESSIONAL_SERIES_MIN_BOOKS,
  PROFESSIONAL_SERIES_UNIT_USD,
} from "../data/agentCatalog.js";
import { getGeoWelcomeMessage, isGeoWelcomeRegion } from "../lib/ai/geoWelcome.js";

let failed = 0;

function assert(condition, label) {
  if (!condition) {
    console.error("FAIL:", label);
    failed += 1;
  } else {
    console.log("ok:", label);
  }
}

const cards = getWebsiteCardsFromPricing();
assert(cards.length === 3, "three website cards from pricing.js");
assert(
  cards.find((c) => c.name === "Professional")?.minimumBooks === PROFESSIONAL_SERIES_MIN_BOOKS,
  "Professional min books on card"
);

const launch = getPlanById("author_launch");
assert(launch && launch.price === 549 && launch.floor >= Math.ceil(549 * 0.85), "author_launch floor");

for (const plan of CATALOG_PLANS) {
  assert(
    plan.floor <= plan.price,
    `plan floor <= price (${plan.id}: floor ${plan.floor}, price ${plan.price})`
  );
}

assert(validateAiPaymentAmount(800, "series_4").ok, "series_4 at $800 accepted");
assert(!validateAiPaymentAmount(600, "series_4").ok, "series_4 below $800 rejected");
assert(!validateAiPaymentAmount(700, "series_4").ok, "series_4 at $700 rejected (below floor)");
assert(validateAiPaymentAmount(1140, "series_6").ok, "series_6 at list price accepted");

const belowFloor = validateAiPaymentAmount(100, "author_launch");
assert(!belowFloor.ok && belowFloor.reason === "below_floor", "link below plan floor rejected");

assert(!validateAiPaymentAmount(6000, "author_launch").ok, "above $5000 rejected");

const comboFloor = resolvePaymentLinkFloorUsd("ghostwriting+cover", null);
assert(comboFloor === 120 + 20, "custom combo floor sum");

const euWelcome = getGeoWelcomeMessage("DE", null);
assert(
  euWelcome.includes("virtual assistant"),
  "EU welcome mentions virtual assistant"
);
const usWelcome = getGeoWelcomeMessage("US", "TX");
assert(!usWelcome.includes("virtual assistant"), "non-EU welcome without virtual assistant label");
assert(isGeoWelcomeRegion("US", "CA"), "US-CA geo region");

const catalogText = formatCatalogForPrompt();
assert(catalogText.includes("WEBSITE PRICING CARDS"), "catalog block present");
assert(catalogText.includes("Professional"), "Professional card in catalog");
assert(
  catalogText.includes(`MINIMUM ${PROFESSIONAL_SERIES_MIN_BOOKS} books`),
  "Professional minimum books in catalog"
);

assert(
  PROFESSIONAL_SERIES_MIN_BOOKS * PROFESSIONAL_SERIES_UNIT_USD === 800,
  "Professional 4-book minimum total $800"
);

console.log(failed ? `\n${failed} test(s) failed` : "\nAll catalog tests passed");
process.exit(failed ? 1 : 0);
