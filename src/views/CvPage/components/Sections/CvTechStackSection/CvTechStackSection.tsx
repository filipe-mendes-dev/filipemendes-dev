import type { ReactElement } from "react";

import { CvPageSection } from "../../CvPageSection";
import { CvSectionItem } from "../../CvSectionItem";
import type { CvTechStackSectionProps } from "./CvTechStackSection.interfaces";
import st from "./CvTechStackSection.module.css";

export const CvTechStackSection = ({
  skillGroups,
}: CvTechStackSectionProps): ReactElement => {
  return (
    <CvPageSection title="Tech Stack" hasBottomSeparator>
      <ul className={st.root}>
        {skillGroups.map((group) => (
          <CvSectionItem title={group.title} key={group.title}>
            <ul className={st.skillList}>
              {group.items.map((item) => (
                <li className={st.skillChip} key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </CvSectionItem>
        ))}
      </ul>
    </CvPageSection>
  );
};
