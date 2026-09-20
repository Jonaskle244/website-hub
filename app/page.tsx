import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import { CONTACT_EMAIL, CONTACT_FORM, PROJECT_MAILTO } from "@/lib/contact";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { DecodeText } from "@/components/motion/DecodeText";
import { HeroPanel } from "@/components/motion/HeroPanel";

const services = [
  {
    title: "Deine neue Website",
    text: "Ein eigener Auftritt für dein Unternehmen, dein Angebot oder deine Idee. Individuell gestaltet und auf Handy wie Desktop gut bedienbar.",
    detail: "Konzept · Gestaltung · Entwicklung · Veröffentlichung",
  },
  {
    title: "Deine Website, besser",
    text: "Die mobile Ansicht hakt, Inhalte sind schwer zu finden oder eine Funktion fehlt? Ich schaue mir den Bestand an und setze gezielte Verbesserungen um.",
    detail: "Bestandsprüfung · Design · Bedienung · Frontend",
  },
  {
    title: "Deine Idee als Web-App",
    text: "Ein interaktives Werkzeug, ein Dashboard oder eine Anwendung im Browser. Ich entwickle die Oberfläche und passende Funktionen für deinen konkreten Anwendungsfall.",
    detail: "React · TypeScript · Schnittstellen · Interaktion",
  },
];

const steps = [
  {
    title: "Idee & Umfang",
    text: "Du beschreibst dein Vorhaben. Wir klären Ziel, vorhandene Technik und den gewünschten Zeitraum. Darauf baut mein Angebot auf.",
  },
  {
    title: "Entwurf & Umsetzung",
    text: "Du siehst früh, wie dein Projekt aussehen und funktionieren soll. Wir stimmen den Entwurf ab, bevor ich die Details ausarbeite.",
  },
  {
    title: "Prüfung & Übergabe",
    text: "Ich prüfe die vereinbarten Funktionen und die Darstellung auf Handy und Desktop. Danach folgen Veröffentlichung und eine verständliche Übergabe.",
  },
];

