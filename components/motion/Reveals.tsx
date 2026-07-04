"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Effekt 05b (Motion-Konzept) — Scroll-Reveals. Beobachtet alle Elemente mit
 * `[data-reveal]` und setzt beim Eintritt in den Viewport `.in` (einmalig).
 * Re-scannt bei jedem Routenwechsel (App-Router bleibt gemountet).
 */
export function Reveals() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)"),
    );
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
