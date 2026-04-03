import type { ProjectRecord } from "../projects.interfaces";

export const project: ProjectRecord = {
  id: "nearsoft-mobile-apps",
  slug: "nearsoft-mobile-apps",
  name: "Nearsoft Mobile Banking Apps",
  logo: {
    logoText: "NS",
  },
  category: "Mobile Development",
  isProfessional: true,
  description:
    "Mobile banking app development centered on React Native, TypeScript, Redux, REST integrations, and reusable UI components.",
  narrative: {
    problem:
      "The apps required reliable mobile delivery, shared component reuse, and coordination across iOS and Android native workflows.",
    approach:
      "Built mobile banking experiences with React Native, TypeScript, and Redux, integrated REST APIs, and worked with Xcode and Android Studio for native development.",
    stack:
      "React Native, TypeScript, Redux, REST APIs, Xcode, Android Studio.",
    outcome:
      "Delivered cross-platform banking app features, contributed to a shared internal component library, and supported the onboarding of a summer intern.",
  },
};
