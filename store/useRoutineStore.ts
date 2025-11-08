"use client";

import { nanoid } from "nanoid";
import { create } from "zustand";
import { RoutineIntent, RoutineTask } from "../lib/types";

type RoutineState = {
  intent: RoutineIntent;
  tasks: RoutineTask[];
  setIntent: (partial: Partial<RoutineIntent>) => void;
  addTask: () => void;
  updateTask: (id: string, partial: Partial<RoutineTask>) => void;
  removeTask: (id: string) => void;
  reset: () => void;
};

const defaultIntent: RoutineIntent = {
  date: new Date().toISOString().slice(0, 10),
  wakeTime: "07:00",
  sleepTime: "23:00",
  focus: "Deep creative work with mindful energy",
  energyProfile: "balanced",
  mindfulMinutes: 10,
  fitnessMinutes: 30,
  nourishmentFocus: "balanced"
};

const seedTasks: RoutineTask[] = [
  {
    id: nanoid(),
    title: "Deep dive: priority project",
    duration: 90,
    category: "deep-work",
    preferredSlot: "morning",
    energyDemand: "high",
    notes: "Ship first draft of proposal"
  },
  {
    id: nanoid(),
    title: "Inbox + async updates",
    duration: 45,
    category: "admin",
    preferredSlot: "afternoon",
    energyDemand: "low"
  },
  {
    id: nanoid(),
    title: "Movement session",
    duration: 40,
    category: "personal",
    preferredSlot: "evening",
    energyDemand: "medium",
    notes: "Hybrid strength + mobility"
  }
];

export const useRoutineStore = create<RoutineState>((set) => ({
  intent: defaultIntent,
  tasks: seedTasks,
  setIntent: (partial) =>
    set((state) => ({
      intent: { ...state.intent, ...partial }
    })),
  addTask: () =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: nanoid(),
          title: "New task",
          duration: 30,
          category: "deep-work",
          preferredSlot: "flex",
          energyDemand: "medium"
        }
      ]
    })),
  updateTask: (id, partial) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...partial } : task))
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id)
    })),
  reset: () =>
    set(() => ({
      intent: defaultIntent,
      tasks: seedTasks.map((task) => ({ ...task, id: nanoid() }))
    }))
}));
