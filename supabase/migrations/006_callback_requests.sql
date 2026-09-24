-- ============================================================================
-- GhostWriterHunt — Callback / human-representative requests from live chat
-- When a visitor strongly pushes to speak with a human, the AI flags the
-- conversation here. Admins see a separate Callbacks queue in the CRM.
-- Safe to re-run: IF NOT EXISTS / CREATE OR REPLACE / guarded DDL.
-- ============================================================================

alter table public.conversations
  add column if not exists callback_requested_at timestamptz,
  add column if not exists callback_reason text,
  add column if not exists callback_status text
    check (callback_status is null or callback_status in ('pending', 'contacted', 'resolved')),
  add column if not exists callback_admin_seen_at timestamptz;

comment on column public.conversations.callback_requested_at is
  'Set when the visitor asks for a human representative (AI-detected or handover).';
comment on column public.conversations.callback_reason is
  'Short reason captured at request time (e.g. wants phone call, complaint).';
comment on column public.conversations.callback_status is
  'CRM workflow: pending → contacted → resolved. NULL when no callback was requested.';
comment on column public.conversations.callback_admin_seen_at is
  'Last time an admin opened this row in the Callbacks queue.';

create index if not exists idx_conversations_callback_pending
  on public.conversations (callback_requested_at desc)
  where callback_status = 'pending';

-- Extend visitor update guard so only admins can touch callback fields.
create or replace function public.guard_conversation_visitor_updates()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    if new.ai_enabled is distinct from old.ai_enabled
       or new.status is distinct from old.status
       or new.contact_id is distinct from old.contact_id
       or new.callback_requested_at is distinct from old.callback_requested_at
       or new.callback_reason is distinct from old.callback_reason
       or new.callback_status is distinct from old.callback_status
       or new.callback_admin_seen_at is distinct from old.callback_admin_seen_at then
      raise exception 'Only admins may update ai_enabled, status, contact_id or callback fields';
    end if;
  end if;
  return new;
end;
$$;

create or replace view public.admin_callback_requests_view
with (security_invoker = true) as
select
  c.id as conversation_id,
  c.visitor_id,
  c.contact_id,
  c.country,
  c.region,
  c.callback_requested_at,
  c.callback_reason,
  c.callback_status,
  c.callback_admin_seen_at,
  c.status as conversation_status,
  c.last_message_at,
  ct.name as contact_name,
  ct.email as contact_email,
  ct.phone as contact_phone,
  lm.content as last_message_preview
from public.conversations c
left join public.contacts ct on ct.id = c.contact_id
left join lateral (
  select m.content
  from public.messages m
  where m.conversation_id = c.id
  order by m.created_at desc
  limit 1
) lm on true
where c.callback_requested_at is not null;

comment on view public.admin_callback_requests_view is
  'Admin Callbacks queue: conversations where the visitor requested a human follow-up.';

grant select on public.admin_callback_requests_view to authenticated;
