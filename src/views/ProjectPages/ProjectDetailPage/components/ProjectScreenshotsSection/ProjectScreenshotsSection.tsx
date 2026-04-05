"use client";

import { type ReactElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Section } from "../../../../../components/ui/Section";
import { useSectionRevealMotion } from "../../../../../shared/motion/useSectionRevealMotion";
import type { ProjectScreenshotsSectionProps } from "./ProjectScreenshotsSection.interfaces";
import { ProjectScreenshotsCarousel } from "./ProjectScreenshotsCarousel";
import st from "./ProjectScreenshotsSection.module.css";

const ChevronBackIcon = (): ReactElement => {
  return (
    <svg aria-hidden="true" className={st.modalIcon} viewBox="0 0 512 512">
      <path
        d="M328 112L184 256l144 144"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
      />
    </svg>
  );
};

const ChevronForwardIcon = (): ReactElement => {
  return (
    <svg aria-hidden="true" className={st.modalIcon} viewBox="0 0 512 512">
      <path
        d="M184 112l144 144-144 144"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
      />
    </svg>
  );
};

const CloseIcon = (): ReactElement => {
  return (
    <svg aria-hidden="true" className={st.modalIcon} viewBox="0 0 512 512">
      <path
        d="M368 144L144 368"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="44"
      />
      <path
        d="M368 368L144 144"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="44"
      />
    </svg>
  );
};

export const ProjectScreenshotsSection = ({
  screenshots,
  title = "Screenshot Gallery",
  subtitle,
}: ProjectScreenshotsSectionProps): ReactElement | null => {
  const revealMotion = useSectionRevealMotion();
  const prefersReducedMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedScreenshot =
    selectedIndex === null ? undefined : screenshots[selectedIndex];

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
        return;
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex((currentIndex) => {
          if (currentIndex === null) {
            return currentIndex;
          }

          return (currentIndex + 1) % screenshots.length;
        });
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex((currentIndex) => {
          if (currentIndex === null) {
            return currentIndex;
          }

          return (currentIndex - 1 + screenshots.length) % screenshots.length;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, screenshots.length]);

  if (screenshots.length === 0) {
    return null;
  }

  return (
    <Section
      className={st.root}
      contentClassName={st.content}
      id="project-detail-gallery"
      subtitle={subtitle}
      title={title}
    >
      <motion.div variants={revealMotion.itemVariants}>
        <ProjectScreenshotsCarousel
          items={screenshots}
          onSelect={(index) => setSelectedIndex(index)}
        />
      </motion.div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedScreenshot !== undefined && (
              <motion.div
                className={st.modalRoot}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <button
                  type="button"
                  aria-label="Close screenshot viewer"
                  className={st.modalBackdrop}
                  onClick={() => setSelectedIndex(null)}
                />
                <motion.div
                  aria-label="Screenshot viewer"
                  aria-modal="true"
                  className={st.modalPanel}
                  initial={{ opacity: 0, scale: 0.98, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.985, y: 10 }}
                  role="dialog"
                  transition={
                    prefersReducedMotion === true
                      ? { duration: 0 }
                      : { duration: 0.22, ease: "easeOut" }
                  }
                >
                  <button
                    type="button"
                    aria-label="Close screenshot viewer"
                    className={`${st.modalControl} ${st.modalCloseButton}`}
                    onClick={() => setSelectedIndex(null)}
                  >
                    <CloseIcon />
                  </button>

                  <div className={st.modalFrame}>
                    {screenshots.length > 1 && (
                      <>
                        <button
                          type="button"
                          aria-label="Show previous screenshot"
                          className={`${st.modalControl} ${st.modalNavButton} ${st.modalPrevButton}`}
                          onClick={() =>
                            setSelectedIndex((currentIndex) => {
                              if (currentIndex === null) {
                                return currentIndex;
                              }

                              return (
                                (currentIndex - 1 + screenshots.length) %
                                screenshots.length
                              );
                            })
                          }
                        >
                          <ChevronBackIcon />
                        </button>
                        <button
                          type="button"
                          aria-label="Show next screenshot"
                          className={`${st.modalControl} ${st.modalNavButton} ${st.modalNextButton}`}
                          onClick={() =>
                            setSelectedIndex((currentIndex) => {
                              if (currentIndex === null) {
                                return currentIndex;
                              }

                              return (currentIndex + 1) % screenshots.length;
                            })
                          }
                        >
                          <ChevronForwardIcon />
                        </button>
                      </>
                    )}

                    <img
                      src={selectedScreenshot.url}
                      alt={selectedScreenshot.alt}
                      className={st.modalImage}
                      width="1600"
                      height="1000"
                    />
                  </div>
                  <div className={st.modalMeta}>
                    <p className={st.modalCaption}>{selectedScreenshot.alt}</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </Section>
  );
};
