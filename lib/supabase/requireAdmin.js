import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * GhostWriterHunt — server-side admin check for Route Handlers.
 * Independent of middleware (defense in depth): confirms the caller has a
 * valid cookie session AND is in admins, using the caller's own
 * cookie-bound client (so any DB calls the caller makes after this stay
 * under normal RLS, not the service role).
 */
export async function requireAdmin() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { supabase, user: null, isAdmin: false };

  const { data: adminRow } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  return { supabase, user, isAdmin: !!adminRow };
}
