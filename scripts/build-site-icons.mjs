/**
 * Build favicon and site icon assets from images/GWH-Logo-squre.png
 * Outputs to public/images and public/favicon.ico (does not modify source PNG).
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";
import toIco from "to-ico";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "images", "GWH-Logo-squre.png");
const OUT = path.join(ROOT, "public", "images");
const PUBLIC = path.join(ROOT, "public");

/** PNG sizes: legacy filenames kept for stable metadata URLs where already referenced. */
const PNG_TARGETS = [
  { size: 16, name: "ghostwriterhunt-icon-16.png" },
  { size: 32, name: "ghostwriterhunt-icon-32.png" },
  { size: 48, name: "ghostwriterhunt-icon-48.png" },
  { size: 180, name: "gwh-apple-180.png" },
  { size: 192, name: "gwh-icon-192.png" },
];

async function writeSquarePng(input, size, outPath) {
  await sharp(input)
    .resize(size, size, { fit: "fill" })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outPath);
}

async function main() {
  if (!fs.existsSync(SRC)) {
    throw new Error(`Source logo not found: ${SRC}`);
  }

  const srcMeta = await sharp(SRC).metadata();
  if (srcMeta.width !== srcMeta.height) {
    throw new Error(`Expected square source; got ${srcMeta.width}x${srcMeta.height}`);
  }

  await sharp(SRC)
    .webp({ quality: 92, effort: 6, smartSubsample: true })
    .toFile(path.join(OUT, "ghostwriterhunt-icon.webp"));

  const icoInputs = [];
  for (const { size, name } of PNG_TARGETS) {
    const outPath = path.join(OUT, name);
    await writeSquarePng(SRC, size, outPath);
    if (size <= 48) icoInputs.push(outPath);
  }

  const icoBuffers = await Promise.all(
    icoInputs.map((p) => fs.promises.readFile(p))
  );
  fs.writeFileSync(path.join(PUBLIC, "favicon.ico"), await toIco(icoBuffers));

  const webpMeta = await sharp(path.join(OUT, "ghostwriterhunt-icon.webp")).metadata();
  const icoStat = fs.statSync(path.join(PUBLIC, "favicon.ico"));

  console.log("Source:", SRC, `${srcMeta.width}x${srcMeta.height}`);
  console.log("WebP:", path.join(OUT, "ghostwriterhunt-icon.webp"), `${webpMeta.width}x${webpMeta.height}`);
  console.log("favicon.ico:", icoStat.size, "bytes");
  for (const { size, name } of PNG_TARGETS) {
    const m = await sharp(path.join(OUT, name)).metadata();
    console.log(name, `${m.width}x${m.height}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
