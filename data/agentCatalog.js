/**
 * GhostWriterHunt — AI agent pricing & services catalog (server + prompt).
 * Website card copy is sourced from data/pricing.js only.
 */

import { SHARED_PRICING } from "./pricing.js";

export const MAX_AI_PAYMENT_USD = 5000;
export const MAX_DISCOUNT_PERCENT = 15;
export const PROFESSIONAL_SERIES_MIN_BOOKS = 4;
export const PROFESSIONAL_SERIES_UNIT_USD = 200;

/** @typedef {{ id: string, name: string, scope: string, standalone: number|null, addOn: number|null, floor: number, notes?: string }} CatalogService */
/** @typedef {{ id: string, name: string, price: number, floor: number, includedServiceIds: string[], notes?: string }} CatalogPlan */

export const CATALOG_SERVICES = /** @type {CatalogService[]} */ ([
  { id: "ghostwriting", name: "Full book ghostwriting", scope: "up to 200 pages", standalone: 150, addOn: null, floor: 120 },
  { id: "ebook_writing", name: "eBook writing", scope: "up to 60 pages", standalone: 100, addOn: null, floor: 80 },
  { id: "childrens_writing", name: "Children's book writing", scope: "up to 32 pages", standalone: 100, addOn: null, floor: 80 },
  { id: "article", name: "Article writing", scope: "per article", standalone: 80, addOn: 50, floor: 40 },
  { id: "blog", name: "Blog writing", scope: "per post", standalone: 70, addOn: 50, floor: 40 },
  { id: "website_content", name: "Website content", scope: "5 pages", standalone: 300, addOn: 150, floor: 130 },
  { id: "editing", name: "Manuscript editing", scope: "up to 200 pages", standalone: 100, addOn: 40, floor: 30 },
  { id: "proofreading", name: "Proofreading", scope: "up to 200 pages", standalone: 100, addOn: 30, floor: 25 },
  { id: "formatting", name: "Book formatting", scope: "eBook + print", standalone: 100, addOn: 30, floor: 25 },
  { id: "cover", name: "Cover design", scope: "front, back, spine", standalone: 30, addOn: 20, floor: 20 },
  { id: "interior_layout", name: "Interior layout", scope: "full book", standalone: 80, addOn: 30, floor: 25 },
  {
    id: "illustrations",
    name: "Illustrations",
    scope: "1=$12, 10=$100, 20=$180, 40=$300 bundles",
    standalone: null,
    addOn: null,
    floor: 12,
    notes: "Bundle pricing; 10% off bundle when added to any writing plan",
  },
  { id: "trailer", name: "Video book trailer", scope: "~60 seconds", standalone: 150, addOn: 70, floor: 60 },
  { id: "publishing", name: "eBook publishing", scope: "up to 5 platforms", standalone: 150, addOn: 50, floor: 40 },
  { id: "audiobook", name: "Audiobook", scope: "full book", standalone: 150, addOn: 80, floor: 70 },
  { id: "branding", name: "Author branding", scope: "bio, logo, social", standalone: 100, addOn: 50, floor: 40 },
  { id: "marketing", name: "Book marketing campaign", scope: "one campaign", standalone: 400, addOn: 250, floor: 220 },
  { id: "author_website", name: "Author website", scope: "up to 5 pages", standalone: 200, addOn: 100, floor: 90 },
]);

const SERVICE_BY_ID = Object.fromEntries(CATALOG_SERVICES.map((s) => [s.id, s]));

function planFloor(price, includedServiceIds) {
  const serviceFloorSum = includedServiceIds.reduce(
    (sum, id) => sum + (SERVICE_BY_ID[id]?.floor ?? 0),
    0
  );
  const maxDiscountFloor = Math.ceil(price * 0.85);
  return Math.min(price, Math.max(maxDiscountFloor, serviceFloorSum));
}

function definePlan(id, name, price, includedServiceIds, notes) {
  return {
    id,
    name,
    price,
    floor: planFloor(price, includedServiceIds),
    includedServiceIds,
    notes,
  };
}

