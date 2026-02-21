import type { ReactElement } from 'react';

import st from './App.module.css';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { portfolio } from './data/portfolio';
import { usePathnameRouter } from './lib/pathname-router';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';

const getSocialLink = (label: string): string => {
  const socialLink = portfolio.contact.socials.find((item) => item.label.toLowerCase() === label.toLowerCase());

  return socialLink?.href ?? '#';
};

export const App = (): ReactElement => {
  const { pathname, route, navigate } = usePathnameRouter();

  const page = (() => {
    switch (route.page) {
      case 'home':
        return <HomePage content={portfolio} navigate={navigate} />;
      case 'projects':
        return <ProjectsPage content={portfolio} navigate={navigate} />;
      case 'about':
        return <AboutPage content={portfolio} />;
      case 'contact':
        return <ContactPage content={portfolio} />;
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
      <Header siteTitle={portfolio.siteTitle} navigation={portfolio.navigation} pathname={pathname} navigate={navigate} />
      <main>{page}</main>
      <Footer
        name={portfolio.siteTitle}
        descriptor={portfolio.descriptor}
        navigation={portfolio.navigation}
        navigate={navigate}
        githubUrl={getSocialLink('GitHub')}
        linkedInUrl={getSocialLink('LinkedIn')}
      />
    </div>
  );
};
