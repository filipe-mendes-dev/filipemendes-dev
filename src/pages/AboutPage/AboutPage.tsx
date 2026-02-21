import type { ReactElement } from 'react';

import { Container } from '../../components/ui/Container';
import { PosterBlock } from '../../components/ui/PosterBlock';
import { Section } from '../../components/ui/Section';
import su from '../../shared/styles/utilities.module.css';
import type { AboutPageProps } from './AboutPage.interfaces';
import st from './AboutPage.module.css';

const SectionIcon = ({ path }: { path: string }): ReactElement => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={st.cardIcon}>
    <path fill="currentColor" d={path} />
  </svg>
);

export const AboutPage = ({ content }: AboutPageProps): ReactElement => {
  return (
    <div className={st.root}>
      <Section title="About" subtitle="Dossier overview of profile, systems experience, and working principles.">
        <Container>
          <div className={st.dossierGrid}>
            <PosterBlock>
              <h3 className={st.titleWithIcon}>
                <SectionIcon path="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2.25c-4.1 0-7.5 2.52-7.5 5.63a.75.75 0 0 0 1.5 0c0-2.06 2.5-4.13 6-4.13s6 2.07 6 4.13a.75.75 0 0 0 1.5 0c0-3.1-3.4-5.63-7.5-5.63Z" />
                Profile
              </h3>
              <p>{content.about.profile}</p>
            </PosterBlock>

            <PosterBlock>
              <h3 className={st.titleWithIcon}>
                <SectionIcon path="M4.75 4.5A2.25 2.25 0 0 1 7 2.25h10A2.25 2.25 0 0 1 19.25 4.5v15A2.25 2.25 0 0 1 17 21.75H7A2.25 2.25 0 0 1 4.75 19.5v-15ZM7 3.75a.75.75 0 0 0-.75.75v15c0 .41.34.75.75.75h10c.41 0 .75-.34.75-.75v-15a.75.75 0 0 0-.75-.75H7Zm2.25 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Zm0 4a.75.75 0 0 1 .75-.75h6a.75.75 0 1 1 0 1.5h-6a.75.75 0 0 1-.75-.75Z" />
                Experience
              </h3>
              <ul className={su.stackList}>
                {content.about.experience.map((item) => (
                  <li key={`${item.company}-${item.role}`}>
                    <p className={su.listTitle}>
                      {item.role} - {item.company}
                    </p>
                    <p className={su.listMeta}>{item.period}</p>
                    <p>{item.summary}</p>
                  </li>
                ))}
              </ul>
            </PosterBlock>

            <PosterBlock>
              <h3 className={st.titleWithIcon}>
                <SectionIcon path="M3.75 6.5A2.75 2.75 0 0 1 6.5 3.75h4A2.75 2.75 0 0 1 13.25 6.5v1h4.25A2.75 2.75 0 0 1 20.25 10.25v7.25a2.75 2.75 0 0 1-2.75 2.75h-11a2.75 2.75 0 0 1-2.75-2.75v-11Zm2.75-1.25a1.25 1.25 0 0 0-1.25 1.25V8h6.5V6.5a1.25 1.25 0 0 0-1.25-1.25h-4Zm-1.25 4.25v8a1.25 1.25 0 0 0 1.25 1.25h11a1.25 1.25 0 0 0 1.25-1.25v-7.25A1.25 1.25 0 0 0 17.5 9h-11a1.25 1.25 0 0 0-1.25.5Z" />
                Projects
              </h3>
              <ul className={su.stackList}>
                {content.about.projects.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </PosterBlock>

            <PosterBlock>
              <h3 className={st.titleWithIcon}>
                <SectionIcon path="m11.3 2.4-7 2.8A2.25 2.25 0 0 0 3 7.28v4.88a8.75 8.75 0 0 0 5.5 8.13l3.23 1.37a.75.75 0 0 0 .54 0l3.23-1.37a8.75 8.75 0 0 0 5.5-8.13V7.28a2.25 2.25 0 0 0-1.3-2.06l-7-2.8a2.25 2.25 0 0 0-1.4-.02ZM4.5 7.28a.75.75 0 0 1 .44-.69l7-2.8a.75.75 0 0 1 .58 0l7 2.8a.75.75 0 0 1 .43.69v4.88a7.25 7.25 0 0 1-4.57 6.74L12 20.18l-3.38-1.43a7.25 7.25 0 0 1-4.12-6.59V7.28Zm10.28 1.69a.75.75 0 0 1 .05 1.06l-3.5 3.85a.75.75 0 0 1-1.08.03l-1.75-1.75a.75.75 0 1 1 1.06-1.06l1.2 1.2 2.97-3.27a.75.75 0 0 1 1.05-.06Z" />
                Skills
              </h3>
              <ul className={su.chipList} aria-label="Skill list">
                {content.about.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </PosterBlock>

            <PosterBlock>
              <h3 className={st.titleWithIcon}>
                <SectionIcon path="M12 3.75 2.5 8.35v.8l9.5 4.6 9.5-4.6v-.8L12 3.75Zm0 11.6-6.97-3.37V16a1 1 0 0 0 .55.9l6 2.9a1 1 0 0 0 .84 0l6-2.9a1 1 0 0 0 .55-.9v-4.02L12 15.35Z" />
                Education
              </h3>
              <ul className={su.stackList}>
                {content.about.education.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </PosterBlock>

            <PosterBlock>
              <h3 className={st.titleWithIcon}>
                <SectionIcon path="M6.73 2.75h10.54a2.5 2.5 0 0 1 2.5 2.5v13.5a2.5 2.5 0 0 1-2.5 2.5H6.73a2.5 2.5 0 0 1-2.5-2.5V5.25a2.5 2.5 0 0 1 2.5-2.5Zm0 1.5a1 1 0 0 0-1 1v13.5a1 1 0 0 0 1 1h10.54a1 1 0 0 0 1-1V5.25a1 1 0 0 0-1-1H6.73Zm2.02 3a.75.75 0 0 1 .75-.75h4.99a.75.75 0 1 1 0 1.5H9.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h4.99a.75.75 0 1 1 0 1.5H9.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h2.99a.75.75 0 1 1 0 1.5H9.5a.75.75 0 0 1-.75-.75Z" />
                Principles
              </h3>
              <ul className={su.stackList}>
                {content.about.principles.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </PosterBlock>
          </div>
        </Container>
      </Section>
    </div>
  );
};
