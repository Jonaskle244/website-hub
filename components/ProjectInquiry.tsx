export function ProjectInquiry() {
  return (
    <aside className="border-line mt-16 border-t pt-10">
      <p className="text-accent font-mono text-xs tracking-[0.14em] uppercase">[ deine idee ]</p>
      <h2 className="mt-4 text-2xl font-semibold">Du hast etwas Ähnliches vor?</h2>
      <p className="text-muted mt-3 max-w-xl">
        Erzähl mir, was deine Website oder Anwendung können soll. Wir klären gemeinsam, welcher
        Umfang zu deinem Vorhaben passt.
      </p>
      {/* Native navigation keeps cross-page anchor links reliable. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/#kontakt" className="button-primary mt-6">
        Projekt anfragen <span aria-hidden="true">↗</span>
      </a>
    </aside>
  );
}
