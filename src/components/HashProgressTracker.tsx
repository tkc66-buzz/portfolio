"use client";

import { useEffect } from "react";

const STORAGE_KEY = "portfolio:lastHash";

function normalizeHash(hash: string): string | null {
  if (!hash) return null;
  if (!hash.startsWith("#")) return null;
  if (hash === "#") return null;
  return hash;
}

function safeSetLastHash(hash: string) {
  try {
    window.localStorage.setItem(STORAGE_KEY, hash);
  } catch {
    // ignore (private mode / blocked storage)
  }
}

export function HashProgressTracker() {
  // Tracks in-page navigation via hash changes so "Continue" can resume.
  // Render this once globally (e.g., in layout).
  //
  // Note: This is intentionally tiny and non-invasive (no observers).
  // Hash changes happen via TOC links and our Hero buttons.
  useEffect(() => {
    const onHashChange = () => {
      const h = normalizeHash(window.location.hash);
      if (h) safeSetLastHash(h);
    };

    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}


