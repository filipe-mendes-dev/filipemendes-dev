"use client";

import type { ReactElement } from "react";

import { PageSectionSurface } from "../../components/ui/PageSectionSurface";
import { aboutData } from "../../data/site/landing-page/about.data";
import { contactData } from "../../data/site/landing-page/contact.data";
import { heroData } from "../../data/site/landing-page/hero.data";
import { landingProjectsData } from "../../data/site/landing-page/projects.data";
import { LandingPageNavigationBinder } from "./navigation/LandingPageNavigationBinder";
import { useLandingPageRevealEnabled } from "./useLandingPageRevealEnabled";
import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import st from "./LandingPage.module.css";

const LandingPage = (): ReactElement => {
  const isRevealEnabled = useLandingPageRevealEnabled();

  return (
    <PageSectionSurface className={st.root}>
      <LandingPageNavigationBinder />
      <HeroSection content={heroData} />
      <ProjectsSection content={landingProjectsData} isRevealEnabled={isRevealEnabled} />
      <AboutSection content={aboutData} isRevealEnabled={isRevealEnabled} />
      <ContactSection content={contactData} isRevealEnabled={isRevealEnabled} />
    </PageSectionSurface>
  );
};

export default LandingPage;
