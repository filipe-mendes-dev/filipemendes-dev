import {
  createProjectMetadata,
  type ProjectDetailContent,
} from "../projects.interfaces";
import { project } from "./project.data";

export const projectDetail: ProjectDetailContent = {
  hero: {
    name: project.name,
    logo: project.logo,
    category: project.category,
    description:
      "Personal-use project evolved into a production-level application. Full workout flow from setup to execution and tracking.",
    positioning: "HIIT timer application covering the full workout lifecycle.",
    isMobileApp: true,
    links: [
      {
        label: "Docs",
        href: "/docs/projects/arc-timer",
      },
    ],
  },
  screenshots: {
    title: "App Interface",
    items: [
      {
        id: "arc-timer-home-page",
        alt: "Home interface with quick start and recent sessions.",
        url: "/images/projects/arc-timer/HomePage.png",
      },
      {
        id: "arc-timer-workouts-info",
        alt: "Workout list and configuration interface.",
        url: "/images/projects/arc-timer/Workouts_Info.png",
      },
      {
        id: "arc-timer-workout-run-page",
        alt: "Active session interface with interval progression and controls.",
        url: "/images/projects/arc-timer/WorkoutRun_Page.png",
      },
      {
        id: "arc-timer-session-pages",
        alt: "Session details, history and sharing interface.",
        url: "/images/projects/arc-timer/Session_Pages.png",
      },
      {
        id: "arc-timer-settings-page",
        alt: "Settings and configuration interface.",
        url: "/images/projects/arc-timer/Settings_Page.png",
      },
      {
        id: "arc-timer-theme-showcase",
        alt: "Theme variations and visual customization.",
        url: "/images/projects/arc-timer/Theme_Showcase.png",
      },
    ],
  },
  keyFeatures: [
    {
      title: "Custom workout creation",
      description:
        "Create workouts by defining exercises, intervals and durations.",
    },
    {
      title: "Simple session controls",
      description:
        "Pause, resume, skip, or end a session with minimal interaction during workouts.",
    },
    {
      title: "Session history",
      description: "Track completed workouts and review past sessions.",
    },
    {
      title: "Workout import and export",
      description: "Share and reuse workouts through file import and export.",
    },
    {
      title: "Multi-language support",
      description: "Available in multiple languages for broader accessibility.",
    },
  ],
  implementationDetails: [
    {
      title: "State-based timer flow",
      description:
        "Each phase is part of a state machine, enabling controlled transitions and event propagation.",
    },
    {
      title: "1Hz engine cycle",
      description:
        "Timer engine updates once per second, balancing efficiency with required precision.",
    },
    {
      title: "Reanimated UI-thread animations",
      description:
        "Animations run on the UI thread using Reanimated, avoiding load on the JavaScript thread.",
    },
    {
      title: "File-based workout sharing",
      description:
        "Workouts serialized into files for import, export and reuse across devices.",
    },
  ],
  techStack: ["React Native", "Expo Router", "React Reanimated", "TypeScript"],
  metadata: createProjectMetadata(
    project.name,
    "A focused interval timer for HIIT workouts, designed around precise timing, minimal interaction and reliable execution during high-intensity sessions."
  ),
};
