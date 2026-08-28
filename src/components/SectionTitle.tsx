"use client";

import React, { useRef, useLayoutEffect, useEffect } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * التدرّج المعدني: عمودي (180deg) من الأبيض الساطع لحد الرمادي الغامق.
 * المحطات مزاحة (12% → 88%) عشان الـ padding الموجود فوق وتحت الحرف —
 * من غير الإزاحة دي طرفي التدرّج كانوا هيضيعوا في الفراغ بدل ما يبانوا على الحرف.
 */
const chrome: CSSProperties = {
  backgroundImage:
    "linear-gradient(180deg, #FFFFFF 12%, #F7F7FA 30%, #D2D2DB 54%, #9A9AA9 74%, #62626F 88%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
  paddingBottom: "0.28em",
  paddingTop: "0.2em",
};

interface SectionTitleProps {
  line1: string;
  line2?: string;
  className?: string;
  fontSizeClamp?: string;
  width?: string;
}

export default function SectionTitle({
  line1,
  line2,
  className = "",
  fontSizeClamp = "clamp(2.75rem, 11vw, 7rem)",
  width = "100%",
}: SectionTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Dots config with responsive sizes (smaller on mobile)
  const dots = [
    { color: "#1836FF", size: "w-1 h-1 sm:w-1.5 sm:h-1.5", initialPos: { top: "20%", left: "15%" } }, // Blue
    { color: "#FF3366", size: "w-1.5 h-1.5 sm:w-2 sm:h-2", initialPos: { top: "70%", left: "25%" } }, // Red
    { color: "#FF9900", size: "w-1 h-1 sm:w-1.5 sm:h-1.5", initialPos: { bottom: "10%", right: "10%" } }, // Orange
    { color: "#9D00FF", size: "hidden sm:block sm:w-1 sm:h-1", initialPos: { top: "10%", right: "20%" } }, // Purple (hidden on mobile)
    { color: "#00E5FF", size: "w-1 h-1 sm:w-1.5 sm:h-1.5", initialPos: { bottom: "30%", left: "5%" } }, // Cyan/Green
  ];

  useIsoLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Text Reveal Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.set(".char-wrap", { overflow: "hidden", display: "inline-block" });
      gsap.set(".st-char", { yPercent: 110 });

      tl.to(".st-char", {
        yPercent: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.04,
      });

      // 2. Floating Dots Animation — triggered only when section is visible
      const dotEls = gsap.utils.toArray(".st-dot") as HTMLElement[];

      dotEls.forEach((dot, index) => {
        const xOffset = 15 + (index % 3) * 8;
        const yOffset = 15 + (index % 2) * 10;
        const duration = 2 + (index % 3) * 0.5;

        gsap.to(dot, {
          x: xOffset,
          y: yOffset,
          duration: duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: container,
            start: "top 100%",
            end: "bottom 0%",
            toggleActions: "play pause resume pause",
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  // Helper to split text into characters wrapped in spans
  const splitText = (text: string) => {
    return text.split("").map((char, index) => {
      if (char === " ") {
        return (
          <span key={index} className="inline-block w-[0.25em]">
            &nbsp;
          </span>
        );
      }
      return (
        <span
          key={index}
          className="char-wrap inline-block pt-[0.25em] mt-[-0.25em] pb-[0.05em] mb-[-0.05em]"
        >
          <span className="st-char inline-block" style={chrome}>
            {char}
          </span>
        </span>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col items-center justify-center pt-4 sm:pt-10 overflow-visible select-none ${className}`}
    >
      {/* The Floating Dots */}
      {dots.map((dot, i) => (
        <div
          key={i}
          className={`st-dot absolute rounded-full ${dot.size}`}
          style={{
            backgroundColor: dot.color,
            ...dot.initialPos,
            boxShadow: `0 0 10px ${dot.color}80`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* The Typography */}
      <h2
        className="flex flex-col items-center font-bartle uppercase tracking-[-0.015em] leading-[0.65] text-center z-10 whitespace-nowrap"
        style={{
          fontSize: fontSizeClamp,
          width: width,
        }}
      >
        {/* Line 1 */}
        <span className="inline-block w-full text-center">{splitText(line1)}</span>

        {/* Line 2 (Optional) */}
        {line2 && (
          <span className="inline-block w-full text-center mt-[-0.32em]">
            {splitText(line2)}
          </span>
        )}
      </h2>
    </div>
  );
}