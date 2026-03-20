'use client';

import { type ReactElement, useSyncExternalStore } from 'react';

import {
  clearLandingPageSectionRequest,
  getLandingPageNavigationServerSnapshot,
  getLandingPageNavigationSnapshot,
  setLandingPageActiveSection,
  setLandingPagePendingTargetSection,
  subscribeToLandingPageNavigation,
} from './landingPageNavigationStore';
import { useLandingPageActiveSectionTracker } from './useLandingPageActiveSectionTracker';
import { useLandingPageNavigationController } from './useLandingPageNavigationController';

export const LandingPageNavigationBinder = (): ReactElement | null => {
  const navigationSnapshot = useSyncExternalStore(
    subscribeToLandingPageNavigation,
    getLandingPageNavigationSnapshot,
    getLandingPageNavigationServerSnapshot,
  );

  useLandingPageNavigationController({
    clearRequestedSection: clearLandingPageSectionRequest,
    requestedSection: navigationSnapshot.requestedSection,
    setActiveSection: setLandingPageActiveSection,
    setPendingTargetSection: setLandingPagePendingTargetSection,
  });

  useLandingPageActiveSectionTracker({
    pendingTargetSection: navigationSnapshot.pendingTargetSection,
    setActiveSection: setLandingPageActiveSection,
    setPendingTargetSection: setLandingPagePendingTargetSection,
  });

  return null;
};
