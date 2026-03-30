"use client";

import { useSyncExternalStore } from "react";

import {
  defaultThemePreference,
  getStoredThemePreference,
  setStoredThemePreference,
  subscribeToThemePreference,
  type ThemeName,
} from "./themePreferenceStore";

export interface ThemePreferenceResult {
  theme: ThemeName;
  themeToggleLabel: string;
  toggleTheme: () => void;
}

export const useThemePreference = (): ThemePreferenceResult => {
  const theme = useSyncExternalStore(
    subscribeToThemePreference,
    getStoredThemePreference,
    () => defaultThemePreference,
  );
  const themeToggleLabel =
    theme === "light" ? "Activate dark theme" : "Activate light theme";

  const toggleTheme = (): void => {
    const nextTheme: ThemeName = theme === "light" ? "dark" : "light";

    setStoredThemePreference(nextTheme);
  };

  return {
    theme,
    themeToggleLabel,
    toggleTheme,
  };
};