/** Agent-only ladders + website-linked plans (not all are separate checkout SKUs). */
export const CATALOG_PLANS = [
  definePlan("write_only", "Write Only", 150, ["ghostwriting", "proofreading"]),
  definePlan("author_launch", "Author Launch", 549, ["ghostwriting", "proofreading", "formatting", "cover", "publishing", "author_website", "marketing"]),
  definePlan("author_launch_plus", "Author Launch Plus", 599, ["ghostwriting", "proofreading", "formatting", "cover", "publishing", "author_website", "marketing", "branding"]),
  definePlan("series_4", "Professional series (4 books)", 800, ["ghostwriting", "proofreading", "formatting", "cover", "publishing", "author_website"], "Minimum 4 books at $200/book"),
  definePlan("series_6", "Professional series (6 books)", 1140, ["ghostwriting", "proofreading", "formatting", "cover", "publishing", "author_website"], "$190/book"),
  definePlan("series_10", "Professional series (10 books)", 1800, ["ghostwriting", "proofreading", "formatting", "cover", "publishing", "author_website"], "$180/book"),
  definePlan("childrens_story_basic", "Story Basic", 149, ["childrens_writing", "cover", "formatting"]),
  definePlan("childrens_illustrated", "Illustrated Story", 229, ["childrens_writing", "cover", "formatting", "illustrations"]),
  definePlan("childrens_published", "Published Picture Book", 279, ["childrens_writing", "cover", "formatting", "illustrations", "publishing"]),
  definePlan("childrens_complete", "Complete Picture Book", 399, ["childrens_writing", "cover", "formatting", "illustrations", "publishing", "trailer"]),
  definePlan("ebook_basic", "eBook Basic", 120, ["ebook_writing", "proofreading", "formatting"]),
  definePlan("ebook_ready", "eBook Ready", 150, ["ebook_writing", "proofreading", "formatting", "cover", "publishing"]),
  definePlan("polish", "Polish", 79, ["proofreading", "formatting", "cover"]),
  definePlan("starter_plus", "Starter Plus", 229, ["editing", "formatting", "cover", "publishing", "author_website", "branding"]),
  definePlan("blog_4", "Blog bundle (4 posts)", 180, ["blog"]),
  definePlan("blog_8", "Blog bundle (8 posts)", 340, ["blog"]),
  definePlan("blog_12", "Blog bundle (12 posts)", 480, ["blog"]),
  definePlan("website_content_bundle", "Website content + author website", 400, ["website_content", "author_website"]),
  definePlan("brand_only", "Brand", 100, ["branding"]),
  definePlan("brand_website", "Brand + Website", 250, ["branding", "author_website"]),
  definePlan("full_presence", "Full Presence", 450, ["branding", "author_website", "website_content"]),
  definePlan("audiobook_trailer", "Audiobook + Trailer", 249, ["audiobook", "trailer"]),
  definePlan("marketing_30", "Marketing 30-day starter", 300, ["marketing"]),
  definePlan("marketing_full", "Marketing full campaign", 400, ["marketing"]),
  definePlan("launch_bundle", "Launch bundle", 499, ["marketing", "trailer", "branding"]),
  definePlan("illus_1", "1 illustration", 12, ["illustrations"]),
  definePlan("illus_10", "10 illustrations", 100, ["illustrations"]),
  definePlan("illus_20", "20 illustrations", 180, ["illustrations"]),
  definePlan("illus_40", "40 illustrations", 300, ["illustrations"]),
];

const PLAN_BY_ID = Object.fromEntries(CATALOG_PLANS.map((p) => [p.id, p]));

const WEBSITE_CARD_KEY = {
  Starter: "website_starter",
  Professional: "website_professional",
  "Complete Publishing Package": "website_complete",
};

/** Website cards from SHARED_PRICING — word sync with site. */
export function getWebsiteCardsFromPricing() {
  return SHARED_PRICING.map((tier) => ({
    id: WEBSITE_CARD_KEY[tier.name] || tier.name,
    name: tier.name,
    label: tier.label,
    priceUsd: tier.price.fullBook,
    description: tier.description,
    bestFor: tier.bestFor,
    features: [...tier.features],
    featured: tier.featured,
    perBook: tier.name === "Professional",
    minimumBooks: tier.name === "Professional" ? PROFESSIONAL_SERIES_MIN_BOOKS : null,
  }));
}

export function getServiceById(id) {
  return SERVICE_BY_ID[id] || null;
}

export function getPlanById(id) {
  return PLAN_BY_ID[id] || null;
}

/**
 * Parse catalog reference: plan id, or service ids joined with + or ,
 */
export function parseCatalogReference(ref) {
  const raw = String(ref || "").trim();
  if (!raw) return { type: "unknown", ids: [] };
  if (PLAN_BY_ID[raw]) return { type: "plan", ids: [raw] };
  if (raw.startsWith("website_")) return { type: "website", ids: [raw] };
  const serviceIds = raw.split(/[+,]/).map((s) => s.trim()).filter(Boolean);
  if (serviceIds.length && serviceIds.every((id) => SERVICE_BY_ID[id])) {
    return { type: "services", ids: serviceIds };
  }
  return { type: "unknown", ids: [raw] };
}

function websiteCardFloor(cardId) {
  const cards = getWebsiteCardsFromPricing();
  const card = cards.find((c) => c.id === cardId);
  if (!card) return null;
  if (card.id === "website_professional") {
    return PROFESSIONAL_SERIES_MIN_BOOKS * PROFESSIONAL_SERIES_UNIT_USD;
  }
  return Math.ceil(card.priceUsd * 0.85);
}

/**
 * Minimum allowed USD for a payment link given catalog reference(s).
 */
export function resolvePaymentLinkFloorUsd(catalogRef, agreedAmountUsd) {
  const parsed = parseCatalogReference(catalogRef);
  if (parsed.type === "plan") {
    const plan = getPlanById(parsed.ids[0]);
    return plan?.floor ?? null;
  }
  if (parsed.type === "website") {
    return websiteCardFloor(parsed.ids[0]);
  }
  if (parsed.type === "services") {
    return parsed.ids.reduce((sum, id) => sum + (SERVICE_BY_ID[id]?.floor ?? 0), 0);
  }
  if (Number.isFinite(agreedAmountUsd)) {
    return Math.ceil(agreedAmountUsd * 0.85);
  }
  return null;
}

