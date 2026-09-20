/**
 * Replace Unsplash URLs in data/services.js with local WebP where matched.
 * Leaves face/avatar URLs unchanged.
 */
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "data", "services.js");
let src = fs.readFileSync(file, "utf8");

// Map Unsplash photo id prefix → local webp path
const MAP = [
  ["photo-1455390582262-044cdead277a", "/images/writing-hands.webp"],
  ["photo-1488190211105-8b0e65b80b4e", "/images/writing-desk.webp"],
  ["photo-1434030216411-0b793f4b4173", "/images/fountain-pen-notes.webp"],
  ["photo-1519791883288-dc8bd696e667", "/images/books-stack-pink.webp"],
  ["photo-1506880018603-83d5b814b5a6", "/images/author-reading.webp"],
  ["photo-1474932430478-367dbb6832c1", "/images/fountain-pen-notes.webp"],
  ["photo-1524995997946-a1c2e315a42f", "/images/library-books.webp"],
  ["photo-1516321318423-f06f85e504b3", "/images/collaboration-laptop.webp"],
  ["photo-1507842217343-583bb7270b66", "/images/library-books.webp"],
  ["photo-1517842645767-c639042777db", "/images/fountain-pen-notes.webp"],
  ["photo-1503676260728-1c00da094a0b", "/images/books-education.webp"],
  ["photo-1532012197267-da84d127e765", "/images/books-stack-pink.webp"],
  ["photo-1544947950-fa07a98d237f", "/images/books-fairy-lights.webp"],
  ["photo-1524578271613-d550eacf6090", "/images/library-books.webp"],
  ["photo-1519682337058-a94d519337bc", "/images/books-stack-pink.webp"],
  ["photo-1476275466078-4007374efbbe", "/images/flipping-book.webp"],
  ["photo-1512820790803-83ca734da794", "/images/books-fairy-lights.webp"],
  ["photo-1495446815901-a7297e633e8d", "/images/library-books.webp"],
  ["photo-1543002588-bfa74002ed7e", "/images/book-pen-laptop.webp"],
  ["photo-1553877522-43269d4ea984", "/images/collaboration-laptop.webp"],
  ["photo-1515378960530-7c0da6231fb1", "/images/writing-desk.webp"],
  ["photo-1456513080510-7bf3a84b82f8", "/images/author-reading.webp"],
  ["photo-1457369804613-52c61a468e7d", "/images/book-pen-laptop.webp"],
  ["photo-1456324504439-367cee3b3c32", "/images/fountain-pen-notes.webp"],
  ["photo-1513364776144-60967b0f800f", "/images/flipping-book.webp"],
  ["photo-1560518883-ce09059eeffa", "/images/books-stack-pink.webp"],
  ["photo-1557804506-669a67965ba0", "/images/office-meeting.webp"],
  ["photo-1432888498266-38ffec3eaf0a", "/images/writing-desk.webp"],
  ["photo-1542744095-fcf48d80b0fd", "/images/collaboration-laptop.webp"],
  ["photo-1558655146-9f40138edfeb", "/images/flipping-book.webp"],
  ["photo-1497633762265-9d179a990aa6", "/images/books-education.webp"],
  ["photo-1472173148041-00294f0814a2", "/images/book-pen-laptop.webp"],
  ["photo-1550399105-c4db5fb85c18", "/images/books-table.webp"],
  ["photo-1476275466078-4007374efbbe", "/images/flipping-book.webp"],
  ["photo-1497366216548-37526070297c", "/images/modern-office.webp"],
  ["photo-1521737711867-e3b97375f902", "/images/team-collaboration.webp"],
  ["photo-1516321318423-f06f85e504b3", "/images/collaboration-laptop.webp"],
];

let count = 0;
for (const [id, local] of MAP) {
  const re = new RegExp(
    `https://images\\.unsplash\\.com/${id}[^'"]*`,
    "g"
  );
  const before = src;
  src = src.replace(re, local);
  if (src !== before) {
    const matches = before.match(re);
    count += matches ? matches.length : 0;
  }
}

fs.writeFileSync(file, src);
console.log("Replaced", count, "URLs in services.js");
