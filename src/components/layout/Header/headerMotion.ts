import {
  motionDurationMs,
  motionEase,
  motionOffsetPx,
  motionScale,
  motionStaggerMs,
} from "../../../shared/theme/motion";

interface HeaderMotionConfig {
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
  desktopNavStaggerSeconds: motionStaggerMs.tight / 1000,
  desktopThemeToggleDelaySteps: 4,
  enterOffsetPx: motionOffsetPx.menu,
  hiddenScaleX: motionScale.collapsedReveal,
  itemDurationSeconds:
    (motionDurationMs.themeToggle + motionDurationMs.medium) / 1000,
  itemEase: motionEase.standard,
  menuBarDurationSeconds: motionDurationMs.fast / 1000,
  menuBarEase: "easeIn",
  mobileMenuStaggerSeconds: motionStaggerMs.header / 1000,
  themeToggleDurationSeconds: motionDurationMs.themeToggle / 1000,
};
