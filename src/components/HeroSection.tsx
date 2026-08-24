"use client";

import { forwardRef } from "react";
import EyesLogo from "./EyesLogo";
import SocialIcons from "./SocialIcons";

const NAV_LINKS = [
  { id: "home", label: "Home", href: "#hero" },
  { id: "about", label: "About Me", href: "#about" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "work", label: "Work Experience", href: "#work" },
  { id: "skills", label: "Skills & Tech", href: "#skills" },
];

interface HeroSectionProps {
  mouseOffset?: { x: number; y: number; };
}

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
  function HeroSection(_, ref) {
    return (
      <section
        ref={ref}
        id="hero"
        className="relative h-screen w-full bg-background text-white overflow-hidden select-none"
      >
        {/* ── Top bar ── */}
        <div className="absolute top-0 w-full z-20 flex items-start justify-between px-6 sm:px-10 pt-6 sm:pt-8 pointer-events-none">
          {/* Left spacer — fixed nav links are rendered by HeroNavTransition */}
          <div className="w-40" />

          {/* Center: Eyes logo tracking mouse */}
          <div data-hero-eyes className="hidden md:flex items-center pointer-events-auto">
            <EyesLogo size="md" className="mt-1" />
          </div>

          <div data-hero-socials className="hidden sm:flex items-center pointer-events-auto">
            <SocialIcons className="flex items-center gap-4 text-white/70" iconClassName="w-5 h-5" />
          </div>
        </div>
        <div className="h-full w-full bg-grey-darker flex items-center justify-center">
          <h2 className="font-bartle text-4xl sm:text-6xl text-white/20 uppercase">Hero Section</h2>
        </div>
      </section>
    );
  }
);

export default HeroSection;
export { NAV_LINKS };
