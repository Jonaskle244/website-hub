import Link from "next/link";
import { STATUS_LABEL, type Project } from "@/lib/projects";

/**
 * Projektkarte (Strang C3 + Motion-Konzept Effekt 04 „Viewfinder-Hover").
 * Vier Sucher-Eckwinkel liegen dezent auf dem Cover; beim Hover fahren sie in
 * die Ecken, färben sich Akzent, die Karte hebt sich mit Indigo-Glow.
 */
export function ProjectCard({ project }: { project: Project }) {
  const nn = String(project.order).padStart(2, "0");
  const ease = "ease-[cubic-bezier(0.16,0.84,0.44,1)]";

  return (
    <Link
      href={`/projekte/${project.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-sm border border-line bg-surface transition-[transform,border-color,box-shadow] duration-500 ${ease} hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_26px_70px_-26px_rgba(109,124,255,0.35)]`}
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-base">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.cover}
          alt={`${project.titel} — Cover`}
          className="h-full w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Sucher-Eckwinkel (Effekt 04) */}
        <span
          className={`pointer-events-none absolute top-4 left-4 z-10 h-5 w-5 border-t-2 border-l-2 border-line-2 transition-all duration-500 ${ease} group-hover:top-2.5 group-hover:left-2.5 group-hover:h-7 group-hover:w-7 group-hover:border-accent`}
        />
        <span
          className={`pointer-events-none absolute top-4 right-4 z-10 h-5 w-5 border-t-2 border-r-2 border-line-2 transition-all duration-500 ${ease} group-hover:top-2.5 group-hover:right-2.5 group-hover:h-7 group-hover:w-7 group-hover:border-accent`}
        />
        <span
          className={`pointer-events-none absolute bottom-4 left-4 z-10 h-5 w-5 border-b-2 border-l-2 border-line-2 transition-all duration-500 ${ease} group-hover:bottom-2.5 group-hover:left-2.5 group-hover:h-7 group-hover:w-7 group-hover:border-accent`}
        />
        <span
          className={`pointer-events-none absolute right-4 bottom-4 z-10 h-5 w-5 border-r-2 border-b-2 border-line-2 transition-all duration-500 ${ease} group-hover:right-2.5 group-hover:bottom-2.5 group-hover:h-7 group-hover:w-7 group-hover:border-accent`}
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
              className="rounded-sm border border-line-2 px-2 py-0.5 font-mono text-[11px] text-muted transition-colors duration-500 group-hover:border-accent/30"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
