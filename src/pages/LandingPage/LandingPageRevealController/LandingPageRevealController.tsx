'use client';

import {
  type ReactElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from 'react';

import { type SectionId, sectionIds } from '../../../shared/navigation/sections';
import {
  getLandingPageNavigationServerSnapshot,
  getLandingPageNavigationSnapshot,
  setLandingPageActiveSection,
  subscribeToLandingPageNavigation,
  syncLandingPageNavigationFromHash,
} from '../../../shared/page-sections/landingPageNavigationStore';
import { useLandingPageSectionNavigation } from '../../../shared/page-sections/useLandingPageSectionNavigation';
import {
  landingPageMotion,
  landingPageRevealRootMargin,
} from '../../../shared/theme/motion';
import type {
  LandingPageRevealControllerProps,
  LandingPageSectionElements,
} from './LandingPageRevealController.interfaces';

const revealVisibleValue = 'visible';
const revealPendingValue = 'pending';
const separatorLeadDelayVar = '--motion-duration-md';

const getPrefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const getMotionDurationMs = (
  cssVariableName: string,
  fallbackValue: number,
): number => {
  const rootStyles = window.getComputedStyle(document.documentElement);
  const durationValue = Number.parseFloat(
    rootStyles.getPropertyValue(cssVariableName),
  );

  return Number.isFinite(durationValue) ? durationValue : fallbackValue;
};

const getSectionElements = (
  sectionId: SectionId,
): LandingPageSectionElements => {
  const section = document.getElementById(sectionId);

  if (section === null) {
    return {
      content: null,
      header: null,
      section: null,
    };
  }

  return {
    content: section.querySelector<HTMLElement>('[data-landing-reveal]'),
    header: section.querySelector<HTMLElement>('[data-landing-heading-reveal]'),
    section,
  };
};

const setContentVisibility = (
  element: HTMLElement | null,
  value: typeof revealVisibleValue | typeof revealPendingValue,
): void => {
  if (element !== null) {
    element.dataset.landingReveal = value;
  }
};

const setHeaderVisibility = (
  element: HTMLElement | null,
  value: typeof revealVisibleValue | typeof revealPendingValue,
): void => {
  if (element !== null) {
    element.dataset.landingHeadingReveal = value;
  }
};

const setSeparatorVisibility = (
  element: HTMLElement | null,
  value: typeof revealVisibleValue | typeof revealPendingValue,
): void => {
  if (element !== null) {
    element.dataset.landingSeparatorReveal = value;
  }
};

const getTriggerElement = (
  sectionId: SectionId,
  elements: LandingPageSectionElements,
): HTMLElement | null => {
  if (sectionId === 'home') {
    return elements.section;
  }

  return elements.header ?? elements.section;
};

const isTriggerWithinRevealEntry = (triggerElement: HTMLElement): boolean => {
  const { top } = triggerElement.getBoundingClientRect();

  return (
    top < window.innerHeight * landingPageMotion.revealEntryViewportRatio
  );
};

export const LandingPageRevealController = ({
  initialVisibleSectionId = 'home',
}: LandingPageRevealControllerProps): ReactElement | null => {
  const navigationSnapshot = useSyncExternalStore(
    subscribeToLandingPageNavigation,
    getLandingPageNavigationSnapshot,
    getLandingPageNavigationServerSnapshot,
  );
  const contentElementsRef = useRef<Record<SectionId, HTMLElement | null>>({
    about: null,
    contact: null,
    home: null,
    projects: null,
  });
  const headerElementsRef = useRef<Record<SectionId, HTMLElement | null>>({
    about: null,
    contact: null,
    home: null,
    projects: null,
  });
  const revealDelayTimeoutsRef = useRef<Record<SectionId, number | null>>({
    about: null,
    contact: null,
    home: null,
    projects: null,
  });
  const sectionElementsRef = useRef<Record<SectionId, HTMLElement | null>>({
    about: null,
    contact: null,
    home: null,
    projects: null,
  });

  const scheduleReveal = useCallback(
    (sectionId: SectionId, shouldStageContent: boolean): void => {
      const revealDelayTimeouts = revealDelayTimeoutsRef.current;
      const elements = getSectionElements(sectionId);
      const isContentPending =
        elements.content?.dataset.landingReveal === revealPendingValue;
      const isHeaderPending =
        elements.header?.dataset.landingHeadingReveal === revealPendingValue;
      const shouldDelayContent =
        shouldStageContent && (isContentPending || isHeaderPending);

      if (revealDelayTimeouts[sectionId] !== null) {
        window.clearTimeout(revealDelayTimeouts[sectionId]);
        revealDelayTimeouts[sectionId] = null;
      }

      setSeparatorVisibility(elements.section, revealVisibleValue);

      if (!shouldDelayContent || getPrefersReducedMotion()) {
        setHeaderVisibility(elements.header, revealVisibleValue);
        setContentVisibility(elements.content, revealVisibleValue);

        return;
      }

      revealDelayTimeouts[sectionId] = window.setTimeout(() => {
        setHeaderVisibility(elements.header, revealVisibleValue);
        setContentVisibility(elements.content, revealVisibleValue);
        revealDelayTimeouts[sectionId] = null;
      }, getMotionDurationMs(separatorLeadDelayVar, 240));
    },
    [],
  );

  useLayoutEffect(() => {
    syncLandingPageNavigationFromHash();
  }, []);

  useLayoutEffect(() => {
    const prefersReducedMotion = getPrefersReducedMotion();

    sectionIds.forEach((sectionId) => {
      const elements = getSectionElements(sectionId);
      const triggerElement = getTriggerElement(sectionId, elements);
      sectionElementsRef.current[sectionId] = elements.section;
      headerElementsRef.current[sectionId] = elements.header;
      contentElementsRef.current[sectionId] = elements.content;
      const shouldRevealImmediately =
        prefersReducedMotion ||
        sectionId === initialVisibleSectionId ||
        (triggerElement !== null && isTriggerWithinRevealEntry(triggerElement));

      if (shouldRevealImmediately) {
        setSeparatorVisibility(elements.section, revealVisibleValue);
        setHeaderVisibility(elements.header, revealVisibleValue);
        setContentVisibility(elements.content, revealVisibleValue);

        return;
      }

      setSeparatorVisibility(elements.section, revealPendingValue);
      setHeaderVisibility(elements.header, revealPendingValue);
      setContentVisibility(elements.content, revealPendingValue);
    });
  }, [initialVisibleSectionId]);

  useLandingPageSectionNavigation({
    contentElementsRef,
    headerElementsRef,
    onActiveSectionChange: setLandingPageActiveSection,
    requestedSection: navigationSnapshot.requestedSection,
    requestedSectionKey: navigationSnapshot.requestKey.toString(),
    scheduleReveal,
    sectionElementsRef,
  });

  useEffect(() => {
    if (getPrefersReducedMotion()) {
      return undefined;
    }

    const revealDelayTimeouts = revealDelayTimeoutsRef.current;
    const observers = sectionIds.map((sectionId) => {
      const elements = getSectionElements(sectionId);
      const triggerElement = getTriggerElement(sectionId, elements);
      const isContentPending =
        elements.content?.dataset.landingReveal === revealPendingValue;
      const isHeaderPending =
        elements.header?.dataset.landingHeadingReveal === revealPendingValue;

      if ((!isContentPending && !isHeaderPending) || triggerElement === null) {
        return null;
      }

      const observer = new IntersectionObserver(
        (entries, intersectionObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            scheduleReveal(sectionId, true);

            intersectionObserver.unobserve(entry.target);
          });
        },
        {
          rootMargin: landingPageRevealRootMargin,
          threshold: landingPageMotion.revealEntryThreshold,
        },
      );

      observer.observe(triggerElement);

      return observer;
    });

    return () => {
      sectionIds.forEach((sectionId) => {
        const timeoutId = revealDelayTimeouts[sectionId];

        if (timeoutId !== null) {
          window.clearTimeout(timeoutId);
        }
      });

      observers.forEach((observer) => {
        observer?.disconnect();
      });
    };
  }, [scheduleReveal]);

  return null;
};
