import type { ReactElement } from 'react';

import { PageSectionSurface } from '../../components/ui/PageSectionSurface';
import surface from '../../components/ui/PageSectionSurface/PageSectionSurface.module.css';
import { AboutPage } from '../AboutPage';
import { ContactPage } from '../ContactPage';
import { HomePage } from '../HomePage';
import { ProjectsPage } from '../ProjectsPage';
import { LandingPageRevealController } from './LandingPageRevealController';
import type { LandingPageProps } from './LandingPage.interfaces';
import st from './LandingPage.module.css';

export const LandingPage = ({ content }: LandingPageProps): ReactElement => {
  return (
    <PageSectionSurface className={st.root}>
      <LandingPageRevealController />

      <section id="home" className={`${surface.section} ${st.homeSection}`}>
        <HomePage content={content} />
      </section>

      <section id="projects" className={`${surface.section} ${st.projectsSection}`}>
        <ProjectsPage content={content} initialRevealState="pending" />
      </section>

      <section id="about" className={`${surface.section} ${st.aboutSection}`}>
        <AboutPage content={content} initialRevealState="pending" />
      </section>

      <section id="contact" className={`${surface.section} ${st.contactSection}`}>
        <ContactPage content={content} initialRevealState="pending" />
      </section>
    </PageSectionSurface>
  );
};
