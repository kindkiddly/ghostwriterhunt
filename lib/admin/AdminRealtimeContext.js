"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * GhostWriterHunt — Admin realtime context
 * Single shared subscription (conversations + messages) for the whole
 * /admin dashboard shell, so the sidebar's unread badge and the Inbox
 * page's list always agree, and the notification sound only depends on
 * one subscription regardless of which admin page is open.
 */

const AdminRealtimeContext = createContext(null);
const SOUND_PREF_KEY = "gwh-admin-sound-enabled";

function playNotificationBeep() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    [880, 1320].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.15, now + i * 0.12 + 0.02);
      gain.gain.linearRampToValueAtTime(0, now + i * 0.12 + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.2);
    });

    setTimeout(() => ctx.close(), 500);
  } catch {
    // Sound is a nice-to-have; never let it break the dashboard.
  }
}

export function isConversationUnread(conv) {
  if (!conv?.last_message_at) return false;
  if (conv.last_message_sender === "agent") return false;
  if (!conv.last_admin_seen_at) return true;
  return new Date(conv.last_message_at) > new Date(conv.last_admin_seen_at);
}

export function AdminRealtimeProvider({ children }) {
  const [supabase] = useState(() => createClient());
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const knownIdsRef = useRef(new Set());
  const initialLoadDoneRef = useRef(false);
  const soundEnabledRef = useRef(true);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SOUND_PREF_KEY);
      if (saved !== null) setSoundEnabled(saved === "true");
    } catch {
      // localStorage unavailable — keep the default.
    }
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(SOUND_PREF_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const refresh = useCallback(async () => {
    const { data, error } = await supabase
      .from("admin_conversations_view")
      .select("*")
      .order("last_message_at", { ascending: false, nullsFirst: false });

    if (error) {
      setLoadError(error.message);
      setLoading(false);
      return;
    }

    setLoadError(null);
    knownIdsRef.current = new Set((data || []).map((c) => c.id));
    setConversations(data || []);
    setLoading(false);
    initialLoadDoneRef.current = true;
  }, [supabase]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const channel = supabase
      .channel("admin-conversations-and-messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "conversations" },
        (payload) => {
          if (initialLoadDoneRef.current && !knownIdsRef.current.has(payload.new.id)) {
            knownIdsRef.current.add(payload.new.id);
            if (soundEnabledRef.current) playNotificationBeep();
          }
          refresh();
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "conversations" },
        () => refresh()
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          if (initialLoadDoneRef.current && payload.new.sender === "visitor" && soundEnabledRef.current) {
            playNotificationBeep();
          }
          refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, refresh]);

  // Online presence: passively listen on the same shared "chat-presence"
  // channel visitors track themselves on (keyed by conversation id), and
  // keep a live set of which conversations currently have an open tab.
  const [onlineConversationIds, setOnlineConversationIds] = useState(new Set());

  useEffect(() => {
    const channel = supabase.channel("chat-presence", {
      config: { presence: { key: "__admin__" } },
    });

    channel.on("presence", { event: "sync" }, () => {
      setOnlineConversationIds(new Set(Object.keys(channel.presenceState())));
    });

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const markSeen = useCallback(
    async (conversationId) => {
      const seenAt = new Date().toISOString();
      setConversations((prev) =>
        prev.map((c) => (c.id === conversationId ? { ...c, last_admin_seen_at: seenAt } : c))
      );
      await supabase
        .from("conversations")
        .update({ last_admin_seen_at: seenAt })
        .eq("id", conversationId);
    },
    [supabase]
  );

  const unreadCount = conversations.filter(isConversationUnread).length;

  return (
    <AdminRealtimeContext.Provider
      value={{
        supabase,
        conversations,
        loading,
        loadError,
        refresh,
        soundEnabled,
        toggleSound,
        markSeen,
        unreadCount,
        onlineConversationIds,
      }}
    >
      {children}
    </AdminRealtimeContext.Provider>
  );
}

export function useAdminRealtime() {
  const ctx = useContext(AdminRealtimeContext);
  if (!ctx) throw new Error("useAdminRealtime must be used within AdminRealtimeProvider");
  return ctx;
}
