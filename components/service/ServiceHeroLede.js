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

const EM_DASH = /\s[—–]\s/;

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

function splitHeroSubtext(text, explicitEmphasis) {
  const full = (text ?? "").trim();
  if (!full) return { body: "", emphasis: null };

  if (explicitEmphasis?.trim()) {
    const emph = explicitEmphasis.trim();
    const idx = full.indexOf(emph);
    if (idx !== -1) {
      return {
        body: full.slice(0, idx),
        emphasis: stripTerminalPunct(emph),
      };
    }
    return { body: full, emphasis: stripTerminalPunct(emph) };
  }

  const sentences = full.match(/[^.!?]+[.!?]+/g);
  if (sentences && sentences.length >= 2) {
    const lead = sentences.slice(0, -1).join(" ").trim();
    const lastRaw = sentences[sentences.length - 1].trim();
    const lastInner = stripTerminalPunct(lastRaw);

    const dashSplit = splitOnEmDash(lastInner);
    if (dashSplit) {
      const body = lead.length ? `${lead} ${dashSplit.body}` : dashSplit.body;
      return { body: body.endsWith(" ") ? body : `${body} `, emphasis: dashSplit.emphasis };
    }

    if (lastInner.length >= 6 && lastInner.length <= 220) {
      const body = lead.length ? `${lead} ` : "";
      return { body, emphasis: lastInner };
    }
  }

  const singleDash = splitOnEmDash(stripTerminalPunct(full));
  if (singleDash) {
    return {
      body: singleDash.body.endsWith(" ") ? singleDash.body : `${singleDash.body} `,
      emphasis: singleDash.emphasis,
    };
  }

  return { body: full, emphasis: null };
}

export default function ServiceHeroLede({
  text,
  emphasis: emphasisOverride,
  topLabel,
  category,
  slug,
}) {
  const { body, emphasis } = splitHeroSubtext(text, emphasisOverride);
  const bottomTags =
    SLUG_BOTTOM_TAGS[slug] ?? CATEGORY_BOTTOM_TAGS[category] ?? "Your book · Your way";

  return (
    <div className="sh-hero-lede">
      <style>{`
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
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #6b7c3a;
          white-space: nowrap;
        }

        .sh-hero-lede-text {
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 26px;
          line-height: 1.4;
          color: #1c1c1c;
          margin: 0 auto;
          max-width: 520px;
          text-shadow: none;
          -webkit-font-smoothing: antialiased;
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
            font-size: clamp(21px, 5.4vw, 26px);
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
      `}</style>

      <div className="sh-hero-lede-rule" aria-hidden="true">
        <span className="sh-hero-lede-line" />
        <span className="sh-hero-lede-ornament">{topLabel}</span>
        <span className="sh-hero-lede-line" />
      </div>
      <p className="sh-hero-lede-text">
        {emphasis ? (
          <>
            {body}
            <em>{emphasis}.</em>
          </>
        ) : (
          text
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
