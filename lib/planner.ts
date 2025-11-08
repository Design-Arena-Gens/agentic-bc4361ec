import { format } from "date-fns";
import {
  EnergyProfile,
  RoutineIntent,
  RoutinePlan,
  RoutineSegment,
  RoutineSuggestion,
  RoutineTask
} from "./types";

const SLOT_SEQUENCE: RoutineSegment["slot"][] = [
  "morning",
  "midday",
  "afternoon",
  "evening",
  "wind-down"
];

const SLOT_ALIASES: Record<RoutineSegment["slot"], RoutineTask["preferredSlot"][]> =
  {
    morning: ["morning"],
    midday: ["afternoon", "flex"],
    afternoon: ["afternoon", "flex"],
    evening: ["evening", "flex"],
    "wind-down": ["evening", "flex"]
  };

const SLOT_INTENTIONS: Record<RoutineSegment["slot"], { anchor: string; headline: string }> = {
  morning: {
    anchor: "Wake rituals + priming",
    headline: "Launch with clarity"
  },
  midday: {
    anchor: "Momentum + nourishment",
    headline: "Ride the flow"
  },
  afternoon: {
    anchor: "Deep focus + output",
    headline: "Protect peak energy"
  },
  evening: {
    anchor: "Creative + personal space",
    headline: "Reset and create"
  },
  "wind-down": {
    anchor: "Transition to rest",
    headline: "Close with intention"
  }
};

const SOUNDTRACK_LIBRARY: Record<RoutineSegment["slot"], { playlist: string; vibe: string }> = {
  morning: { playlist: "Morning Radiance — Lofi Focus", vibe: "gradual focus build" },
  midday: { playlist: "Upbeat Flowstate", vibe: "light electronic momentum" },
  afternoon: { playlist: "Deep Work Pulse", vibe: "binaural beats for concentration" },
  evening: { playlist: "Creative Spark", vibe: "jazzy downtempo grooves" },
  "wind-down": { playlist: "Nightfall Unwind", vibe: "calming ambient textures" }
};

