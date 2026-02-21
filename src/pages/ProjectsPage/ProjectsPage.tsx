import type { ReactElement } from 'react';

import { AppLink } from '../../components/navigation/AppLink';
import { Container } from '../../components/ui/Container';
import { PosterBlock } from '../../components/ui/PosterBlock';
import { Section } from '../../components/ui/Section';
import su from '../../shared/styles/utilities.module.css';
import type { ProjectsPageProps } from './ProjectsPage.interfaces';
import st from './ProjectsPage.module.css';

export const ProjectsPage = ({ content, navigate }: ProjectsPageProps): ReactElement => {
  return (
    <div className={st.root}>
      <Section
        title="Projects"
        subtitle="Each product is documented with a clear narrative from problem to measurable outcome."
      >
        <Container>
          <div className={st.projectsList}>
            {content.projects.map((project) => (
              <PosterBlock key={project.slug} className={st.projectsListItem}>
                <div className={st.projectsHeaderRow}>
                  <h2>{project.name}</h2>
                  <p className={su.cardEyebrow}>{project.category}</p>
                </div>
                <p>{project.description}</p>
                <dl className={su.projectStoryGrid}>
                  <div>
                    <dt>Problem</dt>
                    <dd>{project.narrative.problem}</dd>
                  </div>
                  <div>
                    <dt>Approach</dt>
                    <dd>{project.narrative.approach}</dd>
                  </div>
                  <div>
                    <dt>Stack</dt>
                    <dd>{project.narrative.stack}</dd>
                  </div>
                  <div>
                    <dt>Outcome</dt>
                    <dd>{project.narrative.outcome}</dd>
                  </div>
                </dl>
                <AppLink href={`/projects/${project.slug}`} navigate={navigate} className={su.textLink}>
                  View Product Details
                </AppLink>
              </PosterBlock>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};
