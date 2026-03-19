import type { Ref } from 'react';

import type { PortfolioContent } from '../../../../data/portfolio';

export interface HeroSectionProps {
  content: PortfolioContent;
  revealRef?: Ref<HTMLDivElement>;
}
