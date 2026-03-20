'use client';

import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { PageSectionSurface } from '../../components/ui/PageSectionSurface';
import { Section } from '../../components/ui/Section';
import { useSectionRevealMotion } from '../../shared/motion/useSectionRevealMotion';
import su from '../../shared/styles/utilities.module.css';
import { DetailBulletList } from './components/DetailBulletList';
import { ProjectDetailHero } from './components/ProjectDetailHero';
import type { ProjectDetailPageProps } from './ProjectDetailPage.interfaces';
import st from './ProjectDetailPage.module.css';

export const ProjectDetailPage = ({
  project,
}: ProjectDetailPageProps): ReactElement => {
  const revealMotion = useSectionRevealMotion();

  return (
    <PageSectionSurface className={st.root}>
      <ProjectDetailHero project={project} />

      {project.screenshots.length > 0 && (
        <Section
          className={st.gallerySection}
          contentClassName={st.galleryGrid}
          id="project-detail-gallery"
          isRevealEnabled
          title="Screenshot Gallery"
        >
          {project.screenshots.map((shot) => (
            <motion.figure key={shot.url} className={st.galleryItem} variants={revealMotion.itemVariants}>
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
      )}

      <Section
        className={st.featuresSection}
        contentClassName={st.detailSectionContent}
        id="project-detail-features"
        isRevealEnabled
        title="Key Features"
      >
        <motion.div variants={revealMotion.itemVariants}>
          <DetailBulletList items={project.keyFeatures} />
        </motion.div>
      </Section>

      <Section
        className={st.architectureSection}
        contentClassName={st.detailSectionContent}
        id="project-detail-architecture"
        isRevealEnabled
        title="Architecture"
      >
        <motion.div variants={revealMotion.itemVariants}>
          <DetailBulletList items={project.architecture} />
        </motion.div>
      </Section>

      <Section
        className={st.stackSection}
        contentClassName={st.stackSectionContent}
        id="project-detail-stack"
        isRevealEnabled
        title="Tech Stack"
      >
        <motion.div variants={revealMotion.itemVariants}>
          <ul className={su.chipList} aria-label="Project technologies">
            {project.techStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.div>
      </Section>
    </PageSectionSurface>
  );
};
