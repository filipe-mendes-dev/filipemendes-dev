import type { ReactElement } from "react";

import { DocsSidebarNavItem } from "../DocsSidebarNavItem";
import { DocsSidebarAccordionToggle } from "./DocsSidebarAccordionToggle";
import type { DocsSidebarAccordionProps } from "./DocsSidebarAccordion.interfaces";
import st from "./DocsSidebarAccordion.module.css";

export const DocsSidebarAccordion = ({
  isExpanded,
  items,
  label,
  onItemClick,
  onToggle,
}: DocsSidebarAccordionProps): ReactElement => {
  return (
    <div className={st.root}>
      <DocsSidebarAccordionToggle
        isExpanded={isExpanded}
        label={label}
        onToggle={onToggle}
      />
      <div
        className={st.body}
        data-state={isExpanded ? "open" : "closed"}
      >
        <ul className={st.list}>
          {items.map((item) => (
            <li key={item.href}>
              <DocsSidebarNavItem
                compactLabel={item.compactLabel}
                href={item.href}
                isActive={item.isActive}
                isNested
                label={item.label}
                onClick={onItemClick}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
