import type { ReactElement } from 'react';

import { Section } from '../../components/ui/Section';
import { ProjectCard } from './components/ProjectCard';
import type { ProjectsPageProps } from './ProjectsPage.interfaces';
import st from './ProjectsPage.module.css';

export const ProjectsPage = ({ content, navigate, revealRef, headerRevealRef }: ProjectsPageProps): ReactElement => {
  return (
    <div className={st.root}>
      <Section
        title="Projects"
        subtitle="Each product is documented with a clear narrative from problem to measurable outcome."
        {...(headerRevealRef === undefined ? {} : { headerRevealRef })}
      >
        <div ref={revealRef} className={st.projectsList} data-landing-reveal="visible">
          {content.projects.map((project) => (
            <ProjectCard key={project.slug} navigate={navigate} project={project} />
          ))}
        </div>
      </Section>
    </div>
  );
};
