/**
 * Video Book Trailer process art: images/VideoBook-P1..P5
 * → public/images/video-book-trailer-process-{1-5}.webp (desktop)
 * → public/images/video-book-trailer-package-mobile.webp (mobile stack)
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
  const candidates = [
    `VideoBook-P${n}.jpg`,
    `VideoBook-P${n}.jpeg`,
    `videoBook-P${n}.jpg`,
  ];
  for (const name of candidates) {
    const abs = path.join(SRC_DIR, name);
    if (fs.existsSync(abs)) return abs;
  }
  throw new Error(`Missing VideoBook-P${n} in ${SRC_DIR}`);
}

async function main() {
  const bands = [];

  for (let n = 1; n <= 5; n += 1) {
    const input = srcPath(n);
    const desktopOut = path.join(OUT_DIR, `video-book-trailer-process-${n}.webp`);

    await sharp(input)
      .rotate()
      .resize(DESKTOP_W, DESKTOP_H, { fit: "cover", position: "centre" })
      .webp({ quality: 92, effort: 6, smartSubsample: false })
      .toFile(desktopOut);

    const band = await sharp(input)
      .rotate()
      .resize(MOBILE_W, MOBILE_BAND_H, { fit: "cover", position: "centre" })
      .webp({ quality: 92, effort: 6, smartSubsample: false })
      .toBuffer();

    bands.push(band);
    console.log(`P${n} -> ${path.basename(desktopOut)} + mobile band`);
  }

  const mobileOut = path.join(OUT_DIR, "video-book-trailer-package-mobile.webp");
  const composite = bands.map((input, i) => ({
    input,
    top: Math.round(i * MOBILE_BAND_H),
    left: 0,
  }));

  await sharp({
    create: {
      width: MOBILE_W,
      height: MOBILE_H,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite(composite)
    .webp({ quality: 92, effort: 6, smartSubsample: false })
    .toFile(mobileOut);

  console.log(`Mobile -> ${path.basename(mobileOut)} (${MOBILE_W}x${MOBILE_H})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
