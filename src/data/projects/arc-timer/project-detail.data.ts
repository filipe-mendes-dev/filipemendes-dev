import {
  createProjectPageMetadata,
  type ProjectDetailContent,
} from "../projects.interfaces";
import { project } from "./project.data";

export const projectDetail: ProjectDetailContent = {
  hero: {
    name: project.name,
    logo: project.logo,
    category: project.category,
    summary: "HIIT timer application covering the full workout lifecycle.",
    description:
      "Personal-use project evolved into a production-level application. It covers the full workout flow from setup to execution and tracking.",
    isMobileApp: true,
    links: [
      {
        label: "GitHub",
        href: "https://github.com/filipe-mendes-dev/arc-timer",
      },
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
        alt: "Arc Timer home screen with quick workout actions and recent sessions.",
        caption: "Home interface with quick start and recent sessions.",
        url: "/images/projects/arc-timer/HomePage.png",
      },
      {
        id: "arc-timer-workouts-info",
        alt: "Workout list screen with search, saved routines and workout setup controls.",
        caption: "Workout list and configuration interface.",
        url: "/images/projects/arc-timer/Workouts_Info.png",
      },
      {
        id: "arc-timer-workout-run-page",
        alt: "Active workout screen with interval timer, exercise name and session controls.",
        caption: "Active session interface with interval progression and controls.",
        url: "/images/projects/arc-timer/WorkoutRun_Page.png",
      },
      {
        id: "arc-timer-session-pages",
        alt: "Session detail and history screens with workout summaries and sharing flows.",
        caption: "Session details, history and sharing interface.",
        url: "/images/projects/arc-timer/Session_Pages.png",
      },
      {
        id: "arc-timer-settings-page",
        alt: "Settings screen with app preferences and workout configuration options.",
        caption: "Settings and configuration interface.",
        url: "/images/projects/arc-timer/Settings_Page.png",
      },
      {
        id: "arc-timer-theme-showcase",
        alt: "Theme comparison showing Arc Timer screens across multiple visual styles.",
        caption: "Theme variations and visual customization.",
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
        "Pause, resume, skip or end a session with minimal interaction during workouts.",
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
        "Workout phases run through a state machine, keeping transitions and session controls predictable.",
    },
    {
      title: "1Hz engine cycle",
      description:
        "Second-level precision was sufficient for workouts, so the timer runs at 1Hz to reduce overhead.",
    },
    {
      title: "Reanimated UI-thread animations",
      description:
        "Animations run on the UI thread using Reanimated, avoiding load on the JavaScript thread.",
    },
    {
      title: "File-based workout sharing",
      description:
        "Workouts serialize to files for import, export and reuse across devices.",
    },
  ],
  techStack: ["React Native", "Expo Router", "React Reanimated", "TypeScript"],
  pageMetadata: createProjectPageMetadata(
    project.name,
    "HIIT timer application covering the full workout lifecycle.",
    project.slug
  ),
};
