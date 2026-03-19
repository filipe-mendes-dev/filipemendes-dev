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
    sectionIds.forEach((sectionId) => {
      const sectionElement = document.getElementById(sectionId);

      sectionElementsRef.current[sectionId] = sectionElement;
      headerElementsRef.current[sectionId] =
        sectionElement?.querySelector<HTMLElement>('[data-landing-heading-reveal]') ?? null;
      contentElementsRef.current[sectionId] =
        sectionElement?.querySelector<HTMLElement>('[data-landing-reveal]') ?? null;
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
