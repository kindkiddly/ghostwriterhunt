import fs from "fs";
import path from "path";

const txt = fs.readFileSync("data/services.js", "utf8");
const paths = [...new Set([...txt.matchAll(/\/images\/[^"']+/g)].map((m) => m[0]))];
const miss = paths.filter((p) => !fs.existsSync(path.join("public", p.replace(/^\//, ""))));
console.log("service image paths:", paths.length);
console.log("missing:", miss.length);
for (const p of miss) console.log(" ", p);
