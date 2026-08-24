"use client";

import React, { useEffect, useRef } from "react";

interface EyesLogoProps {
  className?: string;
  size?: "sm" | "md";
}

interface EyeProps {
  size: "sm" | "md";
}

const Eye = ({ size }: EyeProps) => {
  const wrapperClass = size === "sm" ? "w-12 h-12" : "w-16 h-16";
  const eyeClass = size === "sm" ? "w-8 h-8" : "w-10 h-10";
  const irisClass = size === "sm" ? "w-3.5 h-3.5" : "w-4.5 h-4.5";
  const pupilClass = size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2";
  const catchlight1Class = size === "sm" ? "w-[3px] h-[3px]" : "w-1 h-1";
  const catchlight2Class = size === "sm" ? "w-[2px] h-[2px]" : "w-0.5 h-0.5";

  return (
    <div className={`relative flex items-center justify-center ${wrapperClass}`}>
      {/* Eyelid Crease (subtle structure) */}
      <div className="absolute top-[22%] left-[50%] -translate-x-1/2 w-[55%] h-[25%] border-t-[2px] border-neutral-700 rounded-t-[50%] pointer-events-none" />

      {/* Almond Shape Container (Rotated) */}
      <div className={`${eyeClass} rotate-45 bg-white overflow-hidden shadow-[inset_0_4px_10px_rgba(0,0,0,0.4)] border-[1.5px] border-neutral-400 rounded-tl-[80%] rounded-tr-[10%] rounded-br-[80%] rounded-bl-[10%] relative`}>

        {/* Un-rotated internal container for Iris and sliding Eyelid */}
        <div className="absolute top-[-25%] left-[-25%] w-[150%] h-[150%] -rotate-45 flex items-center justify-center pointer-events-none">

          {/* Iris */}
          <div
            className={`js-iris ${irisClass} rounded-full bg-gradient-to-br from-blue-400 to-blue-normal relative flex items-center justify-center shadow-[inset_0_0_6px_rgba(0,0,0,0.8)]`}
            style={{ transition: "transform 0.1s ease-out" }}
          >
            {/* Pupil */}
            <div className={`${pupilClass} rounded-full bg-neutral-900`} />

            {/* Catchlights */}
            <div className={`absolute top-[15%] right-[25%] ${catchlight1Class} bg-white rounded-full shadow-[0_0_2px_rgba(255,255,255,0.8)]`} />
            <div className={`absolute bottom-[25%] left-[20%] ${catchlight2Class} bg-white rounded-full opacity-70`} />
          </div>

          {/* Sliding Eyelid Animation inside the almond */}
          <div className="absolute top-0 left-[-10%] w-[120%] h-[120%] bg-[#0a0a0a] rounded-b-[50%] z-10 shadow-[0_8px_15px_rgba(0,0,0,0.9)] border-b-2 border-neutral-800 animate-eyelid pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default function EyesLogo({ className = "", size = "md" }: EyesLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    const travel = size === "sm" ? 8 : 12;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const { innerWidth, innerHeight } = window;
      let clientX, clientY;
      
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      targetX = ((clientX - innerWidth / 2) / (innerWidth / 2)) * travel;
      targetY = ((clientY - innerHeight / 2) / (innerHeight / 2)) * travel;
    };

    const animate = () => {
      if (containerRef.current) {
        const irises = containerRef.current.querySelectorAll('.js-iris');
        irises.forEach((iris) => {
          (iris as HTMLElement).style.transform = `translate(${targetX}px, ${targetY}px)`;
        });
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    rafId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, [size]);

  return (
    <>
      <style>{`
        @keyframes eyelidBlink {
          0%, 80% { transform: translateY(-110%); }
          82.5% { transform: translateY(-10%); }  /* Close 1 */
          85% { transform: translateY(-110%); }   /* Open 1 */
          95% { transform: translateY(-110%); }   /* Wait 0.4s */
          97.5% { transform: translateY(-10%); }  /* Close 2 */
          100% { transform: translateY(-110%); }  /* Open 2 */
        }
        .animate-eyelid {
          animation: eyelidBlink 4s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
      <div ref={containerRef} className={`flex items-center gap-1 sm:gap-1.5 ${className}`}>
        <Eye size={size} />
        <Eye size={size} />
      </div>
    </>
  );
}
