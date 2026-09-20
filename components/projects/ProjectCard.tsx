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
      className={`group border-line bg-surface relative flex flex-col overflow-hidden rounded-sm border transition-[transform,border-color,box-shadow] duration-500 ${ease} hover:border-accent/45 hover:-translate-y-1 hover:shadow-[0_26px_70px_-26px_rgba(109,124,255,0.35)]`}
    >
      <div className="border-line bg-base relative aspect-[16/9] overflow-hidden border-b">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.cover}
          alt={`${project.titel} — Cover`}
          className="h-full w-full object-cover object-top opacity-90 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Sucher-Eckwinkel (Effekt 04) */}
        <span
          className={`border-line-2 pointer-events-none absolute top-4 left-4 z-10 h-5 w-5 border-t-2 border-l-2 transition-all duration-500 ${ease} group-hover:border-accent group-hover:top-2.5 group-hover:left-2.5 group-hover:h-7 group-hover:w-7`}
        />
        <span
          className={`border-line-2 pointer-events-none absolute top-4 right-4 z-10 h-5 w-5 border-t-2 border-r-2 transition-all duration-500 ${ease} group-hover:border-accent group-hover:top-2.5 group-hover:right-2.5 group-hover:h-7 group-hover:w-7`}
        />
        <span
          className={`border-line-2 pointer-events-none absolute bottom-4 left-4 z-10 h-5 w-5 border-b-2 border-l-2 transition-all duration-500 ${ease} group-hover:border-accent group-hover:bottom-2.5 group-hover:left-2.5 group-hover:h-7 group-hover:w-7`}
        />
        <span
          className={`border-line-2 pointer-events-none absolute right-4 bottom-4 z-10 h-5 w-5 border-r-2 border-b-2 transition-all duration-500 ${ease} group-hover:border-accent group-hover:right-2.5 group-hover:bottom-2.5 group-hover:h-7 group-hover:w-7`}
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between font-mono text-xs">
          <span className="text-faint">{`// projekt_${nn}`}</span>
          <span className="text-muted">
            {STATUS_LABEL[project.status]} · {project.jahr}
          </span>
        </div>

        <h3 className="text-fg group-hover:text-accent text-xl font-semibold tracking-tight transition-colors">
          {project.titel}
        </h3>
        <p className="text-muted mt-2 text-sm leading-[1.55]">{project.tagline}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="border-line-2 text-muted group-hover:border-accent/30 rounded-sm border px-2 py-0.5 font-mono text-[11px] transition-colors duration-500"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
