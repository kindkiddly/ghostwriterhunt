"use client";

/**
 * Service hero subtitle — matches home page lede (Playfair, gold rules, italic emphasis).
 */

const CATEGORY_BOTTOM_TAGS = {
  Writing: "Your voice · Your story · Your book",
  Editing: "Clarity · Precision · Publish-ready",
  Design: "Professional · Polished · Memorable",
  Publishing: "Your rights · Global reach · Your name",
  Marketing: "Visibility · Growth · Your audience",
};

const SLUG_BOTTOM_TAGS = {
  ghostwriting: "Your name · Your rights · Your book",
};

function stripTerminalPunct(s) {
  return s.replace(/[.!?]+$/, "").trim();
}

/** Split on last em-dash so the tail becomes gold italic emphasis (matches home lede). */
function splitOnEmDash(segment) {
  if (!/\s[—–]\s/.test(segment)) return null;

  const re = /\s[—–]\s/g;
  let lastMatch = null;
  let m;
  while ((m = re.exec(segment)) !== null) {
    lastMatch = m;
  }
  if (!lastMatch) return null;

  const bodyPart = segment.slice(0, lastMatch.index).trimEnd();
  const emphasisPart = stripTerminalPunct(
    segment.slice(lastMatch.index + lastMatch[0].length)
  );
  if (emphasisPart.length < 6 || emphasisPart.length > 220) return null;

  const dashChar = segment[lastMatch.index + 1];
  return {
    body: `${bodyPart} ${dashChar} `,
    emphasis: emphasisPart,
  };
}

/** @typedef {{ kind: "plain" | "gold", text: string }} LedeSegment */

/** Phrases worth gold emphasis inside hero subtitles (keeps paragraph readable). */
const SUBTITLE_GOLD_PHRASES =
  /\b(?:the most critical|every error(?: that slipped through)?|100% of your rights and royalties|47\+ platforms worldwide|just the beginning|real visibility|real reviews and real sales|under your name|under one roof|globally|worldwide|immediately|make readers want to read immediately|your (?:credibility with readers|name|rights|book|vision|audience|story)|professional (?:proofreaders|ghostwriters|editors|designers|writers|blog writers|article writers|marketing specialists|eBook writers))\b/gi;

function mergeAdjacentSegments(segments) {
  /** @type {LedeSegment[]} */
  const merged = [];
  segments.forEach((segment) => {
    if (!segment.text) return;
    const prev = merged[merged.length - 1];
    if (prev && prev.kind === segment.kind) {
      prev.text += segment.text;
      return;
    }
    merged.push({ ...segment });
  });
  return merged;
}

function applyPhraseHighlights(text) {
  const re = new RegExp(SUBTITLE_GOLD_PHRASES.source, SUBTITLE_GOLD_PHRASES.flags);
  /** @type {LedeSegment[]} */
  const segments = [];
  let cursor = 0;

  for (const match of text.matchAll(re)) {
    if (match.index === undefined) continue;
    if (match.index > cursor) {
      segments.push({ kind: "plain", text: text.slice(cursor, match.index) });
    }
    segments.push({ kind: "gold", text: match[0] });
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) {
    segments.push({ kind: "plain", text: text.slice(cursor) });
  }

  return mergeAdjacentSegments(segments);
}

function segmentsForSentence(sentence) {
  const trimmed = sentence.trim();
  if (!trimmed) return [];

  const hyphenIdx = trimmed.search(/\s-\s/);
  if (hyphenIdx !== -1) {
    const lead = trimmed.slice(0, hyphenIdx).trimEnd();
    const tail = trimmed.slice(hyphenIdx + 3).trim();
    const highlightedLead = applyPhraseHighlights(lead);
    return mergeAdjacentSegments([
      ...highlightedLead,
      { kind: "plain", text: " - " },
      { kind: "gold", text: tail },
    ]);
  }

  const emDash = splitOnEmDash(stripTerminalPunct(trimmed.replace(/[.!?]+$/, "")));
  if (emDash) {
    const punct = trimmed.match(/[.!?]+$/)?.[0] ?? "";
    return mergeAdjacentSegments([
      ...applyPhraseHighlights(emDash.body),
      { kind: "gold", text: `${emDash.emphasis}${punct}` },
    ]);
  }

  const highlighted = applyPhraseHighlights(trimmed);
  if (highlighted.some((segment) => segment.kind === "gold")) {
    return highlighted;
  }

  const clauses = trimmed.split(/,\s+/);
  if (clauses.length >= 2) {
    const last = clauses[clauses.length - 1];
    const lead = `${clauses.slice(0, -1).join(", ")}, `;
    return mergeAdjacentSegments([
      ...applyPhraseHighlights(lead),
      { kind: "gold", text: last },
    ]);
  }

  return [{ kind: "plain", text: trimmed }];
}

