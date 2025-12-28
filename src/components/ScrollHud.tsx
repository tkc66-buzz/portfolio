"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TOC_ITEMS, type TocItemId } from "@/components/toc";

type ScrollHudState = {
  activeSectionId: TocItemId;
  progressRatio: number; // 0..1
};

function clamp01(n: number) {
  if (n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

export function ScrollHud() {
  const ids = useMemo(() => TOC_ITEMS.map((i) => i.id), []);
  const idToLabel = useMemo(() => new Map(TOC_ITEMS.map((i) => [i.id, i.label] as const)), []);

  const [state, setState] = useState<ScrollHudState>({
    activeSectionId: (ids[0] ?? "profile") as TocItemId,
    progressRatio: 0,
  });

  const offsetsRef = useRef<Array<{ id: TocItemId; top: number }>>([]);
  const rafRef = useRef<number | null>(null);
  const lastActiveRef = useRef<TocItemId>(state.activeSectionId);

  function computeOffsets() {
    const next = ids
      .map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        return { id, top } as { id: TocItemId; top: number };
      })
      .filter((v): v is { id: TocItemId; top: number } => Boolean(v))
      .sort((a, b) => a.top - b.top);

    offsetsRef.current = next;
  }

  function computeProgressRatio() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return 0;
    return clamp01(window.scrollY / max);
  }

  function computeActiveSectionId(): TocItemId {
    const offsets = offsetsRef.current;
    if (offsets.length === 0) return (ids[0] ?? "profile") as TocItemId;

    const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
    const atBottom = maxScrollY > 0 && window.scrollY >= maxScrollY - 2;
    if (atBottom) return offsets[offsets.length - 1].id;

    // Activate when section top passes below the sticky HUD (dynamic threshold).
    const activationOffsetPx = Math.min(240, Math.max(140, Math.floor(window.innerHeight * 0.25)));
    const y = window.scrollY + activationOffsetPx;

    let active = offsets[0].id;
    for (const o of offsets) {
      if (o.top <= y) active = o.id;
      else break;
    }
    return active;
  }

  function applyActiveToc(activeId: TocItemId) {
    const all = document.querySelectorAll<HTMLElement>("[data-toc-id]");
    all.forEach((el) => {
      el.classList.remove("toc-active");
      el.removeAttribute("aria-current");
    });

    const active = document.querySelector<HTMLElement>(`[data-toc-id="${activeId}"]`);
    if (active) {
      active.classList.add("toc-active");
      active.setAttribute("aria-current", "true");
    }
  }

  function update() {
    const progressRatio = computeProgressRatio();
    const activeSectionId = computeActiveSectionId();

    setState({ progressRatio, activeSectionId });

    if (lastActiveRef.current !== activeSectionId) {
      lastActiveRef.current = activeSectionId;
      applyActiveToc(activeSectionId);
    }
  }

  useEffect(() => {
    computeOffsets();
    update();

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    };

    const onResize = () => {
      computeOffsets();
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="hud-progress" aria-label="Scroll progress">
      <div className="hud-progress__track">
        <div
          className="hud-progress__fill"
          style={{ ["--hud-progress" as never]: `${Math.round(state.progressRatio * 100)}%` }}
        />
      </div>
      <p className="mt-2 text-[0.65rem] uppercase tracking-[0.25em] text-fami-gold">
        STAGE: {idToLabel.get(state.activeSectionId) ?? state.activeSectionId}
      </p>
    </div>
  );
}


