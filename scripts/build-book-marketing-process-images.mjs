/**
 * Book Marketing process steps 1–3: images/BookMarketing-P1..P3
 * → public/images/book-marketing-process-{1-3}.webp (940×560 cover for desktop process frames)
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
    `BookMarketing-P${n}.jpg`,
    `BookMarketing-P${n}.jpeg`,
  ];
  for (const name of candidates) {
    const abs = path.join(SRC_DIR, name);
    if (fs.existsSync(abs)) return abs;
  }
  throw new Error(`Missing BookMarketing-P${n} in ${SRC_DIR}`);
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  for (let n = 1; n <= 3; n += 1) {
    const input = srcPath(n);
    const out = path.join(OUT_DIR, `book-marketing-process-${n}.webp`);
    const meta = await sharp(input).rotate().metadata();

    await sharp(input)
      .rotate()
      .resize(DESKTOP_W, DESKTOP_H, { fit: "cover", position: "centre" })
      .webp({ quality: 95, effort: 6, smartSubsample: true })
      .toFile(out);

    console.log(
      `${path.basename(input)} -> ${path.basename(out)} (${meta.width}x${meta.height} src → ${DESKTOP_W}x${DESKTOP_H})`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
