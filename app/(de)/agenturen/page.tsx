import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Landingpages für Agenturen",
  description:
    "White-Label-Zuarbeit für Agenturen: Kampagnen-Landingpage aus eurem Figma-Design, erste Version in 5 Werktagen, Festpreis 650 €. Ihr behaltet den Kunden.",
  alternates: { canonical: "/agenturen/" },
};

const AGENCY_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Landingpage-Anfrage · Agentur")}&body=${encodeURIComponent(
  "Hallo Jonas,\n\nAgentur:\n\nLink zum Figma-Design:\n\nAnzahl Sektionen (ungefähr):\n\nTexte und Bilder fertig? (ja / bis wann):\n\nWunschtermin:\n\nViele Grüße\n",
)}`;

const facts = [
  { value: "650 €", label: "Festpreis pro Landingpage" },
  { value: "5 Werktage", label: "bis zur ersten Version" },
  { value: "2", label: "Korrekturrunden inklusive" },
  { value: "0", label: "Kontakt zu euren Kunden" },
];

const steps = [
  {
    title: "Ihr schickt das Material",
    text: "Figma-Link, Texte, Bilder und euren Wunschtermin. Mehr braucht es nicht.",
  },
  {
    title: "Festpreis und Termin",
    text: "Am selben oder nächsten Werktag bekommt ihr Preis und Liefertermin. Kein Stundenzettel, keine Überraschung.",
  },
  {
    title: "Erste Version in 5 Werktagen",
    text: "Gerechnet ab vollständigem Material. Ihr bekommt einen Vorschau-Link mit Passwort, ohne meinen Namen.",
  },
  {
    title: "Zwei Korrekturrunden",
    text: "Ihr sammelt Änderungen in einer Liste, ich setze sie um. Ihr präsentiert die Seite als eure Arbeit.",
  },
  {
    title: "Übergabe in euren Account",
    text: "Code in euer Repository, Veröffentlichung auf eurem Hosting. Die Nutzungsrechte gehen an euch.",
  },
];

const included = [
  "Umsetzung nach Figma für Desktop und Handy",
  "Bis zu 8 Sektionen auf einer Seite",
  "Kontaktformular",
  "Google Tag Manager und Consent-Anbindung",
  "Schnelle Ladezeit, Ziel Lighthouse 90+",
  "Saubere Grundlagen bei Barrierefreiheit und SEO",
];

const excluded = [
  "Hosting und Bereitschaft",
  "Kontakt zu euren Endkunden",
  "Texte und Design: die liefert ihr",
  "WordPress oder Seiten, die der Kunde selbst pflegt",
];

const faq = [
  {
    q: "Mit welcher Technik baust du?",
    a: "Statische Seiten mit Astro: kein Plugin-Zoo, keine Updates, sehr kurze Ladezeiten. Das passt zu Kampagnen-Landingpages, die schnell laden müssen und nicht laufend vom Kunden bearbeitet werden. Gehostet wird dort, wo ihr wollt, zum Beispiel Cloudflare Pages, Netlify oder Vercel.",
  },
  {
    q: "Warum ist die Ladezeit so wichtig?",
    a: "Google bewertet die Zielseite einer Anzeige mit. Eine schnelle, klare Landingpage verbessert die Nutzererfahrung auf der Zielseite und damit Qualitätsfaktor und Klickpreis. Außerdem springen weniger Besucher ab, bevor sie das Angebot sehen.",
  },
  {
    q: "Was kostet es, wenn es mehr wird?",
    a: "Jede weitere Sektion kostet 60 €, Änderungen nach der Abnahme 75 € pro Stunde. Einen größeren Umfang bekommt ihr vorab als Festpreis.",
  },
  {
    q: "Was ist mit Vertraulichkeit?",
    a: "Beim ersten Auftrag schließen wir eine kurze Rahmenvereinbarung mit Verschwiegenheit, Nutzungsrechten und Zahlungsziel. Eure Kunden und Projekte zeige ich nirgends.",
  },
  {
    q: "Wie wird bezahlt?",
    a: "Beim ersten Auftrag 50 % Anzahlung, der Rest bei Übergabe. Ich bin Kleinunternehmer nach § 19 UStG, deshalb kommt keine Umsatzsteuer dazu.",
  },
  {
    q: "Wie viel Kapazität hast du?",
    a: "Ich nehme ein Projekt gleichzeitig an. Dafür hält der Termin. Fragt am besten früh an, wenn ihr eine Kampagne plant.",
  },
];

/**
 * White-Label-Angebot für Agenturen. Bewusst selbst wie eine Kampagnen-
 * Landingpage aufgebaut (Hero, Fakten, Ablauf, Leistung, Proben, FAQ, CTA).
 * Nicht in der Navigation — wird direkt in Bewerbungen/Nachrichten verlinkt.
 */
export default function AgenturenPage() {
  return (
    <main id="inhalt" className="mx-auto w-full max-w-5xl px-6">
      <section className="py-16 sm:py-20">
        <p className="h-anim h-eyebrow text-accent mb-6 font-mono text-xs tracking-[0.28em] uppercase">
          [ für agenturen ]
        </p>
        <h1 className="h-anim h-title text-fg max-w-4xl text-4xl leading-[1.08] font-semibold tracking-[-0.03em] sm:text-5xl lg:text-[3.4rem]">
          Eure Kampagnen-Landingpage. In 5 Werktagen, unter eurem Namen.
        </h1>
        <p className="h-anim h-sub text-muted mt-6 max-w-2xl text-lg leading-relaxed">
          Ihr liefert Figma, Texte und Bilder. Ich setze die Seite um: schnell, sauber und zum
          Festpreis. Ihr behaltet den Kunden, ich bleibe unsichtbar.
        </p>
        <div className="h-anim h-cta mt-8 flex flex-wrap gap-3">
          <a href={AGENCY_MAILTO} className="button-primary">
            Projekt anfragen <span aria-hidden="true">↗</span>
          </a>
          <a href="#ablauf" className="button-secondary">
            So läuft es ab
          </a>
        </div>

        <dl className="border-line bg-line mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm border lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="bg-surface flex flex-col-reverse justify-end p-5">
              <dt className="text-muted mt-2 text-sm">{f.label}</dt>
              <dd className="text-fg text-xl font-semibold tracking-[-0.02em] whitespace-nowrap sm:text-3xl">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="ablauf" aria-labelledby="ablauf-heading" className="border-line border-t py-16">
        <div data-reveal className="reveal">
          <p className="section-label">[ 01 · ablauf ]</p>
          <h2 id="ablauf-heading" className="mt-4 text-3xl font-semibold">
            Von der Figma-Datei zur fertigen Seite.
          </h2>
        </div>
        <ol className="mt-10 grid gap-8 md:grid-cols-5 md:gap-6">
          {steps.map((step, i) => (
            <li key={step.title} data-reveal className="reveal border-line border-t pt-5">
              <p className="text-accent font-mono text-xs">{`0${i + 1}`}</p>
              <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
              <p className="text-muted mt-3 text-sm leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="leistung-heading" className="border-line border-t py-16">
        <div data-reveal className="reveal">
          <p className="section-label">[ 02 · leistung ]</p>
          <h2 id="leistung-heading" className="mt-4 text-3xl font-semibold">
            Was im Festpreis steckt.
          </h2>
        </div>
        <div className="border-line bg-line mt-8 grid gap-px overflow-hidden rounded-sm border md:grid-cols-2">
          <div data-reveal className="reveal bg-surface p-6">
            <h3 className="text-fg text-base font-medium">Immer dabei</h3>
            <ul className="text-muted mt-4 space-y-3 text-sm">
              {included.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-accent" aria-hidden="true">
                    +
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="reveal bg-surface p-6">
            <h3 className="text-fg text-base font-medium">Bewusst nicht dabei</h3>
            <ul className="text-muted mt-4 space-y-3 text-sm">
              {excluded.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-muted" aria-hidden="true">
                    −
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="proben-heading" className="border-line border-t py-16">
        <div data-reveal className="reveal">
          <p className="section-label">[ 03 · arbeitsproben ]</p>
          <h2 id="proben-heading" className="mt-4 text-3xl font-semibold">
            Was ich baue.
          </h2>
          <p className="text-muted mt-4 max-w-2xl">
            Agenturarbeit zeige ich nicht, sie gehört euch. Deshalb hier eigene Arbeiten.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <a
            href="/vesper/"
            data-reveal
            className="reveal border-line bg-surface hover:border-accent group block rounded-sm border p-6 transition-colors"
          >
            <p className="text-accent font-mono text-xs">{"// VESPER"}</p>
            <h3 className="mt-4 text-xl font-semibold">Filmisches Parfumhaus</h3>
            <p className="text-muted mt-3 text-sm leading-relaxed">
              Eine fiktive Marke mit Scrollfilm, zweisprachig und auch auf dem Handy flüssig. Zeigt,
              wie weit eine einzelne Seite gestalterisch gehen kann.
            </p>
            <p className="text-fg group-hover:text-accent mt-5 font-mono text-xs">
              Ansehen <span aria-hidden="true">↗</span>
            </p>
          </a>
          <div data-reveal className="reveal border-line rounded-sm border border-dashed p-6">
            <p className="text-accent font-mono text-xs">{"// diese Seite"}</p>
            <h3 className="mt-4 text-xl font-semibold">Gebaut wie eine Kampagnen-Landingpage</h3>
            <p className="text-muted mt-3 text-sm leading-relaxed">
              Klare Botschaft oben, Fakten, Ablauf, Leistung, Fragen und ein Ziel: eure Anfrage.
              Genau so baue ich eure Seiten, nur in eurem Design.
            </p>
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
        <p className="section-label">[ 05 · anfrage ]</p>
        <div className="mt-4 grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-12">
          <div>
            <h2 id="kontakt-heading" className="text-3xl font-semibold">
              Habt ihr eine Kampagne in Planung?
            </h2>
            <p className="text-muted mt-4">
              Schickt mir den Figma-Link und euren Wunschtermin. Ihr bekommt am selben oder
              nächsten Werktag einen Festpreis.
            </p>
            <a href={AGENCY_MAILTO} className="button-primary mt-6">
              Anfrage per E-Mail <span aria-hidden="true">↗</span>
            </a>
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
              Ich bin Jonas, Softwareentwickler aus Lügde im Kreis Lippe. Unter Codemantix baue
              ich Websites und Web-Apps. Ihr habt einen Ansprechpartner, der die Seite auch selbst
              baut.
            </p>
            <p className="text-muted mt-3 text-xs">
              Wie ich eure Angaben verarbeite:{" "}
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
