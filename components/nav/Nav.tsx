import Link from "next/link";

const links = [{ href: "/projekte", label: "projekte" }];

/**
 * Nav-Shell (Strang F2) — Klammer-Wortmarke `[ codemantix ]` in Mono,
 * Nav-Links als Mono-Meta. Projektfokus: keine Über-mich-/Kontakt-Seite
 * (mit Jonas entschieden 2026-07-03); Kontakt = E-Mail im Footer.
 */
export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="font-mono text-sm tracking-tight">
          <span className="text-accent">[</span>
          <span className="px-1.5 text-fg">codemantix</span>
          <span className="text-accent">]</span>
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
