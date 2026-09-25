"use client";

import { usePathname } from "next/navigation";

export function LanguageSwitch({ locale }: { locale: "de" | "en" }) {
  const pathname = usePathname();
  // The Night Brief starter is an English-only resource outside the portfolio.
  if (pathname.startsWith("/lab/")) return null;
  const other = locale === "de" ? "en" : "de";
  const target = locale === "de" ? `/en${pathname === "/" ? "/" : pathname}` : pathname.replace(/^\/en(?=\/|$)/, "") || "/";

  return (
    <li className="flex items-center gap-1" aria-label={locale === "de" ? "Sprache wählen" : "Choose language"}>
      <span className="text-fg" aria-current="page">{locale.toUpperCase()}</span>
      <span aria-hidden="true">/</span>
      <a
        href={target}
        hrefLang={other}
        lang={other}
        className="hover:text-accent focus-visible:text-accent inline-flex min-h-10 items-center transition-colors"
        aria-label={other === "en" ? "Switch to English" : "Auf Deutsch wechseln"}
        onClick={(event) => {
          if (window.location.hash) event.currentTarget.href = target + window.location.hash;
        }}
      >
        {other.toUpperCase()}
      </a>
    </li>
  );
}
