'use client';

import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

import { Section } from '../../../../components/ui/Section';
import { useSectionRevealMotion } from '../../../../shared/motion/useSectionRevealMotion';
import { ProjectCard } from './components/ProjectCard';
import type { ProjectsSectionProps } from './ProjectsSection.interfaces';
import st from './ProjectsSection.module.css';

export const ProjectsSection = ({ content, isRevealEnabled }: ProjectsSectionProps): ReactElement => {
  const revealMotion = useSectionRevealMotion();

  return (
    <Section
      className={st.root}
      contentClassName={st.projectsList}
      id="projects"
      isRevealEnabled={isRevealEnabled}
      subtitle="Each product is documented with a clear narrative from problem to measurable outcome."
      title="Projects"
    >
      {content.projects.map((project) => (
        <motion.div key={project.slug} variants={revealMotion.itemVariants}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </Section>
  );
};
