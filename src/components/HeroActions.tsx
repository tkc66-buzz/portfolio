"use client";

import { useCallback } from "react";

const STORAGE_KEY = "portfolio:lastHash";

function safeGetLastHash(): string | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (!v) return null;
    if (!v.startsWith("#") || v === "#") return null;
    return v;
  } catch {
    return null;
  }
}

function safeSetLastHash(hash: string) {
  try {
    window.localStorage.setItem(STORAGE_KEY, hash);
  } catch {
    // ignore
  }
}

function jumpTo(hash: string) {
  safeSetLastHash(hash);
  window.location.hash = hash;
}

export function HeroActions() {
  const onStart = useCallback(() => {
    jumpTo("#profile");
  }, []);

  const onContinue = useCallback(() => {
    const last = safeGetLastHash();
    jumpTo(last ?? "#experience");
  }, []);

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        className="nes-btn is-error uppercase tracking-wide"
        onClick={onStart}
      >
        Start
      </button>
      <button
        type="button"
        className="nes-btn text-[0.75rem] uppercase tracking-wide"
        onClick={onContinue}
      >
        Continue
      </button>
    </div>
  );
}


