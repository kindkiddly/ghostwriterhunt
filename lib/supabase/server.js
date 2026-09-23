import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * GhostWriterHunt — Supabase server client (cookie-based session, anon key).
 * Use in Server Components and Route Handlers that need to read the
 * logged-in admin's session. Route Handlers that need to SET cookies
 * (login/logout) build their own client inline instead, since this one's
 * setAll() is a no-op (Server Components can't set cookies).
 */
export function createServerSupabaseClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // No-op: Server Components can't set cookies; middleware already
          // refreshes the session on every request.
        },
      },
    }
  );
}
