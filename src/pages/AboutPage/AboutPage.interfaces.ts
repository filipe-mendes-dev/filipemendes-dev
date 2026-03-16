import type { Ref } from 'react';

import type { PortfolioContent } from '../../data/portfolio';

export interface AboutPageProps {
  content: PortfolioContent;
  sectionClassName?: string;
  sectionId?: string;
  revealRef?: Ref<HTMLDivElement>;
  headerRevealRef?: Ref<HTMLElement>;
}
