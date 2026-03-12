import { type ReactElement, useEffect, useRef } from 'react';

import type { PageSectionSurfaceProps } from './PageSectionSurface.interfaces';
import st from './PageSectionSurface.module.css';

const getPrefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const PageSectionSurface = ({
  children,
  className,
}: PageSectionSurfaceProps): ReactElement => {
  const rootRef = useRef<HTMLDivElement>(null);
  const rootClassName = className === undefined ? st.root : `${st.root} ${className}`;

  useEffect(() => {
    const rootElement = rootRef.current;

    if (rootElement === null || getPrefersReducedMotion()) {
      return;
    }

    let frameId = 0;

    const syncSurfaceOffset = (): void => {
      frameId = 0;

      const { top, height } = rootElement.getBoundingClientRect();
      const safeHeight = Math.max(height, window.innerHeight);
      const scrollProgress = Math.min(Math.max((-top) / safeHeight, 0), 1);
      const shiftY = Math.round(scrollProgress * 18);
      const shiftX = Math.round(scrollProgress * -10);

      rootElement.style.setProperty('--page-surface-shift-x', `${shiftX}px`);
      rootElement.style.setProperty('--page-surface-shift-y', `${shiftY}px`);
    };

    const requestSync = (): void => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(syncSurfaceOffset);
    };

    syncSurfaceOffset();
    window.addEventListener('scroll', requestSync, { passive: true });
    window.addEventListener('resize', requestSync);

    return () => {
      window.removeEventListener('scroll', requestSync);
      window.removeEventListener('resize', requestSync);

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      rootElement.style.removeProperty('--page-surface-shift-x');
      rootElement.style.removeProperty('--page-surface-shift-y');
    };
  }, []);

  return <div ref={rootRef} className={rootClassName}>{children}</div>;
};
