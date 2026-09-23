-- ============================================================================
-- GhostWriterHunt — CRM-ready chat database schema
-- Tables: admins, contacts, conversations, messages
-- Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE / guarded DDL
-- throughout so this migration is idempotent.
-- ============================================================================

create extension if not exists pgcrypto with schema extensions;

-- ============================================================================
-- 1. TABLES
-- ============================================================================

create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  created_at timestamptz not null default now()
);
comment on table public.admins is 'Staff/agent accounts allowed to access the CRM (backed by auth.users).';

create table if not exists public.contacts (
  id                 uuid primary key default gen_random_uuid(),
  name               text,
  email              text unique,
  phone              text,
  source             text check (source is null or source in ('chat', 'contact_form')),
  status             text not null default 'new'
                       check (status in ('new', 'contacted', 'qualified', 'client', 'closed')),
  notes              text,
  marketing_consent  boolean not null default false,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);
comment on table public.contacts is 'CRM contact/lead record, deduplicated by email.';

create table if not exists public.conversations (
  id               uuid primary key default gen_random_uuid(),
  visitor_id       uuid not null references auth.users (id) on delete cascade,
  contact_id       uuid references public.contacts (id) on delete set null,
  status           text not null default 'open'
                     check (status in ('open', 'closed')),
  ai_enabled       boolean not null default true,
  country          text,
  region           text,
  last_message_at  timestamptz,
  created_at       timestamptz not null default now()
);
comment on table public.conversations is 'One chat-widget session for one anonymous visitor (visitor_id = auth.uid()).';

create table if not exists public.messages (
  id               uuid primary key default gen_random_uuid(),
  conversation_id  uuid not null references public.conversations (id) on delete cascade,
  sender           text not null check (sender in ('visitor', 'ai', 'agent')),
  agent_id         uuid references auth.users (id) on delete set null,
  content          text not null check (char_length(content) > 0 and char_length(content) <= 4000),
  created_at       timestamptz not null default now()
);
comment on table public.messages is 'Individual chat messages belonging to a conversation.';

-- ============================================================================
-- 2. INDEXES
-- ============================================================================

create index if not exists idx_messages_conversation_created
  on public.messages (conversation_id, created_at);

create index if not exists idx_conversations_last_message_at
  on public.conversations (last_message_at);

create index if not exists idx_conversations_visitor_id
  on public.conversations (visitor_id);

create index if not exists idx_contacts_email
  on public.contacts (email);

-- ============================================================================
-- 3. TRIGGERS
-- ============================================================================

-- contacts.updated_at auto-touch
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_contacts_updated_at on public.contacts;
create trigger trg_contacts_updated_at
  before update on public.contacts
  for each row
  execute function public.set_updated_at();

-- conversations.last_message_at auto-touch on new message
create or replace function public.touch_conversation_last_message()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.conversations
  set last_message_at = new.created_at
  where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists trg_messages_touch_conversation on public.messages;
create trigger trg_messages_touch_conversation
  after insert on public.messages
  for each row
  execute function public.touch_conversation_last_message();

-- Prevent non-admins from changing ai_enabled / status / contact_id on their
-- own conversation row (RLS grants visitors row-level UPDATE below; this
-- trigger enforces the column-level restriction RLS alone cannot express).
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
       or new.contact_id is distinct from old.contact_id then
      raise exception 'Only admins may update ai_enabled, status or contact_id';
    end if;
  end if;
  return new;
end;
$$;

-- ============================================================================
-- 4. RLS HELPER
-- ============================================================================

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.admins where user_id = auth.uid()
  );
$$;
comment on function public.is_admin() is 'True if the current auth.uid() is a CRM admin. SECURITY DEFINER so it can read admins under RLS.';

-- (Re)attach the visitor-update guard trigger now that is_admin() exists.
drop trigger if exists trg_conversations_guard_visitor_updates on public.conversations;
create trigger trg_conversations_guard_visitor_updates
  before update on public.conversations
  for each row
  execute function public.guard_conversation_visitor_updates();

-- ============================================================================
-- 5. ROW LEVEL SECURITY
-- ============================================================================

alter table public.admins enable row level security;
alter table public.contacts enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- ---- admins: read-only, admins only. No client inserts/updates/deletes. ----
drop policy if exists admins_select_admin_only on public.admins;
create policy admins_select_admin_only
  on public.admins
  for select
  using (public.is_admin());

-- ---- contacts: admins only, full access. Visitors have no access. ----
drop policy if exists contacts_admin_all on public.contacts;
create policy contacts_admin_all
  on public.contacts
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---- conversations ----
drop policy if exists conversations_admin_all on public.conversations;
create policy conversations_admin_all
  on public.conversations
  for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists conversations_visitor_select on public.conversations;
create policy conversations_visitor_select
  on public.conversations
  for select
  using (visitor_id = auth.uid());

drop policy if exists conversations_visitor_insert on public.conversations;
create policy conversations_visitor_insert
  on public.conversations
  for insert
  with check (visitor_id = auth.uid());

-- Visitors may update their own conversation row (e.g. country/region);
-- ai_enabled/status/contact_id changes are blocked by the trigger above.
drop policy if exists conversations_visitor_update on public.conversations;
create policy conversations_visitor_update
  on public.conversations
  for update
  using (visitor_id = auth.uid())
  with check (visitor_id = auth.uid());

-- No visitor DELETE policy anywhere: deletes are denied by default under RLS.

-- ---- messages ----
drop policy if exists messages_admin_select on public.messages;
create policy messages_admin_select
  on public.messages
  for select
  using (public.is_admin());

drop policy if exists messages_admin_insert on public.messages;
create policy messages_admin_insert
  on public.messages
  for insert
  with check (public.is_admin() and sender = 'agent');

drop policy if exists messages_visitor_select on public.messages;
create policy messages_visitor_select
  on public.messages
  for select
  using (
    exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and c.visitor_id = auth.uid()
    )
  );

drop policy if exists messages_visitor_insert on public.messages;
create policy messages_visitor_insert
  on public.messages
  for insert
  with check (
    sender = 'visitor'
    and exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and c.visitor_id = auth.uid()
    )
  );

-- AI-authored messages (sender = 'ai') are written server-side with the
-- Supabase service role key, which bypasses RLS entirely — no policy needed.

-- ============================================================================
-- 6. REALTIME
-- ============================================================================

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'messages'
  ) then
    alter publication supabase_realtime add table public.messages;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'conversations'
  ) then
    alter publication supabase_realtime add table public.conversations;
  end if;
end $$;

-- ============================================================================
-- 7. SEED ADMIN
-- ============================================================================
-- Requires that this user has already signed up in Supabase Auth
-- (Authentication → Users) with this exact email before running this
-- migration — otherwise 0 rows are inserted and nothing happens.

insert into public.admins (user_id, email)
select id, email
from auth.users
where email = 'ghostwriterhunt@lumexforge.com'
on conflict (user_id) do nothing;
