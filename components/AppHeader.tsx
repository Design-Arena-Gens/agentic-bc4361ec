export function AppHeader() {
  return (
    <header className="flex flex-col gap-6 rounded-3xl border border-slate-800/60 bg-gradient-to-r from-slate-950/70 via-slate-900/60 to-slate-950/70 p-8 shadow-glow">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-sky-100 md:text-4xl">
            RoutinePilot
          </h1>
          <p className="text-base text-slate-300 md:text-lg">
            AI tactician architecting your daily rhythm — align intent, energy, and output in one
            interactive cockpit.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#plan"
            className="rounded-full border border-sky-500/60 bg-sky-500/15 px-5 py-2 text-sm font-medium text-sky-100 transition hover:bg-sky-500/25 active:scale-95"
          >
            Jump to plan
          </a>
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-700/70 bg-slate-950/70 px-5 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-600"
          >
            Deploy on Vercel
          </a>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800/70 bg-slate-950/80 p-4 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">1 · Signal</p>
          <p className="mt-1 text-base text-slate-100">Feed the bot your intent + tasks.</p>
        </div>
        <div className="rounded-2xl border border-slate-800/70 bg-slate-950/80 p-4 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">2 · Orchestrate</p>
          <p className="mt-1 text-base text-slate-100">RoutinePilot sculpts energy-aware blocks.</p>
        </div>
        <div className="rounded-2xl border border-slate-800/70 bg-slate-950/80 p-4 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">3 · Execute</p>
          <p className="mt-1 text-base text-slate-100">
            Download the playbook + lock in micro rituals.
          </p>
        </div>
      </div>
    </header>
  );
}
