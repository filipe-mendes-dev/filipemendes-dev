import type { Ref } from 'react';

import type { PortfolioContent } from '../../data/portfolio';

export interface HomePageProps {
  content: PortfolioContent;
  revealRef?: Ref<HTMLDivElement>;
}
