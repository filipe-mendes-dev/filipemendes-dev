import { useEffect, useRef } from 'react';
import type { SectionId } from '../navigation/sections';
import type { PageSectionElementStore } from './usePageSectionReveal';
import { landingPageMotion } from '../theme/motion';

interface LandingPageSectionNavigationConfig {
  contentElementsRef: PageSectionElementStore<Record<SectionId, HTMLElement | null>>;
  headerElementsRef: PageSectionElementStore<Record<SectionId, HTMLElement | null>>;
  onActiveSectionChange: (sectionId: SectionId) => void;
  onSectionRequestHandled: () => void;
  requestedSection: SectionId | null;
  requestedSectionKey: string;
  scheduleReveal: (sectionId: SectionId, shouldStageContent: boolean) => void;
  sectionElementsRef: PageSectionElementStore<Record<SectionId, HTMLElement | null>>;
}

const scrollSpacingVar = '--landing-scroll-spacing';

const getPrefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const getHeaderOffset = (): number => {
  const rootStyles = window.getComputedStyle(document.documentElement);
  const headerOffsetValue = Number.parseFloat(rootStyles.getPropertyValue('--header-offset'));
  const safeHeaderOffset = Number.isFinite(headerOffsetValue) ? headerOffsetValue : 72;

  return safeHeaderOffset;
};

const getMaxScrollTop = (): number => {
  const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

  return Math.max(documentHeight - window.innerHeight, 0);
};

const getSectionTargetTop = (sectionElement: HTMLElement): number => {
  const sectionTop = sectionElement.getBoundingClientRect().top + window.scrollY;

  return Math.min(Math.max(sectionTop - getHeaderOffset(), 0), getMaxScrollTop());
};

const scrollToSection = (sectionElement: HTMLElement, shouldReduceMotion: boolean): void => {
  const targetTop = getSectionTargetTop(sectionElement);
  const hasMeaningfulScrollDelta = Math.abs(window.scrollY - targetTop) > 2;

  if (!hasMeaningfulScrollDelta) {
    return;
  }

  window.scrollTo({
    top: targetTop,
    behavior: shouldReduceMotion ? 'auto' : 'smooth',
  });
};

const getActiveSectionOffset = (): number => {
  const rootStyles = window.getComputedStyle(document.documentElement);
  const scrollSpacingValue = Number.parseFloat(rootStyles.getPropertyValue(scrollSpacingVar));
  const safeScrollSpacing = Number.isFinite(scrollSpacingValue) ? scrollSpacingValue : 16;

  return getHeaderOffset() + safeScrollSpacing;
};

const getSectionElements = (
  sectionElementsRef: PageSectionElementStore<Record<SectionId, HTMLElement | null>>,
): Record<SectionId, HTMLElement> | null => {
  const homeElement = sectionElementsRef.current.home;
  const projectsElement = sectionElementsRef.current.projects;
  const aboutElement = sectionElementsRef.current.about;
  const contactElement = sectionElementsRef.current.contact;

  if (homeElement === null || projectsElement === null || aboutElement === null || contactElement === null) {
    return null;
  }

  return {
    home: homeElement,
    projects: projectsElement,
    about: aboutElement,
    contact: contactElement,
  };
};

const getTrackedSection = (sectionElements: Record<SectionId, HTMLElement>): SectionId => {
  const activationLine =
    window.scrollY +
    getActiveSectionOffset() +
    window.innerHeight * landingPageMotion.activeSectionViewportRatio;
  const orderedSections = (Object.entries(sectionElements) as [SectionId, HTMLElement][])
    .sort(([, leftElement], [, rightElement]) => leftElement.offsetTop - rightElement.offsetTop);

  let currentSection: SectionId = 'home';

  orderedSections.forEach(([sectionId, sectionElement]) => {
    if (sectionElement.offsetTop <= activationLine) {
      currentSection = sectionId;
    }
  });

  return currentSection;
};

