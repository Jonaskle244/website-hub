import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

/**
 * Home / Landing (Strang C1). Projektfokussiertes Dach — keine Über-mich-/Kontakt-Seite
 * (mit Jonas entschieden 2026-07-03). Copy ist Vorschlag; Abnahme durch Jonas.
 */

const disciplines = [
  {
    tag: "software",
    text: "Werkzeuge und Web-Apps, die ein echtes Problem lösen — sauber gebaut, nicht zusammengeklickt.",
  },
  {
    tag: "games",
    text: "Eigene Spiele von der Mechanik bis zur Optik — mein erstes Projekt entsteht gerade.",
  },
  {
    tag: "web",
    text: "Websites mit eigener Handschrift — Design, Frontend und Deploy aus einer Hand.",
  },
];

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <main className="mx-auto w-full max-w-5xl px-6">
      {/* Hero */}
      <section className="flex min-h-[60vh] flex-col justify-center py-24">
        <p className="mb-6 font-mono text-xs tracking-[0.14em] text-muted uppercase">
          <span className="text-accent">[</span> codemantix{" "}
          <span className="text-accent">]</span>
        </p>

        <h1 className="max-w-3xl text-5xl leading-[1.05] font-semibold tracking-[-0.03em] text-fg sm:text-6xl">
          Code als Klammer über alles Digitale
          <span className="blink-cursor ml-1 inline-block text-accent">_</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-[1.55] text-muted">
          Ich entwerfe und baue Software, Games und Web — von der Idee bis zum
          Deploy.
        </p>

        <div className="mt-10">
          <Link
            href="/projekte"
            className="inline-block rounded-sm bg-accent px-5 py-2.5 font-mono text-sm text-[#0a0c10] transition-colors hover:bg-accent-d"
          >
            [ projekte ansehen ]
          </Link>
        </div>
      </section>

      {/* Ausgewählte Projekte */}
      <section className="border-t border-line py-20">
        <div className="mb-10 flex items-end justify-between">
          <p className="font-mono text-xs tracking-[0.14em] text-muted uppercase">
            <span className="text-accent">[</span> 01 · ausgewählte projekte{" "}
            <span className="text-accent">]</span>
          </p>
          <Link
            href="/projekte"
            className="font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            alle →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Was ich baue */}
      <section className="border-t border-line py-20">
        <p className="mb-10 font-mono text-xs tracking-[0.14em] text-muted uppercase">
          <span className="text-accent">[</span> 02 · was ich baue{" "}
          <span className="text-accent">]</span>
        </p>
        <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
          {disciplines.map((d, i) => (
            <div key={d.tag} className="bg-surface p-6">
              <p className="mb-3 font-mono text-xs text-faint">{`// 0${i + 1}`}</p>
              <h2 className="mb-2 font-mono text-sm tracking-[0.1em] text-accent uppercase">
                [ {d.tag} ]
              </h2>
              <p className="text-sm leading-[1.55] text-muted">{d.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
