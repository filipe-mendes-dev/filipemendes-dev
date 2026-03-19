'use client';

import { type ReactElement, useSyncExternalStore } from 'react';

import {
  clearLandingPageSectionRequest,
  getLandingPageNavigationServerSnapshot,
  getLandingPageNavigationSnapshot,
  setLandingPageActiveSection,
  subscribeToLandingPageNavigation,
} from '../../shared/page-sections/landingPageNavigationStore';
import { useLandingPageSectionNavigation } from '../../shared/page-sections/useLandingPageSectionNavigation';

export const LandingPageNavigationBinder = (): ReactElement | null => {
  const navigationSnapshot = useSyncExternalStore(
    subscribeToLandingPageNavigation,
    getLandingPageNavigationSnapshot,
    getLandingPageNavigationServerSnapshot,
  );

  useLandingPageSectionNavigation({
    onActiveSectionChange: setLandingPageActiveSection,
    onSectionRequestHandled: clearLandingPageSectionRequest,
    requestedSection: navigationSnapshot.requestedSection,
  });

  return null;
};
