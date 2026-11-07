"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Three = typeof import("three");

/** The source avatar is 32x32 pixel art upscaled; sample one voxel per cell. */
const GRID = 32;
/** Max per-channel distance from the corner color still treated as background. */
const BG_TOLERANCE = 6; // background ≈ rgb(20,20,20); the black shirt is ≈ rgb(32,31,28)

type Voxel = {
  tx: number;
  ty: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  /** ms after mount before this voxel starts dropping in */
  delay: number;
};

function prefersReducedMotion() {
  return Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches);
}

/**
 * Samples the avatar into a GRID x GRID color grid, flood-fills the flat
 * background from the edges, then keeps only the largest connected blob so
 * stray noise pixels in the background don't become voxels.
 */
async function sampleAvatar(src: string) {
  const img = new window.Image();
  img.src = src;
  await img.decode();

  const canvas = document.createElement("canvas");
  canvas.width = GRID;
  canvas.height = GRID;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2d context unavailable");
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, 0, 0, GRID, GRID);
  const data = ctx.getImageData(0, 0, GRID, GRID).data;

  const at = (x: number, y: number) => (y * GRID + x) * 4;
  const bg = [data[0], data[1], data[2]];
  const isBg = (i: number) =>
    Math.abs(data[i] - bg[0]) <= BG_TOLERANCE &&
    Math.abs(data[i + 1] - bg[1]) <= BG_TOLERANCE &&
    Math.abs(data[i + 2] - bg[2]) <= BG_TOLERANCE;

  const background = new Uint8Array(GRID * GRID);
  const stack: Array<[number, number]> = [];
  for (let i = 0; i < GRID; i++) stack.push([i, 0], [i, GRID - 1], [0, i], [GRID - 1, i]);
  while (stack.length > 0) {
    const [x, y] = stack.pop()!;
    if (x < 0 || y < 0 || x >= GRID || y >= GRID) continue;
    const k = y * GRID + x;
    if (background[k] || !isBg(at(x, y))) continue;
    background[k] = 1;
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }

  const label = new Int32Array(GRID * GRID).fill(-1);
  const sizes: number[] = [];
  for (let k = 0; k < GRID * GRID; k++) {
    if (background[k] || label[k] >= 0) continue;
    const id = sizes.length;
    let size = 0;
    const queue = [k];
    label[k] = id;
    while (queue.length > 0) {
      const cur = queue.pop()!;
      size++;
      const cx = cur % GRID;
      const cy = (cur - cx) / GRID;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = cx + dx;
          const ny = cy + dy;
          if (nx < 0 || ny < 0 || nx >= GRID || ny >= GRID) continue;
          const n = ny * GRID + nx;
          if (background[n] || label[n] >= 0) continue;
          label[n] = id;
          queue.push(n);
        }
      }
    }
    sizes.push(size);
  }
  const main = sizes.indexOf(Math.max(...sizes));

  const cells: Array<{ x: number; y: number; r: number; g: number; b: number }> = [];
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      if (label[y * GRID + x] !== main) continue;
      const i = at(x, y);
      cells.push({ x, y, r: data[i], g: data[i + 1], b: data[i + 2] });
    }
  }
  return cells;
}

/**
 * Hero avatar: the real pixel-art image is what people see. On load (and on
 * click — the same intro replays) the avatar is briefly rebuilt from 3D voxels
 * that drop in row by row and bounce into place, then cross-fades back to the
 * crisp original image —
 * the source isn't on an exact pixel grid, so voxels are only used while
 * moving. The whole avatar tilts toward the pointer (CSS 3D, stays sharp).
 * three.js is loaded lazily; reduced motion or missing WebGL = image only.
 */
