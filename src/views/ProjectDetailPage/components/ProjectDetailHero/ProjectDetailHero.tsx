'use client';

import type { ReactElement } from 'react';

import Link from 'next/link';

import {
  AppStoreIcon,
  BackIcon,
  ExternalLinkIcon,
  GooglePlayIcon,
} from '../../../../components/icons';
import { Container } from '../../../../components/ui/Container';
import surface from '../../../../components/ui/PageSectionSurface/PageSectionSurface.module.css';
import su from '../../../../shared/styles/utilities.module.css';
import type { ProjectDetailHeroProps } from './ProjectDetailHero.interfaces';
import st from './ProjectDetailHero.module.css';

const hasStoreLinks = (project: ProjectDetailHeroProps['project']): boolean => {
  return (
    project.storeLinks?.appStore !== undefined ||
    project.storeLinks?.googlePlay !== undefined
  );
};

const hasProjectActions = (
  project: ProjectDetailHeroProps['project'],
): boolean => {
  return hasStoreLinks(project) || project.links.length > 0;
};

export const ProjectDetailHero = ({
  project,
}: ProjectDetailHeroProps): ReactElement => {
  const storeLinks = project.storeLinks;

  return (
    <section className={`${surface.section} ${st.root}`}>
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
                <div className={st.storeLinkRow} aria-label="Mobile app stores">
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
  );
};
