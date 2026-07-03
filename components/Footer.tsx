/**
 * Footer (Strang C4, reduziert) — Kontakt = nur E-Mail `info@codemantix.com`.
 * Keine eigene Kontakt- und keine Über-mich-Seite (mit Jonas entschieden 2026-07-03).
 */
export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logomark.png"
            alt="Codemantix"
            className="h-5 w-5 object-contain opacity-80"
          />
          <span className="font-mono text-xs tracking-tight text-faint">
            codemantix
          </span>
        </div>
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
