/**
 * Book Formatting process art: images/BookFormating-P1..P5 → public/images/book-formatting-process-{1-5}.webp
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_DIR = path.join(ROOT, "images");
const OUT_DIR = path.join(ROOT, "public", "images");

function srcPath(n) {
  const candidates = [
    `BookFormating-P${n}.jpg`,
    `BookFormating-P${n}.jpeg`,
    `BookFormatting-P${n}.jpg`,
  ];
  for (const name of candidates) {
    const abs = path.join(SRC_DIR, name);
    if (fs.existsSync(abs)) return abs;
  }
  throw new Error(`Missing BookFormating-P${n} in ${SRC_DIR}`);
}

async function writeWebp(input, outName) {
  const out = path.join(OUT_DIR, outName);
  const meta = await sharp(input).rotate().metadata();
  await sharp(input)
    .rotate()
    .webp({ quality: 92, effort: 6, smartSubsample: false })
    .toFile(out);
  const outMeta = await sharp(out).metadata();
  console.log(
    `${path.basename(input)} -> ${outName} (${meta.width}x${meta.height} src, ${outMeta.width}x${outMeta.height} out, ${Math.round(fs.statSync(out).size / 1024)}KB)`
  );
  return { width: outMeta.width ?? meta.width ?? 800, height: outMeta.height ?? meta.height ?? 273 };
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const dims = [];
  for (let n = 1; n <= 5; n += 1) {
    const d = await writeWebp(srcPath(n), `book-formatting-process-${n}.webp`);
    dims.push(d);
  }
  const w = dims[0]?.width ?? 800;
  const h = dims[0]?.height ?? 273;
  console.log(`\nUpdate imageDimensions: book-formatting-process-* → ${w}x${h}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
