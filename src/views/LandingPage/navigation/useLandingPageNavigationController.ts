import { useEffect, useRef } from 'react';

import { type SectionId } from '../../../shared/navigation/sections';
import { getLandingPageSectionElement } from './landingPageSections';
import {
  getSectionTargetTop,
  hasReachedTarget,
  scrollToTop,
} from './landingPageScroll';

interface LandingPageNavigationControllerConfig {
  clearRequestedSection: () => void;
  requestedSection: SectionId | null;
  setActiveSection: (sectionId: SectionId) => void;
  setPendingTargetSection: (sectionId: SectionId | null) => void;
}

const getPrefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const useLandingPageNavigationController = ({
  clearRequestedSection,
  requestedSection,
  setActiveSection,
  setPendingTargetSection,
}: LandingPageNavigationControllerConfig): void => {
  const hasHandledFirstRequestRef = useRef(false);

  useEffect(() => {
    if (requestedSection === null) {
      return;
    }

    const targetElement = getLandingPageSectionElement(requestedSection);

    if (targetElement === null) {
      return;
    }

    const targetTop = getSectionTargetTop(targetElement);
    const shouldSmoothScroll =
      hasHandledFirstRequestRef.current && !getPrefersReducedMotion();
    const shouldPinTarget =
      shouldSmoothScroll && !hasReachedTarget(targetTop);

    setActiveSection(requestedSection);
    setPendingTargetSection(shouldPinTarget ? requestedSection : null);

    scrollToTop({
      shouldSmoothScroll,
      targetTop,
    });

    hasHandledFirstRequestRef.current = true;
    clearRequestedSection();
  }, [
    clearRequestedSection,
    requestedSection,
    setActiveSection,
    setPendingTargetSection,
  ]);
};
