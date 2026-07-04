"use client";

import { useEffect, useState } from "react";

/**
 * Effekt 03 (Motion-Konzept) — Mono „entschlüsselt" den Text Zeichen für
 * Zeichen. Startet (und SSRt) mit dem Zieltext → kein Hydration-Mismatch,
 * feste Breite/kein Reflow. Respektiert `prefers-reduced-motion`.
 */
export function DecodeText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return;
    }
    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#/[]<>_·";
    const total = 26;
    let f = 0;
    const id = setInterval(() => {
      f++;
      const lock = Math.floor((f / total) * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        s += i < lock ? text[i] : glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      setOut(s);
      if (f >= total) {
        clearInterval(id);
        setOut(text);
      }
    }, 34);
    return () => clearInterval(id);
  }, [text]);

  return <span className={className}>{out}</span>;
}
