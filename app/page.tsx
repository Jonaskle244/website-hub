import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { DecodeText } from "@/components/motion/DecodeText";

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
      {/* Hero — Effekt 01 (Entrance) + 02a (Klammern fahren ein) + 03 (Decode) */}
      <section className="flex min-h-[60vh] items-stretch gap-4 py-24 sm:gap-8">
        <div
          aria-hidden="true"
          className="h-brk h-brk-l hidden w-4 flex-none self-stretch border-2 border-r-0 border-accent sm:block sm:w-5"
        />

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <p className="h-anim h-eyebrow mb-6 font-mono text-xs tracking-[0.28em] text-accent uppercase">
            [ <DecodeText text="CODEMANTIX" /> ]
          </p>

          <h1 className="h-anim h-title max-w-3xl text-5xl leading-[1.02] font-semibold tracking-[-0.03em] text-fg sm:text-6xl">
            Code als Klammer über alles Digitale
          </h1>

          <p className="h-anim h-sub mt-6 max-w-xl text-lg leading-[1.5] text-muted">
            Ich entwerfe und baue Software, Games und Web — von der Idee bis zum
            Deploy.
          </p>

          <div className="h-anim h-cta mt-10">
            <Link
              href="/projekte"
              className="inline-block rounded-sm bg-accent px-5 py-2.5 font-mono text-sm text-[#0a0c10] transition-[transform,filter] duration-300 hover:-translate-y-0.5 hover:brightness-110"
            >
              [ projekte ansehen ]
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="h-brk h-brk-r hidden w-4 flex-none self-stretch border-2 border-l-0 border-accent sm:block sm:w-5"
        />
      </section>

      {/* Ausgewählte Projekte */}
      <section className="border-t border-line py-20">
        <div
          data-reveal
          className="reveal mb-10 flex items-end justify-between"
        >
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
        <div data-reveal className="reveal grid gap-6 sm:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Was ich baue */}
      <section className="border-t border-line py-20">
        <p
          data-reveal
          className="reveal mb-10 font-mono text-xs tracking-[0.14em] text-muted uppercase"
        >
          <span className="text-accent">[</span> 02 · was ich baue{" "}
          <span className="text-accent">]</span>
        </p>
        <div
          data-reveal
          className="reveal grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3"
        >
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
