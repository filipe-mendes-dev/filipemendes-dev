import type { ReactElement } from 'react';

import { GithubIcon, LinkedInIcon } from '../../icons';
import { Container } from '../../ui/Container';
import type { FooterProps } from './Footer.interfaces';
import st from './Footer.module.css';

export const Footer = ({
  descriptor,
  githubUrl,
  linkedInUrl,
  name,
}: FooterProps): ReactElement => {
  const currentYear = new Date().getFullYear();
  const hasSocialLinks =
    githubUrl !== undefined || linkedInUrl !== undefined;

  return (
    <footer className={st.root}>
      <Container className={st.footerInner}>
        <div className={st.footerBrandColumn}>
          <div className={st.footerBrand}>
            <p className={st.footerTag}>[ portfolio.system ]</p>
            <p className={st.footerName}>{name}</p>
            <p className={st.footerDescriptor}>{descriptor}</p>
            <div className={st.footerMetaRow}>
              <p className={st.footerMeta}>Next.js App Router + TypeScript</p>
              <span aria-hidden="true">•</span>
              <p className={st.footerMeta}>Static-first portfolio architecture</p>
            </div>
            <p className={st.footerMeta}>Copyright {currentYear}</p>
          </div>
        </div>

        {hasSocialLinks && (
          <ul className={st.footerSocialList}>
            {githubUrl !== undefined && (
              <li>
                <a
                  href={githubUrl}
                  className={st.footerLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubIcon className={st.socialIcon} />
                  GitHub
                </a>
              </li>
            )}
            {linkedInUrl !== undefined && (
              <li>
                <a
                  href={linkedInUrl}
                  className={st.footerLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedInIcon className={st.socialIcon} />
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
        )}
      </Container>
    </footer>
  );
};
