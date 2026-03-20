import type { Metadata } from "next";

import { portfolio } from "../../../data/portfolio";
import type {
  ProjectDetailHeroData,
  ProjectScreenshotItem,
} from '../ProjectDetailPage';

export const acinWebPlatformHero: ProjectDetailHeroData = {
  name: "ACIN Web Platform",
  logoText: "AC",
  category: "Frontend Platform",
  description:
    "Web platform development work focused on responsive React interfaces, GraphQL integration, and native-like behavior on the web.",
  positioning:
    "Positioning: frontend platform work delivered as a Front-End Developer at ACIN group.",
  isMobileApp: false,
  links: [],
};

export const acinWebPlatformScreenshots: ProjectScreenshotItem[] = [];

export const acinWebPlatformKeyFeatures: string[] = [
  "Responsive layouts with native-like behavior via Capacitor",
  "GraphQL API integration for platform data",
  "Unit and E2E testing with Vitest and Playwright",
];

export const acinWebPlatformArchitecture: string[] = [
  "Component-based React frontend written in TypeScript",
  "Docker-based development environment using Vite and Yarn",
  "Testing workflow covering units and end-to-end browser journeys",
];

export const acinWebPlatformTechStack: string[] = [
  "React",
  "TypeScript",
  "GraphQL",
  "Capacitor",
  "Docker",
  "Vite",
  "Yarn",
  "Vitest",
  "Playwright",
];

const title = `${acinWebPlatformHero.name} | ${portfolio.siteTitle}`;

export const acinWebPlatformMetadata: Metadata = {
  title,
  description: acinWebPlatformHero.description,
  openGraph: {
    title,
    description: acinWebPlatformHero.description,
    type: "article",
  },
  twitter: {
    card: "summary",
    title,
    description: acinWebPlatformHero.description,
  },
};
