"use client";

import Link from "next/link";
import { type ReactElement } from "react";
import {
  motion,
  stagger,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { HeaderNavList } from "./HeaderNavList";
import type { HeaderProps } from "./Header.interfaces";
import { headerMotionConfig } from "./headerMotion";
import st from "./Header.module.css";
import { ThemeToggle } from "./ThemeToggle";
import { useHeaderController } from "./useHeaderController";
import { heroIntroRevealGateDelayMs } from "../../../views/LandingPage/sections/HeroSection/heroMotion";

export const Header = ({
  siteTitle,
  navigation,
}: HeaderProps): ReactElement => {
  const {
    desktopNavItems,
    handleHomeNavigation,
    headerRef,
    homeLinkAriaCurrent,
    isLandingPage,
    isMobileMenuOpen,
    mobileMenuLabel,
    mobileNavId,
    mobileNavItems,
    mobileNavRef,
    theme,
    themeToggleLabel,
    toggleMobileMenu,
    toggleTheme,
  } = useHeaderController({
    navigation,
  });
  const isReducedMotionEnabled = useReducedMotion() ?? false;
  const headerRevealDelaySeconds =
    isLandingPage && !isReducedMotionEnabled
      ? heroIntroRevealGateDelayMs / 1000
      : 0;
  const desktopThemeToggleDelaySeconds =
    headerRevealDelaySeconds +
    headerMotionConfig.desktopNavStaggerSeconds *
      headerMotionConfig.desktopThemeToggleDelaySteps;
  const desktopNavVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: isReducedMotionEnabled
          ? 0
          : stagger(headerMotionConfig.desktopNavStaggerSeconds, {
              startDelay: headerRevealDelaySeconds,
            }),
      },
    },
  };
  const desktopNavItemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: isReducedMotionEnabled ? 0 : -headerMotionConfig.enterOffsetPx,
      pointerEvents: "none",
    },
    visible: {
      opacity: 1,
      x: 0,
      pointerEvents: "auto",
      transition: {
        duration: isReducedMotionEnabled
          ? 0
          : headerMotionConfig.itemDurationSeconds,
        ease: headerMotionConfig.itemEase,
      },
    },
  };

  const desktopThemeToggleVariants: Variants = {
    hidden: {
      opacity: 0,
      pointerEvents: "none",
      x: isReducedMotionEnabled ? 0 : -headerMotionConfig.enterOffsetPx,
    },
    visible: {
      opacity: 1,
      x: 0,
      pointerEvents: "auto",
      transition: {
        duration: isReducedMotionEnabled
          ? 0
          : headerMotionConfig.themeToggleDurationSeconds,
        delay: desktopThemeToggleDelaySeconds,
        ease: headerMotionConfig.itemEase,
      },
    },
  };

  const menuToggleVariants: Variants = {
    hidden: {
      pointerEvents: "none",
    },
    visible: {
      pointerEvents: "auto",
      transition: {
        delayChildren: isReducedMotionEnabled
          ? 0
          : stagger(headerMotionConfig.mobileMenuStaggerSeconds, {
              startDelay: headerRevealDelaySeconds,
              from: "last",
            }),
      },
    },
  };

  const spanVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -headerMotionConfig.enterOffsetPx,
      scaleX: headerMotionConfig.hiddenScaleX,
      pointerEvents: "none",
    },
    visible: {
      y: 0,
      opacity: 1,
      scaleX: 1,
      pointerEvents: "auto",
      transition: {
        duration: isReducedMotionEnabled
          ? 0
          : headerMotionConfig.menuBarDurationSeconds,
        ease: headerMotionConfig.menuBarEase,
      },
    },
  };

  const headerRevealInitial = isLandingPage ? "hidden" : false;
  const headerRevealAnimate = isLandingPage ? "visible" : undefined;

  return (
    <header ref={headerRef} className={`${st.root} ${st.siteHeader}`}>
      <div className={st.headerBar}>
        <div className={st.headerInner}>
          <Link
            href="/"
            className={st.siteMark}
            onClick={handleHomeNavigation}
            {...homeLinkAriaCurrent}
          >
            <span className={st.siteMarkPrompt} aria-hidden="true">
              {"</>"}
            </span>
            <span className={st.siteMarkText}>filipemendes.dev</span>
            <span className={st.siteMarkSrOnly}>{siteTitle}</span>
          </Link>

          <nav aria-label="Primary" className={st.desktopNav}>
            <motion.ul
              animate={headerRevealAnimate}
              className={`${st.siteNavList} ${st.desktopSiteNavList}`}
              initial={headerRevealInitial}
              variants={desktopNavVariants}
            >
              {desktopNavItems.map((item) => {
                const linkAriaCurrent = item.isActive
                  ? { "aria-current": "page" as const }
                  : {};

                return (
                  <motion.li key={item.key} variants={desktopNavItemVariants}>
                    <Link
                      href={item.href}
                      className={st.siteNavLink}
                      onClick={item.onClick}
                      {...linkAriaCurrent}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </nav>

          <motion.div
            className={st.desktopThemeToggle}
            variants={desktopThemeToggleVariants}
            initial={headerRevealInitial}
            animate={headerRevealAnimate}
          >
            <ThemeToggle
              theme={theme}
              label={themeToggleLabel}
              onToggle={toggleTheme}
            />
          </motion.div>

          <motion.button
            animate={headerRevealAnimate}
            type="button"
            className={st.menuToggle}
            aria-expanded={isMobileMenuOpen}
            aria-controls={mobileNavId}
            aria-label={mobileMenuLabel}
            initial={headerRevealInitial}
            onClick={toggleMobileMenu}
          >
            <motion.span
              className={st.menuToggleBars}
              aria-hidden="true"
              variants={menuToggleVariants}
            >
              <motion.span variants={spanVariants} />
              <motion.span variants={spanVariants} />
              <motion.span variants={spanVariants} />
            </motion.span>
          </motion.button>
        </div>
      </div>

      <nav
        ref={mobileNavRef}
        id={mobileNavId}
        aria-label="Primary"
        className={`${st.headerNav} ${
          isMobileMenuOpen ? st.headerNavOpen : ""
        }`}
      >
        <div className={st.headerNavInner}>
          <HeaderNavList
            items={mobileNavItems}
            listClassName={st.siteNavList}
            linkClassName={st.siteNavLink}
          />

          <div className={st.mobileMenuFooter}>
            <span className={st.mobileMenuLabel}>Theme</span>
            <ThemeToggle
              theme={theme}
              label={themeToggleLabel}
              onToggle={toggleTheme}
              className={st.mobileThemeToggle}
              size="compact"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};
