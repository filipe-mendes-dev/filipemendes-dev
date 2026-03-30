import { motion } from "framer-motion";
import type { ReactElement } from "react";

import type { DocsSidebarAccordionToggleProps } from "./DocsSidebarAccordionToggle.interfaces";
import st from "./DocsSidebarAccordionToggle.module.css";

export const DocsSidebarAccordionToggle = ({
  isExpanded,
  label,
  onToggle,
}: DocsSidebarAccordionToggleProps): ReactElement => {
  return (
    <motion.button
      layout
      type="button"
      className={st.root}
      onClick={onToggle}
      aria-expanded={isExpanded}
    >
      <span className={st.label}>{label}</span>
      <span className={st.icon} aria-hidden="true">
        ⌄
      </span>
    </motion.button>
  );
};
