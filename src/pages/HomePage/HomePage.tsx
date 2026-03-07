import type { ReactElement } from 'react';

import { AppLink } from '../../components/navigation/AppLink';
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

  return `${su.button} ${variantClass} ${st.heroActionLink}`;
};

export const HomePage = ({ content, navigate }: HomePageProps): ReactElement => {
  return (
    <div className={st.root}>
      <Section className={st.heroSection}>
        <div className={st.heroWindow}>
          <div className={st.windowDots} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className={st.heroGrid}>
            <figure className={st.heroPhotoFrame}>
              <img src={content.hero.photoUrl} alt={content.hero.photoAlt} className={st.heroPhoto} />
            </figure>

            <div className={st.heroCopy}>
              <div className={st.heroIntro}>
                <p className={st.heroKicker}>Engineering Portfolio</p>
                <h1>{content.hero.name}</h1>
                <p className={st.heroCommand} aria-label="$ pnpm ship --frontend --product">
                  <span className={st.heroPrompt}>$</span>
                  <span className={st.heroCommandText}>pnpm ship --frontend --product</span>
                </p>
              </div>
              <div className={st.heroBody}>
                <p className={st.heroRole}>{content.hero.role}</p>
                <p className={st.heroSummary}>{content.hero.summary}</p>
                <p className={st.heroNow}>{content.hero.now}</p>
              </div>
              <div className={st.heroActions}>
                {content.hero.actions.map((action) => (
                  <AppLink key={action.label} href={action.href} navigate={navigate} className={getActionClassName(action)}>
                    {action.label}
                  </AppLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className={st.featuredProjectsSection} title="Featured Projects" subtitle="A quick overview of representative product work before the full projects section.">
        <div className={st.projectPreviewGrid}>
          {content.projects.map((project) => (
            <PosterBlock key={project.slug} className={st.featuredCard}>
              <div className={st.featuredCardHeader}>
                <p className={su.cardEyebrow}>{project.category}</p>
                <h3>{project.name}</h3>
                <p className={st.featuredDescription}>{project.description}</p>
              </div>
              <dl className={`${su.projectStoryGrid} ${st.featuredNarrative}`}>
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
              <AppLink href={`/projects/${project.slug}`} navigate={navigate} className={`${su.textLink} ${st.featuredLink}`}>
                Open Product Page
              </AppLink>
            </PosterBlock>
          ))}
        </div>
      </Section>
    </div>
  );
};
