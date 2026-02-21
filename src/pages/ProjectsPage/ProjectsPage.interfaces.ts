import type { PortfolioContent } from '../../data/portfolio';

export interface ProjectsPageProps {
  content: PortfolioContent;
  navigate: (href: string) => void;
}
