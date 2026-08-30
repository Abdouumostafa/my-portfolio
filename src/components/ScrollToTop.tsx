"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Forces the page to open at the top.
 *
 * Three separate things can leave a page scrolled down:
 *  1. The browser restoring the previous scroll position on reload / back-forward.
 *  2. Arriving from a hash link (e.g. `/#projects`) where the hash lingers.
 *  3. A smooth-scroll library (Lenis, Locomotive) keeping its own scroll value,
 *     which the native `window.scrollTo` does not reset.
 *
 * Mount this once inside the page (or the layout) — it renders nothing.
 */
export default function ScrollToTop() {
    const pathname = usePathname();

    useLayoutEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        const toTop = () => {
            // Smooth-scroll libraries expose their instance on window in most setups.
            const lenis = (window as unknown as { lenis?: { scrollTo: (t: number, o?: object) => void; }; }).lenis;
            if (lenis) lenis.scrollTo(0, { immediate: true });

            window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        };

        toTop();

        // Safari and Firefox can restore the old offset after the first paint,
        // and images finishing their layout can nudge it again.
        const raf = requestAnimationFrame(toTop);
        const timer = window.setTimeout(toTop, 80);

        return () => {
            cancelAnimationFrame(raf);
            window.clearTimeout(timer);
            if ("scrollRestoration" in window.history) {
                window.history.scrollRestoration = "auto";
            }
        };
    }, [pathname]);

    return null;
}