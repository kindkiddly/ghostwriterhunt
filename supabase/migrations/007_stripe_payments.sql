-- ============================================================================
-- GhostWriterHunt — Stripe payments (checkout sessions + payment links)
-- Tracks fixed-package checkouts and custom payment links (admin or AI).
-- Safe to re-run: IF NOT EXISTS / guarded DDL.
-- ============================================================================

create table if not exists public.payments (
  id                     uuid primary key default gen_random_uuid(),
  contact_id             uuid references public.contacts (id) on delete set null,
  conversation_id        uuid references public.conversations (id) on delete set null,
  package_key            text,
  description            text not null,
  amount_cents           integer not null check (amount_cents > 0),
  currency               text not null default 'usd',
  status                 text not null default 'pending'
                           check (status in ('pending', 'paid', 'expired', 'cancelled')),
  stripe_checkout_session_id text,
  stripe_payment_link_id     text,
  stripe_payment_link_url    text,
  created_by             text not null check (created_by in ('checkout', 'admin', 'ai')),
  created_by_user_id     uuid references auth.users (id) on delete set null,
  paid_at                timestamptz,
  metadata               jsonb,
  created_at             timestamptz not null default now()
);

comment on table public.payments is
  'Stripe checkout sessions and payment links for GhostWriterHunt packages and custom AI/admin quotes.';

create index if not exists idx_payments_status_created
  on public.payments (status, created_at desc);

create index if not exists idx_payments_contact_id
  on public.payments (contact_id);

create index if not exists idx_payments_conversation_id
  on public.payments (conversation_id);

create index if not exists idx_payments_stripe_checkout_session
  on public.payments (stripe_checkout_session_id)
  where stripe_checkout_session_id is not null;

create index if not exists idx_payments_stripe_payment_link
  on public.payments (stripe_payment_link_id)
  where stripe_payment_link_id is not null;

alter table public.payments enable row level security;

drop policy if exists payments_admin_all on public.payments;
create policy payments_admin_all
  on public.payments
  for all
  using (public.is_admin())
  with check (public.is_admin());
