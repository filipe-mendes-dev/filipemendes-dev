import type { ReactElement } from "react";

import type { DocsSidebarHeaderProps } from "./DocsSidebarHeader.interfaces";
import st from "./DocsSidebarHeader.module.css";

export const DocsSidebarHeader = ({
  isMobileOpen,
  onToggleMobileNavigation,
}: DocsSidebarHeaderProps): ReactElement => {
  const toggleLabel = isMobileOpen
    ? "Close docs navigation"
    : "Open docs navigation";

  return (
    <div className={st.root}>
      <div className={st.brand}>
        <span className={st.prompt} aria-hidden="true">
          {"</>"}
        </span>
        <div className={st.textContainer}>
          <span className={st.text}>filipemendes.dev</span>
          <span className={st.eyebrow}>.Docs</span>
        </div>
      </div>

      <div className={st.mobileBar}>
        <div className={st.mobileBrand}>
          <span className={st.prompt} aria-hidden="true">
            {"</>"}
          </span>
          <div className={st.textContainer}>
            <span className={st.text}>filipemendes.dev</span>
            <span className={st.eyebrow}>.Docs</span>
          </div>
        </div>

        <button
          type="button"
          className={st.button}
          aria-expanded={isMobileOpen}
          aria-label={toggleLabel}
          onClick={onToggleMobileNavigation}
        >
          <span className={st.menuToggleBars} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
    </div>
  );
};
