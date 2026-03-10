import type { Ref } from 'react';

import type { PortfolioContent } from '../../data/portfolio';

export interface ProjectsPageProps {
  content: PortfolioContent;
  navigate: (href: string) => void;
  revealRef?: Ref<HTMLDivElement>;
  headerRevealRef?: Ref<HTMLElement>;
}
