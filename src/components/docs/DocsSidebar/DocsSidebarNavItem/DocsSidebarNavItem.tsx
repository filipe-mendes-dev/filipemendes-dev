import Link from "next/link";
import type { ReactElement } from "react";

import { ProjectLogoMark } from "../../../../components/projects/ProjectLogoMark";
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
  logo,
  compactLabel,
  href,
  isActive,
  label,
  isNested = false,
  onClick,
}: DocsSidebarNavItemProps): ReactElement => {
  const resolvedCompactLabel = compactLabel ?? getCompactLabel(label);
  const hasGraphicLogo =
    logo?.logoImage !== undefined || logo?.logoIcon !== undefined;

  return (
    <Link
      href={href}
      className={`${st.root} ${isNested ? st.rootNested : ""}`}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
    >
      <span
        className={`${st.compactLabel} ${hasGraphicLogo ? st.compactLabelGraphicLogo : ""}`}
      >
        {logo !== undefined ? (
          <span className={st.logoMark} aria-hidden="true">
            <ProjectLogoMark logo={logo} />
          </span>
        ) : (
          resolvedCompactLabel
        )}
      </span>
      <span className={st.label}>{label}</span>
    </Link>
  );
};
