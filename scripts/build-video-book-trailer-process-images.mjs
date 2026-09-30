/**
 * Video Book Trailer process art: images/VideoBook-P1..P5
 * → public/images/video-book-trailer-process-{1-5}.webp (desktop + mobile use same files)
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_DIR = path.join(ROOT, "images");
const OUT_DIR = path.join(ROOT, "public", "images");

const DESKTOP_W = 940;
const DESKTOP_H = 560;

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
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  for (let n = 1; n <= 5; n += 1) {
    const input = srcPath(n);
    const desktopOut = path.join(OUT_DIR, `video-book-trailer-process-${n}.webp`);

    await sharp(input)
      .rotate()
      .resize(DESKTOP_W, DESKTOP_H, { fit: "cover", position: "centre" })
      .webp({ quality: 92, effort: 6, smartSubsample: false })
      .toFile(desktopOut);

    console.log(`P${n} -> ${path.basename(desktopOut)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
