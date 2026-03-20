"use client";

import {
  stagger,
  type UseInViewOptions,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  landingPageMotion,
  landingPageRevealRootMargin,
} from "../theme/motion";

type SectionRevealViewport = Required<
  Pick<UseInViewOptions, "amount" | "margin" | "once">
>;

export interface SectionRevealMotion {
  contentVariants: Variants;
  dividerVariants: Variants;
  headerVariants: Variants;
  itemVariants: Variants;
  nestedGroupVariants: Variants;
  sectionVariants: Variants;
  titleGroupVariants: Variants;
  titleUnderlineVariants: Variants;
  viewport: SectionRevealViewport;
}

const emphasizedEase = [0.22, 1, 0.36, 1] as const;
const standardEase = [0.2, 0.9, 0.24, 1] as const;

const dividerDurationMs = 840;
const itemDurationMs = 480;
const underlineDurationMs = 360;

const groupOffsetPx = 12;
const itemOffsetPx = 14;
const nestedOffsetPx = 10;
const hiddenUnderlineScale = 0.24;

const sectionStaggerMs = 180;
const headerStaggerMs = 120;
const titleStaggerMs = 120;
const contentStaggerMs = 90;
const nestedStaggerMs = 70;
const nestedStartDelayMs = 60;

const toSeconds = (durationMs: number): number => {
  return durationMs / 1000;
};

export const useSectionRevealMotion = (): SectionRevealMotion => {
  const isReducedMotionEnabled = useReducedMotion() ?? false;

  return {
    contentVariants: {
      hidden: {
        opacity: 0,
        y: isReducedMotionEnabled ? 0 : groupOffsetPx,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          delayChildren: isReducedMotionEnabled
            ? 0
            : stagger(toSeconds(contentStaggerMs)),
        },
      },
    },
    dividerVariants: {
      hidden: {
        opacity: 0,
        scaleX: isReducedMotionEnabled ? 1 : hiddenUnderlineScale,
      },
      visible: {
        opacity: 0.92,
        scaleX: 1,
        transition: {
          duration: isReducedMotionEnabled ? 0 : toSeconds(dividerDurationMs),
          ease: emphasizedEase,
        },
      },
    },
    headerVariants: {
      hidden: {
        opacity: 0,
        y: isReducedMotionEnabled ? 0 : groupOffsetPx,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          delayChildren: isReducedMotionEnabled
            ? 0
            : stagger(toSeconds(headerStaggerMs)),
        },
      },
    },
    itemVariants: {
      hidden: {
        opacity: 0,
        y: isReducedMotionEnabled ? 0 : itemOffsetPx,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: isReducedMotionEnabled ? 0 : toSeconds(itemDurationMs),
          ease: standardEase,
        },
      },
    },
    nestedGroupVariants: {
      hidden: {
        opacity: 0,
        y: isReducedMotionEnabled ? 0 : nestedOffsetPx,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: isReducedMotionEnabled ? 0 : toSeconds(itemDurationMs),
          ease: standardEase,
          delayChildren: isReducedMotionEnabled
            ? 0
            : stagger(toSeconds(nestedStaggerMs), {
                startDelay: toSeconds(nestedStartDelayMs),
              }),
        },
      },
    },
    sectionVariants: {
      hidden: {},
      visible: {
        transition: {
          when: "beforeChildren",
          delayChildren: isReducedMotionEnabled
            ? 0
            : stagger(toSeconds(sectionStaggerMs)),
        },
      },
    },
    titleGroupVariants: {
      hidden: {
        opacity: 1,
      },
      visible: {
        opacity: 1,
        transition: {
          when: "beforeChildren",
          delayChildren: isReducedMotionEnabled
            ? 0
            : stagger(toSeconds(titleStaggerMs)),
        },
      },
    },
    titleUnderlineVariants: {
      hidden: {
        opacity: 0,
        scaleX: isReducedMotionEnabled ? 1 : hiddenUnderlineScale,
      },
      visible: {
        opacity: 1,
        scaleX: 1,
        transition: {
          duration: isReducedMotionEnabled ? 0 : toSeconds(underlineDurationMs),
          ease: emphasizedEase,
        },
      },
    },
    viewport: {
      amount: landingPageMotion.revealEntryThreshold,
      margin: landingPageRevealRootMargin as NonNullable<
        UseInViewOptions["margin"]
      >,
      once: true,
    },
  };
};
