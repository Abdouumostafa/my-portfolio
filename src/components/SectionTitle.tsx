"use client";

import React, { useRef, useLayoutEffect, useEffect } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const chrome: CSSProperties = {
  backgroundImage: "linear-gradient(to bottom, #FFFFFF 0%, #F4F6FA 42%, #C6CCD8 80%, #949DAF 100%)",
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
  fontSizeClamp = "clamp(2rem, 8vw, 4.5rem)",
  width = "100%"
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
          start: "top 85%", // Trigger when top of container hits 85% of viewport
          toggleActions: "play none none reverse",
        }
      });

      // Set initial state for characters
      gsap.set(".char-wrap", { overflow: "hidden", display: "inline-block" });
      gsap.set(".st-char", { yPercent: 110 });

      // Animate characters up
      tl.to(".st-char", {
        yPercent: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.04
      });

      // 2. Continuous Floating Dots Animation
      const dotEls = gsap.utils.toArray(".st-dot") as HTMLElement[];

      dotEls.forEach((dot) => {
        // Randomize the animation slightly for each dot
        const xOffset = gsap.utils.random(15, 35);
        const yOffset = gsap.utils.random(15, 35);
        // Faster duration!
        const duration = gsap.utils.random(1.5, 2.5);
        const delay = gsap.utils.random(0, 1);

        gsap.to(dot, {
          x: xOffset,
          y: yOffset,
          rotation: 180,
          duration: duration,
          delay: delay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

    }, container);

    return () => ctx.revert();
  }, []);

  // Helper to split text into characters wrapped in spans
  const splitText = (text: string) => {
    return text.split("").map((char, index) => {
      if (char === " ") {
        return <span key={index} className="inline-block w-[0.25em]">&nbsp;</span>;
      }
      return (
        <span key={index} className="char-wrap inline-block pt-[0.25em] mt-[-0.25em] pb-[0.05em] mb-[-0.05em]">
          <span className="st-char inline-block will-change-transform" style={chrome}>
            {char}
          </span>
        </span>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col items-center justify-center py-10 overflow-visible select-none ${className}`}
    >
      {/* The Floating Dots */}
      {dots.map((dot, i) => (
        <div
          key={i}
          className={`st-dot absolute rounded-full ${dot.size}`}
          style={{
            backgroundColor: dot.color,
            ...dot.initialPos,
            boxShadow: `0 0 10px ${dot.color}80` // Add subtle glow
          }}
          aria-hidden="true"
        />
      ))}

      {/* The Typography */}
      <h2 className="flex flex-col items-center font-bartle uppercase tracking-[-0.015em] leading-[0.65] text-center z-10"
        style={{ fontSize: fontSizeClamp, width: width }}>

        {/* Line 1 */}
        <span className="inline-block w-full text-center">
          {splitText(line1)}
        </span>

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
