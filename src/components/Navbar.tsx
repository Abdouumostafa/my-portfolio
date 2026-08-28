"use client";

import { forwardRef, useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NAV_LINKS } from "./HeroSection";
import EyesLogo from "./EyesLogo";
import SocialIcons from "./SocialIcons";
import { useActiveSection } from "@/hooks/useActiveSection";

const Navbar = forwardRef<HTMLElement>(function Navbar(props, ref) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAnimating = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const bar1Ref = useRef<HTMLSpanElement>(null);
  const bar2Ref = useRef<HTMLSpanElement>(null);
  const bar3Ref = useRef<HTMLSpanElement>(null);

  const activeSection = useActiveSection(NAV_LINKS.map((l) => l.id));
  const { contextSafe } = useGSAP();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) closeMenu();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]); // eslint-disable-line

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Hamburger → X morph
  const morphToX = contextSafe(() => {
    gsap.to(bar1Ref.current, { rotation: 45, y: 7, width: 24, duration: 0.35, ease: "expo.out" });
    gsap.to(bar2Ref.current, { opacity: 0, x: -8, duration: 0.2, ease: "power2.in" });
    gsap.to(bar3Ref.current, { rotation: -45, y: -7, width: 24, duration: 0.35, ease: "expo.out" });
  });

  const morphToHamburger = contextSafe(() => {
    gsap.to(bar1Ref.current, { rotation: 0, y: 0, width: 24, duration: 0.35, ease: "expo.out" });
    gsap.to(bar2Ref.current, { opacity: 1, x: 0, width: 16, duration: 0.35, ease: "expo.out" });
    gsap.to(bar3Ref.current, { rotation: 0, y: 0, width: 20, duration: 0.35, ease: "expo.out" });
  });

  const openMenu = contextSafe(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsMobileMenuOpen(true);
    morphToX();

    const tl = gsap.timeline({ onComplete: () => { isAnimating.current = false; } });

    gsap.set(overlayRef.current, { display: "block", opacity: 0 });
    gsap.set(panelRef.current, { display: "flex", x: "-100%" });
    gsap.set(".mn-item", { y: 32, opacity: 0 });
    gsap.set(".mn-meta", { opacity: 0, y: 10 });
    gsap.set(".mn-close-label", { opacity: 0, x: -6 });
    gsap.set(".mn-close-circle", { opacity: 0, scale: 0.6, rotation: -90 });
    gsap.set(".mn-line", { scaleX: 0 });
    gsap.set(".mn-social-icon", { opacity: 0, y: 8 });

    // Overlay
    tl.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" });

    // Panel swoops in with slight overshoot
    tl.to(panelRef.current, { x: "0%", duration: 0.7, ease: "expo.out" }, "<0.05");

    // Top bar label
    tl.to(".mn-meta", { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, "<0.25");

    // Close label + circle stagger in
    tl.to(".mn-close-label", { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, "<0.05");
    tl.to(".mn-close-circle", { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: "back.out(2.5)" }, "<0.05");

    // Divider draws
    tl.to(".mn-line", { scaleX: 1, transformOrigin: "left", duration: 0.5, stagger: 0.04, ease: "expo.out" }, "<0.1");

    // Links burst up, each from overflow-hidden container
    tl.to(".mn-item", {
      y: 0, opacity: 1,
      duration: 0.65, stagger: 0.065,
      ease: "expo.out",
    }, "<0.05");

    // Social icons stagger in individually
    tl.to(".mn-social-icon", {
      opacity: 1, y: 0,
      duration: 0.4, stagger: 0.07, ease: "power3.out",
    }, "<0.2");
  });

  const closeMenu = contextSafe((force = false) => {
    if (isAnimating.current && !force) return;
    if (force) gsap.killTweensOf([overlayRef.current, panelRef.current, ".mn-item", ".mn-close-label", ".mn-close-circle", ".mn-meta", ".mn-social-icon"]);
    isAnimating.current = true;
    morphToHamburger();

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set([overlayRef.current, panelRef.current], { display: "none" });
        setIsMobileMenuOpen(false);
        isAnimating.current = false;
      },
    });

    // Content rushes out (compressed timing for snappy feel)
    tl.to([".mn-social-icon", ".mn-item"], {
      y: -20, opacity: 0,
      duration: 0.28, stagger: { each: 0.03, from: "end" }, ease: "power3.in",
    });
    tl.to([".mn-close-circle", ".mn-close-label", ".mn-meta"], {
      opacity: 0, duration: 0.2, ease: "power2.in",
    }, "<");

    // Panel slides out
    tl.to(panelRef.current, { x: "-100%", duration: 0.55, ease: "expo.inOut" }, "<0.05");

    // Overlay fades
    tl.to(overlayRef.current, { opacity: 0, duration: 0.35, ease: "power2.in" }, "<0.1");
  });

  // Magnetic hover effect for desktop links (applied via vanilla event)
  const handleLinkMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    gsap.to(el.querySelector(".link-text"), { x, y, duration: 0.4, ease: "power2.out" });
  };
  const handleLinkMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget.querySelector(".link-text"), { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.5)" });
  };

  return (
    <>
      <nav
        ref={ref}
        className="fixed top-0 left-0 right-0 z-9999 h-16"
        style={{ pointerEvents: "none" }}
        data-navbar
      >
        <div className="navbar-bg absolute inset-0 navbar-backdrop opacity-0" />
        <div className="navbar-content absolute inset-0 flex items-center justify-between px-6 sm:px-10 opacity-0">

          {/* Left: Hamburger / Eyes */}
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden flex flex-col items-start gap-1.25 p-1 pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                if (isMobileMenuOpen) {
                  closeMenu();
                } else {
                  openMenu();
                }
              }}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span ref={bar1Ref} className="block h-[1.5px] bg-white origin-center" style={{ width: 24 }} />
              <span ref={bar2Ref} className="block h-[1.5px] bg-white" style={{ width: 16 }} />
              <span ref={bar3Ref} className="block h-[1.5px] bg-white" style={{ width: 20 }} />
            </button>
            {/* Landing slot — eyes fly in from hero on scroll */}
            <div data-nav-eyes style={{ opacity: 0 }} className="hidden md:flex items-center">
              <EyesLogo size="sm" />
            </div>
          </div>

          {/* Desktop nav slots */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <span key={link.id} data-nav-slot={link.id}
                className="hero-nav-link text-sm opacity-0 select-none pointer-events-none"
                aria-hidden="true"
                data-active={activeSection === link.id ? "true" : undefined}
              >{link.label}</span>
            ))}
          </div>

          {/* Right: Socials — landing slot fades in after hero Socials fly here */}
          <div data-nav-socials style={{ opacity: 0 }} className="flex items-center justify-end pointer-events-auto">
            <SocialIcons className="flex items-center gap-4 text-white" iconClassName="size-[1.15rem] sm:size-6" />
          </div>
        </div>
      </nav>

      {/* Blurred overlay */}
      <div
        ref={overlayRef}
        className="md:hidden fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
        style={{ display: "none" }}
        onClick={() => closeMenu()}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="md:hidden fixed top-0 left-0 bottom-0 z-[10000] w-fit min-w-[260px] max-w-[82vw] flex-col bg-[#050505] border-r border-white/[0.05] shadow-[24px_0_80px_rgba(0,0,0,0.9)]"
        style={{ display: "none" }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-7 pt-6 pb-5">
          <span className="mn-meta text-[8px] tracking-[0.4em] uppercase text-white/20 font-medium">
            Navigation
          </span>
          <button
            type="button"
            onClick={() => closeMenu()}
            aria-label="Close menu"
            className="flex items-center gap-2.5"
          >
            <span className="mn-close-label text-[8px] tracking-[0.3em] uppercase text-white/30 hover:text-white/60 transition-colors">
              Close
            </span>
            <span className="mn-close-circle w-7 h-7 flex items-center justify-center rounded-full border border-white/10 hover:border-white/30 transition-colors">
              <svg className="w-3 h-3 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </button>
        </div>

        {/* Top divider */}
        <div className="mn-line mx-7 h-px bg-white/[0.06]" style={{ transform: 'scaleX(0)' }} />

        {/* Links */}
        <nav className="flex-1 flex flex-col justify-center px-7 py-2">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <div key={link.id}>
                <a
                  href={link.href}
                  onClick={() => closeMenu(true)}
                  onMouseMove={handleLinkMouseMove}
                  onMouseLeave={handleLinkMouseLeave}
                  className="mn-item group relative flex items-center justify-between py-[14px] gap-6 overflow-hidden"
                >
                  {/* Hover fill bar */}
                  <span
                    className="absolute inset-0 bg-white/[0.03] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                    aria-hidden="true"
                  />
                  <span className={`link-text relative text-[1.55rem] leading-none font-light tracking-tight transition-colors duration-300 ${isActive ? "text-white" : "text-white/30 group-hover:text-white/90"
                    }`}>
                    {link.label}
                    {isActive && (
                      <span className="inline-block ml-2.5 w-4 h-px bg-white/60 align-middle" />
                    )}
                  </span>
                  <span className={`relative text-sm transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isActive ? "text-white/40" : "text-white/10 group-hover:text-white/40"
                    }`}>↗</span>
                </a>
                <div className="mn-line h-px bg-white/[0.05]" style={{ transform: 'scaleX(0)' }} />
              </div>
            );
          })}
        </nav>

        {/* Bottom socials */}
        <div className="px-7 pb-8 pt-5 border-t border-white/[0.05]">
          <p className="mn-meta text-[8px] tracking-[0.35em] uppercase text-white/15 mb-4">Connect</p>
          <div className="flex items-center gap-5">
            {/* We render social icons individually for stagger */}
            <SocialIcons
              className="flex items-center gap-5 text-white/30"
              iconClassName="mn-social-icon size-[18px] hover:text-white transition-colors duration-300"
            />
          </div>
        </div>
      </div>
    </>
  );
});

export default Navbar;