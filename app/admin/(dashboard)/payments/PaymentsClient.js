"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
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

const HISTORY_MIN_HEIGHT = 280;
const DEMO_BANNER_MIN_HEIGHT = 92;
const SUMMARY_CARD_MIN_HEIGHT = 92;

function formatMoney(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

function SummaryCard({ label, value, sub }) {
  return (
    <div
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-4 shadow-sm"
      style={{ minHeight: SUMMARY_CARD_MIN_HEIGHT }}
    >
      <p className="font-inter text-[11px] font-semibold uppercase tracking-wide text-[#999999]">{label}</p>
      <p className="mt-1 font-playfair text-[22px] font-bold leading-tight text-[#1C1C1C]">{value}</p>
      {sub ? <p className="mt-0.5 font-inter text-[11px] text-[#888888]">{sub}</p> : null}
    </div>
  );
}

const TABLE_HEADERS = ["Amount", "Description", "Status", "Source", "Created", "Invoice / Links"];

function PaymentsHistoryBody({ loading, error, filtered, onCopyLink, copiedPaymentId }) {
  if (loading) {
    return (
      <tr>
        <td colSpan={TABLE_HEADERS.length} className="px-4 py-16 text-center font-inter text-[13px] text-[#999999]">
          Loading payments…
        </td>
      </tr>
    );
  }
  if (error) {
    return (
      <tr>
        <td colSpan={TABLE_HEADERS.length} className="px-4 py-8 font-inter text-[13px] text-[#9A2E24]">
          Couldn&apos;t load payments: {error}. Apply migration 007 if the table is missing.
        </td>
      </tr>
    );
  }
  if (filtered.length === 0) {
    return (
      <tr>
        <td colSpan={TABLE_HEADERS.length} className="px-4 py-16 text-center font-inter text-[13px] text-[#999999]">
          No payments yet.
        </td>
      </tr>
    );
  }
  return filtered.map((p) => (
    <tr
      key={p.id}
      className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-background)]"
    >
      <td className="px-4 py-3 font-inter text-[13px] font-semibold text-[#1C1C1C]">{formatMoney(p.amount_cents)}</td>
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
              onClick={() => onCopyLink(p.stripe_payment_link_url, p.id)}
              className="admin-btn-secondary px-2 py-1 text-[11px] font-semibold"
            >
              {copiedPaymentId === p.id ? "Copied" : "Copy link"}
            </button>
          )}
          {p.payment_link_emailed_at && (
            <span className="font-inter text-[11px] text-[#666666]">
              Emailed {new Date(p.payment_link_emailed_at).toLocaleString()}
            </span>
          )}
          {p.conversation_id && (
            <Link href={`/admin?c=${p.conversation_id}`} className="font-inter text-[12px] text-[#666666] hover:underline">
              Open chat
            </Link>
          )}
          {p.contact_id && (
            <Link href={`/admin/contacts/${p.contact_id}`} className="font-inter text-[12px] text-[#666666] hover:underline">
              Contact
            </Link>
          )}
        </div>
      </td>
    </tr>
  ));
}

