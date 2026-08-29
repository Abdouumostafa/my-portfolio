"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionTitle from "./SectionTitle";

gsap.registerPlugin(ScrollTrigger);

/* ── Card Data ── */
const SKILLS_DATA = [
  {
    id: "core",
    title: "Core Technologies",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "REST APIs"],
  },
  {
    id: "frameworks",
    title: "Frameworks & Libraries",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    skills: ["React.js", "Next.js", "React Native", "Redux Toolkit", "Tailwind CSS", "SASS/SCSS", "Bootstrap"],
  },
  {
    id: "tools",
    title: "Development & Workflow",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    skills: ["Git & GitHub", "VS Code", "Responsive Design", "Cross-Browser Compatibility", "Performance Optimization"],
  },
  {
    id: "specializations",
    title: "Specializations",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
    skills: ["Dashboard Development", "SaaS Platforms", "GSAP", "Data Visualization", "Framer Motion", "Three.js", "Frontend Architecture"],
  },
];

/* Card layout positions for desktop — 2 left, 2 right grid with organic staggering */
const CARD_LAYOUT = [
  { gridArea: "1 / 1", rotate: -5, marginTop: "0px" },       // Top Left
  { gridArea: "1 / 2", rotate: 9, marginTop: "30px" },       // Top Right
  { gridArea: "2 / 1", rotate: 2, marginTop: "-10px" },      // Bottom Left
  { gridArea: "2 / 2", rotate: -2, marginTop: "20px" },      // Bottom Right
];

const DOCKED_SCALE = 0.3;
const TITLE_PAD = 96; // pt-24

