"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AdminRealtimeProvider, useAdminRealtime } from "@/lib/admin/AdminRealtimeContext";

function InboxIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 5.5C3 4.67 3.67 4 4.5 4h11c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-11A1.5 1.5 0 013 14.5v-9z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 5.5l6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ContactsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 16c.8-3 3.3-4.5 6.5-4.5s5.7 1.5 6.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7.5 17H4.5A1.5 1.5 0 013 15.5v-11A1.5 1.5 0 014.5 3h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M13 14l4-4-4-4M17 10H7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function SoundOnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 8v4h3l4 3V5L6 8H3z" fill="currentColor" />
      <path d="M13 7c1 1 1 5 0 6M15.5 5c2 2 2 8 0 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function SoundOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 8v4h3l4 3V5L6 8H3z" fill="currentColor" />
      <path d="M13 8l4 4M17 8l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function Badge({ count }) {
  if (!count) return null;
  return (
    <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[var(--color-accent-gold)] px-1.5 font-inter text-[11px] font-semibold text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
}

const NAV_ITEMS = [
  { href: "/admin", label: "Inbox", icon: InboxIcon, badge: true },
  { href: "/admin/contacts", label: "Contacts", icon: ContactsIcon, badge: false },
];

function AdminShell({ children }) {
  const pathname = usePathname();
  const { unreadCount, soundEnabled, toggleSound } = useAdminRealtime();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div className="flex h-screen flex-col bg-[var(--color-background)] lg:flex-row">
      {/* Desktop sidebar */}
      <aside className="hidden w-[240px] shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-card)] lg:flex">
        <div className="px-6 py-6">
          <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-gold)]">
            GhostWriterHunt
          </p>
          <p className="font-playfair text-[19px] font-bold text-[var(--color-text)]">Admin</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {NAV_ITEMS.map(({ href, label, icon: Icon, badge }) => {
            const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-inter text-[14px] font-medium transition-colors ${
                  active
                    ? "bg-[var(--color-background)] text-[var(--color-text)]"
                    : "text-[#666666] hover:bg-[var(--color-background)] hover:text-[var(--color-text)]"
                }`}
              >
                <Icon />
                {label}
                {badge && <Badge count={unreadCount} />}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-1 border-t border-[var(--color-border)] px-3 py-4">
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={soundEnabled}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-inter text-[13px] font-medium text-[#666666] transition-colors hover:bg-[var(--color-background)] hover:text-[var(--color-text)]"
          >
            {soundEnabled ? <SoundOnIcon /> : <SoundOffIcon />}
            {soundEnabled ? "Sound on" : "Sound off"}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-inter text-[13px] font-medium text-[#666666] transition-colors hover:bg-[var(--color-background)] hover:text-[var(--color-text)]"
          >
            <LogoutIcon />
            Log out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 lg:hidden">
        <p className="font-playfair text-[17px] font-bold text-[var(--color-text)]">GhostWriterHunt Admin</p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={soundEnabled}
            aria-label={soundEnabled ? "Mute notifications" : "Unmute notifications"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#666666]"
          >
            {soundEnabled ? <SoundOnIcon /> : <SoundOffIcon />}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Log out"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#666666]"
          >
            <LogoutIcon />
          </button>
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-hidden pb-16 lg:pb-0">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t border-[var(--color-border)] bg-[var(--color-card)] lg:hidden">
        {NAV_ITEMS.map(({ href, label, icon: Icon, badge }) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-1 flex-col items-center gap-0.5 py-2.5 font-inter text-[11px] font-medium ${
                active ? "text-[var(--color-text)]" : "text-[#999999]"
              }`}
            >
              <Icon />
              {label}
              {badge && unreadCount > 0 && (
                <span className="absolute right-[28%] top-1.5 h-2 w-2 rounded-full bg-[var(--color-accent-gold)]" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <AdminRealtimeProvider>
      <AdminShell>{children}</AdminShell>
    </AdminRealtimeProvider>
  );
}
