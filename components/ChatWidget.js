"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/**
 * GhostWriterHunt — ChatWidget
 * Live chat widget. Visitor messages and conversations persist to
 * Supabase (anonymous auth + RLS); the team/AI reply is still a local-only
 * demo auto-reply until the real AI/agent pipeline is wired up (see the
 * TODO in persistMessage). Palette is lifted directly from the featured
 * "Professional" pricing card in Pricing.js: dark background #1C1C1C,
 * gold accent #C9A84C, white text.
 * Prefix: gcw-
 */

const WELCOME_MESSAGE =
  "Welcome to GhostWriterHunt. How can we help with your book today?";
const AUTO_REPLY_MESSAGE =
  "Thanks for reaching out — a member of our team will reply shortly. If you've left your email, we'll also follow up there.";
const TYPING_DELAY_MS = 1200;
const TEXTAREA_MAX_HEIGHT_PX = 100; // ~4 lines
const MAX_MESSAGE_LENGTH = 4000;
const MIN_SEND_INTERVAL_MS = 1000;

function ChatBubbleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5.5C4 4.67 4.67 4 5.5 4h13c.83 0 1.5.67 1.5 1.5v10c0 .83-.67 1.5-1.5 1.5H9l-4 3.5v-3.5h-.5C3.67 17 3 16.33 3 15.5v-10z"
        fill="#C9A84C"
      />
      <circle cx="8" cy="10.2" r="1.1" fill="#1C1C1C" />
      <circle cx="12" cy="10.2" r="1.1" fill="#1C1C1C" />
      <circle cx="16" cy="10.2" r="1.1" fill="#1C1C1C" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 3l10 10M13 3L3 13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M2.5 10L17.5 3L11.5 17.5L9.3 11.2L2.5 10Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export default function ChatWidget() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [contactFieldsDismissed, setContactFieldsDismissed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [supabase] = useState(() => createClient());

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const conversationIdRef = useRef(null);
  const lastSendAtRef = useRef(0);
  const isOpenRef = useRef(false);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const isAdminRoute = pathname?.startsWith("/admin");

  // Show the team welcome message the first time the panel is opened.
  useEffect(() => {
    if (isOpen && !hasOpenedOnce) {
      setHasOpenedOnce(true);
      setMessages([
        {
          id: "welcome",
          sender: "team",
          text: WELCOME_MESSAGE,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, hasOpenedOnce]);

  // Move focus to the input whenever the panel opens.
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Escape closes the panel and returns focus to the launcher.
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e) {
      if (e.key === "Escape") {
        setIsOpen(false);
        launcherRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Auto-scroll to the newest message / typing indicator.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  // On mount (page refresh): if a session already exists, restore the
  // visitor's open conversation and its message history from Supabase.
  useEffect(() => {
    if (isAdminRoute) return;
    let cancelled = false;

    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || cancelled) return;

      const { data: existing, error } = await supabase
        .from("conversations")
        .select("id")
        .eq("visitor_id", session.user.id)
        .eq("status", "open")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error || !existing || cancelled) return;

      const { data: history } = await supabase
        .from("messages")
        .select("id, sender, content, created_at")
        .eq("conversation_id", existing.id)
        .order("created_at", { ascending: true });

      if (cancelled) return;

      conversationIdRef.current = existing.id;
      setConversationId(existing.id);

      if (history && history.length > 0) {
        setHasOpenedOnce(true); // skip the synthetic local welcome message
        setMessages(
          history.map((row) => ({
            id: row.id,
            sender: row.sender === "visitor" ? "visitor" : "team",
            text: row.content,
            timestamp: new Date(row.created_at),
            status: "sent",
          }))
        );
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  // Realtime: live-append agent/AI messages that arrive on this
  // conversation. The visitor's own messages are already shown
  // optimistically at send-time, so they're skipped here. Cleans up on
  // conversation change / unmount.
  useEffect(() => {
    if (isAdminRoute || !conversationId) return;

    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const row = payload.new;
          if (row.sender === "visitor") return;
          setMessages((prev) => {
            if (prev.some((m) => m.id === row.id)) return prev;
            return [
              ...prev,
              {
                id: row.id,
                sender: "team",
                text: row.content,
                timestamp: new Date(row.created_at),
                status: "sent",
              },
            ];
          });
          // It just arrived while the panel is open, so it's being seen now.
          if (isOpenRef.current) {
            supabase.rpc("mark_messages_seen", { p_conversation_id: conversationId });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, supabase]);

  // Seen marks: whenever the panel is opened with an active conversation,
  // mark any already-unseen agent/AI messages as seen (no-op if none).
  useEffect(() => {
    if (isAdminRoute || !isOpen || !conversationIdRef.current) return;
    supabase
      .rpc("mark_messages_seen", { p_conversation_id: conversationIdRef.current })
      .then(({ error }) => {
        if (error) console.error("ChatWidget: failed to mark messages seen", error);
      });
  }, [isOpen, conversationId, isAdminRoute, supabase]);

  // Online presence: as long as a conversation exists and this tab stays
  // open, track it on the shared "chat-presence" channel (keyed by
  // conversation id) so the admin inbox can show a live online/offline
  // dot. Ends automatically when the tab/connection closes.
  useEffect(() => {
    if (isAdminRoute || !conversationId) return;

    const channel = supabase.channel("chat-presence", {
      config: { presence: { key: conversationId } },
    });

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.track({ online: true });
      }
    });

    return () => {
      channel.untrack();
      supabase.removeChannel(channel);
    };
  }, [isAdminRoute, conversationId, supabase]);

  /**
   * persistMessage — saves one visitor message to Supabase: ensures an
   * anonymous session, starts a conversation via /api/chat/start on the
   * first message, then inserts the message row. Called by sendMessage
   * and by the retry button on a failed message.
   */
  const persistMessage = useCallback(
    async (localId, text) => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        let activeSession = session;
        if (!activeSession) {
          const { data, error } = await supabase.auth.signInAnonymously();
          if (error) throw error;
          activeSession = data.session;
        }

        let convId = conversationIdRef.current;
        if (!convId) {
          const res = await fetch("/api/chat/start", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              accessToken: activeSession.access_token,
              name: visitorName.trim() || null,
              email: visitorEmail.trim() || null,
              firstMessage: text,
            }),
          });
          if (!res.ok) {
            const errBody = await res.json().catch(() => ({}));
            throw new Error(errBody.error || "Could not start conversation");
          }
          const data = await res.json();
          convId = data.conversationId;
          conversationIdRef.current = convId;
          setConversationId(convId);
        }

        const { error: insertError } = await supabase.from("messages").insert({
          conversation_id: convId,
          sender: "visitor",
          content: text,
        });
        if (insertError) throw insertError;

        setMessages((prev) =>
          prev.map((m) => (m.id === localId ? { ...m, status: "sent" } : m))
        );

        // --- DEMO AUTO-REPLY (display-only, NOT saved to Supabase) ---
        // TODO: remove this block once real AI/agent replies are wired up —
        // real replies will arrive through the Realtime subscription above.
        setIsTyping(true);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `team-${Date.now()}`,
              sender: "team",
              text: AUTO_REPLY_MESSAGE,
              timestamp: new Date(),
              status: "sent",
            },
          ]);
        }, TYPING_DELAY_MS);
      } catch (err) {
        console.error("ChatWidget: failed to save message", err);
        setMessages((prev) =>
          prev.map((m) => (m.id === localId ? { ...m, status: "failed" } : m))
        );
      }
    },
    [supabase, visitorName, visitorEmail]
  );

  /**
   * sendMessage — single entry point for outgoing visitor messages.
   * Appends the message locally (optimistic) then hands it to
   * persistMessage. Keep all message/send logic funneled through this pair
   * of functions so a future AI/agent pipeline can hook in cleanly.
   */
  const sendMessage = useCallback(
    (text) => {
      const trimmed = text.trim().slice(0, MAX_MESSAGE_LENGTH);
      if (!trimmed) return;

      const now = Date.now();
      if (now - lastSendAtRef.current < MIN_SEND_INTERVAL_MS) return;
      lastSendAtRef.current = now;

      const localId = `visitor-${now}`;
      setMessages((prev) => [
        ...prev,
        {
          id: localId,
          sender: "visitor",
          text: trimmed,
          timestamp: new Date(),
          status: "sent",
        },
      ]);
      setInputValue("");

      persistMessage(localId, trimmed);
    },
    [persistMessage]
  );

  function retryMessage(localId, text) {
    setMessages((prev) =>
      prev.map((m) => (m.id === localId ? { ...m, status: "sent" } : m))
    );
    persistMessage(localId, text);
  }

  function handleSend() {
    sendMessage(inputValue);
    const el = inputRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.overflowY = "hidden";
    }
  }

  function handleTextareaKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleTextareaInput(e) {
    const el = e.target;
    setInputValue(el.value);
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, TEXTAREA_MAX_HEIGHT_PX) + "px";
    el.style.overflowY = el.scrollHeight > TEXTAREA_MAX_HEIGHT_PX ? "auto" : "hidden";
  }

  if (isAdminRoute) return null;

  const hasVisitorMessage = messages.some((m) => m.sender === "visitor");
  const showContactFields = isOpen && !contactFieldsDismissed && !hasVisitorMessage;

  return (
    <div className="gcw-root">
      <style>{`
        .gcw-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
        }

        .gcw-launcher {
          position: fixed;
          right: 24px;
          bottom: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #1C1C1C;
          border: 1px solid rgba(201,168,76,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          pointer-events: auto;
          box-shadow: 0 10px 30px rgba(28,28,28,0.35);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .gcw-launcher:hover {
          transform: scale(1.06);
          box-shadow: 0 14px 36px rgba(28,28,28,0.42);
        }
        .gcw-launcher:focus-visible {
          outline: 2px solid #C9A84C;
          outline-offset: 3px;
        }
        .gcw-online-dot {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #C9A84C;
          border: 2px solid #FAFAF7;
          animation: gcw-pulse 2.4s ease-in-out infinite;
        }

        .gcw-panel {
          position: fixed;
          right: 24px;
          bottom: 96px;
          width: 380px;
          max-width: calc(100vw - 32px);
          height: min(600px, 80vh);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: rgba(28,28,28,0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 24px 70px rgba(0,0,0,0.35);
          opacity: 0;
          transform: translateY(16px) scale(0.97);
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
        }
        .gcw-panel-open {
          opacity: 1;
          transform: translateY(0) scale(1);
          visibility: visible;
          pointer-events: auto;
        }
        @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
          .gcw-panel { background: #1C1C1C; }
        }

        .gcw-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 16px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(255,255,255,0.12);
          flex-shrink: 0;
        }
        @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
          .gcw-header { background: #262626; }
        }
        .gcw-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #C9A84C;
          color: #1C1C1C;
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 17px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .gcw-header-text { flex: 1; min-width: 0; }
        .gcw-header-title {
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 16px;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.3;
        }
        .gcw-header-subtitle {
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 12px;
          color: #C9A84C;
          margin: 2px 0 0;
        }
        .gcw-close-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: #CCCCCC;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .gcw-close-btn:hover { background: rgba(255,255,255,0.1); color: #FFFFFF; }
        .gcw-close-btn:focus-visible { outline: 2px solid #C9A84C; outline-offset: 2px; }

        .gcw-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          background: var(--color-background);
        }

        .gcw-bubble-row {
          display: flex;
          flex-direction: column;
          max-width: 82%;
        }
        .gcw-bubble-row-visitor { align-self: flex-end; align-items: flex-end; }
        .gcw-bubble-row-team { align-self: flex-start; align-items: flex-start; }

        .gcw-bubble {
          padding: 10px 14px;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 14px;
          line-height: 1.55;
        }
        .gcw-bubble-team {
          background: rgba(28,28,28,0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.12);
          color: #FFFFFF;
          border-radius: 14px 14px 14px 4px;
        }
        .gcw-bubble-visitor {
          background: rgba(201,168,76,0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.18);
          color: #FFFFFF;
          border-radius: 14px 14px 4px 14px;
        }
        @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
          .gcw-bubble-team { background: #1C1C1C; }
          .gcw-bubble-visitor { background: #C9A84C; }
        }
        .gcw-bubble-text { margin: 0; white-space: pre-wrap; word-break: break-word; }
        .gcw-timestamp {
          margin-top: 4px;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 11px;
          color: #999999;
        }
        .gcw-error-notice {
          margin-top: 4px;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 11px;
          color: #999999;
        }
        .gcw-retry-btn {
          border: none;
          background: transparent;
          padding: 0;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #C9A84C;
          cursor: pointer;
          text-decoration: underline;
        }
        .gcw-retry-btn:hover { color: #B8960C; }
        .gcw-retry-btn:focus-visible { outline: 2px solid #C9A84C; outline-offset: 2px; }

        .gcw-typing {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 12px 14px;
        }
        .gcw-typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #CCCCCC;
          animation: gcw-typing-bounce 1.2s ease-in-out infinite;
        }
        .gcw-typing-dot:nth-child(2) { animation-delay: 0.15s; }
        .gcw-typing-dot:nth-child(3) { animation-delay: 0.3s; }

        .gcw-privacy-note {
          margin: 0;
          padding: 0 16px 8px;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 11px;
          color: #999999;
          text-align: center;
          flex-shrink: 0;
        }

        .gcw-contact-fields {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 0 16px 12px;
          flex-shrink: 0;
        }
        .gcw-contact-input {
          flex: 1 1 140px;
          min-width: 0;
          padding: 8px 12px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.06);
          color: #FFFFFF;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 13px;
        }
        .gcw-contact-input::placeholder { color: #999999; }
        .gcw-contact-input:focus-visible { outline: 2px solid #C9A84C; outline-offset: 1px; }
        .gcw-skip-btn {
          flex-shrink: 0;
          padding: 8px 12px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.14);
          background: transparent;
          color: #999999;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 12px;
          cursor: pointer;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .gcw-skip-btn:hover { color: #FFFFFF; border-color: rgba(255,255,255,0.3); }

        .gcw-input-row {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          padding: 12px 16px;
          padding-bottom: max(12px, env(safe-area-inset-bottom));
          border-top: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          flex-shrink: 0;
        }
        .gcw-textarea {
          flex: 1;
          resize: none;
          max-height: 100px;
          overflow-y: hidden;
          padding: 10px 14px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.06);
          color: #FFFFFF;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 14px;
          line-height: 1.4;
        }
        .gcw-textarea::placeholder { color: #999999; }
        .gcw-textarea:focus-visible { outline: 2px solid #C9A84C; outline-offset: 1px; }
        .gcw-send-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          flex-shrink: 0;
          background: #C9A84C;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .gcw-send-btn:hover:not(:disabled) { background: #B8960C; transform: scale(1.05); }
        .gcw-send-btn:focus-visible { outline: 2px solid #C9A84C; outline-offset: 2px; }
        .gcw-send-btn:disabled { background: #555555; color: #999999; cursor: not-allowed; }

        @keyframes gcw-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.5); }
          50% { box-shadow: 0 0 0 4px rgba(201,168,76,0); }
        }
        @keyframes gcw-typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-4px); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .gcw-panel, .gcw-launcher, .gcw-send-btn { transition: none; }
          .gcw-online-dot, .gcw-typing-dot { animation: none; }
        }

        @media (max-width: 639px) {
          .gcw-panel {
            right: 0;
            bottom: 0;
            width: 100vw;
            height: 100dvh;
            max-width: 100vw;
            border-radius: 0;
            transform: translateY(12px);
          }
          .gcw-panel-open { transform: translateY(0); }
        }
      `}</style>

      <button
        ref={launcherRef}
        type="button"
        className="gcw-launcher"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
        aria-controls="gcw-panel"
        onClick={() => setIsOpen((v) => !v)}
      >
        <ChatBubbleIcon />
        <span className="gcw-online-dot" aria-hidden="true" />
      </button>

      <div
        id="gcw-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Live chat with GhostWriterHunt"
        className={`gcw-panel ${isOpen ? "gcw-panel-open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="gcw-header">
          <div className="gcw-avatar" aria-hidden="true">G</div>
          <div className="gcw-header-text">
            <p className="gcw-header-title">GhostWriterHunt</p>
            <p className="gcw-header-subtitle">Online · Typically replies in minutes</p>
          </div>
          <button
            type="button"
            className="gcw-close-btn"
            aria-label="Close chat"
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="gcw-messages">
          {messages.map((m) => (
            <div key={m.id} className={`gcw-bubble-row gcw-bubble-row-${m.sender}`}>
              <div className={`gcw-bubble gcw-bubble-${m.sender}`}>
                <p className="gcw-bubble-text">{m.text}</p>
              </div>
              {m.status === "failed" ? (
                <span className="gcw-error-notice">
                  Couldn&apos;t send ·{" "}
                  <button
                    type="button"
                    className="gcw-retry-btn"
                    onClick={() => retryMessage(m.id, m.text)}
                  >
                    Retry
                  </button>
                </span>
              ) : (
                <span className="gcw-timestamp">{formatTime(m.timestamp)}</span>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="gcw-bubble-row gcw-bubble-row-team">
              <div className="gcw-bubble gcw-bubble-team gcw-typing" aria-label="Team is typing">
                <span className="gcw-typing-dot" />
                <span className="gcw-typing-dot" />
                <span className="gcw-typing-dot" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <p className="gcw-privacy-note">
          Your conversation is private and confidential.
        </p>

        {showContactFields && (
          <div className="gcw-contact-fields">
            <input
              type="text"
              className="gcw-contact-input"
              placeholder="Name (optional)"
              aria-label="Your name (optional)"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
            />
            <input
              type="email"
              className="gcw-contact-input"
              placeholder="Email (optional)"
              aria-label="Your email (optional)"
              value={visitorEmail}
              onChange={(e) => setVisitorEmail(e.target.value)}
            />
            <button
              type="button"
              className="gcw-skip-btn"
              onClick={() => setContactFieldsDismissed(true)}
            >
              Skip
            </button>
          </div>
        )}

        <div className="gcw-input-row">
          <textarea
            ref={inputRef}
            className="gcw-textarea"
            placeholder="Type your message…"
            aria-label="Type your message"
            rows={1}
            value={inputValue}
            onChange={handleTextareaInput}
            onKeyDown={handleTextareaKeyDown}
          />
          <button
            type="button"
            className="gcw-send-btn"
            aria-label="Send message"
            disabled={!inputValue.trim()}
            onClick={handleSend}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
