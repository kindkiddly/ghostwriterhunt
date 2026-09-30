-- GhostWriterHunt — clear test CRM/chat data (manual run only; NOT a migration)
-- Preserves: public.admins, non-anonymous auth users (incl. ghostwriterhunt@lumexforge.com),
-- schema, functions, triggers, cron jobs, vault secrets.

begin;

-- 1. Chat messages (also cleared if conversations are deleted via CASCADE)
delete from public.messages;

-- 2. Stripe payment records tied to test contacts/conversations
delete from public.payments;

-- 3. Customer code verification attempts (anonymous visitors)
delete from public.customer_code_attempts;

-- 4. Conversations (callback_* columns live on this table; CASCADE removes any remaining messages)
delete from public.conversations;

-- 5. CRM contacts (chat, contact form, payment page leads)
delete from public.contacts;

-- 6. Anonymous Supabase Auth users (chat widget visitors). Never delete admin accounts.
delete from auth.users u
where coalesce(u.is_anonymous, false) = true
  and not exists (
    select 1 from public.admins a where a.user_id = u.id
  );

commit;
