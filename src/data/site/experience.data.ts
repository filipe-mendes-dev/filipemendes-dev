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
    title: "Product Development",
    organization: "Independent",
    timeframe: "December 2025 - Present",
    context:
      "Designed, built and shipped software products independently, covering product design, implementation, testing and release.",
    bullets: [
      "Launched Arc Timer, a React Native workout application for iOS and Android, developed end-to-end from concept to store submission.",
      "Built filipemendes.dev, a responsive portfolio platform showcasing projects, documentation and technical content.",
    ],
    stack: [
      "React Native",
      "Next.js",
      "TypeScript",
      "TanStack Query",
      "Jest",
      "Vercel",
    ],
  },
  {
    title: "Frontend Engineer",
    organization: "ACIN group",
    timeframe: "October 2023 - July 2025",
    context:
      "Modernized a healthcare management platform used by 10k+ users by migrating legacy PHP interfaces to React, introducing API-driven workflows while maintaining compatibility between legacy and modern systems.",
    bullets: [
      "Owned the frontend implementation of admin dashboards, patient management and prescription features.",
      "Integrated GraphQL APIs supporting complex forms, validation and paginated data interfaces.",
      "Implemented responsive, mobile-first interfaces optimized for data-dense healthcare applications.",
      "Improved UI quality and consistency by collaborating with designers, proposing and implementing reusable UI primitives adopted throughout the application.",
    ],
    stack: [
      "React",
      "TypeScript",
      "GraphQL",
      "Zustand",
      "Styled Components",
      "Playwright",
      "Figma",
      "Git",
    ],
  },
  {
    title: "Mobile Engineer",
    organization: "Nearsoft",
    timeframe: "January 2023 - September 2023",
    context:
      "Developed cross-platform mobile banking applications using React Native for Caixa Angola and Keve, each currently exceeding 10k+ downloads on Google Play alone.",
    bullets: [
      "Owned the implementation of account management, transfers, payments and debit card features.",
      "Integrated REST APIs supporting authentication, request mapping, pagination and error handling.",
      "Built reusable components and screen patterns, including animated cards and progress indicators, to improve consistency and accelerate feature development.",
      "Prepared production builds and contributed to App Store and Google Play release submissions.",
    ],
    stack: [
      "React Native",
      "TypeScript",
      "REST APIs",
      "Postman",
      "Redux",
      "Figma",
    ],
  },
  {
    title: "Software Engineer",
    organization: "INOV",
    timeframe: "March 2021 - February 2022",
    context:
      "Worked on applied computer vision research for infrared-based object detection and classification in surveillance systems.",
    bullets: [
      "Built an infrared-based detection system for identifying people, vehicles and deer.",
      // "Collected, labeled and curated datasets, including organizing on-site data acquisition.",
      "Trained and evaluated models using TensorFlow and supported deployment into a C# inference application using OpenCV.",
    ],
    stack: ["Python", "TensorFlow", "CUDA", "OpenCV", "Computer Vision"],
  },
];
