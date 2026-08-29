"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { useActiveSection } from "@/hooks/useActiveSection";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import { NAV_LINKS } from "./HeroSection";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin);

export default function HeroNavTransition({
  children,
}: {
  children?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const fixedLinksRef = useRef<HTMLDivElement>(null);
  const activeSection = useActiveSection(NAV_LINKS.map(l => l.id));

  // We use native CSS smooth scrolling in globals.css instead of intercepting clicks
  // This guarantees reliable anchor linking across all devices.

  useGSAP(
    () => {
      const hero = heroRef.current;
      const navbar = navbarRef.current;
      const fixedLinks = fixedLinksRef.current;
      if (!hero || !navbar || !fixedLinks) return;

      const mm = gsap.matchMedia();

      // ── Desktop: fixed links + Eyes + Socials → navbar smooth arc animation ──
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isReduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, isReduced } = context.conditions!;

          if (!isDesktop) return;

          // Hide navbar slots initially so only the floating animated links are seen
          const navSlots = Array.from(
            navbar.querySelectorAll("[data-nav-slot]")
          ) as HTMLElement[];
          navSlots.forEach((slot) => {
            gsap.set(slot, { opacity: 0 });
          });

          // ── Nav link deltas ──
          const linkEls: HTMLElement[] = [];
          const deltas: { x: number; y: number; }[] = [];

          NAV_LINKS.forEach((link) => {
            const linkEl = fixedLinks.querySelector(
              `[data-nav-link="${link.id}"]`
            ) as HTMLElement | null;
            const navSlot = navbar.querySelector(
              `[data-nav-slot="${link.id}"]`
            ) as HTMLElement | null;

            if (linkEl && navSlot) {
              linkEls.push(linkEl);
              const linkRect = linkEl.getBoundingClientRect();
              const slotRect = navSlot.getBoundingClientRect();
              deltas.push({
                x: slotRect.left - linkRect.left,
                y: slotRect.top - linkRect.top,
              });
            }
          });

          // ── Eyes element ──
          const heroEyes = hero.querySelector("[data-hero-eyes]") as HTMLElement | null;
          const navEyes = navbar.querySelector("[data-nav-eyes]") as HTMLElement | null;

          // ── Socials elements (per-icon) ──
          const navSocials = navbar.querySelector("[data-nav-socials]") as HTMLElement | null;

          const SOCIALS = ["github", "linkedin", "facebook", "whatsapp"] as const;
          type SocialKey = typeof SOCIALS[number];

          const heroSocialIcons: Partial<Record<SocialKey, HTMLElement>> = {};
          const navSocialIcons: Partial<Record<SocialKey, HTMLElement>> = {};
          const socialDeltas: Partial<Record<SocialKey, { x: number; y: number; }>> = {};

          SOCIALS.forEach((key) => {
            const heroEl = hero.querySelector(`[data-social="${key}"]`) as HTMLElement | null;
            const navEl = navSocials?.querySelector(`[data-social="${key}"]`) as HTMLElement | null;
            if (heroEl && navEl) {
              heroSocialIcons[key] = heroEl;
              navSocialIcons[key] = navEl;
              gsap.set(navEl, { opacity: 0, scale: 0.6 });
              const hR = heroEl.getBoundingClientRect();
              const nR = navEl.getBoundingClientRect();
              socialDeltas[key] = { x: nR.left - hR.left, y: nR.top - hR.top };
            }
          });

          // Reveal container so per-icon opacity is not blocked by parent
          if (navSocials) gsap.set(navSocials, { opacity: 1 });

          // Measure eyes delta
          let eyesDelta: { x: number; y: number; } | null = null;
          if (heroEyes && navEyes) {
            const hR = heroEyes.getBoundingClientRect();
            const nR = navEyes.getBoundingClientRect();
            eyesDelta = { x: nR.left - hR.left, y: nR.top - hR.top };
          }

          const hasSocials = SOCIALS.some((k) => socialDeltas[k]);
          if (linkEls.length === 0 && !eyesDelta && !hasSocials) return;

          // ── Shared ScrollTrigger timeline ──
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: () => `top -=${hero.offsetHeight * 0.1}`,
              toggleActions: "play none none reverse",
              onEnter: () => {
                // Instantly hide the active line before flight
                fixedLinksRef.current?.classList.add("is-scrolled");
                gsap.to(".navbar-bg", { opacity: 1, duration: 0.35, ease: "power2.out" });
                gsap.to(".navbar-content", {
                  opacity: 1,
                  duration: 0.35,
                  ease: "power2.out",
                  onComplete: () => { navbar.style.pointerEvents = "auto"; },
                });
              },
              onLeaveBack: () => {
                fixedLinksRef.current?.classList.remove("is-scrolled");
                navbar.style.pointerEvents = "none";
                gsap.to(".navbar-bg", { opacity: 0, duration: 0.3, ease: "power2.in" });
                gsap.to(".navbar-content", { opacity: 0, duration: 0.3, ease: "power2.in" });
              },
            },
          });

          // ── Helper: the universal ) curve for any element ──
          // Works regardless of direction — the formula adapts to positive/negative deltas.
          // staggerIndex drives the vertical belly swell (matches navlink behaviour).
          const swoop = (
            el: HTMLElement,
            d: { x: number; y: number; },
            si: number,            // global stagger index
            startAt: number,       // timeline insert position
            onLandEl?: HTMLElement // optional element to reveal on landing
          ) => {
            const path = [
              { x: 0, y: 0 },
              { x: d.x * 0.4, y: d.y * 0.1 + (si * 12 + 25) },
              { x: d.x * 0.8, y: d.y * 0.65 + 14 },
              { x: d.x, y: d.y },
            ];

            tl.to(el, {
              motionPath: { path, curviness: 1.35, type: "soft" },
              scale: 0.875,
              transformOrigin: "center center",
              opacity: 0,
              duration: 0.65,
              ease: "power3.inOut",
            }, startAt);

            if (onLandEl) {
              tl.to(onLandEl, {
                opacity: 1,
                scale: 1,
                duration: 0.35,
                ease: "back.out(1.8)",
              }, startAt + 0.55);
            }
          };

          if (isReduced) {
            // ── Reduced motion: plain translate + fade ──
            let si = 0;
            linkEls.forEach((link, i) => {
              const d = deltas[i];
              if (!d) return;
              tl.to(link, { x: d.x, y: d.y, scale: 0.875, transformOrigin: "top left", duration: 0.45, ease: "power2.out" }, i * 0.05);
              si++;
            });
            if (heroEyes && navEyes && eyesDelta) {
              tl.to(heroEyes, { x: eyesDelta.x, y: eyesDelta.y, opacity: 0, duration: 0.4, ease: "power2.out" }, si * 0.05);
              tl.to(navEyes, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }, si * 0.05 + 0.35);
              si++;
            }
            SOCIALS.forEach((key, i) => {
              const heroEl = heroSocialIcons[key];
              const navEl = navSocialIcons[key];
              if (!heroEl || !navEl) return;
              const t = si * 0.05 + i * 0.05;
              tl.to(heroEl, { y: -20, opacity: 0, duration: 0.4, ease: "power2.out" }, t);
              tl.to(navEl, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }, t + 0.35);
            });
          } else {
            // ── Full motion: universal ) swoop for EVERYTHING ──
            // All elements share the same curve, ease, and duration.
            // Global stagger index ensures the belly swell grows naturally down the sequence.
            let si = 0;

            // 1. Nav links
            linkEls.forEach((link, i) => {
              const d = deltas[i];
              if (!d) return;
              const startAt = si * 0.08;

              const path = [
                { x: 0, y: 0 },
                { x: d.x * 0.4, y: d.y * 0.1 + (si * 12 + 25) },
                { x: d.x * 0.8, y: d.y * 0.65 + 14 },
                { x: d.x, y: d.y },
              ];
              tl.to(link, {
                motionPath: { path, curviness: 1.35, type: "soft" },
                scale: 0.875,
                transformOrigin: "top left",
                duration: 0.65,
                ease: "power3.inOut",
              }, startAt);

              si++;
            });

            // 2. Eyes — same ) curve, same params
            if (heroEyes && navEyes && eyesDelta) {
              swoop(heroEyes, eyesDelta, si, si * 0.08, navEyes);
              si++;
            }

            // 3. Social icons — simple slide and fade (no swoop flight)
            SOCIALS.forEach((key, i) => {
              const heroEl = heroSocialIcons[key];
              const navEl = navSocialIcons[key];
              if (!heroEl || !navEl) return;
              const startAt = si * 0.08 + i * 0.05;

              // Slide up and fade out
              tl.to(heroEl, { y: -20, opacity: 0, duration: 0.4, ease: "power2.out" }, startAt);
              // Fade in nav icon
              tl.to(navEl, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }, startAt + 0.2);
            });
          }

          return () => { tl.kill(); };
        }
      );

      // ── Mobile: Navbar always visible ──
      mm.add("(max-width: 767px)", () => {
        // fixedLinks is already hidden on mobile via the `hidden md:flex`
        // classes below (no JS needed for that, and no flash on reload).
        // This gsap.set is kept only as a safety net for any inline style
        // an earlier desktop match might have left behind.
        gsap.set(fixedLinks, { display: "none" });
        gsap.set(navbar, { pointerEvents: "auto" });
        gsap.set(".navbar-content", { opacity: 1 }); // Always visible on mobile
        gsap.set(".navbar-bg", { opacity: 0 }); // Background starts hidden

        // Fade in background on scroll
        ScrollTrigger.create({
          trigger: hero,
          start: () => `top -=${hero.offsetHeight * 0.2}`,
          onEnter: () => {
            gsap.to(".navbar-bg", { opacity: 1, duration: 0.35, ease: "power2.out" });
          },
          onLeaveBack: () => {
            gsap.to(".navbar-bg", { opacity: 0, duration: 0.3, ease: "power2.in" });
          },
        });

        // Ensure navbar slots (desktop links) are visible on mobile GSAP context
        const navSlots = Array.from(
          navbar.querySelectorAll("[data-nav-slot]")
        ) as HTMLElement[];
        navSlots.forEach((slot) => {
          gsap.set(slot, { opacity: 1 });
        });
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <Navbar ref={navbarRef} />

      {/*
        Fixed nav links — stay on screen while scrolling through hero, then
        swoop into navbar. `hidden md:flex` hides these on mobile purely via
        CSS from the very first paint (including hard reloads, before any
        JS/hydration runs). Previously this was `flex` unconditionally and
        relied on GSAP's `mm.add("(max-width: 767px)", ...)` to set
        `display: none` after mount — which meant the links briefly flashed
        visible on mobile on every reload before GSAP hid them.
      */}
      <div
        ref={fixedLinksRef}
        className="fixed top-6 sm:top-8 left-6 sm:left-10 z-10000 hidden md:flex flex-col gap-3 pointer-events-auto"
        aria-label="Navigation"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className="hero-nav-link"
            data-nav-link={link.id}
            data-active={activeSection === link.id ? "true" : undefined}
          >
            {activeSection === link.id ? (
              <span className="inline-flex items-center gap-2">
                {link.label}
                <span className="desktop-active-line inline-block w-6 h-0.5 bg-white" />
              </span>
            ) : (
              link.label
            )}
          </a>
        ))}
      </div>

      <HeroSection ref={heroRef} />
      {children}
    </div>
  );
}