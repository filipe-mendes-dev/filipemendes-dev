export interface HeaderMotionConfig {
  desktopNavStaggerSeconds: number;
  desktopThemeToggleDelaySteps: number;
  enterOffsetPx: number;
  hiddenScaleX: number;
  itemDurationSeconds: number;
  itemEase: readonly [number, number, number, number];
  menuBarDurationSeconds: number;
  menuBarEase: "easeIn";
  mobileMenuStaggerSeconds: number;
  themeToggleDurationSeconds: number;
}

export const headerMotionConfig: HeaderMotionConfig = {
  desktopNavStaggerSeconds: 0.08,
  desktopThemeToggleDelaySteps: 4,
  enterOffsetPx: 8,
  hiddenScaleX: 0.24,
  itemDurationSeconds: 0.28,
  itemEase: [0.2, 0.9, 0.24, 1],
  menuBarDurationSeconds: 0.12,
  menuBarEase: "easeIn",
  mobileMenuStaggerSeconds: 0.12,
  themeToggleDurationSeconds: 0.08,
};
