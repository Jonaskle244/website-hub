import Link from "next/link";
import { STATUS_LABEL, type Project } from "@/lib/projects";

/**
 * Projektkarte (Strang C3) — Hairline-Border, beim Hover erscheinen Akzent-
 * Klammer-Ecken + leichter Lift (H0-Motiv). Index `// projekt_NN` in Faint-Mono.
 */
export function ProjectCard({ project }: { project: Project }) {
  const nn = String(project.order).padStart(2, "0");

  return (
    <Link
      href={`/projekte/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-sm border border-line bg-surface transition-transform duration-200 hover:-translate-y-0.5"
    >
      {/* Klammer-Ecken (nur bei Hover) */}
      <span className="pointer-events-none absolute top-2 left-2 z-10 h-4 w-4 border-t border-l border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <span className="pointer-events-none absolute right-2 bottom-2 z-10 h-4 w-4 border-r border-b border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-base">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.cover}
          alt={`${project.titel} — Cover`}
          className="h-full w-full object-cover opacity-90 transition-opacity duration-200 group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between font-mono text-xs">
          <span className="text-faint">{`// projekt_${nn}`}</span>
          <span className="text-muted">
            {STATUS_LABEL[project.status]} · {project.jahr}
          </span>
        </div>

        <h3 className="text-xl font-semibold tracking-tight text-fg transition-colors group-hover:text-accent">
          {project.titel}
        </h3>
        <p className="mt-2 text-sm leading-[1.55] text-muted">{project.tagline}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-sm border border-line-2 px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
