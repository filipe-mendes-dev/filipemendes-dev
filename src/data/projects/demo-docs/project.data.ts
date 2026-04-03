import type { ProjectRecord } from "../projects.interfaces";

export const project: ProjectRecord = {
  id: "demo-docs",
  slug: "demo-docs",
  name: "Demo Docs",
  logo: {
    logoIcon: "document",
  },
  category: "Documentation Sandbox",
  description:
    "Development-only documentation fixtures used to validate docs navigation, layout, and fallback rendering behavior.",
  narrative: {
    problem:
      "The docs area needs realistic non-production content to validate UI states without polluting real project documentation.",
    approach:
      "Keep development-only documents in a dedicated docs sandbox project so they can be enabled or removed as a single unit.",
    stack:
      "Static TypeScript content, docs registry selectors, and UI verification fixtures.",
    outcome:
      "Preserves strict separation between production portfolio content and temporary development-only documentation.",
  },
};
