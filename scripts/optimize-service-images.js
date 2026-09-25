/**
 * Generates 2x retina overview and process images for service pages.
 * Overview: 640x800 (large), 400x520 (medium)
 * Process: 940x560 (landscape)
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(__dirname, "../public/images");

const OVERVIEW_LARGE = { width: 640, height: 800 };
const OVERVIEW_MEDIUM = { width: 400, height: 520 };
const PROCESS = { width: 940, height: 560 };

/** @type {Record<string, { overview: [string, string], process: string[] }>} */
const SERVICE_SOURCES = {
  "website-content": {
    overview: ["website-content-writing-2.webp", "website-content-writing.webp"],
    process: [
      "laptop-workspace.webp",
      "modern-office.webp",
      "website-content-writing-2.webp",
      "HEERO-L.webp",
      "website.webp",
    ],
  },
  "author-website": {
    overview: ["website.webp", "altumcode-WMxkHgJAO9E-unsplash.webp"],
    process: [
      "laptop-workspace.webp",
      "website.webp",
      "altumcode-WMxkHgJAO9E-unsplash.webp",
      "modern-office.webp",
      "coffee-laptop.webp",
    ],
  },
  proofreading: {
    overview: ["proof-reading.webp", "menuescript-editing.webp"],
    process: [
      "proof-reading.webp",
      "fountain-pen-notes.webp",
      "menuescript-editing.webp",
      "book-pen-laptop.webp",
      "editing.webp",
    ],
  },
  "book-formatting": {
    overview: ["e-book-publishing.webp", "flipping-book.webp"],
    process: [
      "laptop-workspace.webp",
      "library-books.webp",
      "e-book-publishing.webp",
      "open-book-light.webp",
      "Publishing.webp",
    ],
  },
  "video-book-trailer": {
    overview: ["video-book-trailer.webp", "video-book-trailer-2.webp"],
    process: [
      "team-collaboration.webp",
      "video-book-trailer.webp",
      "video-book-trailer-2.webp",
      "video-book-trailer.webp",
      "video-book-trailer-2.webp",
    ],
  },
  "audiobook-publishing": {
    overview: ["audiot-book.webp", "author-reading.webp"],
    process: [
      "audiot-book.webp",
      "author-reading.webp",
      "library-wide.webp",
      "laptop-workspace.webp",
      "Publishing.webp",
    ],
  },
  "book-marketing": {
    overview: ["MARKETING.webp", "laptop-workspace.webp"],
    process: [
      "laptop-workspace.webp",
      "MARKETING.webp",
      "coffee-laptop.webp",
      "team-collaboration.webp",
      "modern-office.webp",
    ],
  },
  "author-branding": {
    overview: ["author-2.webp", "team-collaboration.webp"],
    process: [
      "team-collaboration.webp",
      "modern-office.webp",
      "writing-hands.webp",
      "coffee-laptop.webp",
      "author-2.webp",
    ],
  },
  "ebook-publishing": {
    overview: ["e-book-publishing.webp", "flipping-book.webp"],
    process: [
      "laptop-workspace.webp",
      "e-book-publishing.webp",
      "Publishing.webp",
      "e-book-1.webp",
      "e-book-2.webp",
    ],
  },
  "illustration-graphics": {
    overview: ["Pen-writing.webp", "books-fairy-lights.webp"],
    process: [
      "Pen-writing.webp",
      "flipping-book.webp",
      "books-fairy-lights.webp",
      "book-H3.webp",
      "book-H9.webp",
    ],
  },
  "interior-layout": {
    overview: ["open-book-light.webp", "library-books.webp"],
    process: [
      "open-book-light.webp",
      "library-books.webp",
      "books-table.webp",
      "author-reading.webp",
      "flipping-book.webp",
    ],
  },
  "book-cover-design": {
    overview: ["books-fairy-lights.webp", "book-H11.webp"],
    process: [
      "Pen-writing.webp",
      "books-fairy-lights.webp",
      "book-H11.webp",
      "flipping-book.webp",
      "book-H9.webp",
    ],
  },
  "manuscript-editing": {
    overview: ["menuescript-editing.webp", "editing.webp"],
    process: [
      "menuescript-editing.webp",
      "writing-hands.webp",
      "fountain-pen-notes.webp",
      "proof-reading.webp",
      "Pen-writing.webp",
    ],
  },
};

async function resizeCover(srcFile, destFile, { width, height }) {
  const srcPath = path.join(OUT_DIR, srcFile);
  if (!fs.existsSync(srcPath)) {
    throw new Error(`Missing source image: ${srcFile}`);
  }

  await sharp(srcPath)
    .rotate()
    .resize(width, height, { fit: "cover", position: "centre" })
    .webp({ quality: 82, effort: 4 })
    .toFile(path.join(OUT_DIR, destFile));
}

async function main() {
  for (const [slug, cfg] of Object.entries(SERVICE_SOURCES)) {
    const [ovLargeSrc, ovMediumSrc] = cfg.overview;
    await resizeCover(ovLargeSrc, `${slug}-overview-1.webp`, OVERVIEW_LARGE);
    await resizeCover(ovMediumSrc, `${slug}-overview-2.webp`, OVERVIEW_MEDIUM);

    for (let i = 0; i < 5; i++) {
      await resizeCover(
        cfg.process[i],
        `${slug}-process-${i + 1}.webp`,
        PROCESS
      );
    }

    console.log(`✓ ${slug}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
