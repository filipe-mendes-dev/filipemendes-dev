import type { ReactElement } from "react";

import su from "../../../../../../shared/styles/utilities.module.css";
import type { ExperienceItemCardProps } from "./ExperienceItemCard.interfaces";
import st from "./ExperienceItemCard.module.css";

export const ExperienceItemCard = ({
  item,
}: ExperienceItemCardProps): ReactElement => {
  return (
    <li className={st.root}>
      <div className={st.heading}>
        <p className={`${su.listTitle} ${st.title}`}>{item.title}</p>
        <p className={st.company}>{item.organization}</p>
      </div>
      <p className={`${su.listMeta} ${st.meta}`}>{item.timeframe}</p>
      <p className={st.copy}>{item.context}</p>
      {item.bullets.length > 0 && (
        <ul className={st.bulletList}>
          {item.bullets.map((bullet) => (
            <li className={st.bulletItem} key={bullet}>
              {bullet}
            </li>
          ))}
        </ul>
      )}
      {item.stack.length > 0 && (
        <div className={st.stackSection}>
          <p className={st.stackLabel}>Stack:</p>
          <ul className={`${su.chipList} ${st.stackList}`}>
            {item.stack.map((stackItem) => (
              <li className={st.stackItem} key={stackItem}>
                {stackItem}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};
