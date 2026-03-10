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
  const [requestedSection, setRequestedSection] = useState<SectionId>('home');
  const [sectionRequestNonce, setSectionRequestNonce] = useState(0);
  const activeSection = route.page === 'landing' ? visibleSection : undefined;
  const footerAction =
    route.page === 'project-detail'
      ? {
          actionHref: '/',
          actionLabel: 'Go back',
        }
      : {};

  useEffect(() => {
    applyThemeTokens(themeTokenSets[theme]);
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  const handleNavigate = (href: string): void => {
    if (href === '/') {
      setRequestedSection('home');
      setSectionRequestNonce((currentNonce) => currentNonce + 1);
    }

    navigate(href);
  };

  const handleSectionRequest = (sectionId: SectionId, href: string): void => {
    setVisibleSection(sectionId);
    setRequestedSection(sectionId);
    setSectionRequestNonce((currentNonce) => currentNonce + 1);
    navigate(href);
  };

  const page = (() => {
    switch (route.page) {
      case 'landing':
        return (
          <LandingPage
            content={portfolio}
            navigate={handleNavigate}
            activeSection={visibleSection}
            requestedSection={requestedSection}
            requestedSectionKey={`${currentHref}:${sectionRequestNonce}`}
            onSectionRequest={(sectionId) => {
              handleSectionRequest(sectionId, '/');
            }}
            onActiveSectionChange={setVisibleSection}
          />
        );
      case 'project-detail': {
        const project = portfolio.projects.find((item) => item.slug === route.projectSlug);

        if (project === undefined) {
          return <NotFoundPage navigate={navigate} />;
        }

          return <ProjectDetailPage project={project} navigate={handleNavigate} />;
        }
      default:
        return <NotFoundPage navigate={handleNavigate} />;
    }
  })();

  return (
    <div className={`${st.root} ${st.siteShell}`}>
      <Header
        siteTitle={portfolio.siteTitle}
        navigation={portfolio.navigation}
        pathname={pathname}
        currentHref={currentHref}
        navigate={handleNavigate}
        onSectionRequest={handleSectionRequest}
        theme={theme}
        onThemeToggle={() => {
          setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
        }}
        {...(activeSection !== undefined ? { activeSection } : {})}
      />
      <main className={st.main}>{page}</main>
      <Footer
        name={portfolio.siteTitle}
        descriptor={portfolio.descriptor}
        githubUrl={getSocialLink('GitHub')}
        linkedInUrl={getSocialLink('LinkedIn')}
        navigate={handleNavigate}
        {...footerAction}
      />
    </div>
  );
};
