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
  atlasMobileHero,
  atlasMobileImplementationDetails,
  atlasMobileKeyFeatures,
  atlasMobileScreenshots,
  atlasMobileTechStack,
} from "./AtlasMobilePage.data";

export const AtlasMobilePage = (): ReactElement => {
  const revealMotion = useSectionRevealMotion();

  return (
    <ProjectDetailPage hero={atlasMobileHero}>
      <ProjectScreenshotsSection screenshots={atlasMobileScreenshots} />

      <Section
        className={shared.featuresSection}
        contentClassName={shared.detailSectionContent}
        id="project-detail-features"
        title="Key Features"
      >
        <motion.div variants={revealMotion.itemVariants}>
          <DetailBulletList items={atlasMobileKeyFeatures} />
        </motion.div>
      </Section>

      <Section
        className={shared.architectureSection}
        contentClassName={shared.detailSectionContent}
        id="project-detail-architecture"
        title="Implementation Details"
      >
        <motion.div variants={revealMotion.itemVariants}>
          <DetailBulletList items={atlasMobileImplementationDetails} />
        </motion.div>
      </Section>

      <ProjectTechStackSection items={atlasMobileTechStack} />
    </ProjectDetailPage>
  );
};
