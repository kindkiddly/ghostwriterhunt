"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * GhostWriterHunt — Page transition wrapper.
 * Remounts on every pathname change so the CSS entrance in globals.css
 * (.gwh-page) replays. On client navigation the new page is held
 * invisible until its hero images are decoded (capped so pages never feel
 * slower); hero images still loading after that fade in rather than pop.
 */

const HOLD_CAP_MS = 450;
const IMG_FADE = { duration: 380, easing: "cubic-bezier(0.22, 1, 0.36, 1)" };

// The first mount is the server-rendered page, already painted — never hide it.
let isFirstMount = true;

function firstScreenHeroImages(root) {
  const fold = window.innerHeight;
  return [...root.querySelectorAll("[data-hero] img")].filter((img) => {
    if (!img.getClientRects().length) return false; // display: none
    const rect = img.getBoundingClientRect();
    // Page-relative: runs before the router scrolls the new page to the top
    const top = rect.top + window.scrollY;
    return rect.width > 0 && top < fold;
  });
}

function isLoaded(img) {
  return img.complete && img.naturalWidth > 0;
}

function fadeInWhenLoaded(img) {
  img.style.opacity = "0";
  const show = () => {
    img.style.removeProperty("opacity");
    img.animate([{ opacity: 0 }, { opacity: 1 }], IMG_FADE);
  };
  img.addEventListener("load", show, { once: true });
  img.addEventListener("error", () => img.style.removeProperty("opacity"), {
    once: true,
  });
}

export default function Template({ children }) {
  const pathname = usePathname();
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    const firstMount = isFirstMount;
    isFirstMount = false;
    if (!root) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const pending = firstScreenHeroImages(root).filter((img) => !isLoaded(img));
    if (!pending.length) return undefined;

    if (firstMount) {
      // Only images with nothing painted yet can be hidden without a flicker
      pending.filter((img) => img.naturalWidth === 0).forEach(fadeInWhenLoaded);
      return undefined;
    }

    const priority = pending.filter((img) => img.loading !== "lazy");
    if (!priority.length) {
      pending.forEach(fadeInWhenLoaded);
      return undefined;
    }

    root.classList.add("gwh-page--hold");
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      clearTimeout(timer);
      // Anything still loading fades in on arrival instead of popping
      pending.filter((img) => !isLoaded(img)).forEach(fadeInWhenLoaded);
      root.classList.remove("gwh-page--hold");
    };
    const timer = setTimeout(release, HOLD_CAP_MS);
    Promise.all(priority.map((img) => img.decode().catch(() => {}))).then(
      release
    );

    return () => {
      released = true;
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <div ref={ref} key={pathname} className="gwh-page">
      {children}
    </div>
  );
}
