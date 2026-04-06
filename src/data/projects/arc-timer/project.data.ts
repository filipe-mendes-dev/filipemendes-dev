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
  narrative: {
    problem:
      "HIIT sessions require precise timing and minimal interaction, but many workout timers force too much attention back onto the device during execution.",
    approach:
      "Designed the product around a time-driven interaction model with large visual feedback, predictable transitions, and low-friction workout execution once a session starts.",
    stack:
      "React Native, TypeScript, timer orchestration, background execution handling, audio and haptic feedback.",
    outcome:
      "Created a timer experience optimized for trust, responsiveness, and uninterrupted workout flow under real high-intensity usage conditions.",
  },
};
