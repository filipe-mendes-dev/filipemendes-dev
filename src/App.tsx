import { type ReactElement, useEffect, useState } from 'react';

import st from './App.module.css';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { portfolio } from './data/portfolio';
import { usePathnameRouter } from './lib/pathname-router';
import { LandingPage } from './pages/LandingPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import type { SectionId } from './shared/navigation/sections';
import { applyThemeTokens } from './shared/theme/applyThemeTokens';
import { type ThemeName, themeTokenSets } from './shared/theme/tokens';

const themeStorageKey = 'portfolio-theme';

const getInitialTheme = (): ThemeName => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const persistedTheme = window.localStorage.getItem(themeStorageKey);

  if (persistedTheme === 'light' || persistedTheme === 'dark') {
    return persistedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getSafeSection = (sectionId: SectionId | undefined): SectionId => {
  return sectionId ?? 'home';
};

const getSocialLink = (label: string): string => {
  const socialLink = portfolio.contact.socials.find((item) => item.label.toLowerCase() === label.toLowerCase());

  return socialLink?.href ?? '#';
};

export const App = (): ReactElement => {
  const { currentHref, pathname, route, navigate } = usePathnameRouter();
  const [theme, setTheme] = useState<ThemeName>(() => getInitialTheme());
  const [visibleSection, setVisibleSection] = useState<SectionId>(() => getSafeSection(route.sectionId));
  const activeSection = route.page === 'landing' ? visibleSection : undefined;
  const footerAction =
    route.page === 'project-detail'
      ? {
          actionHref: '/#projects',
          actionLabel: 'Back to Projects',
        }
      : {};

  useEffect(() => {
    applyThemeTokens(themeTokenSets[theme]);
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  const page = (() => {
    switch (route.page) {
      case 'landing':
        return (
          <LandingPage
            content={portfolio}
            navigate={navigate}
            activeSection={getSafeSection(route.sectionId)}
            requestedSection={getSafeSection(route.sectionId)}
            requestedSectionKey={currentHref}
            onActiveSectionChange={setVisibleSection}
          />
        );
      case 'project-detail': {
        const project = portfolio.projects.find((item) => item.slug === route.projectSlug);

        if (project === undefined) {
          return <NotFoundPage navigate={navigate} />;
        }

        return <ProjectDetailPage project={project} navigate={navigate} />;
      }
      default:
        return <NotFoundPage navigate={navigate} />;
    }
  })();

  return (
    <div className={`${st.root} ${st.siteShell}`}>
      <Header
        siteTitle={portfolio.siteTitle}
        navigation={portfolio.navigation}
        pathname={pathname}
        currentHref={currentHref}
        navigate={navigate}
        theme={theme}
        onThemeToggle={() => {
          setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
        }}
        {...(activeSection !== undefined ? { activeSection } : {})}
      />
      <main>{page}</main>
      <Footer
        name={portfolio.siteTitle}
        descriptor={portfolio.descriptor}
        githubUrl={getSocialLink('GitHub')}
        linkedInUrl={getSocialLink('LinkedIn')}
        navigate={navigate}
        {...footerAction}
      />
    </div>
  );
};