export function validateAiPaymentAmount(amountUsd, catalogRef) {
  const n = Math.round(Number(amountUsd));
  if (!Number.isFinite(n) || n < 1) {
    return { ok: false, reason: "invalid_amount" };
  }
  if (n > MAX_AI_PAYMENT_USD) {
    return { ok: false, reason: "above_max_handover" };
  }
  const parsed = parseCatalogReference(catalogRef);
  if (parsed.type === "unknown" && catalogRef) {
    return { ok: false, reason: "unknown_catalog_ref" };
  }
  if (parsed.ids.includes("website_professional") || /^series_\d+$/.test(String(catalogRef))) {
    const minSeries = PROFESSIONAL_SERIES_MIN_BOOKS * PROFESSIONAL_SERIES_UNIT_USD;
    if (n < minSeries) {
      return { ok: false, reason: "professional_min_books" };
    }
  }
  const plan = parsed.type === "plan" ? getPlanById(parsed.ids[0]) : null;
  if (plan?.id?.startsWith("series_")) {
    const minSeries = PROFESSIONAL_SERIES_MIN_BOOKS * PROFESSIONAL_SERIES_UNIT_USD;
    if (n < minSeries) {
      return { ok: false, reason: "professional_min_books" };
    }
  }
  const floor = resolvePaymentLinkFloorUsd(catalogRef, n);
  if (floor != null && n < floor) {
    return { ok: false, reason: "below_floor", floor };
  }
  return { ok: true, amountUsd: n, floor };
}

/** Plain-text catalog block for the system prompt. */
export function formatCatalogForPrompt() {
  const cards = getWebsiteCardsFromPricing();
  const cardLines = cards.map((c) => {
    const priceLine = c.perBook
      ? `$${c.priceUsd} per book, MINIMUM ${c.minimumBooks} books ($${c.priceUsd * c.minimumBooks} for ${c.minimumBooks}). Never offer Professional for fewer than ${c.minimumBooks} books.`
      : `$${c.priceUsd} one book / full service as listed on the website.`;
    const features = c.features.map((f) => `    - ${f}`).join("\n");
    return `- ${c.name} (${c.label}): ${priceLine}
  Best for: ${c.bestFor}
  Description: ${c.description}
  Features:
${features}`;
  });

  const serviceLines = CATALOG_SERVICES.map(
    (s) =>
      `- ${s.id}: ${s.name} (${s.scope}) | standalone $${s.standalone ?? "bundle"} | add-on $${s.addOn ?? "n/a"} | floor $${s.floor}${s.notes ? ` | ${s.notes}` : ""}`
  );

  const planLines = CATALOG_PLANS.map(
    (p) =>
      `- ${p.id}: ${p.name} - $${p.price} (floor $${p.floor}) includes: ${p.includedServiceIds.join(", ")}${p.notes ? ` | ${p.notes}` : ""}`
  );

  return `WEBSITE PRICING CARDS (authoritative public offers: never contradict these prices or meanings)
- Starter $150 per book: customer ALREADY HAS a finished manuscript. Includes editing, formatting, cover design, publishing on 5 major global platforms, Author Central setup.
- Professional $200 per book, MINIMUM 4 books ($800 total): SERIES only. Team writes each book from idea/notes. Never offer Professional for a single book.
- Complete Publishing Package $299 per book: ONE book from idea, full premium package (writing, editing, cover, formatting, author website, publishing, all formats).
- One book wanting the full premium package → quote Complete at $299 (website_complete). Never quote an agent catalog plan that costs MORE than the matching website card for the same scope.
- If they ask about a price shown on the website, confirm that exact price.

Card details:
${cardLines.join("\n\n")}

STANDALONE SERVICES (standalone and add-on prices below: use to build custom plans; internal floors for server only; never quote per-word; over scope -> handover)
${serviceLines.join("\n")}

AGENT PLAN LADDERS (offer ONE at a time; max 15% discount, never below floor)
${planLines.join("\n")}

LADDER GROUPS (pick one ladder based on need)
- Book writing: write_only -> website_complete ($299) -> author_launch ($549) -> author_launch_plus ($599)
- Series: series_4 ($800 min) -> series_6 ($1140) -> series_10 ($1800) at $200/book minimum 4 books
- Children's: childrens_story_basic -> childrens_illustrated -> childrens_published -> childrens_complete
- eBook: ebook_basic -> ebook_ready
- Manuscript ready: polish -> website_starter -> starter_plus
- Illustrations: illus_1 / illus_10 / illus_20 / illus_40; 10% off illustration bundle as add-on to writing plans
- Blogs: blog_4 / blog_8 / blog_12; website_content $300 or website_content_bundle $400 with author website
- Author presence: brand_only -> brand_website -> full_presence
- Audio/video/marketing: audiobook $150, trailer $150, audiobook_trailer $249; marketing_30 / marketing_full / launch_bundle $499`;
}
