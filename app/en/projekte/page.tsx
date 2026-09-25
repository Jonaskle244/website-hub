import type { Metadata } from "next";
import { getProjectsEn } from "@/lib/projects.en";
import { ProjectCard } from "@/components/projects/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected Codemantix projects in web design, apps and 3D.",
  alternates: { canonical: "/en/projekte/", languages: { de: "/projekte/", en: "/en/projekte/" } },
};

/**
 * Projekt-Übersicht (Strang C3.1). Karten-Grid, liest `lib/projects.ts`.
 * Skaliert mit der Anzahl — zum Start ein Eintrag (Cloudframe).
 */
export default function ProjektePage() {
  const projects = getProjectsEn();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-24">
      <p className="mb-5 font-mono text-xs tracking-[0.14em] text-muted uppercase">
        <span className="text-accent">[</span> projects{" "}
        <span className="text-accent">]</span>
      </p>
      <h1 className="max-w-3xl text-4xl leading-[1.1] font-semibold tracking-[-0.03em] text-fg sm:text-5xl">
        Selected work
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-[1.55] text-muted">
        Projects I built myself, from the first idea to launch.
      </p>

      <div data-reveal className="reveal mt-14 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} locale="en" />
        ))}
      </div>
    </main>
  );
}
