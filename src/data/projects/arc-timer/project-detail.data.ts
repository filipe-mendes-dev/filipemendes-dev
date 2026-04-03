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
  },
  screenshots: [],
  keyFeatures: [
    "Time-driven workout sessions designed to require minimal interaction once a session starts",
    "Large, clear visual feedback for fast comprehension during intense exercise",
    "Predictable interval transitions that keep the user focused on the workout instead of the device",
  ],
  architecture: [
    "Session flow built around a precise interval engine rather than frequent UI interaction",
    "Execution model designed to remain stable through rapid interval changes and background runtime conditions",
    "Product decisions shaped around consistency, clarity, and dependable behavior during real workouts",
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
    "A focused interval timer for HIIT workouts, designed around precise timing, minimal interaction, and reliable execution during high-intensity sessions.",
  ),
};
