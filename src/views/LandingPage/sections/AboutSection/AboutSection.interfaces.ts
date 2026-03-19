import type { Ref } from 'react';

import type { PortfolioContent } from '../../../../data/portfolio';
import type { SectionId } from '../../../../shared/navigation/sections';

export interface AboutSectionProps {
  content: PortfolioContent;
  initialRevealState?: 'pending' | 'visible';
  sectionId: SectionId;
  revealRef?: Ref<HTMLDivElement>;
  headerRevealRef?: Ref<HTMLElement>;
}
