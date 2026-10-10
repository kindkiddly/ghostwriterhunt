export const PROJECT_SUMMARY_MAX_LENGTH = 1000;

/** [PROJECT_SUMMARY: ...] at end of AI reply (hidden from visitor). */
const PROJECT_SUMMARY_TOKEN_PATTERN = /\[PROJECT_SUMMARY:\s*([\s\S]*?)\]\s*$/i;

/** Rough card-number patterns — never store in summary. */
const CARD_NUMBER_PATTERN = /\b(?:\d[ -]*?){13,19}\b/;

export function parseProjectSummaryToken(text) {
  const match = String(text || "").match(PROJECT_SUMMARY_TOKEN_PATTERN);
  if (!match) return null;
  return match[1].trim();
}

export function stripProjectSummaryToken(text) {
  return String(text || "")
    .replace(/\n?\[PROJECT_SUMMARY:[\s\S]*?\]\s*$/i, "")
    .trim();
}

export function normalizeProjectSummaryText(raw) {
  const collapsed = String(raw || "")
    .replace(/\r\n/g, "\n")
    .replace(/\s+/g, " ")
    .trim();
  if (!collapsed) return null;
  if (CARD_NUMBER_PATTERN.test(collapsed)) {
    console.warn("projectSummary: rejected summary containing card-like number sequence");
    return null;
  }
  if (collapsed.length > PROJECT_SUMMARY_MAX_LENGTH) {
    return collapsed.slice(0, PROJECT_SUMMARY_MAX_LENGTH);
  }
  return collapsed;
}

/**
 * Include in AI context when code-verified, or summary was updated during this conversation.
 */
export function shouldIncludeProjectSummaryInContext({
  customerCodeVerified,
  contactId,
  projectSummary,
  projectSummaryUpdatedAt,
  conversationCreatedAt,
}) {
  if (!contactId || !projectSummary?.trim()) return false;
  if (customerCodeVerified) return true;
  if (!projectSummaryUpdatedAt || !conversationCreatedAt) return false;
  return (
    new Date(projectSummaryUpdatedAt).getTime() >= new Date(conversationCreatedAt).getTime()
  );
}

export function buildProjectSummaryContextBlock(projectSummary, projectSummaryUpdatedAt) {
  const text = normalizeProjectSummaryText(projectSummary);
  if (!text) return "";
  const updated = projectSummaryUpdatedAt
    ? new Date(projectSummaryUpdatedAt).toISOString()
    : "unknown";
  return [
    "INTERNAL PROJECT SUMMARY (continuity memory for this chat. Never read verbatim to the visitor; never reveal to unverified visitors):",
    text,
    `Summary last updated: ${updated}`,
  ].join("\n");
}

export async function maybeSaveProjectSummaryFromReply({ admin, contactId, rawReply }) {
  if (!contactId) return;
  const parsed = parseProjectSummaryToken(rawReply);
  if (!parsed) return;

  const project_summary = normalizeProjectSummaryText(parsed);
  if (!project_summary) return;

  const { error } = await admin
    .from("contacts")
    .update({
      project_summary,
      project_summary_updated_at: new Date().toISOString(),
    })
    .eq("id", contactId);

  if (error) {
    console.error("projectSummary: failed to save", error);
  }
}
