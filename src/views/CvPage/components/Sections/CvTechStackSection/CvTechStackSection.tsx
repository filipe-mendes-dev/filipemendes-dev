import type { ReactElement } from "react";

import { DocumentIcon } from "../../../../../components/icons";
import { CvPageSection } from "../../CvPageSection";
import type { CvTechStackSectionProps } from "./CvTechStackSection.interfaces";
import st from "./CvTechStackSection.module.css";

export const CvTechStackSection = ({
  skillGroups,
}: CvTechStackSectionProps): ReactElement => {
  return (
    <CvPageSection icon={DocumentIcon} title="Tech Stack">
      <div className={st.root}>
        {skillGroups.map((group) => (
          <section className={st.group} key={group.title}>
            <h3 className={st.title}>{group.title}</h3>
            <ul className={st.skillList}>
              {group.items.map((item) => (
                <li className={st.skillChip} key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </CvPageSection>
  );
};
