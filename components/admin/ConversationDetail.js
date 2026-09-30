"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useAdminRealtime } from "@/lib/admin/AdminRealtimeContext";
import { PROJECT_SUMMARY_MAX_LENGTH } from "@/lib/ai/projectSummary";

const CONTACT_STATUSES = ["new", "contacted", "qualified", "client", "closed"];
const NOTES_SAVE_DELAY_MS = 900;

function formatTime(iso) {
  return new Date(iso).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MessageBubble({ message }) {
  const isVisitor = message.sender === "visitor";
  const isAi = message.sender === "ai";

  return (
    <div className={`flex flex-col ${isVisitor ? "items-start" : "items-end"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 font-inter text-[14px] leading-relaxed ${
          isVisitor
            ? "rounded-bl-md border border-[var(--color-border)] bg-white text-[var(--color-text)]"
            : isAi
              ? "rounded-br-md bg-[#EAF2FB] text-[#1C3A57]"
              : "rounded-br-md bg-[var(--color-text)] text-white"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
      <span className="mt-1 px-1 font-inter text-[11px] text-[#999999]">
        {isAi ? "AI" : isVisitor ? "Visitor" : "You"} · {formatTime(message.created_at)}
        {!isVisitor && (
          <> · {message.seen_at ? `Seen ${formatTime(message.seen_at)}` : "Sent"}</>
        )}
      </span>
    </div>
  );
}

export default function ConversationDetail({ conversationId, onBack }) {
  const { supabase, conversations, loading: conversationsLoading, markSeen, onlineConversationIds } =
    useAdminRealtime();
  const conversation = conversations.find((c) => c.id === conversationId) || null;
  const online = onlineConversationIds.has(conversationId);

  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messagesError, setMessagesError] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  const [contact, setContact] = useState(null);
  const [loadingContact, setLoadingContact] = useState(false);
  const [contactError, setContactError] = useState(null);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", email: "", phone: "" });
  const [savingContact, setSavingContact] = useState(false);

  const [notesDraft, setNotesDraft] = useState("");
  const [notesSaving, setNotesSaving] = useState(false);
  const notesTimeoutRef = useRef(null);
  const [summaryDraft, setSummaryDraft] = useState("");
  const [summarySaving, setSummarySaving] = useState(false);
  const summaryTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Load message history + subscribe to live updates for this conversation.
  useEffect(() => {
    if (!conversationId) return;
    let cancelled = false;
    setLoadingMessages(true);
    setMessagesError(null);

    (async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("id, sender, agent_id, content, created_at")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (cancelled) return;
      if (error) {
        setMessagesError(error.message);
      } else {
        setMessages(data || []);
      }
      setLoadingMessages(false);
    })();

    markSeen(conversationId);

    const channel = supabase
      .channel(`admin-messages-${conversationId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${conversationId}` },
        (payload) => {
          setMessages((prev) => (prev.some((m) => m.id === payload.new.id) ? prev : [...prev, payload.new]));
          markSeen(conversationId);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages", filter: `conversation_id=eq.${conversationId}` },
        (payload) => {
          setMessages((prev) => prev.map((m) => (m.id === payload.new.id ? { ...m, ...payload.new } : m)));
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, supabase]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  // Load full contact details (the shared list only has name/email).
  useEffect(() => {
    setShowAddContact(false);
    if (!conversation?.contact_id) {
      setContact(null);
      return;
    }
    let cancelled = false;
    setLoadingContact(true);
    setContactError(null);

    (async () => {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .eq("id", conversation.contact_id)
        .maybeSingle();

      if (cancelled) return;
      if (error) setContactError(error.message);
      else setContact(data);
      setLoadingContact(false);
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation?.contact_id, supabase]);

  useEffect(() => {
    setNotesDraft(contact?.notes || "");
  }, [contact?.id, contact?.notes]);

  useEffect(() => {
    setSummaryDraft(contact?.project_summary || "");
  }, [contact?.id, contact?.project_summary]);

  function handleSummaryChange(value) {
    if (!contact) return;
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
      await supabase.from("contacts").update(payload).eq("id", contact.id);
      setContact((prev) => (prev ? { ...prev, ...payload } : prev));
      setSummarySaving(false);
    }, NOTES_SAVE_DELAY_MS);
  }

  const sendReply = useCallback(async () => {
    const trimmed = replyText.trim();
    if (!trimmed || sending) return;
    setSending(true);

    const { error } = await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender: "agent",
      content: trimmed,
    });

    if (!error) {
      setReplyText("");
      // Belt-and-suspenders: the DB trigger already does this too.
      await supabase
        .from("conversations")
        .update({ ai_enabled: false })
        .eq("id", conversationId)
        .eq("ai_enabled", true);
    }
    setSending(false);
  }, [replyText, sending, supabase, conversationId]);

  function handleReplyKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendReply();
    }
  }

  async function toggleAi() {
    if (!conversation) return;
    await supabase
      .from("conversations")
      .update({ ai_enabled: !conversation.ai_enabled })
      .eq("id", conversationId);
  }

  async function toggleStatus() {
    if (!conversation) return;
    await supabase
      .from("conversations")
      .update({ status: conversation.status === "open" ? "closed" : "open" })
      .eq("id", conversationId);
  }

  async function updateContactField(field, value) {
    if (!contact) return;
    setContact((prev) => ({ ...prev, [field]: value }));
    await supabase.from("contacts").update({ [field]: value }).eq("id", contact.id);
  }

  async function updateContactEmail(rawValue) {
    if (!contact) return;
    const trimmed = rawValue.trim();
    if (!trimmed) {
      setContact((prev) => ({ ...prev, email: null }));
      await supabase.from("contacts").update({ email: null }).eq("id", contact.id);
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
      await supabase.from("contacts").update({ email: data.normalized }).eq("id", contact.id);
    } catch {
      alert("Could not validate email. Please try again.");
      setContact((prev) => ({ ...prev, email: contact.email }));
    }
  }

  function handleNotesChange(value) {
    setNotesDraft(value);
    if (notesTimeoutRef.current) clearTimeout(notesTimeoutRef.current);
    setNotesSaving(true);
    notesTimeoutRef.current = setTimeout(async () => {
      if (contact) {
        await supabase.from("contacts").update({ notes: value }).eq("id", contact.id);
      }
      setNotesSaving(false);
    }, NOTES_SAVE_DELAY_MS);
  }

  useEffect(() => {
    return () => {
      if (notesTimeoutRef.current) clearTimeout(notesTimeoutRef.current);
      if (summaryTimeoutRef.current) clearTimeout(summaryTimeoutRef.current);
    };
  }, []);

  async function handleAddContact(e) {
    e.preventDefault();
    if (!newContact.name.trim() && !newContact.email.trim()) return;
    setSavingContact(true);

    const { data: created, error } = await supabase
      .from("contacts")
      .insert({
        name: newContact.name.trim() || null,
        email: newContact.email.trim() || null,
        phone: newContact.phone.trim() || null,
        source: "chat",
      })
      .select("*")
      .single();

    if (!error && created) {
      await supabase.from("conversations").update({ contact_id: created.id }).eq("id", conversationId);
      setContact(created);
      setShowAddContact(false);
      setNewContact({ name: "", email: "", phone: "" });
    }
    setSavingContact(false);
  }

  if (!conversation) {
    // Don't assume "gone" just because the shared conversations list
    // hasn't loaded (or hasn't caught up to a just-created conversation)
    // yet — only say that once loading has actually finished.
    return (
      <div className="flex h-full items-center justify-center px-6 text-center">
        <p className="font-inter text-[14px] text-[#999999]">
          {conversationsLoading ? "Loading conversation…" : "This conversation is no longer available."}
        </p>
      </div>
    );
  }

  const paymentLinkHref = `/admin/payments?conversationId=${conversationId}${
    conversation.contact_id ? `&contactId=${conversation.contact_id}` : ""
  }`;

  return (
    <div className="flex h-full min-h-0 overflow-hidden flex-col lg:flex-row">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex min-w-0 items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to conversation list"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#666666] lg:hidden"
            >
              <BackIcon />
            </button>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate font-playfair text-[16px] font-bold text-[var(--color-text)]">
              {conversation.contact_name || "Anonymous visitor"}
            </p>
            <p className="flex items-center gap-1.5 truncate font-inter text-[12px] text-[#999999]">
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${online ? "bg-[#4F9A55]" : "bg-[#C4C4C4]"}`}
                aria-hidden="true"
              />
              {online ? "Online" : "Offline"}
              {" · "}
              {conversation.contact_email || "No email"} {conversation.country ? `· ${conversation.country}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={toggleAi}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] ${
              conversation.ai_enabled ? "admin-btn-success" : "admin-btn-secondary"
            }`}
          >
            AI {conversation.ai_enabled ? "on" : "off"}
          </button>
          <button
            type="button"
            onClick={toggleStatus}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] ${
              conversation.status === "open" ? "admin-btn-neutral" : "admin-btn-success"
            }`}
          >
            {conversation.status === "open" ? "Close" : "Reopen"}
          </button>
        </header>

        <div className="flex-1 overflow-y-auto bg-[var(--color-background)] px-4 py-4">
          {loadingMessages ? (
            <p className="text-center font-inter text-[13px] text-[#999999]">Loading messages…</p>
          ) : messagesError ? (
            <p className="text-center font-inter text-[13px] text-[#9A2E24]">
              Couldn&apos;t load messages: {messagesError}
            </p>
          ) : messages.length === 0 ? (
            <p className="text-center font-inter text-[13px] text-[#999999]">No messages yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="flex items-end gap-2 border-t border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3">
          <textarea
            rows={1}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={handleReplyKeyDown}
            placeholder="Reply as the team…"
            aria-label="Reply to visitor"
            className="max-h-[120px] flex-1 resize-none rounded-xl border border-[var(--color-border)] bg-white px-3.5 py-2.5 font-inter text-[14px] text-[var(--color-text)] outline-none focus:border-[var(--color-accent-gold)]"
          />
          <button
            type="button"
            onClick={sendReply}
            disabled={!replyText.trim() || sending}
            className="admin-btn-primary rounded-full disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>

      {/* Side panel: contact */}
      <aside className="w-full min-w-0 shrink-0 overflow-x-hidden overflow-y-auto border-t border-[var(--color-border)] bg-[var(--color-card)] px-4 py-4 lg:w-[240px] lg:max-w-[240px] lg:border-l lg:border-t-0 xl:w-[260px] xl:max-w-[260px]">
        <h2 className="mb-4 truncate font-playfair text-[16px] font-bold text-[var(--color-text)]">Contact</h2>

        <Link
          href={paymentLinkHref}
          className="admin-btn-emerald mb-4 block w-full truncate rounded-full px-3 py-2 text-center text-[12px]"
        >
          Payment link
        </Link>

        {loadingContact ? (
          <p className="font-inter text-[13px] text-[#999999]">Loading contact…</p>
        ) : contactError ? (
          <p className="font-inter text-[13px] text-[#9A2E24]">Couldn&apos;t load contact: {contactError}</p>
        ) : contact ? (
          <div className="flex min-w-0 flex-col gap-4">
            <div className="min-w-0">
              <label className="mb-1 block font-inter text-[12px] font-medium text-[#666666]">Name</label>
              <input
                defaultValue={contact.name || ""}
                onBlur={(e) => updateContactField("name", e.target.value.trim() || null)}
                className="w-full min-w-0 max-w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] text-[var(--color-text)] outline-none focus:border-[var(--color-accent-gold)]"
              />
            </div>
            <div className="min-w-0">
              <label className="mb-1 block font-inter text-[12px] font-medium text-[#666666]">Email</label>
              <input
                key={contact.email || "no-email"}
                defaultValue={contact.email || ""}
                onBlur={(e) => updateContactEmail(e.target.value)}
                className="w-full min-w-0 max-w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] text-[var(--color-text)] outline-none focus:border-[var(--color-accent-gold)]"
              />
            </div>
            <div className="min-w-0">
              <label className="mb-1 block font-inter text-[12px] font-medium text-[#666666]">Customer code</label>
              <p className="truncate rounded-lg border border-[var(--color-border)] bg-[#FAFAF7] px-3 py-2 font-mono text-[13px] text-[var(--color-text)]">
                {contact.customer_code || "—"}
              </p>
            </div>
            <div className="min-w-0">
              <label className="mb-1 block font-inter text-[12px] font-medium text-[#666666]">Phone</label>
              <input
                defaultValue={contact.phone || ""}
                onBlur={(e) => updateContactField("phone", e.target.value.trim() || null)}
                className="w-full min-w-0 max-w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] text-[var(--color-text)] outline-none focus:border-[var(--color-accent-gold)]"
              />
            </div>
            <div className="min-w-0">
              <label className="mb-1 flex items-center justify-between font-inter text-[12px] font-medium text-[#666666]">
                Project summary
                <span className="font-normal text-[#999999]">{summarySaving ? "Saving…" : "Saved"}</span>
              </label>
              <p className="mb-1 font-inter text-[10px] text-[#999999]">
                {contact.project_summary_updated_at
                  ? `Updated ${new Date(contact.project_summary_updated_at).toLocaleString()}`
                  : "Not updated yet"}
              </p>
              <textarea
                rows={4}
                value={summaryDraft}
                onChange={(e) => handleSummaryChange(e.target.value)}
                className="w-full min-w-0 max-w-full resize-none rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] text-[var(--color-text)] outline-none focus:border-[var(--color-accent-gold)]"
              />
            </div>
            <div className="min-w-0">
              <label className="mb-1 block font-inter text-[12px] font-medium text-[#666666]">Status</label>
              <select
                value={contact.status}
                onChange={(e) => updateContactField("status", e.target.value)}
                className="w-full min-w-0 max-w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] text-[var(--color-text)] outline-none focus:border-[var(--color-accent-gold)]"
              >
                {CONTACT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="min-w-0">
              <label className="mb-1 flex items-center justify-between font-inter text-[12px] font-medium text-[#666666]">
                Notes
                <span className="font-normal text-[#999999]">{notesSaving ? "Saving…" : "Saved"}</span>
              </label>
              <textarea
                rows={4}
                value={notesDraft}
                onChange={(e) => handleNotesChange(e.target.value)}
                className="w-full min-w-0 max-w-full resize-none rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] text-[var(--color-text)] outline-none focus:border-[var(--color-accent-gold)]"
              />
            </div>
            <Link
              href={`/admin/contacts/${contact.id}`}
              className="truncate text-center font-inter text-[13px] font-semibold text-[var(--color-accent-gold)] hover:underline"
            >
              View full contact →
            </Link>
          </div>
        ) : showAddContact ? (
          <form onSubmit={handleAddContact} className="flex min-w-0 flex-col gap-3">
            <input
              placeholder="Name"
              value={newContact.name}
              onChange={(e) => setNewContact((p) => ({ ...p, name: e.target.value }))}
              className="w-full min-w-0 max-w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] outline-none focus:border-[var(--color-accent-gold)]"
            />
            <input
              placeholder="Email"
              type="email"
              value={newContact.email}
              onChange={(e) => setNewContact((p) => ({ ...p, email: e.target.value }))}
              className="w-full min-w-0 max-w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] outline-none focus:border-[var(--color-accent-gold)]"
            />
            <input
              placeholder="Phone"
              value={newContact.phone}
              onChange={(e) => setNewContact((p) => ({ ...p, phone: e.target.value }))}
              className="w-full min-w-0 max-w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] outline-none focus:border-[var(--color-accent-gold)]"
            />
            <div className="flex gap-2">
              <button type="submit" disabled={savingContact} className="admin-btn-primary flex-1">
                {savingContact ? "Saving…" : "Save"}
              </button>
              <button type="button" onClick={() => setShowAddContact(false)} className="admin-btn-neutral">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-start gap-3">
            <p className="font-inter text-[13px] text-[#999999]">No contact linked to this conversation.</p>
            <button type="button" onClick={() => setShowAddContact(true)} className="admin-btn-primary">
              Add contact
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
