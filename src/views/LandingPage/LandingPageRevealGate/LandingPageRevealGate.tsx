'use client';

import {
  type ReactElement,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { sectionIds } from '../../../shared/navigation/sections';
import { resolveLandingPageSectionElements } from '../../../shared/page-sections/landingPageSections';
import { usePageSectionReveal } from '../../../shared/page-sections/usePageSectionReveal';
import {
  landingPageMotion,
  landingPageRevealRootMargin,
} from '../../../shared/theme/motion';
import { heroIntroRevealGateDelayMs } from '../sections/HeroSection/heroMotion';
import type { LandingPageRevealGateProps } from './LandingPageRevealGate.interfaces';

export const LandingPageRevealGate = ({
  initialVisibleSectionId = 'home',
}: LandingPageRevealGateProps): ReactElement | null => {
  const [isRevealEnabled, setIsRevealEnabled] = useState(false);
  const {
    contentElementsRef,
    headerElementsRef,
    initializeRevealState,
    sectionElementsRef,
  } = usePageSectionReveal({
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
  }, [
    contentElementsRef,
    headerElementsRef,
    initializeRevealState,
    sectionElementsRef,
  ]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealGateDelayMs = prefersReducedMotion ? 0 : heroIntroRevealGateDelayMs;
    const timeoutId = window.setTimeout(() => {
      setIsRevealEnabled(true);
    }, revealGateDelayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return null;
};
