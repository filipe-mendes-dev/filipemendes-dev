import type { ReactElement } from 'react';

import { AppLink } from '../../components/navigation/AppLink';
import { Container } from '../../components/ui/Container';
import { PosterBlock } from '../../components/ui/PosterBlock';
import { Section } from '../../components/ui/Section';
import su from '../../shared/styles/utilities.module.css';
import type { NotFoundPageProps } from './NotFoundPage.interfaces';
import st from './NotFoundPage.module.css';

export const NotFoundPage = ({ navigate }: NotFoundPageProps): ReactElement => {
  return (
    <Section className={st.root}>
      <Container>
        <PosterBlock className={st.panel}>
          <h1>Page not found</h1>
          <p>The page you requested is not available.</p>
          <AppLink href="/" navigate={navigate} className={su.textLink}>
            Return home
          </AppLink>
        </PosterBlock>
      </Container>
    </Section>
  );
};
