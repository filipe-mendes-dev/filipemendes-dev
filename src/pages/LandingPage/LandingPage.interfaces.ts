import type { PortfolioContent } from '../../data/portfolio';
import type { SectionId } from '../../shared/navigation/sections';

export interface LandingPageProps {
  content: PortfolioContent;
  navigate: (href: string) => void;
  activeSection: SectionId;
  requestedSection: SectionId;
  requestedSectionKey: string;
  onActiveSectionChange: (sectionId: SectionId) => void;
}
