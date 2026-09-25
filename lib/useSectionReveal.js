"use client";

import { useEffect, useRef, useState } from "react";

export function observeWhenVisible(node, onVisible, options = {}) {
  if (!node) return () => {};

  const { threshold = 0.08, rootMargin = "0px" } = options;
  let done = false;
  const reveal = () => {
    if (done) return;
    done = true;
    onVisible();
  };

  const checkInView = () => {
    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh * 0.95 && rect.bottom > vh * 0.05) reveal();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) reveal();
    },
    { threshold, rootMargin }
  );

  observer.observe(node);
  requestAnimationFrame(checkInView);
  // Anchor jumps (#pricing, etc.) can finish layout after first paint
  const delayedCheck = window.setTimeout(checkInView, 120);
  const delayedCheck2 = window.setTimeout(checkInView, 400);

  const onScroll = () => checkInView();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  return () => {
    observer.disconnect();
    window.clearTimeout(delayedCheck);
    window.clearTimeout(delayedCheck2);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}

/**
 * Reveal a section once it enters (or already sits in) the viewport.
 */
export function useSectionReveal(options = {}) {
  const { threshold = 0.08, rootMargin = "0px" } = options;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    return observeWhenVisible(node, () => setVisible(true), {
      threshold,
      rootMargin,
    });
  }, [threshold, rootMargin]);

  return { ref, visible };
}

/** Observe multiple elements and add visibleClass when each enters view. */
export function useRevealSelector(selector, visibleClass, deps = []) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return undefined;

    const revealed = new WeakSet();

    const revealEl = (el) => {
      if (revealed.has(el)) return;
      revealed.add(el);
      const delay = parseInt(el.dataset.delay || "0", 10);
      setTimeout(() => {
        el.classList.add(visibleClass);
      }, delay);
    };

    const checkAll = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.95 && rect.bottom > vh * 0.05) revealEl(el);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) revealEl(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px" }
    );

    elements.forEach((el) => {
      el.classList.remove(visibleClass);
      observer.observe(el);
    });

    requestAnimationFrame(checkAll);
    window.addEventListener("scroll", checkAll, { passive: true });
    window.addEventListener("resize", checkAll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkAll);
      window.removeEventListener("resize", checkAll);
    };
  }, [selector, visibleClass, ...deps]);
}
