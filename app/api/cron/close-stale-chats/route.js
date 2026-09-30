import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const STALE_HOURS = 24;

/**
 * Closes open conversations with no activity for 24+ hours.
 * Called hourly by pg_cron (migration 012).
 */
export async function POST(request) {
  const secret = process.env.CRON_SECRET;
  const provided = request.headers.get("x-cron-secret");
  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const cutoff = new Date(Date.now() - STALE_HOURS * 60 * 60 * 1000).toISOString();

  const { data, error } = await admin.rpc("close_stale_open_conversations", {
    p_cutoff: cutoff,
  });

  if (error) {
    console.error("cron/close-stale-chats: RPC failed", error);
    return NextResponse.json({ error: "Close stale chats failed" }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    closed: data?.closed ?? 0,
  });
}
