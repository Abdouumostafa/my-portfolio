"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";
import Image from "next/image";
import EyesLogo from "./EyesLogo";
import SocialIcons from "./SocialIcons";
import heroBottomImg from "../assets/hero/heroBottom.png";
import heroBottomMobileImg from "../assets/hero/heroBottomMobile.png";

const NAV_LINKS = [
  { id: "home", label: "Home", href: "#hero" },
  { id: "about", label: "About Me", href: "#about" },
  { id: "work", label: "Work Experience", href: "#work" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "skills", label: "Skills & Tech", href: "#skills" },
  { id: "contact", label: "Contact Me", href: "#contact" },
];

const STACK = ["React", "Next.js", "TypeScript", "Tailwind", "GSAP"];

const TAGLINE =
  "Hello, I'm Abdelrahman — a React front-end developer with 3+ years building web apps, dashboards, and SaaS platforms.";

/* ────────────────────────────────────────────────────────────────
   DESKTOP  — split: type left, figure right.
   MOBILE   — type only; the portrait is dropped.

   Tagline motion: each word rises from below, out of focus, and
   settles. Staggered tightly it reads as a line being written in
   real time — smoother than a hard character wipe, and one uniform
   colour so nothing in the sentence competes for attention.
   ──────────────────────────────────────────────────────────────── */

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Name fills its column, but never exceeds this fraction of viewport height. */
const HEIGHT_CAP = 0.155;

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* Chrome lettering. Inline style on purpose: `bg-clip-text` +
   `text-transparent` renders BLACK letters if the gradient utility ever
   misses the build. Inline styles can't be purged. */
const chrome: CSSProperties = {
  backgroundImage:
    "linear-gradient(to bottom, #FFFFFF 0%, #F4F6FA 42%, #C6CCD8 80%, #949DAF 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
  paddingBottom: "0.28em",
};

const LABEL =
  "text-[0.58rem] uppercase tracking-[0.22em] text-white/55 sm:text-[0.66rem] sm:tracking-[0.3em]";

/**
 * Fallback font-size applied via CSS *before* JS ever runs, so the very
 * first paint (including on a hard reload, before hydration/effects fire)
 * is already close to the final size instead of the browser default
 * (~16px), which is what caused the "tiny then suddenly huge" flash.
 * Tuned to roughly track the real fit-to-column calculation across
 * common viewport widths.
 */
const NAME_FALLBACK_SIZE = "clamp(3.2rem, 13vw, 11rem)";

/** Sets the name's font-size so it fills its column, height-capped. */
function useFitToColumn() {
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const fit = useCallback(() => {
    const box = boxRef.current;
    const el = textRef.current;
    if (!box || !el) return;

    const available = box.clientWidth;
    if (!available) return;

    const PROBE = 100; // measure at 100px, then scale linearly
    el.style.fontSize = `${PROBE}px`;
    const measured = el.getBoundingClientRect().width;
    if (!measured) return;

    const byWidth = (PROBE * available) / measured;
    const byHeight = window.innerHeight * HEIGHT_CAP;

    el.style.fontSize = `${Math.min(byWidth, byHeight)}px`;
  }, []);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    let frame: number | null = null;
    const schedule = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };

    schedule();
    // BBH Bartle loads async — the first pass measures the fallback face.
    document.fonts?.ready.then(schedule);

    const ro = new ResizeObserver(schedule);
    ro.observe(box);
    window.addEventListener("orientationchange", schedule);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("orientationchange", schedule);
    };
  }, [fit]);

  return { boxRef, textRef };
}

/* ── Scroll Down Hover Component ── */
const ScrollDownLink = () => {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const text = "Scroll Down";

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(".char-hover", { yPercent: 100 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.inOut", duration: 0.4 },
      });

      tl.to(".char-base", { yPercent: -100, stagger: 0.015 }, 0);
      tl.to(".char-hover", { yPercent: 0, stagger: 0.015 }, 0);
      tl.to(".scroll-arrow", { rotation: 360, duration: 0.5, ease: "back.out(1.5)" }, 0);

      tlRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <a
      ref={containerRef}
      href="#about"
      className="hidden sm:flex items-center gap-2 text-white font-medium rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
      style={{ fontSize: "clamp(0.85rem,1.05vw,1.3rem)" }}
      onMouseEnter={() => tlRef.current?.play()}
      onMouseLeave={() => tlRef.current?.reverse()}
      onFocus={() => tlRef.current?.play()}
      onBlur={() => tlRef.current?.reverse()}
    >
      <span className="flex relative overflow-hidden" style={{ height: "1.2em" }}>
        <span className="flex items-center">
          {text.split("").map((c, i) => (
            <span
              key={`base-${i}`}
              className="char-base inline-block will-change-transform leading-none whitespace-pre"
            >
              {c}
            </span>
          ))}
        </span>
        <span className="absolute inset-0 flex items-center" aria-hidden="true">
          {text.split("").map((c, i) => (
            <span
              key={`hover-${i}`}
              className="char-hover inline-block will-change-transform leading-none whitespace-pre text-blue-300"
            >
              {c}
            </span>
          ))}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="scroll-arrow inline-block will-change-transform origin-center leading-none text-blue-300"
      >
        ↓
      </span>
    </a>
  );
};

