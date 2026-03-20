interface LandingPageMotionConfig {
  activeSectionViewportRatio: number;
  revealEntryThreshold: number;
  revealEntryViewportRatio: number;
}

export interface MotionDurationConfig {
  divider: number;
  fast: number;
  medium: number;
  slow: number;
  slower: number;
  themeToggle: number;
}

export interface MotionEaseConfig {
  emphasized: readonly [number, number, number, number];
  heroEmphasized: readonly [number, number, number, number];
  standard: readonly [number, number, number, number];
}

export interface MotionOffsetConfig {
  header: number;
  item: number;
  menu: number;
  nested: number;
}

export interface MotionScaleConfig {
  collapsedReveal: number;
}

export interface MotionStaggerConfig {
  compact: number;
  header: number;
  relaxed: number;
  section: number;
  tight: number;
}

const formatPercentageValue = (value: number): string => {
  const roundedValue = Number.isInteger(value) ? value.toString() : value.toFixed(2);

  return roundedValue.replace(/\.?0+$/, '');
};

const toViewportBottomRootMargin = (viewportRatio: number): string => {
  const bottomViewportPercentage = (1 - viewportRatio) * 100;

  return `0px 0px -${formatPercentageValue(bottomViewportPercentage)}% 0px`;
};

export const landingPageMotion: LandingPageMotionConfig = {
  activeSectionViewportRatio: 0.2,
  revealEntryThreshold: 0.01,
  revealEntryViewportRatio: 0.65,
};

export const motionDurationMs: MotionDurationConfig = {
  divider: 840,
  fast: 120,
  medium: 240,
  slow: 360,
  slower: 480,
  themeToggle: 80,
};

export const motionEase: MotionEaseConfig = {
  emphasized: [0.22, 1, 0.36, 1],
  heroEmphasized: [0.16, 1, 0.3, 1],
  standard: [0.2, 0.9, 0.24, 1],
};

export const motionOffsetPx: MotionOffsetConfig = {
  header: 12,
  item: 14,
  menu: 8,
  nested: 10,
};

export const motionScale: MotionScaleConfig = {
  collapsedReveal: 0.24,
};

export const motionStaggerMs: MotionStaggerConfig = {
  compact: 90,
  header: 120,
  relaxed: 180,
  section: 180,
  tight: 70,
};

export const landingPageRevealRootMargin = toViewportBottomRootMargin(
  landingPageMotion.revealEntryViewportRatio,
);
