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
      "Positioning: mobile product work delivered as a Mobile Developer at Nearsoft.",
    isMobileApp: true,
    links: [],
  },
  screenshots: {
    items: [],
  },
  keyFeatures: [
    "Mobile banking flows built with React Native and Redux",
    "REST API integration across app features",
    "Shared internal component library reused across apps",
  ],
  architecture: [
    "TypeScript-first React Native codebase for cross-platform delivery",
    "Native development workflow using Xcode and Android Studio",
    "Shared UI foundation designed for reuse across multiple mobile apps",
  ],
  techStack: [
    "React Native",
    "TypeScript",
    "Redux",
    "REST APIs",
    "Xcode",
    "Android Studio",
  ],
  metadata: createProjectMetadata(
    project.name,
    project.description,
  ),
};
