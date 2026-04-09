import type { EducationItem } from "../../../../../data/site/education.data";

export interface CvEducationSectionProps {
  entries: EducationItem[];
  hasBottomSeparator?: boolean;
}
