"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Stat = {
    id: string;
    value: number;
    suffix?: string;
    label: string;
};

const STATS: Stat[] = [
    { id: "years", value: 3, suffix: "+", label: "Years of Experience" },
    { id: "projects", value: 35, suffix: "+", label: "Projects Delivered" },
    { id: "satisfaction", value: 100, suffix: "%", label: "Client Satisfaction" },
];

const NOISE =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* ------------------------------------------------------------------ */
/*  Individual shape SVGs (exact copies from user)                     */
/* ------------------------------------------------------------------ */

/** Shape 1 – pill (rounded rect) */
function PillShape({
    id,
    shapeRef,
}: {
    id: string;
    shapeRef: (el: SVGRectElement | null) => void;
}) {
    return (
        <svg
            viewBox="0 0 215 63"
            fill="none"
            className="h-auto w-full"
            aria-hidden
        >
            <defs>
                <linearGradient
                    id={`grad-${id}`}
                    x1="0"
                    y1="31.5"
                    x2="215"
                    y2="31.5"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#5D6DFF" />
                    <stop offset="1" stopColor="#9D53F9" />
                </linearGradient>
            </defs>
            <rect
                ref={shapeRef}
                x="0.5"
                y="0.5"
                width="214"
                height="62"
                rx="31"
                stroke={`url(#grad-${id})`}
                fill="none"
                className="opacity-0"
            />
        </svg>
    );
}

/** Shape 2 – wave (organic blob) */
function WaveShape({
    id,
    shapeRef,
}: {
    id: string;
    shapeRef: (el: SVGPathElement | null) => void;
}) {
    return (
        <svg
            viewBox="0 0 241 68"
            fill="none"
            className="h-auto w-full"
            aria-hidden
        >
            <defs>
                <linearGradient
                    id={`grad-${id}`}
                    x1="0"
                    y1="33.2383"
                    x2="241"
                    y2="33.2383"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#5D6DFF" />
                    <stop offset="1" stopColor="#9D53F9" />
                </linearGradient>
            </defs>
            <path
                ref={shapeRef}
                d="M201.366 0.873047C221.738 -2.13557 240.5 13.4506 240.5 34.0176C240.5 53.7562 223.178 69.0064 203.623 67.2373L202.69 67.1406C178.28 64.264 146.637 61.2383 121.501 61.2383C96.0339 61.2383 63.3216 64.3439 38.2559 67.2539C18.332 69.5668 0.500118 54.1384 0.5 34.0996C0.5 13.4901 19.3011 -2.12865 39.7148 0.884766C64.1895 4.49763 95.5507 8.23828 120.5 8.23828C145.477 8.23828 176.88 4.4896 201.366 0.873047Z"
                stroke={`url(#grad-${id})`}
                fill="none"
                className="opacity-0"
            />
        </svg>
    );
}

