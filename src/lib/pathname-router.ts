import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import type { SectionId } from '../shared/navigation/sections';

export interface RouteMatch {
  page: 'landing' | 'project-detail' | 'not-found';
  sectionId?: SectionId;
  projectSlug?: string;
}

export interface RouterLocation {
  pathname: string;
  hash: string;
}

const normalizePath = (rawPath: string): string => {
  if (rawPath.length === 0) {
    return '/';
  }

  if (rawPath !== '/' && rawPath.endsWith('/')) {
    return rawPath.slice(0, -1);
  }

  return rawPath;
};

const parsePath = (pathname: string, _hash: string): RouteMatch => {
  const path = normalizePath(pathname);

  if (path === '/') {
    return {
      page: 'landing',
      sectionId: 'home',
    };
  }

  if (path.startsWith('/projects/')) {
    const projectSlug = path.replace('/projects/', '');

    if (projectSlug.length > 0) {
      return {
        page: 'project-detail',
        projectSlug,
      };
    }
  }

  return { page: 'not-found' };
};

const getCurrentLocation = (): RouterLocation => {
  return {
    pathname: normalizePath(window.location.pathname),
    hash: window.location.hash,
  };
};

const getNormalizedHref = (href: string): RouterLocation => {
  const url = new URL(href, window.location.origin);

  return {
    pathname: normalizePath(url.pathname),
    hash: url.hash,
  };
};

const scrollWindowToTop = (): void => {
  const rootStyle = document.documentElement.style;
  const previousScrollBehavior = rootStyle.getPropertyValue('scroll-behavior');

  rootStyle.setProperty('scroll-behavior', 'auto');
  window.scrollTo(0, 0);

  if (previousScrollBehavior.length > 0) {
    rootStyle.setProperty('scroll-behavior', previousScrollBehavior);

    return;
  }

  rootStyle.removeProperty('scroll-behavior');
};

export const usePathnameRouter = () => {
  const [location, setLocation] = useState<RouterLocation>(() => getCurrentLocation());
  const previousLocationRef = useRef<RouterLocation | null>(null);

  useEffect(() => {
    const onPopState = (): void => {
      setLocation(getCurrentLocation());
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  useLayoutEffect(() => {
    const previousLocation = previousLocationRef.current;
    previousLocationRef.current = location;

    if (previousLocation === null) {
      return;
    }

    const hasLocationChanged = previousLocation.pathname !== location.pathname || previousLocation.hash !== location.hash;

    if (!hasLocationChanged || location.hash.length > 0) {
      return;
    }

    scrollWindowToTop();
  }, [location]);

  const navigate = (href: string): void => {
    const normalizedHref = getNormalizedHref(href);

    if (normalizedHref.pathname === location.pathname && normalizedHref.hash === location.hash) {
      return;
    }

    if (normalizedHref.hash.length === 0) {
      scrollWindowToTop();
    }

    window.history.pushState({}, '', `${normalizedHref.pathname}${normalizedHref.hash}`);
    setLocation(normalizedHref);
  };

  const route = useMemo(() => parsePath(location.pathname, location.hash), [location.hash, location.pathname]);

  return {
    pathname: location.pathname,
    hash: location.hash,
    currentHref: `${location.pathname}${location.hash}`,
    route,
    navigate,
  };
};
