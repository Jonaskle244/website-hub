import Link from "next/link";
import { operator } from "@/lib/operator";

export function OperatorAddress({ locale = "de" }: { locale?: "de" | "en" }) {
  return (
    <address>
      {operator.firmierung} – {locale === "en" ? "Owner" : "Inhaber"}: {operator.inhaber}
      <br />
      {operator.strasse}
      <br />
      {operator.plzOrt}
      <br />
      {locale === "en" ? "Germany" : operator.land}
      <br />
      <a href={`mailto:${operator.email}`}>{operator.email}</a>
    </address>
  );
}

export function LegalPage({ title, children, locale = "de" }: { title: string; children: React.ReactNode; locale?: "de" | "en" }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <Link href={locale === "en" ? "/en/" : "/"} className="text-muted hover:text-accent font-mono text-xs">
        {locale === "en" ? "← Back to home" : "← Zur Startseite"}
      </Link>
      <h1 className="mt-8 text-4xl font-semibold">{title}</h1>
      <p className="text-muted mt-4 font-mono text-xs">
        codemantix.com · {locale === "en" ? "Updated: 20 September 2026" : "Stand: 20. September 2026"}
      </p>
      <div className="legal-copy mt-10 leading-relaxed">{children}</div>
    </main>
  );
}
