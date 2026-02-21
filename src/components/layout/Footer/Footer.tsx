import type { ReactElement } from 'react';

import { Container } from '../../ui/Container';
import type { FooterProps } from './Footer.interfaces';
import st from './Footer.module.css';

const GithubIcon = (): ReactElement => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={st.socialIcon}>
    <path
      fill="currentColor"
      d="M12 .5A11.5 11.5 0 0 0 .5 12.3c0 5.25 3.4 9.7 8.1 11.28.6.11.82-.27.82-.58 0-.3-.01-1.3-.02-2.36-3.3.73-4-1.44-4-1.44-.54-1.41-1.33-1.79-1.33-1.79-1.1-.77.08-.75.08-.75 1.2.09 1.84 1.27 1.84 1.27 1.08 1.91 2.82 1.36 3.5 1.04.1-.8.42-1.36.77-1.68-2.64-.31-5.42-1.36-5.42-6.05 0-1.34.46-2.43 1.22-3.28-.12-.31-.53-1.56.12-3.25 0 0 1-.33 3.3 1.25a11.2 11.2 0 0 1 6 0c2.3-1.58 3.3-1.25 3.3-1.25.65 1.69.24 2.94.12 3.25.76.85 1.22 1.94 1.22 3.28 0 4.7-2.79 5.74-5.45 6.04.43.39.81 1.13.81 2.29 0 1.65-.01 2.98-.01 3.39 0 .31.21.7.82.58 4.7-1.58 8.1-6.03 8.1-11.28A11.5 11.5 0 0 0 12 .5Z"
    />
  </svg>
);

const LinkedInIcon = (): ReactElement => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={st.socialIcon}>
    <path
      fill="currentColor"
      d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46a2.48 2.48 0 0 0-.02-4.96ZM2.77 9.73h4.46V21.5H2.77V9.73Zm7.26 0h4.28v1.61h.06c.6-1.13 2.05-2.33 4.22-2.33 4.52 0 5.36 3.04 5.36 7v5.49h-4.46v-4.87c0-1.16-.02-2.66-1.58-2.66-1.58 0-1.82 1.26-1.82 2.57v4.96h-4.46V9.73Z"
    />
  </svg>
);

export const Footer = ({ name, descriptor, githubUrl, linkedInUrl }: FooterProps): ReactElement => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${st.root} ${st.siteFooter}`}>
      <Container className={st.footerInner}>
        <div className={st.footerBrand}>
          <p className={st.footerTag}>[ portfolio.system ]</p>
          <p className={st.footerName}>{name}</p>
          <p className={st.footerDescriptor}>{descriptor}</p>
          <div className={st.footerMetaRow}>
            <p className={st.footerMeta}>React + TypeScript</p>
            <span aria-hidden="true">•</span>
            <p className={st.footerMeta}>Available for selective collaborations</p>
          </div>
          <p className={st.footerMeta}>Copyright {currentYear}</p>
        </div>

        <ul className={st.footerSocialList}>
          <li>
            <a href={githubUrl} className={st.footerLink} target="_blank" rel="noreferrer">
              <GithubIcon />
              GitHub
            </a>
          </li>
          <li>
            <a href={linkedInUrl} className={st.footerLink} target="_blank" rel="noreferrer">
              <LinkedInIcon />
              LinkedIn
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
};
