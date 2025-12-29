"use client";

import {
  START_GATE_CLASS_NOT_STARTED,
  START_GATE_CLASS_STARTED,
  START_GATE_CLASS_STARTING,
  START_GATE_EVENT,
  START_GATE_STORAGE_KEY,
} from "@/components/startGate";
import { useRef, useSyncExternalStore } from "react";

function isReducedMotionPreferred() {
  if (typeof window === "undefined") return false;
  return Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches);
}

function focusMenu(reducedMotion: boolean) {
  if (typeof document === "undefined") return;
  const menu = document.getElementById("menu") as HTMLElement | null;
  if (!menu) return;
  menu.scrollIntoView({ block: "start", behavior: reducedMotion ? "auto" : "smooth" });
  menu.focus({ preventScroll: true });
}

function subscribeStartGate(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(START_GATE_EVENT, onStoreChange);
  return () => window.removeEventListener(START_GATE_EVENT, onStoreChange);
}

function getStartGateSnapshot() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains(START_GATE_CLASS_STARTED);
}

function getStartGateServerSnapshot() {
  return false;
}

function useStartGateStarted() {
  return useSyncExternalStore(subscribeStartGate, getStartGateSnapshot, getStartGateServerSnapshot);
}

export function Hero() {
  const started = useStartGateStarted();
  const startingRef = useRef(false);

  function unlock() {
    const root = document.documentElement;

    root.classList.remove(START_GATE_CLASS_NOT_STARTED);
    root.classList.remove(START_GATE_CLASS_STARTING);
    root.classList.add(START_GATE_CLASS_STARTED);
    window.dispatchEvent(new Event(START_GATE_EVENT));
  }

  function onStart() {
    if (startingRef.current) return;
    const root = document.documentElement;
    const reducedMotion = isReducedMotionPreferred();

    if (root.classList.contains(START_GATE_CLASS_STARTED)) {
      window.dispatchEvent(new Event(START_GATE_EVENT));
      focusMenu(reducedMotion);
      return;
    }

    startingRef.current = true;

    try {
      sessionStorage.setItem(START_GATE_STORAGE_KEY, "1");
    } catch {
      // Graceful: unlock still works for this view, but may not persist.
    }

    root.classList.remove(START_GATE_CLASS_NOT_STARTED);

    if (reducedMotion) {
      unlock();
      focusMenu(true);
      startingRef.current = false;
      return;
    }

    root.classList.add(START_GATE_CLASS_STARTING);
    window.setTimeout(() => {
      unlock();
      focusMenu(false);
      startingRef.current = false;
    }, 520);
  }

  return (
    <section className="frame bg-[#1b1b1b] p-8 text-center text-fami-ivory">
      <p
        className="blink-soft mb-3 text-xs uppercase tracking-[0.3em] text-fami-gold"
        style={{ fontFamily: "var(--font-press)" }}
      >
        {started ? "READY" : "PRESS START"}
      </p>
      <h1 className="text-2xl md:text-3xl" style={{ fontFamily: "var(--font-press)" }}>
        Takeshi Watanabe <span className="text-fami-gold">(Buzz)</span>
      </h1>
      <p className="mt-4 text-base [font-family:var(--font-noto)] md:text-lg">
      Software Engineer @ eureka_inc | Match Group | Go | TypeScript | Terraform | AWS | Google Cloud | strong interest in system reliability and architecture
      </p>

      {!started ? (
        <div className="mt-6">
          <button
            type="button"
            className="nes-btn is-primary btn-game"
            onClick={onStart}
            aria-label="Press Start to reveal the menu"
          >
            START
          </button>
        </div>
      ) : null}
    </section>
  );
}
