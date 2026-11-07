"use client";

import { useEffect } from "react";

/**
 * Single page-level observer for scroll-reveal. Any element with
 * `data-reveal` gets `is-revealed` once it enters the viewport (one-shot).
 * Stagger with `style={{ "--reveal-delay": "120ms" }}`. CSS only hides
 * `[data-reveal]` when `html.reveal-ready` is set (see layout.tsx).
 */
export function RevealObserver() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
