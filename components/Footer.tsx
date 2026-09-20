import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="border-line border-t">
      <div className="mx-auto flex max-w-5xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="text-fg font-mono text-sm">
            [ codemantix ]
          </Link>
          <p className="text-muted mt-2 text-xs">Jonas Kleinsorge · Design & Entwicklung</p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-muted hover:text-accent py-2 font-mono text-xs"
          >
            {CONTACT_EMAIL}
          </a>
          <nav aria-label="Rechtliche Informationen" className="text-muted flex gap-5 text-xs">
            <Link href="/impressum/" className="hover:text-fg py-2">
              Impressum
            </Link>
            <Link href="/datenschutz/" className="hover:text-fg py-2">
              Datenschutz
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
