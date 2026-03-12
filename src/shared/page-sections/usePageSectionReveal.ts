import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

export interface PageSectionRevealConfig<TSectionId extends string> {
  sectionIds: readonly TSectionId[];
  initialVisibleSectionId: TSectionId;
  revealRootMargin: string;
  revealEntryThreshold: number;
  revealEntryViewportRatio?: number;
  revealVisibleInViewport?: boolean;
  separatorLeadDelayVar?: string;
  triggerBySectionId: Partial<Record<TSectionId, 'header' | 'section'>>;
}

export interface PageSectionElementStore<TElement> {
  current: TElement;
}

export interface PageSectionRevealResult<TSectionId extends string> {
  contentElementsRef: PageSectionElementStore<Record<TSectionId, HTMLDivElement | null>>;
  headerElementsRef: PageSectionElementStore<Record<TSectionId, HTMLElement | null>>;
  sectionElementsRef: PageSectionElementStore<Record<TSectionId, HTMLElement | null>>;
  scheduleReveal: (sectionId: TSectionId, shouldStageContent: boolean) => void;
  hideReveal: (sectionId: TSectionId) => void;
}

interface PageSectionRevealGroup {
  content: HTMLDivElement | null;
  header: HTMLElement | null;
  separator: HTMLElement | null;
}

const revealVisibleValue = 'visible';
const revealPendingValue = 'pending';
const defaultSeparatorLeadDelayVar = '--motion-duration-md';

const getPrefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const getMotionDurationMs = (cssVariableName: string, fallbackValue: number): number => {
  const rootStyles = window.getComputedStyle(document.documentElement);
  const durationValue = Number.parseFloat(rootStyles.getPropertyValue(cssVariableName));

  return Number.isFinite(durationValue) ? durationValue : fallbackValue;
};

const createElementStore = <TSectionId extends string, TElement extends HTMLElement>(
  sectionIds: readonly TSectionId[],
) => {
  return sectionIds.reduce<Record<TSectionId, TElement | null>>((result, sectionId) => {
    result[sectionId] = null;

    return result;
  }, {} as Record<TSectionId, TElement | null>);
};

const revealContent = (element: HTMLElement | null): void => {
  if (element !== null) {
    element.dataset.landingReveal = revealVisibleValue;
  }
};

const hideContent = (element: HTMLElement | null): void => {
  if (element !== null) {
    element.dataset.landingReveal = revealPendingValue;
  }
};

const revealHeading = (element: HTMLElement | null): void => {
  if (element !== null) {
    element.dataset.landingHeadingReveal = revealVisibleValue;
  }
};

const hideHeading = (element: HTMLElement | null): void => {
  if (element !== null) {
    element.dataset.landingHeadingReveal = revealPendingValue;
  }
};

const revealSeparator = (element: HTMLElement | null): void => {
  if (element !== null) {
    element.dataset.landingSeparatorReveal = revealVisibleValue;
  }
};

const hideSeparator = (element: HTMLElement | null): void => {
  if (element !== null) {
    element.dataset.landingSeparatorReveal = revealPendingValue;
  }
};

const isTriggerWithinRevealEntry = (
  triggerElement: HTMLElement,
  revealEntryViewportRatio: number,
): boolean => {
  const { top } = triggerElement.getBoundingClientRect();

  return top < window.innerHeight * revealEntryViewportRatio;
};

