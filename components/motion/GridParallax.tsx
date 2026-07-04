"use client";

import { useEffect, useRef } from "react";

/**
 * Effekt 05a (Motion-Konzept) — das Punkt-Raster driftet dezent zur Maus.
 * Nur `transform` (rAF-gedrosselt), respektiert `prefers-reduced-motion`.
 * Wird serverseitig als `.dot-grid`-Div gerendert, sodass das Raster auch
 * ohne JS sichtbar ist — die Parallax kommt erst bei Hydration dazu.
 */
export function GridParallax() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let mx = 0;
    let my = 0;
    let raf: number | null = null;

    const apply = () => {
      raf = null;
      const el = ref.current;
      if (!el) return;
      const dx = (mx / window.innerWidth - 0.5) * -16;
      const dy = (my / window.innerHeight - 0.5) * -16;
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (raf == null) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="dot-grid" aria-hidden="true" />;
}
