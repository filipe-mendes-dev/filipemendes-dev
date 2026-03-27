import type { ReactElement } from "react";

import type { DocsSidebarSectionToggleProps } from "./DocsSidebarSectionToggle.interfaces";
import st from "./DocsSidebarSectionToggle.module.css";

export const DocsSidebarSectionToggle = ({
  isExpanded,
  label,
  onToggle,
}: DocsSidebarSectionToggleProps): ReactElement => {
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
