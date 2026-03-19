import { usePathname } from 'next/navigation';
import {
  type CSSProperties,
  type MouseEvent,
  type MouseEventHandler,
  type RefObject,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';

import type { NavigationItem } from '../../../data/portfolio';
import { type SectionId } from '../../../shared/navigation/sections';
import {
  getLandingPageNavigationServerSnapshot,
  getLandingPageNavigationSnapshot,
  requestLandingPageSection,
  subscribeToLandingPageNavigation,
} from '../../../shared/page-sections/landingPageNavigationStore';
import {
  defaultThemePreference,
  getStoredThemePreference,
  setStoredThemePreference,
  type ThemeName,
} from '../../../shared/theme/themePreference';
import type { HeaderNavListItem } from './HeaderNavList/HeaderNavList.interfaces';

interface HeaderControllerConfig {
  navigation: NavigationItem[];
}

interface HeaderControllerResult {
  desktopNavItems: HeaderNavListItem[];
  handleHomeNavigation: MouseEventHandler<HTMLAnchorElement>;
  headerRef: RefObject<HTMLElement | null>;
  homeLinkAriaCurrent: {
    'aria-current'?: 'page';
  };
  isMobileMenuOpen: boolean;
  mobileMenuLabel: string;
  mobileNavId: string;
  mobileNavItems: HeaderNavListItem[];
  mobileNavRef: RefObject<HTMLElement | null>;
  theme: ThemeName;
  themeToggleLabel: string;
  toggleMobileMenu: () => void;
  toggleTheme: () => void;
}

const getSectionHref = (sectionId: SectionId): string => {
  void sectionId;
  return '/';
};

const getNavigationKey = (item: NavigationItem): string => {
  return item.sectionId ?? `${item.href}:${item.label}`;
};

const getNavigationHref = (item: NavigationItem): string => {
  return item.sectionId === undefined ? item.href : getSectionHref(item.sectionId);
};

const getMobileNavItemStyle = (index: number): CSSProperties => {
  return {
    transitionDelay: `calc(var(--motion-duration-xs) + ${index} * var(--motion-stagger-sm))`,
  };
};

export const useHeaderController = ({
  navigation,
}: HeaderControllerConfig): HeaderControllerResult => {
  const pathname = usePathname() ?? '/';
  const headerRef = useRef<HTMLElement | null>(null);
  const mobileNavRef = useRef<HTMLElement | null>(null);
  const mobileNavId = useId();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeName>(defaultThemePreference);
  const landingPageNavigation = useSyncExternalStore(
    subscribeToLandingPageNavigation,
    getLandingPageNavigationSnapshot,
    getLandingPageNavigationServerSnapshot,
  );
  const activeSection: SectionId | undefined =
    pathname === '/'
      ? landingPageNavigation.activeSection
      : pathname.startsWith('/projects/')
        ? 'projects'
        : undefined;
  const themeToggleLabel =
    theme === 'light' ? 'Activate dark theme' : 'Activate light theme';
  const mobileMenuLabel = isMobileMenuOpen
    ? 'Close navigation menu'
    : 'Open navigation menu';
  const homeLinkAriaCurrent =
    pathname === '/' && activeSection === 'home'
      ? { 'aria-current': 'page' as const }
      : {};

  const handleSectionNavigation = (
    sectionId: SectionId | undefined,
    event: MouseEvent<HTMLAnchorElement>,
  ): void => {
    if (sectionId === undefined) {
      return;
    }

    requestLandingPageSection(sectionId);

    if (pathname === '/') {
      event.preventDefault();
    }
  };

  const isNavigationItemActive = (item: NavigationItem): boolean => {
    if (pathname === '/' && activeSection !== undefined) {
      return item.sectionId !== undefined && activeSection === item.sectionId;
    }

    if (item.sectionId === 'projects' && pathname.startsWith('/projects/')) {
      return true;
    }

    return item.sectionId === undefined && pathname === item.href;
  };

  const createNavItems = ({
    closeMobileMenuOnClick,
    includeItemStyle,
  }: {
    closeMobileMenuOnClick: boolean;
    includeItemStyle: boolean;
  }): HeaderNavListItem[] => {
    return navigation.map((item, index) => {
      const onClick: MouseEventHandler<HTMLAnchorElement> | undefined =
        item.sectionId === undefined
          ? closeMobileMenuOnClick
            ? () => {
                setIsMobileMenuOpen(false);
              }
            : undefined
          : (event): void => {
              if (closeMobileMenuOnClick) {
                setIsMobileMenuOpen(false);
              }

              handleSectionNavigation(item.sectionId, event);
            };

      return {
        href: getNavigationHref(item),
        isActive: isNavigationItemActive(item),
        key: getNavigationKey(item),
        label: item.label,
        onClick,
        style: includeItemStyle ? getMobileNavItemStyle(index) : undefined,
      };
    });
  };

  const desktopNavItems = createNavItems({
    closeMobileMenuOnClick: false,
    includeItemStyle: false,
  });
  const mobileNavItems = createNavItems({
    closeMobileMenuOnClick: true,
    includeItemStyle: true,
  });

  const handleHomeNavigation: MouseEventHandler<HTMLAnchorElement> = (event) => {
    handleSectionNavigation('home', event);
  };

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen((currentValue) => !currentValue);
  };

  const toggleTheme = (): void => {
    const nextTheme: ThemeName = theme === 'light' ? 'dark' : 'light';

    setStoredThemePreference(nextTheme);
    setTheme(nextTheme);
  };

  useLayoutEffect(() => {
    if (headerRef.current === null) {
      return undefined;
    }

    const root = document.documentElement;
    const syncHeaderOffset = (): void => {
      if (headerRef.current === null) {
        return;
      }

      root.style.setProperty(
        '--header-offset',
        `${headerRef.current.offsetHeight}px`,
      );
    };

    syncHeaderOffset();

    const observer = new ResizeObserver(() => {
      syncHeaderOffset();
    });

    observer.observe(headerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const themeSyncFrame = window.requestAnimationFrame(() => {
      setTheme(getStoredThemePreference());
    });

    return () => {
      window.cancelAnimationFrame(themeSyncFrame);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent): void => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      const isInsideHeader = headerRef.current?.contains(target) ?? false;
      const isInsideMobileNav = mobileNavRef.current?.contains(target) ?? false;

      if (isInsideHeader || isInsideMobileNav) {
        return;
      }

      setIsMobileMenuOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isMobileMenuOpen]);

  return {
    desktopNavItems,
    handleHomeNavigation,
    headerRef,
    homeLinkAriaCurrent,
    isMobileMenuOpen,
    mobileMenuLabel,
    mobileNavId,
    mobileNavItems,
    mobileNavRef,
    theme,
    themeToggleLabel,
    toggleMobileMenu,
    toggleTheme,
  };
};
