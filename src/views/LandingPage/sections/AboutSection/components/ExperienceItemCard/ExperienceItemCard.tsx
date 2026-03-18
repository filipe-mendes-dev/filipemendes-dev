import type { ReactElement } from 'react';

import su from '../../../../../../shared/styles/utilities.module.css';
import type { ExperienceItemCardProps } from './ExperienceItemCard.interfaces';
import st from './ExperienceItemCard.module.css';

export const ExperienceItemCard = ({
    item,
}: ExperienceItemCardProps): ReactElement => {
    return (
        <li className={st.root}>
            <div className={st.heading}>
                <p className={`${su.listTitle} ${st.title}`}>{item.role}</p>
                <p className={st.company}>{item.company}</p>
            </div>
            <p className={`${su.listMeta} ${st.meta}`}>{item.period}</p>
            <p className={st.copy}>{item.summary}</p>
        </li>
    );
};
