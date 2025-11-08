import { Fragment } from "react";
import { RoutineTask } from "../lib/types";
import { useRoutineStore } from "../store/useRoutineStore";

const categoryLabels: Record<RoutineTask["category"], string> = {
  "deep-work": "Deep work",
  "shallow-work": "Shallow work",
  admin: "Admin",
  personal: "Personal",
  learning: "Learning"
};

const preferredSlotLabels: Record<RoutineTask["preferredSlot"], string> = {
  morning: "Morning pulse",
  afternoon: "Midday / Afternoon",
  evening: "Evening glow",
  flex: "Flexible"
};

const energyDemandLabels: Record<RoutineTask["energyDemand"], string> = {
  high: "High voltage",
  medium: "Medium",
  low: "Low lift"
};

export function TaskGrid() {
  const tasks = useRoutineStore((state) => state.tasks);
  const addTask = useRoutineStore((state) => state.addTask);
  const updateTask = useRoutineStore((state) => state.updateTask);
  const removeTask = useRoutineStore((state) => state.removeTask);

  return (
    <section className="rounded-3xl border border-slate-800/60 bg-slate-950/50 p-6 shadow-inner shadow-slate-900/40 backdrop-blur-2xl">
      <header className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-sky-100">Core Moves</h2>
          <p className="text-sm text-slate-400">
            Feed the bot your anchor tasks. It will orchestrate timing, energy, and recovery.
          </p>
        </div>
        <button
          type="button"
          onClick={addTask}
          className="inline-flex items-center gap-2 rounded-full border border-sky-400/60 bg-sky-400/10 px-4 py-2 text-sm font-medium text-sky-100 transition hover:bg-sky-400/20 active:scale-95"
        >
          <span className="text-lg leading-none">＋</span>
          Add task
        </button>
      </header>
      <div className="space-y-4">
        {tasks.map((task) => (
          <Fragment key={task.id}>
            <article className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4 transition hover:border-sky-400/30 hover:bg-slate-900/80">
              <div className="grid gap-4 md:grid-cols-[1.5fr,1fr,1fr,auto] md:items-center">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Task
                  </label>
                  <input
                    type="text"
                    value={task.title}
                    onChange={(event) => updateTask(task.id, { title: event.target.value })}
                    placeholder="What do you need to move today?"
                    className="rounded-xl border border-slate-700/70 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Duration
                    </span>
                    <input
                      type="number"
                      min={10}
                      step={5}
                      value={task.duration}
                      onChange={(event) =>
                        updateTask(task.id, {
                          duration: Number.parseInt(event.target.value || "0", 10)
                        })
                      }
                      className="rounded-xl border border-slate-700/70 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Energy load
                    </span>
                    <select
                      value={task.energyDemand}
                      onChange={(event) =>
                        updateTask(task.id, {
                          energyDemand: event.target.value as RoutineTask["energyDemand"]
                        })
                      }
                      className="rounded-xl border border-slate-700/70 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
                    >
                      {Object.entries(energyDemandLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Category
                    </span>
                    <select
                      value={task.category}
                      onChange={(event) =>
                        updateTask(task.id, {
                          category: event.target.value as RoutineTask["category"]
                        })
                      }
                      className="rounded-xl border border-slate-700/70 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
                    >
                      {Object.entries(categoryLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Ideal slot
                    </span>
                    <select
                      value={task.preferredSlot}
                      onChange={(event) =>
                        updateTask(task.id, {
                          preferredSlot: event.target.value as RoutineTask["preferredSlot"]
                        })
                      }
                      className="rounded-xl border border-slate-700/70 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
                    >
                      {Object.entries(preferredSlotLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Notes / rituals
                  </label>
                  <textarea
                    value={task.notes ?? ""}
                    onChange={(event) => updateTask(task.id, { notes: event.target.value })}
                    placeholder="Prime the block with rituals or boundaries"
                    className="min-h-[72px] rounded-xl border border-slate-700/70 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeTask(task.id)}
                  className="h-10 w-10 self-start rounded-full border border-rose-500/40 bg-rose-500/10 text-rose-200 transition hover:border-rose-400/70 hover:text-rose-100 active:scale-95 md:justify-self-end"
                  aria-label="Remove task"
                >
                  ✕
                </button>
              </div>
            </article>
          </Fragment>
        ))}
        {tasks.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-700/70 bg-slate-950/40 px-6 py-10 text-center text-sm text-slate-400">
            No core moves yet. Add at least one focus block so the bot can craft your routine.
          </div>
        )}
      </div>
    </section>
  );
}
