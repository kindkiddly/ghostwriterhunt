import fs from "fs";
import path from "path";

const root = process.cwd();
const imgDir = path.join(root, "public", "images");
const files = fs.readdirSync(imgDir).filter((f) => !f.startsWith("."));

let corpus = "";
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (["node_modules", ".next", "public"].includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(js|jsx|ts|tsx|css|json|md|mjs|html)$/.test(e.name)) {
      try {
        corpus += fs.readFileSync(p, "utf8") + "\n";
      } catch {
        /* skip */
      }
    }
  }
}
walk(root);
// Also scan public except images binary - sitemap etc
for (const e of fs.readdirSync(path.join(root, "public"), { withFileTypes: true })) {
  if (e.isFile() && /\.(xml|txt|json)$/.test(e.name)) {
    corpus += fs.readFileSync(path.join(root, "public", e.name), "utf8") + "\n";
  }
}

const unused = [];
const used = [];
for (const f of files) {
  if (corpus.includes(f) || corpus.includes(`/images/${f}`)) used.push(f);
  else unused.push(f);
}

unused.sort(
  (a, b) =>
    fs.statSync(path.join(imgDir, b)).size - fs.statSync(path.join(imgDir, a)).size
);

console.log(JSON.stringify({ total: files.length, used: used.length, unused: unused.length }, null, 2));
console.log("\nUnused (all):");
for (const f of unused) {
  const sz = fs.statSync(path.join(imgDir, f)).size;
  console.log(`${Math.round(sz / 1024)}KB\t${f}`);
}
