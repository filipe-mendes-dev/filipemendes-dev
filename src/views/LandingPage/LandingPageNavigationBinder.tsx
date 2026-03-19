'use client';

import { type ReactElement, useSyncExternalStore } from 'react';

import {
  clearLandingPageSectionRequest,
  getLandingPageNavigationServerSnapshot,
  getLandingPageNavigationSnapshot,
  setLandingPageActiveSection,
  setLandingPagePendingTargetSection,
  subscribeToLandingPageNavigation,
} from '../../shared/page-sections/landingPageNavigationStore';
import { useLandingPageActiveSectionTracker } from '../../shared/page-sections/useLandingPageActiveSectionTracker';
import { useLandingPageNavigationController } from '../../shared/page-sections/useLandingPageNavigationController';

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
