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
        alt: "Session details, history, and sharing interface.",
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
        "Create workouts with full control over exercises, intervals, and timing structure.",
    },
    {
      title: "Simple session controls",
      description:
        "Pause, resume, skip, or end sessions with minimal interaction during active workouts.",
    },
    {
      title: "Clear workout layout",
      description:
        "All key information is visible at a glance, including time, current exercise, progress, and next step.",
    },
    {
      title: "Session history",
      description:
        "Track completed workouts with stored session data and past activity.",
    },
    {
      title: "Workout import and export",
      description:
        "Share and reuse workouts through file-based import and export.",
    },
    {
      title: "Multi-language support",
      description:
        "Interface available in multiple languages for broader accessibility.",
    },
  ],
  architecture: [
    {
      title:
        "Session flow built around a precise interval engine rather than frequent UI interaction",
    },
    {
      title:
        "Execution model designed to remain stable through rapid interval changes and background runtime conditions",
    },
    {
      title:
        "Product decisions shaped around consistency, clarity, and dependable behavior during real workouts",
    },
  ],
  techStack: [
    "React Native",
    "TypeScript",
    "Expo",
    "Audio feedback",
    "Haptic feedback",
  ],
  metadata: createProjectMetadata(
    project.name,
    "A focused interval timer for HIIT workouts, designed around precise timing, minimal interaction, and reliable execution during high-intensity sessions."
  ),
};
