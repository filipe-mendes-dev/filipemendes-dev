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
} from "../ProjectDetailPage";
import shared from "../ProjectDetailPage/ProjectDetailPage.module.css";
import {
  arcTimerArchitecture,
  arcTimerHero,
  arcTimerKeyFeatures,
  arcTimerScreenshots,
  arcTimerTechStack,
} from "./ArcTimerPage.data";

export const ArcTimerPage = (): ReactElement => {
  const revealMotion = useSectionRevealMotion();

  return (
    <ProjectDetailPage hero={arcTimerHero}>
      <ProjectScreenshotsSection screenshots={arcTimerScreenshots} />

      <Section
        className={shared.featuresSection}
        contentClassName={shared.detailSectionContent}
        id="project-detail-features"
        title="Key Features"
      >
        <motion.div variants={revealMotion.itemVariants}>
          <DetailBulletList items={arcTimerKeyFeatures} />
        </motion.div>
      </Section>

      <Section
        className={shared.architectureSection}
        contentClassName={shared.detailSectionContent}
        id="project-detail-architecture"
        title="Architecture"
      >
        <motion.div variants={revealMotion.itemVariants}>
          <DetailBulletList items={arcTimerArchitecture} />
        </motion.div>
      </Section>

      <ProjectTechStackSection items={arcTimerTechStack} />
    </ProjectDetailPage>
  );
};
