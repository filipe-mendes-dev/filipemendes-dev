'use client';

import Link from 'next/link';
import { type ReactElement } from 'react';

import { HeaderNavList } from './HeaderNavList';
import type { HeaderProps } from './Header.interfaces';
import st from './Header.module.css';
import { ThemeToggle } from './ThemeToggle';
import { useHeaderController } from './useHeaderController';

export const Header = ({
  siteTitle,
  navigation,
}: HeaderProps): ReactElement => {
  const {
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
  } = useHeaderController({
    navigation,
  });

  return (
    <header ref={headerRef} className={`${st.root} ${st.siteHeader}`}>
      <div className={st.headerBar}>
        <div className={st.headerInner}>
          <Link
            href="/"
            className={st.siteMark}
            onClick={handleHomeNavigation}
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
              items={desktopNavItems}
              listClassName={`${st.siteNavList} ${st.desktopSiteNavList}`}
              linkClassName={st.siteNavLink}
            />
          </nav>

          <button
            type="button"
            className={st.menuToggle}
            aria-expanded={isMobileMenuOpen}
            aria-controls={mobileNavId}
            aria-label={mobileMenuLabel}
            onClick={toggleMobileMenu}
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
              onToggle={toggleTheme}
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
            items={mobileNavItems}
            listClassName={st.siteNavList}
            linkClassName={st.siteNavLink}
          />

          <div className={st.mobileMenuFooter}>
            <span className={st.mobileMenuLabel}>Theme</span>
            <ThemeToggle
              theme={theme}
              label={themeToggleLabel}
              onToggle={toggleTheme}
              className={st.mobileThemeToggle}
              size="compact"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};
