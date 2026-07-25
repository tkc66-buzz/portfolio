"use client";

import { useEffect, useRef } from "react";

type Particle = {
  tx: number;
  ty: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches);
}

/**
 * Hero logo rendered as chunky pixels that scatter before PRESS START and
 * spring into formation once the start gate opens. Driven by the real
 * `started` flag (no separate button). Reduced-motion snaps to assembled.
 * An sr-only label preserves the accessible/searchable title.
 */
export function HeroPixelTitle({
  started,
  text = "BUZZ",
  accent = "#d7b05b", // fami-gold
}: {
  started: boolean;
  text?: string;
  accent?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const dimsRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const prevStartedRef = useRef<boolean>(started);
  const block = 5; // gap(6) - 1

  // Build particle targets once per size/text (NOT on `started`, so a start
  // transition can animate instead of snapping).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    if (cssW === 0 || cssH === 0) return;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dimsRef.current = { w: cssW, h: cssH };

    const off = document.createElement("canvas");
    off.width = cssW;
    off.height = cssH;
    const octx = off.getContext("2d");
    if (!octx) return;

    octx.fillStyle = "#fff";
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    const fontSize = Math.min(cssW / (text.length * 0.72), cssH * 0.7);
    octx.font = `${fontSize}px "Press Start 2P", monospace`;
    octx.fillText(text, cssW / 2, cssH / 2);

    const img = octx.getImageData(0, 0, cssW, cssH).data;
    const gap = 6;
    const assembled = prevStartedRef.current || prefersReducedMotion();
    const particles: Particle[] = [];
    for (let y = 0; y < cssH; y += gap) {
      for (let x = 0; x < cssW; x += gap) {
        if (img[(y * cssW + x) * 4 + 3] > 128) {
          particles.push({
            tx: x,
            ty: y,
            x: assembled ? x : Math.random() * cssW,
            y: assembled ? y : Math.random() * cssH,
            vx: 0,
            vy: 0,
          });
        }
      }
    }
    particlesRef.current = particles;
    drawStatic();

    function drawStatic() {
      if (!ctx) return;
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.fillStyle = accent;
      for (const p of particlesRef.current) {
        ctx.fillRect(Math.round(p.x), Math.round(p.y), block, block);
      }
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [text, accent]);

  // React to start-gate transitions: animate assembly on false -> true.
  useEffect(() => {
    const wasStarted = prevStartedRef.current;
    prevStartedRef.current = started;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    const { w, h } = dimsRef.current;

    const paint = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = accent;
      for (const p of particlesRef.current) {
        ctx.fillRect(Math.round(p.x), Math.round(p.y), block, block);
      }
    };

    if (!started || wasStarted || prefersReducedMotion()) {
      // Snap to whatever the current positions imply (build effect handled it).
      return;
    }

    cancelAnimationFrame(rafRef.current);
    const step = () => {
      let moving = 0;
      for (const p of particlesRef.current) {
        const ax = (p.tx - p.x) * 0.08;
        const ay = (p.ty - p.y) * 0.08;
        p.vx = (p.vx + ax) * 0.82;
        p.vy = (p.vy + ay) * 0.82;
        p.x += p.vx;
        p.y += p.vy;
        if (Math.abs(p.tx - p.x) > 0.6 || Math.abs(p.ty - p.y) > 0.6) moving++;
      }
      paint();
      if (moving > 0) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafRef.current);
  }, [started, accent]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="h-16 w-full max-w-xs sm:h-20 sm:max-w-sm"
        aria-hidden="true"
      />
      <span className="sr-only">{text}</span>
    </>
  );
}
