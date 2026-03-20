'use client';

import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

import { Section } from '../../../../../components/ui/Section';
import { useSectionRevealMotion } from '../../../../../shared/motion/useSectionRevealMotion';
import type { ProjectScreenshotsSectionProps } from './ProjectScreenshotsSection.interfaces';
import st from './ProjectScreenshotsSection.module.css';

export const ProjectScreenshotsSection = ({
  screenshots,
}: ProjectScreenshotsSectionProps): ReactElement | null => {
  const revealMotion = useSectionRevealMotion();

  if (screenshots.length === 0) {
    return null;
  }

  return (
    <Section
      className={st.root}
      contentClassName={st.galleryGrid}
      id="project-detail-gallery"
      title="Screenshot Gallery"
    >
      {screenshots.map((shot) => (
        <motion.figure
          key={shot.url}
          className={st.galleryItem}
          variants={revealMotion.itemVariants}
        >
          <img
            src={shot.url}
            alt={shot.alt}
            loading="lazy"
            width="1200"
            height="750"
          />
        </motion.figure>
      ))}
    </Section>
  );
};
