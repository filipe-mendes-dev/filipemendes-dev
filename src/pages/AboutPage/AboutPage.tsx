import type { ReactElement } from 'react';

import { Container } from '../../components/ui/Container';
import { PosterBlock } from '../../components/ui/PosterBlock';
import { Section } from '../../components/ui/Section';
import su from '../../shared/styles/utilities.module.css';
import type { AboutPageProps } from './AboutPage.interfaces';
import st from './AboutPage.module.css';

export const AboutPage = ({ content }: AboutPageProps): ReactElement => {
  return (
    <div className={st.root}>
      <Section title="About" subtitle="Dossier overview of profile, systems experience, and working principles.">
        <Container>
          <div className={st.dossierGrid}>
            <PosterBlock>
              <h3>Profile</h3>
              <p>{content.about.profile}</p>
            </PosterBlock>

            <PosterBlock>
              <h3>Experience</h3>
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
              <h3>Projects</h3>
              <ul className={su.stackList}>
                {content.about.projects.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </PosterBlock>

            <PosterBlock>
              <h3>Skills</h3>
              <ul className={su.chipList} aria-label="Skill list">
                {content.about.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </PosterBlock>

            <PosterBlock>
              <h3>Education</h3>
              <ul className={su.stackList}>
                {content.about.education.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </PosterBlock>

            <PosterBlock>
              <h3>Principles</h3>
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
