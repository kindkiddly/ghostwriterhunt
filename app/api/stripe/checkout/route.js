import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isPaymentsEnabled, isStripeMockMode } from "@/lib/stripe/client";
import {
  getFixedPackage,
  isProfessionalPackageKey,
  normalizeProfessionalBookCount,
  PROFESSIONAL_MIN_BOOKS,
} from "@/lib/stripe/packages";
import { createCheckoutSessionRecord } from "@/lib/stripe/payments";
import { ensureValidEmail } from "@/lib/validation/email.server";

/**
 * GhostWriterHunt — Public checkout for fixed packages ($150 / $200 / $299).
 * POST { packageKey, accessToken?, conversationId?, email? }
 */
export async function POST(request) {
  if (!isPaymentsEnabled()) {
    return NextResponse.json({ error: "Payments are not enabled" }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { packageKey, accessToken, conversationId, email, bookCount } = body || {};
  const pkg = getFixedPackage(packageKey);
  if (!pkg) {
    return NextResponse.json({ error: "Invalid package" }, { status: 400 });
  }

  let resolvedBookCount = null;
  if (isProfessionalPackageKey(packageKey)) {
    resolvedBookCount = normalizeProfessionalBookCount(
      bookCount == null ? PROFESSIONAL_MIN_BOOKS : bookCount
    );
    if (!resolvedBookCount) {
      return NextResponse.json(
        { error: `Professional checkout requires at least ${PROFESSIONAL_MIN_BOOKS} books` },
        { status: 400 }
      );
    }
  } else if (bookCount != null) {
    return NextResponse.json({ error: "bookCount is only valid for Professional" }, { status: 400 });
  }

  let contactId = null;
  let resolvedConversationId = null;
  let customerEmail = typeof email === "string" ? email.trim() : null;
  if (customerEmail) {
    const emailCheck = await ensureValidEmail(customerEmail);
    if (emailCheck.error) {
      return NextResponse.json({ error: emailCheck.error }, { status: 400 });
    }
    customerEmail = emailCheck.normalized;
  }

  if (accessToken) {
    const admin = createAdminClient();
    const { data: userData } = await admin.auth.getUser(accessToken);
    if (userData?.user) {
      const visitorId = userData.user.id;
      if (conversationId) {
        const { data: conv } = await admin
          .from("conversations")
          .select("id, contact_id")
          .eq("id", conversationId)
          .eq("visitor_id", visitorId)
          .maybeSingle();
        if (conv) {
          resolvedConversationId = conv.id;
          contactId = conv.contact_id;
        }
      }
      if (contactId && !customerEmail) {
        const { data: contact } = await admin
          .from("contacts")
          .select("email")
          .eq("id", contactId)
          .maybeSingle();
        customerEmail = contact?.email || null;
      }
    }
  }

  try {
    const result = await createCheckoutSessionRecord({
      packageKey,
      packageInfo: pkg,
      contactId,
      conversationId: resolvedConversationId,
      customerEmail,
      bookCount: resolvedBookCount,
    });
    if (!result.url) {
      return NextResponse.json({ error: "Could not start checkout" }, { status: 500 });
    }
    return NextResponse.json({ url: result.url, mock: isStripeMockMode() });
  } catch (err) {
    console.error("stripe/checkout:", err);
    return NextResponse.json({ error: "Could not start checkout" }, { status: 500 });
  }
}