export default function PaymentsClient({ prefillContactId = "", prefillConversationId = "" }) {
  const { supabase } = useAdminRealtime();

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
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState("form");
  const [createResult, setCreateResult] = useState(null);
  const [copyFeedback, setCopyFeedback] = useState("idle");
  const [sendFeedback, setSendFeedback] = useState("idle");
  const [tableCopiedId, setTableCopiedId] = useState(null);
  const [paymentMode, setPaymentMode] = useState({ mock: true, live: false });
  const [stripeStatusReady, setStripeStatusReady] = useState(false);

  useEffect(() => {
    fetch("/api/stripe/status")
      .then((r) => r.json())
      .then((data) => setPaymentMode({ mock: !!data.mock, live: !!data.live }))
      .catch(() => {})
      .finally(() => setStripeStatusReady(true));
  }, []);

  useEffect(() => {
    setContactId(prefillContactId);
    setConversationId(prefillConversationId);
  }, [prefillContactId, prefillConversationId]);

  const loadPayments = useCallback(async ({ withLoading = false } = {}) => {
    if (withLoading) setLoading(true);
    const [{ data: paymentRows, error: payErr }, { data: contactRows }] = await Promise.all([
      supabase.from("payments").select("*").order("created_at", { ascending: false }),
      supabase.from("contacts").select("id, name, email").order("created_at", { ascending: false }).limit(200),
    ]);
    if (payErr) setError(payErr.message);
    else setPayments(paymentRows || []);
    setContacts(contactRows || []);
    if (withLoading) setLoading(false);
  }, [supabase]);

  useEffect(() => {
    loadPayments({ withLoading: true });
    const channel = supabase
      .channel("admin-payments")
      .on("postgres_changes", { event: "*", schema: "public", table: "payments" }, () => loadPayments())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, loadPayments]);

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

  const showDemoBanner = stripeStatusReady && paymentMode.mock && !paymentMode.live;
  const reserveDemoBannerSpace = !stripeStatusReady || showDemoBanner;

  function openCreateModal() {
    setCreateError(null);
    setCreateResult(null);
    setModalStep("form");
    setCopyFeedback("idle");
    setSendFeedback("idle");
    setCreateModalOpen(true);
  }

  const closeCreateModal = useCallback(() => {
    setCreateModalOpen(false);
    setModalStep("form");
    setCreateResult(null);
    setCopyFeedback("idle");
    setSendFeedback("idle");
    setCreateError(null);
  }, []);

  useEffect(() => {
    if (!createModalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeCreateModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [createModalOpen, closeCreateModal]);

  async function handleCreateLink(e) {
    e.preventDefault();
    setCreating(true);
    setCreateError(null);

    const body =
      mode === "fixed"
        ? { packageKey, contactId: contactId || null, conversationId: conversationId || null }
        : {
            amountUsd: parseFloat(amountUsd),
            description: description.trim(),
            contactId: contactId || null,
            conversationId: conversationId || null,
          };

    try {
      const res = await fetch("/api/stripe/create-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not create link");

      const contactLabel = contactId
        ? contacts.find((c) => c.id === contactId)?.name ||
          contacts.find((c) => c.id === contactId)?.email ||
          data.contactName ||
          data.contactEmail ||
          "—"
        : "—";

      setCreateResult({
        paymentId: data.paymentId,
        url: data.url,
        amountCents: data.amountCents,
        description: data.description,
        contactLabel,
        contactEmail: data.contactEmail || null,
      });
      setModalStep("result");
      setCopyFeedback("idle");
      setSendFeedback("idle");
      if (mode === "custom") setDescription("");
      await loadPayments();
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setCreating(false);
    }
  }

  async function copyLinkUrl(url, { tablePaymentId = null } = {}) {
    try {
      await navigator.clipboard.writeText(url);
      if (tablePaymentId) {
        setTableCopiedId(tablePaymentId);
        window.setTimeout(() => setTableCopiedId(null), 2000);
      } else {
        setCopyFeedback("copied");
      }
    } catch {
      // ignore
    }
  }

  async function handleSendLinkEmail() {
    if (!createResult?.paymentId || !createResult.contactEmail) return;
    setSendFeedback("sending");
    try {
      const res = await fetch("/api/admin/payments/send-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId: createResult.paymentId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not send email");
      setSendFeedback("sent");
      await loadPayments();
    } catch (err) {
      setCreateError(err.message);
      setSendFeedback("idle");
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
        <button type="button" onClick={openCreateModal} className="admin-btn-emerald-pill shrink-0">
          Create payment link
        </button>
      </div>

      {reserveDemoBannerSpace ? (
        <div className="mb-5 shrink-0" style={{ minHeight: DEMO_BANNER_MIN_HEIGHT }}>
          {showDemoBanner ? (
            <div className="rounded-xl border border-dashed border-[#C9A84C] bg-[#FFFBF0] px-4 py-3">
              <p className="font-inter text-[13px] font-semibold text-[#8A6D2C]">Demo payment mode</p>
              <p className="mt-1 font-inter text-[12px] leading-relaxed text-[#8A6D2C]">
                Stripe keys are not connected yet. Links open a mock checkout page on your site (no real charge). Add{" "}
                <code className="text-[11px]">STRIPE_SECRET_KEY</code> and set{" "}
                <code className="text-[11px]">STRIPE_MOCK_MODE=false</code> when ready for live payments.
              </p>
            </div>
          ) : null}
        </div>
      ) : null}

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
                className={`admin-btn-pill capitalize ${statusFilter === s ? "is-active" : ""}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div
          className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm"
          style={{ minHeight: HISTORY_MIN_HEIGHT }}
        >
          <table className="w-full min-w-[880px] border-collapse text-[#1C1C1C]">
            <thead className="bg-[var(--color-background)]">
              <tr className="border-b border-[var(--color-border)] text-left">
                {TABLE_HEADERS.map((h) => (
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
              <PaymentsHistoryBody
                loading={loading}
                error={error}
                filtered={filtered}
                onCopyLink={(url, id) => copyLinkUrl(url, { tablePaymentId: id })}
                copiedPaymentId={tableCopiedId}
              />
            </tbody>
          </table>
        </div>
      </section>

      {createModalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          role="presentation"
          onClick={closeCreateModal}
        >
          <div className="absolute inset-0 bg-[#1C1C1C]/40 backdrop-blur-[2px]" aria-hidden="true" />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-payment-link-title"
            className="relative z-[1] flex max-h-[min(90vh,720px)] w-full max-w-[640px] min-h-[420px] flex-col overflow-y-auto rounded-2xl border border-[rgba(232,213,163,0.9)] bg-[rgba(255,255,255,0.88)] p-5 shadow-[0_24px_60px_rgba(28,28,28,0.18)] backdrop-blur-[16px] sm:min-h-[440px] sm:p-6 supports-[backdrop-filter]:bg-[rgba(255,255,255,0.82)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <h2 id="create-payment-link-title" className="font-playfair text-[20px] font-bold text-[#1C1C1C]">
                {modalStep === "result" ? "Payment link ready" : "Create payment link"}
              </h2>
              <button
                type="button"
                onClick={closeCreateModal}
                className="admin-btn-secondary flex h-8 w-8 shrink-0 items-center justify-center p-0 text-[16px] leading-none"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {modalStep === "result" && createResult ? (
              <div>
                <dl className="space-y-3 rounded-xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.6)] p-4">
                  <div>
                    <dt className="font-inter text-[11px] font-semibold uppercase tracking-wide text-[#999999]">Amount</dt>
                    <dd className="font-inter text-[15px] font-semibold text-[#1C1C1C]">
                      {formatMoney(createResult.amountCents)}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-inter text-[11px] font-semibold uppercase tracking-wide text-[#999999]">
                      Description
                    </dt>
                    <dd className="font-inter text-[13px] text-[#444444]">{createResult.description}</dd>
                  </div>
                  <div>
                    <dt className="font-inter text-[11px] font-semibold uppercase tracking-wide text-[#999999]">Contact</dt>
                    <dd className="font-inter text-[13px] text-[#444444]">
                      {createResult.contactLabel}
                      {createResult.contactEmail ? (
                        <span className="block text-[12px] text-[#888888]">{createResult.contactEmail}</span>
                      ) : null}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-inter text-[11px] font-semibold uppercase tracking-wide text-[#999999]">Link</dt>
                    <dd className="break-all font-inter text-[12px] text-[#1C1C1C]">{createResult.url}</dd>
                  </div>
                </dl>

                {createError && (
                  <p className="mt-3 font-inter text-[13px] text-[#9A2E24]" role="alert">
                    {createError}
                  </p>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  <button type="button" onClick={() => copyLinkUrl(createResult.url)} className="admin-btn-secondary">
                    {copyFeedback === "copied" ? "Copied" : "Copy link"}
                  </button>
                  {createResult.contactEmail ? (
                    <button
                      type="button"
                      onClick={handleSendLinkEmail}
                      disabled={sendFeedback === "sending" || sendFeedback === "sent"}
                      className="admin-btn-primary"
                    >
                      {sendFeedback === "sent"
                        ? "Sent"
                        : sendFeedback === "sending"
                          ? "Sending…"
                          : "Send by email"}
                    </button>
                  ) : null}
                  <button type="button" onClick={closeCreateModal} className="admin-btn-neutral">
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateLink} className="flex min-h-0 flex-1 flex-col">
                <div className="admin-segmented mb-4 shrink-0" role="tablist" aria-label="Payment link type">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === "custom"}
                    onClick={() => setMode("custom")}
                    className={`admin-segmented__option ${mode === "custom" ? "is-active" : ""}`}
                  >
                    Custom amount
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === "fixed"}
                    onClick={() => setMode("fixed")}
                    className={`admin-segmented__option ${mode === "fixed" ? "is-active" : ""}`}
                  >
                    Fixed package
                  </button>
                </div>

                <div className="grid shrink-0 gap-4 sm:grid-cols-2">
                  <div className="relative min-h-[168px] sm:col-span-2">
                    <div
                      className={`grid gap-4 sm:grid-cols-2 transition-opacity duration-150 ${
                        mode === "custom"
                          ? "relative z-[1] opacity-100"
                          : "pointer-events-none absolute inset-0 opacity-0"
                      }`}
                      aria-hidden={mode !== "custom"}
                    >
                      <label className="block">
                        <span className="mb-1 block font-inter text-[12px] font-semibold text-[#666666]">Amount (USD)</span>
                        <input
                          type="number"
                          min="1"
                          step="1"
                          value={amountUsd}
                          onChange={(e) => setAmountUsd(e.target.value)}
                          className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 font-inter text-[13px] text-[#1C1C1C]"
                          required={mode === "custom"}
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
                          required={mode === "custom"}
                        />
                      </label>
                    </div>
                    <div
                      className={`transition-opacity duration-150 ${
                        mode === "fixed"
                          ? "relative z-[1] opacity-100"
                          : "pointer-events-none absolute inset-x-0 top-0 opacity-0"
                      }`}
                      aria-hidden={mode !== "fixed"}
                    >
                      <label className="block">
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
                    </div>
                  </div>

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

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button type="submit" disabled={creating} className="admin-btn-primary gwh-gold-btn-fill">
                    {creating ? "Creating…" : "Create link"}
                  </button>
                  {createError && <p className="font-inter text-[13px] text-[#9A2E24]">{createError}</p>}
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
