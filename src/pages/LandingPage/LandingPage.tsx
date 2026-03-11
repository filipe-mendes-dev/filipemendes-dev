import { type ReactElement, useEffect, useLayoutEffect, useMemo, useRef } from 'react';

import { AboutPage } from '../AboutPage';
import { ContactPage } from '../ContactPage';
import { HomePage } from '../HomePage';
import { ProjectsPage } from '../ProjectsPage';
import type { LandingPageProps } from './LandingPage.interfaces';
import st from './LandingPage.module.css';
import type { SectionId } from '../../shared/navigation/sections';
import { landingPageMotion, landingPageRevealRootMargin } from '../../shared/theme/motion';

const revealVisibleValue = 'visible';
const revealPendingValue = 'pending';
const scrollSpacingVar = '--landing-scroll-spacing';

const getPrefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const getHeaderOffset = (): number => {
  const rootStyles = window.getComputedStyle(document.documentElement);
  const headerOffsetValue = Number.parseFloat(rootStyles.getPropertyValue('--header-offset'));
  const safeHeaderOffset = Number.isFinite(headerOffsetValue) ? headerOffsetValue : 72;

  return safeHeaderOffset;
};

const getActiveSectionOffset = (): number => {
  const rootStyles = window.getComputedStyle(document.documentElement);
  const scrollSpacingValue = Number.parseFloat(rootStyles.getPropertyValue(scrollSpacingVar));
  const safeScrollSpacing = Number.isFinite(scrollSpacingValue) ? scrollSpacingValue : 16;

  return getHeaderOffset() + safeScrollSpacing;
};

const getMaxScrollTop = (): number => {
  const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

  return Math.max(documentHeight - window.innerHeight, 0);
};

const revealSection = (sectionElement: HTMLElement): void => {
  sectionElement.dataset.landingReveal = revealVisibleValue;
};

const hideSectionUntilReveal = (sectionElement: HTMLElement): void => {
  sectionElement.dataset.landingReveal = revealPendingValue;
};

const revealHeading = (headingElement: HTMLElement): void => {
  headingElement.dataset.landingHeadingReveal = revealVisibleValue;
};

const hideHeadingUntilReveal = (headingElement: HTMLElement): void => {
  headingElement.dataset.landingHeadingReveal = revealPendingValue;
};

