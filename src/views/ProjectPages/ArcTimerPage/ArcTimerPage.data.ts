import type { Metadata } from "next";

import { getProjectRecordBySlug } from "../../../data/site/landing-page/projects.data";
import { siteData } from "../../../data/site/site.data";
import type {
  ProjectDetailHeroData,
  ProjectScreenshotItem,
} from "../ProjectDetailPage";

const arcTimerProject = getProjectRecordBySlug("arc-timer");

if (arcTimerProject === undefined) {
  throw new Error('Missing project record for slug "arc-timer".');
}

export const arcTimerHero: ProjectDetailHeroData = {
  name: arcTimerProject.name,
  logo: arcTimerProject.logo,
  category: arcTimerProject.category,
  description:
    "A focused interval timer for HIIT workouts, designed around precise timing, minimal interaction, and reliable execution during high-intensity sessions.",
  positioning:
    "Positioning: a workout timer product built around trust, responsiveness, and distraction-free use.",
  isMobileApp: true,
  links: [
    {
      label: "Docs",
      href: "/docs/projects/arc-timer",
    },
  ],
};

export const arcTimerScreenshots: ProjectScreenshotItem[] = [];

export const arcTimerKeyFeatures: string[] = [
  "Time-driven workout sessions designed to require minimal interaction once a session starts",
  "Large, clear visual feedback for fast comprehension during intense exercise",
  "Predictable interval transitions that keep the user focused on the workout instead of the device",
];

export const arcTimerArchitecture: string[] = [
  "Session flow built around a precise interval engine rather than frequent UI interaction",
  "Execution model designed to remain stable through rapid interval changes and background runtime conditions",
  "Product decisions shaped around consistency, clarity, and dependable behavior during real workouts",
];

export const arcTimerTechStack: string[] = [
  "React Native",
  "TypeScript",
  "Expo",
  "Audio feedback",
  "Haptic feedback",
];

const title = `${arcTimerHero.name} | ${siteData.siteTitle}`;

export const arcTimerMetadata: Metadata = {
  title,
  description: arcTimerHero.description,
  openGraph: {
    title,
    description: arcTimerHero.description,
    type: "article",
  },
  twitter: {
    card: "summary",
    title,
    description: arcTimerHero.description,
  },
};
