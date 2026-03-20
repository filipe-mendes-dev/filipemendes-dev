import { useEffect } from 'react';

import { type SectionId } from '../../../shared/navigation/sections';
import { landingPageMotion } from '../../../shared/theme/motion';
import {
  getLandingPageSectionElement,
  getOrderedLandingPageSectionElements,
} from './landingPageSections';
import { getHeaderOffset, getSectionTargetTop, hasReachedTarget } from './landingPageScroll';

interface LandingPageActiveSectionTrackerConfig {
  pendingTargetSection: SectionId | null;
  setActiveSection: (sectionId: SectionId) => void;
  setPendingTargetSection: (sectionId: SectionId | null) => void;
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
  pendingTargetSection,
  setActiveSection,
  setPendingTargetSection,
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
          setPendingTargetSection(null);
        } else {
          const pendingTargetTop = getSectionTargetTop(pendingTargetElement);

          if (!hasReachedTarget(pendingTargetTop)) {
            // Keep the requested section active while the smooth scroll is still moving.
            setActiveSection(pendingTargetSection);

            return;
          }

          setPendingTargetSection(null);
        }
      }

      // Once no target is pending, the active section comes from normal scroll position.
      setActiveSection(getObservedActiveSection());
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
    pendingTargetSection,
    setActiveSection,
    setPendingTargetSection,
  ]);
};
