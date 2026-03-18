import type { ReactElement } from 'react';

import { PageSectionSurface } from '../../components/ui/PageSectionSurface';
import surface from '../../components/ui/PageSectionSurface/PageSectionSurface.module.css';
import { portfolio } from '../../data/portfolio';
import { LandingPageRevealController } from './LandingPageRevealController';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';
import { HeroSection } from './sections/HeroSection';
import { ProjectsSection } from './sections/ProjectsSection';
import st from './LandingPage.module.css';

const LandingPage = (): ReactElement => {
  const content = portfolio;

  return (
    <PageSectionSurface className={st.root}>
      <LandingPageRevealController />

      <section id="home" className={`${surface.section} ${st.homeSection}`}>
        <HeroSection content={content} />
      </section>

      <section id="projects" className={`${surface.section} ${st.projectsSection}`}>
        <ProjectsSection content={content} initialRevealState="pending" />
      </section>

      <section id="about" className={`${surface.section} ${st.aboutSection}`}>
        <AboutSection content={content} initialRevealState="pending" />
      </section>

      <section id="contact" className={`${surface.section} ${st.contactSection}`}>
        <ContactSection content={content} initialRevealState="pending" />
      </section>
    </PageSectionSurface>
  );
};

export default LandingPage;
