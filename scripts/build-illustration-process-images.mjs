/**
 * Illustration & Graphics process art from images/Illustration-P1..P5
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
    `Illustration-P${n}.jpg`,
    `illustration-P${n}.jpg`,
    `Illustration-P${n}.jpeg`,
    `illustration-P${n}.jpeg`,
  ];
  for (const name of candidates) {
    const abs = path.join(SRC_DIR, name);
    if (fs.existsSync(abs)) return abs;
  }
  throw new Error(`Missing Illustration-P${n} in ${SRC_DIR}`);
}

async function main() {
  const bands = [];

  for (let n = 1; n <= 5; n += 1) {
    const input = srcPath(n);
    const desktopOut = path.join(
      OUT_DIR,
      `illustration-graphics-process-${n}.webp`
    );

    await sharp(input)
      .resize(DESKTOP_W, DESKTOP_H, { fit: "cover", position: "centre" })
      .webp({ quality: 88, effort: 4 })
      .toFile(desktopOut);

    const band = await sharp(input)
      .resize(MOBILE_W, MOBILE_BAND_H, { fit: "cover", position: "centre" })
      .webp({ quality: 88, effort: 4 })
      .toBuffer();

    bands.push(band);
    console.log(`P${n} -> ${path.basename(desktopOut)}`);
  }

  const mobileOut = path.join(OUT_DIR, "illustration-package-mobile.webp");
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
    .webp({ quality: 88, effort: 4 })
    .toFile(mobileOut);

  console.log(`Mobile -> ${path.basename(mobileOut)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
