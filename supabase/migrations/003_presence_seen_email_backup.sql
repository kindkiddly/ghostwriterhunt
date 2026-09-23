-- ============================================================================
-- GhostWriterHunt — Online presence, seen marks, unseen-reply email backup
-- Adds: messages.seen_at / messages.emailed_at, the mark_messages_seen()
-- RPC (visitor-callable, SECURITY DEFINER, ownership-checked), and a
-- pg_cron + pg_net job that calls /api/cron/unseen-replies every minute
-- using a secret read from Supabase Vault (never stored in plain SQL).
-- Safe to re-run: IF NOT EXISTS / CREATE OR REPLACE / guarded DDL.
-- ============================================================================

-- ---- 1. Columns -------------------------------------------------------------

alter table public.messages
  add column if not exists seen_at timestamptz;

alter table public.messages
  add column if not exists emailed_at timestamptz;

comment on column public.messages.seen_at is
  'Set once the visitor has actually viewed this agent/AI message in the open chat widget.';
comment on column public.messages.emailed_at is
  'Set once this unseen agent/AI message has been included in a backup email, so it is never emailed twice.';

create index if not exists idx_messages_unseen_unemailed
  on public.messages (created_at)
  where sender in ('agent', 'ai') and seen_at is null and emailed_at is null;

-- ---- 2. mark_messages_seen() RPC --------------------------------------------
-- Visitor-callable. Verifies the caller's own auth.uid() owns the
-- conversation, then touches ONLY seen_at on agent/AI messages in it —
-- callers cannot influence any other column or any other conversation.

create or replace function public.mark_messages_seen(p_conversation_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from public.conversations
    where id = p_conversation_id
      and visitor_id = auth.uid()
  ) then
    raise exception 'Not authorized to mark messages seen for this conversation';
  end if;

  update public.messages
  set seen_at = now()
  where conversation_id = p_conversation_id
    and sender in ('agent', 'ai')
    and seen_at is null;
end;
$$;

comment on function public.mark_messages_seen(uuid) is
  'Marks all unseen agent/AI messages in a conversation as seen. Callable only by the visitor who owns that conversation (auth.uid() = conversations.visitor_id).';

grant execute on function public.mark_messages_seen(uuid) to authenticated;

-- ---- 3. Scheduled email backup for unseen replies ---------------------------
-- pg_cron calls POST /api/cron/unseen-replies every minute. The shared
-- secret lives in Supabase Vault (see report) — never in this file. Run
-- this once via `select vault.create_secret('<value>', 'cron_secret');`
-- with your own generated value before/after applying this migration.

create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

do $$
begin
  if exists (select 1 from cron.job where jobname = 'unseen-replies-check') then
    perform cron.unschedule('unseen-replies-check');
  end if;
end $$;

select cron.schedule(
  'unseen-replies-check',
  '* * * * *',
  $$
  select net.http_post(
    url := 'https://ghostwriterhunt.lumexforge.com/api/cron/unseen-replies',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'cron_secret')
    ),
    body := '{}'::jsonb
  );
  $$
);
