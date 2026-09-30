-- Auto-close open conversations inactive for 24+ hours (pg_cron + /api/chat/status)

create or replace function public.close_stale_open_conversations(p_cutoff timestamptz)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_closed int := 0;
begin
  with closed as (
    update public.conversations c
    set status = 'closed',
        ai_enabled = false
    where c.status = 'open'
      and coalesce(c.last_message_at, c.created_at) < p_cutoff
    returning c.id
  )
  select count(*)::int into v_closed from closed;

  return jsonb_build_object('closed', v_closed);
end;
$$;

comment on function public.close_stale_open_conversations(timestamptz) is
  'Closes open conversations whose last activity is before p_cutoff. Used by hourly cron and status checks.';

do $$
begin
  if exists (select 1 from cron.job where jobname = 'close-stale-chats') then
    perform cron.unschedule('close-stale-chats');
  end if;
end $$;

select cron.schedule(
  'close-stale-chats',
  '0 * * * *',
  $$
  select net.http_post(
    url := 'https://ghostwriterhunt.lumexforge.com/api/cron/close-stale-chats',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'cron_secret')
    ),
    body := '{}'::jsonb
  );
  $$
);
