"use client";

import {
  type ReactElement,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

import { DocsSidebar } from "../DocsSidebar";
import type { DocsShellProps } from "./DocsShell.interfaces";
import st from "./DocsShell.module.css";

const mobileMediaQuery = "(max-width: 63.99rem)";

const subscribeToViewport = (onStoreChange: () => void): (() => void) => {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const mediaQueryList = window.matchMedia(mobileMediaQuery);
  mediaQueryList.addEventListener("change", onStoreChange);

  return () => {
    mediaQueryList.removeEventListener("change", onStoreChange);
  };
};

const getIsDesktopSnapshot = (): boolean => {
  if (typeof window === "undefined") {
    return true;
  }

  return !window.matchMedia(mobileMediaQuery).matches;
};

export const DocsShell = ({
  children,
  descriptor,
  featuredDocs,
  projects,
  siteTitle,
}: DocsShellProps): ReactElement => {
  const isDesktop = useSyncExternalStore(
    subscribeToViewport,
    getIsDesktopSnapshot,
    () => true
  );
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isExpanded = isDesktop ? isDesktopExpanded : isMobileOpen;

  useEffect(() => {
    if (isDesktop) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = isMobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isDesktop, isMobileOpen]);

  const handleToggleExpanded = (): void => {
    if (isDesktop) {
      setIsDesktopExpanded((currentValue) => !currentValue);
      return;
    }

    setIsMobileOpen((currentValue) => !currentValue);
  };

  const handleClose = (): void => {
    if (isDesktop) {
      return;
    }

    setIsMobileOpen(false);
  };

  return (
    <div
      className={`${st.root} ${
        isExpanded ? st.rootExpanded : st.rootCollapsed
      }`}
    >
      <DocsSidebar
        descriptor={descriptor}
        featuredDocs={featuredDocs}
        isExpanded={isExpanded}
        onClose={handleClose}
        projects={projects}
        siteTitle={siteTitle}
        onToggleExpanded={handleToggleExpanded}
      />
      <button
        type="button"
        className={`${st.backdrop} ${isExpanded ? st.backdropVisible : ""}`}
        aria-label="Close docs navigation"
        onClick={handleClose}
      />
      <main className={st.content}>
        <div className={st.contentInner}>{children}</div>
      </main>
    </div>
  );
};
