import type { ReactElement } from 'react';

import { AppLink } from '../../components/navigation/AppLink';
import { Container } from '../../components/ui/Container';
import { PosterBlock } from '../../components/ui/PosterBlock';
import { Section } from '../../components/ui/Section';
import su from '../../shared/styles/utilities.module.css';
import type { ProjectDetailPageProps } from './ProjectDetailPage.interfaces';
import st from './ProjectDetailPage.module.css';

export const ProjectDetailPage = ({ project, navigate }: ProjectDetailPageProps): ReactElement => {
  return (
    <div className={st.root}>
      <Section title={project.name} subtitle={project.positioning}>
        <Container className={st.projectDetailHeader}>
          <div className={st.projectLogo} aria-hidden="true">
            {project.logoText}
          </div>
          <div>
            <p className={su.cardEyebrow}>{project.category}</p>
            <p>{project.description}</p>
            <div className={st.projectDetailLinks}>
              {project.links.map((link) => (
                <a key={link.label} href={link.href} className={su.textLink} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
            {project.isMobileApp && project.storeLinks !== undefined && (
              <div className={st.storeBadgeRow} aria-label="Mobile app stores">
                {project.storeLinks.appStore !== undefined && (
                  <a href={project.storeLinks.appStore} className={st.storeBadge} target="_blank" rel="noreferrer">
                    Download on App Store
                  </a>
                )}
                {project.storeLinks.googlePlay !== undefined && (
                  <a href={project.storeLinks.googlePlay} className={st.storeBadge} target="_blank" rel="noreferrer">
                    Get it on Google Play
                  </a>
                )}
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section className={su.stoneSurface} title="Screenshot Gallery">
        <Container>
          <div className={st.galleryGrid}>
            {project.screenshots.map((shot) => (
              <figure key={shot.url} className={st.galleryItem}>
                <img src={shot.url} alt={shot.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      <Section title="Key Features">
        <Container>
          <PosterBlock>
            <ul className={su.stackList}>
              {project.keyFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </PosterBlock>
        </Container>
      </Section>

      <Section title="Architecture">
        <Container>
          <PosterBlock>
            <ul className={su.stackList}>
              {project.architecture.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </PosterBlock>
        </Container>
      </Section>

      <Section title="Tech Stack">
        <Container>
          <ul className={su.chipList} aria-label="Project technologies">
            {project.techStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <AppLink href="/projects" navigate={navigate} className={`${su.textLink} ${st.backLink}`}>
            Back to Projects
          </AppLink>
        </Container>
      </Section>
    </div>
  );
};
