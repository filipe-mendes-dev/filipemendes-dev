import type { Ref } from 'react';

import type { PortfolioContent } from '../../data/portfolio';

export interface AboutPageProps {
  content: PortfolioContent;
  revealRef?: Ref<HTMLDivElement>;
  headerRevealRef?: Ref<HTMLElement>;
}
