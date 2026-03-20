import type { ReactNode } from 'react';

import type { ProjectDetailHeroData } from './components/ProjectDetailHero';

export interface ProjectDetailPageProps {
  hero: ProjectDetailHeroData;
  children: ReactNode;
}
