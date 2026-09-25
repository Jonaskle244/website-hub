import Link from "next/link";
import { getFeaturedProjectsEn } from "@/lib/projects.en";
import { CONTACT_EMAIL, CONTACT_FORM_EN, PROJECT_MAILTO_EN } from "@/lib/contact";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { DecodeText } from "@/components/motion/DecodeText";
import { HeroPanel } from "@/components/motion/HeroPanel";

const services = [
  {
    title: "Your new website",
    text: "A distinct online presence for your business, offer or idea. Custom designed and easy to use on both mobile and desktop.",
    detail: "Concept · Design · Development · Launch",
  },
  {
    title: "Improve your website",
    text: "Is the mobile view awkward, is content hard to find, or is a feature missing? I review what is there and make focused improvements.",
    detail: "Site review · Design · Usability · Frontend",
  },
  {
    title: "Your idea as a web app",
    text: "An interactive tool, dashboard or browser app. I build the interface and features around your specific use case.",
    detail: "React · TypeScript · APIs · Interaction",
  },
];

const steps = [
  {
    title: "Idea & scope",
    text: "Tell me about your idea. We clarify the goal, existing technology and preferred timeframe. I then put together a proposal.",
  },
  {
    title: "Design & development",
    text: "You see early on how the project should look and work. We agree on the direction before I develop the details.",
  },
  {
    title: "Review & handover",
    text: "I check the agreed features and mobile and desktop layouts. Then I publish the project and hand it over clearly.",
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
              Websites & web apps with a distinct point of view.
            </h1>
            <p className="h-anim h-sub text-muted mt-6 max-w-xl text-lg leading-relaxed">
              I’m Jonas. I design and develop custom websites and interactive
              applications, from your first idea through launch.
            </p>
            <div className="h-anim h-cta mt-8 flex flex-wrap gap-3">
              <a href="#kontakt" className="button-primary">
                Start a project <span aria-hidden="true">↗</span>
              </a>
              <Link href="/en/projekte/" className="button-secondary">
                Explore projects
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
            <p className="section-label">[ 01 · selected projects ]</p>
            <h2 id="projekte-heading" className="mt-4 text-3xl font-semibold">
              Ideas you can explore.
            </h2>
            <p className="text-muted mt-3">
              Personal projects, conceived, designed and developed by me.
            </p>
          </div>
          <Link
            href="/en/projekte/"
            className="text-muted hover:text-accent shrink-0 py-3 font-mono text-xs"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {getFeaturedProjectsEn().map((project) => (
            <div key={project.slug} data-reveal className="reveal flex [&>a]:w-full">
              <ProjectCard project={project} locale="en" />
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
          <p className="section-label">[ 02 · services ]</p>
          <h2 id="leistungen-heading" className="mt-4 text-3xl font-semibold">
            What I can build for you.
          </h2>
          <p className="text-muted mt-4 max-w-2xl">
            A new site or a focused improvement: we agree on what you need and what the project includes
            before work begins.
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
          For existing websites, I first review the technology and access. We agree on scope, price
          and timing before development begins.
        </p>
      </section>

      <section
        id="zusammenarbeit"
        aria-labelledby="jonas-heading"
        className="border-line border-t py-16"
      >
        <div data-reveal className="reveal grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div>
            <p className="section-label">[ 03 · behind codemantix ]</p>
            <h2 id="jonas-heading" className="mt-4 text-3xl font-semibold">
              Hi, I’m Jonas.
            </h2>
            <p className="text-accent mt-3 font-mono text-xs">
              Developer · Designer · Your point of contact
            </p>
          </div>
          <div className="text-muted space-y-4">
            <p>
              I’m a software developer drawn to projects where design and function work
              together. Under Codemantix, I build my own websites, interactive apps and a game.
            </p>
            <p>
              You work with me directly. I turn your idea into a clear design, build it and
              see it through to launch.
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
        <p className="section-label">[ 04 · your idea ]</p>
        <div className="mt-4 grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-12">
          <div>
            <h2 id="kontakt-heading" className="text-3xl font-semibold">
              What would you like to build?
            </h2>
            <p className="text-muted mt-4">
              A rough idea is enough to get started. Tell me what you have in mind and I’ll
              see how I can help.
            </p>
            <a href={PROJECT_MAILTO_EN} className="button-primary mt-6">
              Enquire by email <span aria-hidden="true">↗</span>
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
            <h3 className="text-fg text-base font-medium">This helps me assess your project:</h3>
            <ul className="text-muted mt-4 space-y-3 text-sm">
              <li>
                <span className="text-accent mr-2">01</span> Your idea or a link to your
                current website
              </li>
              <li>
                <span className="text-accent mr-2">02</span> What you would like to build or
                improve
              </li>
              <li>
                <span className="text-accent mr-2">03</span> Your preferred timeframe
              </li>
            </ul>
            <p className="text-muted mt-6 text-xs leading-relaxed">
              If you do not use a mail app, you can reach me through my{" "}
              <a href={CONTACT_FORM_EN} className="text-fg underline underline-offset-4">
                contact form on Kinokanon ↗
              </a>
              . The message reaches the same inbox.
            </p>
            <p className="text-muted mt-3 text-xs">
              How I handle your information:{" "}
              <a href="/en/datenschutz/#kontakt" className="underline underline-offset-4">
                Privacy
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
