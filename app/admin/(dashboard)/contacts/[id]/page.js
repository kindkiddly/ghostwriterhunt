"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminRealtime } from "@/lib/admin/AdminRealtimeContext";

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

  const [emailOpen, setEmailOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);

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

  function handleNotesChange(value) {
    setNotesDraft(value);
    if (notesTimeoutRef.current) clearTimeout(notesTimeoutRef.current);
    setNotesSaving(true);
    notesTimeoutRef.current = setTimeout(async () => {
      await supabase.from("contacts").update({ notes: value }).eq("id", id);
      setNotesSaving(false);
    }, NOTES_SAVE_DELAY_MS);
  }

  useEffect(() => {
    return () => {
      if (notesTimeoutRef.current) clearTimeout(notesTimeoutRef.current);
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
                  defaultValue={contact.email || ""}
                  onBlur={(e) => updateField("email", e.target.value.trim() || null)}
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
                className="w-full rounded-lg border-2 border-[var(--color-accent-gold)] px-4 py-2 font-inter text-[13px] font-semibold text-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)] hover:text-white"
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
                    className="flex-1 rounded-lg bg-[var(--color-accent-gold)] px-3 py-2 font-inter text-[13px] font-semibold text-white hover:bg-[#B8960C] disabled:opacity-60"
                  >
                    {emailSending ? "Sending…" : "Send"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmailOpen(false)}
                    className="rounded-lg border border-[var(--color-border)] px-3 py-2 font-inter text-[13px] font-semibold text-[#666666]"
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
