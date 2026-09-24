-- ============================================================================
-- GhostWriterHunt — Recurring cleanup: abandoned conversations + pg_cron job
-- Deletes conversations with no CRM contact (contact_id IS NULL) whose last
-- activity (last_message_at, or created_at if empty) is older than the cutoff.
-- The API route /api/cron/cleanup-abandoned then removes orphaned anonymous
-- auth users returned by this RPC. Conversations linked to contacts are kept
-- for CRM. Admin users are never touched.
-- Safe to re-run: CREATE OR REPLACE / guarded cron unschedule.
-- ============================================================================

-- ---- 1. cleanup_abandoned_conversations() RPC --------------------------------

create or replace function public.cleanup_abandoned_conversations(p_cutoff timestamptz)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deleted int := 0;
  v_orphan_ids uuid[];
begin
  with deleted as (
    delete from public.conversations c
    where c.contact_id is null
      and coalesce(c.last_message_at, c.created_at) < p_cutoff
      and not exists (
        select 1 from public.admins a where a.user_id = c.visitor_id
      )
    returning c.id, c.visitor_id
  ),
  stats as (
    select count(*)::int as cnt from deleted
  ),
  orphans as (
    select distinct d.visitor_id
    from deleted d
    where not exists (
      select 1
      from public.conversations c2
      where c2.visitor_id = d.visitor_id
    )
  )
  select
    (select cnt from stats),
    coalesce((select array_agg(o.visitor_id) from orphans o), '{}')
  into v_deleted, v_orphan_ids;

  return jsonb_build_object(
    'conversations_deleted', v_deleted,
    'orphan_visitor_ids', to_jsonb(coalesce(v_orphan_ids, '{}'::uuid[]))
  );
end;
$$;

comment on function public.cleanup_abandoned_conversations(timestamptz) is
  'Deletes abandoned chat conversations (no CRM contact, inactive before cutoff). Returns orphan visitor_ids with no remaining conversations for auth cleanup. Service role only.';

revoke all on function public.cleanup_abandoned_conversations(timestamptz) from public;
revoke all on function public.cleanup_abandoned_conversations(timestamptz) from anon;
revoke all on function public.cleanup_abandoned_conversations(timestamptz) from authenticated;
grant execute on function public.cleanup_abandoned_conversations(timestamptz) to service_role;

-- ---- 2. Daily pg_cron job ---------------------------------------------------
-- Uses the same vault secret as migration 003 (name: cron_secret).

do $$
begin
  if exists (select 1 from cron.job where jobname = 'cleanup-abandoned-chat') then
    perform cron.unschedule('cleanup-abandoned-chat');
  end if;
end $$;

select cron.schedule(
  'cleanup-abandoned-chat',
  '0 3 * * *',
  $$
  select net.http_post(
    url := 'https://ghostwriterhunt.lumexforge.com/api/cron/cleanup-abandoned',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'cron_secret')
    ),
    body := '{}'::jsonb
  );
  $$
);
