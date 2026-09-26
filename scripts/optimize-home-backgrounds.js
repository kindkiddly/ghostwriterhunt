/**
 * Re-encode home section backgrounds from images/ sources into public/images/*.webp
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const ROOT = path.join(__dirname, "..");

/** @type {{ src: string; out: string; width: number; quality: number }[]} */
const TARGETS = [
  {
    src: "images/background-cards.jpg",
    out: "public/images/background-cards.webp",
    width: 2280,
    quality: 76,
  },
];

async function run() {
  for (const t of TARGETS) {
    const srcPath = path.join(ROOT, t.src);
    const outPath = path.join(ROOT, t.out);
    if (!fs.existsSync(srcPath)) {
      console.warn("skip (missing):", t.src);
      continue;
    }
    await sharp(srcPath)
      .resize(t.width, null, { withoutEnlargement: true })
      .webp({ quality: t.quality, effort: 6 })
      .toFile(outPath);
    const meta = await sharp(outPath).metadata();
    const size = fs.statSync(outPath).size;
    console.log(`${t.out}: ${meta.width}x${meta.height}, ${size} bytes`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
