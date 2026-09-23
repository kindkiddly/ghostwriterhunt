"use client";

import { isConversationUnread, useAdminRealtime } from "@/lib/admin/AdminRealtimeContext";

function timeAgo(iso) {
  if (!iso) return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export default function ConversationListItem({ conversation, active, onClick }) {
  const { onlineConversationIds } = useAdminRealtime();
  const unread = isConversationUnread(conversation);
  const online = onlineConversationIds.has(conversation.id);
  const name = conversation.contact_name || "Anonymous visitor";
  const preview = conversation.last_message_preview || "No messages yet";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full flex-col gap-1 border-b border-[var(--color-border)] px-4 py-3 text-left transition-colors ${
        active ? "bg-[var(--color-background)]" : "bg-[var(--color-card)] hover:bg-[var(--color-background)]"
      }`}
    >
      <div className="flex items-center gap-2">
        {unread && <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent-gold)]" aria-label="Unread" />}
        <p
          className={`min-w-0 flex-1 truncate font-inter text-[14px] ${
            unread ? "font-semibold text-[var(--color-text)]" : "font-medium text-[var(--color-text)]"
          }`}
        >
          {name}
        </p>
        <span className="shrink-0 font-inter text-[11px] text-[#999999]">
          {timeAgo(conversation.last_message_at || conversation.created_at)}
        </span>
      </div>

      <p className="truncate font-inter text-[13px] text-[#666666]">
        {conversation.last_message_sender === "visitor" ? "" : conversation.last_message_sender ? "You: " : ""}
        {preview}
      </p>

      <div className="flex items-center gap-1.5">
        <span className="flex items-center gap-1 font-inter text-[11px] text-[#999999]">
          <span
            className={`h-1.5 w-1.5 rounded-full ${online ? "bg-[#4F9A55]" : "bg-[#C4C4C4]"}`}
            aria-hidden="true"
          />
          {online ? "Online" : "Offline"}
        </span>
        {conversation.country && (
          <span className="font-inter text-[11px] text-[#999999]">{conversation.country}</span>
        )}
        <span
          className={`rounded-full px-2 py-0.5 font-inter text-[10px] font-semibold uppercase tracking-wide ${
            conversation.status === "open"
              ? "bg-[#EAF3E4] text-[#4F7A3A]"
              : "bg-[#EDEDED] text-[#777777]"
          }`}
        >
          {conversation.status}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 font-inter text-[10px] font-semibold uppercase tracking-wide ${
            conversation.ai_enabled ? "bg-[#EAF2FB] text-[#2C5B8A]" : "bg-[#F5F0E3] text-[#8A6D2C]"
          }`}
        >
          AI {conversation.ai_enabled ? "on" : "off"}
        </span>
      </div>
    </button>
  );
}
