-- Project summary (agent memory per contact)

ALTER TABLE public.contacts
  ADD COLUMN IF NOT EXISTS project_summary text,
  ADD COLUMN IF NOT EXISTS project_summary_updated_at timestamptz;

ALTER TABLE public.contacts
  DROP CONSTRAINT IF EXISTS contacts_project_summary_length;

ALTER TABLE public.contacts
  ADD CONSTRAINT contacts_project_summary_length
  CHECK (project_summary IS NULL OR char_length(project_summary) <= 1000);

COMMENT ON COLUMN public.contacts.project_summary IS
  'Compact factual project memory for the AI (genre, scope, plan, next step). Max 1000 chars.';

COMMENT ON COLUMN public.contacts.project_summary_updated_at IS
  'When project_summary was last updated by the AI or an admin.';
