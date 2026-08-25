"use client";

/**
 * SnapCursor
 * -------------
 * A sleek professional cursor featuring a dot that tracks the mouse instantly,
 * and a trailing ring. When hovering over interactive elements, the ring
 * magnetically snaps to the bounding box of the element and morphs into a pill
 * or rounded rectangle matching the element's shape.
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export type SnapCursorConfig = {
  /** Radius of the outer ring at rest. */
  ringRadius: number;
  /** Radius of the inner dot. */
  dotRadius: number;
  /** Thickness of the outer ring stroke. */
  ringThickness: number;
  /** Color of the outer ring. */
  ringColor: string;
  /** Color of the inner dot. */
  dotColor: string;
  /** Padding added around elements when snapped. */
  pad: number;
  /** Follow speed for the ring (lower = more lag). */
  chase: number;
  /** Follow speed when snapping to an element (usually faster). */
  snapChase: number;
  /** Elements that trigger the magnetic snap. */
  selector: string;
};

export const DEFAULTS: SnapCursorConfig = {
  ringRadius: 22,
  dotRadius: 4,
  ringThickness: 1.5,
  ringColor: "#ffffff",
  dotColor: "#2B3FF0",
  pad: 6, // Reduced from 8 for a tighter, sleeker fit
  chase: 12,
  snapChase: 20,
  selector: "a, button, [role='button'], input, select, textarea, summary, [data-cursor]",
};

/** Frame-rate independent damping */
const damp = (current: number, target: number, lambda: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-lambda * dt));

/** Safe rounded rectangle drawing path */
const drawRoundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) => {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

export default function CustomCursor(props: Partial<SnapCursorConfig> = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);

  const cfg = useRef<SnapCursorConfig>({ ...DEFAULTS, ...props });
  useEffect(() => {
    cfg.current = { ...DEFAULTS, ...props };
  });

  // Only enable on devices with a fine pointer (mouse/trackpad)
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Hide native cursor completely
  useEffect(() => {
    if (!enabled) return;
    const style = document.createElement("style");
    style.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);
    return () => style.remove();
  }, [enabled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!enabled || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dpr = 1;
    let width = 0;
    let height = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Raw mouse position
    let mouseX = -400;
    let mouseY = -400;

    // Ring state
    const ring = {
      x: mouseX,
      y: mouseY,
      w: cfg.current.ringRadius * 2,
      h: cfg.current.ringRadius * 2,
      r: cfg.current.ringRadius,
    };

    let target: HTMLElement | null = null;
    let seeded = false;
    let presence = 0;
    let clickScale = 1;
    let lock = 0; // Tracks if we are hovering a target for transitions

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!seeded) {
        seeded = true;
        ring.x = mouseX;
        ring.y = mouseY;
      }

      const el = e.target as HTMLElement | null;
      const next = el ? el.closest<HTMLElement>(cfg.current.selector) : null;
      if (next !== target) {
        target = next;
      }
    };

    const onDown = () => {
      clickScale = 0.85; // Shrink on click
    };

    const onLeave = () => {
      seeded = false;
      target = null;
    };

    const tick = (_time: number, deltaMS: number) => {
      const c = cfg.current;
      const dt = Math.min(deltaMS, 50) / 1000;

      if (target && !target.isConnected) target = null;

      presence = damp(presence, seeded ? 1 : 0, 10, dt);
      clickScale = damp(clickScale, 1, 15, dt); // Spring back scale
      lock = damp(lock, target ? 1 : 0, 12, dt); // Smoothly transition into lock state

      // Determine ring target dimensions and position
      let tx = mouseX;
      let ty = mouseY;
      let tw = c.ringRadius * 2;
      let th = c.ringRadius * 2;
      let tr = c.ringRadius;
      let lambda = reduced ? 999 : c.chase;

      if (target) {
        const rect = target.getBoundingClientRect();
        tw = rect.width + c.pad * 2;
        th = rect.height + c.pad * 2;
        tx = rect.left + rect.width / 2;
        ty = rect.top + rect.height / 2;
        lambda = reduced ? 999 : c.snapChase;

        // Try to read border radius of the target element
        const style = window.getComputedStyle(target);
        const radiusStr = style.borderRadius;
        if (radiusStr.includes('%') || radiusStr.includes('999')) {
          tr = 999; // pill shape
        } else {
          const parsed = parseFloat(radiusStr);
          // Default to pill shape for links, otherwise use element's radius or 8px
          if (parsed === 0 && target.tagName === 'A') {
            tr = 999;
          } else {
            tr = parsed || 8;
          }
        }
      }

      // Smoothly interpolate the ring to its targets
      ring.x = damp(ring.x, tx, lambda, dt);
      ring.y = damp(ring.y, ty, lambda, dt);
      ring.w = damp(ring.w, tw, lambda, dt);
      ring.h = damp(ring.h, th, lambda, dt);
      ring.r = damp(ring.r, tr, lambda, dt);

      ctx.clearRect(0, 0, width, height);
      if (presence < 0.01) return;

      ctx.globalAlpha = presence;

      // Draw the morphing ring
      const drawW = ring.w * clickScale;
      const drawH = ring.h * clickScale;
      // Cap radius to half of the shortest side to avoid drawing errors
      const safeRadius = Math.max(0, Math.min(ring.r, Math.min(drawW, drawH) / 2));

      drawRoundRect(
        ctx,
        ring.x - drawW / 2,
        ring.y - drawH / 2,
        drawW,
        drawH,
        safeRadius * clickScale
      );

      // Add a subtle transparent fill when snapped
      if (lock > 0.01) {
        ctx.fillStyle = `rgba(255, 255, 255, ${lock * 0.1})`;
        ctx.fill();
      }

      ctx.strokeStyle = c.ringColor;
      ctx.lineWidth = c.ringThickness;
      ctx.stroke();

      // Draw the inner dot (always tracks the mouse instantly)
      ctx.beginPath();
      // Shrink the dot to half its size when locked to avoid obscuring text
      const effectiveDotRadius = c.dotRadius * (1 - lock * 0.5) * clickScale;
      ctx.arc(mouseX, mouseY, effectiveDotRadius, 0, Math.PI * 2);
      ctx.fillStyle = c.dotColor;
      ctx.fill();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("resize", resize);
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("resize", resize);
      gsap.ticker.remove(tick);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999999]"
    />
  );
}