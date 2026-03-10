import type { Ref } from 'react';

import type { PortfolioContent } from '../../data/portfolio';

export interface ContactPageProps {
  content: PortfolioContent;
  revealRef?: Ref<HTMLDivElement>;
  headerRevealRef?: Ref<HTMLElement>;
}
