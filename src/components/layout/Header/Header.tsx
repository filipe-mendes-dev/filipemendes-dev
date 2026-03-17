'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  type CSSProperties,
  type MouseEvent,
  type MouseEventHandler,
  type ReactElement,
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
import { HeaderNavList } from './HeaderNavList';
import type { HeaderProps } from './Header.interfaces';
import st from './Header.module.css';
import { ThemeToggle } from './ThemeToggle';

const themeStorageKey = 'portfolio-theme';
const themeChangeEventName = 'portfolio-theme-change';

const getStoredTheme = (): 'light' | 'dark' => {
  const rootTheme = document.documentElement.getAttribute('data-theme');

  if (rootTheme === 'light' || rootTheme === 'dark') {
    return rootTheme;
  }

  return 'light';
};

const subscribeToTheme = (onStoreChange: () => void): (() => void) => {
  const handleThemeChange = (): void => {
    onStoreChange();
  };

  window.addEventListener(themeChangeEventName, handleThemeChange);
  window.addEventListener('storage', handleThemeChange);

  return () => {
    window.removeEventListener(themeChangeEventName, handleThemeChange);
    window.removeEventListener('storage', handleThemeChange);
  };
};

const getServerThemeSnapshot = (): 'light' | 'dark' => {
  return 'light';
};

const getSectionHref = (sectionId: SectionId): string => {
  return `/#${sectionId}`;
};

export const Header = ({
  siteTitle,
  navigation,
}: HeaderProps): ReactElement => {
  const pathname = usePathname() ?? '/';
  const headerRef = useRef<HTMLElement | null>(null);
  const mobileNavRef = useRef<HTMLElement | null>(null);
  const mobileNavId = useId();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getStoredTheme,
    getServerThemeSnapshot,
  );
  const themeToggleLabel =
    theme === 'light' ? 'Activate dark theme' : 'Activate light theme';
  const mobileMenuLabel = isMobileMenuOpen
    ? 'Close navigation menu'
    : 'Open navigation menu';
  const homeLinkAriaCurrent =
    pathname === '/' && activeSection === 'home'
      ? { 'aria-current': 'page' as const }
      : {};

  const getNavigationKey = (item: NavigationItem): string => {
    return item.sectionId ?? `${item.href}:${item.label}`;
  };

  const getNavigationHref = (item: NavigationItem): string => {
    return item.sectionId === undefined ? item.href : getSectionHref(item.sectionId);
  };

  const handleThemeToggle = (): void => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', nextTheme);
    window.localStorage.setItem(themeStorageKey, nextTheme);
    window.dispatchEvent(new Event(themeChangeEventName));
  };

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

  const getDesktopNavItemOnClick = (
    item: NavigationItem,
  ): MouseEventHandler<HTMLAnchorElement> => {
    return (event): void => {
      handleSectionNavigation(item.sectionId, event);
    };
  };

  const getMobileNavItemOnClick = (
    item: NavigationItem,
  ): MouseEventHandler<HTMLAnchorElement> => {
    return (event): void => {
      setIsMobileMenuOpen(false);
      handleSectionNavigation(item.sectionId, event);
    };
  };

  const isNavigationItemCurrent = (item: NavigationItem): boolean => {
    const isLandingSection =
      pathname === '/' && activeSection !== undefined;

    if (isLandingSection) {
      return (
        item.sectionId !== undefined && activeSection === item.sectionId
      );
    }

    const isProjectDetailMatch =
      item.sectionId === 'projects' && pathname.startsWith('/projects/');

    if (isProjectDetailMatch) {
      return true;
    }

    return item.sectionId === undefined && pathname === item.href;
  };

  const getMobileNavItemStyle = (index: number): CSSProperties => {
    return {
      transitionDelay: `calc(var(--motion-duration-xs) + ${index} * var(--motion-stagger-sm))`,
    };
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

  const links = navigation;

  return (
    <header ref={headerRef} className={`${st.root} ${st.siteHeader}`}>
      <div className={st.headerBar}>
        <div className={st.headerInner}>
          <Link
            href="/"
            className={st.siteMark}
            onClick={(event) => {
              handleSectionNavigation('home', event);
            }}
            {...homeLinkAriaCurrent}
          >
            <span className={st.siteMarkPrompt} aria-hidden="true">
              {'</>'}
            </span>
            <span className={st.siteMarkText}>filipemendes.dev</span>
            <span className={st.siteMarkSrOnly}>{siteTitle}</span>
          </Link>

          <nav aria-label="Primary" className={st.desktopNav}>
            <HeaderNavList
              items={links}
              listClassName={`${st.siteNavList} ${st.desktopSiteNavList}`}
              linkClassName={st.siteNavLink}
              getItemKey={getNavigationKey}
              getItemHref={getNavigationHref}
              isItemCurrent={isNavigationItemCurrent}
              getItemOnClick={getDesktopNavItemOnClick}
            />
          </nav>

          <button
            type="button"
            className={st.menuToggle}
            aria-expanded={isMobileMenuOpen}
            aria-controls={mobileNavId}
            aria-label={mobileMenuLabel}
            onClick={() => {
              setIsMobileMenuOpen((currentValue) => !currentValue);
            }}
          >
            <span className={st.menuToggleBars} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>

          <div className={st.desktopThemeToggle}>
            <ThemeToggle
              theme={theme}
              label={themeToggleLabel}
              onToggle={handleThemeToggle}
            />
          </div>
        </div>
      </div>

      <nav
        ref={mobileNavRef}
        id={mobileNavId}
        aria-label="Primary"
        className={`${st.headerNav} ${isMobileMenuOpen ? st.headerNavOpen : ''}`}
      >
        <div className={st.headerNavInner}>
          <HeaderNavList
            items={links}
            listClassName={st.siteNavList}
            linkClassName={st.siteNavLink}
            getItemKey={getNavigationKey}
            getItemHref={getNavigationHref}
            isItemCurrent={isNavigationItemCurrent}
            getItemOnClick={getMobileNavItemOnClick}
            getItemStyle={getMobileNavItemStyle}
          />

          <div className={st.mobileMenuFooter}>
            <span className={st.mobileMenuLabel}>Theme</span>
            <ThemeToggle
              theme={theme}
              label={themeToggleLabel}
              onToggle={handleThemeToggle}
              className={st.mobileThemeToggle}
              size="compact"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};
