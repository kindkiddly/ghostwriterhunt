import fs from "fs";
import path from "path";

const root = process.cwd();
const publicImages = path.join(root, "public", "images");

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

const codeFiles = [];
function walkCode(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === "node_modules" || ent.name === ".next") continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkCode(p);
    else if (/\.(js|jsx|css|mjs)$/.test(ent.name)) codeFiles.push(p);
  }
}
walkCode(root);

let code = "";
for (const f of codeFiles) code += fs.readFileSync(f, "utf8") + "\n";

const refPaths = new Set();
for (const m of code.matchAll(/\/images\/[a-zA-Z0-9._-]+\.(webp|png|jpg|jpeg|gif)/g)) {
  refPaths.add(m[0]);
}

const allFiles = walk(publicImages);
const byName = new Map();
for (const f of allFiles) {
  const rel = "/images/" + path.relative(publicImages, f).replace(/\\/g, "/");
  const stat = fs.statSync(f);
  byName.set(rel, stat.size);
}

const missing = [...refPaths].filter((p) => !byName.has(p)).sort();
const unreferenced = [...byName.keys()].filter((p) => !refPaths.has(p)).sort();

const heavyRefs = [...refPaths]
  .map((p) => ({ p, kb: Math.round((byName.get(p) || 0) / 1024) }))
  .filter((x) => x.kb > 200)
  .sort((a, b) => b.kb - a.kb);

console.log("Referenced paths:", refPaths.size);
console.log("Public image files:", byName.size);
console.log("\nMissing references:", missing.length);
console.log(missing.slice(0, 30).join("\n"));
console.log("\nHeavy referenced (>200KB):", heavyRefs.length);
for (const h of heavyRefs.slice(0, 25)) console.log(`  ${h.kb} KB  ${h.p}`);
console.log("\nUnreferenced public files:", unreferenced.length);
const heavyUnref = unreferenced
  .map((p) => ({ p, kb: Math.round(byName.get(p) / 1024) }))
  .filter((x) => x.kb > 100)
  .sort((a, b) => b.kb - a.kb);
console.log("Heavy unreferenced (>100KB):", heavyUnref.length);
for (const h of heavyUnref.slice(0, 20)) console.log(`  ${h.kb} KB  ${h.p}`);
