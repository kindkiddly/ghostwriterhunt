"use client";

import { useSyncExternalStore } from "react";

/**
 * Match `(min-width: Npx)` without rendering both mobile/desktop asset trees.
 * Server snapshot is false (mobile-first) to limit duplicate hero/process downloads.
 */
export function useMinWidth(minWidth) {
  const query = `(min-width: ${minWidth}px)`;

  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => {
      if (typeof window === "undefined") return false;
      return window.matchMedia(query).matches;
    },
    () => false
  );
}
