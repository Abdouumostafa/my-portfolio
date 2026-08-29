"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import SectionTitle from "./SectionTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Project assets
import alarmImg from "@/assets/alarmProject.jpg";
import libyaZoneDashImg from "@/assets/libyaZoneDashboardProject.jpg";
import libyaZoneWebImg from "@/assets/libyaZoneWebsiteProject.jpg";
import newZeroImg from "@/assets/newZeroProject.png";
import suqAljameuhDashImg from "@/assets/suqAljameuhDashboardProject.png";
import suqAljameuhWebImg from "@/assets/suqAljameuhWebsiteProject.jpg";

interface ProjectItem {
  id: string;
  title: string;
  descPrefix: string;
  descSuffix: string;
  image: StaticImageData;
  category: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "newzero-dash",
    title: "NewZero Car Care Dashboard",
    descPrefix: "Multi-Branch Operations & Booking Control Panel,",
    descSuffix:
      "managing seven branches with real-time booking monitoring, service package pricing, crew scheduling, customer tiering, and revenue analytics.",
    image: newZeroImg,
    category: "SaaS Dashboard",
  },
  {
    id: "libyazone-web",
    title: "LibyaZone Global Shopping Platform",
    descPrefix: "International Shopping & Door-to-Door Shipping Storefront,",
    descSuffix:
      "letting shoppers in Libya order products from worldwide stores with multi-currency pricing, upfront shipping estimates, and live shipment tracking.",
    image: libyaZoneWebImg,
    category: "Next.js / E-Commerce",
  },
  {
    id: "libyazone-dash",
    title: "LibyaZone Admin Dashboard",
    descPrefix: "Cross-Border Orders & Shipping Operations Console,",
    descSuffix:
      "handling catalog and pricing rules, end-to-end order tracking from purchase abroad to delivery, wallet and refund management, and revenue reporting.",
    image: libyaZoneDashImg,
    category: "Operations Console",
  },
  {
    id: "suq-web",
    title: "Souq Al-Jumaa Marketplace",
    descPrefix: "Peer-to-Peer Classifieds Platform for Web & Mobile,",
    descSuffix:
      "with photo-rich listings, category, location and condition filters, direct buyer-seller messaging, and a two-way rating system.",
    image: suqAljameuhWebImg,
    category: "Web Platform",
  },
  {
    id: "suq-dash",
    title: "Souq Al-Jumaa Admin Dashboard",
    descPrefix: "Classifieds Moderation & Ad Monetization Console,",
    descSuffix:
      "managing listings and paid placements, a report and abuse review queue, live chat oversight, user tiering, and traffic and engagement analytics.",
    image: suqAljameuhDashImg,
    category: "SaaS Dashboard",
  },
  {
    id: "alaram-pharmacy",
    title: "Alaram Pharmacy Management System",
    descPrefix: "Pharmacy Operations Platform with Contraindication Alerts,",
    descSuffix:
      "combining patient condition records, real-time restricted-medication warnings at point of sale, precise inventory tracking, and sales performance reports.",
    image: alarmImg,
    category: "Healthcare System",
  },
];

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const total = PROJECTS.length;

  // Track viewport size for responsive layout adjustments
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Infinite smooth auto-scroll timer (pauses on hover)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [handleNext, isHovered]);

  // Touch swipe support for mobile
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX; // Reset endX to prevent ghost swipes
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // GSAP Animation for Title and Description (on mount/scroll & switch)
  useEffect(() => {
    if (!textContainerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 95%", // Trigger when text is visible
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        ".anim-title",
        { y: 20, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power2.out" }
      ).fromTo(
        ".anim-desc",
        { y: 20, opacity: 0, filter: "blur(6px)", backgroundPositionX: "100%" },
        { y: 0, opacity: 1, filter: "blur(0px)", backgroundPositionX: "0%", duration: 1, ease: "power2.out" },
        "-=0.3"
      );
    }, textContainerRef);

    return () => ctx.revert();
  }, [currentIndex]);

  // Compute transform styles based on circular slot distance (-2, -1, 0, 1, 2)
  const getCardStyle = (index: number) => {
    // Calculate signed circular offset (-2 to +2)
    let offset = (index - currentIndex) % total;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    // Desktop: 5 visible cards (-2, -1, 0, 1, 2)
    // Mobile: 3 visible cards (-1, 0, 1)
    const maxVisibleOffset = isMobile ? 1 : 2;
    const isVisible = Math.abs(offset) <= maxVisibleOffset;

    if (!isVisible) {
      return {
        transform: `translateX(${offset > 0 ? "120%" : "-120%"}) scale(0.4)`,
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none" as const,
        filter: "blur(8px)",
      };
    }

    if (offset === 0) {
      // Center (Summit of the pyramid / arch)
      return {
        transform: "translateX(0%) translateY(-28px) translateZ(100px) scale(1) rotate(0deg)",
        opacity: 1,
        zIndex: 30,
        filter: "blur(0px)",
        pointerEvents: "auto" as const,
      };
    }

    if (offset === -1) {
      // Immediate Left (Slopes downward & rotates counter-clockwise)
      const translateX = isMobile ? "-52%" : "-44%";
      const translateY = isMobile ? "24px" : "32px";
      const rotateZ = isMobile ? "-7deg" : "-7deg";
      const scale = isMobile ? 0.82 : 0.86;
      return {
        transform: `translateX(${translateX}) translateY(${translateY}) translateZ(40px) rotateY(10deg) rotateZ(${rotateZ}) scale(${scale})`,
        opacity: 0.85,
        zIndex: 20,
        filter: "blur(3.5px) brightness(0.85)",
        pointerEvents: "auto" as const,
      };
    }

    if (offset === 1) {
      // Immediate Right (Slopes downward & rotates clockwise)
      const translateX = isMobile ? "52%" : "44%";
      const translateY = isMobile ? "24px" : "32px";
      const rotateZ = isMobile ? "7deg" : "7deg";
      const scale = isMobile ? 0.82 : 0.86;
      return {
        transform: `translateX(${translateX}) translateY(${translateY}) translateZ(40px) rotateY(-10deg) rotateZ(${rotateZ}) scale(${scale})`,
        opacity: 0.85,
        zIndex: 20,
        filter: "blur(3.5px) brightness(0.85)",
        pointerEvents: "auto" as const,
      };
    }

    if (offset === -2) {
      // Far Left (Lowest base of pyramid on the left)
      return {
        transform: "translateX(-84%) translateY(105px) translateZ(-20px) rotateY(20deg) rotateZ(-16deg) scale(0.70)",
        opacity: 0.45,
        zIndex: 10,
        filter: "blur(7px) brightness(0.65)",
        pointerEvents: "auto" as const,
      };
    }

    if (offset === 2) {
      // Far Right (Lowest base of pyramid on the right)
      return {
        transform: "translateX(84%) translateY(105px) translateZ(-20px) rotateY(-20deg) rotateZ(16deg) scale(0.70)",
        opacity: 0.45,
        zIndex: 10,
        filter: "blur(7px) brightness(0.65)",
        pointerEvents: "auto" as const,
      };
    }

    return {};
  };

  const activeProject = PROJECTS[currentIndex];

  return (
    <section
      id="projects"
      className="relative w-full py-20 sm:py-28 md:py-36 overflow-hidden flex flex-col items-center justify-center select-none"
      style={{
        background:
          "linear-gradient(180deg, #171323 0%, #050406 38.94%, #050406 64.42%, #171323 100%)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Decorative colored dots in the background */}
      <div className="absolute top-[8%] left-[8%] h-2 w-2 rounded-full bg-[#E54D4D] opacity-80 pointer-events-none" />
      <div className="absolute top-[6%] right-[10%] h-2 w-2 rounded-full bg-[#8B31FF] opacity-80 pointer-events-none" />
      <div className="absolute top-[35%] right-[5%] h-2.5 w-2.5 rounded-full bg-[#E3A342] opacity-80 pointer-events-none" />
      <div className="absolute top-[18%] left-[20%] h-1.5 w-1.5 rounded-full bg-[#1836FF] opacity-80 pointer-events-none" />
      <div className="absolute bottom-[20%] left-[6%] h-2 w-2 rounded-full bg-[#8B31FF] opacity-70 pointer-events-none" />
      <div className="absolute bottom-[15%] right-[8%] h-2 w-2 rounded-full bg-[#E54D4D] opacity-70 pointer-events-none" />

      {/* Background Section Title */}
      <div className="absolute top-[4%] sm:top-[6%] lg:top-[8%] left-0 w-full z-0 pointer-events-none">
        <SectionTitle
          line1="PROJECTS"
          fontSizeClamp="clamp(2rem, 6vw, 8rem)"
          className="opacity-90"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center mt-0 sm:mt-12 md:mt-24">

        {/* ── 3D Carousel Stage (Pyramid Arc) ── */}
        <div
          data-no-cursor
          className="relative w-full flex items-center justify-center h-[280px] sm:h-[390px] md:h-[450px] lg:h-[500px]"
          style={{ perspective: "1400px" }}
        >
          {PROJECTS.map((project, idx) => {
            const style = getCardStyle(idx);
            const isCenter = idx === currentIndex;

            return (
              <div
                key={project.id}
                data-no-cursor
                onClick={() => {
                  if (!isCenter) setCurrentIndex(idx);
                }}
                className={`absolute will-change-transform cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isCenter ? "cursor-default" : "hover:brightness-110"
                  }`}
                style={{
                  width: isMobile ? "78vw" : "min(56vw, 680px)",
                  maxWidth: "720px",
                  aspectRatio: "16 / 10",
                  transformStyle: "preserve-3d",
                  ...style,
                }}
              >
                {/* Outer Card Container */}
                <div
                  className={`relative w-full h-full rounded-[18px] sm:rounded-[24px] md:rounded-[28px] overflow-hidden bg-[#161224] border transition-all duration-500 shadow-2xl ${isCenter
                    ? "border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(30,53,255,0.22)]"
                    : "border-white/10 shadow-xl"
                    }`}
                >
                  {/* Full-Bleed Project Screenshot */}
                  <div className="relative w-full h-full bg-[#0c0914] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 680px"
                      className="object-cover object-top transition-transform duration-700 ease-out"
                      priority={isCenter}
                    />
                    {/* Darker blur overlay on inactive cards */}
                    {!isCenter && (
                      <div className="absolute inset-0 bg-[#08060F]/40 backdrop-blur-[1px] pointer-events-none transition-opacity duration-500" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Action Button: Open All Projects ── */}
        <div className="mt-8 sm:mt-10 z-20">
          <button
            type="button"
            className="group inline-flex items-center gap-2 rounded-full bg-[#1E35FF] px-6 sm:px-7 py-2.5 sm:py-3 font-semibold text-xs sm:text-sm text-white shadow-[0_0_24px_rgba(30,53,255,0.45)] transition-all duration-300 hover:bg-[#1b30e6] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Open All Projects</span>
            <svg
              className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </button>
        </div>

        {/* ── Active Project Info with Left & Right Nav Buttons (Matching Reference Design) ── */}
        <div className="w-full max-w-7xl px-3 sm:px-8 lg:px-12 mt-6 sm:mt-8 flex flex-col md:flex-row items-center justify-between z-20 relative">

          {/* Previous Button (Desktop) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous project"
            className="hidden md:flex group flex-shrink-0 h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#1A1428]/80 hover:bg-[#251D3A] border border-white/15 backdrop-blur-md text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E35FF]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 stroke-white transition-transform group-hover:-translate-x-0.5"
              fill="none"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.5 17.5L8.5 12.5C7.8 11.9 7.8 10.9 8.5 10.3L14.5 5.3C15.4 4.5 16.8 5.2 16.8 6.4V16.4C16.8 17.6 15.4 18.3 14.5 17.5Z" />
            </svg>
          </button>

          {/* Centered Title & Description */}
          <div ref={textContainerRef} className="flex flex-col items-center text-center max-w-2xl px-2 sm:px-6 mx-auto h-[140px] sm:h-[160px] md:h-[180px] justify-start">
            <h3 className="anim-title text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-white tracking-tight">
              {activeProject.title}
            </h3>

            <p
              className="anim-desc mt-3 text-sm sm:text-base md:text-lg leading-relaxed text-transparent bg-clip-text line-clamp-3 md:line-clamp-4"
              style={{
                backgroundImage: "linear-gradient(to right, #ffffff 50%, #8478A0 50%)",
                backgroundSize: "200% 100%",
                backgroundPositionX: "100%", // Start at #8478A0
              }}
            >
              <span className="font-medium">{activeProject.descPrefix} </span>
              <span className="font-normal">{activeProject.descSuffix}</span>
            </p>
          </div>

          {/* Mobile Navigation Buttons (Below Text) */}
          <div className="flex md:hidden items-center justify-center gap-4 mt-8 relative z-50 pointer-events-auto">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous project"
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#1A1428]/80 hover:bg-[#251D3A] border border-white/15 backdrop-blur-md text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E35FF] pointer-events-auto"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 stroke-white transition-transform group-hover:-translate-x-0.5"
                fill="none"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 17.5L8.5 12.5C7.8 11.9 7.8 10.9 8.5 10.3L14.5 5.3C15.4 4.5 16.8 5.2 16.8 6.4V16.4C16.8 17.6 15.4 18.3 14.5 17.5Z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next project"
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#1A1428]/80 hover:bg-[#251D3A] border border-white/15 backdrop-blur-md text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E35FF] pointer-events-auto"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 stroke-white transition-transform group-hover:translate-x-0.5"
                fill="none"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.5 17.5L15.5 12.5C16.2 11.9 16.2 10.9 15.5 10.3L9.5 5.3C8.6 4.5 7.2 5.2 7.2 6.4V16.4C7.2 17.6 8.6 18.3 9.5 17.5Z" />
              </svg>
            </button>
          </div>

          {/* Next Button (Desktop) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next project"
            className="hidden md:flex group flex-shrink-0 h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#1A1428]/80 hover:bg-[#251D3A] border border-white/15 backdrop-blur-md text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E35FF]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 stroke-white transition-transform group-hover:translate-x-0.5"
              fill="none"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9.5 17.5L15.5 12.5C16.2 11.9 16.2 10.9 15.5 10.3L9.5 5.3C8.6 4.5 7.2 5.2 7.2 6.4V16.4C7.2 17.6 8.6 18.3 9.5 17.5Z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
