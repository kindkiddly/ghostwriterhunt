/**
 * eBook Writing process art from images/eBookwriting-P1..P4 → public/images/ebook-writing-process-{1-4}.webp (940×560).
 * Step 5 on the page uses public/images/CTA-07.webp as-is.
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_DIR = path.join(ROOT, "images");
const OUT_DIR = path.join(ROOT, "public", "images");

const DESKTOP_W = 940;
const DESKTOP_H = 560;

function ebookSrcPath(n) {
  const candidates = [
    `eBookwriting-P${n}.jpg`,
    `eBookwriting-P${n}.jpeg`,
    `eBookwriting-P${n}.webp`,
    `ebookwriting-P${n}.jpg`,
  ];
  for (const name of candidates) {
    const abs = path.join(SRC_DIR, name);
    if (fs.existsSync(abs)) return abs;
  }
  throw new Error(`Missing eBookwriting-P${n} in ${SRC_DIR}`);
}

function cta07Src() {
  const candidates = [
    path.join(OUT_DIR, "CTA-07.webp"),
    path.join(SRC_DIR, "CTA-07.jpg"),
    path.join(SRC_DIR, "CTA-07.webp"),
  ];
  for (const abs of candidates) {
    if (fs.existsSync(abs)) return abs;
  }
  throw new Error("Missing CTA-07 in public/images or images/");
}

async function writeProcessWebp(input, outName) {
  const desktopOut = path.join(OUT_DIR, outName);
  const meta = await sharp(input).metadata();
  const pipeline = sharp(input).rotate();
  // Avoid upscaling small sources (e.g. P1 at 800×400) — prevents blocky process art.
  if ((meta.width ?? 0) < DESKTOP_W || (meta.height ?? 0) < DESKTOP_H) {
    pipeline.resize(DESKTOP_W, DESKTOP_H, {
      fit: "inside",
      withoutEnlargement: true,
    });
  } else {
    pipeline.resize(DESKTOP_W, DESKTOP_H, {
      fit: "cover",
      position: "centre",
    });
  }
  await pipeline.webp({ quality: 93, effort: 6, smartSubsample: false }).toFile(desktopOut);
  const outMeta = await sharp(desktopOut).metadata();
  console.log(`${path.basename(input)} -> ${outName} (${outMeta.width}x${outMeta.height})`);
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  for (let n = 1; n <= 4; n += 1) {
    await writeProcessWebp(
      ebookSrcPath(n),
      `ebook-writing-process-${n}.webp`
    );
  }

  const ctaOut = path.join(OUT_DIR, "CTA-07.webp");
  if (!fs.existsSync(ctaOut)) {
    await sharp(cta07Src())
      .webp({ quality: 88, effort: 4 })
      .toFile(ctaOut);
    console.log(`Wrote ${path.basename(ctaOut)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
