import type { Ref } from 'react';

import type { PortfolioContent } from '../../../../data/portfolio';

export interface AboutSectionProps {
  content: PortfolioContent;
  initialRevealState?: 'pending' | 'visible';
  revealRef?: Ref<HTMLDivElement>;
  headerRevealRef?: Ref<HTMLElement>;
}
