import { useEffect, useRef } from "react";
import { type SectionId } from "../navigation/sections";
import { resolveRequiredLandingPageSectionRoots } from "./landingPageSections";
import {
  getHeaderOffset,
  measureSectionTarget,
  scrollArrivalTolerancePx,
} from "./landingPageScroll";
import { landingPageMotion } from "../theme/motion";

interface LandingPageSectionNavigationConfig {
  onActiveSectionChange: (sectionId: SectionId) => void;
  onSectionRequestHandled: () => void;
  requestedSection: SectionId | null;
}

const scrollSpacingVar = "--landing-scroll-spacing";

const getPrefersReducedMotion = (): boolean => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const scrollToSection = (
  sectionElement: HTMLElement,
  shouldReduceMotion: boolean
): void => {
  const { hasMeaningfulScrollDelta, targetTop } =
    measureSectionTarget(sectionElement);

  if (!hasMeaningfulScrollDelta) {
    return;
  }

  window.scrollTo({
    top: targetTop,
    behavior: shouldReduceMotion ? "auto" : "smooth",
  });
};

const getActiveSectionOffset = (): number => {
  const rootStyles = window.getComputedStyle(document.documentElement);
  const scrollSpacingValue = Number.parseFloat(
    rootStyles.getPropertyValue(scrollSpacingVar)
  );
  const safeScrollSpacing = Number.isFinite(scrollSpacingValue)
    ? scrollSpacingValue
    : 16;

  return getHeaderOffset() + safeScrollSpacing;
};

type LandingPageElementMap = Record<SectionId, HTMLElement>;
type OrderedLandingPageSection = [SectionId, HTMLElement];

interface PendingNavigationTarget {
  sectionId: SectionId;
  targetTop: number;
}

const getOrderedSections = (
  sectionElements: LandingPageElementMap
): OrderedLandingPageSection[] => {
  return (Object.entries(sectionElements) as OrderedLandingPageSection[]).sort(
    ([, leftElement], [, rightElement]) =>
      leftElement.offsetTop - rightElement.offsetTop
  );
};

const getTrackedSection = (
  orderedSections: OrderedLandingPageSection[]
): SectionId => {
  const activationLine =
    window.scrollY +
    getActiveSectionOffset() +
    window.innerHeight * landingPageMotion.activeSectionViewportRatio;

  let currentSection: SectionId = "home";

  orderedSections.forEach(([sectionId, sectionElement]) => {
    if (sectionElement.offsetTop <= activationLine) {
      currentSection = sectionId;
    }
  });

  return currentSection;
};

const executeSectionNavigationRequest = ({
  requestedSection,
  sectionElements,
  shouldAnimateScroll,
}: {
  requestedSection: SectionId;
  sectionElements: LandingPageElementMap;
  shouldAnimateScroll: boolean;
}): PendingNavigationTarget | null => {
  const targetElement = sectionElements[requestedSection];
  const { hasMeaningfulScrollDelta, targetTop } =
    measureSectionTarget(targetElement);

  scrollToSection(targetElement, !shouldAnimateScroll);

  if (!hasMeaningfulScrollDelta || !shouldAnimateScroll) {
    return null;
  }

  return {
    sectionId: requestedSection,
    targetTop,
  };
};

const syncTrackedActiveSection = ({
  onActiveSectionChange,
  sectionElements,
}: {
  onActiveSectionChange: (sectionId: SectionId) => void;
  sectionElements: LandingPageElementMap;
}): void => {
  onActiveSectionChange(getTrackedSection(getOrderedSections(sectionElements)));
};

export const useLandingPageSectionNavigation = ({
  onActiveSectionChange,
  onSectionRequestHandled,
  requestedSection,
}: LandingPageSectionNavigationConfig): void => {
  const hasHandledFirstNavigationRequestRef = useRef(false);
  const pendingNavigationTargetRef = useRef<PendingNavigationTarget | null>(
    null
  );

  useEffect(() => {
    if (requestedSection === null) {
      return;
    }

    const sectionElements = resolveRequiredLandingPageSectionRoots();

    if (sectionElements === null) {
      return;
    }

    const prefersReducedMotion = getPrefersReducedMotion();
    const shouldAnimateScroll =
      hasHandledFirstNavigationRequestRef.current && !prefersReducedMotion;
    const pendingNavigationTarget = executeSectionNavigationRequest({
      requestedSection,
      sectionElements,
      shouldAnimateScroll,
    });

    // Pin the requested section while a smooth scroll is still in flight.
    pendingNavigationTargetRef.current = pendingNavigationTarget;
    onActiveSectionChange(requestedSection);

    hasHandledFirstNavigationRequestRef.current = true;
    onSectionRequestHandled();
  }, [onActiveSectionChange, onSectionRequestHandled, requestedSection]);

  useEffect(() => {
    const sectionElements = resolveRequiredLandingPageSectionRoots();

    if (sectionElements === null) {
      return;
    }

    let frameId = 0;

    const syncActiveSection = (): void => {
      frameId = 0;
      const pendingNavigationTarget = pendingNavigationTargetRef.current;

      if (pendingNavigationTarget !== null) {
        const distanceToTarget = Math.abs(
          window.scrollY - pendingNavigationTarget.targetTop
        );

        if (distanceToTarget <= scrollArrivalTolerancePx) {
          pendingNavigationTargetRef.current = null;
        } else {
          onActiveSectionChange(pendingNavigationTarget.sectionId);

          return;
        }
      }

      // Fall back to scroll-observed state once the programmatic jump has settled.
      syncTrackedActiveSection({
        onActiveSectionChange,
        sectionElements,
      });
    };

    const requestSync = (): void => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(syncActiveSection);
    };

    requestSync();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [onActiveSectionChange]);
};
