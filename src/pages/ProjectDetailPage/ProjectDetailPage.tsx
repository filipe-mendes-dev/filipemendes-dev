import type { ReactElement } from 'react';

import Link from 'next/link';

import {
  AppStoreIcon,
  BackIcon,
  ExternalLinkIcon,
  GooglePlayIcon,
} from '../../components/icons';
import { PageSectionSurface } from '../../components/ui/PageSectionSurface';
import surface from '../../components/ui/PageSectionSurface/PageSectionSurface.module.css';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
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

const hasProjectActions = (project: ProjectDetailPageProps['project']): boolean => {
  return hasStoreLinks(project) || project.links.length > 0;
};

export const ProjectDetailPage = ({ project }: ProjectDetailPageProps): ReactElement => {
  const storeLinks = project.storeLinks;

  return (
    <PageSectionSurface className={st.root}>
      <section className={`${surface.section} ${st.heroSection}`}>
        <Container className={st.heroInner}>
          <div className={st.heroReveal} data-landing-reveal="visible">
            <Link href="/#projects" className={st.backLink}>
              <BackIcon className={st.backIcon} />
              <span>Back to Projects</span>
            </Link>

            <header className={st.heroHeader} data-landing-heading-reveal="visible">
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

      {project.screenshots.length > 0 && (
        <Section
          title="Screenshot Gallery"
          className={`${surface.section} ${st.gallerySection}`}
          id="project-detail-gallery"
        >
          <div className={st.galleryGrid} data-landing-reveal="visible">
            {project.screenshots.map((shot) => (
              <figure key={shot.url} className={st.galleryItem}>
                <img
                  src={shot.url}
                  alt={shot.alt}
                  loading="lazy"
                  width="1200"
                  height="750"
                />
              </figure>
            ))}
          </div>
        </Section>
      )}

      <Section
        title="Key Features"
        className={`${surface.section} ${st.featuresSection}`}
        id="project-detail-features"
      >
        <div className={st.detailSectionContent} data-landing-reveal="visible">
          <DetailBulletList items={project.keyFeatures} />
        </div>
      </Section>

      <Section
        title="Architecture"
        className={`${surface.section} ${st.architectureSection}`}
        id="project-detail-architecture"
      >
        <div className={st.detailSectionContent} data-landing-reveal="visible">
          <DetailBulletList items={project.architecture} />
        </div>
      </Section>

      <Section
        title="Tech Stack"
        className={`${surface.section} ${st.stackSection}`}
        id="project-detail-stack"
      >
        <div className={st.stackSectionContent} data-landing-reveal="visible">
          <ul className={su.chipList} aria-label="Project technologies">
            {project.techStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Section>
    </PageSectionSurface>
  );
};
