"use client";

import type { ReactElement } from "react";

import { PageSectionSurface } from "../../components/ui/PageSectionSurface";
import { portfolio } from "../../data/portfolio";
import { LandingPageNavigationBinder } from "./navigation/LandingPageNavigationBinder";
import { useLandingPageRevealEnabled } from "./useLandingPageRevealEnabled";
import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import st from "./LandingPage.module.css";

const LandingPage = (): ReactElement => {
  const content = portfolio;
  const isRevealEnabled = useLandingPageRevealEnabled();

  return (
    <PageSectionSurface className={st.root}>
      <LandingPageNavigationBinder />
      <HeroSection content={content} />
      <ProjectsSection content={content} isRevealEnabled={isRevealEnabled} />
      <AboutSection content={content} isRevealEnabled={isRevealEnabled} />
      <ContactSection content={content} isRevealEnabled={isRevealEnabled} />
    </PageSectionSurface>
  );
};

export default LandingPage;
