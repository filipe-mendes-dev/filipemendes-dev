import { educationData, type EducationItem } from "../education.data";
import { experienceData, type ExperienceItem } from "../experience.data";
import { type PublicationItem, publicationsData } from "../publications.data";

export interface AboutData {
  profile: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  publications: PublicationItem[];
}

export const aboutData: AboutData = {
  profile:
    "I take pride in what I do. The magic is in the small details, the consistency and reliability of every interaction. Be it web platform, mobile application or applied machine learning, my goal is to build long lasting products.",
  experience: experienceData,
  education: educationData,
  publications: publicationsData,
};
