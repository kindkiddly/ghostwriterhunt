import { createClient } from "@supabase/supabase-js";

/**
 * GhostWriterHunt — Supabase admin client (service role key, bypasses RLS).
 * Server-only: import this ONLY from app/api/** route handlers, never from
 * a "use client" component — SUPABASE_SERVICE_ROLE_KEY must never reach
 * the browser bundle.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
