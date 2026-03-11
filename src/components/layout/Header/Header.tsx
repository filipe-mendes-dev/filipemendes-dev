import {
  type CSSProperties,
  type MouseEventHandler,
  type ReactElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import type { NavigationItem } from '../../../data/portfolio';
import { AppLink } from '../../navigation/AppLink';
import { Container } from '../../ui/Container';
import { HeaderNavList } from './HeaderNavList';
import type { HeaderProps } from './Header.interfaces';
import { ThemeToggle } from './ThemeToggle';
import st from './Header.module.css';

export const Header = ({
  siteTitle,
  navigation,
  pathname,
  currentHref,
  activeSection,
  navigate,
  onSectionRequest,
  theme,
  onThemeToggle,
}: HeaderProps): ReactElement => {
  const headerRef = useRef<HTMLElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const mobileNavId = useId();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const homeLinkAriaCurrent = pathname === '/' && activeSection === 'home' ? { ariaCurrent: 'page' as const } : {};
  const themeToggleLabel = theme === 'light' ? 'Activate dark theme' : 'Activate light theme';
  const mobileMenuLabel = isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu';
  const getNavigationKey = (item: NavigationItem): string => {
    return item.sectionId ?? `${item.href}:${item.label}`;
  };
  const getDesktopNavItemOnClick = (item: NavigationItem): MouseEventHandler<HTMLAnchorElement> => {
    return (event): void => {
      if (item.sectionId === undefined) {
        return;
      }

      event.preventDefault();
      onSectionRequest(item.sectionId, item.href);
    };
  };
  const getMobileNavItemOnClick = (item: NavigationItem): MouseEventHandler<HTMLAnchorElement> => {
    return (event): void => {
      setIsMobileMenuOpen(false);

      if (item.sectionId === undefined) {
        return;
      }

      event.preventDefault();
      onSectionRequest(item.sectionId, item.href);
    };
  };
  const isNavigationItemCurrent = (item: NavigationItem): boolean => {
    const isLandingSection = pathname === '/' && activeSection !== undefined;

    if (isLandingSection) {
      return item.sectionId !== undefined && activeSection === item.sectionId;
    }

    const isProjectDetailMatch = item.sectionId === 'projects' && pathname.startsWith('/projects/');
    const isCurrentPath = currentHref === item.href;

    return isProjectDetailMatch || isCurrentPath;
  };

  useLayoutEffect(() => {
    if (headerRef.current === null) {
      return;
    }

    const root = document.documentElement;
    const syncHeaderOffset = (): void => {
      if (headerRef.current === null) {
        return;
      }

      root.style.setProperty('--header-offset', `${headerRef.current.offsetHeight}px`);
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
      return;
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

  const getMobileNavItemStyle = (index: number): CSSProperties => {
    return {
      transitionDelay: `${90 + index * 40}ms`,
    };
  };

  return (
    <header ref={headerRef} className={`${st.root} ${st.siteHeader}`}>
      <Container className={st.headerInner}>
        <AppLink href="/" navigate={navigate} className={st.siteMark} {...homeLinkAriaCurrent}>
          <span className={st.siteMarkPrompt} aria-hidden="true">
            {'</>'}
          </span>
          <span className={st.siteMarkText}>filipemendes.dev</span>
          <span className={st.siteMarkSrOnly}>{siteTitle}</span>
        </AppLink>
        <nav aria-label="Primary" className={st.desktopNav}>
          <HeaderNavList
            items={navigation}
            listClassName={`${st.siteNavList} ${st.desktopSiteNavList}`}
            linkClassName={st.siteNavLink}
            navigate={navigate}
            getItemKey={getNavigationKey}
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
            onToggle={onThemeToggle}
          />
        </div>
      </Container>
      <nav
        ref={mobileNavRef}
        id={mobileNavId}
        aria-label="Primary"
        className={`${st.headerNav} ${isMobileMenuOpen ? st.headerNavOpen : ''}`}
      >
        <div className={st.headerNavInner}>
          <HeaderNavList
            items={navigation}
            listClassName={st.siteNavList}
            linkClassName={st.siteNavLink}
            navigate={navigate}
            getItemKey={getNavigationKey}
            isItemCurrent={isNavigationItemCurrent}
            getItemOnClick={getMobileNavItemOnClick}
            getItemStyle={getMobileNavItemStyle}
          />
          <div className={st.mobileMenuFooter}>
            <span className={st.mobileMenuLabel}>Theme</span>
            <ThemeToggle
              theme={theme}
              label={themeToggleLabel}
              onToggle={onThemeToggle}
              className={st.mobileThemeToggle}
              size="compact"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};
