import type { ReactElement } from "react";

import type { DocPageRailItemProps } from "./DocPageRail.interfaces";
import st from "./DocPageRail.module.css";

export const DocPageRailItem = ({
  href,
  label,
}: DocPageRailItemProps): ReactElement => {
  return (
    <li>
      <a href={href} className={st.link}>
        {label}
      </a>
    </li>
  );
};