const DEFAULT_SLOT_DURATIONS: Record<EnergyProfile, number[]> = {
  "early-bird": [180, 150, 120, 120, 120],
  balanced: [180, 180, 150, 120, 120],
  "night-owl": [150, 150, 180, 150, 150]
};

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(totalMinutes: number) {
  const normalized = ((totalMinutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

function buildMicroHabits(intent: RoutineIntent, slot: RoutineSegment["slot"]): string[] {
  const base: Record<RoutineSegment["slot"], string[]> = {
    morning: [
      "Hydrate within 5 minutes of waking",
      "2-minute breathing reset",
      "Sunlight exposure or bright light therapy"
    ],
    midday: [
      "Step away for 5 mindful breaths",
      "Prioritize protein-forward lunch",
      "Check posture + stretch cycle"
    ],
    afternoon: [
      "90-minute ultradian focus sprint",
      "Micro walk after intense block",
      "Inbox sweep with strict timer"
    ],
    evening: [
      "Creative or learning jam (45 min)",
      "Digital sunset 90 minutes pre-sleep",
      "Prep for tomorrow — intentions + top 3"
    ],
    "wind-down": [
      "Trigger sleepy cue (lighting + scent)",
      "Reflect on 3 micro-wins",
      "Static stretch + downshift playlist"
    ]
  };

  const mindfulBoost = intent.mindfulMinutes >= 10 ? "Drop into a mindful minute before transitions" : null;
  const fitnessBoost =
    intent.fitnessMinutes >= 20 ? "Layer movement snack (squats/push-ups) after long sits" : null;
  const nourishmentQuick =
    intent.nourishmentFocus === "quick" ? "Batch prepare a ready-to-heat meal pack" : null;

  const extras = [mindfulBoost, fitnessBoost, nourishmentQuick].filter(Boolean) as string[];

  if (slot === "morning" && intent.energyProfile === "night-owl") {
    extras.push("Gradual light ladder + low-stim music to ramp up");
  }

  return [...base[slot], ...extras].slice(0, 4);
}

function craftSuggestions(intent: RoutineIntent, tasks: RoutineTask[]): RoutineSuggestion[] {
  const suggestions: RoutineSuggestion[] = [];
  const deepWork = tasks.filter((task) => task.category === "deep-work").length;
  const personal = tasks.filter((task) => task.category === "personal").length;

  if (deepWork >= 2) {
    suggestions.push({
      title: "Defend a maker window",
      description:
        "Batch your high-energy tasks into two 90-minute focus sprints and stack breaks just after each block.",
      category: "focus"
    });
  }

  if (personal === 0) {
    suggestions.push({
      title: "Infuse a personal pulse",
      description:
        "Even a 20-minute personal micro-project recharges creativity. Drop it into the evening slot to protect momentum.",
      category: "wellness"
    });
  }

  if (intent.energyProfile === "early-bird") {
    suggestions.push({
      title: "Anchor the morning win",
      description:
        "Open the day with your highest-leverage task before the world wakes; push admin into the afternoon valley.",
      category: "mindset"
    });
  }

  if (intent.energyProfile === "night-owl") {
    suggestions.push({
      title: "Light up the late flow",
      description:
        "Reserve creative build time post-sunset while shielding mornings for low-friction prep and recovery.",
      category: "energy"
    });
  }

  if (intent.mindfulMinutes < 10) {
    suggestions.push({
      title: "Micro mindfulness primer",
      description:
        "Stack three 60-second mindful resets at wake, midday, and pre-sleep; tether to existing habits so they stick.",
      category: "mindset"
    });
  }

  return suggestions.slice(0, 4);
}

function assignTasksToSlots(intent: RoutineIntent, tasks: RoutineTask[]) {
  const slotBuckets: Record<RoutineSegment["slot"], RoutineTask[]> = {
    morning: [],
    midday: [],
    afternoon: [],
    evening: [],
    "wind-down": []
  };

  tasks.forEach((task) => {
    const preferredSlot =
      (SLOT_SEQUENCE.find((slot) => SLOT_ALIASES[slot].includes(task.preferredSlot)) as
        | RoutineSegment["slot"]
        | undefined) ??
      (task.energyDemand === "high"
        ? intent.energyProfile === "night-owl"
          ? "evening"
          : "morning"
        : task.energyDemand === "medium"
          ? "afternoon"
          : "midday");

    slotBuckets[preferredSlot].push(task);
  });

  // rebalance if morning overloaded
  const maxTasksPerSlot = 4;

  SLOT_SEQUENCE.forEach((slot, index) => {
    while (slotBuckets[slot].length > maxTasksPerSlot) {
      const spill = slotBuckets[slot].pop();
      if (!spill) break;
      const nextSlot = SLOT_SEQUENCE[index + 1] ?? "evening";
      slotBuckets[nextSlot].push({ ...spill, preferredSlot: "flex" });
    }
  });

  return slotBuckets;
}

export function craftRoutine(intent: RoutineIntent, tasks: RoutineTask[]): RoutinePlan {
  const dayStart = timeToMinutes(intent.wakeTime);
  let dayEnd = timeToMinutes(intent.sleepTime);

  if (dayEnd <= dayStart) {
    dayEnd += 24 * 60;
  }

  const totalMinutes = dayEnd - dayStart;
  const slotDurations = DEFAULT_SLOT_DURATIONS[intent.energyProfile];
  const totalConfigured = slotDurations.reduce((acc, val) => acc + val, 0);

  const scalingFactor = totalConfigured > 0 ? totalMinutes / totalConfigured : 1;

  const slotBuckets = assignTasksToSlots(intent, tasks);

  let cursor = dayStart;

  const segments: RoutineSegment[] = SLOT_SEQUENCE.map((slot, idx) => {
    const configuredDuration = slotDurations[idx];
    const duration = Math.round(configuredDuration * scalingFactor);
    const startMinutes = cursor;
    const endMinutes = cursor + duration;
    cursor = endMinutes;

    const { anchor, headline } = SLOT_INTENTIONS[slot];
    const microHabits = buildMicroHabits(intent, slot);

    return {
      slot,
      start: minutesToTime(startMinutes),
      end: minutesToTime(endMinutes),
      anchor,
      headline,
      microHabits,
      tasks: slotBuckets[slot]
    };
  });

  const overview = [
    `You're primed for a ${intent.focus.toLowerCase()} day.`,
    `Wake at ${intent.wakeTime}, close out around ${intent.sleepTime}.`,
    `Energy rhythm: ${intent.energyProfile.replace("-", " ")}; mindful focus ${intent.mindfulMinutes} min; movement target ${intent.fitnessMinutes} min.`
  ].join(" ");

  const suggestions = craftSuggestions(intent, tasks);

  const soundtrack = segments.map((segment) => ({
    slot: segment.slot,
    ...SOUNDTRACK_LIBRARY[segment.slot]
  }));

  return {
    overview,
    segments,
    suggestions,
    soundtrack
  };
}

export function formatSegmentLabel(segment: RoutineSegment) {
  const start = segment.start;
  const end = segment.end;
  return `${segment.headline} · ${start} - ${end}`;
}

export function friendlyDate(date: string) {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.valueOf())) {
    return date;
  }
  return format(parsedDate, "EEEE, MMMM do");
}
