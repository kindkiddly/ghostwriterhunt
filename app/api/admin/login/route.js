import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * GhostWriterHunt — Admin login
 * Signs the admin in with Supabase email+password auth (sets the session
 * cookie), then verifies admins membership before confirming success.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, password } = body || {};
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

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

  const { data, error } = await supabase.auth.signInWithPassword({
    email: String(email).trim(),
    password: String(password),
  });

  if (error || !data.user) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const { data: adminRow } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (!adminRow) {
    await supabase.auth.signOut();
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  return NextResponse.json({ success: true });
}
