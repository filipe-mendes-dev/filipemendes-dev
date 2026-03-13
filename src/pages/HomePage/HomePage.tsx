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

export const HomePage = ({ content, navigate, onSectionRequest, revealRef }: HomePageProps): ReactElement => {
  return (
    <div className={st.root}>
      <Section className={st.heroSection}>
        <div ref={revealRef} className={st.heroWindow} data-landing-reveal="visible">
          <div className={st.heroWindowBar} aria-hidden="true">
            <div className={st.windowControls}>
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className={st.heroGrid}>
            <div className={st.heroMediaColumn}>
              <figure className={st.heroPhotoFrame}>
                <img src={content.hero.photoUrl} alt={content.hero.photoAlt} className={st.heroPhoto} />
              </figure>
            </div>

            <div className={st.heroCopy}>
              <div className={st.heroIntro}>
                <p className={st.heroKicker}>Engineering Portfolio</p>
                <h1 className={st.heroTitle}>{content.hero.name}</h1>
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
