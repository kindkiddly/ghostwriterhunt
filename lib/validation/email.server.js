import {
  buildServerEmailError,
  EMAIL_FORMAT_ERROR,
  validateEmailFormat,
} from "@/lib/validation/email";

const DNS_TIMEOUT_MS = 3000;

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error("DNS lookup timed out")), ms);
    }),
  ]);
}

/**
 * MX lookup with A-record fallback. Fail open on network/DNS errors.
 * @returns {{ ok: boolean, failOpen?: boolean }}
 */
export async function verifyEmailDomainDeliverability(domain) {
  const host = String(domain || "").trim().toLowerCase();
  if (!host) return { ok: false };

  try {
    const dns = await import("node:dns/promises");
    try {
      const mx = await withTimeout(dns.resolveMx(host), DNS_TIMEOUT_MS);
      if (Array.isArray(mx) && mx.length > 0) {
        return { ok: true };
      }
    } catch (mxErr) {
      if (mxErr?.code === "ENODATA" || mxErr?.code === "ENOTFOUND") {
        // fall through to A record
      } else if (mxErr?.message === "DNS lookup timed out") {
        console.warn("email validation: MX timeout (fail open)", host);
        return { ok: true, failOpen: true };
      } else {
        console.warn("email validation: MX error (fail open)", host, mxErr?.message || mxErr);
        return { ok: true, failOpen: true };
      }
    }

    try {
      const a = await withTimeout(dns.resolve4(host), DNS_TIMEOUT_MS);
      if (Array.isArray(a) && a.length > 0) {
        return { ok: true };
      }
    } catch (aErr) {
      if (aErr?.message === "DNS lookup timed out") {
        console.warn("email validation: A timeout (fail open)", host);
        return { ok: true, failOpen: true };
      }
      if (aErr?.code === "ENOTFOUND" || aErr?.code === "ENODATA") {
        return { ok: false };
      }
      console.warn("email validation: A error (fail open)", host, aErr?.message || aErr);
      return { ok: true, failOpen: true };
    }

    return { ok: false };
  } catch (err) {
    console.warn("email validation: DNS module error (fail open)", host, err?.message || err);
    return { ok: true, failOpen: true };
  }
}

/**
 * Full server validation: strict format + typo rejection + MX/A check.
 */
export async function validateEmailForServer(raw) {
  const format = validateEmailFormat(raw);
  if (!format.ok) {
    return {
      ok: false,
      error: buildServerEmailError(format),
      suggestion: format.suggestion,
    };
  }

  const domain = format.normalized.split("@")[1];
  const dns = await verifyEmailDomainDeliverability(domain);
  if (!dns.ok && !dns.failOpen) {
    return { ok: false, error: EMAIL_FORMAT_ERROR, normalized: format.normalized };
  }

  return { ok: true, normalized: format.normalized };
}

/** Convenience for API routes — returns normalized email or { error }. */
export async function ensureValidEmail(raw) {
  const result = await validateEmailForServer(raw);
  if (!result.ok) {
    return { error: result.error || EMAIL_FORMAT_ERROR };
  }
  return { normalized: result.normalized };
}
