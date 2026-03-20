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
  acinWebPlatformArchitecture,
  acinWebPlatformHero,
  acinWebPlatformKeyFeatures,
  acinWebPlatformScreenshots,
  acinWebPlatformTechStack,
} from "./AcinWebPlatformPage.data";

export const AcinWebPlatformPage = (): ReactElement => {
  const revealMotion = useSectionRevealMotion();

  return (
    <ProjectDetailPage hero={acinWebPlatformHero}>
      <ProjectScreenshotsSection screenshots={acinWebPlatformScreenshots} />

      <Section
        className={shared.featuresSection}
        contentClassName={shared.detailSectionContent}
        id="project-detail-features"
        title="Key Features"
      >
        <motion.div variants={revealMotion.itemVariants}>
          <DetailBulletList items={acinWebPlatformKeyFeatures} />
        </motion.div>
      </Section>

      <Section
        className={shared.architectureSection}
        contentClassName={shared.detailSectionContent}
        id="project-detail-architecture"
        title="Architecture"
      >
        <motion.div variants={revealMotion.itemVariants}>
          <DetailBulletList items={acinWebPlatformArchitecture} />
        </motion.div>
      </Section>

      <ProjectTechStackSection items={acinWebPlatformTechStack} />

      <Section
        className={shared.featuresSection}
        contentClassName={shared.detailSectionContent}
        id="project-detail-features"
        title="Key Features"
      >
        <motion.div variants={revealMotion.itemVariants}>
          <DetailBulletList items={acinWebPlatformKeyFeatures} />
        </motion.div>
      </Section>

      <Section
        className={shared.architectureSection}
        contentClassName={shared.detailSectionContent}
        id="project-detail-architecture"
        title="Architecture"
      >
        <motion.div variants={revealMotion.itemVariants}>
          <DetailBulletList items={acinWebPlatformArchitecture} />
        </motion.div>
      </Section>

      <ProjectTechStackSection items={acinWebPlatformTechStack} />
    </ProjectDetailPage>
  );
};
