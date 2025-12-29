"use client";

import { ReactNode, useEffect, useRef, useState, useSyncExternalStore } from "react";

const STORAGE_SHOWN_KEY = "achievement_toast:v1:shown";
const STORAGE_COLLECTED_KEY = "achievement_toast:v1:dismissed";
const COLLECT_EVENT = "activities:collect:v1";

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

export function ActivitiesCollectGate({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const fxTimeoutRef = useRef<number | null>(null);

  const [indicatorFx, setIndicatorFx] = useState(false);

  const collected = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};

      window.addEventListener(COLLECT_EVENT, onStoreChange);
      // Best-effort: if state changes across tabs/windows.
      window.addEventListener("storage", onStoreChange);
      return () => {
        window.removeEventListener(COLLECT_EVENT, onStoreChange);
        window.removeEventListener("storage", onStoreChange);
      };
    },
    () => safeSessionGet(STORAGE_COLLECTED_KEY) === "1",
    () => false,
  );

  useEffect(() => {
    return () => {
      if (fxTimeoutRef.current != null) {
        window.clearTimeout(fxTimeoutRef.current);
        fxTimeoutRef.current = null;
      }
    };
  }, []);

  const collect = () => {
    if (collected) return;

    safeSessionSet(STORAGE_SHOWN_KEY, "1");
    safeSessionSet(STORAGE_COLLECTED_KEY, "1");
    window.dispatchEvent(new Event(COLLECT_EVENT));

    if (!reducedMotion) {
      setIndicatorFx(true);
      fxTimeoutRef.current = window.setTimeout(() => {
        setIndicatorFx(false);
        fxTimeoutRef.current = null;
      }, 360);
    }
  };

  if (collected) {
    return (
      <div className="mt-3">
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

        <div className="activities-gate__body">{children}</div>
      </div>
    );
  }

  const summary = collected ? (
    <span
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
    </span>
  ) : (
    <span className="achievement-toast-indicator achievement-toast-indicator--pending" aria-hidden="true">
      <span className="nes-btn is-small achievement-toast-collect">COLLECT</span>
      <span className="achievement-toast-indicator__text">Activities</span>
    </span>
  );

  return (
    <details
      className="activities-gate mt-3"
      onToggle={(e) => {
        const el = e.currentTarget;
        if (el.open) collect();
      }}
    >
      <summary className="activities-gate__summary">
        {summary}
      </summary>

      <div className="activities-gate__body">{children}</div>
    </details>
  );
}


