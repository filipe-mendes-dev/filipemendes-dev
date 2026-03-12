import { type ReactElement, useCallback } from 'react';

import { BackIcon, ExternalLinkIcon } from '../../components/icons';
import { AppLink } from '../../components/navigation/AppLink';
import { TextActionLink } from '../../components/navigation/TextActionLink';
import { PageSectionSurface } from '../../components/ui/PageSectionSurface';
import surface from '../../components/ui/PageSectionSurface/PageSectionSurface.module.css';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { usePageSectionReveal } from '../../shared/page-sections/usePageSectionReveal';
import su from '../../shared/styles/utilities.module.css';
import { landingPageMotion, landingPageRevealRootMargin } from '../../shared/theme/motion';
import appStoreBadgeBlack from '../../assets/store-badges/app-store-badge-black.svg';
import googlePlayBadge from '../../assets/store-badges/google-play-badge.svg';
import { DetailBulletList } from './components/DetailBulletList';
import type { ProjectDetailPageProps } from './ProjectDetailPage.interfaces';
import st from './ProjectDetailPage.module.css';

const projectDetailSectionIds = [
  'hero',
  'gallery',
  'features',
  'architecture',
  'stack',
] as const;

export const ProjectDetailPage = ({
  project,
  navigate,
}: ProjectDetailPageProps): ReactElement => {
  const { contentElementsRef, headerElementsRef, sectionElementsRef } =
    usePageSectionReveal({
      sectionIds: projectDetailSectionIds,
      initialVisibleSectionId: 'hero',
      revealRootMargin: landingPageRevealRootMargin,
      revealEntryThreshold: landingPageMotion.revealEntryThreshold,
      triggerBySectionId: {
        hero: 'section',
      },
    });
  const setSectionElement = useCallback(
    (sectionId: (typeof projectDetailSectionIds)[number]) =>
      (element: HTMLElement | null): void => {
        sectionElementsRef.current[sectionId] = element;
      },
    [sectionElementsRef],
  );
  const setContentElement = useCallback(
    (sectionId: (typeof projectDetailSectionIds)[number]) =>
      (element: HTMLDivElement | null): void => {
        contentElementsRef.current[sectionId] = element;
      },
    [contentElementsRef],
  );
  const setHeaderElement = useCallback(
    (sectionId: (typeof projectDetailSectionIds)[number]) =>
      (element: HTMLElement | null): void => {
        headerElementsRef.current[sectionId] = element;
      },
    [headerElementsRef],
  );

  return (
    <PageSectionSurface className={st.root}>
      <section
        ref={setSectionElement('hero')}
        className={`${surface.section} ${st.heroSection}`}
      >
        <Container className={st.heroInner}>
          <div
            ref={setContentElement('hero')}
            className={st.heroReveal}
            data-landing-reveal="visible"
          >
            <AppLink href="/" navigate={navigate} className={st.backLink}>
              <BackIcon className={st.backIcon} />
              <span>Go back</span>
            </AppLink>

            <header
              ref={setHeaderElement('hero')}
              className={st.heroHeader}
              data-landing-heading-reveal="visible"
            >
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

            <div className={st.heroActions}>
              {project.isMobileApp && project.storeLinks !== undefined && (
                <div className={st.storeLinkRow} aria-label="Mobile app stores">
                  {project.storeLinks.appStore !== undefined && (
                    <a
                      href={project.storeLinks.appStore}
                      className={st.storeBadgeLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Download on the App Store"
                    >
                      <img
                        src={appStoreBadgeBlack}
                        alt="Download on the App Store"
                        className={st.storeBadgeImage}
                      />
                    </a>
                  )}
                  {project.storeLinks.googlePlay !== undefined && (
                    <a
                      href={project.storeLinks.googlePlay}
                      className={st.storeBadgeLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Get it on Google Play"
                    >
                      <img
                        src={googlePlayBadge}
                        alt="Get it on Google Play"
                        className={st.storeBadgeImage}
                      />
                    </a>
                  )}
                </div>
              )}
              <div className={st.projectDetailLinks}>
                {project.links.map((link) => (
                  <TextActionLink
                    key={link.label}
                    href={link.href}
                    className={st.metaLink}
                    target="_blank"
                    rel="noreferrer"
                    trailingIcon={<ExternalLinkIcon />}
                  >
                    {link.label}
                  </TextActionLink>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section
        title="Screenshot Gallery"
        className={`${surface.section} ${st.gallerySection}`}
        headerRevealRef={setHeaderElement('gallery')}
        sectionRef={setSectionElement('gallery')}
        id="project-detail-gallery"
      >
        <div
          ref={setContentElement('gallery')}
          className={st.galleryGrid}
          data-landing-reveal="visible"
        >
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

      <Section
        title="Key Features"
        className={`${surface.section} ${st.featuresSection}`}
        headerRevealRef={setHeaderElement('features')}
        sectionRef={setSectionElement('features')}
        id="project-detail-features"
      >
        <div
          ref={setContentElement('features')}
          className={st.detailSectionContent}
          data-landing-reveal="visible"
        >
          <DetailBulletList items={project.keyFeatures} />
        </div>
      </Section>

      <Section
        title="Architecture"
        className={`${surface.section} ${st.architectureSection}`}
        headerRevealRef={setHeaderElement('architecture')}
        sectionRef={setSectionElement('architecture')}
        id="project-detail-architecture"
      >
        <div
          ref={setContentElement('architecture')}
          className={st.detailSectionContent}
          data-landing-reveal="visible"
        >
          <DetailBulletList items={project.architecture} />
        </div>
      </Section>

      <Section
        title="Tech Stack"
        className={`${surface.section} ${st.stackSection}`}
        headerRevealRef={setHeaderElement('stack')}
        sectionRef={setSectionElement('stack')}
        id="project-detail-stack"
      >
        <div
          ref={setContentElement('stack')}
          className={st.stackSectionContent}
          data-landing-reveal="visible"
        >
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
