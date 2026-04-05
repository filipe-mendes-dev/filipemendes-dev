import type { ReactElement } from "react";

import su from "../../../../../shared/styles/utilities.module.css";
import type { DetailBulletListProps } from "./DetailBulletList.interfaces";
import st from "./DetailBulletList.module.css";

export const DetailBulletList = ({
  items,
}: DetailBulletListProps): ReactElement => {
  return (
    <div className={st.root}>
      <ul className={`${su.stackList} ${st.list}`}>
        {items.map((item, index) => (
          <li className={st.item} key={item.title}>
            <div className={st.body}>
              <div className={st.heading}>
                <span aria-hidden="true" className={st.index}>
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <p className={st.title}>{item.title}</p>
              </div>
              {item.description !== undefined && (
                <p className={st.description}>{item.description}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
