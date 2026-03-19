import type { SectionId } from "../../../shared/navigation/sections";

export interface LandingPageNavigationSnapshot {
  activeSection: SectionId;
  pendingTargetSection: SectionId | null;
  requestedSection: SectionId | null;
}

const defaultSnapshot: LandingPageNavigationSnapshot = {
  activeSection: "home",
  pendingTargetSection: null,
  requestedSection: null,
};

let navigationSnapshot: LandingPageNavigationSnapshot = defaultSnapshot;
const listeners = new Set<() => void>();

const setNavigationSnapshot = (
  nextSnapshot: LandingPageNavigationSnapshot
): void => {
  navigationSnapshot = nextSnapshot;

  //Emit change
  listeners.forEach((listener) => {
    listener();
  });
};

export const subscribeToLandingPageNavigation = (
  listener: () => void
): (() => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

export const getLandingPageNavigationSnapshot =
  (): LandingPageNavigationSnapshot => {
    return navigationSnapshot;
  };

export const getLandingPageNavigationServerSnapshot =
  (): LandingPageNavigationSnapshot => {
    return defaultSnapshot;
  };

// Actions
export const requestLandingPageSection = (sectionId: SectionId): void => {
  setNavigationSnapshot({
    ...navigationSnapshot,
    requestedSection: sectionId,
  });
};

export const clearLandingPageSectionRequest = (): void => {
  if (navigationSnapshot.requestedSection === null) {
    return;
  }

  setNavigationSnapshot({
    ...navigationSnapshot,
    requestedSection: null,
  });
};

export const setLandingPageActiveSection = (sectionId: SectionId): void => {
  if (navigationSnapshot.activeSection === sectionId) {
    return;
  }

  setNavigationSnapshot({
    ...navigationSnapshot,
    activeSection: sectionId,
  });
};

export const setLandingPagePendingTargetSection = (
  pendingTargetSection: SectionId | null
): void => {
  if (navigationSnapshot.pendingTargetSection === pendingTargetSection) {
    return;
  }

  setNavigationSnapshot({
    ...navigationSnapshot,
    pendingTargetSection,
  });
};
