/** Inactivity window before an open chat is auto-closed (matches cron + status). */
export const CHAT_STALE_MS = 24 * 60 * 60 * 1000;

export function isConversationStale(lastActivityIso, nowMs = Date.now()) {
  if (!lastActivityIso) return false;
  const lastMs = new Date(lastActivityIso).getTime();
  if (!Number.isFinite(lastMs)) return false;
  return nowMs - lastMs >= CHAT_STALE_MS;
}
