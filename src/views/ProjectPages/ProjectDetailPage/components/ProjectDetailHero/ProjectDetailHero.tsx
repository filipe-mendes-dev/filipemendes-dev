import type { ReactElement } from 'react';

import Link from 'next/link';

import { BackIcon, ExternalLinkIcon } from '../../../../../components/icons';
import { TextActionLink } from '../../../../../components/navigation/TextActionLink';
import { Container } from '../../../../../components/ui/Container';
import surface from '../../../../../components/ui/PageSectionSurface/PageSectionSurface.module.css';
import {
  AppStoreBadgeIcon,
  GooglePlayBadgeIcon,
} from './ProjectDetailHeroBadgeIcons';
import type { ProjectDetailHeroProps } from './ProjectDetailHero.interfaces';
import st from './ProjectDetailHero.module.css';

const hasStoreLinks = (hero: ProjectDetailHeroProps['hero']): boolean => {
  return (
    hero.storeLinks?.appStore !== undefined ||
    hero.storeLinks?.googlePlay !== undefined
  );
};

const hasProjectActions = (hero: ProjectDetailHeroProps['hero']): boolean => {
  return hasStoreLinks(hero) || hero.links.length > 0;
};

export const ProjectDetailHero = ({
  hero,
}: ProjectDetailHeroProps): ReactElement => {
  const storeLinks = hero.storeLinks;

  return (
    <section className={`${surface.section} ${st.root}`}>
      <Container className={st.heroInner}>
        <div className={st.heroReveal}>
          <Link href="/" className={st.backLink}>
            <BackIcon className={st.backIcon} />
            <span>Go Back</span>
          </Link>

          <header className={st.heroHeader}>
            <div className={st.heroTitleRow}>
              <div className={st.projectLogo} aria-hidden="true">
                {hero.logoText}
              </div>
              <div className={st.projectHeaderIntro}>
                <p className={st.projectCategory}>{hero.category}</p>
                <h1 className={st.projectTitle}>{hero.name}</h1>
              </div>
            </div>
            <div className={st.projectHeaderContent}>
              <p className={st.projectPositioning}>{hero.positioning}</p>
              <p className={st.projectDescription}>{hero.description}</p>
            </div>
          </header>

          {hasProjectActions(hero) && (
            <div className={st.heroActions}>
              {hero.isMobileApp && hasStoreLinks(hero) && (
                <div className={st.storeLinkRow} aria-label="Mobile app stores">
                  {storeLinks?.appStore !== undefined && (
                    <a
                      href={storeLinks.appStore}
                      className={st.storeBadgeLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Download on the App Store"
                    >
                      <AppStoreBadgeIcon
                        className={`${st.storeBadgeGraphic} ${st.appStoreBadgeImage}`}
                      />
                    </a>
                  )}
                  {storeLinks?.googlePlay !== undefined && (
                    <a
                      href={storeLinks.googlePlay}
                      className={st.storeBadgeLink}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Get it on Google Play"
                    >
                      <GooglePlayBadgeIcon
                        className={`${st.storeBadgeGraphic} ${st.googlePlayBadgeImage}`}
                      />
                    </a>
                  )}
                </div>
              )}
              {hero.links.length > 0 && (
                <div className={st.projectDetailLinks}>
                  {hero.links.map((link) => (
                    <TextActionLink
                      key={link.label}
                      href={link.href}
                      className={st.metaLink}
                      target="_blank"
                      rel="noreferrer"
                      trailingIcon={<ExternalLinkIcon className={st.metaLinkIcon} />}
                    >
                      {link.label}
                    </TextActionLink>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
