"use client";

import { type ReactElement, useEffect } from "react";

import { startThemePreferenceSync } from "./themePreferenceStore";

export const ThemePreferenceSync = (): ReactElement | null => {
  useEffect(() => {
    return startThemePreferenceSync();
  }, []);

  return null;
};
