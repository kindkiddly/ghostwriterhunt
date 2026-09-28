-- ============================================================================
-- GhostWriterHunt — One-time: expire stale pending checkout sessions (24h+)
-- Safe to re-run: only updates rows still pending.
-- ============================================================================

update public.payments
set status = 'expired'
where status = 'pending'
  and stripe_checkout_session_id is not null
  and created_at < now() - interval '24 hours';
