"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero-Visual (rechte Seite) — ein „SYSTEM"-HUD im Sucher-Rahmen. Greift das
 * Viewfinder-Motiv der Projektkarten auf (Eck-Winkel, Mono-Readouts) und
 * bringt Leben in den Hero: blinkender Live-Dot, Signal-Equalizer und eine
 * tippende Statuszeile. Respektiert `prefers-reduced-motion` (statisch).
 */

const PHRASES = [
  "software gebaut",
  "games entworfen",
  "web deployed",
  "idee → live",
];

const specs = [
  { k: "STACK", v: "TS · NEXT · R3F" },
  { k: "FOCUS", v: "SW · GAMES · WEB" },
  { k: "SINCE", v: "2026" },
];

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const map = {
    tl: "top-0 left-0 border-t border-l",
    tr: "top-0 right-0 border-t border-r",
    bl: "bottom-0 left-0 border-b border-l",
    br: "right-0 bottom-0 border-b border-r",
  } as const;
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-3 w-3 border-accent ${map[pos]}`}
    />
  );
}

export function HeroPanel() {
  const [typed, setTyped] = useState(PHRASES[0]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let phrase = 0;
    let pos = PHRASES[0].length;
    let deleting = false;

    const step = () => {
      const full = PHRASES[phrase];
      pos += deleting ? -1 : 1;
      setTyped(full.slice(0, pos));

      let delay = deleting ? 45 : 80;
      if (!deleting && pos === full.length) {
        deleting = true;
        delay = 1500; // halten
      } else if (deleting && pos === 0) {
        deleting = false;
        phrase = (phrase + 1) % PHRASES.length;
        delay = 320;
      }
      timer.current = setTimeout(step, delay);
    };

    timer.current = setTimeout(step, 1600);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className="relative rounded-sm border border-line bg-surface/40 p-px backdrop-blur-sm">
      {/* Indigo-Innenglow — sehr dezent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-sm bg-[radial-gradient(120%_80%_at_70%_0%,rgba(109,124,255,0.10),transparent_60%)]"
      />
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />

      <div className="relative p-5">
        {/* Kopfzeile */}
        <div className="flex items-center justify-between border-b border-line pb-3 font-mono text-[11px] tracking-[0.12em]">
          <span className="text-faint">~/codemantix</span>
          <span className="flex items-center gap-1.5 text-accent">
            <span className="blink-cursor inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            LIVE
          </span>
        </div>

        {/* Spec-Zeilen */}
        <dl className="mt-4 flex flex-col gap-2.5 font-mono text-xs">
          {specs.map((s) => (
            <div key={s.k} className="flex items-center justify-between">
              <dt className="tracking-[0.14em] text-faint">{s.k}</dt>
              <dd className="text-muted">{s.v}</dd>
            </div>
          ))}
          {/* Signal-Equalizer */}
          <div className="flex items-center justify-between pt-1">
            <span className="tracking-[0.14em] text-faint">SIGNAL</span>
            <span
              aria-hidden="true"
              className="flex h-4 items-end gap-[3px]"
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  className="eq-bar block w-[3px] rounded-[1px] bg-accent/70"
                  style={{
                    height: "100%",
                    animationDelay: `${(i % 6) * 0.13}s`,
                    animationDuration: `${1 + (i % 3) * 0.22}s`,
                  }}
                />
              ))}
            </span>
          </div>
        </dl>

        {/* Tippende Statuszeile */}
        <div className="mt-4 border-t border-line pt-3 font-mono text-xs text-fg">
          <span className="text-accent">&gt;</span>{" "}
          <span>{typed}</span>
          <span className="blink-cursor ml-0.5 inline-block text-accent">_</span>
        </div>
      </div>
    </div>
  );
}
