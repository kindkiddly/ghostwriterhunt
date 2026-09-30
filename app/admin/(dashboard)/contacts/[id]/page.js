"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminRealtime } from "@/lib/admin/AdminRealtimeContext";
import { PROJECT_PROGRESS_OPTIONS } from "@/lib/crm/customerCode";
import { PROJECT_SUMMARY_MAX_LENGTH } from "@/lib/ai/projectSummary";

const CONTACT_STATUSES = ["new", "contacted", "qualified", "client", "closed"];
const NOTES_SAVE_DELAY_MS = 900;

function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContactDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { supabase } = useAdminRealtime();

  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [conversations, setConversations] = useState([]);
  const [notesDraft, setNotesDraft] = useState("");
  const [notesSaving, setNotesSaving] = useState(false);
  const notesTimeoutRef = useRef(null);
  const [summaryDraft, setSummaryDraft] = useState("");
  const [summarySaving, setSummarySaving] = useState(false);
  const summaryTimeoutRef = useRef(null);

  const [emailOpen, setEmailOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const [progressSaving, setProgressSaving] = useState(false);
  const [progressError, setProgressError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase.from("contacts").select("*").eq("id", id).maybeSingle();
      if (cancelled) return;
      if (err || !data) {
        setError(err?.message || "Contact not found");
        setLoading(false);
        return;
      }
      setContact(data);
      setNotesDraft(data.notes || "");
      setSummaryDraft(data.project_summary || "");
      setLoading(false);

      const { data: convs } = await supabase
        .from("conversations")
        .select("id, status, ai_enabled, last_message_at, created_at")
        .eq("contact_id", id)
        .order("created_at", { ascending: false });
      if (!cancelled) setConversations(convs || []);
    }
    load();

    return () => {
      cancelled = true;
    };
  }, [id, supabase]);

  async function updateField(field, value) {
    if (!contact) return;
    setContact((prev) => ({ ...prev, [field]: value }));
    await supabase.from("contacts").update({ [field]: value }).eq("id", id);
  }

  async function updateEmailField(rawValue) {
    if (!contact) return;
    const trimmed = rawValue.trim();
    if (!trimmed) {
      setContact((prev) => ({ ...prev, email: null }));
      await supabase.from("contacts").update({ email: null }).eq("id", id);
      return;
    }
    try {
      const res = await fetch("/api/admin/contacts/validate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data.error || "Please check your email address.");
        setContact((prev) => ({ ...prev, email: contact.email }));
        return;
      }
      setContact((prev) => ({ ...prev, email: data.normalized }));
      await supabase.from("contacts").update({ email: data.normalized }).eq("id", id);
    } catch {
      alert("Could not validate email. Please try again.");
      setContact((prev) => ({ ...prev, email: contact.email }));
    }
  }

  async function handleProjectProgressChange(rawValue) {
    if (!contact) return;
    const projectProgress = rawValue === "" ? null : parseInt(rawValue, 10);
    setProgressError(null);
    setProgressSaving(true);
    try {
      const res = await fetch("/api/admin/contacts/project-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId: id, projectProgress }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setProgressError(data.error || "Could not update project progress");
        return;
      }
      setContact((prev) => ({ ...prev, project_progress: data.projectProgress ?? null }));
      if (data.emailed) {
        const { data: refreshed } = await supabase.from("contacts").select("notes").eq("id", id).maybeSingle();
        if (refreshed) setNotesDraft(refreshed.notes || "");
      }
    } catch {
      setProgressError("Network error — please try again.");
    } finally {
      setProgressSaving(false);
    }
  }

  function handleNotesChange(value) {
    setNotesDraft(value);
    if (notesTimeoutRef.current) clearTimeout(notesTimeoutRef.current);
    setNotesSaving(true);
    notesTimeoutRef.current = setTimeout(async () => {
      await supabase.from("contacts").update({ notes: value }).eq("id", id);
      setNotesSaving(false);
    }, NOTES_SAVE_DELAY_MS);
  }

  function handleSummaryChange(value) {
    const trimmed = value.slice(0, PROJECT_SUMMARY_MAX_LENGTH);
    setSummaryDraft(trimmed);
    if (summaryTimeoutRef.current) clearTimeout(summaryTimeoutRef.current);
    setSummarySaving(true);
    summaryTimeoutRef.current = setTimeout(async () => {
      const now = new Date().toISOString();
      const payload = {
        project_summary: trimmed.trim() || null,
        project_summary_updated_at: trimmed.trim() ? now : null,
      };
      await supabase.from("contacts").update(payload).eq("id", id);
      setContact((prev) => (prev ? { ...prev, ...payload } : prev));
      setSummarySaving(false);
    }, NOTES_SAVE_DELAY_MS);
  }

  useEffect(() => {
    return () => {
      if (notesTimeoutRef.current) clearTimeout(notesTimeoutRef.current);
      if (summaryTimeoutRef.current) clearTimeout(summaryTimeoutRef.current);
    };
  }, []);

  async function handleSendEmail(e) {
    e.preventDefault();
    setEmailSending(true);
    setEmailStatus(null);

    try {
      const res = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId: id, subject: emailSubject, message: emailMessage }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setEmailStatus({ ok: false, message: data.error || "Failed to send email" });
      } else {
        setEmailStatus({ ok: true, message: "Email sent." });
        setEmailSubject("");
        setEmailMessage("");
        // Refresh notes to show the logged entry.
        const { data: refreshed } = await supabase.from("contacts").select("notes").eq("id", id).maybeSingle();
        if (refreshed) setNotesDraft(refreshed.notes || "");
      }
    } catch {
      setEmailStatus({ ok: false, message: "Network error — please try again." });
    }
    setEmailSending(false);
  }

  if (loading) {
    return <p className="px-4 py-6 font-inter text-[13px] text-[#999999]">Loading contact…</p>;
  }
  if (error || !contact) {
    return <p className="px-4 py-6 font-inter text-[13px] text-[#9A2E24]">Couldn&apos;t load contact: {error}</p>;
  }

  return (
    <div className="h-full min-h-0 overflow-y-auto px-4 py-5 lg:px-8 lg:py-8">
      <button
        type="button"
        onClick={() => router.push("/admin/contacts")}
        className="mb-4 flex items-center gap-1.5 font-inter text-[13px] font-medium text-[#666666] hover:text-[var(--color-text)]"
      >
        <BackIcon /> All contacts
      </button>

      <h1 className="mb-6 font-playfair text-[24px] font-bold text-[var(--color-text)]">
        {contact.name || "Unnamed contact"}
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <h2 className="mb-4 font-playfair text-[16px] font-bold text-[var(--color-text)]">Details</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-inter text-[12px] font-medium text-[#666666]">Name</label>
                <input
                  defaultValue={contact.name || ""}
                  onBlur={(e) => updateField("name", e.target.value.trim() || null)}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] outline-none focus:border-[var(--color-accent-gold)]"
                />
              </div>
              <div>
                <label className="mb-1 block font-inter text-[12px] font-medium text-[#666666]">Email</label>
                <input
                  key={contact.email || "no-email"}
                  defaultValue={contact.email || ""}
                  onBlur={(e) => updateEmailField(e.target.value)}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] outline-none focus:border-[var(--color-accent-gold)]"
                />
              </div>
              <div>
                <label className="mb-1 block font-inter text-[12px] font-medium text-[#666666]">Phone</label>
                <input
                  defaultValue={contact.phone || ""}
                  onBlur={(e) => updateField("phone", e.target.value.trim() || null)}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] outline-none focus:border-[var(--color-accent-gold)]"
                />
              </div>
              <div>
                <label className="mb-1 block font-inter text-[12px] font-medium text-[#666666]">Status</label>
                <select
                  value={contact.status}
                  onChange={(e) => updateField("status", e.target.value)}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] outline-none focus:border-[var(--color-accent-gold)]"
                >
                  {CONTACT_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block font-inter text-[12px] font-medium text-[#666666]">Customer code</label>
                <p className="rounded-lg border border-[var(--color-border)] bg-[#FAFAF7] px-3 py-2 font-mono text-[13px] text-[#444444]">
                  {contact.customer_code || "—"}
                </p>
              </div>
              <div>
                <label className="mb-1 block font-inter text-[12px] font-medium text-[#666666]">
                  Project progress {progressSaving ? "(saving…)" : ""}
                </label>
                <select
                  value={contact.project_progress ?? ""}
                  disabled={progressSaving || !contact.email}
                  onChange={(e) => handleProjectProgressChange(e.target.value)}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] outline-none focus:border-[var(--color-accent-gold)] disabled:opacity-60"
                >
                  <option value="">Not set</option>
                  {PROJECT_PROGRESS_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.value}% — {o.label}
                    </option>
                  ))}
                </select>
                {!contact.email ? (
                  <p className="mt-1 font-inter text-[11px] text-[#999999]">Add an email to set progress and notify the client.</p>
                ) : null}
                {progressError ? (
                  <p className="mt-1 font-inter text-[12px] text-[#9A2E24]">{progressError}</p>
                ) : null}
              </div>
            </div>

            <label className="mt-4 flex items-center gap-2 font-inter text-[13px] text-[var(--color-text)]">
              <input
                type="checkbox"
                checked={!!contact.marketing_consent}
                onChange={(e) => updateField("marketing_consent", e.target.checked)}
                className="h-4 w-4 accent-[var(--color-accent-gold)]"
              />
              Marketing consent
            </label>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h2 className="font-playfair text-[16px] font-bold text-[var(--color-text)]">Project summary</h2>
              <span className="shrink-0 font-inter text-[12px] text-[#999999]">
                {summarySaving ? "Saving…" : "Saved"}
              </span>
            </div>
            <p className="mb-2 font-inter text-[11px] text-[#999999]">
              {contact.project_summary_updated_at
                ? `Last updated ${new Date(contact.project_summary_updated_at).toLocaleString()}`
                : "Not updated yet"}
              {" · "}
              {summaryDraft.length}/{PROJECT_SUMMARY_MAX_LENGTH}
            </p>
            <textarea
              rows={5}
              value={summaryDraft}
              onChange={(e) => handleSummaryChange(e.target.value)}
              placeholder="Genre, manuscript status, plan discussed, next step…"
              className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] text-[var(--color-text)] outline-none focus:border-[var(--color-accent-gold)]"
            />
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-playfair text-[16px] font-bold text-[var(--color-text)]">Notes</h2>
              <span className="font-inter text-[12px] text-[#999999]">{notesSaving ? "Saving…" : "Saved"}</span>
            </div>
            <textarea
              rows={10}
              value={notesDraft}
              onChange={(e) => handleNotesChange(e.target.value)}
              className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] text-[var(--color-text)] outline-none focus:border-[var(--color-accent-gold)]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <h2 className="mb-3 font-playfair text-[16px] font-bold text-[var(--color-text)]">Conversations</h2>
            {conversations.length === 0 ? (
              <p className="font-inter text-[13px] text-[#999999]">No conversations yet.</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {conversations.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/admin?c=${c.id}`}
                      className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-3 py-2 font-inter text-[13px] text-[var(--color-text)] hover:border-[var(--color-accent-gold)]"
                    >
                      <span>{new Date(c.created_at).toLocaleDateString()}</span>
                      <span className="font-inter text-[11px] font-semibold uppercase tracking-wide text-[#999999]">
                        {c.status}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <h2 className="mb-3 font-playfair text-[16px] font-bold text-[var(--color-text)]">Send email</h2>
            {!contact.email ? (
              <p className="font-inter text-[13px] text-[#999999]">Add an email address to send this contact a message.</p>
            ) : !emailOpen ? (
              <button
                type="button"
                onClick={() => setEmailOpen(true)}
                className="admin-btn-primary w-full"
              >
                Compose email
              </button>
            ) : (
              <form onSubmit={handleSendEmail} className="flex flex-col gap-3">
                <input
                  required
                  placeholder="Subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] outline-none focus:border-[var(--color-accent-gold)]"
                />
                <textarea
                  required
                  rows={6}
                  placeholder="Message"
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] outline-none focus:border-[var(--color-accent-gold)]"
                />
                {emailStatus && (
                  <p className={`font-inter text-[12px] ${emailStatus.ok ? "text-[#4F7A3A]" : "text-[#9A2E24]"}`}>
                    {emailStatus.message}
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={emailSending}
                    className="admin-btn-primary flex-1"
                  >
                    {emailSending ? "Sending…" : "Send"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmailOpen(false)}
                    className="admin-btn-neutral"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
