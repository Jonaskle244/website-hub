import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";
import { operator } from "@/lib/operator";

export const metadata: Metadata = {
  title: "Webdesign in Lügde & Umgebung",
  description:
    "Websites für Betriebe aus Lügde, Bad Pyrmont, Blomberg und Umgebung: neue Website, Überarbeitung, Pflege und Google-Unternehmensprofil. Persönlich vor Ort, ein fester Ansprechpartner.",
  alternates: { canonical: "/webdesign-luegde/" },
};

const LOCAL_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Anfrage · Website aus der Region")}&body=${encodeURIComponent(
  "Hallo Jonas,\n\nmein Betrieb:\n\nunsere bestehende Website (falls vorhanden):\n\nDas wünsche ich mir:\n\nSo erreichen Sie mich am besten:\n\nViele Grüße\n",
)}`;

const places = [
  "Lügde",
  "Bad Pyrmont",
  "Blomberg",
  "Schieder-Schwalenberg",
  "Barntrup",
  "Horn-Bad Meinberg",
];

const services = [
  {
    title: "Neue Website",
    text: "Individuell gestaltet statt Baukasten-Vorlage. Schnell geladen, auf dem Handy gut bedienbar und mit allem, was Ihre Kunden suchen: Leistungen, Öffnungszeiten, Kontakt und Anfahrt.",
  },
  {
    title: "Website überarbeiten",
    text: "Ihre Seite ist in die Jahre gekommen oder sieht auf dem Handy schlecht aus? Ich zeige Ihnen konkret, was hakt, und verbessere gezielt oder baue neu.",
  },
  {
    title: "Website-Pflege",
    text: "Neue Texte und Bilder, geänderte Öffnungszeiten, Urlaubshinweise, Stellenanzeigen. Sie geben kurz Bescheid, ich kümmere mich. Technik und Sicherheit behalte ich im Blick.",
  },
  {
    title: "Google-Unternehmensprofil",
    text: "Damit Kunden Sie bei Google und in Maps finden: Ich richte Ihr Profil ein oder bringe es auf Stand und halte Öffnungszeiten, Fotos und Beiträge aktuell.",
  },
];

const steps = [
  {
    title: "Kennenlernen vor Ort",
    text: "Ich komme bei Ihnen vorbei, schaue mir Betrieb und bestehenden Auftritt an und höre zu, was Sie brauchen.",
  },
  {
    title: "Festpreis",
    text: "Sie bekommen ein klares Angebot: was dazugehört, was es kostet und wann es fertig ist.",
  },
  {
    title: "Entwurf und Umsetzung",
    text: "Sie sehen früh, wie die Seite aussehen wird. Erst wenn der Entwurf passt, baue ich die Details aus.",
  },
  {
    title: "Online und gepflegt",
    text: "Ich stelle die Seite online und halte sie auf Wunsch aktuell. Sie haben weiter denselben Ansprechpartner.",
  },
];

const faq = [
  {
    q: "Was kostet eine Website?",
    a: "Das hängt vom Umfang ab. Nach dem ersten Gespräch bekommen Sie einen Festpreis, ohne Stundenzettel und ohne Überraschungen. Die Pflege gibt es als kleines Monatspaket. Ich bin Kleinunternehmer nach § 19 UStG, deshalb kommt keine Umsatzsteuer dazu.",
  },
  {
    q: "Wir haben schon eine Website. Muss alles neu?",
    a: "Nein. Oft reichen gezielte Verbesserungen, zum Beispiel an der Handy-Ansicht, an den Texten oder an der Ladezeit. Ich sage Ihnen ehrlich, ob sich Überarbeiten oder Neubauen mehr lohnt.",
  },
  {
    q: "Kann ich die Seite selbst ändern?",
    a: "Das müssen Sie nicht. Kurze Nachricht oder Anruf genügt, ich setze Änderungen um. Wer lieber selbst Hand anlegt, bekommt eine Lösung, bei der das einfach geht. Das klären wir vorher.",
  },
  {
    q: "Wie lange dauert es?",
    a: "Eine typische Website für einen Betrieb steht nach wenigen Wochen, wenn Texte und Bilder da sind. Wenn Ihnen Texte oder Fotos fehlen, helfe ich dabei.",
  },
  {
    q: "Warum jemand aus der Region?",
    a: "Weil Sie einen festen Ansprechpartner haben, den Sie auch persönlich treffen können. Ich kenne die Gegend und weiß, wonach Ihre Kunden hier suchen.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: operator.firmierung,
  url: "https://codemantix.com/webdesign-luegde/",
  email: CONTACT_EMAIL,
  telephone: "+49 1514 1246440",
  founder: { "@type": "Person", name: operator.inhaber },
  address: {
    "@type": "PostalAddress",
    postalCode: "32676",
    addressLocality: "Lügde",
    addressCountry: "DE",
  },
  areaServed: places.map((name) => ({ "@type": "City", name })),
  knowsAbout: ["Webdesign", "Website-Erstellung", "Website-Pflege", "Google-Unternehmensprofil"],
};

/**
 * Lokale Seite für „Codemantix Lokal“: Betriebe aus Lügde und Umgebung, Sie-Form.
 * Zielseite für das Google-Unternehmensprofil, Briefe und persönliche Besuche.
 */
export default function WebdesignLuegdePage() {
  return (
    <main id="inhalt" className="mx-auto w-full max-w-5xl px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="py-16 sm:py-20">
        <p className="h-anim h-eyebrow text-accent mb-6 font-mono text-xs tracking-[0.28em] uppercase">
          [ webdesign · lügde & umgebung ]
        </p>
        <h1 className="h-anim h-title text-fg max-w-4xl text-4xl leading-[1.08] font-semibold tracking-[-0.03em] sm:text-5xl lg:text-[3.4rem]">
          Ihre Website aus Lügde. Gebaut und gepflegt von jemandem aus der Region.
        </h1>
        <p className="h-anim h-sub text-muted mt-6 max-w-2xl text-lg leading-relaxed">
          Ich baue Websites für Handwerksbetriebe, Praxen, Geschäfte und Vereine. Danach kümmere ich
          mich darum, dass Seite und Google-Eintrag aktuell bleiben. Persönlich, mit festem
          Ansprechpartner statt Agentur-Hotline.
        </p>
        <div className="h-anim h-cta mt-8 flex flex-wrap gap-3">
          <a href={PHONE_HREF} className="button-primary">
            Anrufen: {PHONE_DISPLAY}
          </a>
          <a href={LOCAL_MAILTO} className="button-secondary">
            Per E-Mail anfragen
          </a>
        </div>

        <div className="border-line mt-14 border-t pt-6">
          <p className="text-muted font-mono text-xs tracking-[0.04em] uppercase">
            Ich komme zu Ihnen nach
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {places.map((place) => (
              <li
                key={place}
                className="border-line bg-surface text-fg rounded-sm border px-3 py-1.5 text-sm"
              >
                {place}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="leistungen"
        aria-labelledby="leistungen-heading"
        className="border-line border-t py-16"
      >
        <div data-reveal className="reveal">
          <p className="section-label">[ 01 · leistungen ]</p>
          <h2 id="leistungen-heading" className="mt-4 text-3xl font-semibold">
            Alles aus einer Hand.
          </h2>
          <p className="text-muted mt-4 max-w-2xl">
            Eine Website hilft nur, wenn sie aktuell ist und gefunden wird. Deshalb gehören Pflege
            und Google-Profil bei mir dazu.
          </p>
        </div>
        <div className="border-line bg-line mt-8 grid gap-px overflow-hidden rounded-sm border md:grid-cols-2">
          {services.map((service, i) => (
            <div key={service.title} data-reveal className="reveal bg-surface p-6">
              <p className="text-accent font-mono text-xs">{`// 0${i + 1}`}</p>
              <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
              <p className="text-muted mt-3 text-sm leading-relaxed">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="ablauf" aria-labelledby="ablauf-heading" className="border-line border-t py-16">
        <div data-reveal className="reveal">
          <p className="section-label">[ 02 · ablauf ]</p>
          <h2 id="ablauf-heading" className="mt-4 text-3xl font-semibold">
            So arbeiten wir zusammen.
          </h2>
        </div>
        <ol className="mt-10 grid gap-8 md:grid-cols-4 md:gap-6">
          {steps.map((step, i) => (
            <li key={step.title} data-reveal className="reveal border-line border-t pt-5">
              <p className="text-accent font-mono text-xs">{`0${i + 1}`}</p>
              <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
              <p className="text-muted mt-3 text-sm leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="proben-heading" className="border-line border-t py-16">
        <div data-reveal className="reveal grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div>
            <p className="section-label">[ 03 · arbeitsproben ]</p>
            <h2 id="proben-heading" className="mt-4 text-3xl font-semibold">
              Was ich baue.
            </h2>
          </div>
          <div className="text-muted space-y-4">
            <p>
              Von der schlichten Firmenseite bis zur Anwendung mit Ticketverkauf und Einlass per
              QR-Code. Eine Auswahl eigener Projekte können Sie direkt ausprobieren.
            </p>
            <Link href="/projekte/" className="button-secondary">
              Projekte ansehen
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="border-line border-t py-16">
        <div data-reveal className="reveal">
          <p className="section-label">[ 04 · fragen ]</p>
          <h2 id="faq-heading" className="mt-4 text-3xl font-semibold">
            Häufige Fragen.
          </h2>
        </div>
        <div className="border-line mt-8 border-t">
          {faq.map((item) => (
            <details key={item.q} className="border-line group border-b">
              <summary className="text-fg hover:text-accent flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium">
                {item.q}
                <span
                  className="text-accent font-mono transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="text-muted max-w-3xl pb-6 text-sm leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section
        id="kontakt"
        aria-labelledby="kontakt-heading"
        className="border-accent/30 bg-surface mb-16 rounded-sm border p-6 sm:p-10"
      >
        <p className="section-label">[ 05 · kontakt ]</p>
        <div className="mt-4 grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-12">
          <div>
            <h2 id="kontakt-heading" className="text-3xl font-semibold">
              Sollen wir uns kennenlernen?
            </h2>
            <p className="text-muted mt-4">
              Rufen Sie an oder schreiben Sie kurz, worum es geht. Ich melde mich und komme gern bei
              Ihnen vorbei. Das erste Gespräch ist unverbindlich.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={PHONE_HREF} className="button-primary">
                {PHONE_DISPLAY}
              </a>
              <a href={LOCAL_MAILTO} className="button-secondary">
                E-Mail schreiben
              </a>
            </div>
            <p className="mt-4 text-sm">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-muted decoration-line-2 hover:text-fg underline underline-offset-4"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
          <div className="border-line border-t pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
            <h3 className="text-fg text-base font-medium">Hinter Codemantix</h3>
            <p className="text-muted mt-4 text-sm leading-relaxed">
              Ich bin Jonas Kleinsorge, Softwareentwickler aus Lügde im Kreis Lippe. Unter
              Codemantix baue ich Websites und Web-Apps, und zwar selbst: Wer mit mir spricht,
              spricht mit dem, der die Seite auch baut.
            </p>
            <p className="text-muted mt-3 text-xs">
              Wie ich Ihre Angaben verarbeite:{" "}
              <a href="/datenschutz/#kontakt" className="underline underline-offset-4">
                Datenschutz
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
