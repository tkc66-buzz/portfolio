"use client";

import { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches);
}

/**
 * RPG-style skill "level" bar: the years count up from 0 and the NES progress
 * bar fills to the real value when the row scrolls into view. Reuses the
 * existing nes-progress look so Skills stays visually consistent; reduced
 * motion snaps straight to the final value.
 */
export function SkillLevelBar({
  label,
  years,
  max,
  rangeLabel,
  durationMs = 900,
}: {
  label: string;
  years: number;
  max: number;
  rangeLabel?: string | null;
  durationMs?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);
  const ranRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function run() {
      if (ranRef.current) return;
      ranRef.current = true;

      if (prefersReducedMotion()) {
        setValue(years);
        return;
      }

      let start: number | null = null;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const t = Math.min((ts - start) / durationMs, 1);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic settle
        setValue(eased * years);
        if (t < 1) rafRef.current = requestAnimationFrame(step);
        else setValue(years);
      };
      rafRef.current = requestAnimationFrame(step);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            run();
            io.disconnect();
          }
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [years, durationMs]);

  const displayYears = Math.round(value);

  return (
    <div ref={ref}>
      <div className="text-fami-gold flex flex-wrap items-center justify-between gap-1 text-xs tracking-[0.2em]">
        <span className="min-w-0">{label}</span>
        <span className="normal-case tabular-nums">
          {displayYears}y{rangeLabel ? ` (${rangeLabel})` : ""}
        </span>
      </div>
      <progress className="nes-progress is-warning" value={value} max={max} />
    </div>
  );
}
