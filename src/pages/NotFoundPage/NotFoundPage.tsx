import type { ReactElement } from 'react';

import { AppLink } from '../../components/navigation/AppLink';
import { TextActionLink } from '../../components/navigation/TextActionLink';
import { Section } from '../../components/ui/Section';
import { SoftSurface } from '../../components/ui/SoftSurface';
import type { NotFoundPageProps } from './NotFoundPage.interfaces';
import st from './NotFoundPage.module.css';

export const NotFoundPage = ({ navigate }: NotFoundPageProps): ReactElement => {
  return (
    <Section className={st.root} title="Page Not Found">
      <div className={st.layout}>
        <div className={st.introBlock}>
          <p className={st.eyebrow}>Error 404</p>
          <p className={st.lead}>The page you requested is not available, moved, or never belonged to this site structure.</p>
          <SoftSurface className={st.panel}>
            <div className={st.panelHeader}>
              <p className={st.panelEyebrow}>Recovery Path</p>
              <h2 className={st.panelTitle}>Choose a valid route</h2>
              <p className={st.panelCopy}>Return to the homepage or jump directly into the project archive.</p>
            </div>

            <div className={st.actions}>
              <AppLink href="/" navigate={navigate} className={st.primaryAction}>
                Return Home
              </AppLink>
              <TextActionLink href="/#projects" navigate={navigate} className={st.secondaryAction}>
                Browse Projects
              </TextActionLink>
            </div>
          </SoftSurface>
        </div>
      </div>
    </Section>
  );
};
