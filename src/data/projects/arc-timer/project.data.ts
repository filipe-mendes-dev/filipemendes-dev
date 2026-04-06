import arcTimerDarkLogo from "../../../assets/logos/arc-timer/app-logo-dark.svg";
import arcTimerLightLogo from "../../../assets/logos/arc-timer/app-logo-light.svg";

import type { ProjectRecord } from "../projects.interfaces";

const arcTimerDarkLogoPath = arcTimerDarkLogo as unknown as string;
const arcTimerLightLogoPath = arcTimerLightLogo as unknown as string;

export const project: ProjectRecord = {
  id: "arc-timer",
  slug: "arc-timer",
  name: "Arc Timer",
  logo: {
    logoImage: {
      darkTheme: arcTimerLightLogoPath,
      lightTheme: arcTimerDarkLogoPath,
    },
  },
  category: "Mobile App",
  description:
    "Personal-use project evolved into a production-level application. Full workout flow from setup to execution and tracking.",
};
