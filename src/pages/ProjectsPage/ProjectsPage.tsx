import type { ReactElement } from 'react';

import { AppLink } from '../../components/navigation/AppLink';
import { PosterBlock } from '../../components/ui/PosterBlock';
import { Section } from '../../components/ui/Section';
import type { ProjectsPageProps } from './ProjectsPage.interfaces';
import st from './ProjectsPage.module.css';

export const ProjectsPage = ({ content, navigate }: ProjectsPageProps): ReactElement => {
  return (
    <div className={st.root}>
      <Section
        title="Projects"
        subtitle="Each product is documented with a clear narrative from problem to measurable outcome."
      >
        <div className={st.projectsList}>
          {content.projects.map((project) => (
            <PosterBlock key={project.slug} className={st.projectsListItem}>
              <div className={st.projectsHeaderRow}>
                <div className={st.projectsLogo} aria-hidden="true">
                  {project.logoText}
                </div>
                <div className={st.projectsHeadingGroup}>
                  <p className={st.projectsCategory}>{project.category}</p>
                  <h2>{project.name}</h2>
                </div>
              </div>
              <p className={st.projectsDescription}>{project.description}</p>
              <dl className={st.projectsNarrativeGrid}>
                <div className={st.projectsNarrativeItem}>
                  <dt>Problem</dt>
                  <dd>{project.narrative.problem}</dd>
                </div>
                <div className={st.projectsNarrativeItem}>
                  <dt>Approach</dt>
                  <dd>{project.narrative.approach}</dd>
                </div>
                <div className={st.projectsNarrativeItem}>
                  <dt>Stack</dt>
                  <dd>{project.narrative.stack}</dd>
                </div>
                <div className={st.projectsNarrativeItem}>
                  <dt>Outcome</dt>
                  <dd>{project.narrative.outcome}</dd>
                </div>
              </dl>
              <AppLink href={`/projects/${project.slug}`} navigate={navigate} className={st.projectsLink}>
                View Product Details
              </AppLink>
            </PosterBlock>
          ))}
        </div>
      </Section>
    </div>
  );
};
