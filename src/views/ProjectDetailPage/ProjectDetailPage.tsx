'use client';

import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

import Link from 'next/link';

import {
  AppStoreIcon,
  BackIcon,
  ExternalLinkIcon,
  GooglePlayIcon,
} from '../../components/icons';
import { Container } from '../../components/ui/Container';
import { PageSectionSurface } from '../../components/ui/PageSectionSurface';
import surface from '../../components/ui/PageSectionSurface/PageSectionSurface.module.css';
import { Section } from '../../components/ui/Section';
import { useSectionRevealMotion } from '../../shared/motion/useSectionRevealMotion';
import su from '../../shared/styles/utilities.module.css';
import { DetailBulletList } from './components/DetailBulletList';
import type { ProjectDetailPageProps } from './ProjectDetailPage.interfaces';
import st from './ProjectDetailPage.module.css';

const hasStoreLinks = (project: ProjectDetailPageProps['project']): boolean => {
  return (
    project.storeLinks?.appStore !== undefined ||
    project.storeLinks?.googlePlay !== undefined
  );
};

const hasProjectActions = (
  project: ProjectDetailPageProps['project'],
): boolean => {
  return hasStoreLinks(project) || project.links.length > 0;
};

export const ProjectDetailPage = ({
  project,
}: ProjectDetailPageProps): ReactElement => {
  const storeLinks = project.storeLinks;
  const revealMotion = useSectionRevealMotion();

  return (
    <PageSectionSurface className={st.root}>
      <section className={`${surface.section} ${st.heroSection}`}>
        <Container className={st.heroInner}>
          <div className={st.heroReveal}>
            <Link href="/" className={st.backLink}>
              <BackIcon className={st.backIcon} />
              <span>Go Back</span>
            </Link>

            <header className={st.heroHeader}>
              <div className={st.heroTitleRow}>
                <div className={st.projectLogo} aria-hidden="true">
                  {project.logoText}
                </div>
                <div className={st.projectHeaderIntro}>
                  <p className={st.projectCategory}>{project.category}</p>
                  <h1 className={st.projectTitle}>{project.name}</h1>
                </div>
              </div>
              <div className={st.projectHeaderContent}>
                <p className={st.projectPositioning}>{project.positioning}</p>
                <p className={st.projectDescription}>{project.description}</p>
              </div>
            </header>

            {hasProjectActions(project) && (
              <div className={st.heroActions}>
                {project.isMobileApp && hasStoreLinks(project) && (
                  <div
                    className={st.storeLinkRow}
                    aria-label="Mobile app stores"
                  >
                    {storeLinks?.appStore !== undefined && (
                      <a
                        href={storeLinks.appStore}
                        className={`${su.button} ${su.buttonSecondary} ${st.storeBadgeLink}`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Download on the App Store"
                      >
                        <AppStoreIcon className={st.storeBadgeIcon} />
                        <span>App Store</span>
                      </a>
                    )}
                    {storeLinks?.googlePlay !== undefined && (
                      <a
                        href={storeLinks.googlePlay}
                        className={`${su.button} ${su.buttonSecondary} ${st.storeBadgeLink}`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Get it on Google Play"
                      >
                        <GooglePlayIcon className={st.storeBadgeIcon} />
                        <span>Google Play</span>
                      </a>
                    )}
                  </div>
                )}
                {project.links.length > 0 && (
                  <div className={st.projectDetailLinks}>
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className={`${su.textLink} ${st.metaLink}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>{link.label}</span>
                        <ExternalLinkIcon className={st.metaLinkIcon} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
      </section>

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
