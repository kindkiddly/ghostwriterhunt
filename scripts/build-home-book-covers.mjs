/**
 * Home hero ticker + book gallery covers from images/Book-G1..G13.jpg
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_DIR = path.join(ROOT, "images");
const OUT_DIR = path.join(ROOT, "public", "images");

const GALLERY_W = 400;
const GALLERY_H = 600;
const CAROUSEL_W = 360;
const CAROUSEL_H = 440;

async function main() {
  for (let n = 1; n <= 13; n += 1) {
    const src = path.join(SRC_DIR, `Book-G${n}.jpg`);
    if (!fs.existsSync(src)) throw new Error(`Missing ${src}`);

    const galleryOut = path.join(OUT_DIR, `book-g-${n}.webp`);
    const carouselOut = path.join(OUT_DIR, `carousel-book-g-${n}.webp`);

    await sharp(src)
      .resize(GALLERY_W, GALLERY_H, { fit: "cover", position: "centre" })
      .webp({ quality: 86, effort: 4 })
      .toFile(galleryOut);

    await sharp(src)
      .resize(CAROUSEL_W, CAROUSEL_H, { fit: "cover", position: "centre" })
      .webp({ quality: 88, effort: 4 })
      .toFile(carouselOut);

    const gStat = fs.statSync(galleryOut);
    const cStat = fs.statSync(carouselOut);
    console.log(
      `G${n}: book-g-${n}.webp (${gStat.size}b), carousel-book-g-${n}.webp (${cStat.size}b)`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
