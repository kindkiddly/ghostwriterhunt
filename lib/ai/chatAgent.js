import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";
import { buildSystemPrompt } from "@/lib/ai/systemPrompt";
import {
  maybeCreateAiPaymentLink,
  responseRequestsPaymentLink,
  stripPaymentLinkToken,
} from "@/lib/ai/paymentLink";

const MAX_HISTORY = 24;
const MAX_AI_REPLIES_PER_HOUR = 40;
const MAX_OUTPUT_TOKENS = 450;
const MAX_BUBBLES = 3;
const MIN_TYPING_DELAY_MS = 2000;
const MAX_TYPING_DELAY_MS = 6000;

const HANDOVER_PATTERN =
  /\b(speak to (a )?(human|person|someone|agent|manager|representative)|talk to (a )?(human|person|someone|real person)|call me|phone call|callback|human representative|real person|actual person|not a bot|are you (a )?(ai|bot|robot|real)|custom quote|complaint|not happy|unsatisfied|refund|supervisor|representative|someone from (the )?team)\b/i;

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
  const ms = 2000 + charCount * 18;
  return Math.min(Math.max(MIN_TYPING_DELAY_MS, ms), MAX_TYPING_DELAY_MS);
}

/**
 * Split a reply into up to 3 short chat bubbles on paragraph or sentence
 * boundaries so long answers feel human-paced in the widget.
 */
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

async function sendHandoverAlert({ name, email, country, reason, lastVisitorMessage }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("chatAgent: RESEND_API_KEY not set, skipping handover alert");
    return;
  }

  const rows = [
    name && ["Name", name],
    email && ["Email", email],
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
    <h2 style="color:#1C1C1C;">Callback requested — live chat</h2>
    <p style="color:#333333;">A visitor asked to speak with a human representative.</p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">${rowsHtml}</table>
    <p style="font-weight:600;color:#1C1C1C;margin:0 0 4px;">Latest visitor message</p>
    <p style="color:#333333;white-space:pre-wrap;margin:0;">${escapeHtml(lastVisitorMessage)}</p>
  </div>`;

  const text = [
    "A visitor asked to speak with a human representative.",
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
      subject: "Callback requested — GhostWriterHunt live chat",
      html,
      text,
    });
    if (error) console.error("chatAgent: handover email error", error);
  } catch (err) {
    console.error("chatAgent: failed to send handover alert", err);
  }
}

function buildClaudeMessages(history) {
  return history.map((row) => ({
    role: row.sender === "visitor" ? "user" : "assistant",
    content: row.content,
  }));
}

/**
 * Generate Claude Haiku reply(ies) and insert as sender 'ai' with human
 * pacing delays between bubbles. No-op if AI is disabled, key missing,
 * or rate limits exceeded.
 */
export async function generateAndSaveAiReplies({
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
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";
  if (!apiKey) {
    console.warn("chatAgent: ANTHROPIC_API_KEY not set, skipping AI reply");
    return;
  }

  const { data: conv, error: convError } = await admin
    .from("conversations")
    .select("id, ai_enabled, status, country, region, contact_id")
    .eq("id", conversationId)
    .maybeSingle();

  if (convError || !conv) {
    console.error("chatAgent: conversation lookup failed", convError);
    return;
  }
  if (conv.status !== "open" || !conv.ai_enabled) return;

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count: aiCount } = await admin
    .from("messages")
    .select("id", { count: "exact", head: true })
    .eq("conversation_id", conversationId)
    .eq("sender", "ai")
    .gte("created_at", oneHourAgo);

  if ((aiCount ?? 0) >= MAX_AI_REPLIES_PER_HOUR) {
    console.warn("chatAgent: AI rate limit reached for conversation", conversationId);
    return;
  }

  const { data: history, error: historyError } = await admin
    .from("messages")
    .select("sender, content, created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .limit(MAX_HISTORY);

  if (historyError) {
    console.error("chatAgent: history load failed", historyError);
    return;
  }

  let contactName = visitorName || null;
  let hasPhone = false;
  if (conv.contact_id) {
    const { data: contactRow } = await admin
      .from("contacts")
      .select("name, email, phone")
      .eq("id", conv.contact_id)
      .maybeSingle();
    if (contactRow) {
      if (!contactName && contactRow.name) contactName = contactRow.name;
      hasPhone = !!contactRow.phone;
    }
  }

  const system = buildSystemPrompt({
    country: country || conv.country,
    region: region || conv.region,
    contactName,
    hasEmail: contactHasEmail,
    hasPhone,
    isNewConversation,
  });

  let rawReply = "";
  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model,
      max_tokens: MAX_OUTPUT_TOKENS,
      system,
      messages: buildClaudeMessages(history || []),
    });

    rawReply = (response.content || [])
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();
  } catch (err) {
    console.error("chatAgent: Claude API error", err);
    return;
  }

  if (!rawReply) return;

  const needsHandover =
    HANDOVER_PATTERN.test(visitorMessage) || responseRequestsHandover(rawReply);
  const wantsPaymentLink = responseRequestsPaymentLink(rawReply);
  const replyText = stripPaymentLinkToken(stripHandoverToken(rawReply));
  const bubbles = splitIntoBubbles(replyText);

  if (bubbles.length === 0) return;

  for (let i = 0; i < bubbles.length; i += 1) {
    const { data: freshConv } = await admin
      .from("conversations")
      .select("ai_enabled, status")
      .eq("id", conversationId)
      .maybeSingle();

    if (!freshConv || freshConv.status !== "open" || !freshConv.ai_enabled) {
      return;
    }

    const delayChars = i > 0 ? bubbles[i - 1].length : visitorMessage.length;
    await sleep(typingDelayMs(delayChars));

    const { error: insertError } = await admin.from("messages").insert({
      conversation_id: conversationId,
      sender: "ai",
      content: bubbles[i],
    });

    if (insertError) {
      console.error("chatAgent: failed to insert AI message", insertError);
      return;
    }
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
      await sleep(typingDelayMs(120));
      await admin.from("messages").insert({
        conversation_id: conversationId,
        sender: "ai",
        content: `Here is your secure payment link to complete what we agreed on:\n${paymentUrl}`,
      });
    }
  }

  if (needsHandover) {
    const reason = HANDOVER_PATTERN.test(visitorMessage)
      ? "Visitor asked for a human representative"
      : "Visitor requested team follow-up";
    await recordCallbackRequest(admin, conversationId, reason);
    await sendHandoverAlert({
      name: contactName || visitorName || null,
      email: visitorEmail || null,
      country: country || conv.country || null,
      reason,
      lastVisitorMessage: visitorMessage,
    });
  }
}
