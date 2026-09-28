-- ============================================================================
-- GhostWriterHunt — Payment page source + Stripe invoice fields on payments
-- Safe to re-run: IF NOT EXISTS / guarded constraint updates.
-- ============================================================================

alter table public.payments
  add column if not exists stripe_invoice_id text,
  add column if not exists stripe_invoice_url text;

comment on column public.payments.stripe_invoice_id is
  'Stripe Invoice id (in_…) when invoice_creation is enabled on checkout or payment links.';

comment on column public.payments.stripe_invoice_url is
  'Hosted invoice URL for the customer (invoice.hosted_invoice_url).';

create index if not exists idx_payments_stripe_invoice_id
  on public.payments (stripe_invoice_id)
  where stripe_invoice_id is not null;

-- Extend created_by to include public custom payment page
alter table public.payments drop constraint if exists payments_created_by_check;
alter table public.payments
  add constraint payments_created_by_check
  check (created_by in ('checkout', 'admin', 'ai', 'payment_page'));

-- Extend contact source for /pay submissions
alter table public.contacts drop constraint if exists contacts_source_check;
alter table public.contacts
  add constraint contacts_source_check
  check (source is null or source in ('chat', 'contact_form', 'payment_page'));
