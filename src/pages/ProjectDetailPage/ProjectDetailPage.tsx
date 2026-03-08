import type { ReactElement } from 'react';

import { AppStoreIcon, BackIcon, ExternalLinkIcon, GooglePlayIcon } from '../../components/icons';
import { AppLink } from '../../components/navigation/AppLink';
import { Container } from '../../components/ui/Container';
import { PosterBlock } from '../../components/ui/PosterBlock';
import { Section } from '../../components/ui/Section';
import su from '../../shared/styles/utilities.module.css';
import type { ProjectDetailPageProps } from './ProjectDetailPage.interfaces';
import st from './ProjectDetailPage.module.css';

interface StoreBadgeProps {
  href: string;
  icon: ReactElement;
  overline: string;
  label: string;
  className: string;
}

const StoreBadge = ({ href, icon, overline, label, className }: StoreBadgeProps): ReactElement => {
  return (
    <a href={href} className={`${st.storeBadge} ${className}`} target="_blank" rel="noreferrer">
      {icon}
      <span className={st.storeBadgeText}>
        <span className={st.storeBadgeOverline}>{overline}</span>
        <span className={st.storeBadgeLabel}>{label}</span>
      </span>
    </a>
  );
};

export const ProjectDetailPage = ({ project, navigate }: ProjectDetailPageProps): ReactElement => {
  return (
    <div className={st.root}>
      <section className={`${st.detailSection} ${st.heroSection}`}>
        <Container className={st.heroInner}>
          <AppLink href="/#projects" navigate={navigate} className={st.backLink}>
            <BackIcon className={st.backIcon} />
            <span>Back to Projects</span>
          </AppLink>

          <header className={st.heroHeader}>
            <div className={st.heroTitleRow}>
              <div className={st.projectLogo} aria-hidden="true">
                {project.logoText}
              </div>
              <div className={st.projectHeaderIntro}>
                <p className={st.projectCategory}>{project.category}</p>
                <h1 className={st.projectTitle}>{project.name}</h1>
              </div>
            </div>
            <div className={st.projectHeaderContent}>
              <p className={st.projectPositioning}>{project.positioning}</p>
              <p className={st.projectDescription}>{project.description}</p>
            </div>
          </header>

          <div className={st.heroActions}>
            {project.isMobileApp && project.storeLinks !== undefined && (
              <div className={st.storeBadgeRow} aria-label="Mobile app stores">
                {project.storeLinks.appStore !== undefined && (
                  <StoreBadge
                    href={project.storeLinks.appStore}
                    icon={<AppStoreIcon className={st.storeIcon} />}
                    overline="Download on the"
                    label="App Store"
                    className={st.storeBadgeApple}
                  />
                )}
                {project.storeLinks.googlePlay !== undefined && (
                  <StoreBadge
                    href={project.storeLinks.googlePlay}
                    icon={<GooglePlayIcon className={st.storeIcon} />}
                    overline="Get it on"
                    label="Google Play"
                    className={st.storeBadgeGoogle}
                  />
                )}
              </div>
            )}
            <div className={st.projectDetailLinks}>
              {project.links.map((link) => (
                <a key={link.label} href={link.href} className={`${st.linkWithIcon} ${st.metaLink}`} target="_blank" rel="noreferrer">
                  <span>{link.label}</span>
                  <ExternalLinkIcon className={st.externalIcon} />
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Section title="Screenshot Gallery" className={`${st.detailSection} ${st.gallerySection}`}>
        <div className={st.galleryGrid}>
          {project.screenshots.map((shot) => (
            <figure key={shot.url} className={st.galleryItem}>
              <img src={shot.url} alt={shot.alt} loading="lazy" width="1200" height="750" />
            </figure>
          ))}
        </div>
      </Section>

      <Section title="Key Features" className={`${st.detailSection} ${st.featuresSection}`}>
        <PosterBlock className={st.detailPanel}>
          <ul className={`${su.stackList} ${st.detailList}`}>
            {project.keyFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </PosterBlock>
      </Section>

      <Section title="Architecture" className={`${st.detailSection} ${st.architectureSection}`}>
        <PosterBlock className={st.detailPanel}>
          <ul className={`${su.stackList} ${st.detailList}`}>
            {project.architecture.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </PosterBlock>
      </Section>

      <Section title="Tech Stack" className={`${st.detailSection} ${st.stackSection}`}>
        <div className={st.stackSectionContent}>
          <ul className={su.chipList} aria-label="Project technologies">
            {project.techStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
};
