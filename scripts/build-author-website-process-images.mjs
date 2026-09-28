/**
 * Build Author Website process images from images/website-P1..P5
 * - Desktop: public/images/author-website-process-{1-5}.webp (940×560)
 * - Mobile stack: public/images/author-website-package-mobile.webp (1081×1920)
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_DIR = path.join(ROOT, "images");
const OUT_DIR = path.join(ROOT, "public", "images");

const DESKTOP_W = 940;
const DESKTOP_H = 560;
const MOBILE_W = 1081;
const MOBILE_H = 1920;
const MOBILE_BAND_H = MOBILE_H / 5;

function srcPath(n) {
  const webp = path.join(SRC_DIR, `website-P${n}.webp`);
  const jpg = path.join(SRC_DIR, `website-P${n}.jpg`);
  if (fs.existsSync(webp)) return webp;
  if (fs.existsSync(jpg)) return jpg;
  throw new Error(`Missing source for P${n}`);
}

async function main() {
  const bands = [];

  for (let n = 1; n <= 5; n += 1) {
    const input = srcPath(n);
    const desktopOut = path.join(OUT_DIR, `author-website-process-${n}.webp`);

    await sharp(input)
      .resize(DESKTOP_W, DESKTOP_H, { fit: "cover", position: "centre" })
      .webp({ quality: 86, effort: 4 })
      .toFile(desktopOut);

    const band = await sharp(input)
      .resize(MOBILE_W, MOBILE_BAND_H, { fit: "cover", position: "centre" })
      .webp({ quality: 86, effort: 4 })
      .toBuffer();

    bands.push(band);
    console.log(`P${n}: desktop -> ${path.basename(desktopOut)}`);
  }

  const bandMetas = await Promise.all(bands.map((b) => sharp(b).metadata()));
  const totalBandH = bandMetas.reduce((sum, m) => sum + (m.height || 0), 0);
  const composite = bands.map((input, i) => ({
    input,
    top: Math.round(i * MOBILE_BAND_H),
    left: 0,
  }));

  const mobileOut = path.join(OUT_DIR, "author-website-package-mobile.webp");
  await sharp({
    create: {
      width: MOBILE_W,
      height: MOBILE_H,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite(composite)
    .webp({ quality: 86, effort: 4 })
    .toFile(mobileOut);

  console.log(
    `Mobile package -> ${path.basename(mobileOut)} (${MOBILE_W}x${MOBILE_H}, bands ~${Math.round(MOBILE_BAND_H)}px, stacked ${totalBandH}px)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
