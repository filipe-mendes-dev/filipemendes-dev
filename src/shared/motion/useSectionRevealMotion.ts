"use client";

import {
  stagger,
  useReducedMotion,
  type Variants,
  type ViewportOptions,
} from "framer-motion";

import {
  landingPageMotion,
  landingPageRevealRootMargin,
  motionDurationMs,
  motionEase,
  motionOffsetPx,
  motionScale,
  motionStaggerMs,
} from "../theme/motion";

type SectionRevealViewport = Required<
  Pick<ViewportOptions, "amount" | "margin" | "once">
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

const dividerDurationMs = motionDurationMs.divider;
const itemDurationMs = motionDurationMs.slower;
const underlineDurationMs = motionDurationMs.slow;

const groupOffsetPx = motionOffsetPx.header;
const itemOffsetPx = motionOffsetPx.item;
const nestedOffsetPx = motionOffsetPx.nested;
const hiddenUnderlineScale = motionScale.collapsedReveal;

const sectionStaggerMs = motionStaggerMs.section;
const headerStaggerMs = motionStaggerMs.header;
const titleStaggerMs = motionStaggerMs.header;
const contentStaggerMs = motionStaggerMs.compact;
const nestedStaggerMs = motionStaggerMs.tight;
const nestedStartDelayMs = motionDurationMs.fast / 2;

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
          ease: motionEase.emphasized,
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
          ease: motionEase.standard,
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
          ease: motionEase.standard,
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
          ease: motionEase.emphasized,
        },
      },
    },
    viewport: {
      amount: landingPageMotion.revealEntryThreshold,
      margin: landingPageRevealRootMargin,
      once: true,
    },
  };
};
