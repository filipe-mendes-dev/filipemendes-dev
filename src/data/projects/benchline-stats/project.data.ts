import benchlineStatsLogo from "../../../assets/logos/benchline-stats/symbol.svg";

import type { ProjectRecord } from "../projects.interfaces";

const benchlineStatsLogoPath = benchlineStatsLogo as unknown as string;

export const project: ProjectRecord = {
  id: "benchline-stats",
  slug: "benchline-stats",
  name: "Benchline Stats",
  logo: {
    logoImage: {
      darkTheme: benchlineStatsLogoPath,
      lightTheme: benchlineStatsLogoPath,
    },
  },
  category: "Web App / PWA",
  description:
    "A rink-hockey PWA for offline match recording and interactive post-match analysis.",
};
