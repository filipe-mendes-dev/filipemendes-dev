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
};
