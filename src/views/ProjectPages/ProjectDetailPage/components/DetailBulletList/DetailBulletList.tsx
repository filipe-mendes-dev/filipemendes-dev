import type { ReactElement } from "react";

import su from "../../../../../shared/styles/utilities.module.css";
import type { DetailBulletListProps } from "./DetailBulletList.interfaces";
import st from "./DetailBulletList.module.css";

export const DetailBulletList = ({
  items,
}: DetailBulletListProps): ReactElement => {
  const midpoint = Math.ceil(items.length / 2);
  const columns = [items.slice(0, midpoint), items.slice(midpoint)];

  return (
    <div className={st.root}>
      <div className={st.list}>
        {columns.map((columnItems, columnIndex) => (
          <ul className={`${su.stackList} ${st.column}`} key={`column-${columnIndex}`}>
            {columnItems.map((item, itemIndex) => {
              const index = columnIndex === 0 ? itemIndex : midpoint + itemIndex;

              return (
                <li className={st.item} key={`${item.title}-${index}`}>
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
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
};
