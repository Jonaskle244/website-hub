import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CopyPrompt } from "./CopyPrompt";

const description =
  "A free prompt, example notes and setup blueprint for turning your Obsidian notes into a morning briefing with Codex.";

export const metadata: Metadata = {
  title: "Night Brief Starter — codemantix.lab",
  description,
  alternates: { canonical: "/lab/night-brief/" },
  openGraph: {
    title: "Night Brief Starter — codemantix.lab",
    description,
    url: "/lab/night-brief/",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Codemantix" }],
  },
  twitter: { card: "summary_large_image", title: "Night Brief Starter", description, images: ["/og.png"] },
};

const base = "/downloads/night-brief/";
const files = [
  ["01-Start-here.md", "Start here", "Your first briefing, step by step."],
  ["02-Briefing-prompt.txt", "Briefing prompt", "Copy, paste and add a few notes."],
  ["03-Example-notes.md", "Example notes", "Fictional projects to try it with."],
  ["04-Automation-blueprint.md", "Automation blueprint", "A plan for your own scheduled runner."],
];

export default function NightBrief() {
  const prompt = readFileSync(join(process.cwd(), "public/downloads/night-brief/02-Briefing-prompt.txt"), "utf8");
  return (
    <main lang="en" className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-8 sm:py-24">
      <header className="mb-16">
        <p className="mb-6 font-mono text-xs tracking-widest text-[#aab3ff]">[ CODEMANTIX.LAB / 001 ]</p>
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="mb-4 text-sm text-muted">Codex + Obsidian · Free starter kit</p>
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl">Your notes.<br /><span className="text-[#aab3ff]">Tomorrow’s briefing.</span></h1>
            <p className="max-w-lg text-lg text-[#bdc5d3]">Pick up where you left off. Turn a few project notes into what changed, what’s still open and one useful next step.</p>
            <a href={`${base}codemantix-brief-starter.zip`} download className="mt-8 inline-flex rounded-lg bg-accent px-6 py-4 font-semibold text-white transition-colors hover:bg-accent-d focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Download the free starter ↓</a>
            <p className="mt-3 text-sm text-muted">4 small text files · No signup</p>
          </div>
          <div className="rounded-2xl border border-line-2 bg-surface p-6 shadow-2xl sm:p-8">
            <div className="mb-7 flex flex-wrap justify-between gap-3 font-mono text-xs tracking-wider text-muted"><span>MORNING BRIEF</span><span className="text-[#aab3ff]">EXAMPLE</span></div>
            <div className="border-b border-line pb-5"><p className="mb-2 text-xs tracking-widest text-emerald-300">DONE</p><p className="text-xl">Hero section finished.</p></div>
            <div className="py-5"><p className="mb-2 text-xs tracking-widest text-muted">STILL OPEN</p><p className="text-xl">Mobile layout check.</p></div>
            <div className="rounded-xl border border-accent/60 bg-accent/10 p-4"><p className="mb-2 text-xs tracking-widest text-[#aab3ff]">NEXT STEP →</p><p className="text-xl font-semibold">Test the contact form.</p></div>
          </div>
        </div>
      </header>

      <section aria-labelledby="start" className="mb-16 border-t border-line pt-10">
        <h2 id="start" className="mb-7 text-3xl font-semibold">Start with one briefing.</h2>
        <ol className="grid gap-6 md:grid-cols-3">
          {[
            ["01", "Copy the prompt", "Paste the prompt below into Codex or your preferred AI chat."],
            ["02", "Add the example notes", "Try the fictional notes first. Then choose two or three of your own notes."],
            ["03", "Check the result", "Read the summary against your notes. Save it separately and use it to pick your next task."],
          ].map(([number, title, body]) => (
            <li key={number}><span className="font-mono text-sm text-[#aab3ff]">{number}</span><h3 className="mt-3 mb-3 text-xl font-semibold">{title}</h3><p className="text-muted">{body}</p></li>
          ))}
        </ol>
        <p className="mt-7 text-sm text-muted">No dashboard or script needed for this first step. Obsidian is optional: the starter uses plain Markdown. Your AI tool’s normal access requirements, usage limits and charges apply.</p>
      </section>

      <section aria-labelledby="prompt" className="mb-16">
        <h2 id="prompt" className="mb-4 text-3xl font-semibold">The prompt, ready to copy.</h2>
        <p className="mb-5 text-muted">Use notes you’re comfortable sharing with your AI provider. You don’t need to upload your whole vault.</p>
        <CopyPrompt text={prompt} />
        <details className="rounded-xl border border-line-2 bg-surface p-5 sm:p-6">
          <summary className="cursor-pointer text-lg font-semibold focus-visible:outline-2 focus-visible:outline-accent">Read the full prompt</summary>
          <pre className="mt-6 whitespace-pre-wrap break-words font-mono text-sm leading-7 text-[#bdc5d3]">{prompt}</pre>
        </details>
        <a className="mt-4 inline-block text-sm text-[#aab3ff] underline underline-offset-4" href={`${base}02-Briefing-prompt.txt`} download>Download the prompt as a text file</a>
      </section>

      <section aria-labelledby="files" className="mb-16">
        <h2 id="files" className="mb-6 text-3xl font-semibold">Everything in the kit.</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {files.map(([file, title, detail]) => <a key={file} href={`${base}${file}`} download className="rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"><h3 className="mb-2 text-lg font-semibold">{title} <span aria-hidden className="text-[#aab3ff]">↓</span></h3><p className="text-sm text-muted">{detail}</p></a>)}
        </div>
      </section>

      <section aria-labelledby="nightly" className="rounded-2xl border border-line-2 bg-surface p-6 sm:p-9">
        <p className="mb-3 font-mono text-xs tracking-widest text-[#aab3ff]">WHEN THE MANUAL VERSION IS USEFUL</p>
        <h2 id="nightly" className="mb-5 text-3xl font-semibold">Then make it a nightly habit.</h2>
        <p className="mb-4 text-[#bdc5d3]">The automation blueprint explains how to collect selected notes, pass them to Codex and save a dated briefing. It includes an implementation prompt to adapt the runner to your operating system.</p>
        <p className="mb-4 text-muted">This is a guide and blueprint, not a one-click installer or a copy of my personal dashboard. You’ll need to set up and test your own runner and schedule. A local run needs an available computer and network connection.</p>
        <p className="text-muted">The starter has been reviewed, but its automation blueprint has not been independently installed and tested. Start with the examples and a manual run before enabling a schedule.</p>
        <a href={`${base}04-Automation-blueprint.md`} download className="mt-6 inline-block font-semibold text-[#aab3ff] underline underline-offset-4">Get the automation blueprint →</a>
      </section>
      <p className="mt-8 text-sm text-muted">Made by Jonas · codemantix.lab · Starter edition, September 2026</p>
    </main>
  );
}
