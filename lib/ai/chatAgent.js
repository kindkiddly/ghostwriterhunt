import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";
import { buildSystemPrompt } from "@/lib/ai/systemPrompt";
import {
  buildVerifiedCustomerContextBlock,
  contactFirstName,
} from "@/lib/crm/customerCode";
import {
  maybeCreateAiPaymentLink,
  responseRequestsPaymentLink,
  stripPaymentLinkToken,
} from "@/lib/ai/paymentLink";
import {
  buildProjectSummaryContextBlock,
  maybeSaveProjectSummaryFromReply,
  shouldIncludeProjectSummaryInContext,
  stripProjectSummaryToken,
} from "@/lib/ai/projectSummary";
import {
  parseCallbackToken,
  stripCallbackToken,
  validateCallbackPhone,
} from "@/lib/ai/callbackPhone";

const MAX_HISTORY = 24;
const MAX_AI_REPLIES_PER_HOUR = 40;
const MAX_OUTPUT_TOKENS = 450;
const MAX_BUBBLES = 2;
const MIN_TYPING_DELAY_MS = 400;
const MAX_TYPING_DELAY_MS = 1400;
const ANTHROPIC_TIMEOUT_MS = 20_000;
const ANTHROPIC_MAX_ATTEMPTS = 2;
/** Whole AI turn (API + retries + bubble delays); must stay below route maxDuration. */
export const AI_TURN_BUDGET_MS = 55_000;
const DEFAULT_DAILY_REPLY_CAP = 500;
const FALLBACK_AI_MESSAGE =
  "Thanks for your message. A member of our team will reply shortly.";

const HANDOVER_PATTERN =
  /\b(speak to (a )?(human|person|someone|agent|manager|representative)|talk to (a )?(human|person|someone|real person)|call me|phone call|callback|human representative|real person|actual person|not a bot|are you (a )?(ai|bot|robot|real)|custom quote|complaint|not happy|unsatisfied|refund|supervisor|representative|someone from (the )?team)\b/i;