const HeroSection = forwardRef<HTMLElement>(function HeroSection(_, ref) {
  const { boxRef, textRef } = useFitToColumn();
  const stageRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      /* Caret marks the writing head, then retires. */
      const blink = gsap.to(".tag-caret", {
        opacity: 0.15,
        duration: 0.45,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.set(".hero-reveal", { clipPath: "inset(100% 0% 0% 0%)" })
        .set(".hero-reveal-inner", { scale: 1.12 })
        .set(".hero-line", { yPercent: 118 })
        .set(".hero-vrule", { scaleY: 0, transformOrigin: "top center" })
        .set(".hero-hrule", { scaleX: 0, transformOrigin: "left center" })
        .set(".hero-fade", { opacity: 0, y: 18 })
        .set(".tag-word", { opacity: 0, yPercent: 46 })
        .set(".tag-caret", { opacity: 1 });

      tl.to(
        ".hero-reveal",
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.35, ease: "power4.inOut" },
        0
      )
        .to(".hero-reveal-inner", { scale: 1, duration: 1.6, ease: "power3.out" }, 0)
        .to(".hero-vrule", { scaleY: 1, duration: 1.1, ease: "power4.inOut" }, 0.15)
        .to(".hero-hrule", { scaleX: 1, duration: 0.9, ease: "power4.inOut" }, 0.3)
        .to(".hero-eyebrow", { opacity: 1, duration: 0.6 }, 0.35)
        .to(".hero-line", { yPercent: 0, duration: 1.1, stagger: 0.1 }, 0.4)
        /* The sentence settles into place, word by word */
        .to(
          ".tag-word",
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.8,
            stagger: 0.048,
            ease: "power3.out",
            clearProps: "willChange",
          },
          0.95
        )
        .to(
          ".tag-caret",
          { opacity: 0, duration: 0.4, onStart: () => blink.kill() },
          ">-0.15"
        )
        .to(".hero-fade", { opacity: 1, y: 0, duration: 0.8, stagger: 0.09 }, 1.35);
    }, stage);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-[100dvh] min-h-[620px] w-full overflow-hidden bg-[#000000]
                 text-white select-none rounded-b-[2.5rem] md:rounded-b-[3rem]"
    >
      {/* ── Ground ── */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/backgroundMask.svg"
          alt=""
          className="absolute inset-0 h-full w-full scale-[1.06] object-cover opacity-[0.6]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_18%_28%,rgba(120,138,255,0.13),transparent_70%)] lg:bg-[radial-gradient(ellipse_26%_50%_at_74%_52%,rgba(120,138,255,0.16),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_92%_78%_at_50%_46%,transparent_46%,rgba(0,0,0,0.6)_100%)]" />
        <div
          className="hidden sm:block absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: GRAIN, backgroundSize: "180px 180px" }}
        />
      </div>

      {/* ── Bottom glow — behind the copy so it can't wash it out ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-5 flex justify-center mix-blend-screen"
      >
        {/* Mobile LCP image first so browser discovers it earliest */}
        <Image
          src={heroBottomMobileImg}
          alt="Hero Bottom Glow Mobile"
          className="block h-auto w-full object-cover sm:hidden"
          priority
          fetchPriority="high"
          sizes="100vw"
        />
        <Image
          src={heroBottomImg}
          alt="Hero Bottom Glow Desktop"
          className="hidden h-auto w-full max-w-[1920px] object-cover sm:block"
          priority
          sizes="(max-width: 1920px) 100vw, 1920px"
        />
      </div>

      {/* ── Top bar — unchanged ── */}
      <div className="pointer-events-none absolute top-0 z-30 flex w-full items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8">
        <div className="w-40" />
        {/* No wrapper transform — GSAP owns this during the navbar swoop. */}
        <div data-hero-eyes className="pointer-events-auto hidden items-center md:flex">
          <EyesLogo size="md" className="mt-1" />
        </div>
        <div data-hero-socials className="pointer-events-auto hidden items-center sm:flex">
          <SocialIcons
            className="flex items-center gap-5 text-white/80"
            iconClassName="h-5 w-5"
          />
        </div>
      </div>

      {/* ── Split (single column on mobile — no figure there) ── */}
      <div
        ref={stageRef}
        className="relative z-10 mx-auto grid h-full w-full max-w-[1640px] grid-cols-1
                   lg:grid-cols-[minmax(0,1fr)_minmax(0,0.68fr)]"
      >
        {/* ── FIGURE PANEL — Background on mobile, right column on desktop ── */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen overflow-hidden
                        lg:relative lg:order-2 lg:block lg:h-full lg:opacity-100 lg:mix-blend-normal">


          {/* Floor light — a gradient, not a blur filter: same look, far cheaper */}
          <div
            aria-hidden="true"
            className="absolute inset-x-[6%] bottom-[10%] h-[24%]
                       bg-[radial-gradient(ellipse_52%_100%_at_50%_100%,rgba(24,54,255,0.26),transparent_72%)]"
          />

          {/* The figure is boxed rather than bleeding the full column —
              at full height it dominated the frame. */}
          <div className="hero-reveal absolute inset-x-[7%] bottom-[13%] top-[27%] will-change-[clip-path]">
            <div className="hero-reveal-inner absolute inset-0 origin-bottom will-change-transform">
              <Image
                src="/myImage.png"
                alt="Abdelrahman Mostafa — React Front-End Developer"
                fill
                priority
                sizes="(max-width: 1023px) 1px, 30vw"
                className="object-contain object-bottom grayscale contrast-[1.1]"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, #000 0%, #000 88%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, #000 0%, #000 88%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* ── TYPE PANEL ── */}
        <div
          className="order-1 flex min-h-0 flex-col justify-center px-6 pb-[20vh] pt-[16vh]
                     sm:px-10 lg:pb-[16vh] lg:pl-14 lg:pr-12 lg:pt-[12vh]"
        >
          <div ref={boxRef} className="flex w-full flex-col items-start">
            {/* Eyebrow */}
            <div className="hero-eyebrow flex w-full items-center gap-3 opacity-0 sm:gap-4">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#1836FF]"
              />
              <span className={`${LABEL} whitespace-nowrap`}>
                React Front-End Developer
              </span>
              <span aria-hidden="true" className="hidden h-px w-8 bg-white/20 sm:block" />
              <span className={`${LABEL} hidden whitespace-nowrap sm:inline`}>
                Cairo, EG
              </span>
            </div>

            {/* Name */}
            <div className="mt-6 w-full sm:mt-7 lg:mt-8">
              <h1 className="sr-only">
                Abdelrahman Mostafa — React Front-End Developer
              </h1>

              <div data-hero-name className="w-full">
                <div
                  ref={textRef}
                  aria-hidden="true"
                  className="flex w-max flex-col items-start"
                  style={{
                    // Fallback size shows immediately on first paint (SSR/hard
                    // reload) instead of the browser default (~16px), so the
                    // very first fit() measurement pass is already close to
                    // correct. The actual hide/reveal now happens one level
                    // up on the whole `stageRef` grid (see above), so the
                    // whole hero content appears together in one clean reveal
                    // instead of piece by piece.
                    fontSize: NAME_FALLBACK_SIZE,
                  }}
                >
                  <span className="inline-block overflow-hidden pb-[0.03em]">
                    <span
                      className="hero-line inline-block whitespace-nowrap font-bartle uppercase leading-[0.84] tracking-[-0.025em] will-change-transform"
                      style={chrome}
                    >
                      Abdelrahman
                    </span>
                  </span>

                  <span className="-mt-[0.2em] inline-block overflow-hidden pb-[0.05em]">
                    <span
                      className="hero-line inline-block whitespace-nowrap font-bartle uppercase leading-[0.84] tracking-[-0.03em] will-change-transform"
                      style={chrome}
                    >
                      Mostafa
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Rule */}
            <span
              aria-hidden="true"
              className="hero-hrule my-4 lg:my-8 block h-px w-full max-w-136 bg-linear-to-r from-white/25 to-transparent lg:mt-9"
            />

            {/* Tagline — one colour, words settling in */}
            <p
              className="max-w-136 font-medium leading-[1.75] text-white/80"
              style={{ fontSize: "clamp(0.85rem,1.5vw,1.2rem)" }}
            >
              {TAGLINE.split(" ").map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className="tag-word mr-[0.3em] inline-block will-change-transform"
                >
                  {word}
                </span>
              ))}
            </p>

            {/* Stack */}
            <ul className="hero-fade mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 sm:mt-9 sm:gap-x-6">
              {STACK.map((item, i) => (
                <li key={item} className="flex items-center gap-5 sm:gap-6">
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="-ml-5 h-1 w-1 rounded-full bg-white/25 sm:-ml-6"
                    />
                  )}
                  <span className={LABEL}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom status bar — unchanged ── */}
      <div className="absolute inset-x-0 bottom-[6%] z-20 flex items-center justify-between px-6 sm:px-10 md:bottom-[10%] lg:px-14">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="relative flex size-3 sm:size-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
            <span className="relative inline-flex size-3 rounded-full bg-[#22c55e] shadow-[0_0_16px_rgba(34,197,94,0.8)] sm:size-4" />
          </span>
          <span
            className="font-medium text-white"
            style={{ fontSize: "clamp(0.85rem,1.05vw,1.3rem)" }}
          >
            Available for freelance work
          </span>
        </div>

        <ScrollDownLink />
      </div>
    </section>
  );
});

export default HeroSection;
export { NAV_LINKS };