export default function Home() {
  return (
    <main id="inhalt" className="mx-auto w-full max-w-5xl px-6">
      <section className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_300px] lg:gap-12">
        <div className="flex items-stretch gap-4 sm:gap-8">
          <div
            aria-hidden="true"
            className="h-brk h-brk-l border-accent hidden w-4 flex-none self-stretch border-2 border-r-0 sm:block sm:w-5"
          />
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <p className="h-anim h-eyebrow text-accent mb-6 font-mono text-xs tracking-[0.28em] uppercase">
              [ <DecodeText text="CODEMANTIX" /> ]
            </p>
            <h1 className="h-anim h-title text-fg text-4xl leading-[1.08] font-semibold tracking-[-0.03em] sm:text-5xl lg:text-[3.4rem]">
              Websites & Web-Apps mit eigener Handschrift.
            </h1>
            <p className="h-anim h-sub text-muted mt-6 max-w-xl text-lg leading-relaxed">
              Ich bin Jonas. Ich gestalte und entwickle individuelle Websites und interaktive
              Anwendungen – von deiner ersten Idee bis zur Veröffentlichung.
            </p>
            <div className="h-anim h-cta mt-8 flex flex-wrap gap-3">
              <a href="#kontakt" className="button-primary">
                Projekt anfragen <span aria-hidden="true">↗</span>
              </a>
              <Link href="/projekte/" className="button-secondary">
                Projekte ansehen
              </Link>
            </div>
          </div>
        </div>
        <div className="h-anim h-panel hidden lg:block">
          <HeroPanel />
        </div>
      </section>

      <section aria-labelledby="projekte-heading" className="border-line border-t py-16">
        <div data-reveal className="reveal mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="section-label">[ 01 · ausgewählte projekte ]</p>
            <h2 id="projekte-heading" className="mt-4 text-3xl font-semibold">
              Ideen, die du ausprobieren kannst.
            </h2>
            <p className="text-muted mt-3">
              Eigene Projekte. Von mir konzipiert, gestaltet und entwickelt.
            </p>
          </div>
          <Link
            href="/projekte/"
            className="text-muted hover:text-accent shrink-0 py-3 font-mono text-xs"
          >
            Alle →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getFeaturedProjects().map((project) => (
            <div key={project.slug} data-reveal className="reveal flex [&>a]:w-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>

      <section
        id="leistungen"
        aria-labelledby="leistungen-heading"
        className="border-line border-t py-16"
      >
        <div data-reveal className="reveal">
          <p className="section-label">[ 02 · leistungen ]</p>
          <h2 id="leistungen-heading" className="mt-4 text-3xl font-semibold">
            Was ich für dich bauen kann.
          </h2>
          <p className="text-muted mt-4 max-w-2xl">
            Ein neuer Auftritt oder eine konkrete Verbesserung: Wir legen vorher fest, was gebraucht
            wird und was zum Auftrag gehört.
          </p>
        </div>
        <div className="border-line bg-line mt-8 grid gap-px overflow-hidden rounded-sm border md:grid-cols-3">
          {services.map((service, i) => (
            <div key={service.title} data-reveal className="reveal bg-surface flex flex-col p-6">
              <p className="text-accent font-mono text-xs">{`// 0${i + 1}`}</p>
              <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>
              <p className="text-muted mt-4 flex-1 text-sm leading-relaxed">{service.text}</p>
              <p className="border-line text-muted mt-6 border-t pt-4 font-mono text-[11px] leading-relaxed">
                {service.detail}
              </p>
            </div>
          ))}
        </div>
        <p className="text-muted mt-5 text-sm">
          Bei bestehenden Websites prüfe ich zuerst Technik und Zugänge. Umfang, Preis und Termin
          stimmen wir vor der Umsetzung ab.
        </p>
      </section>

      <section
        id="zusammenarbeit"
        aria-labelledby="jonas-heading"
        className="border-line border-t py-16"
      >
        <div data-reveal className="reveal grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div>
            <p className="section-label">[ 03 · hinter codemantix ]</p>
            <h2 id="jonas-heading" className="mt-4 text-3xl font-semibold">
              Hi, ich bin Jonas.
            </h2>
            <p className="text-accent mt-3 font-mono text-xs">
              Entwickler · Gestalter · dein Ansprechpartner
            </p>
          </div>
          <div className="text-muted space-y-4">
            <p>
              Ich bin Softwareentwickler und mag Projekte, bei denen Gestaltung und Funktion
              zusammenkommen. Unter Codemantix baue ich eigene Websites, interaktive Anwendungen und
              ein Spiel.
            </p>
            <p>
              Bei deinem Projekt sprichst du direkt mit mir. Ich übersetze deine Idee in einen
              verständlichen Entwurf, entwickle die Umsetzung und begleite sie bis zur
              Veröffentlichung.
            </p>
          </div>
        </div>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} data-reveal className="reveal border-line border-t pt-5">
              <p className="text-accent font-mono text-xs">{`0${i + 1}`}</p>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="text-muted mt-3 text-sm leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="kontakt"
        aria-labelledby="kontakt-heading"
        className="border-accent/30 bg-surface mb-16 rounded-sm border p-6 sm:p-10"
      >
        <p className="section-label">[ 04 · deine idee ]</p>
        <div className="mt-4 grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-12">
          <div>
            <h2 id="kontakt-heading" className="text-3xl font-semibold">
              Was möchtest du bauen?
            </h2>
            <p className="text-muted mt-4">
              Eine grobe Idee reicht für den ersten Kontakt. Schreib mir, was du vorhast – ich
              schaue, wie ich dich unterstützen kann.
            </p>
            <a href={PROJECT_MAILTO} className="button-primary mt-6">
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
            <h3 className="text-fg text-base font-medium">Das hilft mir beim Einschätzen:</h3>
            <ul className="text-muted mt-4 space-y-3 text-sm">
              <li>
                <span className="text-accent mr-2">01</span> Deine Idee oder ein Link zur
                bestehenden Website
              </li>
              <li>
                <span className="text-accent mr-2">02</span> Was du umsetzen oder verbessern
                möchtest
              </li>
              <li>
                <span className="text-accent mr-2">03</span> Dein gewünschter Zeitraum
              </li>
            </ul>
            <p className="text-muted mt-6 text-xs leading-relaxed">
              Ohne Mail-App erreichst du mich auch über mein{" "}
              <a href={CONTACT_FORM} className="text-fg underline underline-offset-4">
                Kontaktformular auf Kinokanon ↗
              </a>
              . Die Nachricht geht an dasselbe Postfach.
            </p>
            <p className="text-muted mt-3 text-xs">
              Wie ich deine Angaben verarbeite:{" "}
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
