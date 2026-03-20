'use client';

import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

import { EducationIcon, ExternalLinkIcon, PublicationsIcon } from '../../../../components/icons';
import { LandingPageSection } from '../../../../components/ui/Section';
import { useSectionRevealMotion } from '../../../../shared/motion/useSectionRevealMotion';
import su from '../../../../shared/styles/utilities.module.css';
import { AboutSupportSection } from './components/AboutSupportSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import type { AboutSectionProps } from './AboutSection.interfaces';
import st from './AboutSection.module.css';

export const AboutSection = ({ content, isRevealEnabled }: AboutSectionProps): ReactElement => {
  const revealMotion = useSectionRevealMotion();

  return (
    <LandingPageSection
      className={st.root}
      contentClassName={st.layout}
      id="about"
      isRevealEnabled={isRevealEnabled}
      subtitle="Profile, systems experience, education, and selected publications."
      title="About Me"
    >
      <motion.div className={st.introBlock} variants={revealMotion.itemVariants}>
        <p className={st.introEyebrow}>Product systems perspective</p>
        <p className={st.cardLead}>{content.about.profile}</p>
      </motion.div>

      <motion.div variants={revealMotion.itemVariants}>
        <ExperienceTimeline className={st.journeyPanel} items={content.about.experience} />
      </motion.div>

      <motion.div variants={revealMotion.itemVariants}>
        <motion.div className={st.supportRail} variants={revealMotion.nestedGroupVariants}>
          <motion.div variants={revealMotion.itemVariants}>
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
          </motion.div>

          {content.about.publications.length > 0 && (
            <motion.div variants={revealMotion.itemVariants}>
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
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </LandingPageSection>
  );
};
