import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * GhostWriterHunt — Admin route protection.
 * Not logged in -> /admin/login. Logged in but not an admin -> signed out
 * and sent to /admin/login with an "access denied" flag.
 */
export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const { supabase, response, user } = await updateSession(request);

  const isLoginPage = pathname === "/admin/login";

  if (!user) {
    if (isLoginPage) return response;
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  const { data: adminRow } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminRow) {
    await supabase.auth.signOut();
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    url.searchParams.set("error", "access_denied");
    return NextResponse.redirect(url);
  }

  if (isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
