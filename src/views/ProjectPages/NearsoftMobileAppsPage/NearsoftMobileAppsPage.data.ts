import type { Metadata } from "next";

import { portfolio } from "../../../data/portfolio";
import type {
  ProjectDetailHeroData,
  ProjectScreenshotItem,
} from '../ProjectDetailPage';

export const nearsoftMobileAppsHero: ProjectDetailHeroData = {
  name: "Nearsoft Mobile Banking Apps",
  logoText: "NS",
  category: "Mobile Development",
  description:
    "Mobile banking app development centered on React Native, TypeScript, Redux, REST integrations, and reusable UI components.",
  positioning:
    "Positioning: mobile product work delivered as a Mobile Developer at Nearsoft.",
  isMobileApp: true,
  links: [],
};

export const nearsoftMobileAppsScreenshots: ProjectScreenshotItem[] = [];

export const nearsoftMobileAppsKeyFeatures: string[] = [
  "Mobile banking flows built with React Native and Redux",
  "REST API integration across app features",
  "Shared internal component library reused across apps",
];

export const nearsoftMobileAppsArchitecture: string[] = [
  "TypeScript-first React Native codebase for cross-platform delivery",
  "Native development workflow using Xcode and Android Studio",
  "Shared UI foundation designed for reuse across multiple mobile apps",
];

export const nearsoftMobileAppsTechStack: string[] = [
  "React Native",
  "TypeScript",
  "Redux",
  "REST APIs",
  "Xcode",
  "Android Studio",
];

const title = `${nearsoftMobileAppsHero.name} | ${portfolio.siteTitle}`;

export const nearsoftMobileAppsMetadata: Metadata = {
  title,
  description: nearsoftMobileAppsHero.description,
  openGraph: {
    title,
    description: nearsoftMobileAppsHero.description,
    type: "article",
  },
  twitter: {
    card: "summary",
    title,
    description: nearsoftMobileAppsHero.description,
  },
};
