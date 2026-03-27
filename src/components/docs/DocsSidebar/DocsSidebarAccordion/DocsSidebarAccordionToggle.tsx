import type { ReactElement } from "react";

import type { DocsSidebarAccordionToggleProps } from "./DocsSidebarAccordionToggle.interfaces";
import st from "./DocsSidebarAccordionToggle.module.css";

export const DocsSidebarAccordionToggle = ({
  isExpanded,
  label,
  onToggle,
}: DocsSidebarAccordionToggleProps): ReactElement => {
  return (
    <button
      type="button"
      className={st.root}
      onClick={onToggle}
      aria-expanded={isExpanded}
    >
      <span className={st.label}>{label}</span>
      <span className={st.icon} aria-hidden="true">
        ⌄
      </span>
    </button>
  );
};
