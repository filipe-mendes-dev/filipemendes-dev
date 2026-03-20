import type { ReactElement } from 'react';

import { PageSectionSurface } from '../../../components/ui/PageSectionSurface';
import { ProjectDetailHero } from './components/ProjectDetailHero';
import type { ProjectDetailPageProps } from './ProjectDetailPage.interfaces';
import st from './ProjectDetailPage.module.css';

export const ProjectDetailPage = ({
  hero,
  children,
}: ProjectDetailPageProps): ReactElement => {
  return (
    <PageSectionSurface className={st.root}>
      <ProjectDetailHero hero={hero} />
      {children}
    </PageSectionSurface>
  );
};
