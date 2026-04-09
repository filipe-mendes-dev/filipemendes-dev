import type { PublicationItem } from "../../../../../data/site/publications.data";

export interface CvPublicationsSectionProps {
  entries: PublicationItem[];
  hasBottomSeparator?: boolean;
}
