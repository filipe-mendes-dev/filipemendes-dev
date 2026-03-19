"use client";

import { type ReactElement, useCallback } from "react";

import Link from "next/link";

import {
  AppStoreIcon,
  BackIcon,
  ExternalLinkIcon,
  GooglePlayIcon,
} from "../../components/icons";
import { PageSectionSurface } from "../../components/ui/PageSectionSurface";
import surface from "../../components/ui/PageSectionSurface/PageSectionSurface.module.css";
import { Container } from "../../components/ui/Container";
import { Section } from "../../components/ui/Section";
import { usePageSectionReveal } from "../../shared/reveal/usePageSectionReveal";
import su from "../../shared/styles/utilities.module.css";
import {
  landingPageMotion,
  landingPageRevealRootMargin,
} from "../../shared/theme/motion";
import { DetailBulletList } from "./components/DetailBulletList";
import type { ProjectDetailPageProps } from "./ProjectDetailPage.interfaces";
import st from "./ProjectDetailPage.module.css";

const projectDetailSectionIds = [
  "hero",
  "gallery",
  "features",
  "architecture",
  "stack",
] as const;

const hasStoreLinks = (project: ProjectDetailPageProps["project"]): boolean => {
  return (
    project.storeLinks?.appStore !== undefined ||
    project.storeLinks?.googlePlay !== undefined
  );
};

const hasProjectActions = (
  project: ProjectDetailPageProps["project"]
): boolean => {
  return hasStoreLinks(project) || project.links.length > 0;
};

export const ProjectDetailPage = ({
  project,
}: ProjectDetailPageProps): ReactElement => {
  const { contentElementsRef, headerElementsRef, sectionElementsRef } =
    usePageSectionReveal({
      sectionIds: projectDetailSectionIds,
      initialVisibleSectionId: "hero",
      revealRootMargin: landingPageRevealRootMargin,
      revealEntryThreshold: landingPageMotion.revealEntryThreshold,
      triggerBySectionId: {
        hero: "section",
      },
    });
  const setSectionElement = useCallback(
    (sectionId: (typeof projectDetailSectionIds)[number]) =>
      (element: HTMLElement | null): void => {
        sectionElementsRef.current[sectionId] = element;
      },
    [sectionElementsRef]
  );
  const setContentElement = useCallback(
    (sectionId: (typeof projectDetailSectionIds)[number]) =>
      (element: HTMLDivElement | null): void => {
        contentElementsRef.current[sectionId] = element;
      },
    [contentElementsRef]
  );
  const setHeaderElement = useCallback(
    (sectionId: (typeof projectDetailSectionIds)[number]) =>
      (element: HTMLElement | null): void => {
        headerElementsRef.current[sectionId] = element;
      },
    [headerElementsRef]
  );
  const storeLinks = project.storeLinks;

  return (
    <PageSectionSurface className={st.root}>
      <section
        ref={setSectionElement("hero")}
        className={`${surface.section} ${st.heroSection}`}
      >
        <Container className={st.heroInner}>
          <div
            ref={setContentElement("hero")}
            className={st.heroReveal}
            data-landing-reveal="visible"
          >
            <Link href="/" className={st.backLink}>
              <BackIcon className={st.backIcon} />
              <span>Go Back</span>
            </Link>

            <header
              ref={setHeaderElement("hero")}
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
          title="Screenshot Gallery"
          className={`${surface.section} ${st.gallerySection}`}
          headerRevealRef={setHeaderElement("gallery")}
          initialHeadingRevealState="pending"
          id="project-detail-gallery"
          sectionRef={setSectionElement("gallery")}
        >
          <div
            ref={setContentElement("gallery")}
            className={st.galleryGrid}
            data-landing-reveal="pending"
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
      )}

      <Section
        title="Key Features"
        className={`${surface.section} ${st.featuresSection}`}
        headerRevealRef={setHeaderElement("features")}
        initialHeadingRevealState="pending"
        id="project-detail-features"
        sectionRef={setSectionElement("features")}
      >
        <div
          ref={setContentElement("features")}
          className={st.detailSectionContent}
          data-landing-reveal="pending"
        >
          <DetailBulletList items={project.keyFeatures} />
        </div>
      </Section>

      <Section
        title="Architecture"
        className={`${surface.section} ${st.architectureSection}`}
        headerRevealRef={setHeaderElement("architecture")}
        initialHeadingRevealState="pending"
        id="project-detail-architecture"
        sectionRef={setSectionElement("architecture")}
      >
        <div
          ref={setContentElement("architecture")}
          className={st.detailSectionContent}
          data-landing-reveal="pending"
        >
          <DetailBulletList items={project.architecture} />
        </div>
      </Section>

      <Section
        title="Tech Stack"
        className={`${surface.section} ${st.stackSection}`}
        headerRevealRef={setHeaderElement("stack")}
        initialHeadingRevealState="pending"
        id="project-detail-stack"
        sectionRef={setSectionElement("stack")}
      >
        <div
          ref={setContentElement("stack")}
          className={st.stackSectionContent}
          data-landing-reveal="pending"
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
