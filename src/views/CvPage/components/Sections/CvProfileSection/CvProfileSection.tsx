import type { ReactElement } from "react";

import { CvPageSection } from "../../CvPageSection";
import type { CvProfileSectionProps } from "./CvProfileSection.interfaces";
import st from "./CvProfileSection.module.css";

export const CvProfileSection = ({
  items,
}: CvProfileSectionProps): ReactElement => {
  return (
    <CvPageSection title="Profile">
      <ul className={st.root}>
        {items.map((item) => (
          <li className={st.item} key={item.title}>
            <p className={st.title}>{item.title}</p>
            <p className={st.description}>{item.description}</p>
          </li>
        ))}
      </ul>
    </CvPageSection>
  );
};
