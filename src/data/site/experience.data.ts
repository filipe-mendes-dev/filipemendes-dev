export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  summary: string;
}

export const experienceData: ExperienceItem[] = [
  {
    role: "Front-End Developer",
    company: "ACIN group",
    period: "Oct 2023 - Jul 2025",
    summary:
      "Built web platform features with React and TypeScript, implemented responsive layouts with Capacitor, integrated GraphQL APIs, and worked with Vitest and Playwright.",
  },
  {
    role: "Mobile Developer",
    company: "Nearsoft",
    period: "Jan 2023 - Sep 2023",
    summary:
      "Developed mobile banking apps with React Native, TypeScript, and Redux, integrated REST APIs, and contributed to a shared internal component library.",
  },
  {
    role: "Software Engineer",
    company: "INOV",
    period: "Mar 2021 - Feb 2022",
    summary:
      "Developed real-time detection solutions with EfficientDet, collected and labeled infrared data, and published the resulting research at an international conference.",
  },
];
