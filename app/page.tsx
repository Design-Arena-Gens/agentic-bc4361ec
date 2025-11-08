"use client";

import { useEffect, useState } from "react";
import { AppHeader } from "../components/AppHeader";
import { IntentForm } from "../components/IntentForm";
import { PlanPreview } from "../components/PlanPreview";
import { TaskGrid } from "../components/TaskGrid";
import { useRoutineStore } from "../store/useRoutineStore";

export default function HomePage() {
  const reset = useRoutineStore((state) => state.reset);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    reset();
  }, [reset]);

  if (!mounted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-200">
        Initializing RoutinePilot…
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-8 md:py-12">
      <AppHeader />
      <div className="grid gap-8 md:grid-cols-[1.05fr,0.95fr]">
        <IntentForm />
        <TaskGrid />
      </div>
      <section id="plan">
        <PlanPreview />
      </section>
    </main>
  );
}
