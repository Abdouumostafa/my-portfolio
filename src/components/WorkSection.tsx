"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionTitle from "./SectionTitle";

gsap.registerPlugin(ScrollTrigger);

type Group = { subtitle: string; bullets: string[]; };

type WorkExperience = {
  id: string;
  date: string;
  location: string;
  company: string;
  role: string;
  details: (string | Group)[];
};

const EXPERIENCES: WorkExperience[] = [
  {
    id: "cmt",
    date: "10/2025 — Present",
    location: "Remote",
    company: "CMT",
    role: "Mid-Level Front-End Developer",
    details: [
      "Leading the front-end of a multi-tenant project management SaaS: entities, projects, dashboards and analytics.",
      "Built the heavy modules — Gantt charts, task management, risk and governance tracking, reporting dashboards.",
      "Shipped roles, permissions, session control and audit logs across the platform.",
    ],
  },
  {
    id: "blue202",
    date: "10/2024 — 10/2025",
    location: "On site · Egypt branch",
    company: "Blue202",
    role: "Front-End Developer",
    details: [
      {
        subtitle: "SIAA Platform",
        bullets: [
          "Built scalable front-end features and integrated AI APIs (ChatGPT) with the backend team.",
          "Refactored major sections of the platform for performance and maintainability.",
        ],
      },
      {
        subtitle: "Seller-AMP",
        bullets: [
          "Integrated the Keepa API for Amazon pricing history and market analytics.",
          "Improved data handling and UI responsiveness across the monitoring dashboard.",
        ],
      },
    ],
  },
  {
    id: "progo",
    date: "09/2023 — 08/2024",
    location: "Remote",
    company: "PROGO",
    role: "Front-End Developer",
    details: [
      "Built and maintained responsive websites and web apps for international clients.",
      "Worked directly with clients to turn requirements into shipped features.",
      "Paired with designers and backend developers to close the gap between mockup and product.",
    ],
  },
  {
    id: "clouds-zone",
    date: "07/2023 — 09/2023",
    location: "Remote",
    company: "Clouds Zone",
    role: "Front-End Developer Intern",
    details: [
      "Worked on real client projects for the Saudi market.",
      "Built websites and admin dashboards alongside backend developers.",
      "Focused on front-end performance and clean backend integration.",
    ],
  },
];

const COUNT = EXPERIENCES.length;
// step 0 = the title, steps 1..COUNT = the experiences
const STEPS = COUNT + 1;

// Where along a segment the swap happens. The line fill divides by the same
// number, so it lands on the dot the same frame the content changes.
const SWITCH_AT = 0.88;

const DOCKED_SCALE = 0.3;
// Must match the pt-* class on the title rail (clears the fixed navbar).
const TITLE_PAD = 96;

const INTRO_COPY =
  "Three years of shipping production front-ends — from client sites to a multi-tenant SaaS platform.";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/* ------------------------------------------------------------------ */

