"use client";

import { type ReactElement } from "react";
import { motion, stagger, type Variants } from "framer-motion";

import { LayoutContainer } from "../../../components/layout/LayoutContainer";
import { PageSectionSurface } from "../../../components/ui/PageSectionSurface";
import { motionStaggerMs } from "../../../shared/theme/motion";
import { ProjectDetailHero } from "./components/ProjectDetailHero";
import type { ProjectDetailPageProps } from "./ProjectDetailPage.interfaces";
import st from "./ProjectDetailPage.module.css";

export const ProjectDetailPage = ({
  hero,
  children,
}: ProjectDetailPageProps): ReactElement => {
  const sectionGroupVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: stagger(motionStaggerMs.section / 1000),
      },
    },
  };

  return (
    <PageSectionSurface className={st.root}>
      <LayoutContainer>
        <ProjectDetailHero hero={hero} />
        <motion.div
          animate="visible"
          initial="hidden"
          variants={sectionGroupVariants}
        >
          {children}
        </motion.div>
      </LayoutContainer>
    </PageSectionSurface>
  );
};
