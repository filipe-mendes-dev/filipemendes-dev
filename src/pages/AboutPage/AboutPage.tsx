import type { ReactElement } from 'react';

import { EducationIcon, ExternalLinkIcon, PublicationsIcon } from '../../components/icons';
import { RevealItem } from '../../components/ui/RevealItem';
import { Section } from '../../components/ui/Section';
import su from '../../shared/styles/utilities.module.css';
import { AboutSupportSection } from './components/AboutSupportSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import type { AboutPageProps } from './AboutPage.interfaces';
import st from './AboutPage.module.css';

export const AboutPage = ({
  content,
  revealRef,
  headerRevealRef,
}: AboutPageProps): ReactElement => {
  return (
    <Section
      title="About Me"
      subtitle="Profile, systems experience, education, and selected publications."
      className={st.root}
      {...(headerRevealRef === undefined ? {} : { headerRevealRef })}
    >
      <div ref={revealRef} className={st.layout} data-landing-reveal="visible">
        <RevealItem className={st.introBlock} index={0}>
          <p className={st.introEyebrow}>Product systems perspective</p>
          <p className={st.cardLead}>{content.about.profile}</p>
        </RevealItem>

        <RevealItem index={1}>
          <ExperienceTimeline className={st.journeyPanel} items={content.about.experience} />
        </RevealItem>

        <RevealItem className={st.supportRail} index={2}>
          <RevealItem index={0} role="support">
            <AboutSupportSection className={`${st.supportSection} ${st.educationSection}`} icon={EducationIcon} title="Education">
              <ul className={`${su.stackList} ${st.educationList}`}>
                {content.about.education.map((entry) => (
                  <li className={st.educationEntry} key={`${entry.title}-${entry.period ?? 'ongoing'}`}>
                    <div className={st.educationHeading}>
                      <p className={st.educationTitle}>{entry.title}</p>
                      {entry.period !== undefined && <p className={st.educationPeriod}>{entry.period}</p>}
                    </div>
                    {entry.details !== undefined && <p className={st.educationDetails}>{entry.details}</p>}
                  </li>
                ))}
              </ul>
            </AboutSupportSection>
          </RevealItem>

          {content.about.publications.length > 0 && (
            <RevealItem index={1} role="support">
              <AboutSupportSection
                className={`${st.supportSection} ${st.publicationSection}`}
                icon={PublicationsIcon}
                title="Publications"
              >
                <ul className={`${su.stackList} ${st.publicationList}`}>
                  {content.about.publications.map((entry) => (
                    <li className={st.publicationEntry} key={`${entry.title}-${entry.year ?? 'undated'}`}>
                      {entry.href !== undefined ? (
                        <a href={entry.href} className={st.publicationLink} target="_blank" rel="noreferrer">
                          <span>{entry.title}</span>
                          <ExternalLinkIcon className={st.publicationIcon} />
                        </a>
                      ) : (
                        <p className={st.educationTitle}>{entry.title}</p>
                      )}
                      {(entry.venue !== undefined || entry.year !== undefined) && (
                        <p className={st.publicationMeta}>
                          {[entry.venue, entry.year].filter((value): value is string => value !== undefined).join(' · ')}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </AboutSupportSection>
            </RevealItem>
          )}
        </RevealItem>
      </div>
    </Section>
  );
};
