import { type ReactElement, useEffect, useLayoutEffect, useMemo, useRef } from 'react';

import { AboutPage } from '../AboutPage';
import { ContactPage } from '../ContactPage';
import { HomePage } from '../HomePage';
import { ProjectsPage } from '../ProjectsPage';
import type { LandingPageProps } from './LandingPage.interfaces';
import st from './LandingPage.module.css';

const revealVisibleValue = 'visible';
const revealPendingValue = 'pending';
const scrollSpacingVar = '--landing-scroll-spacing';

const getPrefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const getScrollOffset = (): number => {
  const rootStyles = window.getComputedStyle(document.documentElement);
  const headerOffsetValue = Number.parseFloat(rootStyles.getPropertyValue('--header-offset'));
  const scrollSpacingValue = Number.parseFloat(rootStyles.getPropertyValue(scrollSpacingVar));
  const safeHeaderOffset = Number.isFinite(headerOffsetValue) ? headerOffsetValue : 72;
  const safeScrollSpacing = Number.isFinite(scrollSpacingValue) ? scrollSpacingValue : 16;

  return safeHeaderOffset + safeScrollSpacing;
};

const revealSection = (sectionElement: HTMLElement): void => {
  sectionElement.dataset.reveal = revealVisibleValue;
};

const hideSectionUntilReveal = (sectionElement: HTMLElement): void => {
  sectionElement.dataset.reveal = revealPendingValue;
};

const scrollToSection = (sectionElement: HTMLElement, shouldReduceMotion: boolean): void => {
  const sectionTop = sectionElement.getBoundingClientRect().top + window.scrollY;
  const targetTop = Math.max(sectionTop - getScrollOffset(), 0);
  const hasMeaningfulScrollDelta = Math.abs(window.scrollY - targetTop) > 2;

  if (!hasMeaningfulScrollDelta) {
    return;
  }

  window.scrollTo({
    top: targetTop,
    behavior: shouldReduceMotion ? 'auto' : 'smooth',
  });
};

export const LandingPage = ({ content, navigate, activeSection }: LandingPageProps): ReactElement => {
  const homeRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const hasHandledInitialSectionScrollRef = useRef(false);

  const sectionRefs = useMemo(
    () => ({
      home: homeRef,
      projects: projectsRef,
      about: aboutRef,
      contact: contactRef,
    }),
    [],
  );

  useLayoutEffect(() => {
    const sectionElements = Object.values(sectionRefs)
      .map((sectionRef) => sectionRef.current)
      .filter((element): element is HTMLElement => element !== null);

    if (sectionElements.length === 0) {
      return;
    }

    const prefersReducedMotion = getPrefersReducedMotion();

    if (prefersReducedMotion) {
      sectionElements.forEach(revealSection);

      return;
    }

    sectionElements.forEach((element) => {
      if (element.id === activeSection) {
        revealSection(element);

        return;
      }

      const { top } = element.getBoundingClientRect();
      const isAlreadyInView = top < window.innerHeight;

      if (isAlreadyInView) {
        revealSection(element);

        return;
      }

      hideSectionUntilReveal(element);
    });
  }, [activeSection, sectionRefs]);

  useEffect(() => {
    const sectionElements = Object.values(sectionRefs)
      .map((sectionRef) => sectionRef.current)
      .filter((element): element is HTMLElement => element !== null);

    if (sectionElements.length === 0 || getPrefersReducedMotion()) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries, intersectionObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          revealSection(entry.target as HTMLElement);
          intersectionObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.2,
        rootMargin: `0px 0px -12% 0px`,
      },
    );

    sectionElements.forEach((element) => {
      if (element.dataset.reveal !== revealPendingValue) {
        return;
      }

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

    revealSection(targetElement);

    const prefersReducedMotion = getPrefersReducedMotion();
    const shouldSmoothScroll = hasHandledInitialSectionScrollRef.current && !prefersReducedMotion;

    scrollToSection(targetElement, !shouldSmoothScroll);
    hasHandledInitialSectionScrollRef.current = true;
  }, [activeSection, sectionRefs]);

  return (
    <div className={st.root}>
      <section id="home" ref={homeRef} className={`${st.rootSection} ${st.homeSection} ${st.revealSection}`} data-reveal={revealVisibleValue}>
        <HomePage content={content} navigate={navigate} />
      </section>
      <section
        id="projects"
        ref={projectsRef}
        className={`${st.rootSection} ${st.projectsSection} ${st.revealSection}`}
        data-reveal={revealVisibleValue}
      >
        <ProjectsPage content={content} navigate={navigate} />
      </section>
      <section id="about" ref={aboutRef} className={`${st.rootSection} ${st.aboutSection} ${st.revealSection}`} data-reveal={revealVisibleValue}>
        <AboutPage content={content} />
      </section>
      <section
        id="contact"
        ref={contactRef}
        className={`${st.rootSection} ${st.contactSection} ${st.revealSection}`}
        data-reveal={revealVisibleValue}
      >
        <ContactPage content={content} />
      </section>
    </div>
  );
};
