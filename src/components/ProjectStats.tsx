"use client";

import { useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* ------------------------------------------------------------------ */
/*  Shapes                                                             */
/*  All three stretch to fill their box (preserveAspectRatio="none"),  */
/*  so the box can grow when the value wraps onto a second line.       */
/* ------------------------------------------------------------------ */

type ShapeProps = {
  gradientId: string;
  shapeRef: (el: SVGGeometryElement | null) => void;
};

/** Shape 1 – pill (rounded rect) */
function PillShape({ gradientId, shapeRef }: ShapeProps) {
  return (
    <svg
      viewBox="0 0 215 63"
      fill="none"
      className="absolute inset-0 z-0 h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="31.5" x2="215" y2="31.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5D6DFF" />
          <stop offset="1" stopColor="#9D53F9" />
        </linearGradient>
      </defs>
      <rect
        ref={shapeRef as (el: SVGRectElement | null) => void}
        x="0.5"
        y="0.5"
        width="214"
        height="62"
        rx="31"
        stroke={`url(#${gradientId})`}
        fill="none"
        className="opacity-0"
      />
    </svg>
  );
}

/** Shape 2 – wave (organic blob) */
function WaveShape({ gradientId, shapeRef }: ShapeProps) {
  return (
    <svg
      viewBox="0 0 241 68"
      fill="none"
      className="absolute inset-0 z-0 h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="33.2383" x2="241" y2="33.2383" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5D6DFF" />
          <stop offset="1" stopColor="#9D53F9" />
        </linearGradient>
      </defs>
      <path
        ref={shapeRef as (el: SVGPathElement | null) => void}
        d="M201.366 0.873047C221.738 -2.13557 240.5 13.4506 240.5 34.0176C240.5 53.7562 223.178 69.0064 203.623 67.2373L202.69 67.1406C178.28 64.264 146.637 61.2383 121.501 61.2383C96.0339 61.2383 63.3216 64.3439 38.2559 67.2539C18.332 69.5668 0.500118 54.1384 0.5 34.0996C0.5 13.4901 19.3011 -2.12865 39.7148 0.884766C64.1895 4.49763 95.5507 8.23828 120.5 8.23828C145.477 8.23828 176.88 4.4896 201.366 0.873047Z"
        stroke={`url(#${gradientId})`}
        fill="none"
        className="opacity-0"
      />
    </svg>
  );
}

/** Shape 3 – notch (ticket / coupon) */
function NotchShape({ gradientId, shapeRef }: ShapeProps) {
  return (
    <svg
      viewBox="0 0 220 66"
      fill="none"
      className="absolute inset-0 z-0 h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="-44.1377" y1="33" x2="263.101" y2="33" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5D6DFF" />
          <stop offset="1" stopColor="#9D53F9" />
        </linearGradient>
      </defs>
      <path
        ref={shapeRef as (el: SVGPathElement | null) => void}
        d="M11.6631 0.5H207.785C219.857 0.500195 223.335 16.9996 212.291 21.873C202.622 26.1396 202.622 39.8604 212.291 44.127C223.335 49.0004 219.857 65.4998 207.785 65.5H11.6631C-0.418841 65.4998 -3.8699 48.9674 7.20312 44.1338C16.9208 39.8917 16.9208 26.1083 7.20312 21.8662C-3.86988 17.0326 -0.418815 0.500254 11.6631 0.5Z"
        stroke={`url(#${gradientId})`}
        fill="none"
        className="opacity-0"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Some browsers don't implement getTotalLength on <rect>. Fall back to the bbox perimeter. */
function measure(el: SVGGeometryElement): number {
  try {
    const length = el.getTotalLength();
    if (Number.isFinite(length) && length > 0) return length + 2;
  } catch {
    /* fall through */
  }
  const box = el.getBBox();
  return (box.width + box.height) * 2 + 2;
}

/** Values like "N/A" or "" add nothing — the stat is dropped instead of shown empty. */
function hasValue(value?: string): value is string {
  const v = value?.trim();
  return !!v && v.toUpperCase() !== "N/A";
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

interface StatProps {
  clientFrom?: string;
  category?: string;
  duration?: string;
  service?: string;
}

export default function ProjectStats({ clientFrom, category, duration, service }: StatProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, "");

  const strokesRef = useRef<(SVGGeometryElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelsRef = useRef<(HTMLElement | null)[]>([]);
  const drawnRef = useRef(false);

  const statsList = [
    { label: "Client from", value: clientFrom, Shape: PillShape, id: "client" },
    { label: "Category", value: category, Shape: WaveShape, id: "category" },
    { label: "Project duration", value: duration, Shape: NotchShape, id: "duration" },
    { label: "Service", value: service, Shape: NotchShape, id: "service" },
  ].filter((stat) => hasValue(stat.value));

  useGSAP(
    () => {
      if (statsList.length === 0) return;

      const strokes = strokesRef.current.filter(Boolean) as SVGGeometryElement[];
      const labels = labelsRef.current.filter(Boolean) as HTMLElement[];
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

      const mm = gsap.matchMedia();

      /* ---------- Reduced motion: show everything, no drawing ---------- */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([...strokes, ...labels, ...cards], {
          autoAlpha: 1,
          y: 0,
          strokeDashoffset: 0,
        });
        drawnRef.current = true;
      });

      /* ---------- Full motion ---------- */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const applyDash = () => {
          strokes.forEach((el) => {
            const length = measure(el);
            gsap.set(el, {
              strokeDasharray: length,
              strokeDashoffset: drawnRef.current ? 0 : length,
              autoAlpha: 1,
            });
          });
        };

        applyDash();
        gsap.set(labels, { autoAlpha: 0, y: 14 });
        gsap.set(cards, { autoAlpha: 0, y: 30 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
          onComplete: () => {
            drawnRef.current = true;
          },
        });

        tl.to(cards, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "expo.out" })
          .to(strokes, { strokeDashoffset: 0, duration: 1.4, stagger: 0.14, ease: "power2.inOut" }, 0.15)
          .to(labels, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, 0.4);

        /* The shapes stretch when a value wraps onto a second line, so the
           dash length has to be re-measured whenever the box resizes. */
        let frame = 0;
        const observer = new ResizeObserver(() => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            if (drawnRef.current) applyDash();
            ScrollTrigger.refresh();
          });
        });
        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
          cancelAnimationFrame(frame);
          observer.disconnect();
        };
      });
    },
    { scope: sectionRef, dependencies: [statsList.length] }
  );

  if (statsList.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      aria-label="Project details"
      className="relative my-12 w-full overflow-hidden py-16 sm:my-16 sm:py-20 md:py-24 lg:py-28"
      style={{
        background: "linear-gradient(135deg, #182191 0%, #202CB4 45%, #2A34C8 100%)",
      }}
    >
      {/* Decorative background shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-32 h-[420px] w-[420px] rotate-[18deg] rounded-[80px] bg-white/[0.025]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-[-10%] h-[460px] w-[560px] -rotate-12 rounded-[90px] bg-black/[0.06]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
      />

      <dl
        className={`relative z-20 mx-auto grid max-w-5xl items-stretch gap-x-4 gap-y-10 px-5 sm:gap-x-6 sm:px-8 lg:gap-x-10 ${statsList.length <= 2
            ? "grid-cols-2"
            : statsList.length === 3
              ? "grid-cols-1 sm:grid-cols-3"
              : "grid-cols-2 md:grid-cols-4"
          }`}
      >
        {statsList.map((stat, i) => {
          const ShapeComponent = stat.Shape;
          return (
            <div
              key={stat.id}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              /* 1fr row for the shape means every card in a row grows to match
                 the tallest one, so the labels stay on a single baseline. */
              className="grid grid-rows-[1fr_auto] gap-3 sm:gap-4"
            >
              {/* Shape + value */}
              <div className="relative row-start-1 flex min-h-[62px] items-center justify-center px-1 sm:min-h-[70px]">
                <ShapeComponent
                  gradientId={`grad-${uid}-${stat.id}`}
                  shapeRef={(el) => {
                    strokesRef.current[i] = el;
                  }}
                />
                <dd className="relative z-10 px-6 py-3 text-center font-urbanist text-[13px] font-black uppercase leading-tight tracking-[0.12em] text-white [text-wrap:balance] hyphens-auto break-words sm:px-7 sm:text-[15px] md:text-base lg:text-[19px]">
                  {stat.value}
                </dd>
              </div>

              {/* Label */}
              <dt
                ref={(el) => {
                  labelsRef.current[i] = el;
                }}
                className="row-start-2 text-center text-xs font-light tracking-wide text-white/70 sm:text-sm"
              >
                {stat.label}
              </dt>
            </div>
          );
        })}
      </dl>
    </section>
  );
}