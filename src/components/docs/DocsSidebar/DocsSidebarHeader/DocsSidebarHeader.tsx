import type { ReactElement } from "react";

import type { DocsSidebarHeaderProps } from "./DocsSidebarHeader.interfaces";
import st from "./DocsSidebarHeader.module.css";

export const DocsSidebarHeader = ({
  docsNavId,
  isExpanded,
  onToggleExpanded,
}: DocsSidebarHeaderProps): ReactElement => {
  const toggleLabel = isExpanded
    ? "Collapse docs navigation"
    : "Expand docs navigation";

  return (
    <div
      className={`${st.root} ${
        isExpanded ? st.rootExpanded : st.rootCollapsed
      }`}
    >
      <button
        type="button"
        className={`${st.button} ${isExpanded ? "" : st.buttonCollapsed}`}
        aria-controls={docsNavId}
        aria-expanded={isExpanded}
        aria-label={toggleLabel}
        onClick={onToggleExpanded}
      >
        <span
          className={`${st.prompt} ${isExpanded ? "" : st.promptCollapsed}`}
          aria-hidden="true"
        >
          {"</>"}
        </span>
        <div className={st.textContainer}>
          <span className={`${st.text} ${isExpanded ? "" : st.textHidden}`}>
            filipemendes.dev
          </span>
          <span
            className={`${st.eyebrow} ${isExpanded ? "" : st.eyebrowHidden}`}
          >
            .Docs
          </span>
          <span
            className={`${st.miniText} ${isExpanded ? "" : st.miniTextVisible}`}
          >
            FM
          </span>
        </div>
      </button>
    </div>
  );
};
