import type { ExperienceItem } from "../../../../../data/site/experience.data";

export interface CvExperienceSectionProps {
  entries: ExperienceItem[];
  hasBottomSeparator?: boolean;
}
