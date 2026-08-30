"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "./SectionTitle";
import aboutMeImage from "@/assets/aboutMe/aboutMeImage.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------------------------------------
   الأيقونات — SVG جوه الكود، مش محتاجة أي صور
--------------------------------------------- */

const ReactLogo = () => (
  <svg viewBox="-11.5 -10.23 23 20.46" className="h-full w-full" aria-hidden="true">
    <circle r="2.05" fill="currentColor" />
    <g stroke="currentColor" fill="none" strokeWidth="1">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const NextLogo = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M8.2 16.6V7.4l8 9.4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M15.4 7.4v6.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const TypeScriptLogo = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
    <text
      x="12"
      y="16.5"
      textAnchor="middle"
      fill="currentColor"
      fontSize="11"
      fontWeight="800"
      fontFamily="system-ui, -apple-system, Segoe UI, sans-serif"
      letterSpacing="0.5"
    >
      TS
    </text>
  </svg>
);

type TechIcon = {
  name: string;
  node: React.ReactNode;
  posMobile: string;
  posDesktop: string;
  bg: string;
  glow: string;
  depth: number;
  floatDur: number;
  floatY: number;
  floatRot: number;
};

const TECH_ICONS: TechIcon[] = [
  {
    name: "React",
    node: <ReactLogo />,
    posMobile: "top-[4%] left-[0%]",
    posDesktop: "lg:top-[10%] lg:left-[2%] lg:right-auto",
    bg: "linear-gradient(145deg, #E4585A, #C93E43)",
    glow: "rgba(224, 78, 78, 0.4)",
    depth: 28,
    floatDur: 3,
    floatY: -16,
    floatRot: 8,
  },
  {
    name: "Next.js",
    node: <NextLogo />,
    posMobile: "top-[12%] right-[2%]",
    posDesktop: "lg:top-[26%] lg:left-[26%] lg:right-auto",
    bg: "linear-gradient(145deg, #E2A03C, #C9822A)",
    glow: "rgba(226, 160, 60, 0.4)",
    depth: 16,
    floatDur: 4.2,
    floatY: 14,
    floatRot: -7,
  },
  {
    name: "TypeScript",
    node: <TypeScriptLogo />,
    posMobile: "top-[38%] left-[-1%]",
    posDesktop: "lg:top-[48%] lg:left-[-4%] lg:right-auto",
    bg: "linear-gradient(145deg, #9B4DFF, #7A2BE0)",
    glow: "rgba(140, 60, 255, 0.4)",
    depth: 40,
    floatDur: 3.6,
    floatY: -20,
    floatRot: 12,
  },
];

/* =============================================
   CAREER SNAPSHOT — تلات كروت
============================================= */

type CareerItem = {
  label: string;
  title: string;
  subtitle: string;
  period: string;
  accent: string;
};

const CAREER_ITEMS: CareerItem[] = [
  {
    label: "Current Work",
    title: "Front-End Developer",
    subtitle: "CMT — building and shipping production React interfaces.",
    period: "Oct 2025 — Present",
    accent: "#4D6FFF",
  },
  {
    label: "Education",
    title: "Bachelor of Business Information Systems",
    subtitle: "Georgia State University at Cairo University.",
    period: "2020 — 2024",
    accent: "#9B4DFF",
  },
  {
    label: "Specialization",
    title: "React Ecosystem",
    subtitle:
      "Scalable SaaS platforms, data-heavy dashboards, and AI-integrated interfaces with Next.js & TypeScript.",
    period: "Focus Area",
    accent: "#E2A03C",
  },
];

