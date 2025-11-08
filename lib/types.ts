export type EnergyProfile = "early-bird" | "balanced" | "night-owl";

export type RoutineIntent = {
  date: string;
  wakeTime: string;
  sleepTime: string;
  focus: string;
  energyProfile: EnergyProfile;
  mindfulMinutes: number;
  fitnessMinutes: number;
  nourishmentFocus: "quick" | "balanced" | "gourmet";
};

export type RoutineTask = {
  id: string;
  title: string;
  duration: number;
  category: "deep-work" | "shallow-work" | "admin" | "personal" | "learning";
  preferredSlot: "morning" | "afternoon" | "evening" | "flex";
  energyDemand: "high" | "medium" | "low";
  notes?: string;
};

export type RoutineSuggestion = {
  title: string;
  description: string;
  category: "mindset" | "energy" | "focus" | "wellness";
};

export type RoutineSegment = {
  slot: "morning" | "midday" | "afternoon" | "evening" | "wind-down";
  start: string;
  end: string;
  anchor: string;
  headline: string;
  microHabits: string[];
  tasks: RoutineTask[];
};

export type RoutinePlan = {
  overview: string;
  segments: RoutineSegment[];
  suggestions: RoutineSuggestion[];
  soundtrack: { slot: RoutineSegment["slot"]; playlist: string; vibe: string }[];
};
