/**
 * Platzhalter-Home, die das Design-System (F2) zeigt: Klammer-Eyebrow,
 * Grotesk-Claim mit blinkendem Cursor, Indigo-Buttons.
 * Die echte Home-Copy wird in Strang C1 mit Jonas abgenommen.
 */
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-24">
      <p className="mb-6 font-mono text-xs tracking-[0.14em] text-muted uppercase">
        <span className="text-accent">[</span> 00 · hub{" "}
        <span className="text-accent">]</span>
      </p>

      <h1 className="max-w-3xl text-5xl leading-[1.05] font-semibold tracking-[-0.03em] text-fg sm:text-6xl">
        Code als Klammer über alles Digitale
        <span className="blink-cursor ml-1 inline-block text-accent">_</span>
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-[1.55] text-muted">
        Software · Game · Web — gebaut, nicht zusammengeklickt.{" "}
        <span className="text-faint">(Platzhalter-Claim — echte Copy folgt in C1.)</span>
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="/projekte"
          className="rounded-sm bg-accent px-5 py-2.5 font-mono text-sm text-[#0a0c10] transition-colors hover:bg-accent-d"
        >
          [ projekte ]
        </a>
        <a
          href="/ueber-mich"
          className="rounded-sm border border-line-2 px-5 py-2.5 font-mono text-sm text-fg transition-colors hover:border-accent hover:text-accent"
        >
          [ über mich ]
        </a>
      </div>
    </main>
  );
}
