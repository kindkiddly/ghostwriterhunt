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
const MARK_SEEN_DEBOUNCE_MS = 500;

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
  const [contactHasEmail, setContactHasEmail] = useState(false);
  const [restoring, setRestoring] = useState(true);
  const [supabase] = useState(() => createClient());

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const conversationIdRef = useRef(null);
  const sendLockRef = useRef(false);
  const markSeenTimeoutRef = useRef(null);
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
  // visitor's open conversation, whether its contact already has an email
  // on file (via /api/chat/status — visitors have no RLS access to
  // `contacts` directly), and its message history.
  useEffect(() => {
    if (isAdminRoute) {
      setRestoring(false);
      return;
    }
    let cancelled = false;

    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session || cancelled) return;

        const res = await fetch("/api/chat/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken: session.access_token }),
        });
        if (!res.ok || cancelled) return;
        const statusData = await res.json();

        if (!statusData.conversationId || cancelled) return;

        conversationIdRef.current = statusData.conversationId;
        setConversationId(statusData.conversationId);
        setContactHasEmail(!!statusData.contactHasEmail);

        const { data: history } = await supabase
          .from("messages")
          .select("id, sender, content, created_at")
          .eq("conversation_id", statusData.conversationId)
          .order("created_at", { ascending: true });

        if (cancelled) return;

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
      } catch (err) {
        console.error("ChatWidget: failed to restore conversation", err);
      } finally {
        if (!cancelled) setRestoring(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  // Seen marks: debounced so a burst of incoming messages or open/close
  // toggling only triggers one RPC call, and never blocks sending/display.
  const scheduleMarkSeen = useCallback(() => {
    if (!conversationIdRef.current) return;
    if (markSeenTimeoutRef.current) clearTimeout(markSeenTimeoutRef.current);
    markSeenTimeoutRef.current = setTimeout(() => {
      supabase
        .rpc("mark_messages_seen", { p_conversation_id: conversationIdRef.current })
        .then(({ error }) => {
          if (error) console.error("ChatWidget: failed to mark messages seen", error);
        });
    }, MARK_SEEN_DEBOUNCE_MS);
  }, [supabase]);

  useEffect(() => {
    return () => {
      if (markSeenTimeoutRef.current) clearTimeout(markSeenTimeoutRef.current);
    };
  }, []);

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
          if (isOpenRef.current) scheduleMarkSeen();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, supabase]);

  // Whenever the panel is opened with an active conversation, mark any
  // already-unseen agent/AI messages as seen (no-op if none).
  useEffect(() => {
    if (isAdminRoute || !isOpen || !conversationIdRef.current) return;
    scheduleMarkSeen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, conversationId, isAdminRoute]);

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
   * persistMessage — saves one visitor message via the single POST
   * /api/chat/send call: ensures an anonymous session, then in one
   * server-side step creates the conversation if needed, links/creates
   * the contact, and saves the message. Called by sendMessage and by the
   * retry button on a failed message.
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

        const res = await fetch("/api/chat/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            accessToken: activeSession.access_token,
            conversationId: conversationIdRef.current,
            // Once a contact with an email is on file, there's nothing
            // left to resolve — skip resending these on every message.
            name: contactHasEmail ? null : visitorName.trim() || null,
            email: contactHasEmail ? null : visitorEmail.trim() || null,
            content: text,
          }),
        });
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.error || "Could not send message");
        }
        const data = await res.json();

        if (!conversationIdRef.current) {
          conversationIdRef.current = data.conversationId;
          setConversationId(data.conversationId);
        }
        setContactHasEmail(!!data.contactHasEmail);

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
    [supabase, visitorName, visitorEmail, contactHasEmail]
  );

  /**
   * sendMessage — single entry point for outgoing visitor messages.
   * Appends the message locally (optimistic, instant) then hands it to
   * persistMessage. A simple in-flight lock (not a time-based throttle)
   * blocks double-clicking send; it's released once persistMessage
   * settles either way. Keep all message/send logic funneled through
   * this pair of functions so a future AI/agent pipeline can hook in
   * cleanly.
   */
  const sendMessage = useCallback(
    (text) => {
      if (sendLockRef.current) return;
      const trimmed = text.trim().slice(0, MAX_MESSAGE_LENGTH);
      if (!trimmed) return;

      sendLockRef.current = true;
      const localId = `visitor-${Date.now()}`;
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

      persistMessage(localId, trimmed).finally(() => {
        sendLockRef.current = false;
      });
    },
    [persistMessage]
  );

  function retryMessage(localId, text) {
    if (sendLockRef.current) return;
    sendLockRef.current = true;
    setMessages((prev) =>
      prev.map((m) => (m.id === localId ? { ...m, status: "sent" } : m))
    );
    persistMessage(localId, text).finally(() => {
      sendLockRef.current = false;
    });
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

  // Same rule every time, DB-backed: show only until this visitor's
  // conversation has a contact with an email on file — not derived from
  // local message-send history, so it can't flip inconsistently across
  // refreshes or return visits. `restoring` gates the brief window before
  // we know the true state, so the fields never flash incorrectly.
  const showContactFields = isOpen && !restoring && !contactHasEmail && !contactFieldsDismissed;

  return (
    <div className={`gcw-root${isOpen ? " gcw-is-open" : ""}`}>
      <style>{`
        .gcw-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          --gcw-edge-x: 24px;
          --gcw-edge-y: 20px;
          --gcw-launcher-size: 56px;
        }

        .gcw-launcher {
          position: fixed;
          right: var(--gcw-edge-x);
          bottom: var(--gcw-edge-y);
          width: var(--gcw-launcher-size);
          height: var(--gcw-launcher-size);
          border-radius: 50%;
          background: rgba(28,28,28,0.78);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          border: 1px solid rgba(201,168,76,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          pointer-events: auto;
          box-shadow:
            0 8px 32px rgba(28,28,28,0.35),
            0 2px 8px rgba(0,0,0,0.2),
            inset 0 1px 0 rgba(255,255,255,0.12);
          transition:
            opacity 0.25s ease,
            visibility 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }
        /* Open panel replaces the launcher — no overlap */
        .gcw-is-open .gcw-launcher {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: scale(0.88);
        }
        .gcw-launcher:hover {
          transform: translateY(-2px) scale(1.03);
          border-color: rgba(201,168,76,0.75);
          box-shadow:
            0 12px 40px rgba(28,28,28,0.4),
            0 4px 12px rgba(201,168,76,0.15),
            inset 0 1px 0 rgba(255,255,255,0.15);
        }
        .gcw-launcher:focus-visible {
          outline: 2px solid #C9A84C;
          outline-offset: 3px;
        }
        @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
          .gcw-launcher { background: #1C1C1C; }
        }
        .gcw-online-dot {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #C9A84C;
          border: 2px solid #FAFAF7;
          animation: gcw-pulse 2.4s ease-in-out infinite;
        }

        .gcw-panel {
          position: fixed;
          right: var(--gcw-edge-x);
          bottom: var(--gcw-edge-y);
          width: 380px;
          max-width: calc(100vw - 32px);
          height: min(600px, 80vh);
          border-radius: 22px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: transparent;
          border: 1px solid rgba(201,168,76,0.28);
          box-shadow:
            0 32px 80px rgba(28,28,28,0.45),
            0 8px 24px rgba(0,0,0,0.25);
          opacity: 0;
          transform: translateY(16px) scale(0.97);
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.3s;
        }
        .gcw-panel-open {
          opacity: 1;
          transform: translateY(0) scale(1);
          visibility: visible;
          pointer-events: auto;
        }

        .gcw-header {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 17px 18px 16px;
          min-height: 72px;
          background: rgba(28,28,28,0.88);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border-bottom: 1px solid rgba(201,168,76,0.18);
          flex-shrink: 0;
        }
        .gcw-header::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 18px;
          right: 18px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.45), transparent);
        }
        @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
          .gcw-header { background: #1C1C1C; }
        }
        .gcw-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(165deg, #F2E6C8 0%, #D4B85A 28%, #C9A84C 52%, #9A7A18 100%);
          color: #1C1C1C;
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 18px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid #8B7010;
          box-shadow:
            inset 0 3px 5px rgba(255,255,255,0.55),
            inset 0 -4px 7px rgba(0,0,0,0.28),
            0 2px 4px rgba(0,0,0,0.35);
          text-shadow: 0 1px 0 rgba(255,255,255,0.35);
        }
        .gcw-header-text {
          flex: 1;
          min-width: 0;
          overflow: visible;
          padding: 2px 0 1px;
        }
        .gcw-header-title {
          font-family: var(--font-playfair), "Playfair Display", serif;
          font-weight: 700;
          font-size: 17px;
          color: #FAFAF7;
          margin: 0;
          padding-bottom: 3px;
          line-height: 1.45;
          letter-spacing: 0.02em;
          display: block;
          overflow: visible;
        }
        .gcw-header-status {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
          margin: 5px 0 0;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 10px;
          font-weight: 400;
          line-height: 1.2;
        }
        .gcw-status-online {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-weight: 500;
          color: rgba(250,250,247,0.65);
        }
        .gcw-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #6B7C3A;
          box-shadow: 0 0 8px rgba(107,124,58,0.55);
          flex-shrink: 0;
        }
        .gcw-status-sep {
          color: rgba(201,168,76,0.35);
          font-weight: 400;
          user-select: none;
        }
        .gcw-status-meta {
          color: rgba(250,250,247,0.42);
          font-weight: 400;
        }
        .gcw-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          border: 1px solid rgba(250,250,247,0.12);
          background: rgba(250,250,247,0.06);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: rgba(250,250,247,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .gcw-close-btn:hover {
          background: rgba(250,250,247,0.12);
          border-color: rgba(201,168,76,0.35);
          color: #FAFAF7;
        }
        .gcw-close-btn:focus-visible { outline: 2px solid #C9A84C; outline-offset: 2px; }

        /* Message wall ONLY — light frosted cream; header/footer stay solid dark glass */
        .gcw-messages {
          flex: 1;
          overflow-y: auto;
          padding: 22px 18px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          background: rgba(250,250,247,0.55);
          backdrop-filter: blur(10px) saturate(115%);
          -webkit-backdrop-filter: blur(10px) saturate(115%);
          scrollbar-width: thin;
          scrollbar-color: rgba(201,168,76,0.45) transparent;
        }
        @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
          .gcw-messages { background: #FAFAF7; }
        }
        .gcw-messages::-webkit-scrollbar { width: 4px; }
        .gcw-messages::-webkit-scrollbar-thumb {
          background: rgba(201,168,76,0.4);
          border-radius: 99px;
        }
        .gcw-messages::-webkit-scrollbar-track { background: transparent; }

        .gcw-bubble-row {
          display: flex;
          flex-direction: column;
          max-width: 84%;
        }
        .gcw-bubble-row-visitor { align-self: flex-end; align-items: flex-end; }
        .gcw-bubble-row-team { align-self: flex-start; align-items: flex-start; }

        .gcw-bubble {
          padding: 12px 16px;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 14px;
          line-height: 1.55;
          letter-spacing: 0.01em;
        }
        .gcw-bubble-team {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(12px) saturate(150%);
          -webkit-backdrop-filter: blur(12px) saturate(150%);
          border: 1px solid rgba(232,213,163,0.55);
          border-left: 3px solid #C9A84C;
          color: #1C1C1C;
          border-radius: 4px 18px 18px 18px;
          box-shadow:
            0 4px 20px rgba(28,28,28,0.06),
            inset 0 1px 0 rgba(255,255,255,0.8);
        }
        .gcw-bubble-visitor {
          background: linear-gradient(135deg, rgba(232,213,163,0.95) 0%, rgba(201,168,76,0.92) 50%, rgba(184,150,12,0.95) 100%);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.45);
          color: #1C1C1C;
          border-radius: 18px 18px 4px 18px;
          box-shadow:
            0 6px 24px rgba(201,168,76,0.22),
            inset 0 1px 0 rgba(255,255,255,0.35);
        }
        @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
          .gcw-bubble-team { background: #FFFFFF; }
          .gcw-bubble-visitor { background: #C9A84C; }
        }
        .gcw-bubble-text { margin: 0; white-space: pre-wrap; word-break: break-word; }
        .gcw-timestamp {
          margin-top: 6px;
          padding: 0 4px;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 10px;
          color: #999999;
        }
        .gcw-bubble-row-visitor .gcw-timestamp { color: #888888; }
        .gcw-error-notice {
          margin-top: 6px;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 10px;
          color: #888888;
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
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #C9A84C;
          animation: gcw-typing-bounce 1.2s ease-in-out infinite;
        }
        .gcw-typing-dot:nth-child(2) { animation-delay: 0.15s; }
        .gcw-typing-dot:nth-child(3) { animation-delay: 0.3s; }

        .gcw-footer {
          flex-shrink: 0;
          padding: 14px 16px;
          padding-bottom: max(14px, env(safe-area-inset-bottom));
          background: rgba(28,28,28,0.88);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border-top: 1px solid rgba(201,168,76,0.2);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
        }
        @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
          .gcw-header { background: #1C1C1C; }
          .gcw-footer { background: #1C1C1C; }
        }

        .gcw-contact-card {
          margin-bottom: 12px;
          padding: 13px 14px 14px;
          border-radius: 16px;
          background: rgba(250,250,247,0.07);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(232,213,163,0.32);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.1),
            0 4px 16px rgba(0,0,0,0.12);
        }
        .gcw-contact-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 12px;
        }
        .gcw-contact-label {
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.01em;
          color: rgba(250,250,247,0.55);
        }
        .gcw-skip-link {
          border: none;
          background: transparent;
          padding: 0;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: rgba(232,213,163,0.7);
          cursor: pointer;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .gcw-skip-link:hover { color: #E8D5A3; }
        .gcw-skip-link:focus-visible { outline: 2px solid #C9A84C; outline-offset: 2px; border-radius: 2px; }

        .gcw-contact-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        @media (max-width: 360px) {
          .gcw-contact-inputs { grid-template-columns: 1fr; }
        }
        .gcw-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }
        .gcw-field-label {
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(232,213,163,0.85);
          padding-left: 2px;
        }
        .gcw-contact-input {
          width: 100%;
          min-width: 0;
          padding: 11px 13px;
          border-radius: 12px;
          border: 1px solid rgba(232,213,163,0.55);
          background: rgba(250,250,247,0.96);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: #1C1C1C;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 13px;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.95),
            inset 0 -1px 0 rgba(28,28,28,0.04),
            0 2px 6px rgba(0,0,0,0.08);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .gcw-contact-input::placeholder { color: #B0B0B0; font-weight: 400; }
        .gcw-field:focus-within .gcw-field-label { color: #C9A84C; }
        .gcw-contact-input:focus {
          border-color: #C9A84C;
          box-shadow:
            0 0 0 3px rgba(201,168,76,0.16),
            inset 0 1px 0 rgba(255,255,255,0.95),
            0 2px 8px rgba(201,168,76,0.12);
          outline: none;
        }

        /* Premium cream-glass composer capsule */
        .gcw-composer {
          display: flex;
          align-items: flex-end;
          gap: 0;
          padding: 5px 5px 5px 6px;
          border-radius: 28px;
          background: rgba(250,250,247,0.94);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(232,213,163,0.65);
          box-shadow:
            0 8px 32px rgba(0,0,0,0.18),
            0 2px 8px rgba(201,168,76,0.12),
            inset 0 1px 0 rgba(255,255,255,0.95),
            inset 0 -1px 0 rgba(28,28,28,0.04);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
          .gcw-composer { background: #FAFAF7; }
        }
        .gcw-composer:focus-within {
          border-color: rgba(201,168,76,0.85);
          box-shadow:
            0 8px 36px rgba(0,0,0,0.2),
            0 0 0 3px rgba(201,168,76,0.15),
            inset 0 1px 0 rgba(255,255,255,0.95);
        }
        .gcw-textarea {
          flex: 1;
          resize: none;
          max-height: 100px;
          overflow-y: hidden;
          padding: 11px 8px 11px 14px;
          border: none;
          background: transparent;
          color: #1C1C1C;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 14px;
          line-height: 1.45;
        }
        .gcw-textarea::placeholder { color: #AAAAAA; }
        .gcw-textarea:focus { outline: none; }

        .gcw-privacy-note {
          margin: 10px 8px 0;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 9px;
          line-height: 1.45;
          letter-spacing: 0.04em;
          color: rgba(250,250,247,0.38);
          text-align: center;
        }
        .gcw-send-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.35);
          flex-shrink: 0;
          background: linear-gradient(145deg, #E8D5A3 0%, #C9A84C 48%, #B8960C 100%);
          color: #1C1C1C;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow:
            0 4px 16px rgba(201,168,76,0.4),
            inset 0 1px 0 rgba(255,255,255,0.4);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .gcw-send-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow:
            0 6px 22px rgba(201,168,76,0.5),
            inset 0 1px 0 rgba(255,255,255,0.45);
        }
        .gcw-send-btn:focus-visible { outline: 2px solid #FAFAF7; outline-offset: 2px; }
        .gcw-send-btn:disabled {
          background: rgba(250,250,247,0.15);
          border-color: rgba(250,250,247,0.1);
          color: rgba(250,250,247,0.3);
          box-shadow: none;
          cursor: not-allowed;
        }

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
          .gcw-root {
            --gcw-edge-x: max(16px, env(safe-area-inset-right, 0px));
            --gcw-edge-y: max(16px, calc(env(safe-area-inset-bottom, 0px) + 12px));
          }
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
        aria-hidden={isOpen}
        tabIndex={isOpen ? -1 : 0}
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
            <p className="gcw-header-status">
              <span className="gcw-status-online">
                <span className="gcw-status-dot" aria-hidden="true" />
                Online
              </span>
              <span className="gcw-status-sep" aria-hidden="true">·</span>
              <span className="gcw-status-meta">Typically replies in minutes</span>
            </p>
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
                  Not sent —{" "}
                  <button
                    type="button"
                    className="gcw-retry-btn"
                    onClick={() => retryMessage(m.id, m.text)}
                  >
                    tap to retry
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

        <div className="gcw-footer">
          {showContactFields && (
            <div className="gcw-contact-card">
              <div className="gcw-contact-header">
                <span className="gcw-contact-label">Share your details (optional)</span>
                <button
                  type="button"
                  className="gcw-skip-link"
                  onClick={() => setContactFieldsDismissed(true)}
                >
                  Skip
                </button>
              </div>
              <div className="gcw-contact-inputs">
                <label className="gcw-field">
                  <span className="gcw-field-label">Name</span>
                  <input
                    type="text"
                    className="gcw-contact-input"
                    placeholder="John Smith"
                    aria-label="Your name (optional)"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                  />
                </label>
                <label className="gcw-field">
                  <span className="gcw-field-label">Email</span>
                  <input
                    type="email"
                    className="gcw-contact-input"
                    placeholder="you@email.com"
                    aria-label="Your email (optional)"
                    value={visitorEmail}
                    onChange={(e) => setVisitorEmail(e.target.value)}
                  />
                </label>
              </div>
            </div>
          )}

          <div className="gcw-composer">
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

          <p className="gcw-privacy-note">
            Your conversation is private and confidential.
          </p>
        </div>
      </div>
    </div>
  );
}
