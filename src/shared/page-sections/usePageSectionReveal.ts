import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

export interface PageSectionRevealConfig<TSectionId extends string> {
  isRevealEnabled?: boolean;
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
  contentElementsRef: PageSectionElementStore<Record<TSectionId, HTMLElement | null>>;
  headerElementsRef: PageSectionElementStore<Record<TSectionId, HTMLElement | null>>;
  sectionElementsRef: PageSectionElementStore<Record<TSectionId, HTMLElement | null>>;
  initializeRevealState: () => void;
  scheduleReveal: (sectionId: TSectionId, shouldStageContent: boolean) => void;
  hideReveal: (sectionId: TSectionId) => void;
}

interface PageSectionRevealGroup {
  content: HTMLElement | null;
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

const isElementVisibleInViewport = (element: HTMLElement): boolean => {
  const { bottom, top } = element.getBoundingClientRect();

  return bottom > 0 && top < window.innerHeight;
};

const isSectionFullyVisibleInViewport = (sectionElement: HTMLElement): boolean => {
  const { bottom, top } = sectionElement.getBoundingClientRect();

  return top >= 0 && bottom <= window.innerHeight;
};

export const usePageSectionReveal = <TSectionId extends string>({
  isRevealEnabled = true,
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
  const contentElementsRef = useRef(createElementStore<TSectionId, HTMLElement>(sectionIds));
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

  const initializeRevealState = useCallback((): void => {
    const prefersReducedMotion = getPrefersReducedMotion();

    sectionIds.forEach((sectionId) => {
      const content = contentElementsRef.current[sectionId];

      if (content === null) {
        return;
      }

      if (!isRevealEnabled) {
        hideReveal(sectionId);

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
        isElementVisibleInViewport(triggerElement)
      ) {
        scheduleReveal(sectionId, true);

        return;
      }

      hideReveal(sectionId);
    });
  }, [
    contentElementsRef,
    getTriggerElement,
    hideReveal,
    initialVisibleSectionId,
    isRevealEnabled,
    revealVisibleInViewport,
    scheduleReveal,
    sectionIds,
  ]);

  useLayoutEffect(() => {
    initializeRevealState();
  }, [initializeRevealState]);

  useEffect(() => {
    if (!isRevealEnabled || getPrefersReducedMotion()) {
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
    isRevealEnabled,
    revealEntryThreshold,
    revealRootMargin,
    scheduleReveal,
    sectionIds,
  ]);

  useEffect(() => {
    if (!isRevealEnabled || getPrefersReducedMotion()) {
      return undefined;
    }

    let frameId = 0;
    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => {
            requestSync();
          });

    const syncReachablePendingSections = (): void => {
      frameId = 0;

      sectionIds.forEach((sectionId) => {
        const content = contentElementsRef.current[sectionId];

        if (content?.dataset.landingReveal !== revealPendingValue) {
          return;
        }

        const triggerElement = getTriggerElement(sectionId);
        const sectionElement = sectionElementsRef.current[sectionId];

        if (triggerElement === null || sectionElement === null) {
          return;
        }

        if (
          isTriggerWithinRevealEntry(triggerElement, revealEntryViewportRatio) ||
          isSectionFullyVisibleInViewport(sectionElement)
        ) {
          scheduleReveal(sectionId, true);
        }
      });
    };

    const requestSync = (): void => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(syncReachablePendingSections);
    };

    requestSync();
    window.addEventListener('scroll', requestSync, { passive: true });
    window.addEventListener('resize', requestSync);
    sectionIds.forEach((sectionId) => {
      const sectionElement = sectionElementsRef.current[sectionId];

      if (sectionElement !== null) {
        resizeObserver?.observe(sectionElement);
      }
    });

    return () => {
      window.removeEventListener('scroll', requestSync);
      window.removeEventListener('resize', requestSync);
      resizeObserver?.disconnect();

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [
    contentElementsRef,
    getTriggerElement,
    isRevealEnabled,
    revealEntryViewportRatio,
    scheduleReveal,
    sectionElementsRef,
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
    initializeRevealState,
    sectionElementsRef,
    scheduleReveal,
    hideReveal,
  };
};
