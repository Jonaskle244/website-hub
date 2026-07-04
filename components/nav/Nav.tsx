import Link from "next/link";

const links = [{ href: "/projekte", label: "projekte" }];

/**
 * Nav-Shell (Strang F2 + Motion-Konzept Effekt 02b). Logo = animiertes
 * `[c]`-SVG-Mark (Klammern ploppen beim Laden, das C zeichnet sich, Hover
 * spreizt die Klammern) + Mono-Wortmarke. Projektfokus: keine Über-mich-/
 * Kontakt-Seite; Kontakt = E-Mail im Footer.
 */
export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base/70 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="logo flex items-center gap-3.5"
          aria-label="Codemantix"
        >
          <svg
            className="logo-mark block h-[26px] w-[26px]"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden="true"
          >
            <g className="brk-wrap brk-wrap-l">
              <path
                className="brk-path brk-l"
                d="M34 20 H18 V80 H34"
                stroke="var(--color-accent)"
                strokeWidth="8"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </g>
            <g className="brk-wrap brk-wrap-r">
              <path
                className="brk-path brk-r"
                d="M66 20 H82 V80 H66"
                stroke="var(--color-accent)"
                strokeWidth="8"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </g>
            <path
              className="c-path"
              d="M62 36 L44 36 L34 46 L34 54 L44 64 L62 64"
              stroke="var(--color-accent)"
              strokeWidth="8"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
          <span className="font-mono text-[15px] font-medium tracking-[0.3em] text-accent">
            CODEMANTIX
          </span>
        </Link>
        <ul className="flex items-center gap-6 font-mono text-xs tracking-[0.14em] text-muted uppercase">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors hover:text-fg">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
