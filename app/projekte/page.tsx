import type { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

export const metadata: Metadata = {
  title: "Projekte — Codemantix",
  description: "Ausgewählte Projekte von Codemantix: Web, Games, 3D.",
};

/**
 * Projekt-Übersicht (Strang C3.1). Karten-Grid, liest `lib/projects.ts`.
 * Skaliert mit der Anzahl — zum Start ein Eintrag (Cloudframe).
 */
export default function ProjektePage() {
  const projects = getProjects();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-24">
      <p className="mb-5 font-mono text-xs tracking-[0.14em] text-muted uppercase">
        <span className="text-accent">[</span> projekte{" "}
        <span className="text-accent">]</span>
      </p>
      <h1 className="max-w-3xl text-4xl leading-[1.1] font-semibold tracking-[-0.03em] text-fg sm:text-5xl">
        Ausgewählte Arbeit
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-[1.55] text-muted">
        Projekte, die ich von der Idee bis zum Deploy selbst gebaut habe.
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
