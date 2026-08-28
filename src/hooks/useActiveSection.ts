"use client";

import { useState, useEffect } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "");
  const idsKey = sectionIds.join(",");

  useEffect(() => {
    // We only want to track intersecting sections.
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // If the intersecting section is 'hero', map it to 'home'
          const id = entry.target.id === "hero" ? "home" : entry.target.id;
          setActiveSection(id);
        }
      });
    };

    // Use a negative rootMargin so that the active state triggers
    // when the section crosses roughly the middle of the screen.
    const observer = new IntersectionObserver(callback, {
      rootMargin: "-40% 0px -40% 0px",
    });

    // Special case for 'hero' section which maps to 'home'
    const heroEl = document.getElementById("hero");
    if (heroEl) observer.observe(heroEl);

    // Observe all other sections
    const ids = idsKey.split(",").filter(Boolean);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [idsKey]);

  return activeSection;
}
