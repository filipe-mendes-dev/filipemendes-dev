import type { ReactElement } from 'react';

import { RevealItem } from '../../../../components/ui/RevealItem';
import { Section } from '../../../../components/ui/Section';
import { ProjectCard } from './components/ProjectCard';
import type { ProjectsSectionProps } from './ProjectsSection.interfaces';
import st from './ProjectsSection.module.css';

export const ProjectsSection = ({
  content,
  initialRevealState = 'visible',
  sectionId,
  revealRef,
  headerRevealRef,
}: ProjectsSectionProps): ReactElement => {
  return (
    <div className={st.root}>
      <Section
        title="Projects"
        subtitle="Each product is documented with a clear narrative from problem to measurable outcome."
        headerProps={{ 'data-landing-section-heading': sectionId }}
        initialHeadingRevealState={initialRevealState}
        headerRevealRef={headerRevealRef}
      >
        <div
          ref={revealRef}
          className={st.projectsList}
          data-landing-reveal={initialRevealState}
          data-landing-section-content={sectionId}
        >
          {content.projects.map((project, index) => (
            <RevealItem key={project.slug} index={index}>
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </div>
      </Section>
    </div>
  );
};
