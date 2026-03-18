import type { ReactElement } from 'react';

import { ExperienceIcon } from '../../../../components/icons';
import su from '../../../../shared/styles/utilities.module.css';
import { AboutSectionHeading } from '../AboutSectionHeading';
import { ExperienceItemCard } from '../ExperienceItemCard';
import type { ExperienceTimelineProps } from './ExperienceTimeline.interfaces';
import st from './ExperienceTimeline.module.css';

export const ExperienceTimeline = ({
    items,
    className,
}: ExperienceTimelineProps): ReactElement => {
    const rootClassName =
        className === undefined ? st.root : `${st.root} ${className}`;

    return (
        <section className={rootClassName}>
            <AboutSectionHeading
                title="Experience"
                icon={ExperienceIcon}
                variant="primary"
            />

            <ul className={`${su.stackList} ${st.list}`}>
                {items.map((item) => (
                    <ExperienceItemCard
                        item={item}
                        key={`${item.company}-${item.role}`}
                    />
                ))}
            </ul>
        </section>
    );
};
