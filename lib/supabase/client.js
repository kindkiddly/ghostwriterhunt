import { createBrowserClient } from "@supabase/ssr";

/**
 * GhostWriterHunt — Supabase browser client (anon key only).
 * Safe to use from "use client" components. Create once per component,
 * e.g. `const [supabase] = useState(() => createClient());`.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
