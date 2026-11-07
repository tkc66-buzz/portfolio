"use client";

import { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches);
}

/**
 * RPG-style skill "level" tile: the years count up from 0 and the segmented
 * meter fills to the real value when the tile scrolls into view. Reduced
 * motion snaps straight to the final value.
 */
export function SkillLevelBar({
  category,
  label,
  years,
  max,
  rangeLabel,
  delayMs = 0,
  durationMs = 1100,
}: {
  category: string;
  label: string;
  years: number;
  max: number;
  rangeLabel?: string | null;
  delayMs?: number;
  durationMs?: number;
}) {
  const ref = useRef<HTMLLIElement | null>(null);
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
        if (start === null) start = ts + delayMs;
        const t = Math.min(Math.max(ts - start, 0) / durationMs, 1);
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
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [years, delayMs, durationMs]);

  const meter = max > 0 ? (value / max) * 100 : 0;

  return (
    <li ref={ref} className="card card-hover flex flex-col p-4 sm:p-5">
      <p className="font-pixel text-fami-blue type-label break-normal uppercase">{category}</p>
      {/* Allow wrapping after "/" (e.g. MySQL/PostgreSQL/NoSQL) instead of mid-word. */}
      <p className="type-title mt-2">{label.replaceAll("/", "/\u200b")}</p>
      <div className="mt-auto flex flex-wrap items-baseline gap-1 pt-3 sm:pt-4">
        <span className="font-pixel text-fami-gold type-stat tabular-nums">
          {Math.round(value)}
        </span>
        <span className="font-pixel text-fami-gold/70 type-label">YRS</span>
        {rangeLabel ? (
          <span className="text-fami-ivory/60 type-label ml-auto tabular-nums">{rangeLabel}</span>
        ) : null}
      </div>
      <div
        className="skill-meter mt-3"
        role="meter"
        aria-label={`${label} years of experience`}
        aria-valuenow={years}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div className="skill-meter__fill" style={{ ["--meter" as never]: `${meter}%` }} />
      </div>
    </li>
  );
}
