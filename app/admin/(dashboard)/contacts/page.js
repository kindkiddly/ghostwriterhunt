"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useAdminRealtime } from "@/lib/admin/AdminRealtimeContext";

const STATUS_OPTIONS = ["all", "new", "contacted", "qualified", "client", "closed"];
const SOURCE_OPTIONS = ["all", "chat", "contact_form"];

const STATUS_STYLES = {
  new: "bg-[#EAF2FB] text-[#2C5B8A]",
  contacted: "bg-[#F5F0E3] text-[#8A6D2C]",
  qualified: "bg-[#EDE7F6] text-[#5B3E96]",
  client: "bg-[#EAF3E4] text-[#4F7A3A]",
  closed: "bg-[#EDEDED] text-[#777777]",
};

export default function ContactsPage() {
  const { supabase } = useAdminRealtime();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const { data, error: err } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });
      if (cancelled) return;
      if (err) setError(err.message);
      else setContacts(data || []);
      setLoading(false);
    }
    load();

    const channel = supabase
      .channel("admin-contacts")
      .on("postgres_changes", { event: "*", schema: "public", table: "contacts" }, load)
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const filtered = useMemo(() => {
    let list = contacts;
    if (statusFilter !== "all") list = list.filter((c) => c.status === statusFilter);
    if (sourceFilter !== "all") list = list.filter((c) => c.source === sourceFilter);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (c) =>
          (c.name || "").toLowerCase().includes(q) ||
          (c.email || "").toLowerCase().includes(q) ||
          (c.phone || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [contacts, statusFilter, sourceFilter, search]);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto px-4 py-5 lg:px-8 lg:py-8">
      <h1 className="mb-5 font-playfair text-[24px] font-bold text-[var(--color-text)]">Contacts</h1>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          placeholder="Search name, email or phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search contacts"
          className="w-full max-w-[320px] rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] text-[var(--color-text)] outline-none focus:border-[var(--color-accent-gold)]"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter by status"
          className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] text-[var(--color-text)] outline-none focus:border-[var(--color-accent-gold)]"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s === "all" ? "All statuses" : s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          aria-label="Filter by source"
          className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] text-[var(--color-text)] outline-none focus:border-[var(--color-accent-gold)]"
        >
          {SOURCE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s === "all" ? "All sources" : s === "contact_form" ? "Contact form" : "Chat"}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="font-inter text-[13px] text-[#999999]">Loading contacts…</p>
      ) : error ? (
        <p className="font-inter text-[13px] text-[#9A2E24]">Couldn&apos;t load contacts: {error}</p>
      ) : filtered.length === 0 ? (
        <p className="font-inter text-[13px] text-[#999999]">
          {contacts.length === 0 ? "No contacts yet." : "No contacts match your filters."}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left">
                {["Name", "Email", "Phone", "Source", "Status", "Created"].map((h) => (
                  <th key={h} className="px-4 py-3 font-inter text-[12px] font-semibold uppercase tracking-wide text-[#999999]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-background)]">
                  <td className="px-4 py-3 font-inter text-[13px] font-medium text-[var(--color-text)]">
                    <Link href={`/admin/contacts/${c.id}`} className="hover:text-[var(--color-accent-gold)]">
                      {c.name || "—"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-inter text-[13px] text-[#666666]">{c.email || "—"}</td>
                  <td className="px-4 py-3 font-inter text-[13px] text-[#666666]">{c.phone || "—"}</td>
                  <td className="px-4 py-3 font-inter text-[13px] text-[#666666]">
                    {c.source === "contact_form" ? "Contact form" : c.source === "chat" ? "Chat" : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 font-inter text-[11px] font-semibold uppercase tracking-wide ${STATUS_STYLES[c.status] || ""}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-inter text-[13px] text-[#999999]">
                    {new Date(c.created_at).toLocaleDateString()}
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
