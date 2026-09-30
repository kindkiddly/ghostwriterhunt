-- ============================================================================
-- GhostWriterHunt — Which migrations are already on this database?
-- Run once in: Supabase Dashboard → SQL Editor → New query → Run
-- Does NOT change anything — read-only checks.
-- ============================================================================

WITH checks AS (
  SELECT
    1 AS ord,
    '001_chat_crm_schema.sql' AS migration_file,
    'Core CRM (admins, contacts, conversations, messages)' AS purpose,
    (
      EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'contacts'
      )
      AND EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'conversations'
      )
      AND EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'messages'
      )
    ) AS applied

  UNION ALL SELECT 2, '002_admin_crm_extras.sql',
    'Inbox unread + admin_conversations_view',
    EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'conversations'
        AND column_name = 'last_admin_seen_at'
    )

  UNION ALL SELECT 3, '003_presence_seen_email_backup.sql',
    'Message seen/emailed + mark_messages_seen()',
    EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'messages'
        AND column_name = 'seen_at'
    )
    AND EXISTS (
      SELECT 1 FROM pg_proc p
      JOIN pg_namespace n ON n.oid = p.pronamespace
      WHERE n.nspname = 'public' AND p.proname = 'mark_messages_seen'
    )

  UNION ALL SELECT 4, '004_cleanup_empty_conversations.sql',
    'One-time delete: conversations with 0 messages (no schema marker)',
    NULL::boolean

  UNION ALL SELECT 5, '005_cleanup_abandoned_chat.sql',
    'Abandoned chat cleanup RPC + cron',
    EXISTS (
      SELECT 1 FROM pg_proc p
      JOIN pg_namespace n ON n.oid = p.pronamespace
      WHERE n.nspname = 'public' AND p.proname = 'cleanup_abandoned_conversations'
    )

  UNION ALL SELECT 6, '006_callback_requests.sql',
    'Callback columns + admin_callback_requests_view',
    EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'conversations'
        AND column_name = 'callback_requested_at'
    )

  UNION ALL SELECT 7, '007_stripe_payments.sql',
    'payments table',
    EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'payments'
    )

  UNION ALL SELECT 8, '008_payment_invoices_and_sources.sql',
    'Invoice fields + payment_page source',
    EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'payments'
        AND column_name = 'stripe_invoice_id'
    )

  UNION ALL SELECT 9, '009_expire_stale_pending_payments.sql',
    'One-time expire old pending checkouts (no schema marker)',
    NULL::boolean

  UNION ALL SELECT 10, '010_payment_link_emailed_at.sql',
    'payments.payment_link_emailed_at',
    EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'payments'
        AND column_name = 'payment_link_emailed_at'
    )

  UNION ALL SELECT 11, '011_customer_codes_and_progress.sql',
    'GWH customer codes + customer_code_attempts',
    EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'contacts'
        AND column_name = 'customer_code'
    )
    AND EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'customer_code_attempts'
    )

  UNION ALL SELECT 12, '012_close_stale_open_conversations.sql',
    '24h auto-close open chats (close_stale_open_conversations)',
    EXISTS (
      SELECT 1 FROM pg_proc p
      JOIN pg_namespace n ON n.oid = p.pronamespace
      WHERE n.nspname = 'public' AND p.proname = 'close_stale_open_conversations'
    )

  UNION ALL SELECT 13, '013_contact_project_summary.sql',
    'AI project summary on contacts',
    EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'contacts'
        AND column_name = 'project_summary'
    )
)
SELECT
  ord AS "#",
  migration_file AS "Run this file if MISSING",
  purpose AS "What it adds",
  CASE
    WHEN applied IS NULL THEN 'unknown (one-time / optional)'
    WHEN applied THEN '✓ already applied'
    ELSE '✗ NOT applied — run in SQL Editor'
  END AS status
FROM checks
ORDER BY ord;

-- Rows still missing (action list):
SELECT migration_file AS "Still need to run"
FROM checks
WHERE applied = false
ORDER BY ord;
