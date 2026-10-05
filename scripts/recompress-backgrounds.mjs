/**
 * Re-encode decorative background WebPs in public/images (same paths).
 * Does not touch process/hero portrait assets outside the background list.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMG_DIR = path.join(ROOT, "public", "images");
const OUT_DIR = path.join(IMG_DIR, ".recompress-out");

/** @type {{ file: string; maxWidth: number; quality: number }[]} */
const TARGETS = [
  { file: "background-cards.webp", maxWidth: 1920, quality: 68 },
  { file: "quil-homepage-heading.webp", maxWidth: 1920, quality: 70 },
  { file: "CTA-AUTHOR.webp", maxWidth: 1920, quality: 72 },
  { file: "CTA-MIX.webp", maxWidth: 1920, quality: 72 },
  { file: "CTA-LIBRARY.webp", maxWidth: 1920, quality: 72 },
  { file: "childrens-book-hero-bg.webp", maxWidth: 1920, quality: 72 },
  { file: "childrens-book-hero-bg-mobile.webp", maxWidth: 1536, quality: 72 },
  { file: "author-websitedesigning.webp", maxWidth: 1920, quality: 72 },
  { file: "ghost-writer-2.webp", maxWidth: 1920, quality: 72 },
  { file: "books-5.webp", maxWidth: 1920, quality: 72 },
];

for (const name of fs.readdirSync(IMG_DIR)) {
  if (name.startsWith("background-") && name.endsWith(".webp")) {
    const maxWidth = name.includes("-mobile") || name.includes("-M.webp") ? 1560 : 1920;
    const quality = name === "background-cards.webp" ? 68 : name.includes("-mobile") ? 70 : 71;
    if (!TARGETS.some((t) => t.file === name)) {
      TARGETS.push({ file: name, maxWidth, quality });
    }
  }
}

const results = [];
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const t of TARGETS) {
  const filePath = path.join(IMG_DIR, t.file);
  if (!fs.existsSync(filePath)) {
    console.warn("skip missing:", t.file);
    continue;
  }
  const before = fs.statSync(filePath).size;
  const outBuf = await sharp(filePath)
    .rotate()
    .resize({ width: t.maxWidth, withoutEnlargement: true })
    .webp({ quality: t.quality, effort: 6, smartSubsample: true })
    .toBuffer();
  const after = outBuf.length;
  if (after >= before * 0.98) {
    console.log(`${t.file}: kept original (${Math.round(before / 1024)} KB)`);
    continue;
  }
  const outPath = path.join(OUT_DIR, t.file);
  fs.writeFileSync(outPath, outBuf);
  const meta = await sharp(outPath).metadata();
  results.push({
    file: t.file,
    beforeKb: Math.round(before / 1024),
    afterKb: Math.round(after / 1024),
    width: meta.width,
    height: meta.height,
  });
  console.log(
    `${t.file}: ${Math.round(before / 1024)} KB → ${Math.round(after / 1024)} KB (${meta.width}x${meta.height})`
  );
}

const dimPath = path.join(ROOT, "data", "imageDimensions.js");
let dimSrc = fs.readFileSync(dimPath, "utf8");
for (const r of results) {
  const key = `"/images/${r.file}"`;
  const re = new RegExp(
    `${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}: \\{ width: \\d+, height: \\d+ \\}`,
    "g"
  );
  if (re.test(dimSrc)) {
    dimSrc = dimSrc.replace(
      re,
      `${key}: { width: ${r.width}, height: ${r.height} }`
    );
  }
}
fs.writeFileSync(dimPath, dimSrc);
console.log("\nUpdated imageDimensions for", results.length, "files");
console.log("Optimized files written to public/images/.recompress-out/");
console.log("Run: node scripts/apply-recompress-out.mjs");
