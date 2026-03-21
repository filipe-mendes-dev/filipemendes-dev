"use client";

import { type ReactElement, useRef } from "react";
import { motion } from "framer-motion";

import { useSectionRevealMotion } from "../../../shared/motion/useSectionRevealMotion";
import surface from "../PageSectionSurface/PageSectionSurface.module.css";
import type { LandingPageSectionProps } from "./Section.interfaces";
import st from "./Section.module.css";

const joinClassNames = (...classNames: (string | undefined)[]): string => {
  return classNames
    .filter((className): className is string => className !== undefined)
    .join(" ");
};

export const LandingPageSection = ({
  children,
  title,
  subtitle,
  className,
  contentClassName,
  id,
  isRevealEnabled,
  hasSeparator = true,
}: LandingPageSectionProps): ReactElement => {
  const revealMotion = useSectionRevealMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const isRevealManaged = isRevealEnabled !== undefined;
  const sectionClasses = joinClassNames(
    st.root,
    isRevealManaged ? surface.section : undefined,
    className
  );
  const contentClasses = joinClassNames(st.content, contentClassName);

  return (
    <motion.section
      className={sectionClasses}
      data-landing-section={id}
      id={id}
      initial={isRevealManaged ? "hidden" : false}
      ref={sectionRef}
      variants={isRevealManaged ? revealMotion.sectionVariants : undefined}
      viewport={revealMotion.viewport}
      whileInView={isRevealEnabled === true ? "visible" : "hidden"}
    >
      {isRevealManaged && hasSeparator && (
        <motion.div
          aria-hidden="true"
          className={surface.sectionDivider}
          variants={revealMotion.dividerVariants}
        />
      )}
      {(title !== undefined || subtitle !== undefined) && (
        <motion.header
          {...(isRevealManaged
            ? { variants: revealMotion.headerVariants }
            : undefined)}
          className={st.header}
        >
          {title !== undefined && (
            <motion.h2
              className={st.title}
              variants={
                isRevealManaged ? revealMotion.titleGroupVariants : undefined
              }
            >
              <motion.span
                className={st.titleText}
                variants={
                  isRevealManaged ? revealMotion.itemVariants : undefined
                }
              >
                {title}
              </motion.span>
              <motion.span
                aria-hidden="true"
                className={st.titleUnderline}
                variants={
                  isRevealManaged
                    ? revealMotion.titleUnderlineVariants
                    : undefined
                }
              />
            </motion.h2>
          )}
          {subtitle !== undefined && (
            <motion.p
              className={st.subtitle}
              variants={isRevealManaged ? revealMotion.itemVariants : undefined}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.header>
      )}
      <motion.div
        className={contentClasses}
        variants={isRevealManaged ? revealMotion.contentVariants : undefined}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};
