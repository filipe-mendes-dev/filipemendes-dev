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
  inovInfraredDetectionArchitecture,
  inovInfraredDetectionHero,
  inovInfraredDetectionKeyFeatures,
  inovInfraredDetectionScreenshots,
  inovInfraredDetectionTechStack,
} from "./InovInfraredDetectionPage.data";

export const InovInfraredDetectionPage = (): ReactElement => {
  const revealMotion = useSectionRevealMotion();

  return (
    <ProjectDetailPage hero={inovInfraredDetectionHero}>
      <ProjectScreenshotsSection
        screenshots={inovInfraredDetectionScreenshots}
      />

      <Section
        className={shared.featuresSection}
        contentClassName={shared.detailSectionContent}
        id="project-detail-features"
        isRevealEnabled
        title="Key Features"
      >
        <motion.div variants={revealMotion.itemVariants}>
          <DetailBulletList items={inovInfraredDetectionKeyFeatures} />
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
          <DetailBulletList items={inovInfraredDetectionArchitecture} />
        </motion.div>
      </Section>

      <ProjectTechStackSection items={inovInfraredDetectionTechStack} />
    </ProjectDetailPage>
  );
};
