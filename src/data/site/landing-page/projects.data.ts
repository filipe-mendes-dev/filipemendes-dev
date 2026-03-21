export interface ProjectNarrative {
  problem: string;
  approach: string;
  stack: string;
  outcome: string;
}

export interface ProjectRecord {
  id: string;
  slug: string;
  name: string;
  logoText: string;
  category: string;
  description: string;
  narrative: ProjectNarrative;
}

export const getProjectHref = (slug: string): string => {
  return `/projects/${slug}`;
};

export interface LandingProjectData {
  id: string;
  href: string;
  name: string;
  logoText: string;
  category: string;
  description: string;
  narrative: ProjectNarrative;
}

export const projectsData: ProjectRecord[] = [
  {
    id: "acin-web-platform",
    slug: "acin-web-platform",
    name: "ACIN Web Platform",
    logoText: "AC",
    category: "Frontend Platform",
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
  },
  {
    id: "arc-timer",
    slug: "arc-timer",
    name: "Arc Timer",
    logoText: "AT",
    category: "Mobile App",
    description:
      "A focused interval timer for HIIT workouts designed around precise timing, minimal interaction, and reliable flow during high-intensity sessions.",
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
  },
  {
    id: "nearsoft-mobile-apps",
    slug: "nearsoft-mobile-apps",
    name: "Nearsoft Mobile Banking Apps",
    logoText: "NS",
    category: "Mobile Development",
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
  },
  {
    id: "inov-infrared-detection",
    slug: "inov-infrared-detection",
    name: "INOV Infrared Detection Research",
    logoText: "IN",
    category: "Applied Machine Learning",
    description:
      "Research and engineering work on real-time infrared image classification using EfficientDet, TensorFlow, and OpenCV.",
    narrative: {
      problem:
        "The project needed real-time detection of vehicles, people, and deer from infrared video surveillance data.",
      approach:
        "Developed EfficientDet-based detection solutions, collected and labeled infrared footage, tuned training parameters, and organized a real-world data acquisition event.",
      stack: "Python, TensorFlow, OpenCV, EfficientDet.",
      outcome:
        "Produced research that was published and presented at the 2022 International Conference on Electrical, Computer and Energy Technologies.",
    },
  },
];

export const landingProjectsData: LandingProjectData[] = projectsData.map(
  (project) => {
    return {
      id: project.id,
      href: getProjectHref(project.slug),
      name: project.name,
      logoText: project.logoText,
      category: project.category,
      description: project.description,
      narrative: project.narrative,
    };
  }
);
