"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_SHOWN_KEY = "achievement_toast:v1:shown";
const STORAGE_DISMISSED_KEY = "achievement_toast:v1:dismissed";

function safeSessionGet(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSessionSet(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // ignore (privacy mode / blocked storage)
  }
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const update = () => setReduced(Boolean(mq.matches));
    update();

    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

export function AchievementToast({
  targetSectionId,
}: {
  targetSectionId: string;
}) {
  const reducedMotion = usePrefersReducedMotion();

  // A plan:
  // - Start with nothing visible
  // - When Activities section is discovered, "collect" it and keep a small indicator for the session
  const [collected, setCollected] = useState(() => {
    if (typeof window === "undefined") return false;
    return safeSessionGet(STORAGE_DISMISSED_KEY) === "1";
  });
  const [indicatorFx, setIndicatorFx] = useState(false);

  const startedRef = useRef(false);
  const indicatorTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    if (collected) return;

    const el = document.getElementById(targetSectionId);
    if (!el) return;

    let didTrigger = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (didTrigger) return;
        const hit = entries.some((e) => e.isIntersecting);
        if (!hit) return;

        didTrigger = true;
        safeSessionSet(STORAGE_SHOWN_KEY, "1");
        safeSessionSet(STORAGE_DISMISSED_KEY, "1");

        setCollected(true);
        if (!reducedMotion) {
          setIndicatorFx(true);
          indicatorTimeoutRef.current = window.setTimeout(() => {
            setIndicatorFx(false);
            indicatorTimeoutRef.current = null;
          }, 360);
        }

        observer.disconnect();
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [collected, reducedMotion, targetSectionId]);

  useEffect(() => {
    return () => {
      if (indicatorTimeoutRef.current != null) {
        window.clearTimeout(indicatorTimeoutRef.current);
        indicatorTimeoutRef.current = null;
      }
    };
  }, []);

  if (!collected) return null;

  if (collected) {
    return (
      <div
        className={[
          "achievement-toast-indicator",
          indicatorFx ? "achievement-toast-indicator--fx" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden="true"
      >
        <span className="nes-badge is-success achievement-toast-indicator__badge">
          <span>COLLECTED</span>
        </span>
        <span className="achievement-toast-indicator__text">Activities</span>
      </div>
    );
  }
}


