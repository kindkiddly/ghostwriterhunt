"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useAdminRealtime } from "@/lib/admin/AdminRealtimeContext";

const STATUS_FILTERS = [
  { key: "pending", label: "Pending" },
  { key: "contacted", label: "Contacted" },
  { key: "resolved", label: "Resolved" },
  { key: "all", label: "All" },
];

const STATUS_STYLES = {
  pending: "bg-[#FCEAE8] text-[#9A2E24]",
  contacted: "bg-[#F5F0E3] text-[#8A6D2C]",
  resolved: "bg-[#EAF3E4] text-[#4F7A3A]",
};

function formatWhen(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function CallbacksPage() {
  const { supabase, callbackPendingCount } = useAdminRealtime();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const { data, error: err } = await supabase
        .from("admin_callback_requests_view")
        .select("*")
        .order("callback_requested_at", { ascending: false });

      if (cancelled) return;
      if (err) setError(err.message);
      else setRows(data || []);
      setLoading(false);
    }

    load();

    const channel = supabase
      .channel("admin-callback-requests")
      .on("postgres_changes", { event: "*", schema: "public", table: "conversations" }, load)
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const filtered = useMemo(() => {
    let list = rows;
    if (statusFilter !== "all") {
      list = list.filter((r) => r.callback_status === statusFilter);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (r) =>
          (r.contact_name || "").toLowerCase().includes(q) ||
          (r.contact_email || "").toLowerCase().includes(q) ||
          (r.contact_phone || "").toLowerCase().includes(q) ||
          (r.callback_reason || "").toLowerCase().includes(q) ||
          (r.last_message_preview || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [rows, statusFilter, search]);

  async function markSeen(conversationId) {
    await supabase
      .from("conversations")
      .update({ callback_admin_seen_at: new Date().toISOString() })
      .eq("id", conversationId);
  }

  async function updateStatus(conversationId, status) {
    setUpdatingId(conversationId);
    await supabase.from("conversations").update({ callback_status: status }).eq("id", conversationId);
    setUpdatingId(null);
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto px-4 py-5 lg:px-8 lg:py-8">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-playfair text-[24px] font-bold text-[var(--color-text)]">Callbacks</h1>
          <p className="mt-1 font-inter text-[13px] text-[#666666]">
            Visitors who asked to speak with a human representative — call or email them from here.
          </p>
        </div>
        {callbackPendingCount > 0 && (
          <span className="inline-flex w-fit items-center rounded-full bg-[#FCEAE8] px-3 py-1 font-inter text-[12px] font-semibold text-[#9A2E24]">
            {callbackPendingCount} pending
          </span>
        )}
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          placeholder="Search name, email, phone or reason…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search callback requests"
          className="w-full max-w-[320px] rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] text-[var(--color-text)] outline-none focus:border-[var(--color-accent-gold)]"
        />
        <div className="flex flex-wrap gap-1.5">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setStatusFilter(f.key)}
              className={`rounded-full px-3 py-1 font-inter text-[12px] font-semibold transition-colors ${
                statusFilter === f.key
                  ? "bg-[var(--color-text)] text-white"
                  : "bg-[var(--color-background)] text-[#666666] hover:bg-[#EFEAD9]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="font-inter text-[13px] text-[#999999]">Loading callback requests…</p>
      ) : error ? (
        <p className="font-inter text-[13px] text-[#9A2E24]">
          Couldn&apos;t load callbacks: {error}. Apply migration 006 if this mentions a missing view.
        </p>
      ) : filtered.length === 0 ? (
        <p className="font-inter text-[13px] text-[#999999]">
          {rows.length === 0 ? "No callback requests yet." : "No requests match your filters."}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]">
          <table className="w-full min-w-[920px] border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left">
                {["Contact", "Phone", "Country", "Requested", "Reason", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 font-inter text-[12px] font-semibold uppercase tracking-wide text-[#999999]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr
                  key={row.conversation_id}
                  className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-background)]"
                >
                  <td className="px-4 py-3">
                    <p className="font-inter text-[13px] font-medium text-[var(--color-text)]">
                      {row.contact_name || "Anonymous visitor"}
                    </p>
                    <p className="font-inter text-[12px] text-[#666666]">{row.contact_email || "No email yet"}</p>
                    {row.contact_id && (
                      <Link
                        href={`/admin/contacts/${row.contact_id}`}
                        className="font-inter text-[12px] text-[var(--color-accent-gold)] hover:underline"
                      >
                        View contact
                      </Link>
                    )}
                  </td>
                  <td className="px-4 py-3 font-inter text-[13px] text-[#666666]">{row.contact_phone || "—"}</td>
                  <td className="px-4 py-3 font-inter text-[13px] text-[#666666]">{row.country || "—"}</td>
                  <td className="px-4 py-3 font-inter text-[13px] text-[#999999]">
                    {formatWhen(row.callback_requested_at)}
                  </td>
                  <td className="max-w-[220px] px-4 py-3 font-inter text-[13px] text-[#666666]">
                    <p className="line-clamp-2">{row.callback_reason || "—"}</p>
                    {row.last_message_preview && (
                      <p className="mt-1 truncate text-[11px] text-[#999999]">&ldquo;{row.last_message_preview}&rdquo;</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 font-inter text-[11px] font-semibold uppercase tracking-wide ${
                        STATUS_STYLES[row.callback_status] || ""
                      }`}
                    >
                      {row.callback_status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin?c=${row.conversation_id}`}
                        onClick={() => markSeen(row.conversation_id)}
                        className="rounded-lg border border-[var(--color-border)] bg-white px-2.5 py-1.5 font-inter text-[12px] font-medium text-[var(--color-text)] hover:bg-[var(--color-background)]"
                      >
                        Open chat
                      </Link>
                      {row.callback_status === "pending" && (
                        <button
                          type="button"
                          disabled={updatingId === row.conversation_id}
                          onClick={() => updateStatus(row.conversation_id, "contacted")}
                          className="rounded-lg bg-[#F5F0E3] px-2.5 py-1.5 font-inter text-[12px] font-semibold text-[#8A6D2C] hover:bg-[#EFEAD9] disabled:opacity-50"
                        >
                          Mark contacted
                        </button>
                      )}
                      {row.callback_status !== "resolved" && (
                        <button
                          type="button"
                          disabled={updatingId === row.conversation_id}
                          onClick={() => updateStatus(row.conversation_id, "resolved")}
                          className="rounded-lg bg-[#EAF3E4] px-2.5 py-1.5 font-inter text-[12px] font-semibold text-[#4F7A3A] hover:bg-[#DCEBD4] disabled:opacity-50"
                        >
                          Resolved
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
