import type { ReactElement } from "react";

import { CvPageSection } from "../../CvPageSection";
import type { CvSkillsSectionProps } from "./CvSkillsSection.interfaces";
import st from "./CvSkillsSection.module.css";

export const CvSkillsSection = ({
  skills,
  hasBottomSeparator = false,
}: CvSkillsSectionProps): ReactElement => {
  return (
    <CvPageSection title="Skills" hasBottomSeparator={hasBottomSeparator}>
      <ul className={st.root}>
        {Object.entries(skills).map(([label, items]) => (
          <li className={st.item} key={label}>
            <span className={st.label}>{label}</span>
            <span className={st.value}>{items.join(" · ")}</span>
          </li>
        ))}
      </ul>
    </CvPageSection>
  );
};
