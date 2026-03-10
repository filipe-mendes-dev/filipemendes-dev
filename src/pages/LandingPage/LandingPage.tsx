import { type ReactElement, useEffect, useLayoutEffect, useMemo, useRef } from 'react';

import { AboutPage } from '../AboutPage';
import { ContactPage } from '../ContactPage';
import { HomePage } from '../HomePage';
import { ProjectsPage } from '../ProjectsPage';
import type { LandingPageProps } from './LandingPage.interfaces';
import st from './LandingPage.module.css';
import type { SectionId } from '../../shared/navigation/sections';

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

const getMaxScrollTop = (): number => {
  const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

  return Math.max(documentHeight - window.innerHeight, 0);
};

const revealSection = (sectionElement: HTMLElement): void => {
  sectionElement.dataset.reveal = revealVisibleValue;
};

const hideSectionUntilReveal = (sectionElement: HTMLElement): void => {
  sectionElement.dataset.reveal = revealPendingValue;
};

const scrollToSection = (sectionElement: HTMLElement, shouldReduceMotion: boolean): void => {
  const sectionTop = sectionElement.getBoundingClientRect().top + window.scrollY;
  const targetTop = Math.min(Math.max(sectionTop - getScrollOffset(), 0), getMaxScrollTop());
  const hasMeaningfulScrollDelta = Math.abs(window.scrollY - targetTop) > 2;

  if (!hasMeaningfulScrollDelta) {
    return;
  }

  window.scrollTo({
    top: targetTop,
    behavior: shouldReduceMotion ? 'auto' : 'smooth',
  });
};

const getSectionTargetTop = (sectionElement: HTMLElement): number => {
  const sectionTop = sectionElement.getBoundingClientRect().top + window.scrollY;

  return Math.min(Math.max(sectionTop - getScrollOffset(), 0), getMaxScrollTop());
};

const getSectionElements = (
  sectionRefs: Record<SectionId, { current: HTMLElement | null }>,
): Record<SectionId, HTMLElement> | null => {
  const homeElement = sectionRefs.home.current;
  const projectsElement = sectionRefs.projects.current;
  const aboutElement = sectionRefs.about.current;
  const contactElement = sectionRefs.contact.current;

  if (homeElement === null || projectsElement === null || aboutElement === null || contactElement === null) {
    return null;
  }

  return {
    home: homeElement,
    projects: projectsElement,
    about: aboutElement,
    contact: contactElement,
  };
};

const getTrackedSection = (sectionElements: Record<SectionId, HTMLElement>): SectionId => {
  const activationLine = window.scrollY + getScrollOffset() + window.innerHeight * 0.2;
  const orderedSections = (Object.entries(sectionElements) as [SectionId, HTMLElement][])
    .sort(([, leftElement], [, rightElement]) => leftElement.offsetTop - rightElement.offsetTop);

  let currentSection: SectionId = 'home';

  orderedSections.forEach(([sectionId, sectionElement]) => {
    if (sectionElement.offsetTop <= activationLine) {
      currentSection = sectionId;
    }
  });

  return currentSection;
};

const revealSectionsBetween = (sectionElements: Record<SectionId, HTMLElement>, startTop: number, endTop: number): void => {
  const lowerBound = Math.min(startTop, endTop);
  const upperBound = Math.max(startTop, endTop);
  const orderedSections = (Object.entries(sectionElements) as [SectionId, HTMLElement][])
    .sort(([, leftElement], [, rightElement]) => leftElement.offsetTop - rightElement.offsetTop);

  orderedSections.forEach(([, sectionElement]) => {
    const sectionTop = getSectionTargetTop(sectionElement);

    if (sectionTop < lowerBound || sectionTop > upperBound) {
      return;
    }

    revealSection(sectionElement);
  });
};

export const LandingPage = ({
  content,
  navigate,
  activeSection,
  requestedSection,
  requestedSectionKey,
  onSectionRequest,
  onActiveSectionChange,
}: LandingPageProps): ReactElement => {
  const homeRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const hasHandledInitialSectionScrollRef = useRef(false);
  const pendingSectionRef = useRef<SectionId | null>(null);
  const initialActiveSectionRef = useRef(activeSection);

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
      if (element.id === initialActiveSectionRef.current) {
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
  }, [sectionRefs]);

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
    const targetElement = sectionRefs[requestedSection].current;
    const sectionElements = getSectionElements(sectionRefs);

    if (targetElement === null || sectionElements === null) {
      return;
    }

    revealSection(targetElement);

    const prefersReducedMotion = getPrefersReducedMotion();
    const shouldSmoothScroll = hasHandledInitialSectionScrollRef.current && !prefersReducedMotion;
    const targetTop = getSectionTargetTop(targetElement);
    const hasMeaningfulScrollDelta = Math.abs(window.scrollY - targetTop) > 2;

    if (hasMeaningfulScrollDelta && shouldSmoothScroll) {
      pendingSectionRef.current = requestedSection;
      onActiveSectionChange(requestedSection);
      revealSectionsBetween(sectionElements, window.scrollY, targetTop);
    } else if (!hasMeaningfulScrollDelta) {
      pendingSectionRef.current = null;
      onActiveSectionChange(requestedSection);
    }

    scrollToSection(targetElement, !shouldSmoothScroll);
    hasHandledInitialSectionScrollRef.current = true;
  }, [onActiveSectionChange, requestedSection, requestedSectionKey, sectionRefs]);

  useEffect(() => {
    const sectionElements = getSectionElements(sectionRefs);

    if (sectionElements === null) {
      return;
    }

    let frameId = 0;

    const syncActiveSection = (): void => {
      frameId = 0;
      const pendingSection = pendingSectionRef.current;

      if (pendingSection !== null) {
        const pendingElement = sectionElements[pendingSection];
        const pendingTargetTop = getSectionTargetTop(pendingElement);
        const hasReachedPendingTarget = Math.abs(window.scrollY - pendingTargetTop) <= 2;

        if (!hasReachedPendingTarget) {
          onActiveSectionChange(pendingSection);

          return;
        }

        pendingSectionRef.current = null;
      }

      onActiveSectionChange(getTrackedSection(sectionElements));
    };

    const requestSync = (): void => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(syncActiveSection);
    };

    requestSync();
    window.addEventListener('scroll', requestSync, { passive: true });
    window.addEventListener('resize', requestSync);

    return () => {
      window.removeEventListener('scroll', requestSync);
      window.removeEventListener('resize', requestSync);

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [onActiveSectionChange, sectionRefs]);

  return (
    <div className={st.root}>
      <section id="home" ref={homeRef} className={`${st.rootSection} ${st.homeSection} ${st.revealSection}`} data-reveal={revealVisibleValue}>
        <HomePage content={content} navigate={navigate} onSectionRequest={onSectionRequest} />
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