/** Black / gold mix with in-sentence highlights (subtitle only). */
function buildLedeSegments(text, explicitEmphasis) {
  const full = (text ?? "").trim();
  if (!full) return [];

  if (explicitEmphasis?.trim()) {
    const emph = explicitEmphasis.trim();
    const idx = full.indexOf(emph);
    if (idx !== -1) {
      return mergeAdjacentSegments([
        ...applyPhraseHighlights(full.slice(0, idx)),
        { kind: "gold", text: full.slice(idx).trim() },
      ]);
    }
    return [
      { kind: "plain", text: full },
      { kind: "gold", text: stripTerminalPunct(emph) + "." },
    ];
  }

  const sentences = full.match(/[^.!?]+[.!?]+/g)?.map((s) => s.trim()) ?? [full];
  /** @type {LedeSegment[]} */
  const segments = [];

  sentences.forEach((sentence, index) => {
    segments.push(...segmentsForSentence(sentence));
    if (index < sentences.length - 1) {
      const last = segments[segments.length - 1];
      if (last && !last.text.endsWith(" ")) {
        last.text += " ";
      }
    }
  });

  return mergeAdjacentSegments(segments);
}

export default function ServiceHeroLede({
  text,
  emphasis: emphasisOverride,
  topLabel,
  category,
  slug,
}) {
  const segments = buildLedeSegments(text, emphasisOverride);
  const bottomTags =
    SLUG_BOTTOM_TAGS[slug] ?? CATEGORY_BOTTOM_TAGS[category] ?? "Your book · Your way";

  return (
    <div
      className={`sh-hero-lede${slug === "author-website" ? " sh-hero-lede--author-website" : ""}`}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .sh-hero-lede {
          position: relative;
          z-index: 1;
          max-width: 520px;
          margin: 0 0 32px;
          text-align: center;
        }

        .sh-hero-lede-rule {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 18px;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
        }

        .sh-hero-lede-rule--after {
          margin-bottom: 0;
          margin-top: 16px;
        }

        .sh-hero-lede-line {
          flex: 1 1 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(201, 168, 76, 0.85) 50%,
            transparent 100%
          );
        }

        .sh-hero-lede-ornament {
          flex-shrink: 0;
          font-family: var(--font-inter), sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #6b7c3a;
          white-space: nowrap;
        }

        .sh-hero-lede-text {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          font-size: 24px;
          line-height: 1.4;
          color: #1c1c1c;
          margin: 0 auto;
          max-width: 520px;
          text-shadow: none;
          -webkit-font-smoothing: antialiased;
        }

        .sh-hero-lede-text span {
          color: #1c1c1c;
        }

        .sh-hero-lede-text em {
          font-style: italic;
          font-weight: 700;
          color: #c9a84c;
        }

        @media (max-width: 768px) {
          .sh-hero-lede {
            width: 100%;
            max-width: 520px;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 28px;
          }
          .sh-hero-lede-rule {
            margin-left: auto;
            margin-right: auto;
          }
          .sh-hero-lede-text {
            font-size: clamp(19px, 5vw, 24px);
            line-height: 1.42;
            margin-left: auto;
            margin-right: auto;
          }
          .sh-hero-lede-ornament {
            white-space: normal;
            text-align: center;
            line-height: 1.45;
            max-width: 9.5rem;
          }
          .sh-hero-lede-rule--after .sh-hero-lede-ornament {
            max-width: 13.5rem;
          }
          .sh-hero-lede--author-website .sh-hero-lede-text {
            font-size: clamp(16px, 4.1vw, 19px);
            line-height: 1.48;
          }
          .sh-hero-lede--author-website .sh-hero-lede-ornament {
            font-size: 8px;
            letter-spacing: 0.22em;
          }
        }

        @media (min-width: 769px) {
          .sh-hero-lede {
            text-align: left;
            margin-left: 0;
          }
          .sh-hero-lede-rule {
            margin-left: 0;
            margin-right: 0;
          }
          .sh-hero-lede-text {
            margin-left: 0;
          }
        }
      ` }} />

      <div className="sh-hero-lede-rule" aria-hidden="true">
        <span className="sh-hero-lede-line" />
        <span className="sh-hero-lede-ornament">{topLabel}</span>
        <span className="sh-hero-lede-line" />
      </div>
      <p className="sh-hero-lede-text">
        {segments.map((segment, index) =>
          segment.kind === "gold" ? (
            <em key={index}>{segment.text}</em>
          ) : (
            <span key={index}>{segment.text}</span>
          )
        )}
      </p>
      <div
        className="sh-hero-lede-rule sh-hero-lede-rule--after"
        aria-hidden="true"
      >
        <span className="sh-hero-lede-line" />
        <span className="sh-hero-lede-ornament">{bottomTags}</span>
        <span className="sh-hero-lede-line" />
      </div>
    </div>
  );
}
