export function ProjectInquiry({ locale = "de" }: { locale?: "de" | "en" }) {
  return (
    <aside className="border-line mt-16 border-t pt-10">
      <p className="text-accent font-mono text-xs tracking-[0.14em] uppercase">{locale === "en" ? "[ your idea ]" : "[ deine idee ]"}</p>
      <h2 className="mt-4 text-2xl font-semibold">{locale === "en" ? "Have something similar in mind?" : "Du hast etwas Ähnliches vor?"}</h2>
      <p className="text-muted mt-3 max-w-xl">
        {locale === "en" ? "Tell me what your website or app should do. We can work out together what scope suits your project." : "Erzähl mir, was deine Website oder Anwendung können soll. Wir klären gemeinsam, welcher Umfang zu deinem Vorhaben passt."}
      </p>
      {/* Native navigation keeps cross-page anchor links reliable. */}
      <a href={locale === "en" ? "/en/#kontakt" : "/#kontakt"} className="button-primary mt-6">
        {locale === "en" ? "Start a project" : "Projekt anfragen"} <span aria-hidden="true">↗</span>
      </a>
    </aside>
  );
}
