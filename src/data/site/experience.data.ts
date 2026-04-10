export interface ExperienceItem {
  title: string;
  organization: string;
  timeframe: string;
  context: string;
  bullets: string[];
  stack: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    title: "Frontend Developer",
    organization: "ACIN group",
    timeframe: "Oct 2023 - Jul 2025",
    context:
      "Contributed to migrating a legacy healthcare platform from server-rendered PHP to React, introducing API-driven workflows and establishing consistent behavior across devices.",
    bullets: [
      "Built React interfaces for admin dashboards, patient records and medication workflows.",
      "Implemented GraphQL queries and mutations for form submission, validation and pagination.",
      "Developed reusable form patterns and layout primitives for large, mobile-constrained workflows.",
      "Ported legacy PHP screens to React while maintaining parallel old and new interfaces.",
    ],
    stack: ["React", "TypeScript", "GraphQL", "Styled Components"],
  },
  {
    title: "Mobile Developer",
    organization: "Nearsoft",
    timeframe: "Jan 2023 - Sep 2023",
    context:
      "Worked on mobile banking applications from initial development to release, covering core financial workflows under production constraints.",
    bullets: [
      "Built React Native interfaces across account management, transfers, payments and debit card features.",
      "Integrated REST APIs handling authentication, request mapping, pagination and error states.",
      "Improved flow modularity and shared component structure to reduce duplication across screens.",
      "Participated in App Store and Google Play release processes.",
    ],
    stack: ["React Native", "TypeScript", "REST APIs"],
  },
  {
    title: "Software Engineer",
    organization: "INOV",
    timeframe: "Mar 2021 - Feb 2022",
    context:
      "Worked on applied computer vision research for infrared-based object detection and classification in surveillance systems.",
    bullets: [
      "Built an infrared-based detection system for identifying people, vehicles and deer.",
      "Collected, labeled and curated datasets, including organizing on-site data acquisition.",
      "Trained and evaluated models using TensorFlow and supported deployment into a C# inference application using OpenCV.",
    ],
    stack: ["Python", "TensorFlow", "CUDA", "OpenCV", "Computer Vision"],
  },
];
