import { useMemo } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { craftRoutine, formatSegmentLabel, friendlyDate } from "../lib/planner";
import { RoutineSegment } from "../lib/types";
import { useRoutineStore } from "../store/useRoutineStore";

const slotPalette: Record<RoutineSegment["slot"], string> = {
  morning: "from-sky-500/50 via-sky-400/40 to-cyan-400/30",
  midday: "from-emerald-500/40 via-teal-400/40 to-cyan-500/20",
  afternoon: "from-violet-500/40 via-indigo-400/40 to-blue-500/30",
  evening: "from-fuchsia-500/40 via-rose-400/40 to-amber-400/20",
  "wind-down": "from-slate-500/40 via-indigo-500/30 to-slate-800/40"
};

const chipPalette: Record<RoutineSegment["slot"], string> = {
  morning: "bg-sky-500/15 text-sky-100 border-sky-400/50",
  midday: "bg-teal-500/15 text-teal-100 border-teal-400/50",
  afternoon: "bg-indigo-500/15 text-indigo-100 border-indigo-400/50",
  evening: "bg-rose-500/15 text-rose-100 border-rose-400/50",
  "wind-down": "bg-slate-500/15 text-slate-100 border-slate-400/50"
};

export function PlanPreview() {
  const intent = useRoutineStore((state) => state.intent);
  const tasks = useRoutineStore((state) => state.tasks);

  const plan = useMemo(() => craftRoutine(intent, tasks), [intent, tasks]);

  return (
    <section className="rounded-3xl border border-slate-800/60 bg-slate-950/40 p-6 shadow-lg shadow-slate-950/60 backdrop-blur-2xl">
      <header className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-sky-100">Routine Blueprint</h2>
          <p className="text-sm text-slate-400">
            Adaptive routine generated for {friendlyDate(intent.date)}.
          </p>
        </div>
        <div className="rounded-full border border-slate-700/60 bg-slate-900/60 px-4 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">
          AI ORCHESTRATED
        </div>
      </header>

      <div className="mb-8 rounded-2xl border border-slate-800/70 bg-gradient-to-r from-slate-900/70 to-slate-950/60 p-[1px]">
        <div className="rounded-2xl bg-slate-950/70 p-6">
          <p className="text-base leading-relaxed text-slate-200">{plan.overview}</p>
        </div>
      </div>

      <div className="grid gap-5">
        {plan.segments.map((segment) => (
          <motion.article
            key={segment.slot}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, type: "spring", stiffness: 140, damping: 20 }}
            className={clsx(
              "relative overflow-hidden rounded-3xl border border-slate-800/70 p-[1px]",
              "shadow-lg shadow-slate-950/40"
            )}
          >
            <div
              className={clsx(
                "pointer-events-none absolute inset-0 opacity-80 blur-2xl",
                "bg-gradient-to-br",
                slotPalette[segment.slot]
              )}
            />
            <div className="relative rounded-[calc(1.5rem-1px)] bg-slate-950/80 p-6 backdrop-blur">
              <header className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-base font-semibold text-sky-100">{segment.headline}</h3>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {segment.start} — {segment.end}
                  </p>
                </div>
                <span
                  className={clsx(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
                    chipPalette[segment.slot]
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {segment.anchor}
                </span>
              </header>

              <div className="grid gap-4 md:grid-cols-[1.2fr,0.8fr]">
                <div className="space-y-3">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400/90">
                    Tasks orchestrated
                  </p>
                  <div className="space-y-3">
                    {segment.tasks.length > 0 ? (
                      segment.tasks.map((task) => (
                        <motion.div
                          key={task.id}
                          className="rounded-2xl border border-slate-800/60 bg-slate-950/70 px-4 py-3"
                          whileHover={{ scale: 1.01 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-slate-100">{task.title}</span>
                            <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                              <span className="rounded-full border border-slate-700/60 bg-slate-900/60 px-2 py-0.5">
                                {task.duration} min
                              </span>
                              <span className="rounded-full border border-slate-700/60 bg-slate-900/60 px-2 py-0.5 capitalize">
                                {task.category.replace("-", " ")}
                              </span>
                              <span className="rounded-full border border-slate-700/60 bg-slate-900/60 px-2 py-0.5">
                                {task.energyDemand.toUpperCase()}
                              </span>
                              {task.notes && (
                                <span className="rounded-full border border-slate-700/60 bg-slate-900/60 px-2 py-0.5">
                                  {task.notes}
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="rounded-2xl border border-dashed border-slate-700/60 bg-slate-950/40 px-4 py-6 text-center text-xs text-slate-400">
                        No tasks assigned — the bot can leave this window light for recovery or
                        reflection.
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400/90">
                    Micro rituals
                  </p>
                  <ul className="space-y-2 text-sm text-slate-200">
                    {segment.microHabits.map((habit, index) => (
                      <li
                        key={`${segment.slot}-habit-${index}`}
                        className="flex items-start gap-2 rounded-2xl border border-slate-800/60 bg-slate-950/70 px-3 py-2"
                      >
                        <span className="mt-1 h-2 w-2 rounded-full bg-slate-400" />
                        <span>{habit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[1.2fr,0.8fr]">
        <div className="rounded-3xl border border-slate-800/60 bg-slate-950/50 p-5">
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Coaching nudges
          </h4>
          <div className="space-y-3 text-sm text-slate-200">
            {plan.suggestions.map((suggestion) => (
              <div
                key={suggestion.title}
                className="rounded-2xl border border-slate-800/60 bg-slate-950/70 px-4 py-3"
              >
                <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                  {suggestion.category}
                </div>
                <p className="text-sm font-semibold text-slate-100">{suggestion.title}</p>
                <p className="text-sm text-slate-300">{suggestion.description}</p>
              </div>
            ))}
            {plan.suggestions.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-800/60 bg-slate-950/40 px-4 py-6 text-center text-xs text-slate-400">
                Input more variety for richer coaching nudges.
              </div>
            )}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800/60 bg-slate-950/50 p-5">
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Soundtrack pairing
          </h4>
          <div className="space-y-3 text-sm text-slate-200">
            {plan.soundtrack.map((mix) => (
              <div
                key={mix.slot}
                className="flex items-start justify-between gap-3 rounded-2xl border border-slate-800/60 bg-slate-950/70 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold capitalize text-slate-100">{mix.slot}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{mix.vibe}</p>
                </div>
                <span className="rounded-full border border-slate-700/60 bg-slate-900/60 px-3 py-1 text-xs">
                  {mix.playlist}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-8 rounded-2xl border border-slate-800/60 bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-violet-500/10 p-[1px]">
        <div className="rounded-2xl bg-slate-950/80 p-6 text-sm text-slate-300">
          <p className="font-medium uppercase tracking-[0.3em] text-slate-400">
            EXPORTABLE SUMMARY
          </p>
          <pre className="mt-3 whitespace-pre-wrap rounded-2xl border border-slate-800/60 bg-slate-900/70 p-4 text-sm text-slate-200">
            {plan.segments.map((segment) => formatSegmentLabel(segment)).join("\n")}
          </pre>
        </div>
      </footer>
    </section>
  );
}
