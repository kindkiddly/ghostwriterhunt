"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const ChatWidget = dynamic(() => import("@/components/ChatWidget"), {
  ssr: false,
  loading: () => null,
});

/**
 * Defers loading the chat widget bundle until the browser is idle (or the
 * visitor clicks the launcher), so public pages are not blocked on Supabase auth.
 */
export default function ChatWidgetGate() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const [loadWidget, setLoadWidget] = useState(false);
  const [openOnMount, setOpenOnMount] = useState(false);

  const activate = useCallback(() => {
    setOpenOnMount(true);
    setLoadWidget(true);
  }, []);

  useEffect(() => {
    if (isAdminRoute || loadWidget) return undefined;
    if (typeof window === "undefined") return undefined;

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setLoadWidget(true), { timeout: 5000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(() => setLoadWidget(true), 4000);
    return () => window.clearTimeout(t);
  }, [isAdminRoute, loadWidget]);

  if (isAdminRoute) return null;

  if (!loadWidget) {
    return (
      <button
        type="button"
        aria-label="Open chat"
        onClick={activate}
        className="fixed z-[9999] flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(201,168,76,0.55)] bg-[#1c1c1c] shadow-md"
        style={{ right: "max(24px, env(safe-area-inset-right))", bottom: "max(20px, env(safe-area-inset-bottom))" }}
      >
        <span className="sr-only">Open chat</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 5.5C4 4.67 4.67 4 5.5 4h13c.83 0 1.5.67 1.5 1.5v10c0 .83-.67 1.5-1.5 1.5H9l-4 3.5v-3.5h-.5C3.67 17 3 16.33 3 15.5v-10z"
            fill="#C9A84C"
          />
        </svg>
      </button>
    );
  }

  return <ChatWidget initialOpen={openOnMount} />;
}