/** Shape 3 – notch (ticket / coupon) */
function NotchShape({
    id,
    shapeRef,
}: {
    id: string;
    shapeRef: (el: SVGPathElement | null) => void;
}) {
    return (
        <svg
            viewBox="0 0 220 66"
            fill="none"
            className="h-auto w-full"
            aria-hidden
        >
            <defs>
                <linearGradient
                    id={`grad-${id}`}
                    x1="-44.1377"
                    y1="33"
                    x2="263.101"
                    y2="33"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#5D6DFF" />
                    <stop offset="1" stopColor="#9D53F9" />
                </linearGradient>
            </defs>
            <path
                ref={shapeRef}
                d="M11.6631 0.5H207.785C219.857 0.500195 223.335 16.9996 212.291 21.873C202.622 26.1396 202.622 39.8604 212.291 44.127C223.335 49.0004 219.857 65.4998 207.785 65.5H11.6631C-0.418841 65.4998 -3.8699 48.9674 7.20312 44.1338C16.9208 39.8917 16.9208 26.1083 7.20312 21.8662C-3.86988 17.0326 -0.418815 0.500254 11.6631 0.5Z"
                stroke={`url(#grad-${id})`}
                fill="none"
                className="opacity-0"
            />
        </svg>
    );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function StatsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    // We store either SVGPathElement or SVGRectElement — both have getTotalLength
    const strokesRef = useRef<(SVGGraphicsElement | null)[]>([]);
    const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const labelsRef = useRef<(HTMLParagraphElement | null)[]>([]);

    useGSAP(
        () => {
            const strokes = strokesRef.current.filter(
                Boolean
            ) as SVGGeometryElement[];
            const numbers = numbersRef.current;
            const labels = labelsRef.current.filter(Boolean);
            const cards = cardsRef.current.filter(Boolean);

            /** Write the current counter value into the DOM */
            const write = (i: number, n: number) => {
                const el = numbers[i];
                const stat = STATS[i];
                if (!el || !stat) return;
                el.textContent = String(Math.round(n));
            };

            const mm = gsap.matchMedia();

            /* ---------- Reduced motion ---------- */
            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set([...strokes, ...labels, ...cards], {
                    autoAlpha: 1,
                    strokeDashoffset: 0,
                });
                STATS.forEach((stat, i) => write(i, stat.value));
            });

            /* ---------- Full motion ---------- */
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // Measure each stroke and set up the dash for drawing
                strokes.forEach((el) => {
                    const length = el.getTotalLength() + 2;
                    gsap.set(el, {
                        strokeDasharray: length,
                        strokeDashoffset: length,
                        autoAlpha: 1,
                    });
                });

                // Hide labels and zero out counters before scroll triggers
                gsap.set(labels, { autoAlpha: 0, y: 14 });
                gsap.set(cards, { autoAlpha: 0, y: 30 });
                STATS.forEach((_, i) => write(i, 0));

                // Main timeline — only fires once when section scrolls into view
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        once: true,
                    },
                });

                // 1. Fade cards in
                tl.to(cards, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: "expo.out",
                });

                // 2. Draw strokes (overlapping with card fade-in)
                tl.to(
                    strokes,
                    {
                        strokeDashoffset: 0,
                        duration: 1.4,
                        stagger: 0.14,
                        ease: "power2.inOut",
                    },
                    0.15
                );

                // 3. Count up numbers
                STATS.forEach((stat, i) => {
                    const counter = { n: 0 };
                    tl.to(
                        counter,
                        {
                            n: stat.value,
                            duration: 1.2,
                            ease: "power2.out",
                            onUpdate: () => write(i, counter.n),
                        },
                        0.3 + i * 0.14
                    );
                });

                // 4. Fade labels in
                tl.to(
                    labels,
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: "expo.out",
                    },
                    0.6
                );

                return () => { /* cleanup */ };
            });

            return () => mm.revert();
        },
        { scope: sectionRef }
    );

    /* ---------------------------------------------------------------- */
    /*  Render                                                           */
    /* ---------------------------------------------------------------- */

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24"
            style={{
                background:
                    "linear-gradient(135deg, #182191 0%, #202CB4 45%, #2A34C8 100%)",
            }}
        >
            {/* Decorative background shapes */}
            <div
                aria-hidden
                className="pointer-events-none absolute -left-24 -top-32 h-[420px] w-[420px] rotate-[18deg] rounded-[80px] bg-white/[0.025]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-40 right-[-10%] h-[460px] w-[560px] -rotate-12 rounded-[90px] bg-black/[0.06]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
                style={{ backgroundImage: NOISE }}
            />

            {/* Stats grid */}
            <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 sm:grid-cols-3 sm:gap-6 md:gap-8 lg:gap-12">
                {STATS.map((stat, i) => (
                    <div
                        key={stat.id}
                        ref={(el) => {
                            cardsRef.current[i] = el;
                        }}
                        className="flex flex-col items-center"
                    >
                        {/* Shape + number overlay */}
                        <div className="relative w-[180px] sm:w-full sm:max-w-[220px] md:max-w-[240px]">
                            {/* SVG shape */}
                            {i === 0 && (
                                <PillShape
                                    id={stat.id}
                                    shapeRef={(el) => {
                                        strokesRef.current[i] = el;
                                    }}
                                />
                            )}
                            {i === 1 && (
                                <WaveShape
                                    id={stat.id}
                                    shapeRef={(el) => {
                                        strokesRef.current[i] = el;
                                    }}
                                />
                            )}
                            {i === 2 && (
                                <NotchShape
                                    id={stat.id}
                                    shapeRef={(el) => {
                                        strokesRef.current[i] = el;
                                    }}
                                />
                            )}

                            {/* Number centered inside */}
                            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                <span className="flex items-baseline text-white">
                                    <span
                                        ref={(el) => {
                                            numbersRef.current[i] = el;
                                        }}
                                        className="text-[28px] font-black leading-none tracking-tight sm:text-[26px] md:text-[32px] lg:text-[36px]"
                                    >
                                        0
                                    </span>
                                    {stat.suffix && (
                                        <span className="ml-0.5 text-[18px] font-black leading-none sm:text-[16px] md:text-[20px] lg:text-[22px]">
                                            {stat.suffix}
                                        </span>
                                    )}
                                </span>
                            </span>
                        </div>

                        {/* Label */}
                        <p
                            ref={(el) => {
                                labelsRef.current[i] = el;
                            }}
                            className="mt-4 text-center text-[13px] text-white/65 sm:mt-5 sm:text-[14px] md:text-[15px]"
                        >
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}