"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const searchParams = useSearchParams();
  const accessDenied = searchParams.get("error") === "access_denied";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(accessDenied ? "Access denied — that account is not an admin." : "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Could not sign in");
        setLoading(false);
        return;
      }

      window.location.href = "/admin";
    } catch {
      setError("Network error — please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-5">
      <div className="w-full max-w-[400px] rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]/90 p-8 shadow-[0_20px_60px_rgba(28,28,28,0.12)] backdrop-blur-md sm:p-10">
        <p className="mb-1 text-center font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-gold)]">
          GhostWriterHunt
        </p>
        <h1 className="mb-8 text-center font-playfair text-[26px] font-bold text-[var(--color-text)]">
          Admin sign in
        </h1>

        {error && (
          <p
            role="alert"
            className="mb-5 rounded-lg border border-[#E3B5B0] bg-[#FBEEED] px-4 py-3 text-center font-inter text-[13px] text-[#9A2E24]"
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block font-inter text-[13px] font-medium text-[var(--color-text)]">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3.5 py-2.5 font-inter text-[14px] text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-accent-gold)]"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block font-inter text-[13px] font-medium text-[var(--color-text)]">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3.5 py-2.5 font-inter text-[14px] text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-accent-gold)]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-lg bg-[var(--color-accent-gold)] px-5 py-3 font-inter text-[14px] font-semibold text-white transition-colors hover:bg-[#B8960C] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
