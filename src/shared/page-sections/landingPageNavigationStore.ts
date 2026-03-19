import type { SectionId } from '../navigation/sections';

export interface LandingPageNavigationSnapshot {
  activeSection: SectionId;
  requestKey: number;
  requestedSection: SectionId | null;
}

const defaultSnapshot: LandingPageNavigationSnapshot = {
  activeSection: 'home',
  requestKey: 0,
  requestedSection: null,
};

let navigationSnapshot: LandingPageNavigationSnapshot = defaultSnapshot;
const listeners = new Set<() => void>();

const emitChange = (): void => {
  listeners.forEach((listener) => {
    listener();
  });
};

const setNavigationSnapshot = (
  nextSnapshot: LandingPageNavigationSnapshot,
): void => {
  navigationSnapshot = nextSnapshot;
  emitChange();
};

export const subscribeToLandingPageNavigation = (
  listener: () => void,
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

export const requestLandingPageSection = (sectionId: SectionId): void => {
  setNavigationSnapshot({
    ...navigationSnapshot,
    requestKey: navigationSnapshot.requestKey + 1,
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
