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
    "The magic is in the small details, the consistency and the reliability of every interaction. Across web platforms and mobile applications, I focus on building products I am proud of.",
  experience: experienceData,
  education: educationData,
  publications: publicationsData,
};
