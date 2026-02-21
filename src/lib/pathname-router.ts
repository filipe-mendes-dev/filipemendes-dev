import { useEffect, useMemo, useState } from 'react';

import { getSectionFromHash, getSectionFromPath, type SectionId } from '../shared/navigation/sections';

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

const parsePath = (pathname: string, hash: string): RouteMatch => {
  const path = normalizePath(pathname);
  const sectionFromPath = getSectionFromPath(path);
  const sectionFromHash = getSectionFromHash(hash);

  if (sectionFromPath !== undefined) {
    return {
      page: 'landing',
      sectionId: sectionFromHash ?? sectionFromPath,
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

export const usePathnameRouter = () => {
  const [location, setLocation] = useState<RouterLocation>(() => getCurrentLocation());

  useEffect(() => {
    const onPopState = (): void => {
      setLocation(getCurrentLocation());
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  const navigate = (href: string): void => {
    const normalizedHref = getNormalizedHref(href);

    if (normalizedHref.pathname === location.pathname && normalizedHref.hash === location.hash) {
      return;
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
