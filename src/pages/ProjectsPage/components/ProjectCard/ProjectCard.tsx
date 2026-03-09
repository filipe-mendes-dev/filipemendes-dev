import type { ReactElement } from 'react';

import { AppLink } from '../../../../components/navigation/AppLink';
import { ExternalLinkIcon } from '../../../../components/icons';
import { SoftSurface } from '../../../../components/ui/SoftSurface';
import { ProjectNarrativeList } from '../ProjectNarrativeList';
import type { ProjectCardProps } from './ProjectCard.interfaces';
import st from './ProjectCard.module.css';

export const ProjectCard = ({ navigate, project }: ProjectCardProps): ReactElement => {
  return (
    <SoftSurface className={st.root}>
      <div className={st.header}>
        <div className={st.lead}>
          <div className={st.marker} aria-hidden="true">
            {project.logoText}
          </div>

          <div className={st.heading}>
            <p className={st.category}>{project.category}</p>
            <h2 className={st.title}>{project.name}</h2>
          </div>
        </div>
      </div>

      <p className={st.description}>{project.description}</p>

      <div className={st.actions}>
        <AppLink href={`/projects/${project.slug}`} navigate={navigate} className={st.link}>
          <span>View Product Details</span>
          <ExternalLinkIcon className={st.linkIcon} />
        </AppLink>
      </div>

      <ProjectNarrativeList narrative={project.narrative} />
    </SoftSurface>
  );
};