function CareerSnapshot() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: rootRef.current,
        start: "top 82%",
        toggleActions: "play none none reverse",
      };

      // الكروت بتطلع من تحت مع إزالة البلور، واحد ورا التانى
      gsap.fromTo(
        ".career-card",
        { y: 44, autoAlpha: 0, filter: "blur(10px)" },
        {
          y: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: trigger,
        }
      );

      // الشريط الملون بيتمدّد من الشمال لليمين
      gsap.fromTo(
        ".career-bar",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          stagger: 0.13,
          ease: "power3.inOut",
          scrollTrigger: trigger,
        }
      );

      // خط العنوان العلوي
      gsap.fromTo(
        ".career-rule",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: "power3.inOut", scrollTrigger: trigger }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative mt-4 w-full overflow-hidden rounded-3xl sm:rounded-4xl border border-white/5 bg-linear-to-br from-[#221A36] to-[#1A1428] shadow-2xl p-5 sm:p-6 md:p-8"
    >
      {/* عنوان صغير + خط */}
      <div className="flex items-center gap-4">
        <span className="shrink-0 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-white/40">
          Career Snapshot
        </span>
        <div className="career-rule h-px flex-1 origin-left bg-linear-to-r from-white/15 to-transparent" />
      </div>

      {/* الكروت */}
      <div className="mt-5 sm:mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {CAREER_ITEMS.map((item, i) => (
          <div key={item.label} className="career-card will-change-transform">
            <article
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#120F1D]/70 p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/15"
              style={{ ["--accent" as string]: item.accent }}
            >
              {/* توهّج بيظهر عند الهوفر */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(120% 70% at 50% 0%, ${item.accent}1F, transparent 72%)`,
                }}
                aria-hidden="true"
              />

              {/* الشريط الملون فوق */}
              <div
                className="career-bar absolute left-0 top-0 h-[2px] w-full origin-left"
                style={{
                  backgroundColor: item.accent,
                  boxShadow: `0 0 14px ${item.accent}AA`,
                }}
                aria-hidden="true"
              />

              <div className="relative flex h-full flex-col">
                {/* الرقم + المدة */}
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="font-mono text-[11px] font-bold tracking-[0.2em] transition-opacity duration-500 opacity-70 group-hover:opacity-100"
                    style={{ color: item.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">
                    {item.period}
                  </span>
                </div>

                {/* الليبل */}
                <p className="mt-6 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-white/40">
                  {item.label}
                </p>

                {/* العنوان */}
                <h4 className="mt-2 text-lg sm:text-xl font-bold leading-snug text-white">
                  {item.title}
                </h4>

                {/* الوصف */}
                <p className="mt-2.5 text-[13px] sm:text-sm leading-relaxed text-white/45">
                  {item.subtitle}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =============================================
   ABOUT SECTION
============================================= */

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const iconsAreaRef = useRef<HTMLDivElement>(null);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isHoveringReload, setIsHoveringReload] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ===== النص: ظهور كلمة كلمة مع الاسكرول =====
      if (textContainerRef.current) {
        gsap.to(".about-word", {
          color: "#FFFFFF",
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // ===== الأيقونات =====
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".tech-icon",
          { scale: 0, autoAlpha: 0, rotate: -60 },
          {
            scale: 1,
            autoAlpha: 1,
            rotate: 0,
            duration: 1.1,
            ease: "elastic.out(1, 0.55)",
            stagger: 0.14,
            scrollTrigger: {
              trigger: iconsAreaRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.utils.toArray<HTMLElement>(".tech-float").forEach((el, i) => {
          const cfg = TECH_ICONS[i];
          if (!cfg) return;
          gsap.to(el, {
            y: cfg.floatY,
            rotate: cfg.floatRot,
            duration: cfg.floatDur,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            scrollTrigger: {
              trigger: iconsAreaRef.current,
              start: "top 100%",
              end: "bottom 0%",
              toggleActions: "play pause resume pause",
            },
          });
        });
      });

      // ===== parallax مع الماوس — ديسكتوب بس =====
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const area = iconsAreaRef.current;
        if (!area) return;

        const movers = parallaxRefs.current.map((el, i) =>
          el
            ? {
              x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
              y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
              depth: TECH_ICONS[i].depth,
            }
            : null
        );

        const onMove = (e: MouseEvent) => {
          const r = area.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          movers.forEach((m) => {
            if (!m) return;
            m.x(nx * m.depth);
            m.y(ny * m.depth);
          });
        };

        const onLeave = () => {
          movers.forEach((m) => {
            if (!m) return;
            m.x(0);
            m.y(0);
          });
        };

        area.addEventListener("mousemove", onMove);
        area.addEventListener("mouseleave", onLeave);

        return () => {
          area.removeEventListener("mousemove", onMove);
          area.removeEventListener("mouseleave", onLeave);
        };
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleIconEnter = (i: number) => {
    const el = parallaxRefs.current[i];
    if (!el) return;
    gsap.to(el, { scale: 1.18, duration: 0.35, ease: "back.out(2.5)" });
  };

  const handleIconLeave = (i: number) => {
    const el = parallaxRefs.current[i];
    if (!el) return;
    gsap.to(el, { scale: 1, duration: 0.45, ease: "power2.out" });
  };

  const handleReloadMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleReload = () => {
    if (textContainerRef.current) {
      gsap.fromTo(
        ".about-word",
        { color: "#443959", filter: "blur(4px)" },
        {
          color: "#FFFFFF",
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
    }
  };

  const text = `Front-End Developer (React & Next.js) building scalable, high-performance SaaS platforms, dashboards, and AI-integrated web applications — from clean architecture to enterprise-grade delivery.`;
  const words = text.split(" ");

  return (
    <section
      id="about"
      className="relative w-full bg-[#171323] overflow-x-clip py-16 sm:py-20 lg:min-h-screen flex flex-col items-center justify-center"
    >
      {/* Background Section Title */}
      <div className="absolute top-[4%] sm:top-[8%] lg:top-[10%] left-0 w-full z-0 pointer-events-none">
        <SectionTitle line1="ABOUT ME" fontSizeClamp="clamp(2rem, 10vw, 5.5rem)" />
      </div>

      <div className="px-4 md:px-8 relative z-10 w-full max-w-7xl mt-12 sm:mt-16 lg:mt-24">
        {/* Main Card */}
        <div
          ref={containerRef}
          className="relative w-full rounded-3xl sm:rounded-4xl border border-white/5 bg-linear-to-br from-[#221A36] to-[#1A1428] shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col"
        >
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left: Browser Window Mockup */}
            <div className="w-full lg:w-[55%] rounded-2xl sm:rounded-[28px] border border-white/10 bg-[#161124] shadow-2xl flex flex-col overflow-hidden">
              {/* Window Top Bar */}
              <div className="flex items-center w-full gap-2 sm:gap-4 px-3 sm:px-5 py-2.5 sm:py-3.5 border-b border-white/8 bg-[#1d162f]/60">
                <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#FF5F56]" />
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#FFBD2E]" />
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#27C93F]" />
                </div>

                {/* Address Bar — min-w-0 هو اللي بيخلي truncate تشتغل */}
                <div className="flex min-w-0 flex-1 relative items-center h-7 sm:h-9 rounded-full bg-[#2C233E] border border-white/5 pl-2 pr-8 sm:pl-4 sm:pr-9">
                  <span className="block min-w-0 flex-1 truncate text-center text-[10px] sm:text-xs text-white/50 font-medium tracking-wide">
                    Www.Abdelrahmandev.com
                  </span>

                  <button
                    type="button"
                    onClick={handleReload}
                    className="group absolute right-1.5 sm:right-2 flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    onMouseEnter={() => setIsHoveringReload(true)}
                    onMouseLeave={() => setIsHoveringReload(false)}
                    onMouseMove={handleReloadMove}
                    aria-label="Reload"
                  >
                    <svg
                      className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white/50 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg] group-hover:text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Window Content */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-center">
                <h3
                  ref={textContainerRef}
                  className="relative z-10 text-[15px] sm:text-base md:text-lg font-medium leading-[1.7] sm:leading-[1.6]"
                >
                  {words.map((word, i) => (
                    <span
                      key={i}
                      className="about-word inline-block mr-[0.25em] will-change-[color,filter]"
                      style={{ color: "#443959", filter: "blur(4px)" }}
                    >
                      {word}
                    </span>
                  ))}
                </h3>
              </div>
            </div>

            {/* Right: Image + Icons + Button */}
            <div
              ref={iconsAreaRef}
              className="w-full lg:w-[45%] relative flex items-end justify-center -mt-2 sm:-mt-6 lg:mt-0"
            >
              {/* Floating Tech Icons */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                {TECH_ICONS.map((icon, i) => (
                  <div
                    key={icon.name}
                    ref={(el) => {
                      parallaxRefs.current[i] = el;
                    }}
                    className={`absolute ${icon.posMobile} ${icon.posDesktop} pointer-events-auto will-change-transform`}
                  >
                    <div className="tech-icon will-change-transform">
                      <div
                        className="tech-float flex h-11 w-11 sm:h-14 sm:w-14 lg:h-[72px] lg:w-[72px] items-center justify-center rounded-[16px] lg:rounded-[22px] border border-white/15 cursor-pointer will-change-transform"
                        style={{
                          background: icon.bg,
                          boxShadow: `0 12px 32px ${icon.glow}, inset 0 1px 0 rgba(255,255,255,0.25)`,
                        }}
                        onMouseEnter={() => handleIconEnter(i)}
                        onMouseLeave={() => handleIconLeave(i)}
                        title={icon.name}
                      >
                        <div className="h-1/2 w-1/2 text-white">{icon.node}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Profile Image */}
              <Image
                src={aboutMeImage}
                alt="Abdelrahman Mostafa — React Front-End Developer"
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 440px"
                className="relative z-10 w-auto object-contain object-bottom grayscale brightness-110 drop-shadow-2xl h-[clamp(240px,64vw,340px)] sm:h-[400px] lg:absolute lg:-bottom-7 lg:right-0 lg:h-[440px] xl:h-[380px]"
              />

              {/* Download CV Button */}
              <a
                href="/Abdelrahman_Mostafa_CV.pdf"
                download="Abdelrahman_Mostafa_CV.pdf"
                aria-label="Download Abdelrahman Mostafa's Curriculum Vitae (CV)"
                className="absolute left-1/2 -translate-x-1/2 bottom-[8%] sm:bottom-12 lg:left-auto lg:right-0 lg:translate-x-0 lg:bottom-8 z-30 group flex items-center gap-2 rounded-full bg-[#1E35FF] px-5 py-2.5 sm:px-6 sm:py-3 font-semibold text-[13px] sm:text-sm text-white whitespace-nowrap transition-all hover:bg-[#1b30e6] hover:scale-105 shadow-[0_0_20px_rgba(30,53,255,0.3)]"
              >
                <span>Download CV</span>
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ===== كروت المسار المهني ===== */}
        <CareerSnapshot />
      </div>

      {/* Reload Tooltip — ديسكتوب بس */}
      {isHoveringReload && (
        <div
          className="fixed hidden lg:flex pointer-events-none z-[1000000] items-center justify-center rounded-full bg-white px-2 py-0.5 shadow-lg"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y + 15,
            transform: "translateX(-50%)",
          }}
        >
          <span className="text-[10px] font-bold text-black uppercase tracking-wider">
            Reload
          </span>
        </div>
      )}
    </section>
  );
}