import { useId } from "react";
import { useRoutineStore } from "../store/useRoutineStore";

const energyOptions = [
  { value: "early-bird", label: "Early bird · mornings are fire" },
  { value: "balanced", label: "Balanced · steady energy" },
  { value: "night-owl", label: "Night owl · evenings spark" }
] as const;

const nourishmentOptions = [
  { value: "quick", label: "Quick fuel" },
  { value: "balanced", label: "Balanced plates" },
  { value: "gourmet", label: "Gourmet ritual" }
] as const;

export function IntentForm() {
  const intentFormId = useId();
  const intent = useRoutineStore((state) => state.intent);
  const setIntent = useRoutineStore((state) => state.setIntent);

  return (
    <section className="rounded-3xl border border-slate-800/60 bg-surface/70 p-6 shadow-glow backdrop-blur-xl">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-sky-100">Daily Intent</h2>
          <p className="text-sm text-slate-400">
            Set today&apos;s rhythm. The bot will sculpt a plan anchored to your energy and focus.
          </p>
        </div>
        <span className="rounded-full border border-sky-400/30 px-4 py-1 text-xs uppercase tracking-[0.2em] text-sky-200/80">
          Routine DNA
        </span>
      </header>
      <form
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
        aria-labelledby={`${intentFormId}-title`}
      >
        <input type="hidden" id={`${intentFormId}-title`} value="Daily Intent" readOnly />
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          <span className="font-semibold text-slate-200">Date</span>
          <input
            type="date"
            className="rounded-xl border border-slate-700/70 bg-slate-900/60 px-3 py-2 text-slate-100 outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
            value={intent.date}
            onChange={(event) => setIntent({ date: event.target.value })}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          <span className="font-semibold text-slate-200">Signature focus</span>
          <input
            type="text"
            placeholder="Deep work sprint, wellness reset, etc."
            className="rounded-xl border border-slate-700/70 bg-slate-900/60 px-3 py-2 text-slate-100 outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
            value={intent.focus}
            onChange={(event) => setIntent({ focus: event.target.value })}
          />
        </label>
        <div className="grid grid-cols-2 gap-3 md:col-span-2 md:grid-cols-4">
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            <span className="font-semibold text-slate-200">Wake</span>
            <input
              type="time"
              className="rounded-xl border border-slate-700/70 bg-slate-900/60 px-3 py-2 text-slate-100 outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
              value={intent.wakeTime}
              onChange={(event) => setIntent({ wakeTime: event.target.value })}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            <span className="font-semibold text-slate-200">Lights out</span>
            <input
              type="time"
              className="rounded-xl border border-slate-700/70 bg-slate-900/60 px-3 py-2 text-slate-100 outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
              value={intent.sleepTime}
              onChange={(event) => setIntent({ sleepTime: event.target.value })}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            <span className="font-semibold text-slate-200">Mindful minutes</span>
            <input
              type="number"
              min={0}
              className="rounded-xl border border-slate-700/70 bg-slate-900/60 px-3 py-2 text-slate-100 outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
              value={intent.mindfulMinutes}
              onChange={(event) =>
                setIntent({ mindfulMinutes: Number.parseInt(event.target.value || "0", 10) })
              }
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            <span className="font-semibold text-slate-200">Movement minutes</span>
            <input
              type="number"
              min={0}
              className="rounded-xl border border-slate-700/70 bg-slate-900/60 px-3 py-2 text-slate-100 outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-500/30"
              value={intent.fitnessMinutes}
              onChange={(event) =>
                setIntent({ fitnessMinutes: Number.parseInt(event.target.value || "0", 10) })
              }
            />
          </label>
        </div>
        <fieldset className="md:col-span-2">
          <legend className="mb-2 text-sm font-semibold text-slate-200">Energy profile</legend>
          <div className="grid gap-3 md:grid-cols-3">
            {energyOptions.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                  intent.energyProfile === option.value
                    ? "border-sky-400/70 bg-sky-400/10 text-sky-100"
                    : "border-slate-700/60 bg-slate-900/40 text-slate-300 hover:border-slate-600"
                }`}
              >
                <input
                  className="sr-only"
                  type="radio"
                  name="energyProfile"
                  value={option.value}
                  checked={intent.energyProfile === option.value}
                  onChange={() => setIntent({ energyProfile: option.value })}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="md:col-span-2">
          <legend className="mb-2 text-sm font-semibold text-slate-200">
            Nourishment strategy
          </legend>
          <div className="grid gap-3 md:grid-cols-3">
            {nourishmentOptions.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                  intent.nourishmentFocus === option.value
                    ? "border-violet-400/70 bg-violet-400/10 text-violet-100"
                    : "border-slate-700/60 bg-slate-900/40 text-slate-300 hover:border-slate-600"
                }`}
              >
                <input
                  className="sr-only"
                  type="radio"
                  name="nourishmentFocus"
                  value={option.value}
                  checked={intent.nourishmentFocus === option.value}
                  onChange={() => setIntent({ nourishmentFocus: option.value })}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </form>
    </section>
  );
}
