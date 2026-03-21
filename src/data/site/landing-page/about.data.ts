import { educationData, type EducationItem } from "../education.data";
import { experienceData, type ExperienceItem } from "../experience.data";
import { personData } from "../person.data";
import {
  type PublicationItem,
  publicationsData,
} from "../publications.data";

export interface AboutData {
  profile: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  publications: PublicationItem[];
}

export const aboutData: AboutData = {
  profile: personData.aboutProfile,
  experience: experienceData,
  education: educationData,
  publications: publicationsData,
};
