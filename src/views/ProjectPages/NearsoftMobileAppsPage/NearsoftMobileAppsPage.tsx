"use client";

import type { ReactElement } from "react";
import { motion } from "framer-motion";

import { Section } from "../../../components/ui/Section";
import { useSectionRevealMotion } from "../../../shared/motion/useSectionRevealMotion";
import {
  DetailBulletList,
  ProjectDetailPage,
  ProjectScreenshotsSection,
  ProjectTechStackSection,
} from '../ProjectDetailPage';
import shared from '../ProjectDetailPage/ProjectDetailPage.module.css';
import {
  nearsoftMobileAppsArchitecture,
  nearsoftMobileAppsHero,
  nearsoftMobileAppsKeyFeatures,
  nearsoftMobileAppsScreenshots,
  nearsoftMobileAppsTechStack,
} from "./NearsoftMobileAppsPage.data";

export const NearsoftMobileAppsPage = (): ReactElement => {
  const revealMotion = useSectionRevealMotion();

  return (
    <ProjectDetailPage hero={nearsoftMobileAppsHero}>
      <ProjectScreenshotsSection screenshots={nearsoftMobileAppsScreenshots} />

      <Section
        className={shared.featuresSection}
        contentClassName={shared.detailSectionContent}
        id="project-detail-features"
        isRevealEnabled
        title="Key Features"
      >
        <motion.div variants={revealMotion.itemVariants}>
          <DetailBulletList items={nearsoftMobileAppsKeyFeatures} />
        </motion.div>
      </Section>

      <Section
        className={shared.architectureSection}
        contentClassName={shared.detailSectionContent}
        id="project-detail-architecture"
        isRevealEnabled
        title="Architecture"
      >
        <motion.div variants={revealMotion.itemVariants}>
          <DetailBulletList items={nearsoftMobileAppsArchitecture} />
        </motion.div>
      </Section>

      <ProjectTechStackSection items={nearsoftMobileAppsTechStack} />
    </ProjectDetailPage>
  );
};
