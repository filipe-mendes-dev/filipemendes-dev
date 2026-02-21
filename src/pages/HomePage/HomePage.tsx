import type { ReactElement } from 'react';

import { AppLink } from '../../components/navigation/AppLink';
import { Container } from '../../components/ui/Container';
import { PosterBlock } from '../../components/ui/PosterBlock';
import { Section } from '../../components/ui/Section';
import type { ActionLink } from '../../data/portfolio';
import su from '../../shared/styles/utilities.module.css';
import type { HomePageProps } from './HomePage.interfaces';
import st from './HomePage.module.css';

const getActionClassName = (action: ActionLink): string => {
  const variantClass =
    action.variant === 'primary'
      ? su.buttonPrimary
      : action.variant === 'secondary'
        ? su.buttonSecondary
        : su.textLink;

  return `${su.button} ${variantClass}`;
};

export const HomePage = ({ content, navigate }: HomePageProps): ReactElement => {
  return (
    <div className={st.root}>
      <Section className={st.heroSection}>
        <Container className={st.heroGrid}>
          <figure className={st.heroPhotoFrame}>
            <img src={content.hero.photoUrl} alt={content.hero.photoAlt} className={st.heroPhoto} />
          </figure>

          <div className={st.heroCopy}>
            <p className={st.heroKicker}>Engineering Portfolio</p>
            <h1>{content.hero.name}</h1>
            <p className={st.heroRole}>{content.hero.role}</p>
            <p className={st.heroSummary}>{content.hero.summary}</p>
            <p className={st.heroNow}>{content.hero.now}</p>
            <div className={st.heroActions}>
              {content.hero.actions.map((action) => (
                <AppLink key={action.label} href={action.href} navigate={navigate} className={getActionClassName(action)}>
                  {action.label}
                </AppLink>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section
        className={su.stoneSurface}
        title="Selected Work"
        subtitle="Focused product systems with clear implementation narratives."
      >
        <Container>
          <div className={st.projectPreviewGrid}>
            {content.projects.map((project) => (
              <PosterBlock key={project.slug}>
                <p className={su.cardEyebrow}>{project.category}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <dl className={su.projectStoryGrid}>
                  <div>
                    <dt>Problem</dt>
                    <dd>{project.narrative.problem}</dd>
                  </div>
                  <div>
                    <dt>Approach</dt>
                    <dd>{project.narrative.approach}</dd>
                  </div>
                  <div>
                    <dt>Stack</dt>
                    <dd>{project.narrative.stack}</dd>
                  </div>
                  <div>
                    <dt>Outcome</dt>
                    <dd>{project.narrative.outcome}</dd>
                  </div>
                </dl>
                <AppLink href={`/projects/${project.slug}`} navigate={navigate} className={su.textLink}>
                  Open Product Page
                </AppLink>
              </PosterBlock>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};
