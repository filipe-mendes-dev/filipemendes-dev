import { useEffect } from 'react';

import { type SectionId } from '../navigation/sections';
import { landingPageMotion } from '../theme/motion';
import {
  getLandingPageSectionElement,
  getOrderedLandingPageSectionElements,
} from './landingPageSections';
import { getHeaderOffset, getSectionTargetTop, hasReachedTarget } from './landingPageScroll';

interface LandingPageActiveSectionTrackerConfig {
  onActiveSectionChange: (sectionId: SectionId) => void;
  onPendingTargetSectionChange: (sectionId: SectionId | null) => void;
  pendingTargetSection: SectionId | null;
}

const scrollSpacingVar = '--landing-scroll-spacing';

const getActiveSectionOffset = (): number => {
  const rootStyles = window.getComputedStyle(document.documentElement);
  const scrollSpacingValue = Number.parseFloat(
    rootStyles.getPropertyValue(scrollSpacingVar),
  );
  const safeScrollSpacing = Number.isFinite(scrollSpacingValue)
    ? scrollSpacingValue
    : 16;

  return getHeaderOffset() + safeScrollSpacing;
};

const getObservedActiveSection = (): SectionId => {
  const activationLine =
    window.scrollY +
    getActiveSectionOffset() +
    window.innerHeight * landingPageMotion.activeSectionViewportRatio;
  let currentSection: SectionId = 'home';

  getOrderedLandingPageSectionElements().forEach(({ element, sectionId }) => {
    if (element.offsetTop <= activationLine) {
      currentSection = sectionId;
    }
  });

  return currentSection;
};

export const useLandingPageActiveSectionTracker = ({
  onActiveSectionChange,
  onPendingTargetSectionChange,
  pendingTargetSection,
}: LandingPageActiveSectionTrackerConfig): void => {
  useEffect(() => {
    let frameId = 0;

    const syncActiveSection = (): void => {
      frameId = 0;

      if (pendingTargetSection !== null) {
        const pendingTargetElement = getLandingPageSectionElement(
          pendingTargetSection,
        );

        if (pendingTargetElement === null) {
          onPendingTargetSectionChange(null);
        } else {
          const pendingTargetTop = getSectionTargetTop(pendingTargetElement);

          if (!hasReachedTarget(pendingTargetTop)) {
            // Keep the requested section active while the smooth scroll is still moving.
            onActiveSectionChange(pendingTargetSection);

            return;
          }

          onPendingTargetSectionChange(null);
        }
      }

      // Once no target is pending, the active section comes from normal scroll position.
      onActiveSectionChange(getObservedActiveSection());
    };

    const requestSync = (): void => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(syncActiveSection);
    };

    requestSync();
    window.addEventListener('scroll', requestSync, { passive: true });
    window.addEventListener('resize', requestSync);

    return () => {
      window.removeEventListener('scroll', requestSync);
      window.removeEventListener('resize', requestSync);

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [
    onActiveSectionChange,
    onPendingTargetSectionChange,
    pendingTargetSection,
  ]);
};
