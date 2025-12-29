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

  // Manual collect:
  // - Show a small "COLLECT" button initially
  // - When pressed, mark as collected in session storage and keep a small indicator for the session
  const [collected, setCollected] = useState(() => {
    if (typeof window === "undefined") return false;
    return safeSessionGet(STORAGE_DISMISSED_KEY) === "1";
  });
  const [indicatorFx, setIndicatorFx] = useState(false);

  const indicatorTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (indicatorTimeoutRef.current != null) {
        window.clearTimeout(indicatorTimeoutRef.current);
        indicatorTimeoutRef.current = null;
      }
    };
  }, []);

  const onCollect = () => {
    if (collected) return;

    // Keep the prop for future-proofing / current call sites; it may be useful for analytics later.
    void targetSectionId;

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
  };

  if (!collected) {
    return (
      <div className="achievement-toast-indicator achievement-toast-indicator--pending">
        <button
          type="button"
          className="achievement-toast-collect nes-btn is-small"
          onClick={onCollect}
        >
          COLLECT
        </button>
        <span className="achievement-toast-indicator__text">Activities</span>
      </div>
    );
  }

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


