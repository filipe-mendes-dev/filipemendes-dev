import { isSectionId, type SectionId } from '../navigation/sections';

export interface LandingPageNavigationSnapshot {
  activeSection: SectionId;
  requestKey: number;
  requestedSection: SectionId;
}

const defaultSnapshot: LandingPageNavigationSnapshot = {
  activeSection: 'home',
  requestKey: 0,
  requestedSection: 'home',
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
    activeSection: sectionId,
    requestKey: navigationSnapshot.requestKey + 1,
    requestedSection: sectionId,
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

export const syncLandingPageNavigationFromHash = (): void => {
  const hashValue = window.location.hash.replace(/^#/, '');

  if (!isSectionId(hashValue)) {
    return;
  }

  if (
    navigationSnapshot.requestKey !== 0 &&
    navigationSnapshot.requestedSection === hashValue
  ) {
    return;
  }

  setNavigationSnapshot({
    activeSection: hashValue,
    requestKey: navigationSnapshot.requestKey + 1,
    requestedSection: hashValue,
  });
};