export default function SkillsSection() {
  const containerRef = useRef<HTMLElement>(null);

  /* Desktop refs */
  const pinRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ambientGlowRef = useRef<HTMLDivElement>(null);

  /* Mobile refs */
  const mTitleBoxRef = useRef<HTMLDivElement>(null);
  const mTitleRef = useRef<HTMLDivElement>(null);
  const mCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /* ───────── Reduced motion ───────── */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [heroRef.current, cardsContainerRef.current, ...cardsRef.current, ...mCardsRef.current].filter(Boolean),
          { autoAlpha: 1, y: 0, x: 0, scale: 1, rotation: 0, filter: "blur(0px)" }
        );
      });

      /* ───────── DESKTOP (lg+) ───────── */
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const pin = pinRef.current;
          const hero = heroRef.current;
          const title = titleRef.current;
          const cardsContainer = cardsContainerRef.current;
          if (!pin || !hero || !title || !cardsContainer) return;

          const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

          let heroY = 0;
          const INITIAL_SCALE = 0.7; // Start slightly smaller

          const layout = () => {
            const titleH = title.offsetHeight;
            // Adjust calculation based on the initial scaled height
            heroY = pin.offsetHeight * 0.42 - (titleH * INITIAL_SCALE) / 2 - TITLE_PAD;
          };

          // Initial states
          gsap.set(cardsContainer, { autoAlpha: 0 });
          cards.forEach((card, i) => {
            gsap.set(card, {
              autoAlpha: 0,
              y: 80,
              filter: "blur(12px)",
              scale: 0.9,
              rotation: CARD_LAYOUT[i].rotate,
            });
          });

          // Ambient Glow pulse animation
          if (ambientGlowRef.current) {
            gsap.to(ambientGlowRef.current, {
              scale: 1.1,
              opacity: 0.6,
              duration: 4,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
            });
          }

          let active = -1;

          // Steps: 
          // 0 = full title, cards hidden
          // 1 = title docks + card 0 clear (others blurred)
          // 2 = card 1 clear
          // 3 = card 2 clear
          // 4 = card 3 clear
          const STEPS = 5;

          const render = (step: number, instant = false) => {
            if (step === active) return;
            active = step;

            const isHero = step === 0;
            const d = instant ? 0 : 0.6;

            // Title Animation
            gsap.killTweensOf(hero);
            gsap.to(hero, {
              scale: isHero ? INITIAL_SCALE : DOCKED_SCALE,
              y: isHero ? heroY : 0,
              duration: 1.1 * (instant ? 0 : 1),
              ease: "expo.out",
              overwrite: "auto",
            });

            // Container Visibility
            gsap.killTweensOf(cardsContainer);
            gsap.to(cardsContainer, {
              autoAlpha: isHero ? 0 : 1,
              duration: 0.4 * (instant ? 0 : 1),
              ease: "power2.out",
              overwrite: "auto",
            });

            if (isHero) {
              // Hide cards if scrolling back to top
              if (instant) {
                gsap.set(cards, {
                  autoAlpha: 0,
                  y: 80,
                  filter: "blur(12px)",
                  scale: 0.9,
                });
              } else {
                gsap.to(cards, {
                  autoAlpha: 0,
                  y: 80,
                  filter: "blur(12px)",
                  scale: 0.9,
                  duration: 0.4,
                  ease: "power2.in",
                  overwrite: "auto",
                });
              }
              return;
            }

            // Animate cards based on scroll step
            cards.forEach((card, i) => {
              const shouldBeClear = i < step;

              if (shouldBeClear) {
                gsap.to(card, {
                  autoAlpha: 1,
                  y: 0,
                  filter: "blur(0px)",
                  scale: 1,
                  rotation: CARD_LAYOUT[i].rotate,
                  duration: d,
                  ease: "back.out(1.2)", // Organic spring easing!
                  overwrite: "auto",
                });
              } else {
                gsap.to(card, {
                  autoAlpha: 0.35,
                  y: 0,
                  filter: "blur(8px)",
                  scale: 0.95,
                  rotation: CARD_LAYOUT[i].rotate,
                  duration: d,
                  ease: "power3.out", // Smooth ease out for blurred cards
                  overwrite: "auto",
                });
              }
            });
          };

          const st = ScrollTrigger.create({
            trigger: pin,
            start: "top top",
            end: () => "+=" + window.innerHeight * (STEPS - 1) * 0.30,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            onRefresh: () => {
              layout();
              gsap.set(hero, {
                scale: active === 0 ? INITIAL_SCALE : DOCKED_SCALE,
                y: active === 0 ? heroY : 0,
              });
            },
            onUpdate: (self) => {
              const raw = self.progress * (STEPS - 1);
              render(Math.floor(raw + 0.15));
            },
          });

          layout();
          gsap.set(hero, { transformOrigin: "center top", y: heroY, scale: INITIAL_SCALE });
          render(0, true);

          return () => {
            st.kill();
            gsap.set(
              [hero, cardsContainer, ...cards].filter(Boolean),
              { clearProps: "all" }
            );
          };
        }
      );

      /* ───────── MOBILE / TABLET ───────── */
      mm.add("(max-width: 1023px)", () => {
        const box = mTitleBoxRef.current;
        const titleEl = mTitleRef.current;
        if (!box || !titleEl) return;

        const fitTitle = () => {
          gsap.set(titleEl, { scale: 1 });
          const natural = titleEl.offsetWidth;
          const available = box.clientWidth;
          const scale = natural > 0 ? Math.min(1, available / natural) : 1;
          gsap.set(titleEl, { scale, transformOrigin: "left top" });
          box.style.height = `${Math.ceil(titleEl.offsetHeight * scale)}px`;
        };

        fitTitle();
        window.addEventListener("resize", fitTitle);
        document.fonts?.ready.then(() => {
          fitTitle();
          ScrollTrigger.refresh();
        });

        return () => {
          window.removeEventListener("resize", fitTitle);
          box.style.height = "";
          gsap.set(titleEl, { clearProps: "all" });
        };
      });

      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          mCardsRef.current.forEach((card, i) => {
            if (!card) return;
            // Slide up and unblur on mobile
            gsap.fromTo(
              card,
              {
                autoAlpha: 0,
                y: 60,
                filter: "blur(8px)",
                scale: 0.95,
              },
              {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0px)",
                scale: 1,
                duration: 0.9,
                ease: "back.out(1.2)",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });
        }
      );

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative w-full overflow-x-hidden bg-[#111018] text-white"
    >
      {/* Ambient Radial Background Glow */}
      <div
        ref={ambientGlowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[120px] will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(157,83,249,0.15) 0%, rgba(30,53,255,0.15) 50%, transparent 100%)"
        }}
      />

      {/* Subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Floating accent dots */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <span className="absolute top-[8%] left-[4%] h-1.5 w-1.5 rounded-full bg-[#FF3366] shadow-[0_0_8px_#FF336680]" />
        <span className="absolute top-[6%] right-[8%] h-2 w-2 rounded-full bg-[#FF9900] shadow-[0_0_8px_#FF990080]" />
        <span className="absolute bottom-[15%] left-[10%] h-1.5 w-1.5 rounded-full bg-[#1E35FF] shadow-[0_0_8px_#1E35FF80]" />
        <span className="absolute bottom-[20%] right-[5%] h-2 w-2 rounded-full bg-[#9D53F9] shadow-[0_0_8px_#9D53F980]" />
        <span className="absolute top-[50%] right-[45%] h-1 w-1 rounded-full bg-[#FF9900] shadow-[0_0_6px_#FF990080]" />
      </div>

      {/* ═══════════ DESKTOP ═══════════ */}
      <div
        ref={pinRef}
        className="relative hidden h-[100svh] w-full overflow-hidden lg:block"
      >
        {/* Title — stays on screen, docks at top */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center px-10 pt-24">
          <div ref={heroRef} className="relative will-change-transform">
            <div ref={titleRef}>
              <SectionTitle line1="SKILLS &" line2="TECHNOLOGIES" />
            </div>
          </div>
        </div>

        {/* Cards layer — 2x2 Grid */}
        <div ref={cardsContainerRef} className="absolute inset-0 z-10">
          <div
            className="mx-auto grid h-full max-w-[1100px] grid-cols-2 gap-x-12 gap-y-8 px-10 xl:gap-x-16"
            style={{ paddingTop: "140px", paddingBottom: "60px" }}
          >
            {SKILLS_DATA.map((card, i) => {
              const pos = CARD_LAYOUT[i];
              return (
                <div
                  key={card.id}
                  ref={(el) => { cardsRef.current[i] = el; }}
                  className="flex items-center justify-center will-change-transform"
                  style={{
                    gridArea: pos.gridArea,
                    marginTop: pos.marginTop,
                  }}
                >
                  <div className="w-full max-w-[420px]" style={{ perspective: "1000px" }}>
                    <SkillCard card={card} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════ MOBILE / TABLET ═══════════ */}
      <div className="relative z-10 px-5 pb-24 pt-16 sm:px-8 lg:hidden">
        {/* Title */}
        <div ref={mTitleBoxRef} className="w-full overflow-hidden">
          <div ref={mTitleRef} className="w-max origin-top-left">
            <SectionTitle line1="SKILLS &" line2="TECHNOLOGIES" />
          </div>
        </div>

        {/* Cards — Stacked for mobile */}
        <div className="mt-12 flex flex-col gap-6 sm:grid sm:grid-cols-2">
          {SKILLS_DATA.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => { mCardsRef.current[i] = el; }}
              className="will-change-transform"
              style={{ perspective: "1000px" }}
            >
              <SkillCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Reusable Card Component with 3D Tilt & Spotlight Hover ── */
function SkillCard({ card }: { card: (typeof SKILLS_DATA)[number]; }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spotlight effect
    glowRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 40%)`;

    // 3D Tilt effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6; // max tilt 6deg
    const rotateY = ((x - centerX) / centerX) * 6;

    cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glowRef.current) return;
    cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    glowRef.current.style.background = `transparent`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-[20px] border border-white/[0.08] bg-[#201B2F]
                 p-7 shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                 transition-all duration-300 ease-out hover:border-white/[0.18]"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Spotlight Hover Glow Layer */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-px z-0 rounded-[20px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Icon */}
      <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1E35FF] text-white shadow-[0_4px_16px_rgba(30,53,255,0.35)]">
        {card.icon}
      </div>

      {/* Title */}
      <h3 className="relative z-10 mb-5 text-lg font-bold tracking-wide text-white">
        {card.title}
      </h3>

      {/* Skill tags */}
      <div className="relative z-10 flex flex-wrap gap-2.5">
        {card.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[10px] md:text-[13px]
                       font-medium text-white/70 transition-all duration-200
                       hover:border-white/[0.18] hover:bg-white/[0.12] hover:text-white"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
