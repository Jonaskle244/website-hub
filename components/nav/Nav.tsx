import Link from "next/link";
import { LanguageSwitch } from "./LanguageSwitch";


/**
 * Nav-Shell (Strang F2 + Motion-Konzept Effekt 02b). Logo = animiertes
 * `[c]`-SVG-Mark (Klammern ploppen beim Laden, das C zeichnet sich, Hover
 * spreizt die Klammern) + Mono-Wortmarke. Leistungen und Kontakt liegen auf Home.
 */
export function Nav({ locale }: { locale: "de" | "en" }) {
  const base = locale === "en" ? "/en/" : "/";
  const links = [
    { href: `${base}projekte/`, label: locale === "en" ? "Projects" : "Projekte" },
    { href: `${base}#leistungen`, label: locale === "en" ? "Services" : "Leistungen" },
  ];
  return (
    <header className="border-line bg-base/70 sticky top-0 z-50 border-b backdrop-blur">
      <nav className="mx-auto flex min-h-16 max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-6 py-3">
        <Link href={base} className="logo flex items-center gap-3.5" aria-label="Codemantix">
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
          <span className="text-accent font-mono text-xs font-medium tracking-[0.2em] sm:text-[15px] sm:tracking-[0.3em]">
            CODEMANTIX
          </span>
        </Link>
        <ul className="text-muted flex flex-wrap items-center gap-x-4 gap-y-0 font-mono text-xs tracking-[0.04em] uppercase sm:gap-x-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="hover:text-fg inline-flex min-h-10 items-center transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <LanguageSwitch locale={locale} />
          <li>
            {/* Native navigation avoids duplicated hash fragments in the static App Router. */}
            <a
              href={`${base}#kontakt`}
              className="border-accent/50 text-accent hover:bg-accent inline-flex min-h-10 items-center rounded-sm border px-3 transition-colors hover:text-[#0a0c10]"
            >
              <span className="sm:hidden">{locale === "en" ? "Contact" : "Anfragen"}</span>
              <span className="hidden sm:inline">{locale === "en" ? "Start a project" : "Projekt anfragen"}</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
