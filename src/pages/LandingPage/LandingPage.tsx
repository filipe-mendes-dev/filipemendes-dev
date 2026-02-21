import { type ReactElement, useEffect, useMemo, useRef } from 'react';

import { AboutPage } from '../AboutPage';
import { ContactPage } from '../ContactPage';
import { HomePage } from '../HomePage';
import { ProjectsPage } from '../ProjectsPage';
import type { LandingPageProps } from './LandingPage.interfaces';
import st from './LandingPage.module.css';

export const LandingPage = ({ content, navigate, activeSection }: LandingPageProps): ReactElement => {
  const homeRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const sectionRefs = useMemo(
    () => ({
      home: homeRef,
      projects: projectsRef,
      about: aboutRef,
      contact: contactRef,
    }),
    [],
  );

  useEffect(() => {
    const sectionElements = Object.values(sectionRefs)
      .map((sectionRef) => sectionRef.current)
      .filter((element): element is HTMLElement => element !== null);

    if (sectionElements.length === 0) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      sectionElements.forEach((element) => {
        element.setAttribute('data-visible', 'true');
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries, intersectionObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.setAttribute('data-visible', 'true');
          intersectionObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.2,
      },
    );

    sectionElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionRefs]);

  useEffect(() => {
    const targetElement = sectionRefs[activeSection].current;

    if (targetElement === null) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    targetElement.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [activeSection, sectionRefs]);

  return (
    <div className={st.root}>
      <section id="home" ref={homeRef} className={`${st.rootSection} ${st.homeSection} ${st.revealSection}`}>
        <HomePage content={content} navigate={navigate} />
      </section>
      <section id="projects" ref={projectsRef} className={`${st.rootSection} ${st.projectsSection} ${st.revealSection}`}>
        <ProjectsPage content={content} navigate={navigate} />
      </section>
      <section id="about" ref={aboutRef} className={`${st.rootSection} ${st.aboutSection} ${st.revealSection}`}>
        <AboutPage content={content} />
      </section>
      <section id="contact" ref={contactRef} className={`${st.rootSection} ${st.contactSection} ${st.revealSection}`}>
        <ContactPage content={content} />
      </section>
    </div>
  );
};
