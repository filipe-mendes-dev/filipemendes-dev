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
    onActiveSectionChange: setLandingPageActiveSection,
    onPendingTargetSectionChange: setLandingPagePendingTargetSection,
    onSectionRequestHandled: clearLandingPageSectionRequest,
    requestedSection: navigationSnapshot.requestedSection,
  });

  useLandingPageActiveSectionTracker({
    onActiveSectionChange: setLandingPageActiveSection,
    onPendingTargetSectionChange: setLandingPagePendingTargetSection,
    pendingTargetSection: navigationSnapshot.pendingTargetSection,
  });

  return null;
};
