import type { ReactElement } from 'react';

import { AppLink } from '../../navigation/AppLink';
import { Container } from '../../ui/Container';
import type { FooterProps } from './Footer.interfaces';
import st from './Footer.module.css';

export const Footer = ({ name, descriptor, navigation, navigate, githubUrl, linkedInUrl }: FooterProps): ReactElement => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${st.root} ${st.siteFooter}`}>
      <Container className={st.footerInner}>
        <div className={st.footerBrand}>
          <p className={st.footerName}>{name}</p>
          <p className={st.footerDescriptor}>{descriptor}</p>
          <p className={st.footerMeta}>Copyright {currentYear}</p>
        </div>

        <nav aria-label="Footer">
          <ul className={st.footerNavList}>
            {navigation.map((item) => (
              <li key={item.href}>
                <AppLink href={item.href} navigate={navigate} className={st.footerLink}>
                  {item.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </nav>

        <ul className={st.footerSocialList}>
          <li>
            <a href={githubUrl} className={st.footerLink} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={linkedInUrl} className={st.footerLink} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
};
