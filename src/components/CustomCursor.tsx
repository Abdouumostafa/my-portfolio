"use client";

import { useEffect, useRef, useCallback, useSyncExternalStore, useState } from "react";

// Always returns true on the client; false during SSR.
// This avoids calling setState inside useEffect.
function useIsMounted() {
  return useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );
}

export default function CustomCursor() {
  const isMounted = useIsMounted();
  const [isCoarse, setIsCoarse] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(pointer: coarse)").matches
      : false
  );

  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const circle = useRef({ x: -100, y: -100, vx: 0, vy: 0 });
  const magnetTarget = useRef<{ x: number; y: number; w: number; h: number; } | null>(null);
  const targetDotScale = useRef(1);
  const targetCircleSize = useRef(28); // base 28px
  const currentCircleSize = useRef(28);
  const dotScale = useRef(1);
  const speed = useRef(0);
  const labelText = useRef("");
  const rafId = useRef<number>(0);

  const updateLabel = useCallback((text: string) => {
    if (!labelRef.current) return;
    if (text && labelText.current !== text) {
      labelRef.current.textContent = text;
      labelRef.current.style.opacity = "1";
      labelRef.current.style.transform = "translateX(-50%) translateY(0) scale(1)";
    } else if (!text && labelText.current) {
      labelRef.current.style.opacity = "0";
      labelRef.current.style.transform = "translateX(-50%) translateY(4px) scale(0.9)";
    }
    labelText.current = text;
  }, []);

  useEffect(() => {
    if (isCoarse) return;

    const handleTouch = () => {
      setIsCoarse(true);
      window.removeEventListener("touchstart", handleTouch);
    };
    window.addEventListener("touchstart", handleTouch, { passive: true });

    let prevX = -100;
    let prevY = -100;

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      speed.current = Math.sqrt(dx * dx + dy * dy);
      prevX = e.clientX;
      prevY = e.clientY;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Instant dot
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;

      const link = el.closest("a");
      const btn = el.closest("button");
      const heading = el.closest("h1, h2, h3");
      const interactive = link || btn;

      if (interactive) {
        // Magnetic snap: lock circle to element center
        const rect = interactive.getBoundingClientRect();
        magnetTarget.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          w: rect.width,
          h: rect.height,
        };
        targetDotScale.current = 0;
        targetCircleSize.current = Math.max(rect.width, rect.height) + 20;
        updateLabel(link ? "View" : "Click");
      } else if (heading) {
        // Text hover: big crisp circle
        magnetTarget.current = null;
        targetDotScale.current = 0;
        targetCircleSize.current = 120;
        updateLabel("");
      } else {
        magnetTarget.current = null;
        targetDotScale.current = 1;
        targetCircleSize.current = 28;
        updateLabel("");
      }
    };

    const onMouseDown = () => {
      targetDotScale.current *= 0.5;
      targetCircleSize.current *= 0.8;
    };

    const onMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (circleRef.current) circleRef.current.style.opacity = "0";
      if (labelRef.current) labelRef.current.style.opacity = "0";
    };

    const onMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (circleRef.current) circleRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    // ---- SPRING PHYSICS LOOP ----
    const stiffness = 0.25;
    const damping = 0.5;

    const animate = () => {
      // Determine chase target: magnetic element center or raw mouse
      let tx = mouse.current.x;
      let ty = mouse.current.y;

      if (magnetTarget.current) {
        // Magnetic snap: physically pulls toward center but tracks mouse slightly
        tx = mouse.current.x + (magnetTarget.current.x - mouse.current.x) * 0.8;
        ty = mouse.current.y + (magnetTarget.current.y - mouse.current.y) * 0.8;
      }

      // Spring force
      const dx = tx - circle.current.x;
      const dy = ty - circle.current.y;
      circle.current.vx += dx * stiffness;
      circle.current.vy += dy * stiffness;
      circle.current.vx *= damping;
      circle.current.vy *= damping;
      circle.current.x += circle.current.vx;
      circle.current.y += circle.current.vy;

      // Velocity-responsive size boost (grows when moving fast, shrinks when stopped)
      const velocityBoost = Math.min(speed.current * 1.5, 24);
      const effectiveTarget = targetCircleSize.current + velocityBoost;
      currentCircleSize.current += (effectiveTarget - currentCircleSize.current) * 0.15;

      // Smooth dot scale
      dotScale.current += (targetDotScale.current - dotScale.current) * 0.15;

      // Decay speed
      speed.current *= 0.85;

      // Apply transforms
      if (circleRef.current) {
        const s = currentCircleSize.current;
        circleRef.current.style.left = `${circle.current.x}px`;
        circleRef.current.style.top = `${circle.current.y}px`;
        circleRef.current.style.width = `${s}px`;
        circleRef.current.style.height = `${s}px`;
        circleRef.current.style.marginLeft = `${-s / 2}px`;
        circleRef.current.style.marginTop = `${-s / 2}px`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(-50%, -50%) scale(${dotScale.current})`;
      }

      if (labelRef.current) {
        labelRef.current.style.left = `${circle.current.x}px`;
        labelRef.current.style.top = `${circle.current.y + currentCircleSize.current / 2 + 10}px`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.body.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("touchstart", handleTouch);
      cancelAnimationFrame(rafId.current);
    };
  }, [updateLabel, isCoarse]);

  if (!isMounted || isCoarse) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] select-none" aria-hidden="true">
      {/* Instant precision dot */}
      <div
        ref={dotRef}
        className="fixed w-2 h-2 rounded-full bg-white pointer-events-none"
        style={{
          mixBlendMode: "difference",
          willChange: "left, top, transform, opacity",
          transition: "opacity 0.3s",
        }}
      />

      {/* Spring-physics trailing circle — crisp border, no blur */}
      <div
        ref={circleRef}
        className="fixed rounded-full border-2 border-white pointer-events-none"
        style={{
          mixBlendMode: "difference",
          willChange: "left, top, width, height, margin",
          transition: "opacity 0.3s, border-width 0.3s",
          imageRendering: "crisp-edges",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Contextual hover label */}
      <div
        ref={labelRef}
        className="fixed text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-white opacity-0 pointer-events-none"
        style={{
          mixBlendMode: "difference",
          willChange: "left, top, opacity, transform",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          transform: "translateX(-50%) translateY(4px) scale(0.9)",
        }}
      />
    </div>
  );
}
