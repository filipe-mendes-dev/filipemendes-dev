import type {
  CvContactLink,
  CvPersonalInfo,
} from "../../../../data/site/cv/cv.interfaces";

export interface CvShowcaseHeaderProps {
  contactLinks: CvContactLink[];
  personalInfo: CvPersonalInfo;
}
