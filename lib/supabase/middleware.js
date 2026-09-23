import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

/**
 * GhostWriterHunt — Supabase middleware session helper.
 * Reads/refreshes the auth session from request cookies and mirrors any
 * refreshed cookies onto the response, per the standard @supabase/ssr
 * middleware pattern. Used only by the root middleware.js.
 */
export async function updateSession(request) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request: { headers: request.headers } });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabase, response, user };
}
