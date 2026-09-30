const DEFAULT_RESUME_HOURS = 24;

/** Hours to resume an open chat after last activity (env CHAT_RESUME_HOURS, default 24). 0 = never resume. */
export function getChatResumeHours() {
  const raw = process.env.CHAT_RESUME_HOURS;
  if (raw == null || String(raw).trim() === "") return DEFAULT_RESUME_HOURS;
  const n = parseInt(String(raw).trim(), 10);
  if (!Number.isFinite(n)) return DEFAULT_RESUME_HOURS;
  return Math.max(0, n);
}

export function getChatResumeMs() {
  const hours = getChatResumeHours();
  if (hours === 0) return 0;
  return hours * 60 * 60 * 1000;
}

/** @deprecated use getChatResumeMs() */
export const CHAT_STALE_MS = DEFAULT_RESUME_HOURS * 60 * 60 * 1000;

export function isConversationStale(lastActivityIso, nowMs = Date.now()) {
  const windowMs = getChatResumeMs();
  if (windowMs === 0) return true;
  if (!lastActivityIso) return false;
  const lastMs = new Date(lastActivityIso).getTime();
  if (!Number.isFinite(lastMs)) return false;
  return nowMs - lastMs >= windowMs;
}

export function staleCutoffIso(nowMs = Date.now()) {
  const windowMs = getChatResumeMs();
  if (windowMs === 0) return new Date(nowMs).toISOString();
  return new Date(nowMs - windowMs).toISOString();
}
