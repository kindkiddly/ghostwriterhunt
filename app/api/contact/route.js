import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * GhostWriterHunt — Contact form submission handler
 * Mirrors the fields collected by components/ContactForm.js.
 */

const FIELD_LABELS = {
  fullName: "Full Name",
  email: "Email Address",
  phone: "Phone Number",
  genre: "Book Genre",
  projectType: "Project Type",
  about: "Tell us about your book",
  referral: "How did you hear about us?",
};

const REQUIRED_FIELDS = ["fullName", "email", "genre", "projectType", "about"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeHeaderValue(value) {
  return String(value).replace(/[\r\n]+/g, " ").trim();
}

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  for (const field of REQUIRED_FIELDS) {
    if (!body?.[field] || !String(body[field]).trim()) {
      return NextResponse.json(
        { error: `${FIELD_LABELS[field]} is required` },
        { status: 400 }
      );
    }
  }

  const { fullName, email, phone, genre, projectType, about, referral } = body;

  if (!EMAIL_REGEX.test(String(email).trim())) {
    return NextResponse.json(
      { error: "Please provide a valid email address" },
      { status: 400 }
    );
  }

  const fields = { fullName, email, phone, genre, projectType, about, referral };

  const rowsHtml = Object.entries(fields)
    .filter(([, value]) => value)
    .map(([key, value]) => {
      const safeValue = escapeHtml(value).replace(/\n/g, "<br />");
      return `<tr>
        <td style="padding:8px 12px;font-weight:600;color:#1C1C1C;white-space:nowrap;vertical-align:top;">${escapeHtml(FIELD_LABELS[key])}</td>
        <td style="padding:8px 12px;color:#333333;">${safeValue}</td>
      </tr>`;
    })
    .join("");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
    <h2 style="color:#1C1C1C;">New inquiry from ${escapeHtml(fullName)}</h2>
    <table style="width:100%;border-collapse:collapse;">${rowsHtml}</table>
  </div>`;

  const text = Object.entries(fields)
    .filter(([, value]) => value)
    .map(([key, value]) => `${FIELD_LABELS[key]}: ${value}`)
    .join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "GhostWriterHunt <noreply@lumexforge.com>",
      to: "ghostwriterhunt@lumexforge.com",
      replyTo: email,
      subject: `New inquiry from ${sanitizeHeaderValue(fullName)} — GhostWriterHunt`,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
