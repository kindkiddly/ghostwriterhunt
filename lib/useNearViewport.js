"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Flags when an element comes within `margin` of the viewport, so heavy
 * CSS background photos below the fold are only requested as the user
 * scrolls toward them. The generous margin lets them finish loading
 * before the section is actually on screen.
 */
export function useNearViewport(margin = "1200px 0px") {
  const ref = useRef(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    if (near) return undefined;
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [margin, near]);

  return [ref, near];
}
