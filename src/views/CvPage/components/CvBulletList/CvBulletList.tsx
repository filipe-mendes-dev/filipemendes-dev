import type { ReactElement } from "react";

import type { CvBulletListProps } from "./CvBulletList.interfaces";
import st from "./CvBulletList.module.css";

export const CvBulletList = ({
  items,
  className,
}: CvBulletListProps): ReactElement => {
  const rootClassName =
    className !== undefined && className.length > 0
      ? `${st.root} ${className}`
      : st.root;

  return (
    <ul className={rootClassName}>
      {items.map((item) => (
        <li className={st.item} key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
};
