import type { PortfolioContent } from '../../data/portfolio';

import type { SectionId } from '../../shared/navigation/sections';

export interface HomePageProps {
  content: PortfolioContent;
  navigate: (href: string) => void;
  onSectionRequest: (sectionId: SectionId) => void;
}
