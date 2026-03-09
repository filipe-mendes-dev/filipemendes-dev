import type { ReactElement } from 'react';

import { BackIcon, ExternalLinkIcon } from '../../components/icons';
import { AppLink } from '../../components/navigation/AppLink';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import su from '../../shared/styles/utilities.module.css';
import appStoreBadgeBlack from '../../assets/store-badges/app-store-badge-black.svg';
import googlePlayBadge from '../../assets/store-badges/google-play-badge.svg';
import { DetailBulletList } from './components/DetailBulletList';
import type { ProjectDetailPageProps } from './ProjectDetailPage.interfaces';
import st from './ProjectDetailPage.module.css';

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
              <div className={st.storeLinkRow} aria-label="Mobile app stores">
                {project.storeLinks.appStore !== undefined && (
                  <a
                    href={project.storeLinks.appStore}
                    className={st.storeBadgeLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Download on the App Store"
                  >
                    <img src={appStoreBadgeBlack} alt="Download on the App Store" className={st.storeBadgeImage} />
                  </a>
                )}
                {project.storeLinks.googlePlay !== undefined && (
                  <a
                    href={project.storeLinks.googlePlay}
                    className={st.storeBadgeLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Get it on Google Play"
                  >
                    <img src={googlePlayBadge} alt="Get it on Google Play" className={st.storeBadgeImage} />
                  </a>
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
        <div className={st.detailSectionContent}>
          <DetailBulletList items={project.keyFeatures} />
        </div>
      </Section>

      <Section title="Architecture" className={`${st.detailSection} ${st.architectureSection}`}>
        <div className={st.detailSectionContent}>
          <DetailBulletList items={project.architecture} />
        </div>
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
