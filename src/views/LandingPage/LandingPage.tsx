"use client";

import type { ReactElement } from "react";

import { PageSectionSurface } from "../../components/ui/PageSectionSurface";
import { getLandingPageViewModel } from "../../data/view-models/landing-page.view-model";
import { LandingPageNavigationBinder } from "./navigation/LandingPageNavigationBinder";
import { useLandingPageRevealEnabled } from "./useLandingPageRevealEnabled";
import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import st from "./LandingPage.module.css";

const landingPageViewModel = getLandingPageViewModel();

const LandingPage = (): ReactElement => {
  const { about, contact, hero, projects } = landingPageViewModel;
  const isRevealEnabled = useLandingPageRevealEnabled();

  return (
    <PageSectionSurface className={st.root}>
      <LandingPageNavigationBinder />
      <HeroSection content={hero} />
      <ProjectsSection content={projects} isRevealEnabled={isRevealEnabled} />
      <AboutSection content={about} isRevealEnabled={isRevealEnabled} />
      <ContactSection content={contact} isRevealEnabled={isRevealEnabled} />
    </PageSectionSurface>
  );
};

export default LandingPage;
