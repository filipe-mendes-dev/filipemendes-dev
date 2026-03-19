import { useEffect, useRef } from 'react';

import { type SectionId } from '../../../shared/navigation/sections';
import { getLandingPageSectionElement } from './landingPageSections';
import {
  getSectionTargetTop,
  hasReachedTarget,
  scrollToTop,
} from './landingPageScroll';

interface LandingPageNavigationControllerConfig {
  onActiveSectionChange: (sectionId: SectionId) => void;
  onPendingTargetSectionChange: (sectionId: SectionId | null) => void;
  onSectionRequestHandled: () => void;
  requestedSection: SectionId | null;
}

const getPrefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const useLandingPageNavigationController = ({
  onActiveSectionChange,
  onPendingTargetSectionChange,
  onSectionRequestHandled,
  requestedSection,
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

    onActiveSectionChange(requestedSection);
    onPendingTargetSectionChange(shouldPinTarget ? requestedSection : null);

    scrollToTop({
      shouldSmoothScroll,
      targetTop,
    });

    hasHandledFirstRequestRef.current = true;
    onSectionRequestHandled();
  }, [
    onActiveSectionChange,
    onPendingTargetSectionChange,
    onSectionRequestHandled,
    requestedSection,
  ]);
};
