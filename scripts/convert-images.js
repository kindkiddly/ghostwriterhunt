/**
 * Convert selected local gfx assets to WebP in public/images
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const SRC = path.join(__dirname, "..", "GhostWriterHunt-gfx-local");
const DEST = path.join(__dirname, "..", "public", "images");

const MAP = [
  ["photo-1488190211105-8b0e65b80b4e.jfif", "writing-desk.webp"],
  ["photo-1516321318423-f06f85e504b3.jfif", "collaboration-laptop.webp"],
  ["photo-1507842217343-583bb7270b66.jfif", "library-books.webp"],
  ["photo-1517842645767-c639042777db.jfif", "fountain-pen-notes.webp"],
  ["photo-1503676260728-1c00da094a0b.jfif", "books-education.webp"],
  ["thought-catalog-Zr7MxECDTQ8-unsplash.jpg", "books-stack-pink.webp"],
  ["kelly-sikkema-FzvVv0G3hgQ-unsplash.jpg", "author-reading.webp"],
  ["aaron-burden-siB9Th_Ma34-unsplash.jpg", "book-pen-laptop.webp"],
  ["true-agency-Q8otix2SVko-unsplash.jpg", "flipping-book.webp"],
  ["thought-catalog-tmvB88zXbxY-unsplash.jpg", "desk-quote.webp"],
  ["toa-heftiba-ip9R11FMbV8-unsplash.jpg", "books-fairy-lights.webp"],
  ["thought-catalog-qkCTQFXidV8-unsplash.jpg", "books-flatlay.webp"],
  ["kelly-sikkema-UFHmsy3Deek-unsplash.jpg", "notebook-coffee.webp"],
  ["kelly-sikkema-wLyb7s5MlLQ-unsplash.jpg", "writing-hands.webp"],
  ["library-1.png", "library-wide.webp"],
  ["michelle-cassar-72w6SOF3sLM-unsplash.jpg", "office-meeting.webp"],
  ["eugenio-mazzone-6ywyo2qtaZ8-unsplash.jpg", "workspace-desk.webp"],
  ["annie-spratt-hDcAjjkM-PU-unsplash.jpg", "team-collaboration.webp"],
  ["dillon-wanner-cu-Pl__yd-w-unsplash.jpg", "modern-office.webp"],
  ["jodie-cook-qK2FNwlDdGU-unsplash.jpg", "laptop-workspace.webp"],
  ["maxim-ilyahov-n4Ewq97gJWo-unsplash.jpg", "open-book-light.webp"],
  ["shiromani-kant-mo3FOTG62ao-unsplash.jpg", "books-table.webp"],
  ["waldemar-brandt-UNEaeZd0zCg-unsplash.jpg", "typewriter.webp"],
  ["ben-mullins-5QTQz-oYk1A-unsplash.jpg", "coffee-laptop.webp"],
];

async function run() {
  if (!fs.existsSync(DEST)) fs.mkdirSync(DEST, { recursive: true });

  for (const [srcName, destName] of MAP) {
    const src = path.join(SRC, srcName);
    const dest = path.join(DEST, destName);
    if (!fs.existsSync(src)) {
      console.warn("MISSING:", srcName);
      continue;
    }
    await sharp(src).webp({ quality: 100, lossless: false }).toFile(dest);
    console.log("OK", destName);
  }
  console.log("Done");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
