import { useEffect, useMemo, useState } from 'react';

export interface RouteMatch {
  page: 'home' | 'projects' | 'about' | 'contact' | 'project-detail' | 'not-found';
  projectSlug?: string;
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

const parsePath = (pathname: string): RouteMatch => {
  const path = normalizePath(pathname);

  if (path === '/') {
    return { page: 'home' };
  }

  if (path === '/projects') {
    return { page: 'projects' };
  }

  if (path === '/about') {
    return { page: 'about' };
  }

  if (path === '/contact') {
    return { page: 'contact' };
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

const getCurrentPath = (): string => normalizePath(window.location.pathname);

export const usePathnameRouter = () => {
  const [pathname, setPathname] = useState<string>(() => getCurrentPath());

  useEffect(() => {
    const onPopState = (): void => {
      setPathname(getCurrentPath());
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  const navigate = (href: string): void => {
    const normalizedHref = normalizePath(href);

    if (normalizedHref === pathname) {
      return;
    }

    window.history.pushState({}, '', normalizedHref);
    setPathname(normalizedHref);
  };

  const route = useMemo(() => parsePath(pathname), [pathname]);

  return {
    pathname,
    route,
    navigate,
  };
};
