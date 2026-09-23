"use client";

import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAdminRealtime } from "@/lib/admin/AdminRealtimeContext";
import ConversationListItem from "@/components/admin/ConversationListItem";
import ConversationDetail from "@/components/admin/ConversationDetail";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "open", label: "Open" },
  { key: "closed", label: "Closed" },
];

function InboxContent() {
  const { conversations, loading, loadError } = useAdminRealtime();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("c");

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = conversations;
    if (filter !== "all") list = list.filter((c) => c.status === filter);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((c) => {
        return (
          (c.contact_name || "").toLowerCase().includes(q) ||
          (c.contact_email || "").toLowerCase().includes(q) ||
          (c.last_message_preview || "").toLowerCase().includes(q)
        );
      });
    }
    return list;
  }, [conversations, filter, search]);

  function selectConversation(id) {
    router.push(`/admin?c=${id}`);
  }
  function clearSelection() {
    router.push("/admin");
  }

  const showListOnMobile = !selectedId;

  return (
    <div className="flex h-full min-h-0">
      <div
        className={`flex h-full min-h-0 w-full flex-col border-r border-[var(--color-border)] bg-[var(--color-card)] lg:w-[360px] lg:shrink-0 ${
          showListOnMobile ? "flex" : "hidden lg:flex"
        }`}
      >
        <div className="flex flex-col gap-3 border-b border-[var(--color-border)] px-4 py-3">
          <h1 className="font-playfair text-[20px] font-bold text-[var(--color-text)]">Inbox</h1>
          <input
            type="search"
            placeholder="Search name, email or message…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search conversations"
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] text-[var(--color-text)] outline-none focus:border-[var(--color-accent-gold)]"
          />
          <div className="flex gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-3 py-1 font-inter text-[12px] font-semibold transition-colors ${
                  filter === f.key
                    ? "bg-[var(--color-text)] text-white"
                    : "bg-[var(--color-background)] text-[#666666] hover:bg-[#EFEAD9]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <p className="px-4 py-6 text-center font-inter text-[13px] text-[#999999]">Loading conversations…</p>
          ) : loadError ? (
            <div className="px-4 py-6 text-center">
              <p className="font-inter text-[13px] text-[#9A2E24]">
                Couldn&apos;t load the inbox: {loadError}
              </p>
              <p className="mt-2 font-inter text-[12px] text-[#999999]">
                If this mentions a missing table or view, migration 002 may not be applied yet.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <p className="px-4 py-6 text-center font-inter text-[13px] text-[#999999]">
              {conversations.length === 0 ? "No conversations yet." : "No conversations match your filters."}
            </p>
          ) : (
            filtered.map((c) => (
              <ConversationListItem
                key={c.id}
                conversation={c}
                active={c.id === selectedId}
                onClick={() => selectConversation(c.id)}
              />
            ))
          )}
        </div>
      </div>

      <div className={`h-full min-h-0 flex-1 ${showListOnMobile ? "hidden lg:block" : "block"}`}>
        {selectedId ? (
          <ConversationDetail conversationId={selectedId} onBack={clearSelection} />
        ) : (
          <div className="hidden h-full items-center justify-center lg:flex">
            <p className="font-inter text-[14px] text-[#999999]">Select a conversation to view it here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function InboxPage() {
  return (
    <Suspense fallback={<div className="p-6 font-inter text-[13px] text-[#999999]">Loading…</div>}>
      <InboxContent />
    </Suspense>
  );
}
