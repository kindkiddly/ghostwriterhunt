-- Customer codes (GWH-XXXXXX), project progress, existing-customer verification

ALTER TABLE public.contacts
  ADD COLUMN IF NOT EXISTS customer_code text,
  ADD COLUMN IF NOT EXISTS project_progress integer;

ALTER TABLE public.contacts
  DROP CONSTRAINT IF EXISTS contacts_project_progress_check;

ALTER TABLE public.contacts
  ADD CONSTRAINT contacts_project_progress_check
  CHECK (project_progress IS NULL OR project_progress IN (0, 25, 50, 75, 100));

CREATE UNIQUE INDEX IF NOT EXISTS contacts_customer_code_unique
  ON public.contacts (customer_code)
  WHERE customer_code IS NOT NULL;

CREATE OR REPLACE FUNCTION public.generate_gwh_customer_code()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  chars constant text := '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
  result text;
  i integer;
  attempts integer := 0;
  pick integer;
BEGIN
  LOOP
    result := 'GWH-';
    FOR i IN 1..6 LOOP
      pick := 1 + floor(random() * length(chars))::integer;
      result := result || substr(chars, pick, 1);
    END LOOP;
    EXIT WHEN NOT EXISTS (
      SELECT 1 FROM public.contacts c WHERE c.customer_code = result
    );
    attempts := attempts + 1;
    IF attempts > 50 THEN
      RAISE EXCEPTION 'Could not generate unique customer code';
    END IF;
  END LOOP;
  RETURN result;
END;
$$;

CREATE OR REPLACE FUNCTION public.contacts_assign_customer_code()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.email IS NOT NULL AND btrim(NEW.email) <> '' THEN
    IF NEW.customer_code IS NULL THEN
      NEW.customer_code := public.generate_gwh_customer_code();
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS contacts_assign_customer_code_trigger ON public.contacts;

CREATE TRIGGER contacts_assign_customer_code_trigger
  BEFORE INSERT OR UPDATE OF email, customer_code ON public.contacts
  FOR EACH ROW
  EXECUTE function public.contacts_assign_customer_code();

UPDATE public.contacts
SET email = email
WHERE email IS NOT NULL
  AND btrim(email) <> ''
  AND customer_code IS NULL;

ALTER TABLE public.conversations
  ADD COLUMN IF NOT EXISTS customer_code_verified_at timestamptz;

CREATE TABLE IF NOT EXISTS public.customer_code_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  success boolean NOT NULL DEFAULT false,
  attempted_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS customer_code_attempts_visitor_time_idx
  ON public.customer_code_attempts (visitor_id, attempted_at DESC);

ALTER TABLE public.customer_code_attempts ENABLE ROW LEVEL SECURITY;
