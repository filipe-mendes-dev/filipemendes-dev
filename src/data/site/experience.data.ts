export type ExperienceId = "acin" | "nearsoft" | "inov";

export interface ExperienceItem {
  id: ExperienceId;
  title: string;
  organization: string;
  timeframe: string;
  context: string;
  bullets: string[];
  stack: string[];
}

export const experienceData: ExperienceItem[] = [
  // {
  //   title: "Product Development",
  //   organization: "Independent",
  //   timeframe: "December 2025 - Present",
  //   context:
  //     "Designed, built and shipped software products independently, covering product design, implementation, testing and release.",
  //   bullets: [
  //     "Launched Arc Timer, a React Native workout application for iOS and Android, developed end-to-end from concept to store submission.",
  //     "Built filipemendes.dev, a responsive portfolio platform showcasing projects, documentation and technical content.",
  //   ],
  //   stack: [
  //     "React Native",
  //     "Next.js",
  //     "TypeScript",
  //     "TanStack Query",
  //     "Jest",
  //     "Vercel",
  //   ],
  // },
  {
    id: "acin",
    title: "Frontend Engineer",
    organization: "ACIN group",
    timeframe: "October 2023 - July 2025",
    context:
      "Modernized a healthcare management platform used by 10k+ users by building React and TypeScript interfaces with GraphQL APIs, improving the user experience for healthcare professionals.",
    bullets: [
      "Built React and TypeScript interfaces for admin dashboards, patient management and prescription workflows, integrating GraphQL APIs for authentication, form submission and paginated data views.",
      "Implemented responsive and accessible interfaces using semantic HTML and adaptive CSS, ensuring the application worked across desktop and mobile devices.",
      "Collaborated with backend engineers, designers and QA to refine GraphQL schemas, build reusable React components and iterate on feedback, improving UI consistency and development efficiency.",
      "Leveraged AI-assisted development using Cursor and GitHub Copilot to accelerate feature implementation, code reviews and frontend development workflows.",
    ],
    stack: [
      "React",
      "TypeScript",
      "GraphQL",
      "Zustand",
      "Styled Components",
      "Playwright",
      "Figma",
      "Cursor",
      "Copilot",
      "Git",
    ],
  },
  {
    id: "nearsoft",
    title: "Mobile Engineer",
    organization: "Nearsoft",
    timeframe: "January 2023 - September 2023",
    context:
      "Developed cross-platform mobile banking applications using React Native and TypeScript for Caixa Angola and Keve, each exceeding 10k+ downloads on Google Play.",
    bullets: [
      "Built React Native and TypeScript features for account management, transfers, payments and debit cards, integrating REST APIs for authentication, transactions and error handling across mobile banking applications.",
      "Implemented reusable React Native components and managed application state with Redux, improving UI consistency, simplifying data flow and accelerating feature development.",
      "Collaborated with designers using Figma to translate designs into responsive mobile interfaces, ensuring consistent user experiences across iOS and Android.",
      "Onboarded and mentored a frontend intern, introducing Git-based version control workflows and supporting day-to-day feature development.",
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
    id: "inov",
    title: "Software Engineer",
    organization: "INOV",
    timeframe: "March 2021 - February 2022",
    context:
      "Worked on applied computer vision research for infrared-based object detection and classification in surveillance systems.",
    bullets: [
      // "Built an infrared-based detection system for identifying people, vehicles and deer.",
      // "Collected, labeled and curated datasets, including organizing on-site data acquisition.",
      // "Trained and evaluated models using TensorFlow and supported deployment into a C# inference application using OpenCV.",
    ],
    stack: ["Python", "TensorFlow", "CUDA", "OpenCV", "Computer Vision"],
  },
];
