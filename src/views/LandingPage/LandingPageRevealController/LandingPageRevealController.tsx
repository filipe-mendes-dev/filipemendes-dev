'use client';

import {
  type ReactElement,
  useEffect,
  useLayoutEffect,
  useState,
  useSyncExternalStore,
} from 'react';

import { sectionIds } from '../../../shared/navigation/sections';
import {
  clearLandingPageSectionRequest,
  getLandingPageNavigationServerSnapshot,
  getLandingPageNavigationSnapshot,
  setLandingPageActiveSection,
  subscribeToLandingPageNavigation,
} from '../../../shared/page-sections/landingPageNavigationStore';
import { resolveLandingPageSectionElements } from '../../../shared/page-sections/landingPageSections';
import { useLandingPageSectionNavigation } from '../../../shared/page-sections/useLandingPageSectionNavigation';
import { usePageSectionReveal } from '../../../shared/page-sections/usePageSectionReveal';
import {
  landingPageMotion,
  landingPageRevealRootMargin,
} from '../../../shared/theme/motion';
import type { LandingPageRevealControllerProps } from './LandingPageRevealController.interfaces';

export const LandingPageRevealController = ({
  initialVisibleSectionId = 'home',
}: LandingPageRevealControllerProps): ReactElement | null => {
  const [isRevealEnabled, setIsRevealEnabled] = useState(false);
  const navigationSnapshot = useSyncExternalStore(
    subscribeToLandingPageNavigation,
    getLandingPageNavigationSnapshot,
    getLandingPageNavigationServerSnapshot,
  );
  const {
    contentElementsRef,
    headerElementsRef,
    initializeRevealState,
    scheduleReveal,
    sectionElementsRef,
  } =
    usePageSectionReveal({
      isRevealEnabled,
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

  useLayoutEffect(() => {
    const resolvedSections = resolveLandingPageSectionElements();

    sectionIds.forEach((sectionId) => {
      const resolvedSection = resolvedSections[sectionId];

      sectionElementsRef.current[sectionId] = resolvedSection.section;
      headerElementsRef.current[sectionId] = resolvedSection.header;
      contentElementsRef.current[sectionId] = resolvedSection.content;
    });
    initializeRevealState();
  }, [contentElementsRef, headerElementsRef, initializeRevealState, sectionElementsRef]);

  useEffect(() => {
    const heroElement = document.querySelector<HTMLElement>(
      '[data-landing-hero-intro-complete]',
    );

    if (heroElement === null) {
      return undefined;
    }

    const syncRevealLock = (): void => {
      setIsRevealEnabled(
        heroElement.dataset.landingHeroIntroComplete === 'true',
      );
    };

    syncRevealLock();

    const observer = new MutationObserver(() => {
      syncRevealLock();
    });

    observer.observe(heroElement, {
      attributeFilter: ['data-landing-hero-intro-complete'],
      attributes: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useLandingPageSectionNavigation({
    contentElementsRef,
    headerElementsRef,
    onActiveSectionChange: setLandingPageActiveSection,
    onSectionRequestHandled: clearLandingPageSectionRequest,
    requestedSection: navigationSnapshot.requestedSection,
    requestedSectionKey: navigationSnapshot.requestKey.toString(),
    scheduleReveal,
    sectionElementsRef,
  });

  return null;
};
