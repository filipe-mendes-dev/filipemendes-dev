"use client";

import { type ReactElement, useState } from "react";
import { motion, type Variants } from "framer-motion";

import type { ClickToCopyProps } from "./ClickToCopy.interfaces";
import st from "./ClickToCopy.module.css";

type CopyStatus = "copied" | "failed" | null;

const copyFeedbackVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: [0, 1, 1],
    transition: {
      duration: 1,
      ease: "easeInOut",
      times: [0, 0.05, 1],
    },
  },
};

const copyTextToClipboard = async (value: string): Promise<void> => {
  if (!navigator.clipboard?.writeText) {
    throw new Error("Clipboard API unavailable");
  }

  await navigator.clipboard.writeText(value);
};

export const ClickToCopy = ({
  ariaLabel,
  children,
  className,
  copiedLabel = "Copied",
  failedLabel = "Copy failed",
  value,
}: ClickToCopyProps): ReactElement => {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>(null);
  const rootClassName =
    className === undefined ? st.root : `${st.root} ${className}`;

  const handleCopy = async (): Promise<void> => {
    try {
      await copyTextToClipboard(value);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  };

  return (
    <div className={rootClassName}>
      <button
        type="button"
        aria-label={ariaLabel}
        className={st.button}
        disabled={copyStatus !== null}
        onClick={() => {
          void handleCopy();
        }}
      >
        {children ?? value}
      </button>
      <motion.div
        className={
          copyStatus === "failed" ? `${st.pill} ${st.pillError}` : st.pill
        }
        initial={false}
        variants={copyFeedbackVariants}
        animate={copyStatus === null ? "hidden" : "visible"}
        onAnimationComplete={() => {
          if (copyStatus !== null) {
            setCopyStatus(null);
          }
        }}
        aria-hidden={copyStatus === null}
        aria-live="polite"
      >
        {copyStatus === "failed" ? failedLabel : copiedLabel}
      </motion.div>
    </div>
  );
};
