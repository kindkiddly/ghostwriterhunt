import { Resend } from "resend";
import { customerCodeEmailLine, getProjectProgressLabel } from "@/lib/crm/customerCode";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const PROGRESS_BLURBS = {
  0: "We're in the consultation phase and aligning on your book goals.",
  25: "Great news — writing on your project has officially started.",
  50: "You're halfway there. Our team is making strong progress on your book.",
  75: "Your manuscript is in review — we're polishing everything with care.",
  100: "Congratulations — your project is marked complete. Thank you for trusting GhostWriterHunt.",
};

export async function sendProjectProgressEmail({ to, name, customerCode, projectProgress }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Email service not configured");
  }

  const stage = getProjectProgressLabel(projectProgress);
  if (stage == null) {
    throw new Error("Invalid project progress");
  }

  const firstName = name?.trim().split(/\s+/)[0] || "there";
  const blurb = PROGRESS_BLURBS[projectProgress] || "Here's a quick update on your book project.";
  const codeLine = customerCodeEmailLine(customerCode);
  const subject = `Your book is ${projectProgress}% complete`;

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#1C1C1C;">
    <h2 style="color:#1C1C1C;margin:0 0 16px;">Project update from GhostWriterHunt</h2>
    <p style="color:#333333;">Hi ${escapeHtml(firstName)},</p>
    <p style="color:#333333;">Your book is <strong>${projectProgress}% complete</strong> — <strong>${escapeHtml(stage)}</strong>.</p>
    <p style="color:#333333;">${escapeHtml(blurb)}</p>
    ${codeLine ? `<p style="color:#666666;font-size:14px;margin-top:20px;">${escapeHtml(codeLine)}</p>` : ""}
    <p style="color:#666666;font-size:13px;margin-top:24px;">Questions? Reply to this email and our team will help.</p>
  </div>`;

  const text = [
    `Hi ${firstName},`,
    "",
    `Your book is ${projectProgress}% complete — ${stage}.`,
    blurb,
    "",
    codeLine,
    "",
    "Questions? Reply to this email and our team will help.",
  ]
    .filter(Boolean)
    .join("\n");

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "GhostWriterHunt <ghostwriterhunt@lumexforge.com>",
    to,
    replyTo: "ghostwriterhunt@lumexforge.com",
    subject,
    html,
    text,
  });

  if (error) {
    throw new Error(error.message || "Failed to send progress email");
  }
}

export function appendProgressEmailNote(existingNotes, projectProgress) {
  const stamp = new Date().toISOString().slice(0, 10);
  const stage = getProjectProgressLabel(projectProgress);
  const entry = `[${stamp}] Project progress email sent (${projectProgress}% — ${stage}).`;
  const base = (existingNotes || "").trim();
  return base ? `${base}\n\n${entry}` : entry;
}
