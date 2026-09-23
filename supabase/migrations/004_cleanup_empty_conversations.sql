-- ============================================================================
-- GhostWriterHunt — One-time cleanup: delete conversations with 0 messages
-- Root cause of these (a conversation created separately from its first
-- message, non-atomically) is fixed in app/api/chat/send/route.js, which
-- now creates the conversation and saves its first message in one
-- server-side step and rolls the conversation back if the message insert
-- fails. This migration just removes any that were already left behind.
-- Safe to re-run: deleting rows that no longer match is a no-op.
-- ============================================================================

delete from public.conversations c
where not exists (
  select 1 from public.messages m where m.conversation_id = c.id
);
