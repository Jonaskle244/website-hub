import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects, STATUS_LABEL } from "@/lib/projects";

/**
 * Case-Study-Detail (Strang C3.2). Dynamische Route, statisch exportiert über
 * generateStaticParams. Rendert Header (Meta) + Story-Abschnitte aus `lib/projects.ts`.
 */

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Projekt nicht gefunden" };
  return {
    title: project.titel,
    description: project.tagline,
    openGraph: {
      title: `${project.titel} — Codemantix`,
      description: project.tagline,
      images: [{ url: project.cover, alt: project.titel }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.titel} — Codemantix`,
      description: project.tagline,
      images: [project.cover],
    },
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24">
      <Link
        href="/projekte"
        className="font-mono text-xs text-muted transition-colors hover:text-accent"
      >
        ← projekte
      </Link>

      {/* Header */}
      <header className="mt-8 border-b border-line pb-10">
        <p className="mb-5 font-mono text-xs tracking-[0.14em] text-muted uppercase">
          <span className="text-accent">[</span> {STATUS_LABEL[project.status]} ·{" "}
          {project.jahr} <span className="text-accent">]</span>
        </p>
        <h1 className="text-4xl leading-[1.1] font-semibold tracking-[-0.03em] text-fg sm:text-5xl">
          {project.titel}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-[1.55] text-muted">
          {project.tagline}
        </p>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:gap-12">
          <div>
            <p className="mb-1 font-mono text-xs text-faint uppercase">Rolle</p>
            <p className="text-sm text-fg">{project.rolle}</p>
          </div>
          <div>
            <p className="mb-2 font-mono text-xs text-faint uppercase">Stack</p>
            <ul className="flex flex-wrap gap-2">
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
        </div>

        {project.links.length > 0 && (
          <div className="mt-8">
            <p className="mb-2 font-mono text-xs text-faint uppercase">
              Website
            </p>
            <div className="flex flex-wrap gap-3">
              {project.links.map((link, i) =>
                i === 0 ? (
                  // Primärer Link = gefüllter CTA (wie der Hero-Button) —
                  // eindeutig als „hier geht's zur Seite" lesbar.
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 rounded-sm bg-accent px-5 py-2.5 font-mono text-sm text-[#0a0c10] transition-[transform,filter] duration-300 hover:-translate-y-0.5 hover:brightness-110"
                  >
                    <span>Website ansehen</span>
                    <span className="text-faint">·</span>
                    <span className="opacity-80">{link.label}</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      ↗
                    </span>
                  </a>
                ) : (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-sm border border-line-2 px-4 py-2.5 font-mono text-sm text-fg transition-colors hover:border-accent hover:text-accent"
                  >
                    {link.label} ↗
                  </a>
                ),
              )}
            </div>
          </div>
        )}
      </header>

      {/* Cover */}
      <div
        data-reveal
        className="reveal mt-10 overflow-hidden rounded-sm border border-line bg-base"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.cover}
          alt={`${project.titel} — Cover`}
          className="aspect-[16/9] w-full object-cover"
        />
      </div>

      {/* Story */}
      <article className="mt-12">
        <p className="text-lg leading-[1.6] text-fg">{project.intro}</p>

        {project.sections.map((section, i) => (
          <section key={section.title} data-reveal className="reveal mt-12">
            <h2 className="mb-4 font-mono text-sm tracking-[0.1em] text-accent uppercase">
              <span className="text-faint">{`0${i + 1} · `}</span>
              {section.title}
            </h2>
            {section.body.map((para, j) => (
              <p key={j} className="mt-4 leading-[1.6] text-muted">
                {para}
              </p>
            ))}
            {section.image && (
              <figure className="mt-6 overflow-hidden rounded-sm border border-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={section.image.src}
                  alt={section.image.alt}
                  className="aspect-[16/9] w-full object-cover"
                />
                {section.image.caption && (
                  <figcaption className="border-t border-line bg-surface px-4 py-2 font-mono text-xs text-faint">
                    {section.image.caption}
                  </figcaption>
                )}
              </figure>
            )}
          </section>
        ))}

        <div data-reveal className="reveal mt-12 border-t border-line pt-8">
          <p className="mb-2 font-mono text-xs tracking-[0.14em] text-muted uppercase">
            <span className="text-accent">[</span> ergebnis{" "}
            <span className="text-accent">]</span>
          </p>
          <p className="leading-[1.6] text-fg">{project.ergebnis}</p>
        </div>
      </article>
    </main>
  );
}
