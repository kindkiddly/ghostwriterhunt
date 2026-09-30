/** Allowed charset for the 6-character suffix (excludes 0, O, 1, I, L). */
export const GWH_CODE_BODY_CHARS = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
const GWH_CODE_BODY_REGEX = /^GWH-([23456789ABCDEFGHJKMNPQRSTUVWXYZ]{6})$/;

export const PROJECT_PROGRESS_OPTIONS = [
  { value: 0, label: "Consultation" },
  { value: 25, label: "Writing started" },
  { value: 50, label: "Halfway" },
  { value: 75, label: "Review" },
  { value: 100, label: "Completed" },
];

export function isAllowedProjectProgress(value) {
  return value === null || value === undefined || [0, 25, 50, 75, 100].includes(value);
}

export function getProjectProgressLabel(progress) {
  if (progress == null) return null;
  const row = PROJECT_PROGRESS_OPTIONS.find((o) => o.value === progress);
  return row ? row.label : null;
}

export function formatProjectProgressForAgent(progress) {
  if (progress == null) return "Project progress not set yet.";
  const label = getProjectProgressLabel(progress);
  return label ? `${progress}% — ${label}` : `${progress}%`;
}

export function contactFirstName(name) {
  const trimmed = String(name || "").trim();
  if (!trimmed) return null;
  return trimmed.split(/\s+/)[0] || null;
}

export function normalizeCustomerCodeInput(raw) {
  const compact = String(raw || "")
    .trim()
    .toUpperCase()
    .replace(/\s/g, "");
  if (!compact) return null;

  let candidate = compact;
  if (!candidate.startsWith("GWH")) {
    candidate = `GWH-${candidate}`;
  } else if (!candidate.startsWith("GWH-")) {
    candidate = `GWH-${candidate.slice(3).replace(/^-/, "")}`;
  }

  const match = candidate.match(GWH_CODE_BODY_REGEX);
  return match ? `GWH-${match[1]}` : null;
}

export function customerCodeEmailLine(code) {
  if (!code) return "";
  return `Your customer code: ${code}`;
}

export async function fetchContactCustomerCode(admin, contactId) {
  if (!contactId) return null;
  const { data, error } = await admin
    .from("contacts")
    .select("customer_code")
    .eq("id", contactId)
    .maybeSingle();
  if (error) {
    console.error("customerCode: fetch failed", error);
    return null;
  }
  return data?.customer_code || null;
}

export function buildVerifiedCustomerContextBlock({ firstName, customerCode, projectProgress, paidPayments }) {
  const lines = ["VERIFIED EXISTING CUSTOMER (customer code entered in this chat):"];
  if (firstName) lines.push(`First name: ${firstName}`);
  if (customerCode) lines.push(`Customer code: ${customerCode}`);
  lines.push(`Project status: ${formatProjectProgressForAgent(projectProgress)}`);
  if (paidPayments?.length) {
    lines.push("Paid payments on file:");
    for (const p of paidPayments) {
      const amount = `$${((p.amount_cents || 0) / 100).toFixed(2)}`;
      const date = p.paid_at ? new Date(p.paid_at).toISOString().slice(0, 10) : "date unknown";
      lines.push(`- ${p.description || "Payment"} | ${amount} | ${date}`);
    }
  } else {
    lines.push("Paid payments on file: none yet.");
  }
  return lines.join("\n");
}
