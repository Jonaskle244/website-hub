import Link from "next/link";
import { operator } from "@/lib/operator";

export function OperatorAddress() {
  return (
    <address>
      {operator.firmierung} – Inhaber: {operator.inhaber}
      <br />
      {operator.strasse}
      <br />
      {operator.plzOrt}
      <br />
      {operator.land}
      <br />
      <a href={`mailto:${operator.email}`}>{operator.email}</a>
    </address>
  );
}

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <Link href="/" className="text-muted hover:text-accent font-mono text-xs">
        ← Zur Startseite
      </Link>
      <h1 className="mt-8 text-4xl font-semibold">{title}</h1>
      <p className="text-muted mt-4 font-mono text-xs">
        codemantix.com · Stand: 20. September 2026
      </p>
      <div className="legal-copy mt-10 leading-relaxed">{children}</div>
    </main>
  );
}
