import filipemendesMiniLogo from "../../../assets/logos/filipemendesdev/filipemendes-mini.svg";

import type { ProjectRecord } from "../projects.interfaces";

const filipemendesMiniLogoPath = filipemendesMiniLogo as unknown as string;

export const project: ProjectRecord = {
  id: "filipemendes-dev",
  slug: "filipemendes-dev",
  name: "filipemendes.dev",
  logo: {
    logoImage: {
      darkTheme: filipemendesMiniLogoPath,
      lightTheme: filipemendesMiniLogoPath,
    },
  },
  category: "Portfolio Website",
  description:
    "Designed and built a portfolio platform for presenting projects, documentation and a developer profile.",
};