const scrollToSection = (sectionElement: HTMLElement, shouldReduceMotion: boolean): void => {
  const sectionTop = sectionElement.getBoundingClientRect().top + window.scrollY;
  const targetTop = Math.min(Math.max(sectionTop - getHeaderOffset(), 0), getMaxScrollTop());
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

  return Math.min(Math.max(sectionTop - getHeaderOffset(), 0), getMaxScrollTop());
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

interface LandingRevealGroup {
  content: HTMLDivElement | null;
  header: HTMLElement | null;
}

const revealGroup = (revealGroup: LandingRevealGroup): void => {
  if (revealGroup.header !== null) {
    revealHeading(revealGroup.header);
  }

  if (revealGroup.content !== null) {
    revealSection(revealGroup.content);
  }
};

const hideRevealGroupUntilReveal = (revealGroup: LandingRevealGroup): void => {
  if (revealGroup.header !== null) {
    hideHeadingUntilReveal(revealGroup.header);
  }

  if (revealGroup.content !== null) {
    hideSectionUntilReveal(revealGroup.content);
  }
};

const isTriggerWithinRevealEntry = (triggerElement: HTMLElement): boolean => {
  const { top } = triggerElement.getBoundingClientRect();

  return top < window.innerHeight * landingPageMotion.revealEntryViewportRatio;
};

const getTrackedSection = (sectionElements: Record<SectionId, HTMLElement>): SectionId => {
  const activationLine = window.scrollY + getActiveSectionOffset() + window.innerHeight * landingPageMotion.activeSectionViewportRatio;
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

const revealGroupsBetween = (
  sectionElements: Record<SectionId, HTMLElement>,
  revealRefs: Record<SectionId, { current: HTMLDivElement | null }>,
  headerRevealRefs: Record<SectionId, { current: HTMLElement | null } | null>,
  startTop: number,
  endTop: number,
  excludedSectionId?: SectionId,
): void => {
  const lowerBound = Math.min(startTop, endTop);
  const upperBound = Math.max(startTop, endTop);
  const orderedSections = (Object.entries(sectionElements) as [SectionId, HTMLElement][])
    .sort(([, leftElement], [, rightElement]) => leftElement.offsetTop - rightElement.offsetTop);

  orderedSections.forEach(([sectionId, sectionElement]) => {
    if (sectionId === excludedSectionId) {
      return;
    }

    const sectionTop = getSectionTargetTop(sectionElement);

    if (sectionTop < lowerBound || sectionTop > upperBound) {
      return;
    }

    revealGroup({
      content: revealRefs[sectionId].current,
      header: headerRevealRefs[sectionId]?.current ?? null,
    });
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
  const homeRevealRef = useRef<HTMLDivElement>(null);
  const projectsRevealRef = useRef<HTMLDivElement>(null);
  const aboutRevealRef = useRef<HTMLDivElement>(null);
  const contactRevealRef = useRef<HTMLDivElement>(null);
  const projectsHeaderRevealRef = useRef<HTMLElement>(null);
  const aboutHeaderRevealRef = useRef<HTMLElement>(null);
  const contactHeaderRevealRef = useRef<HTMLElement>(null);
  const hasHandledInitialSectionScrollRef = useRef(false);
  const pendingSectionRef = useRef<SectionId | null>(null);
  const pendingRevealSectionRef = useRef<SectionId | null>(null);
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

  const revealRefs = useMemo(
    () => ({
      home: homeRevealRef,
      projects: projectsRevealRef,
      about: aboutRevealRef,
      contact: contactRevealRef,
    }),
    [],
  );

  const headerRevealRefs = useMemo(
    () => ({
      home: null,
      projects: projectsHeaderRevealRef,
      about: aboutHeaderRevealRef,
      contact: contactHeaderRevealRef,
    }),
    [],
  );

  const revealTriggerRefs = useMemo(
    () => ({
      home: homeRef,
      projects: projectsHeaderRevealRef,
      about: aboutHeaderRevealRef,
      contact: contactHeaderRevealRef,
    }),
    [],
  );

  useLayoutEffect(() => {
    const revealGroups = (Object.entries(revealRefs) as [SectionId, { current: HTMLDivElement | null }][]).map(
      ([sectionId, revealRef]) => ({
        sectionId,
        revealGroup: {
          content: revealRef.current,
          header: headerRevealRefs[sectionId]?.current ?? null,
        },
      }),
    );

    if (revealGroups.every(({ revealGroup }) => revealGroup.content === null)) {
      return;
    }

    const prefersReducedMotion = getPrefersReducedMotion();

    if (prefersReducedMotion) {
      revealGroups.forEach(({ revealGroup: group }) => {
        revealGroup(group);
      });

      return;
    }

    revealGroups.forEach(({ sectionId, revealGroup: group }) => {
      const { content } = group;

      if (content === null) {
        return;
      }

      if (sectionId === initialActiveSectionRef.current) {
        revealGroup(group);

        return;
      }

      const triggerElement = revealTriggerRefs[sectionId].current;

      if (triggerElement !== null && isTriggerWithinRevealEntry(triggerElement)) {
        revealGroup(group);

        return;
      }

      hideRevealGroupUntilReveal(group);
    });
  }, [headerRevealRefs, revealRefs, revealTriggerRefs]);

  useEffect(() => {
    const revealEntries = (Object.entries(revealRefs) as [SectionId, { current: HTMLDivElement | null }][]).map(
      ([sectionId, revealRef]) => ({
        sectionId,
        content: revealRef.current,
        trigger: revealTriggerRefs[sectionId].current,
      }),
    );
    const revealElements = revealEntries
      .map(({ content }) => content)
      .filter((element): element is HTMLDivElement => element !== null);

    if (revealElements.length === 0 || getPrefersReducedMotion()) {
      return;
    }

    const observers = revealEntries.map(({ content, sectionId, trigger }) => {
      if (content?.dataset.landingReveal !== revealPendingValue) {
        return null;
      }

      if (trigger === null) {
        return null;
      }

      const observer = new IntersectionObserver(
        (entries, intersectionObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            revealGroup({
              content,
              header: headerRevealRefs[sectionId]?.current ?? null,
            });
            intersectionObserver.unobserve(entry.target);
          });
        },
        {
          threshold: landingPageMotion.revealEntryThreshold,
          rootMargin: landingPageRevealRootMargin,
        },
      );

      observer.observe(trigger);

      return observer;
    });

    return () => {
      observers.forEach((observer) => {
        observer?.disconnect();
      });
    };
  }, [headerRevealRefs, revealRefs, revealTriggerRefs]);

  useEffect(() => {
    const targetElement = sectionRefs[requestedSection].current;
    const targetRevealElement = revealRefs[requestedSection].current;
    const sectionElements = getSectionElements(sectionRefs);

    if (targetElement === null || targetRevealElement === null || sectionElements === null) {
      return;
    }

    const prefersReducedMotion = getPrefersReducedMotion();
    const shouldSmoothScroll = hasHandledInitialSectionScrollRef.current && !prefersReducedMotion;
    const targetTop = getSectionTargetTop(targetElement);
    const hasMeaningfulScrollDelta = Math.abs(window.scrollY - targetTop) > 2;

    if (hasMeaningfulScrollDelta && shouldSmoothScroll) {
      pendingSectionRef.current = requestedSection;
      pendingRevealSectionRef.current = requestedSection;
      onActiveSectionChange(requestedSection);
      revealGroupsBetween(sectionElements, revealRefs, headerRevealRefs, window.scrollY, targetTop, requestedSection);
    } else if (!hasMeaningfulScrollDelta) {
      pendingSectionRef.current = null;
      pendingRevealSectionRef.current = null;
      revealGroup({
        content: targetRevealElement,
        header: headerRevealRefs[requestedSection]?.current ?? null,
      });
      onActiveSectionChange(requestedSection);
    } else {
      pendingRevealSectionRef.current = null;
      revealGroup({
        content: targetRevealElement,
        header: headerRevealRefs[requestedSection]?.current ?? null,
      });
      onActiveSectionChange(requestedSection);
    }

    scrollToSection(targetElement, !shouldSmoothScroll);
    hasHandledInitialSectionScrollRef.current = true;
  }, [headerRevealRefs, onActiveSectionChange, requestedSection, requestedSectionKey, revealRefs, sectionRefs]);

  useEffect(() => {
    const sectionElements = getSectionElements(sectionRefs);

    if (sectionElements === null) {
      return;
    }

    let frameId = 0;

    const syncActiveSection = (): void => {
      frameId = 0;
      const pendingSection = pendingSectionRef.current;
      const pendingRevealSection = pendingRevealSectionRef.current;

      if (pendingRevealSection !== null) {
        const pendingRevealElement = sectionElements[pendingRevealSection];
        const pendingRevealTargetTop = getSectionTargetTop(pendingRevealElement);
        const revealDistance = Math.max(window.innerHeight * 0.18, 96);
        const isNearPendingRevealTarget = Math.abs(window.scrollY - pendingRevealTargetTop) <= revealDistance;

        if (isNearPendingRevealTarget) {
          revealGroup({
            content: revealRefs[pendingRevealSection].current,
            header: headerRevealRefs[pendingRevealSection]?.current ?? null,
          });
          pendingRevealSectionRef.current = null;
        }
      }

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
  }, [headerRevealRefs, onActiveSectionChange, revealRefs, sectionRefs]);

  return (
    <div className={st.root}>
      <section id="home" ref={homeRef} className={`${st.rootSection} ${st.homeSection}`}>
        <HomePage content={content} navigate={navigate} onSectionRequest={onSectionRequest} revealRef={homeRevealRef} />
      </section>
      <section
        id="projects"
        ref={projectsRef}
        className={`${st.rootSection} ${st.projectsSection}`}
      >
        <ProjectsPage content={content} navigate={navigate} revealRef={projectsRevealRef} headerRevealRef={projectsHeaderRevealRef} />
      </section>
      <section id="about" ref={aboutRef} className={`${st.rootSection} ${st.aboutSection}`}>
        <AboutPage content={content} revealRef={aboutRevealRef} headerRevealRef={aboutHeaderRevealRef} />
      </section>
      <section
        id="contact"
        ref={contactRef}
        className={`${st.rootSection} ${st.contactSection}`}
      >
        <ContactPage content={content} revealRef={contactRevealRef} headerRevealRef={contactHeaderRevealRef} />
      </section>
    </div>
  );
};
