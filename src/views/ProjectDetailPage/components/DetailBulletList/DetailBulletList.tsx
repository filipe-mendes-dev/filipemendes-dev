import type { ReactElement } from 'react';

import su from '../../../../shared/styles/utilities.module.css';
import type { DetailBulletListProps } from './DetailBulletList.interfaces';
import st from './DetailBulletList.module.css';

export const DetailBulletList = ({ items }: DetailBulletListProps): ReactElement => {
  return (
    <div className={st.root}>
      <ul className={`${su.stackList} ${st.list}`}>
        {items.map((item) => (
          <li className={st.item} key={item}>
            <p className={st.copy}>{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
