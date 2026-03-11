interface LandingPageMotionConfig {
  activeSectionViewportRatio: number;
  revealEntryThreshold: number;
  revealEntryViewportRatio: number;
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

export const landingPageRevealRootMargin = toViewportBottomRootMargin(landingPageMotion.revealEntryViewportRatio);
