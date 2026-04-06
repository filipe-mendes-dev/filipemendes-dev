import type { ProjectRecord } from "../projects.interfaces";

export const project: ProjectRecord = {
  id: "acin-web-platform",
  slug: "acin-web-platform",
  name: "ACIN Web Platform",
  logo: {
    logoText: "AC",
  },
  category: "Frontend Platform",
  isProfessional: true,
  description:
    "Web platform development work focused on responsive React interfaces, GraphQL integration, and native-like behavior on the web.",
  narrative: {
    problem:
      "The platform needed modern frontend delivery with responsive behavior, API integration, and dependable test coverage.",
    approach:
      "Built the product using React and TypeScript, integrated GraphQL data flows, worked in a Docker-based setup with Vite and Yarn, and covered flows with Vitest and Playwright.",
    stack:
      "React, TypeScript, GraphQL, Capacitor, Docker, Vite, Yarn, Vitest, Playwright.",
    outcome:
      "Shipped production frontend work for ACIN group from October 2023 to July 2025 with a strong focus on responsiveness and delivery quality.",
  },
};