/** Single-line text that rises out of a mask. */
function Mask({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden pb-[0.14em] ${className ?? ""}`}>
      <span data-mask className="block will-change-transform">
        {children}
      </span>
    </span>
  );
}

function Bullet({ text, compact }: { text: string; compact?: boolean; }) {
  return (
    <span
      className={`flex ${compact ? "gap-3 text-[14px]" : "gap-4 text-[15px]"} leading-relaxed text-white/50`}
    >
      <span
        aria-hidden
        className={`mt-[0.7em] h-px flex-shrink-0 bg-[#1E35FF] ${compact ? "w-3" : "w-5"
          }`}
      />
      <span className="flex-1">{text}</span>
    </span>
  );
}

/**
 * `masked` wraps each line for the desktop reveal. Wrapped paragraphs are
 * never masked on mobile — a two-line bullet inside an overflow-hidden box
 * clips badly at narrow widths.
 */
function DetailList({
  details,
  masked,
}: {
  details: (string | Group)[];
  masked?: boolean;
}) {
  const Line = ({ children }: { children: ReactNode; }) =>
    masked ? <Mask>{children}</Mask> : <span className="block">{children}</span>;

  return (
    <div className={`flex flex-col gap-3 ${masked ? "mt-7" : "mt-5"}`}>
      {details.map((detail, idx) => {
        if (typeof detail === "string") {
          return (
            <Line key={idx}>
              <Bullet text={detail} compact={!masked} />
            </Line>
          );
        }

        return (
          <div key={idx} className="flex flex-col gap-2 pt-1">
            <Line>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
                {detail.subtitle}
              </span>
            </Line>
            {detail.bullets.map((b, i) => (
              <Line key={i}>
                <Bullet text={b} compact={!masked} />
              </Line>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function PanelBody({ exp }: { exp: WorkExperience; }) {
  return (
    <>
      <h3 className="flex flex-wrap gap-x-3 text-4xl font-bold tracking-tight text-white xl:text-[44px]">
        {exp.company.split(" ").map((word, i) => (
          <Mask key={i}>
            <span className="block">{word}</span>
          </Mask>
        ))}
      </h3>
      <Mask className="mt-3">
        <span className="block text-[15px] text-white/65">{exp.role}</span>
      </Mask>
      <DetailList details={exp.details} masked />
    </>
  );
}

/* ------------------------------------------------------------------ */

export default function WorkSection() {
  const containerRef = useRef<HTMLElement>(null);

  // desktop
  const pinRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInnerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const metasRef = useRef<(HTMLDivElement | null)[]>([]);
  const fillsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const ringsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const cueRef = useRef<HTMLDivElement>(null);
  const cueLabelRef = useRef<HTMLSpanElement>(null);
  const cueArrowRef = useRef<HTMLSpanElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  // mobile
  const mTitleBoxRef = useRef<HTMLDivElement>(null);
  const mTitleRef = useRef<HTMLDivElement>(null);
  const mHeadRef = useRef<HTMLDivElement>(null);
  const mListRef = useRef<HTMLDivElement>(null);
  const mFillRef = useRef<HTMLSpanElement>(null);
  const mItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mDotsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const goToStep = (index: number) => {
    const st = stRef.current;
    if (st) {
      const y = st.start + ((st.end - st.start) * (index + 1)) / (STEPS - 1);
      window.scrollTo({ top: y, behavior: "smooth" });
      return;
    }
    mItemsRef.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /* ---------------- Reduced motion ---------------- */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const masks = containerRef.current?.querySelectorAll("[data-mask]");
        if (masks) gsap.set(masks, { yPercent: 0, autoAlpha: 1 });
        gsap.set(
          [
            heroRef.current,
            introRef.current,
            mHeadRef.current,
            panelsRef.current[0],
            metasRef.current[0],
            ...mItemsRef.current,
            ...mDotsRef.current,
          ].filter(Boolean),
          { autoAlpha: 1, y: 0, scale: 1 }
        );
        gsap.set(contentRef.current, { autoAlpha: 0 });
      });

      /* ---------------- Desktop ---------------- */
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const pin = pinRef.current;
          const hero = heroRef.current;
          const title = titleRef.current;
          const content = contentRef.current;
          const inner = contentInnerRef.current;
          if (!pin || !hero || !title || !content || !inner) return;

          const panels = panelsRef.current;
          const metas = metasRef.current;
          const fills = fillsRef.current;
          const dots = dotsRef.current;
          const rings = ringsRef.current;

          // queried once so nothing hits the DOM during scroll
          const maskGroups: HTMLElement[][] = EXPERIENCES.map((_, i) => [
            ...Array.from(
              metas[i]?.querySelectorAll<HTMLElement>("[data-mask]") ?? []
            ),
            ...Array.from(
              panels[i]?.querySelectorAll<HTMLElement>("[data-mask]") ?? []
            ),
          ]);

          gsap.set(fills.filter(Boolean), {
            scaleY: 0,
            transformOrigin: "top center",
          });
          const lastFill = fills.map(() => -1);

          let active = -1;
          let heroY = 0;

          const layout = () => {
            const titleH = title.offsetHeight;
            heroY = pin.offsetHeight * 0.42 - titleH / 2 - TITLE_PAD;
            inner.style.paddingTop = `${TITLE_PAD + titleH * DOCKED_SCALE + 48
              }px`;
          };

          const cueLoop = cueArrowRef.current
            ? gsap.to(cueArrowRef.current, {
              y: 6,
              duration: 0.9,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            })
            : null;

          const render = (step: number, instant = false) => {
            if (step === active) return;
            const previous = active;
            active = step;

            const isHero = step === 0;
            const d = instant ? 0 : 1;

            gsap.killTweensOf([hero, introRef.current, content]);
            gsap.to(hero, {
              scale: isHero ? 1 : DOCKED_SCALE,
              y: isHero ? heroY : 0,
              duration: 1.1 * d,
              ease: "expo.out",
            });
            gsap.to(introRef.current, {
              autoAlpha: isHero ? 1 : 0,
              y: isHero ? 0 : -20,
              duration: 0.5 * d,
              ease: "power2.out",
            });
            gsap.to(content, {
              autoAlpha: isHero ? 0 : 1,
              duration: 0.4 * d,
              ease: "power2.out",
            });
            gsap.to(glowRef.current, {
              autoAlpha: isHero ? 0 : 1,
              duration: 0.6 * d,
              ease: "power2.out",
            });

            if (cueLabelRef.current) {
              cueLabelRef.current.textContent = isHero
                ? "Scroll to explore"
                : "Keep scrolling";
            }
            gsap.to(cueRef.current, {
              autoAlpha: step === STEPS - 1 ? 0 : 1,
              duration: 0.3 * d,
              ease: "power2.out",
            });

            const index = step - 1;

            dots.forEach((dot, i) => {
              if (!dot) return;
              const reached = index >= i;
              gsap.to(dot, {
                scale: reached ? 1 : 0,
                autoAlpha: reached ? 1 : 0,
                duration: 0.4 * d,
                ease: "back.out(2)",
              });
            });
            rings.forEach((ring, i) => {
              if (!ring) return;
              const isCurrent = index === i;
              gsap.to(ring, {
                scale: isCurrent ? 1 : 0.5,
                autoAlpha: isCurrent ? 1 : 0,
                duration: 0.4 * d,
                ease: "power3.out",
              });
            });

            if (isHero) return;

            const skipEnter = instant || previous <= 0;

            [panels, metas].forEach((group) => {
              group.forEach((el, i) => {
                if (!el) return;
                const isActive = i === index;
                gsap.killTweensOf(el);
                gsap.set(el, { zIndex: isActive ? 2 : 1 });
                gsap.to(el, {
                  autoAlpha: isActive ? 1 : 0,
                  duration: skipEnter ? 0 : 0.25,
                  ease: isActive ? "power2.out" : "power2.in",
                });
              });
            });

            // Reset every inactive group. Without this, a reveal interrupted
            // mid-flight leaves its lines parked outside their mask forever.
            maskGroups.forEach((group, i) => {
              if (i === index || !group.length) return;
              gsap.killTweensOf(group);
              gsap.set(group, { yPercent: 0 });
            });

            const masks = maskGroups[index];
            if (masks?.length) {
              gsap.fromTo(
                masks,
                { yPercent: index > previous - 1 ? 110 : -110 },
                {
                  yPercent: 0,
                  duration: instant ? 0 : 0.9,
                  stagger: instant ? 0 : 0.035,
                  ease: "expo.out",
                  overwrite: "auto",
                }
              );
            }
          };

          const st = ScrollTrigger.create({
            trigger: pin,
            start: "top top",
            end: () => "+=" + window.innerHeight * (STEPS - 1) * 0.85,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            onRefresh: () => {
              layout();
              gsap.set(hero, {
                scale: active === 0 ? 1 : DOCKED_SCALE,
                y: active === 0 ? heroY : 0,
              });
            },
            onUpdate: (self) => {
              const raw = self.progress * (STEPS - 1);
              render(Math.floor(raw + (1 - SWITCH_AT)));

              for (let i = 0; i < fills.length; i++) {
                const el = fills[i];
                if (!el) continue;
                const value = clamp01((raw - i) / SWITCH_AT);
                if (Math.abs(value - lastFill[i]) < 0.003) continue;
                lastFill[i] = value;
                gsap.set(el, { scaleY: value });
              }
            },
          });

          stRef.current = st;
          layout();
          gsap.set(hero, { transformOrigin: "center top", y: heroY });
          render(0, true);

          return () => {
            stRef.current = null;
            cueLoop?.kill();
            inner.style.paddingTop = "";
            gsap.set(
              [
                hero,
                content,
                introRef.current,
                ...panels,
                ...metas,
                ...fills,
                ...dots,
                ...rings,
              ].filter(Boolean),
              { clearProps: "all" }
            );
          };
        }
      );

      /* ---------------- Mobile / tablet ---------------- */
      mm.add("(max-width: 1023px)", () => {
        const box = mTitleBoxRef.current;
        const titleEl = mTitleRef.current;
        if (!box || !titleEl) return;

        // The section title is built for desktop widths. Rather than swapping
        // in different type, measure it and scale it down to fit the screen —
        // same component, same identity, no horizontal overflow.
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
          if (mHeadRef.current) {
            gsap.fromTo(
              mHeadRef.current,
              { autoAlpha: 0, y: 26 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: mHeadRef.current,
                  start: "top 90%",
                  once: true,
                },
              }
            );
          }

          // rail fills as the list scrolls past — same idea as desktop
          if (mFillRef.current && mListRef.current) {
            gsap.fromTo(
              mFillRef.current,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: "none",
                transformOrigin: "top center",
                scrollTrigger: {
                  trigger: mListRef.current,
                  start: "top 60%",
                  end: "bottom 75%",
                  scrub: 0.4,
                },
              }
            );
          }

          mItemsRef.current.forEach((item, i) => {
            if (!item) return;
            const trigger = { trigger: item, start: "top 85%", once: true };

            gsap.fromTo(
              item,
              { autoAlpha: 0, y: 28 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                ease: "expo.out",
                scrollTrigger: trigger,
              }
            );

            const masks = item.querySelectorAll<HTMLElement>("[data-mask]");
            if (masks.length) {
              gsap.fromTo(
                masks,
                { yPercent: 110 },
                {
                  yPercent: 0,
                  duration: 0.85,
                  stagger: 0.05,
                  ease: "expo.out",
                  scrollTrigger: trigger,
                }
              );
            }

            const dot = mDotsRef.current[i];
            if (dot) {
              gsap.fromTo(
                dot,
                { scale: 0 },
                {
                  scale: 1,
                  duration: 0.5,
                  ease: "back.out(2.4)",
                  scrollTrigger: { trigger: item, start: "top 72%", once: true },
                }
              );
            }
          });
        }
      );

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative w-full overflow-x-hidden bg-[#171323] text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
      />

      {/* ================= DESKTOP ================= */}
      <div
        ref={pinRef}
        className="relative hidden h-[100svh] w-full overflow-hidden lg:block"
      >
        <div
          ref={glowRef}
          aria-hidden
          className="pointer-events-none absolute left-[2%] top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full opacity-0"
          style={{
            background:
              "radial-gradient(circle, rgba(30,53,255,0.16) 0%, rgba(30,53,255,0.06) 40%, transparent 70%)",
          }}
        />

        {/* Title — stays on screen, docks at the top */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center px-10 pt-24">
          <div ref={heroRef} className="relative will-change-transform">
            <div ref={titleRef}>
              <SectionTitle line1="WORK" line2="EXPERIENCE" />
            </div>
            <div
              ref={introRef}
              className="absolute left-1/2 top-full mt-10 w-max max-w-[42rem] -translate-x-1/2"
            >
              <p className="text-center text-[15px] leading-relaxed text-white/45">
                {INTRO_COPY}
              </p>
            </div>
          </div>
        </div>

        <div ref={contentRef} className="absolute inset-0 z-10">
          <div
            ref={contentInnerRef}
            className="mx-auto flex h-full max-w-6xl flex-col px-10 pb-24 xl:px-12"
          >
            <div className="flex flex-1 items-center gap-10 xl:gap-14">
              {/* Index + dates */}
              <div className="relative h-[210px] w-[215px] flex-shrink-0 xl:w-[250px]">
                {EXPERIENCES.map((exp, i) => (
                  <div
                    key={exp.id}
                    ref={(el) => {
                      metasRef.current[i] = el;
                    }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <Mask>
                      <span
                        aria-hidden
                        className="block text-[92px] font-black leading-[1.02] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.22)] xl:text-[108px]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Mask>
                    <Mask className="mt-4">
                      <span className="block text-[15px] font-semibold tracking-wide text-[#5468FF]">
                        {exp.date}
                      </span>
                    </Mask>
                    <Mask className="mt-1">
                      <span className="block text-[11px] uppercase tracking-[0.22em] text-white/35">
                        {exp.location}
                      </span>
                    </Mask>
                  </div>
                ))}
              </div>

              {/* Rail — a line then a dot per experience */}
              <nav
                aria-label="Work experience navigation"
                className="flex flex-shrink-0 flex-col items-center"
              >
                {EXPERIENCES.map((exp, i) => (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => goToStep(i)}
                    aria-label={`${exp.company} — ${exp.date}`}
                    className="group relative flex w-7 flex-col items-center focus:outline-none"
                  >
                    <span className="relative h-12 w-[2px] rounded-full bg-white/[0.09] transition-colors duration-300 group-hover:bg-white/25 xl:h-14">
                      <span
                        ref={(el) => {
                          fillsRef.current[i] = el;
                        }}
                        className="absolute inset-0 rounded-full bg-[#1E35FF] shadow-[0_0_14px_rgba(30,53,255,0.65)]"
                        style={{
                          transform: "scaleY(0)",
                          transformOrigin: "top center",
                        }}
                      />
                    </span>

                    <span className="relative flex h-7 w-7 items-center justify-center">
                      <span className="absolute h-[7px] w-[7px] rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-white/45" />
                      <span
                        ref={(el) => {
                          dotsRef.current[i] = el;
                        }}
                        className="absolute h-[7px] w-[7px] rounded-full bg-[#1E35FF] opacity-0 shadow-[0_0_12px_rgba(30,53,255,0.85)]"
                      />
                      <span
                        ref={(el) => {
                          ringsRef.current[i] = el;
                        }}
                        className="absolute h-6 w-6 rounded-full border border-[#1E35FF]/50 opacity-0"
                      />
                    </span>

                    <span className="pointer-events-none absolute bottom-0 left-8 whitespace-nowrap rounded border border-white/10 bg-[#1F1A2E] px-2 py-1 text-[11px] text-white/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                      {exp.company}
                    </span>
                  </button>
                ))}
              </nav>

              {/* Panels */}
              <div className="relative h-[360px] flex-1">
                {EXPERIENCES.map((exp, i) => (
                  <div
                    key={exp.id}
                    ref={(el) => {
                      panelsRef.current[i] = el;
                    }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <PanelBody exp={exp} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          ref={cueRef}
          className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5"
        >
          <span
            ref={cueLabelRef}
            className="text-[11px] uppercase tracking-[0.28em] text-white/30"
          >
            Scroll to explore
          </span>
          <span ref={cueArrowRef} aria-hidden className="text-white/30">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 4v15m0 0l-6-6m6 6l6-6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* ================= MOBILE / TABLET ================= */}
      <div className="relative z-10 px-5 pb-24 pt-16 sm:px-8 lg:hidden">
        <div ref={mHeadRef}>
          {/* same SectionTitle, measured and scaled to the viewport */}
          <div ref={mTitleBoxRef} className="w-full overflow-hidden">
            <div ref={mTitleRef} className="w-max origin-top-left">
              <SectionTitle line1="WORK" line2="EXPERIENCE" />
            </div>
          </div>
          <p className="mt-6 max-w-md text-[14px] leading-relaxed text-white/45">
            {INTRO_COPY}
          </p>
        </div>

        <div ref={mListRef} className="relative mt-14">
          {/* rail */}
          <span
            aria-hidden
            className="absolute bottom-3 left-[7px] top-3 w-[2px] rounded-full bg-white/[0.08]"
          />
          <span
            ref={mFillRef}
            aria-hidden
            className="absolute bottom-3 left-[7px] top-3 w-[2px] rounded-full bg-[#1E35FF] shadow-[0_0_14px_rgba(30,53,255,0.5)]"
            style={{ transform: "scaleY(0)", transformOrigin: "top center" }}
          />

          <div className="flex flex-col gap-16">
            {EXPERIENCES.map((exp, i) => (
              <div
                key={exp.id}
                ref={(el) => {
                  mItemsRef.current[i] = el;
                }}
                className="relative pl-9 sm:pl-11"
              >
                <span
                  ref={(el) => {
                    mDotsRef.current[i] = el;
                  }}
                  aria-hidden
                  className="absolute left-[2px] top-[9px] h-3 w-3 rounded-full border-2 border-[#1E35FF] bg-[#171323] shadow-[0_0_12px_rgba(30,53,255,0.6)]"
                />

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Mask>
                      <span className="block text-[13px] font-semibold tracking-wide text-[#5468FF]">
                        {exp.date}
                      </span>
                    </Mask>
                    <Mask className="mt-1">
                      <span className="block text-[10px] uppercase tracking-[0.22em] text-white/35">
                        {exp.location}
                      </span>
                    </Mask>
                  </div>
                  <span
                    aria-hidden
                    className="flex-shrink-0 text-[38px] font-black leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.16)] sm:text-[46px]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-4 text-[28px] font-bold leading-tight tracking-tight text-white sm:text-[34px]">
                  <Mask>
                    <span className="block">{exp.company}</span>
                  </Mask>
                </h3>
                <Mask className="mt-1.5">
                  <span className="block text-[14px] text-white/65">
                    {exp.role}
                  </span>
                </Mask>

                <DetailList details={exp.details} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}