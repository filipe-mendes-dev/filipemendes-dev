import type { PortfolioContent } from '../../data/portfolio';

export interface HomePageProps {
  content: PortfolioContent;
  navigate: (href: string) => void;
}
