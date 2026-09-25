import type { Metadata } from "next";
import Link from "next/link";
import { ProjectInquiry } from "@/components/ProjectInquiry";
import { notFound } from "next/navigation";
import { getProjectEn, getProjectsEn, STATUS_LABEL_EN } from "@/lib/projects.en";

/**
 * Case-Study-Detail (Strang C3.2). Dynamische Route, statisch exportiert über
 * generateStaticParams. Rendert Header (Meta) + Story-Abschnitte aus `lib/projects.ts`.
 */

export function generateStaticParams() {
  return getProjectsEn().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectEn(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.titel,
    alternates: { canonical: `/en/projekte/${slug}/`, languages: { de: `/projekte/${slug}/`, en: `/en/projekte/${slug}/` } },
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

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectEn(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24">
      <Link
        href="/en/projekte/"
        className="text-muted hover:text-accent font-mono text-xs transition-colors"
      >
        ← projects
      </Link>

      {/* Header */}
      <header className="border-line mt-8 border-b pb-10">
        <p className="text-muted mb-5 font-mono text-xs tracking-[0.14em] uppercase">
          <span className="text-accent">[</span> {STATUS_LABEL_EN[project.status]} · {project.jahr}{" "}
          <span className="text-accent">]</span>
        </p>
        <h1 className="text-fg text-4xl leading-[1.1] font-semibold tracking-[-0.03em] sm:text-5xl">
          {project.titel}
        </h1>
        <p className="text-muted mt-5 max-w-xl text-lg leading-[1.55]">{project.tagline}</p>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:gap-12">
          <div>
            <p className="text-faint mb-1 font-mono text-xs uppercase">Role</p>
            <p className="text-fg text-sm">{project.rolle}</p>
          </div>
          <div>
            <p className="text-faint mb-2 font-mono text-xs uppercase">Stack</p>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="border-line-2 text-muted rounded-sm border px-2 py-0.5 font-mono text-[11px]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {project.links.length > 0 && (
          <div className="mt-8">
            <p className="text-faint mb-2 font-mono text-xs uppercase">Website</p>
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
                    className="group bg-accent inline-flex max-w-full flex-wrap items-center gap-2.5 rounded-sm px-5 py-2.5 font-mono text-sm text-[#0a0c10] transition-[transform,filter] duration-300 hover:-translate-y-0.5 hover:brightness-110"
                  >
                    <span>Visit website</span>
                    <span className="text-faint">·</span>
                    <span className="break-all opacity-80">{link.label}</span>
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
                    className="border-line-2 text-fg hover:border-accent hover:text-accent inline-flex items-center rounded-sm border px-4 py-2.5 font-mono text-sm transition-colors"
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
        className="reveal border-line bg-base mt-10 overflow-hidden rounded-sm border"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.cover}
          alt={`${project.titel} — cover`}
          className="aspect-[16/9] w-full object-cover object-top"
        />
      </div>

      {/* Story */}
      <article className="mt-12">
        <p className="text-fg text-lg leading-[1.6]">{project.intro}</p>

        {project.sections.map((section, i) => (
          <section key={section.title} data-reveal className="reveal mt-12">
            <h2 className="text-accent mb-4 font-mono text-sm tracking-[0.1em] uppercase">
              <span className="text-faint">{`0${i + 1} · `}</span>
              {section.title}
            </h2>
            {section.body.map((para, j) => (
              <p key={j} className="text-muted mt-4 leading-[1.6]">
                {para}
              </p>
            ))}
            {section.image && (
              <figure className="border-line mt-6 overflow-hidden rounded-sm border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={section.image.src}
                  alt={section.image.alt}
                  className="aspect-[16/9] w-full object-cover object-top"
                />
                {section.image.caption && (
                  <figcaption className="border-line bg-surface text-faint border-t px-4 py-2 font-mono text-xs">
                    {section.image.caption}
                  </figcaption>
                )}
              </figure>
            )}
          </section>
        ))}

        <div data-reveal className="reveal border-line mt-12 border-t pt-8">
          <p className="text-muted mb-2 font-mono text-xs tracking-[0.14em] uppercase">
            <span className="text-accent">[</span> outcome <span className="text-accent">]</span>
          </p>
          <p className="text-fg leading-[1.6]">{project.ergebnis}</p>
        </div>
      </article>
      <ProjectInquiry locale="en" />
    </main>
  );
}
