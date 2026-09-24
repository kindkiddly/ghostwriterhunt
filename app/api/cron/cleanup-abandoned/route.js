import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * GhostWriterHunt — Cron: delete abandoned chat data older than 30 days
 * Called daily by Supabase pg_cron + pg_net (see migration 005),
 * authenticated via the x-cron-secret header. Removes conversations with
 * no CRM contact that have been inactive for 30+ days, then deletes
 * anonymous auth users who no longer own any conversation.
 */

const RETENTION_DAYS = 30;

export async function POST(request) {
  const secret = process.env.CRON_SECRET;
  const provided = request.headers.get("x-cron-secret");
  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const cutoff = new Date(
    Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();

  const { data: cleanup, error: rpcError } = await admin.rpc(
    "cleanup_abandoned_conversations",
    { p_cutoff: cutoff }
  );

  if (rpcError) {
    console.error("cron/cleanup-abandoned: RPC failed", rpcError);
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }

  const orphanIds = cleanup?.orphan_visitor_ids || [];
  let usersDeleted = 0;
  let usersSkipped = 0;

  for (const userId of orphanIds) {
    try {
      const { data: userData, error: getError } =
        await admin.auth.admin.getUserById(userId);

      if (getError || !userData?.user) {
        usersSkipped += 1;
        continue;
      }

      if (!userData.user.is_anonymous) {
        usersSkipped += 1;
        continue;
      }

      const { error: deleteError } = await admin.auth.admin.deleteUser(userId);
      if (deleteError) {
        console.error(
          "cron/cleanup-abandoned: failed to delete user",
          userId,
          deleteError
        );
        usersSkipped += 1;
        continue;
      }

      usersDeleted += 1;
    } catch (err) {
      console.error("cron/cleanup-abandoned: user cleanup error", userId, err);
      usersSkipped += 1;
    }
  }

  return NextResponse.json({
    cutoff,
    conversationsDeleted: cleanup?.conversations_deleted ?? 0,
    orphanCandidates: orphanIds.length,
    usersDeleted,
    usersSkipped,
  });
}
