'use client';

import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

import { Section } from '../../../../../components/ui/Section';
import { useSectionRevealMotion } from '../../../../../shared/motion/useSectionRevealMotion';
import su from '../../../../../shared/styles/utilities.module.css';
import type { ProjectTechStackSectionProps } from './ProjectTechStackSection.interfaces';
import st from './ProjectTechStackSection.module.css';

export const ProjectTechStackSection = ({
  items,
}: ProjectTechStackSectionProps): ReactElement => {
  const revealMotion = useSectionRevealMotion();

  return (
    <Section
      className={st.root}
      contentClassName={st.content}
      id="project-detail-stack"
      isRevealEnabled
      title="Tech Stack"
    >
      <motion.div variants={revealMotion.itemVariants}>
        <ul className={su.chipList} aria-label="Project technologies">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </motion.div>
    </Section>
  );
};
