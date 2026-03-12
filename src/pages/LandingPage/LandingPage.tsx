import { type ReactElement, useCallback, useState } from 'react';

import { PageSectionSurface } from '../../components/ui/PageSectionSurface';
import surface from '../../components/ui/PageSectionSurface/PageSectionSurface.module.css';
import { type SectionId, sectionIds } from '../../shared/navigation/sections';
import { useLandingPageSectionNavigation } from '../../shared/page-sections/useLandingPageSectionNavigation';
import { usePageSectionReveal } from '../../shared/page-sections/usePageSectionReveal';
import {
  landingPageMotion,
  landingPageRevealRootMargin,
} from '../../shared/theme/motion';
import { AboutPage } from '../AboutPage';
import { ContactPage } from '../ContactPage';
import { HomePage } from '../HomePage';
import { ProjectsPage } from '../ProjectsPage';
import type { LandingPageProps } from './LandingPage.interfaces';
import st from './LandingPage.module.css';

export const LandingPage = ({
  content,
  navigate,
  activeSection,
  requestedSection,
  requestedSectionKey,
  onSectionRequest,
  onActiveSectionChange,
}: LandingPageProps): ReactElement => {
  const [initialVisibleSectionId] = useState(activeSection);
  const {
    contentElementsRef,
    headerElementsRef,
    sectionElementsRef,
    scheduleReveal,
  } = usePageSectionReveal({
    sectionIds,
    initialVisibleSectionId,
    revealRootMargin: landingPageRevealRootMargin,
    revealEntryThreshold: landingPageMotion.revealEntryThreshold,
    revealEntryViewportRatio: landingPageMotion.revealEntryViewportRatio,
    revealVisibleInViewport: true,
    triggerBySectionId: {
      home: 'section',
    },
  });

  useLandingPageSectionNavigation({
    contentElementsRef,
    headerElementsRef,
    onActiveSectionChange,
    requestedSection,
    requestedSectionKey,
    scheduleReveal,
    sectionElementsRef,
  });

  const setSectionElement = useCallback(
    (sectionId: SectionId) =>
      (element: HTMLElement | null): void => {
        sectionElementsRef.current[sectionId] = element;
      },
    [sectionElementsRef],
  );
  const setContentElement = useCallback(
    (sectionId: SectionId) =>
      (element: HTMLDivElement | null): void => {
        contentElementsRef.current[sectionId] = element;
      },
    [contentElementsRef],
  );
  const setHeaderElement = useCallback(
    (sectionId: SectionId) =>
      (element: HTMLElement | null): void => {
        headerElementsRef.current[sectionId] = element;
      },
    [headerElementsRef],
  );

  return (
    <PageSectionSurface className={st.root}>
      <section
        id="home"
        ref={setSectionElement('home')}
        className={`${surface.section} ${st.homeSection}`}
      >
        <HomePage
          content={content}
          navigate={navigate}
          onSectionRequest={onSectionRequest}
          revealRef={setContentElement('home')}
        />
      </section>
      <section
        id="projects"
        ref={setSectionElement('projects')}
        className={`${surface.section} ${st.projectsSection}`}
      >
        <ProjectsPage
          content={content}
          navigate={navigate}
          revealRef={setContentElement('projects')}
          headerRevealRef={setHeaderElement('projects')}
        />
      </section>
      <section
        id="about"
        ref={setSectionElement('about')}
        className={`${surface.section} ${st.aboutSection}`}
      >
        <AboutPage
          content={content}
          revealRef={setContentElement('about')}
          headerRevealRef={setHeaderElement('about')}
        />
      </section>
      <section
        id="contact"
        ref={setSectionElement('contact')}
        className={`${surface.section} ${st.contactSection}`}
      >
        <ContactPage
          content={content}
          revealRef={setContentElement('contact')}
          headerRevealRef={setHeaderElement('contact')}
        />
      </section>
    </PageSectionSurface>
  );
};