export const usePageSectionReveal = <TSectionId extends string>({
  sectionIds,
  initialVisibleSectionId,
  revealRootMargin,
  revealEntryThreshold,
  revealEntryViewportRatio = 0.65,
  revealVisibleInViewport = false,
  separatorLeadDelayVar = defaultSeparatorLeadDelayVar,
  triggerBySectionId,
}: PageSectionRevealConfig<TSectionId>): PageSectionRevealResult<TSectionId> => {
  const sectionElementsRef = useRef(createElementStore<TSectionId, HTMLElement>(sectionIds));
  const contentElementsRef = useRef(createElementStore<TSectionId, HTMLDivElement>(sectionIds));
  const headerElementsRef = useRef(createElementStore<TSectionId, HTMLElement>(sectionIds));
  const revealDelayTimeoutsRef = useRef<Record<TSectionId, number | null>>(
    sectionIds.reduce<Record<TSectionId, number | null>>((result, sectionId) => {
      result[sectionId] = null;

      return result;
    }, {} as Record<TSectionId, number | null>),
  );

  const getRevealGroup = useCallback(
    (sectionId: TSectionId): PageSectionRevealGroup => ({
      content: contentElementsRef.current[sectionId],
      header: headerElementsRef.current[sectionId],
      separator: sectionElementsRef.current[sectionId],
    }),
    [contentElementsRef, headerElementsRef, sectionElementsRef],
  );

  const getTriggerElement = useCallback(
    (sectionId: TSectionId): HTMLElement | null => {
      if (triggerBySectionId[sectionId] === 'section') {
        return sectionElementsRef.current[sectionId];
      }

      return headerElementsRef.current[sectionId] ?? sectionElementsRef.current[sectionId];
    },
    [headerElementsRef, sectionElementsRef, triggerBySectionId],
  );

  const clearScheduledReveal = useCallback((sectionId: TSectionId): void => {
    const timeoutId = revealDelayTimeoutsRef.current[sectionId];

    if (timeoutId === null) {
      return;
    }

    window.clearTimeout(timeoutId);
    revealDelayTimeoutsRef.current[sectionId] = null;
  }, []);

  const revealContentGroup = useCallback((revealGroup: PageSectionRevealGroup): void => {
    revealHeading(revealGroup.header);
    revealContent(revealGroup.content);
  }, []);

  const scheduleReveal = useCallback(
    (sectionId: TSectionId, shouldStageContent: boolean): void => {
      const revealGroup = getRevealGroup(sectionId);

      clearScheduledReveal(sectionId);
      revealSeparator(revealGroup.separator);

      const isContentPending = revealGroup.content?.dataset.landingReveal === revealPendingValue;
      const isHeaderPending = revealGroup.header?.dataset.landingHeadingReveal === revealPendingValue;
      const shouldDelayContent = shouldStageContent && (isContentPending || isHeaderPending);

      if (!shouldDelayContent || getPrefersReducedMotion()) {
        revealContentGroup(revealGroup);

        return;
      }

      revealDelayTimeoutsRef.current[sectionId] = window.setTimeout(() => {
        revealContentGroup(revealGroup);
        revealDelayTimeoutsRef.current[sectionId] = null;
      }, getMotionDurationMs(separatorLeadDelayVar, 240));
    },
    [clearScheduledReveal, getRevealGroup, revealContentGroup, separatorLeadDelayVar],
  );

  const hideReveal = useCallback(
    (sectionId: TSectionId): void => {
      const revealGroup = getRevealGroup(sectionId);

      clearScheduledReveal(sectionId);
      hideSeparator(revealGroup.separator);
      hideHeading(revealGroup.header);
      hideContent(revealGroup.content);
    },
    [clearScheduledReveal, getRevealGroup],
  );

  useLayoutEffect(() => {
    const prefersReducedMotion = getPrefersReducedMotion();

    sectionIds.forEach((sectionId) => {
      const content = contentElementsRef.current[sectionId];

      if (content === null) {
        return;
      }

      if (prefersReducedMotion || sectionId === initialVisibleSectionId) {
        scheduleReveal(sectionId, false);

        return;
      }

      const triggerElement = getTriggerElement(sectionId);

      if (
        revealVisibleInViewport &&
        triggerElement !== null &&
        isTriggerWithinRevealEntry(triggerElement, revealEntryViewportRatio)
      ) {
        scheduleReveal(sectionId, false);

        return;
      }

      hideReveal(sectionId);
    });
  }, [
    contentElementsRef,
    getTriggerElement,
    hideReveal,
    initialVisibleSectionId,
    revealEntryViewportRatio,
    revealVisibleInViewport,
    scheduleReveal,
    sectionIds,
  ]);

  useEffect(() => {
    if (getPrefersReducedMotion()) {
      return;
    }

    const observers = sectionIds.map((sectionId) => {
      const content = contentElementsRef.current[sectionId];
      const triggerElement = getTriggerElement(sectionId);

      if (content?.dataset.landingReveal !== revealPendingValue || triggerElement === null) {
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
          threshold: revealEntryThreshold,
          rootMargin: revealRootMargin,
        },
      );

      observer.observe(triggerElement);

      return observer;
    });

    return () => {
      observers.forEach((observer) => {
        observer?.disconnect();
      });
    };
  }, [
    contentElementsRef,
    getTriggerElement,
    revealEntryThreshold,
    revealRootMargin,
    scheduleReveal,
    sectionIds,
  ]);

  useEffect(() => {
    const revealDelayTimeouts = revealDelayTimeoutsRef.current;

    return () => {
      sectionIds.forEach((sectionId) => {
        const timeoutId = revealDelayTimeouts[sectionId];

        if (timeoutId !== null) {
          window.clearTimeout(timeoutId);
        }
      });
    };
  }, [sectionIds]);

  return {
    contentElementsRef,
    headerElementsRef,
    sectionElementsRef,
    scheduleReveal,
    hideReveal,
  };
};
