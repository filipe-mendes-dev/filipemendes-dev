'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

import { heroIntroRevealGateDelayMs } from '../sections/HeroSection/heroMotion';

export const useLandingPageRevealEnabled = (): boolean => {
  const isReducedMotionEnabled = useReducedMotion() ?? false;
  const [hasRevealDelayElapsed, setHasRevealDelayElapsed] = useState<boolean>(false);

  useEffect(() => {
    if (isReducedMotionEnabled) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setHasRevealDelayElapsed(true);
    }, heroIntroRevealGateDelayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isReducedMotionEnabled]);

  return isReducedMotionEnabled || hasRevealDelayElapsed;
};
