import type { CvProjectEntry } from "../../../../../data/site/cv/cv.interfaces";

export interface CvProjectsSectionProps {
  entries: CvProjectEntry[];
  hasBottomSeparator?: boolean;
}
