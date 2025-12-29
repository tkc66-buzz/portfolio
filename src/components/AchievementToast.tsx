"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ToastState = "hidden" | "showing" | "visible" | "closing";

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
  title = "ACHIEVEMENT UNLOCKED",
  message = "Activities を発見した！",
}: {
  targetSectionId: string;
  title?: string;
  message?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();

  const [state, setState] = useState<ToastState>("hidden");
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    return safeSessionGet(STORAGE_DISMISSED_KEY) === "1";
  });
  const [indicatorFx, setIndicatorFx] = useState(false);

  const hasEverShown = useMemo(() => {
    if (typeof window === "undefined") return false;
    return safeSessionGet(STORAGE_SHOWN_KEY) === "1";
  }, []);

  const startedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const indicatorTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    if (dismissed) return;
    if (hasEverShown) return;

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

        setState("showing");
        // allow CSS to pick up the initial state first
        rafRef.current = window.requestAnimationFrame(() => {
          setState((prev) => (prev === "showing" ? "visible" : prev));
          rafRef.current = null;
        });
        observer.disconnect();
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [dismissed, hasEverShown, targetSectionId]);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (closeTimeoutRef.current != null) {
        window.clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      if (indicatorTimeoutRef.current != null) {
        window.clearTimeout(indicatorTimeoutRef.current);
        indicatorTimeoutRef.current = null;
      }
    };
  }, []);

  if (dismissed) {
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
  if (state === "hidden") return null;

  const onClose = () => {
    if (dismissed) return;
    if (state === "closing") return;

    safeSessionSet(STORAGE_DISMISSED_KEY, "1");
    setState("closing");

    if (rafRef.current != null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (reducedMotion) {
      setDismissed(true);
      return;
    }

    closeTimeoutRef.current = window.setTimeout(() => {
      setDismissed(true);
      setIndicatorFx(true);
      indicatorTimeoutRef.current = window.setTimeout(() => {
        setIndicatorFx(false);
        indicatorTimeoutRef.current = null;
      }, 360);
    }, 220);
  };

  return (
    <div
      className={[
        "achievement-toast",
        reducedMotion ? "achievement-toast--reduced" : "",
        state === "showing" ? "achievement-toast--showing" : "",
        state === "visible" ? "achievement-toast--visible" : "",
        state === "closing" ? "achievement-toast--closing" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-live="polite"
    >
      <div className="achievement-toast__inner">
        <div className="achievement-toast__text">
          <p className="achievement-toast__title">{title}</p>
          <p className="achievement-toast__message">{message}</p>
        </div>

        <button
          type="button"
          className="achievement-toast__close nes-btn is-small"
          onClick={onClose}
          aria-label="Close achievement toast"
        >
          ×
        </button>
      </div>
    </div>
  );
}


