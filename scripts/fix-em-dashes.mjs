/**
 * Replace em/en dashes inside JS string literals with natural punctuation.
 * Run: node scripts/fix-em-dashes.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");

const TARGET_FILES = [
  "data/services.js",
  "data/pricing.js",
  "components/legal/legalContent.js",
  "app/about/page.js",
  "app/about/layout.js",
  "app/checkout/success/page.js",
  "app/checkout/cancel/page.js",
  "app/checkout/mock/page.js",
  "lib/ai/geoWelcome.js",
  "lib/ai/systemPrompt.js",
  "lib/ai/chatAgent.js",
  "lib/stripe/payments.js",
  "app/template.js",
  "components/HeroTitleFrame.js",
  "components/Footer.js",
  "app/services/[slug]/page.js",
];

/** @param {string} text */
export function fixEmDashInText(text) {
  if (!/[—–]/.test(text)) return text;

  let s = text;

  s = s.replace(/ — GhostWriterHunt/g, " | GhostWriterHunt");
  s = s.replace(/<\/strong> — /g, "</strong>: ");
  s = s.replace(/(\d)[–—](\d)/g, "$1 to $2");

  const lowerContinuations = [
    "then",
    "and",
    "with",
    "through",
    "including",
    "from",
    "into",
    "so",
    "while",
    "because",
    "whether",
    "ensuring",
    "creating",
    "never",
    "not",
    "only",
    "your",
    "our",
    "we",
    "you",
    "they",
    "each",
    "every",
    "all",
    "also",
    "or",
    "as",
    "for",
    "to",
    "when",
    "where",
    "how",
    "revisions",
    "chapter",
    "chapters",
    "writing",
    "share",
    "tell",
    "a",
    "the",
    "an",
    "it",
    "there",
    "what",
    "complete",
    "just",
    "even",
    "already",
    "always",
    "before",
    "after",
    "during",
    "between",
    "across",
    "under",
    "over",
    "without",
    "within",
    "let's",
    "i'll",
    "no",
    "yes",
  ];

  s = s.replace(/Yes\s[—–]\s/gi, "Yes, ");
  s = s.replace(/No\s[—–]\s/gi, "No, ");

  for (const word of lowerContinuations) {
    const escaped = word.replace(/'/g, "['']");
    const re = new RegExp(`\\s[—–]\\s(${escaped})\\b`, "gi");
    s = s.replace(re, ", $1");
  }

  s = s.replace(/\s[—–]\s([A-Z])/g, ". $1");
  s = s.replace(/\s[—–]\s/g, ", ");
  s = s.replace(/[—–]\s/g, ": ");
  s = s.replace(/\s[—–]/g, ",");

  s = s.replace(/,\s*,+/g, ", ");
  s = s.replace(/,\s*\./g, ".");
  s = s.replace(/\.\s+,/g, ". ");

  return s;
}

/** @param {string} line */
function replaceInStringLiterals(line) {
  if (!/[—–]/.test(line)) return line;

  let result = "";
  let i = 0;

  while (i < line.length) {
    const ch = line[i];
    if (ch === '"' || ch === "'" || ch === "`") {
      const quote = ch;
      let j = i + 1;
      let inner = "";
      while (j < line.length) {
        const c = line[j];
        if (c === "\\" && j + 1 < line.length) {
          inner += c + line[j + 1];
          j += 2;
          continue;
        }
        if (c === quote) break;
        inner += c;
        j++;
      }
      if (j >= line.length) {
        result += line.slice(i);
        break;
      }
      result += quote + fixEmDashInText(inner) + quote;
      i = j + 1;
      continue;
    }
    result += ch;
    i++;
  }

  return result;
}

/** @param {string} relPath */
function processFile(relPath) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) {
    console.warn("skip (missing):", relPath);
    return 0;
  }

  const before = fs.readFileSync(abs, "utf8");
  const lines = before.split("\n");
  let changed = false;

  const afterLines = lines.map((line) => {
    const trimmed = line.trimStart();
    if (
      trimmed.startsWith("//") ||
      trimmed.startsWith("*") ||
      trimmed.startsWith("/*") ||
      trimmed.startsWith("{/*")
    ) {
      return line;
    }
    const next = replaceInStringLiterals(line);
    if (next !== line) changed = true;
    return next;
  });

  const after = afterLines.join("\n");
  if (changed) fs.writeFileSync(abs, after, "utf8");

  const inStringsRemaining = (after.match(/['"`][^'"`]*[—–][^'"`]*['"`]/g) || [])
    .length;
  console.log(`${relPath}: ${changed ? "updated" : "unchanged"} (${inStringsRemaining} strings may still contain dashes)`);
  return inStringsRemaining;
}

let total = 0;
for (const f of TARGET_FILES) {
  total += processFile(f);
}

console.log(`\nProcessed ${TARGET_FILES.length} files.`);
