"use client";

import { type ReactElement, useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";

import { useSectionRevealMotion } from "../../../shared/motion/useSectionRevealMotion";
import surface from "../PageSectionSurface/PageSectionSurface.module.css";
import type { SectionProps } from "./Section.interfaces";
import st from "./Section.module.css";

const joinClassNames = (...classNames: (string | undefined)[]): string => {
  return classNames
    .filter((className): className is string => className !== undefined)
    .join(" ");
};

export const Section = ({
  children,
  title,
  subtitle,
  className,
  contentClassName,
  id,
}: SectionProps): ReactElement => {
  const revealMotion = useSectionRevealMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const initialViewportFrameRef = useRef<number | null>(null);
  const hasResolvedInitialViewportRef = useRef(false);
  const [shouldStartHidden, setShouldStartHidden] = useState(false);
  const sectionClasses = joinClassNames(st.root, surface.section, className);
  const contentClasses = joinClassNames(st.content, contentClassName);
  const handleSectionRef = useCallback((node: HTMLElement | null): void => {
    sectionRef.current = node;

    if (initialViewportFrameRef.current !== null) {
      window.cancelAnimationFrame(initialViewportFrameRef.current);
      initialViewportFrameRef.current = null;
    }

    if (node === null || hasResolvedInitialViewportRef.current) {
      return;
    }

    initialViewportFrameRef.current = window.requestAnimationFrame(() => {
      if (
        sectionRef.current === null ||
        hasResolvedInitialViewportRef.current
      ) {
        return;
      }

      hasResolvedInitialViewportRef.current = true;

      const rect = sectionRef.current.getBoundingClientRect();
      const isInitiallyVisible =
        rect.top < window.innerHeight && rect.bottom > 0;

      if (!isInitiallyVisible) {
        setShouldStartHidden(true);
      }
    });
  }, []);

  return (
    <motion.section
      // These local animate props intentionally reset the initial inherited
      // variant ownership from the page stagger so offscreen sections can take
      // control again for their later whileInView reveal.
      animate={shouldStartHidden ? "hidden" : undefined}
      className={sectionClasses}
      data-landing-section={id}
      id={id}
      viewport={shouldStartHidden ? revealMotion.viewport : undefined}
      ref={handleSectionRef}
      variants={revealMotion.sectionVariants}
      whileInView={shouldStartHidden ? "visible" : undefined}
    >
      <motion.div
        aria-hidden="true"
        className={surface.sectionDivider}
        variants={revealMotion.dividerVariants}
      />

      {(title !== undefined || subtitle !== undefined) && (
        <motion.header
          animate={shouldStartHidden ? "hidden" : undefined}
          variants={revealMotion.headerVariants}
          className={st.header}
        >
          {title !== undefined && (
            <motion.h2
              animate={shouldStartHidden ? "hidden" : undefined}
              className={st.title}
              variants={revealMotion.titleGroupVariants}
            >
              <motion.span
                animate={shouldStartHidden ? "hidden" : undefined}
                className={st.titleText}
                variants={revealMotion.itemVariants}
              >
                {title}
              </motion.span>
              <motion.span
                animate={shouldStartHidden ? "hidden" : undefined}
                aria-hidden="true"
                className={st.titleUnderline}
                variants={revealMotion.titleUnderlineVariants}
              />
            </motion.h2>
          )}
          {subtitle !== undefined && (
            <motion.p
              animate={shouldStartHidden ? "hidden" : undefined}
              className={st.subtitle}
              variants={revealMotion.itemVariants}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.header>
      )}
      <motion.div
        animate={shouldStartHidden ? "hidden" : undefined}
        className={contentClasses}
        variants={revealMotion.contentVariants}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};
