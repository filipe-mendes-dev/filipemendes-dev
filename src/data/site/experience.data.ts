export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  summary: string;
}

export const experienceData: ExperienceItem[] = [
  {
    role: "Frontend Developer",
    company: "ACIN group",
    period: "Oct 2023 - Jul 2025",
    summary:
      "Developed core features for a production healthcare platform, improving usability and consistency across key workflows. Built responsive interfaces with React and TypeScript and integrated GraphQL APIs across devices.",
  },
  {
    role: "Mobile Developer",
    company: "Nearsoft",
    period: "Jan 2023 - Sep 2023",
    summary:
      "Delivered mobile banking features with focus on reliability and performance. Built cross-platform functionality with React Native and TypeScript, integrated REST APIs and contributed to a shared component library.",
  },
  {
    role: "Software Engineer",
    company: "INOV",
    period: "Mar 2021 - Feb 2022",
    summary:
      "Developed real-time object detection using EfficientDet for applied machine learning research. Collected and labeled infrared data, trained and evaluated models and published results at an international conference.",
  },
];
