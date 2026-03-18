import type { Ref } from 'react';

import type { PortfolioContent } from '../../../../data/portfolio';

export interface ContactSectionProps {
  content: PortfolioContent;
  initialRevealState?: 'pending' | 'visible';
  revealRef?: Ref<HTMLDivElement>;
  headerRevealRef?: Ref<HTMLElement>;
}
