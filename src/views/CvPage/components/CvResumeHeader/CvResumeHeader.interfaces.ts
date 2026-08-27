import type {
  CvContactLink,
  CvPersonalInfo,
} from "../../../../data/site/cv/cv.interfaces";

export interface CvResumeHeaderProps {
  contactLinks: CvContactLink[];
  personalInfo: CvPersonalInfo;
}