export function HeroAvatar({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const reduced = prefersReducedMotion();
    let disposed = false;
    let cleanupScene = () => {};

    // Pointer tilt (CSS only, so the image stays crisp).
    function onPointerMove(e: PointerEvent) {
      if (!container) return;
      const r = container.getBoundingClientRect();
      const x = Math.max(
        -1,
        Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)),
      );
      const y = Math.max(
        -1,
        Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)),
      );
      container.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 5}deg)`;
    }
    if (!reduced) window.addEventListener("pointermove", onPointerMove, { passive: true });

    const showImage = (visible: boolean) => {
      image.style.opacity = visible ? "1" : "0";
    };

    if (!reduced) {
      showImage(false);
      Promise.all([import("three"), sampleAvatar(src)])
        .then(([THREE, cells]) => {
          if (disposed) return;
          cleanupScene = mountScene(THREE, container, cells, showImage);
        })
        .catch(() => {
          if (!disposed) showImage(true);
        });
    }

    return () => {
      disposed = true;
      window.removeEventListener("pointermove", onPointerMove);
      cleanupScene();
      showImage(true);
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={alt}
      className={`hero-avatar relative ${className}`}
    >
      <Image
        ref={imageRef}
        src={src}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 40rem, 92vw"
        className="border-fami-gold rounded-2xl border-4 object-cover shadow-[8px_8px_0_#a20000] transition-opacity duration-500"
      />
    </div>
  );
}

function mountScene(
  THREE: Three,
  container: HTMLElement,
  cells: Array<{ x: number; y: number; r: number; g: number; b: number }>,
  showImage: (visible: boolean) => void,
) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.position = "absolute";
  canvas.style.inset = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.transition = "opacity 500ms";
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 400);

  // ── Voxels (unlit, so colors match the source exactly) ──
  const lowestRow = Math.max(...cells.map((c) => c.y));
  const voxels: Voxel[] = cells.map((c) => {
    const tx = c.x - (GRID - 1) / 2;
    const ty = (GRID - 1) / 2 - c.y;
    return {
      tx,
      ty,
      x: tx,
      y: ty + 26 + Math.random() * 10,
      z: 0,
      vx: 0,
      vy: 0,
      vz: 0,
      delay: (lowestRow - c.y) * 38 + Math.random() * 120,
    };
  });

  const box = new THREE.BoxGeometry(1, 1, 1);
  const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const cubes = new THREE.InstancedMesh(box, mat, voxels.length);
  cubes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(cubes);

  const color = new THREE.Color();
  cells.forEach((c, i) => {
    cubes.setColorAt(i, color.setRGB(c.r / 255, c.g / 255, c.b / 255, THREE.SRGBColorSpace));
  });

  // ── Layout: the 32-unit grid fills the box exactly, matching the image ──
  function layout() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
    camera.position.z = GRID / 2 / Math.tan(halfFov) / Math.min(1, camera.aspect);
    camera.updateProjectionMatrix();
    if (!raf) renderer.render(scene, camera);
  }

  // ── Simulation ──
  const dummy = new THREE.Object3D();
  let t0 = performance.now();

  function step() {
    const elapsed = performance.now() - t0;
    let moving = false;

    voxels.forEach((v, i) => {
      const started = elapsed >= v.delay;
      if (started) {
        // Under-damped spring: overshoots slightly, so landing reads as a bounce.
        v.vx = (v.vx + (v.tx - v.x) * 0.09) * 0.8;
        v.vy = (v.vy + (v.ty - v.y) * 0.09) * 0.8;
        v.vz = (v.vz + (0 - v.z) * 0.12) * 0.78;
        v.x += v.vx;
        v.y += v.vy;
        v.z += v.vz;
      }
      if (
        !started ||
        Math.abs(v.vx) + Math.abs(v.vy) + Math.abs(v.vz) > 0.004 ||
        Math.abs(v.tx - v.x) + Math.abs(v.ty - v.y) > 0.01
      ) {
        moving = true;
      }
      dummy.position.set(v.x, v.y, v.z);
      dummy.rotation.set(v.vy * 0.25, v.vx * 0.25, 0);
      dummy.scale.setScalar(started ? 1 : 0);
      dummy.updateMatrix();
      cubes.setMatrixAt(i, dummy.matrix);
    });
    cubes.instanceMatrix.needsUpdate = true;
    renderer.render(scene, camera);
    return moving;
  }

  // ── Loop: runs only while voxels move, then hands over to the image ──
  let raf = 0;
  function loop() {
    if (step()) {
      raf = requestAnimationFrame(loop);
    } else {
      raf = 0;
      showImage(true);
      canvas.style.opacity = "0";
    }
  }
  function play() {
    showImage(false);
    canvas.style.opacity = "1";
    if (!raf) raf = requestAnimationFrame(loop);
  }

  /** Replays the intro: every voxel jumps back above and drops in row by row. */
  function replay() {
    for (const v of voxels) {
      v.x = v.tx;
      v.y = v.ty + 26 + Math.random() * 10;
      v.z = 0;
      v.vx = 0;
      v.vy = 0;
      v.vz = 0;
    }
    t0 = performance.now();
    play();
  }

  const ro = new ResizeObserver(layout);
  ro.observe(container);
  layout();
  container.addEventListener("pointerdown", replay);
  container.style.cursor = "pointer";
  play();

  return () => {
    cancelAnimationFrame(raf);
    raf = 0;
    ro.disconnect();
    container.removeEventListener("pointerdown", replay);
    container.style.cursor = "";
    box.dispose();
    mat.dispose();
    cubes.dispose();
    renderer.dispose();
    canvas.remove();
  };
}
