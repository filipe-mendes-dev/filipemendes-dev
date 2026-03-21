export interface PersonData {
  name: string;
  role: string;
  summary: string;
  currentStatus: string;
  portrait: {
    alt: string;
    url: string;
    srcSet: string;
    sizes: string;
  };
  aboutProfile: string;
}

export const personData: PersonData = {
  name: "Filipe Mendes",
  role: "Frontend and mobile software developer with experience across React, React Native, TypeScript, GraphQL, and applied machine learning.",
  summary:
    "I enjoy solving complex problems efficiently, learning quickly, and adapting fast to new domains. My recent work spans frontend web platforms, mobile banking apps, and computer vision research.",
  currentStatus: "Based in Madeira, Portugal.",
  portrait: {
    alt: "Portrait of Filipe Mendes from CV",
    url: "/images/filipe-mendes-250.webp",
    srcSet:
      "/images/filipe-mendes-250.webp 250w, /images/filipe-mendes-500.webp 500w",
    sizes: "(min-width: 64rem) 192px, (min-width: 48rem) 176px, 152px",
  },
  aboutProfile:
    "I have a keen eye for detail and enjoy solving complex challenges efficiently. My background combines frontend web development, mobile app delivery, and machine learning research, shaped by a fast-learning and adaptable approach.",
};
