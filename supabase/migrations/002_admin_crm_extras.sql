-- ============================================================================
-- GhostWriterHunt — Admin mini CRM extras
-- Adds: conversations.last_admin_seen_at (inbox unread badge), the
-- admin_conversations_view (inbox list with contact + last message
-- preview, RLS-safe via security_invoker), and a trigger that turns off
-- ai_enabled the moment an agent sends a reply.
-- Safe to re-run: IF NOT EXISTS / CREATE OR REPLACE / guarded DDL.
-- ============================================================================

-- ---- 1. Unread tracking ----------------------------------------------------

alter table public.conversations
  add column if not exists last_admin_seen_at timestamptz;

comment on column public.conversations.last_admin_seen_at is
  'Set whenever any admin opens this conversation in the CRM; compared against last_message_at to compute the inbox unread badge.';

-- ---- 2. Inbox list view (contact + last message preview) ------------------

create or replace view public.admin_conversations_view
with (security_invoker = true) as
select
  c.id,
  c.visitor_id,
  c.contact_id,
  c.status,
  c.ai_enabled,
  c.country,
  c.region,
  c.last_message_at,
  c.last_admin_seen_at,
  c.created_at,
  ct.name as contact_name,
  ct.email as contact_email,
  lm.content as last_message_preview,
  lm.sender as last_message_sender
from public.conversations c
left join public.contacts ct on ct.id = c.contact_id
left join lateral (
  select m.content, m.sender
  from public.messages m
  where m.conversation_id = c.id
  order by m.created_at desc
  limit 1
) lm on true;

comment on view public.admin_conversations_view is
  'Admin inbox list: one row per conversation with its contact and latest message preview. security_invoker so it still enforces the querying user''s RLS.';

grant select on public.admin_conversations_view to authenticated;

-- ---- 3. Auto-disable AI on the first agent reply ---------------------------

create or replace function public.disable_ai_on_agent_reply()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.sender = 'agent' then
    update public.conversations
    set ai_enabled = false
    where id = new.conversation_id
      and ai_enabled = true;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_messages_disable_ai_on_agent on public.messages;
create trigger trg_messages_disable_ai_on_agent
  after insert on public.messages
  for each row
  execute function public.disable_ai_on_agent_reply();
