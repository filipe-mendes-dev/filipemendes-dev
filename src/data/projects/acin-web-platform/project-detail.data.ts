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
    description: project.description,
    positioning:
      "Positioning: frontend platform work delivered as a Front-End Developer at ACIN group.",
    isMobileApp: false,
    links: [],
  },
  screenshots: {
    items: [],
  },
  keyFeatures: [
    {
      title: "Responsive layouts with native-like behavior via Capacitor",
    },
    {
      title: "GraphQL API integration for platform data",
    },
    {
      title: "Unit and E2E testing with Vitest and Playwright",
    },
  ],
  implementationDetails: [
    {
      title: "Component-based React frontend written in TypeScript",
    },
    {
      title: "Docker-based development environment using Vite and Yarn",
    },
    {
      title: "Testing workflow covering units and end-to-end browser journeys",
    },
  ],
  techStack: [
    "React",
    "TypeScript",
    "GraphQL",
    "Capacitor",
    "Docker",
    "Vite",
    "Yarn",
    "Vitest",
    "Playwright",
  ],
  metadata: createProjectMetadata(
    project.name,
    project.description,
  ),
};
