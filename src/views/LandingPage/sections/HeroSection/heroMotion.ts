import { motionDurationMs, motionEase } from "../../../../shared/theme/motion";

interface HeroMotionConfig {
  afterWindow: number;
  terminalEnter: number;
  beforeTyping: number;
  typing: number;
  beforeExecute: number;
  execute: number;
  terminalExit: number;
  beforeExpand: number;
  grow: number;
  contentDelayFromGrowStart: number;
  contentStagger: number;
  contentEnter: number;
  mediaEnter: number;
}

export const heroMotionConfig: HeroMotionConfig = {
  afterWindow: motionDurationMs.fast,
  terminalEnter: motionDurationMs.medium,
  beforeTyping: motionDurationMs.slow,
  typing: 600,
  beforeExecute: 0,
  execute: 600,
  terminalExit: motionDurationMs.medium,
  beforeExpand: 0,
  grow: motionDurationMs.slower,
  contentDelayFromGrowStart: 0,
  contentStagger: motionDurationMs.fast,
  contentEnter: motionDurationMs.slow,
  mediaEnter: motionDurationMs.slow,
};

export const heroIntroRevealGateDelayMs =
  heroMotionConfig.beforeTyping +
  heroMotionConfig.typing +
  heroMotionConfig.beforeExecute +
  heroMotionConfig.execute +
  heroMotionConfig.terminalExit +
  Math.max(
    heroMotionConfig.grow,
    heroMotionConfig.mediaEnter,
    heroMotionConfig.contentDelayFromGrowStart +
      heroMotionConfig.contentEnter +
      heroMotionConfig.contentStagger
  );

export const emphasizedEase = motionEase.heroEmphasized;

const COLLAPSED_HEIGHT_MIN_REM = 6.75;
const COLLAPSED_HEIGHT_MAX_REM = 8.75;
const COLLAPSED_HEIGHT_VIEWPORT_RATIO = 0.12;
export const HERO_WINDOW_COLLAPSED_FALLBACK_PX = 160;

const getRootFontSize = (): number => {
  if (typeof window === "undefined") {
    return 16;
  }

  const computedFontSize = window.getComputedStyle(
    document.documentElement
  ).fontSize;
  const parsedFontSize = Number.parseFloat(computedFontSize);

  return Number.isNaN(parsedFontSize) ? 16 : parsedFontSize;
};

export const getCollapsedHeight = (): number => {
  if (typeof window === "undefined") {
    return HERO_WINDOW_COLLAPSED_FALLBACK_PX;
  }

  const rootFontSize = getRootFontSize();
  const minHeight = COLLAPSED_HEIGHT_MIN_REM * rootFontSize;
  const maxHeight = COLLAPSED_HEIGHT_MAX_REM * rootFontSize;
  const preferredHeight = window.innerWidth * COLLAPSED_HEIGHT_VIEWPORT_RATIO;

  return Math.min(Math.max(preferredHeight, minHeight), maxHeight);
};

export const wait = (durationMs: number): Promise<void> =>
  new Promise((resolve) => {
    window.setTimeout(resolve, durationMs);
  });
