"use client";

import {
  motion,
  stagger,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { type MouseEvent, type ReactElement, useEffect, useState } from "react";

import surface from "../../../../components/ui/PageSectionSurface/PageSectionSurface.module.css";
import { Section } from "../../../../components/ui/Section";
import type { HeroAction } from "../../../../data/site/landing-page/hero.data";
import type { SectionId } from "../../../../shared/navigation/sections";
import { requestLandingPageSection } from "../../navigation/landingPageNavigationStore";
import su from "../../../../shared/styles/utilities.module.css";
import { HeroTerminal } from "./HeroTerminal";
import { HeroWindow } from "./HeroWindow";
import type { HeroSectionProps } from "./HeroSection.interfaces";
import st from "./HeroSection.module.css";
import { heroMotionConfig } from "./heroMotion";

const getActionClassName = (action: HeroAction): string => {
  const variantClass =
    action.variant === "primary"
      ? su.buttonPrimary
      : action.variant === "secondary"
      ? su.buttonSecondary
      : su.textLink;

  return `${su.button} ${variantClass} ${st.heroActionLink}`;
};

const getActionHref = (action: HeroAction): string => {
  return action.href;
};

export const HeroSection = ({ content }: HeroSectionProps): ReactElement => {
  const isReducedMotionEnabled = useReducedMotion() ?? false;
  const [hasIntroFinished, setHasIntroFinished] = useState<boolean>(
    isReducedMotionEnabled
  );
  const isIntroComplete = isReducedMotionEnabled || hasIntroFinished;
  const isTerminalVisible = !isReducedMotionEnabled && !isIntroComplete;
  const isContentShown = isIntroComplete;

  useEffect(() => {
    if (!isReducedMotionEnabled) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setHasIntroFinished(true);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isReducedMotionEnabled]);

  const handleTerminalComplete = (): void => {
    setHasIntroFinished(true);
  };

  const handleSectionActionClick =
    (sectionTargetId: SectionId | undefined) =>
    (event: MouseEvent<HTMLAnchorElement>): void => {
      if (sectionTargetId === undefined) {
        return;
      }

      event.preventDefault();
      requestLandingPageSection(sectionTargetId);
    };

  const revealItemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: isReducedMotionEnabled
          ? 0
          : heroMotionConfig.contentEnter / 1000,
        ease: "easeOut",
      },
    },
  };

  const copyVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: isReducedMotionEnabled
          ? 0
          : stagger(heroMotionConfig.contentStagger / 1000),
      },
    },
  };
  const mediaVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -20,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: isReducedMotionEnabled
          ? 0
          : heroMotionConfig.mediaEnter / 1000,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className={st.root}>
      <Section
        className={`${surface.section} ${st.heroSection}`}
        hasSeparator={false}
        id="home"
      >
        <div className={st.heroWindowStage}>
          <HeroWindow isContentVisible={isContentShown}>
            {isTerminalVisible ? (
              <HeroTerminal onComplete={handleTerminalComplete} />
            ) : null}
            <div className={st.heroGrid}>
              <motion.div
                className={st.heroMediaColumn}
                data-hero-media="true"
                initial="hidden"
                animate={isContentShown ? "visible" : "hidden"}
                variants={mediaVariants}
              >
                <figure className={st.heroPhotoFrame}>
                  <img
                    src={content.photoUrl}
                    alt={content.photoAlt}
                    srcSet={content.photoSrcSet}
                    sizes={content.photoSizes}
                    className={st.heroPhoto}
                  />
                </figure>
              </motion.div>
              <motion.div
                className={st.heroCopy}
                initial="hidden"
                animate={isContentShown ? "visible" : "hidden"}
                variants={copyVariants}
              >
                <motion.p
                  data-hero-copy-item="true"
                  variants={revealItemVariants}
                >
                  <span className={st.heroKicker}>{content.kicker}</span>
                </motion.p>
                <motion.h1
                  className={st.heroTitle}
                  data-hero-copy-item="true"
                  variants={revealItemVariants}
                >
                  {content.name}
                </motion.h1>
                <motion.div
                  className={st.heroBody}
                  data-hero-copy-item="true"
                  variants={revealItemVariants}
                >
                  <p className={st.heroRole}>{content.headline}</p>
                  <p className={st.heroSummary}>{content.supportingText}</p>
                </motion.div>
                <motion.p
                  className={st.heroNow}
                  data-hero-copy-item="true"
                  variants={revealItemVariants}
                >
                  {content.status}
                </motion.p>
                <motion.div
                  className={st.heroActions}
                  data-hero-copy-item="true"
                  variants={revealItemVariants}
                >
                  {content.actions.map((action) => {
                    return (
                      <a
                        key={action.label}
                        href={getActionHref(action)}
                        className={getActionClassName(action)}
                        onClick={
                          action.sectionId === undefined
                            ? undefined
                            : handleSectionActionClick(action.sectionId)
                        }
                      >
                        {action.label}
                      </a>
                    );
                  })}
                </motion.div>
              </motion.div>
            </div>
          </HeroWindow>
        </div>
      </Section>
    </div>
  );
};
