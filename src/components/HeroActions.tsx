"use client";

import { TOC_ITEMS } from "@/components/toc";

import { useCallback } from "react";

function currentVisibleSectionId(): string | null {
  // “Always moves”: we avoid selecting the section that appears to be currently in view.
  // This is a lightweight heuristic (no observers).
  const ids = TOC_ITEMS.map((i) => i.id);
  const candidates = ids
    .map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      // Only consider sections that are at least partially within the viewport.
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!inView) return null;
      const distance = Math.abs(rect.top);
      return { id, distance };
    })
    .filter((v): v is { id: (typeof TOC_ITEMS)[number]["id"]; distance: number } => v !== null);

  if (candidates.length === 0) return null;
  candidates.sort((a, b) => a.distance - b.distance);
  return candidates[0]?.id ?? null;
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  // Update the URL hash (not strictly required for movement).
  window.location.hash = `#${id}`;
}

function pickRandomSectionId(excludeId?: string | null): string {
  const candidates = TOC_ITEMS.map((i) => i.id).filter((id) => id !== excludeId);
  // Always return something; if all are excluded (shouldn't happen), fall back to experience.
  if (candidates.length === 0) return "experience";
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function HeroActions() {
  const onStart = useCallback(() => {
    scrollToSection("experience");
  }, []);

  const onContinue = useCallback(() => {
    const next = pickRandomSectionId(currentVisibleSectionId());
    scrollToSection(next);
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


