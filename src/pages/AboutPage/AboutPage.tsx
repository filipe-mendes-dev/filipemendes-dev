import type { ReactElement } from 'react';

import {
  EducationIcon,
  ExperienceIcon,
  ExternalLinkIcon,
  PublicationsIcon,
} from '../../components/icons';
import { Section } from '../../components/ui/Section';
import su from '../../shared/styles/utilities.module.css';
import type { AboutPageProps } from './AboutPage.interfaces';
import st from './AboutPage.module.css';

export const AboutPage = ({ content }: AboutPageProps): ReactElement => {
  return (
    <div className={st.root}>
      <Section title="About Me" subtitle="Profile, systems experience, education, and selected publications.">
        <div className={st.layout}>
          <div className={st.introBlock}>
            <p className={st.introEyebrow}>Product systems perspective</p>
            <p className={st.cardLead}>{content.about.profile}</p>
          </div>

          <section className={st.journeyPanel}>
            <div className={st.journeyHeader}>
              <h3 className={st.titleWithIcon}>
                <ExperienceIcon className={st.cardIcon} />
                Experience
              </h3>
            </div>

            <div className={st.experienceColumn}>
              <ul className={`${su.stackList} ${st.detailList}`}>
                {content.about.experience.map((item) => (
                  <li className={st.detailEntry} key={`${item.company}-${item.role}`}>
                    <div className={st.detailHeading}>
                      <p className={`${su.listTitle} ${st.detailTitle}`}>{item.role}</p>
                      <p className={st.detailCompany}>{item.company}</p>
                    </div>
                    <p className={`${su.listMeta} ${st.detailMeta}`}>{item.period}</p>
                    <p className={st.detailCopy}>{item.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className={st.supportRail}>
            <section className={`${st.supportSection} ${st.educationSection}`}>
              <h3 className={st.subsectionTitle}>
                <EducationIcon className={st.cardIcon} />
                Education
              </h3>
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
            </section>

            {content.about.publications.length > 0 && (
              <section className={`${st.supportSection} ${st.publicationSection}`}>
                <h3 className={st.subsectionTitle}>
                  <PublicationsIcon className={st.cardIcon} />
                  Publications
                </h3>
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
              </section>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};
