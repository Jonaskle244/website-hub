import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/contact";

export function Footer({ locale }: { locale: "de" | "en" }) {
  const base = locale === "en" ? "/en/" : "/";
  return (
    <footer className="border-line border-t">
      <div className="mx-auto flex max-w-5xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href={base} className="text-fg font-mono text-sm">
            [ codemantix ]
          </Link>
          <p className="text-muted mt-2 text-xs">Jonas Kleinsorge · {locale === "en" ? "Design & Development" : "Design & Entwicklung"}</p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-muted hover:text-accent py-2 font-mono text-xs"
          >
            {CONTACT_EMAIL}
          </a>
          <nav aria-label={locale === "en" ? "Legal information" : "Rechtliche Informationen"} className="text-muted flex gap-5 text-xs">
            <Link href={`${base}impressum/`} className="hover:text-fg py-2">
              {locale === "en" ? "Legal notice" : "Impressum"}
            </Link>
            <Link href={`${base}datenschutz/`} className="hover:text-fg py-2">
              {locale === "en" ? "Privacy" : "Datenschutz"}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
