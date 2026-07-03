/**
 * Footer (Strang C4, reduziert) — Kontakt = nur E-Mail `info@codemantix.com`.
 * Keine eigene Kontakt- und keine Über-mich-Seite (mit Jonas entschieden 2026-07-03).
 */
export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs tracking-tight text-faint">
          <span className="text-accent">[</span>
          <span className="px-1">codemantix</span>
          <span className="text-accent">]</span>
        </p>
        <a
          href="mailto:info@codemantix.com"
          className="font-mono text-xs tracking-[0.14em] text-muted uppercase transition-colors hover:text-accent"
        >
          info@codemantix.com
        </a>
      </div>
    </footer>
  );
}
