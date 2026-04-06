"use client";

import type { ReactElement } from "react";
import { motion } from "framer-motion";

import { Section } from "../../../components/ui/Section";
import { useSectionRevealMotion } from "../../../shared/motion/useSectionRevealMotion";
import {
  DetailBulletList,
  ProjectDetailPage,
  ProjectTechStackSection,
} from "../ProjectDetailPage";
import shared from "../ProjectDetailPage/ProjectDetailPage.module.css";
import {
  forgeWebHero,
  forgeWebImplementationDetails,
  forgeWebKeyFeatures,
  forgeWebTechStack,
} from "./ForgeWebPage.data";

export const ForgeWebPage = (): ReactElement => {
  const revealMotion = useSectionRevealMotion();

  return (
    <ProjectDetailPage hero={forgeWebHero}>
      <Section
        className={shared.featuresSection}
        contentClassName={shared.detailSectionContent}
        id="project-detail-features"
        title="Key Features"
      >
        <motion.div variants={revealMotion.itemVariants}>
          <DetailBulletList items={forgeWebKeyFeatures} />
        </motion.div>
      </Section>

      <Section
        className={shared.architectureSection}
        contentClassName={shared.detailSectionContent}
        id="project-detail-architecture"
        title="Implementation Details"
      >
        <motion.div variants={revealMotion.itemVariants}>
          <DetailBulletList items={forgeWebImplementationDetails} />
        </motion.div>
      </Section>

      <ProjectTechStackSection items={forgeWebTechStack} />
    </ProjectDetailPage>
  );
};
