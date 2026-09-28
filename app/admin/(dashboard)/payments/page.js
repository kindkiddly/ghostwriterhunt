"use client";

import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAdminRealtime } from "@/lib/admin/AdminRealtimeContext";

const STATUS_STYLES = {
  pending: "bg-[#F5F0E3] text-[#8A6D2C]",
  paid: "bg-[#EAF3E4] text-[#4F7A3A]",
  expired: "bg-[#EDEDED] text-[#777777]",
  cancelled: "bg-[#EDEDED] text-[#777777]",
};

const FIXED_PACKAGES = [
  { key: "starter", label: "Starter — $150" },
  { key: "professional", label: "Professional — $200" },
  { key: "complete", label: "Complete — $299" },
];

function formatMoney(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

function SummaryCard({ label, value, sub }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-4 shadow-sm">
      <p className="font-inter text-[11px] font-semibold uppercase tracking-wide text-[#999999]">{label}</p>
      <p className="mt-1 font-playfair text-[22px] font-bold text-[#1C1C1C]">{value}</p>
      {sub ? <p className="mt-0.5 font-inter text-[11px] text-[#888888]">{sub}</p> : null}
    </div>
  );
}

function PaymentsTable({ filtered, copyUrl }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm">
      <table className="w-full min-w-[880px] border-collapse text-[#1C1C1C]">
        <thead className="bg-[var(--color-background)]">
          <tr className="border-b border-[var(--color-border)] text-left">
            {["Amount", "Description", "Status", "Source", "Created", "Invoice / Links"].map((h) => (
              <th
                key={h}
                className="px-4 py-3 font-inter text-[12px] font-semibold uppercase tracking-wide text-[#666666]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr
              key={p.id}
              className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-background)]"
            >
              <td className="px-4 py-3 font-inter text-[13px] font-semibold text-[#1C1C1C]">
                {formatMoney(p.amount_cents)}
              </td>
              <td className="max-w-[240px] px-4 py-3 font-inter text-[13px] text-[#444444]">
                <p className="line-clamp-2">{p.description}</p>
                {p.package_key && (
                  <span className="mt-1 inline-block font-inter text-[11px] text-[#999999]">{p.package_key}</span>
                )}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2 py-0.5 font-inter text-[11px] font-semibold uppercase ${STATUS_STYLES[p.status] || ""}`}
                >
                  {p.status}
                </span>
              </td>
              <td className="px-4 py-3 font-inter text-[13px] capitalize text-[#444444]">{p.created_by}</td>
              <td className="px-4 py-3 font-inter text-[12px] text-[#666666]">
                {new Date(p.created_at).toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {p.status === "paid" && p.stripe_invoice_url && (
                    <a
                      href={p.stripe_invoice_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-inter text-[12px] font-semibold text-[var(--color-accent-gold)] hover:underline"
                    >
                      View invoice
                    </a>
                  )}
                  {p.stripe_payment_link_url && p.status === "pending" && (
                    <button
                      type="button"
                      onClick={() => copyUrl(p.stripe_payment_link_url)}
                      className="font-inter text-[12px] font-semibold text-[var(--color-accent-gold)] hover:underline"
                    >
                      Copy link
                    </button>
                  )}
                  {p.conversation_id && (
                    <Link
                      href={`/admin?c=${p.conversation_id}`}
                      className="font-inter text-[12px] text-[#666666] hover:underline"
                    >
                      Open chat
                    </Link>
                  )}
                  {p.contact_id && (
                    <Link
                      href={`/admin/contacts/${p.contact_id}`}
                      className="font-inter text-[12px] text-[#666666] hover:underline"
                    >
                      Contact
                    </Link>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PaymentsContent() {
  const { supabase } = useAdminRealtime();
  const searchParams = useSearchParams();
  const prefillConversationId = searchParams.get("conversationId") || "";
  const prefillContactId = searchParams.get("contactId") || "";

  const [payments, setPayments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const [mode, setMode] = useState("custom");
  const [packageKey, setPackageKey] = useState("professional");
  const [amountUsd, setAmountUsd] = useState("350");
  const [description, setDescription] = useState("");
  const [contactId, setContactId] = useState(prefillContactId);
  const [conversationId, setConversationId] = useState(prefillConversationId);
  const [sendEmail, setSendEmail] = useState(true);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [lastCreatedUrl, setLastCreatedUrl] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [paymentMode, setPaymentMode] = useState({ mock: true, live: false });

  useEffect(() => {
    fetch("/api/stripe/status")
      .then((r) => r.json())
      .then((data) => setPaymentMode({ mock: !!data.mock, live: !!data.live }))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setContactId(prefillContactId);
    setConversationId(prefillConversationId);
  }, [prefillContactId, prefillConversationId]);

  const loadPayments = useCallback(async () => {
    setLoading(true);
    const [{ data: paymentRows, error: payErr }, { data: contactRows }] = await Promise.all([
      supabase.from("payments").select("*").order("created_at", { ascending: false }),
      supabase.from("contacts").select("id, name, email").order("created_at", { ascending: false }).limit(200),
    ]);
    if (payErr) setError(payErr.message);
    else setPayments(paymentRows || []);
    setContacts(contactRows || []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    loadPayments();
    const channel = supabase
      .channel("admin-payments")
      .on("postgres_changes", { event: "*", schema: "public", table: "payments" }, loadPayments)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, loadPayments]);

  useEffect(() => {
    if (!createModalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setCreateModalOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [createModalOpen]);

  const summary = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    let monthCents = 0;
    let allTimeCents = 0;
    let paidCount = 0;
    let pendingCount = 0;

    for (const p of payments) {
      if (p.status === "paid") {
        paidCount += 1;
        allTimeCents += p.amount_cents || 0;
        const paidAt = p.paid_at ? new Date(p.paid_at) : new Date(p.created_at);
        if (paidAt >= monthStart) monthCents += p.amount_cents || 0;
      } else if (p.status === "pending") {
        pendingCount += 1;
      }
    }

    return { monthCents, allTimeCents, paidCount, pendingCount };
  }, [payments]);

  const filtered = useMemo(() => {
    if (statusFilter === "all") return payments;
    return payments.filter((p) => p.status === statusFilter);
  }, [payments, statusFilter]);

  async function handleCreateLink(e) {
    e.preventDefault();
    setCreating(true);
    setCreateError(null);
    setLastCreatedUrl(null);

    const body =
      mode === "fixed"
        ? { packageKey, contactId: contactId || null, conversationId: conversationId || null, sendEmail }
        : {
            amountUsd: parseFloat(amountUsd),
            description: description.trim(),
            contactId: contactId || null,
            conversationId: conversationId || null,
            sendEmail,
          };

    try {
      const res = await fetch("/api/stripe/create-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not create link");
      setLastCreatedUrl(data.url);
      if (mode === "custom") setDescription("");
      setCreateModalOpen(false);
      await loadPayments();
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setCreating(false);
    }
  }

  async function copyUrl(url) {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain px-4 py-5 pb-28 lg:px-8 lg:py-8 lg:pb-8">
      <div className="mb-5 flex shrink-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-playfair text-[24px] font-bold text-[#1C1C1C]">Payments</h1>
          <p className="mt-1 font-inter text-[13px] text-[#666666]">
            Track checkout and payment links. Create new links for fixed packages or custom amounts.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setCreateError(null);
            setLastCreatedUrl(null);
            setCreateModalOpen(true);
          }}
          className="admin-btn-emerald shrink-0 rounded-lg px-5 py-2.5 font-inter text-[14px] font-semibold transition-colors disabled:opacity-60"
        >
          Create payment link
        </button>
      </div>

      {paymentMode.mock && !paymentMode.live && (
        <div className="mb-5 shrink-0 rounded-xl border border-dashed border-[#C9A84C] bg-[#FFFBF0] px-4 py-3">
          <p className="font-inter text-[13px] font-semibold text-[#8A6D2C]">Demo payment mode</p>
          <p className="mt-1 font-inter text-[12px] leading-relaxed text-[#8A6D2C]">
            Stripe keys are not connected yet. Links open a mock checkout page on your site (no real
            charge). Add <code className="text-[11px]">STRIPE_SECRET_KEY</code> and set{" "}
            <code className="text-[11px]">STRIPE_MOCK_MODE=false</code> when ready for live payments.
          </p>
        </div>
      )}

      <div className="mb-6 grid shrink-0 grid-cols-2 gap-3 lg:grid-cols-4">
        <SummaryCard label="This month" value={formatMoney(summary.monthCents)} sub="Paid only" />
        <SummaryCard label="All time" value={formatMoney(summary.allTimeCents)} sub="Paid only" />
        <SummaryCard label="Paid" value={String(summary.paidCount)} />
        <SummaryCard label="Pending" value={String(summary.pendingCount)} />
      </div>

      <section className="mb-8 shrink-0" aria-labelledby="payments-history-heading">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="payments-history-heading" className="font-playfair text-[18px] font-bold text-[#1C1C1C]">
            Payment history
          </h2>
          <div className="flex flex-wrap gap-2">
            {["all", "pending", "paid", "expired", "cancelled"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`rounded-full px-3 py-1 font-inter text-[12px] font-semibold capitalize ${
                  statusFilter === s ? "bg-[#1C1C1C] text-white" : "bg-[var(--color-background)] text-[#666666]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="font-inter text-[13px] text-[#999999]">Loading payments…</p>
        ) : error ? (
          <p className="font-inter text-[13px] text-[#9A2E24]">
            Couldn&apos;t load payments: {error}. Apply migration 007 if the table is missing.
          </p>
        ) : filtered.length === 0 ? (
          <p className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-8 text-center font-inter text-[13px] text-[#999999]">
            No payments yet.
          </p>
        ) : (
          <PaymentsTable filtered={filtered} copyUrl={copyUrl} />
        )}
      </section>

      {createModalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          role="presentation"
          onClick={() => setCreateModalOpen(false)}
        >
          <div className="absolute inset-0 bg-[#1C1C1C]/40 backdrop-blur-[2px]" aria-hidden="true" />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-payment-link-title"
            className="relative z-[1] max-h-[min(90vh,720px)] w-full max-w-[640px] overflow-y-auto rounded-2xl border border-[rgba(232,213,163,0.9)] bg-[rgba(255,255,255,0.88)] p-5 shadow-[0_24px_60px_rgba(28,28,28,0.18)] backdrop-blur-[16px] sm:p-6 supports-[backdrop-filter]:bg-[rgba(255,255,255,0.82)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <h2 id="create-payment-link-title" className="font-playfair text-[20px] font-bold text-[#1C1C1C]">
                Create payment link
              </h2>
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-white/80 font-inter text-[18px] leading-none text-[#666666] hover:text-[#1C1C1C]"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLink}>
              <div className="mb-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setMode("custom")}
                  className={`rounded-full px-3 py-1 font-inter text-[12px] font-semibold ${
                    mode === "custom" ? "bg-[#1C1C1C] text-white" : "bg-[var(--color-background)] text-[#666666]"
                  }`}
                >
                  Custom amount
                </button>
                <button
                  type="button"
                  onClick={() => setMode("fixed")}
                  className={`rounded-full px-3 py-1 font-inter text-[12px] font-semibold ${
                    mode === "fixed" ? "bg-[#1C1C1C] text-white" : "bg-[var(--color-background)] text-[#666666]"
                  }`}
                >
                  Fixed package
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {mode === "fixed" ? (
                  <label className="block sm:col-span-2">
                    <span className="mb-1 block font-inter text-[12px] font-semibold text-[#666666]">Package</span>
                    <select
                      value={packageKey}
                      onChange={(e) => setPackageKey(e.target.value)}
                      className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] text-[#1C1C1C]"
                    >
                      {FIXED_PACKAGES.map((p) => (
                        <option key={p.key} value={p.key}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : (
                  <>
                    <label className="block">
                      <span className="mb-1 block font-inter text-[12px] font-semibold text-[#666666]">Amount (USD)</span>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={amountUsd}
                        onChange={(e) => setAmountUsd(e.target.value)}
                        className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] text-[#1C1C1C]"
                        required
                      />
                      <span className="mt-1 block font-inter text-[11px] text-[#888888]">
                        Whole dollars only (Stripe minimum applies).
                      </span>
                    </label>
                    <label className="block sm:col-span-1">
                      <span className="mb-1 block font-inter text-[12px] font-semibold text-[#666666]">
                        Description (shown on Stripe)
                      </span>
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. Professional + website add-on"
                        className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] text-[#1C1C1C]"
                        required
                      />
                    </label>
                  </>
                )}

                <label className="block">
                  <span className="mb-1 block font-inter text-[12px] font-semibold text-[#666666]">Contact (optional)</span>
                  <select
                    value={contactId}
                    onChange={(e) => setContactId(e.target.value)}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] text-[#1C1C1C]"
                  >
                    <option value="">— None —</option>
                    {contacts.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name || c.email || c.id.slice(0, 8)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1 block font-inter text-[12px] font-semibold text-[#666666]">
                    Conversation ID (optional)
                  </span>
                  <input
                    type="text"
                    value={conversationId}
                    onChange={(e) => setConversationId(e.target.value)}
                    placeholder="From inbox URL ?c=…"
                    className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] text-[#1C1C1C]"
                  />
                </label>
              </div>

              <label className="mt-4 flex items-center gap-2 font-inter text-[13px] text-[#666666]">
                <input type="checkbox" checked={sendEmail} onChange={(e) => setSendEmail(e.target.checked)} />
                Email link to contact (if contact has email)
              </label>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={creating}
                  className="admin-btn-primary rounded-lg bg-[var(--color-accent-gold)] px-5 py-2.5 font-inter text-[14px] font-semibold text-white hover:bg-[#B8960C] disabled:opacity-60"
                >
                  {creating ? "Creating…" : "Create Stripe link"}
                </button>
                {createError && <p className="font-inter text-[13px] text-[#9A2E24]">{createError}</p>}
              </div>

              {lastCreatedUrl && (
                <div className="mt-4 rounded-lg bg-[var(--color-background)] p-4">
                  <p className="font-inter text-[12px] font-semibold text-[#666666]">Payment link created</p>
                  <p className="mt-1 break-all font-inter text-[13px] text-[#1C1C1C]">{lastCreatedUrl}</p>
                  <button
                    type="button"
                    onClick={() => copyUrl(lastCreatedUrl)}
                    className="mt-2 font-inter text-[12px] font-semibold text-[var(--color-accent-gold)] hover:underline"
                  >
                    Copy link
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PaymentsPage() {
  return (
    <Suspense fallback={<div className="p-6 font-inter text-[13px] text-[#999999]">Loading…</div>}>
      <PaymentsContent />
    </Suspense>
  );
}
