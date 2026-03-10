import type { ReactElement } from 'react';

import { AppLink } from '../../components/navigation/AppLink';
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

export const HomePage = ({ content, navigate, onSectionRequest }: HomePageProps): ReactElement => {
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
                {content.hero.actions.map((action) => {
                  const sectionId = action.sectionId;

                  return (
                    <AppLink
                      key={action.label}
                      href={action.href}
                      navigate={navigate}
                      className={getActionClassName(action)}
                      {...(sectionId === undefined
                        ? {}
                        : {
                            onClick: (event) => {
                              event.preventDefault();
                              onSectionRequest(sectionId);
                            },
                          })}
                    >
                      {action.label}
                    </AppLink>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};
