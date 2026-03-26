import Link from "next/link";
import type { ReactElement } from "react";

import type { DocsSidebarNavItemProps } from "./DocsSidebarNavItem.interfaces";
import st from "./DocsSidebarNavItem.module.css";

const getCompactLabel = (label: string): string => {
  return label
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export const DocsSidebarNavItem = ({
  compactLabel,
  href,
  isActive,
  isExpanded,
  label,
  isNested = false,
  onClick,
}: DocsSidebarNavItemProps): ReactElement => {
  const resolvedCompactLabel = compactLabel ?? getCompactLabel(label);

  return (
    <Link
      href={href}
      className={`${st.root} ${isActive ? st.rootActive : ""} ${
        isExpanded ? "" : st.rootCollapsed
      } ${isNested ? st.rootNested : ""}`}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
    >
      <span className={st.compactLabel}>{resolvedCompactLabel}</span>
      <span className={`${st.label} ${isExpanded ? "" : st.labelCompact}`}>
        {label}
      </span>
    </Link>
  );
};
