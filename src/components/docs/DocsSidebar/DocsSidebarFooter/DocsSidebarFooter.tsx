"use client";

import { type ReactElement, useState, useSyncExternalStore } from "react";

import { ThemeToggle } from "../../../layout/Header/ThemeToggle";
import {
  defaultThemePreference,
  getStoredThemePreference,
  setStoredThemePreference,
  type ThemeName,
} from "../../../../shared/theme/themePreference";
import type { DocsSidebarFooterProps } from "./DocsSidebarFooter.interfaces";
import st from "./DocsSidebarFooter.module.css";

const subscribeToThemePreference = (): (() => void) => {
  return () => undefined;
};

export const DocsSidebarFooter = ({
  descriptor,
  isExpanded,
  siteTitle,
}: DocsSidebarFooterProps): ReactElement => {
  const currentYear = new Date().getFullYear();
  const [themeOverride, setThemeOverride] = useState<ThemeName | null>(null);
  const storedTheme = useSyncExternalStore(
    subscribeToThemePreference,
    getStoredThemePreference,
    () => defaultThemePreference
  );
  const theme = themeOverride ?? storedTheme;
  const themeToggleLabel =
    theme === "light" ? "Activate dark theme" : "Activate light theme";

  const handleToggleTheme = (): void => {
    const nextTheme: ThemeName = theme === "light" ? "dark" : "light";

    setStoredThemePreference(nextTheme);
    setThemeOverride(nextTheme);
  };

  return (
    <div
      className={`${st.root} ${
        isExpanded ? st.rootExpanded : st.rootCollapsed
      }`}
    >
      <ThemeToggle
        className={st.themeToggle}
        label={themeToggleLabel}
        onToggle={handleToggleTheme}
        size="compact"
        theme={theme}
      />

      <p className={st.tag}>[ Docs.system ]</p>

      {isExpanded && (
        <>
          <p className={st.name}>{siteTitle}</p>
          <p className={st.descriptor}>{descriptor}</p>
          <p className={st.meta}>
            <span>Built with Next.js</span>
            <span aria-hidden="true">•</span>
            <span>© {currentYear}</span>
          </p>
        </>
      )}
    </div>
  );
};