const revealGroupsBetween = (
  sectionElements: Record<SectionId, HTMLElement>,
  contentElementsRef: PageSectionElementStore<Record<SectionId, HTMLElement | null>>,
  headerElementsRef: PageSectionElementStore<Record<SectionId, HTMLElement | null>>,
  scheduleReveal: (sectionId: SectionId, shouldStageContent: boolean) => void,
  startTop: number,
  endTop: number,
  excludedSectionId?: SectionId,
): void => {
  const lowerBound = Math.min(startTop, endTop);
  const upperBound = Math.max(startTop, endTop);
  const orderedSections = (Object.entries(sectionElements) as [SectionId, HTMLElement][])
    .sort(([, leftElement], [, rightElement]) => leftElement.offsetTop - rightElement.offsetTop);

  orderedSections.forEach(([sectionId, sectionElement]) => {
    const contentElement = contentElementsRef.current[sectionId];
    const headerElement = headerElementsRef.current[sectionId];

    if (sectionId === excludedSectionId || (contentElement === null && headerElement === null)) {
      return;
    }

    const sectionTop = getSectionTargetTop(sectionElement);

    if (sectionTop < lowerBound || sectionTop > upperBound) {
      return;
    }

    scheduleReveal(sectionId, false);
  });
};

export const useLandingPageSectionNavigation = ({
  contentElementsRef,
  headerElementsRef,
  onActiveSectionChange,
  onSectionRequestHandled,
  requestedSection,
  requestedSectionKey,
  scheduleReveal,
  sectionElementsRef,
}: LandingPageSectionNavigationConfig): void => {
  const hasHandledInitialSectionScrollRef = useRef(false);
  const pendingSectionRef = useRef<SectionId | null>(null);
  const pendingRevealSectionRef = useRef<SectionId | null>(null);

  useEffect(() => {
    if (requestedSection === null) {
      return;
    }

    const targetElement = sectionElementsRef.current[requestedSection];
    const sectionElements = getSectionElements(sectionElementsRef);

    if (targetElement === null || sectionElements === null) {
      return;
    }

    const prefersReducedMotion = getPrefersReducedMotion();
    const shouldSmoothScroll = hasHandledInitialSectionScrollRef.current && !prefersReducedMotion;
    const targetTop = getSectionTargetTop(targetElement);
    const hasMeaningfulScrollDelta = Math.abs(window.scrollY - targetTop) > 2;

    if (hasMeaningfulScrollDelta && shouldSmoothScroll) {
      pendingSectionRef.current = requestedSection;
      pendingRevealSectionRef.current = requestedSection;
      onActiveSectionChange(requestedSection);
      revealGroupsBetween(
        sectionElements,
        contentElementsRef,
        headerElementsRef,
        scheduleReveal,
        window.scrollY,
        targetTop,
        requestedSection,
      );
    } else if (!hasMeaningfulScrollDelta) {
      pendingSectionRef.current = null;
      pendingRevealSectionRef.current = null;
      scheduleReveal(requestedSection, false);
      onActiveSectionChange(requestedSection);
    } else {
      pendingRevealSectionRef.current = null;
      scheduleReveal(requestedSection, false);
      onActiveSectionChange(requestedSection);
    }

    scrollToSection(targetElement, !shouldSmoothScroll);
    hasHandledInitialSectionScrollRef.current = true;
    onSectionRequestHandled();
  }, [
    contentElementsRef,
    headerElementsRef,
    onActiveSectionChange,
    onSectionRequestHandled,
    requestedSection,
    requestedSectionKey,
    scheduleReveal,
    sectionElementsRef,
  ]);

  useEffect(() => {
    const sectionElements = getSectionElements(sectionElementsRef);

    if (sectionElements === null) {
      return;
    }

    let frameId = 0;

    const syncActiveSection = (): void => {
      frameId = 0;
      const pendingSection = pendingSectionRef.current;
      const pendingRevealSection = pendingRevealSectionRef.current;

      if (pendingRevealSection !== null) {
        const pendingRevealElement = sectionElements[pendingRevealSection];
        const pendingRevealTargetTop = getSectionTargetTop(pendingRevealElement);
        const revealDistance = Math.max(window.innerHeight * 0.18, 96);
        const isNearPendingRevealTarget = Math.abs(window.scrollY - pendingRevealTargetTop) <= revealDistance;

        if (isNearPendingRevealTarget) {
          scheduleReveal(pendingRevealSection, true);
          pendingRevealSectionRef.current = null;
        }
      }

      if (pendingSection !== null) {
        const pendingElement = sectionElements[pendingSection];
        const pendingTargetTop = getSectionTargetTop(pendingElement);
        const hasReachedPendingTarget = Math.abs(window.scrollY - pendingTargetTop) <= 2;

        if (!hasReachedPendingTarget) {
          onActiveSectionChange(pendingSection);

          return;
        }

        pendingSectionRef.current = null;
      }

      onActiveSectionChange(getTrackedSection(sectionElements));
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
  }, [onActiveSectionChange, scheduleReveal, sectionElementsRef]);
};
