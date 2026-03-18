import type { ReactElement } from 'react';

import { Section } from '../../components/ui/Section';
import { PageSectionSurface } from '../../components/ui/PageSectionSurface';
import type { NotFoundPageProps } from './NotFoundPage.interfaces';
import st from './NotFoundPage.module.css';

export const NotFoundPage = ({ primaryAction }: NotFoundPageProps): ReactElement => {
    return (
        <PageSectionSurface>
            <Section className={st.root}>
                <div className={st.content}>
                    <p className={st.eyebrow}>404</p>
                    <h1 className={st.title}>Page not found</h1>
                    <p className={st.lead}>The page you requested does not exist or may have been moved.</p>
                    <div className={st.primaryAction}>{primaryAction}</div>
                </div>
            </Section>
        </PageSectionSurface>
    );
};