function getDailyReplyCap() {
  const raw = process.env.AI_DAILY_REPLY_CAP;
  const n = raw != null ? parseInt(String(raw), 10) : DEFAULT_DAILY_REPLY_CAP;
  return Number.isFinite(n) && n > 0 ? n : DEFAULT_DAILY_REPLY_CAP;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function typingDelayMs(charCount) {
  const ms = 400 + charCount * 12;
  return Math.min(Math.max(MIN_TYPING_DELAY_MS, ms), MAX_TYPING_DELAY_MS);
}

function isAiTurnBudgetExpired(deadlineMs) {
  return Date.now() >= deadlineMs;
}

function sleepWithinBudget(deadlineMs, charCount) {
  const delay = typingDelayMs(charCount);
  const remaining = deadlineMs - Date.now();
  if (remaining <= 80) return Promise.resolve();
  return sleep(Math.min(delay, remaining - 80));
}

export function splitIntoBubbles(text, maxBubbles = MAX_BUBBLES) {
  const cleaned = text.replace(/\r\n/g, "\n").trim();
  if (!cleaned) return [];

  const paragraphs = cleaned.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  if (paragraphs.length > 1) {
    if (paragraphs.length <= maxBubbles) return paragraphs;
    const head = paragraphs.slice(0, maxBubbles - 1);
    const tail = paragraphs.slice(maxBubbles - 1).join("\n\n");
    return [...head, tail];
  }

  const block = paragraphs[0] || cleaned;
  if (block.length <= 280) return [block];

  const sentences = block.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [block];
  const out = [];
  let chunk = "";
  for (const sentence of sentences) {
    const next = `${chunk}${sentence}`.trim();
    if (next.length > 220 && chunk) {
      out.push(chunk.trim());
      chunk = sentence;
    } else {
      chunk = next;
    }
    if (out.length >= maxBubbles - 1) break;
  }
  if (chunk.trim()) {
    if (out.length >= maxBubbles) {
      out[maxBubbles - 1] = `${out[maxBubbles - 1]} ${chunk}`.trim();
    } else {
      out.push(chunk.trim());
    }
  }
  return out.slice(0, maxBubbles);
}

function stripHandoverToken(text) {
  return text.replace(/\n?\[HANDOVER\]\s*$/i, "").trim();
}

function responseRequestsHandover(text) {
  return /\[HANDOVER\]/i.test(text);
}

async function disableAiForConversation(admin, conversationId) {
  const { error } = await admin
    .from("conversations")
    .update({ ai_enabled: false })
    .eq("id", conversationId);
  if (error) console.error("chatAgent: failed to disable AI", error);
}

async function recordCallbackRequest(admin, conversationId, reason) {
  const { error } = await admin
    .from("conversations")
    .update({
      callback_requested_at: new Date().toISOString(),
      callback_reason: reason,
      callback_status: "pending",
    })
    .eq("id", conversationId);

  if (error) console.error("chatAgent: failed to record callback request", error);
}

async function sendHandoverAlert({
  name,
  email,
  phone,
  country,
  reason,
  lastVisitorMessage,
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("chatAgent: RESEND_API_KEY not set, skipping handover alert");
    return;
  }

  const rows = [
    name && ["Name", name],
    email && ["Email", email],
    phone && ["Phone", phone],
    country && ["Country", country],
    reason && ["Reason", reason],
  ].filter(Boolean);

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;color:#1C1C1C;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#333333;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
    <h2 style="color:#1C1C1C;">Callback requested (live chat)</h2>
    <p style="color:#333333;">A visitor needs a human follow-up.</p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">${rowsHtml}</table>
    <p style="font-weight:600;color:#1C1C1C;margin:0 0 4px;">Latest visitor message</p>
    <p style="color:#333333;white-space:pre-wrap;margin:0;">${escapeHtml(lastVisitorMessage)}</p>
  </div>`;

  const text = [
    "A visitor needs a human follow-up.",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Latest visitor message:",
    lastVisitorMessage,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "GhostWriterHunt Chat <noreply@lumexforge.com>",
      to: "ghostwriterhunt@lumexforge.com",
      subject: "Callback requested | GhostWriterHunt live chat",
      html,
      text,
    });
    if (error) console.error("chatAgent: handover email error", error);
  } catch (err) {
    console.error("chatAgent: failed to send handover alert", err);
  }
}

/** Anthropic requires strict user/assistant alternation — merge split AI bubbles. */
export function buildClaudeMessages(history) {
  const merged = [];
  for (const row of history || []) {
    const role = row.sender === "visitor" ? "user" : "assistant";
    const content = String(row.content || "").trim();
    if (!content) continue;
    const last = merged[merged.length - 1];
    if (last && last.role === role) {
      last.content = `${last.content}\n\n${content}`;
    } else {
      merged.push({ role, content });
    }
  }
  while (merged.length > 0 && merged[0].role !== "user") {
    merged.shift();
  }
  return merged;
}

/** Ensure the current visitor turn is in Claude history (newest window may omit it). */
export function ensureCurrentVisitorInClaudeMessages(claudeMessages, visitorMessage) {
  const trimmed = String(visitorMessage || "").trim();
  if (!trimmed) return claudeMessages || [];

  const messages = [...(claudeMessages || [])];
  const last = messages[messages.length - 1];
  if (last?.role === "user" && last.content.includes(trimmed)) {
    return messages;
  }
  if (last?.role === "user") {
    last.content = `${last.content}\n\n${trimmed}`.trim();
    return messages;
  }
  messages.push({ role: "user", content: trimmed });
  return messages;
}

function logAnthropicError(context, err) {
  const payload = {
    context,
    message: err?.message || String(err),
    status: err?.status ?? err?.statusCode ?? null,
    type: err?.error?.type ?? err?.type ?? null,
    code: err?.code ?? null,
  };
  console.error("chatAgent: Anthropic error", JSON.stringify(payload));
}

async function countGlobalAiRepliesLast24h(admin) {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count, error } = await admin
    .from("messages")
    .select("id", { count: "exact", head: true })
    .eq("sender", "ai")
    .gte("created_at", oneDayAgo);
  if (error) {
    console.error("chatAgent: global AI count failed", error);
    return 0;
  }
  return count ?? 0;
}

async function callAnthropicWithRetry(client, params, deadlineMs) {
  let lastErr;
  for (let attempt = 1; attempt <= ANTHROPIC_MAX_ATTEMPTS; attempt += 1) {
    if (deadlineMs && isAiTurnBudgetExpired(deadlineMs)) {
      const err = new Error("AI turn time budget exceeded");
      err.code = "AI_TURN_BUDGET";
      throw err;
    }
    try {
      const remaining = deadlineMs ? deadlineMs - Date.now() : ANTHROPIC_TIMEOUT_MS;
      const timeout = Math.min(
        ANTHROPIC_TIMEOUT_MS,
        Math.max(1000, remaining - 200)
      );
      return await client.messages.create(params, { timeout });
    } catch (err) {
      lastErr = err;
      logAnthropicError(`messages.create attempt ${attempt}`, err);
      if (attempt < ANTHROPIC_MAX_ATTEMPTS) {
        if (deadlineMs && deadlineMs - Date.now() < 1200) {
          throw lastErr;
        }
        await sleep(400);
      }
    }
  }
  throw lastErr;
}

async function conversationHasFallbackMessage(admin, conversationId) {
  const { count, error } = await admin
    .from("messages")
    .select("id", { count: "exact", head: true })
    .eq("conversation_id", conversationId)
    .eq("sender", "ai")
    .eq("content", FALLBACK_AI_MESSAGE);
  if (error) {
    console.error("chatAgent: fallback check failed", error);
    return false;
  }
  return (count ?? 0) > 0;
}

async function runFailureFallback({
  admin,
  conversationId,
  visitorMessage,
  contactName,
  visitorName,
  visitorEmail,
  country,
  reason,
}) {
  console.error(
    "chatAgent: running failure fallback",
    JSON.stringify({ conversationId, reason })
  );

  if (await conversationHasFallbackMessage(admin, conversationId)) {
    await disableAiForConversation(admin, conversationId);
    return;
  }

  const { data: disabledRow, error: disableErr } = await admin
    .from("conversations")
    .update({ ai_enabled: false })
    .eq("id", conversationId)
    .eq("ai_enabled", true)
    .select("id")
    .maybeSingle();

  if (disableErr) {
    console.error("chatAgent: failed to disable AI during fallback", disableErr);
  }

  if (!disabledRow) {
    if (await conversationHasFallbackMessage(admin, conversationId)) {
      return;
    }
  }

  if (await conversationHasFallbackMessage(admin, conversationId)) {
    return;
  }

  const { error: insertError } = await admin.from("messages").insert({
    conversation_id: conversationId,
    sender: "ai",
    content: FALLBACK_AI_MESSAGE,
  });
  if (insertError) {
    console.error("chatAgent: failed to insert fallback message", insertError);
    await disableAiForConversation(admin, conversationId);
    return;
  }

  await recordCallbackRequest(admin, conversationId, reason);
  await sendHandoverAlert({
    name: contactName || visitorName || null,
    email: visitorEmail || null,
    country,
    reason,
    lastVisitorMessage: visitorMessage,
  });
}

async function completeHandover({
  admin,
  conversationId,
  visitorMessage,
  contactName,
  visitorName,
  visitorEmail,
  country,
  fromVisitorPattern,
}) {
  const reason = fromVisitorPattern
    ? "Visitor asked for a human representative"
    : "Visitor requested team follow-up";
  await recordCallbackRequest(admin, conversationId, reason);
  await sendHandoverAlert({
    name: contactName || visitorName || null,
    email: visitorEmail || null,
    country,
    reason,
    lastVisitorMessage: visitorMessage,
  });
  await disableAiForConversation(admin, conversationId);
}

export async function generateAndSaveAiReplies(params) {
  try {
    await generateAndSaveAiRepliesInner(params);
  } catch (err) {
    logAnthropicError("generateAndSaveAiReplies unhandled", err);
    await runFailureFallback({
      admin: params.admin,
      conversationId: params.conversationId,
      visitorMessage: params.visitorMessage,
      contactName: null,
      visitorName: params.visitorName,
      visitorEmail: params.visitorEmail,
      country: params.country,
      reason: "Unhandled AI pipeline error",
    });
  }
}

async function generateAndSaveAiRepliesInner({
  admin,
  conversationId,
  visitorMessage,
  isNewConversation,
  visitorName,
  visitorEmail,
  country,
  region,
  contactHasEmail,
}) {
  const deadlineMs = Date.now() + AI_TURN_BUDGET_MS;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";
  if (!apiKey) {
    console.warn("chatAgent: ANTHROPIC_API_KEY not set, skipping AI reply");
    return;
  }

  const { data: conv, error: convError } = await admin
    .from("conversations")
    .select(
      "id, ai_enabled, status, country, region, contact_id, customer_code_verified_at, created_at"
    )
    .eq("id", conversationId)
    .maybeSingle();

  if (convError || !conv) {
    console.error("chatAgent: conversation lookup failed", convError);
    await runFailureFallback({
      admin,
      conversationId,
      visitorMessage,
      contactName: null,
      visitorName,
      visitorEmail,
      country,
      reason: "Conversation lookup failed",
    });
    return;
  }
  if (conv.status !== "open" || !conv.ai_enabled) {
    console.warn(
      "chatAgent: skipping AI — conversation not eligible",
      JSON.stringify({ conversationId, status: conv.status, ai_enabled: conv.ai_enabled })
    );
    return;
  }

  const globalAiCount = await countGlobalAiRepliesLast24h(admin);
  if (globalAiCount >= getDailyReplyCap()) {
    console.warn("chatAgent: global daily AI reply cap reached");
    await runFailureFallback({
      admin,
      conversationId,
      visitorMessage,
      contactName: null,
      visitorName,
      visitorEmail,
      country: country || conv.country || null,
      reason: "Global daily AI reply cap reached",
    });
    return;
  }

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count: aiCount } = await admin
    .from("messages")
    .select("id", { count: "exact", head: true })
    .eq("conversation_id", conversationId)
    .eq("sender", "ai")
    .gte("created_at", oneHourAgo);

  if ((aiCount ?? 0) >= MAX_AI_REPLIES_PER_HOUR) {
    console.warn("chatAgent: AI rate limit reached for conversation", conversationId);
    await runFailureFallback({
      admin,
      conversationId,
      visitorMessage,
      contactName: null,
      visitorName,
      visitorEmail,
      country: country || conv.country || null,
      reason: "Conversation AI rate limit reached",
    });
    return;
  }

  const { data: historyNewest, error: historyError } = await admin
    .from("messages")
    .select("sender, content, created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: false })
    .limit(MAX_HISTORY);

  if (historyError) {
    console.error("chatAgent: history load failed", historyError);
    await runFailureFallback({
      admin,
      conversationId,
      visitorMessage,
      contactName: null,
      visitorName,
      visitorEmail,
      country: country || conv.country || null,
      reason: "Message history load failed",
    });
    return;
  }

  let contactName = visitorName || null;
  let contactEmailForAlerts = visitorEmail || null;
  let hasPhone = false;
  const customerCodeVerified = !!conv.customer_code_verified_at;
  let verifiedCustomerContext = "";
  let projectSummaryContext = "";

  if (conv.contact_id) {
    const { data: contactRow } = await admin
      .from("contacts")
      .select(
        "name, email, phone, customer_code, project_progress, project_summary, project_summary_updated_at"
      )
      .eq("id", conv.contact_id)
      .maybeSingle();
    if (contactRow) {
      if (!contactName && contactRow.name) contactName = contactRow.name;
      if (contactRow.email) contactEmailForAlerts = contactRow.email;
      hasPhone = !!contactRow.phone;

      const includeProjectSummary = shouldIncludeProjectSummaryInContext({
        customerCodeVerified,
        contactId: conv.contact_id,
        projectSummary: contactRow.project_summary,
        projectSummaryUpdatedAt: contactRow.project_summary_updated_at,
        conversationCreatedAt: conv.created_at,
      });

      if (customerCodeVerified) {
        const { data: paidPayments } = await admin
          .from("payments")
          .select("description, amount_cents, paid_at")
          .eq("contact_id", conv.contact_id)
          .eq("status", "paid")
          .order("paid_at", { ascending: false })
          .limit(15);

        verifiedCustomerContext = buildVerifiedCustomerContextBlock({
          firstName: contactFirstName(contactRow.name),
          customerCode: contactRow.customer_code,
          projectProgress: contactRow.project_progress,
          projectSummary: contactRow.project_summary,
          paidPayments: paidPayments || [],
        });
      } else if (includeProjectSummary) {
        projectSummaryContext = buildProjectSummaryContextBlock(
          contactRow.project_summary,
          contactRow.project_summary_updated_at
        );
      }
    }
  }

  const historyChronological = (historyNewest || []).slice().reverse();
  const claudeMessages = ensureCurrentVisitorInClaudeMessages(
    buildClaudeMessages(historyChronological),
    visitorMessage
  );
  if (claudeMessages.length === 0) {
    console.error("chatAgent: empty Claude message history after merge", {
      conversationId,
      historyRows: historyChronological.length,
    });
    await runFailureFallback({
      admin,
      conversationId,
      visitorMessage,
      contactName,
      visitorName,
      visitorEmail,
      country: country || conv.country || null,
      reason: "No valid alternating message history for AI",
    });
    return;
  }

  const system = buildSystemPrompt({
    country: country || conv.country,
    region: region || conv.region,
    contactName,
    hasEmail: contactHasEmail,
    hasPhone,
    isNewConversation,
    customerCodeVerified,
    verifiedCustomerContext,
    projectSummaryContext,
  });

  if (isAiTurnBudgetExpired(deadlineMs)) {
    await runFailureFallback({
      admin,
      conversationId,
      visitorMessage,
      contactName,
      visitorName,
      visitorEmail,
      country: country || conv.country || null,
      reason: "AI turn time budget exceeded",
    });
    return;
  }

  let rawReply = "";
  try {
    const client = new Anthropic({ apiKey });
    const response = await callAnthropicWithRetry(
      client,
      {
        model,
        max_tokens: MAX_OUTPUT_TOKENS,
        system,
        messages: claudeMessages,
      },
      deadlineMs
    );

    rawReply = (response.content || [])
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();
  } catch (err) {
    logAnthropicError("messages.create exhausted retries", err);
    await runFailureFallback({
      admin,
      conversationId,
      visitorMessage,
      contactName,
      visitorName,
      visitorEmail,
      country: country || conv.country || null,
      reason:
        err?.code === "AI_TURN_BUDGET"
          ? "AI turn time budget exceeded"
          : "AI API failure after retry",
    });
    return;
  }

  if (!rawReply) {
    await runFailureFallback({
      admin,
      conversationId,
      visitorMessage,
      contactName,
      visitorName,
      visitorEmail,
      country: country || conv.country || null,
      reason: "AI returned empty reply",
    });
    return;
  }

  const needsHandover =
    HANDOVER_PATTERN.test(visitorMessage) || responseRequestsHandover(rawReply);
  const wantsPaymentLink = responseRequestsPaymentLink(rawReply);
  const callbackRaw = parseCallbackToken(rawReply);
  const callbackPhone = callbackRaw ? validateCallbackPhone(callbackRaw) : null;
  if (callbackRaw && !callbackPhone) {
    console.warn("chatAgent: invalid [CALLBACK] phone token, not saving", {
      conversationId,
    });
  }

  const replyText = stripProjectSummaryToken(
    stripPaymentLinkToken(stripCallbackToken(stripHandoverToken(rawReply)))
  );
  const bubbles = splitIntoBubbles(replyText);

  if (bubbles.length === 0 && !needsHandover) {
    await runFailureFallback({
      admin,
      conversationId,
      visitorMessage,
      contactName,
      visitorName,
      visitorEmail,
      country: country || conv.country || null,
      reason: "AI reply had no deliverable content",
    });
    return;
  }

  let bubblesDelivered = 0;
  for (let i = 0; i < bubbles.length; i += 1) {
    if (isAiTurnBudgetExpired(deadlineMs) && bubblesDelivered === 0) {
      await runFailureFallback({
        admin,
        conversationId,
        visitorMessage,
        contactName,
        visitorName,
        visitorEmail,
        country: country || conv.country || null,
        reason: "AI turn time budget exceeded",
      });
      return;
    }

    const { data: freshConv } = await admin
      .from("conversations")
      .select("ai_enabled, status")
      .eq("id", conversationId)
      .maybeSingle();

    if (!freshConv || freshConv.status !== "open" || !freshConv.ai_enabled) {
      if (bubblesDelivered === 0) {
        await runFailureFallback({
          admin,
          conversationId,
          visitorMessage,
          contactName,
          visitorName,
          visitorEmail,
          country: country || conv.country || null,
          reason: "Conversation closed before AI reply could be saved",
        });
      }
      return;
    }

    if (i > 0) {
      await sleepWithinBudget(deadlineMs, bubbles[i - 1].length);
    }

    const { error: insertError } = await admin.from("messages").insert({
      conversation_id: conversationId,
      sender: "ai",
      content: bubbles[i],
    });

    if (insertError) {
      console.error("chatAgent: failed to insert AI message", insertError);
      if (bubblesDelivered === 0) {
        await runFailureFallback({
          admin,
          conversationId,
          visitorMessage,
          contactName,
          visitorName,
          visitorEmail,
          country: country || conv.country || null,
          reason: "Failed to save AI message",
        });
      }
      return;
    }
    bubblesDelivered += 1;
  }

  if (conv.contact_id) {
    await maybeSaveProjectSummaryFromReply({
      admin,
      contactId: conv.contact_id,
      rawReply,
    });
  }

  if (callbackPhone) {
    if (conv.contact_id) {
      const { error: phoneErr } = await admin
        .from("contacts")
        .update({ phone: callbackPhone })
        .eq("id", conv.contact_id);
      if (phoneErr) {
        console.error("chatAgent: failed to save callback phone on contact", phoneErr);
      }
    }
    const callbackReason = `Callback requested — ${callbackPhone}`;
    await recordCallbackRequest(admin, conversationId, callbackReason);
    await sendHandoverAlert({
      name: contactName || visitorName || null,
      email: contactEmailForAlerts,
      phone: callbackPhone,
      country: country || conv.country || null,
      reason: callbackReason,
      lastVisitorMessage: visitorMessage,
    });
  }

  if (wantsPaymentLink && contactHasEmail) {
    const paymentUrl = await maybeCreateAiPaymentLink({
      admin,
      conversationId,
      contactId: conv.contact_id,
      contactHasEmail,
      visitorEmail: visitorEmail || null,
      rawReply,
    });
    if (paymentUrl) {
      await sleepWithinBudget(deadlineMs, 120);
      await admin.from("messages").insert({
        conversation_id: conversationId,
        sender: "ai",
        content: `Here is your secure payment link to complete what we agreed on:\n${paymentUrl}`,
      });
    }
  }

  if (needsHandover) {
    await completeHandover({
      admin,
      conversationId,
      visitorMessage,
      contactName,
      visitorName,
      visitorEmail,
      country: country || conv.country || null,
      fromVisitorPattern: HANDOVER_PATTERN.test(visitorMessage),
    });
  }
}
