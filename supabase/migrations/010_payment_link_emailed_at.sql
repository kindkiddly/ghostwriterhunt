-- ============================================================================
-- GhostWriterHunt — Track when admin manually emailed a payment link
-- ============================================================================

alter table public.payments
  add column if not exists payment_link_emailed_at timestamptz;

comment on column public.payments.payment_link_emailed_at is
  'When staff sent the Stripe payment link to the contact via admin (manual send only).';
