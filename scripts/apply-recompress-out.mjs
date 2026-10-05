import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "images", ".recompress-out");
const IMG_DIR = path.join(ROOT, "public", "images");

if (!fs.existsSync(OUT_DIR)) {
  console.log("Nothing to apply.");
  process.exit(0);
}

for (const name of fs.readdirSync(OUT_DIR)) {
  if (!name.endsWith(".webp")) continue;
  const src = path.join(OUT_DIR, name);
  const dest = path.join(IMG_DIR, name);
  fs.copyFileSync(src, dest);
  console.log("applied", name);
}
fs.rmSync(OUT_DIR, { recursive: true, force: true });
console.log("Done.");
