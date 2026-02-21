import type { ReactElement } from 'react';

import { AppLink } from '../../navigation/AppLink';
import { Container } from '../../ui/Container';
import type { HeaderProps } from './Header.interfaces';
import st from './Header.module.css';

export const Header = ({ siteTitle, navigation, pathname, navigate }: HeaderProps): ReactElement => {
  const homeLinkAriaCurrent = pathname === '/' ? { ariaCurrent: 'page' as const } : {};

  return (
    <header className={`${st.root} ${st.siteHeader}`}>
      <Container className={st.headerInner}>
        <AppLink href="/" navigate={navigate} className={st.siteMark} {...homeLinkAriaCurrent}>
          {siteTitle}
        </AppLink>
        <nav aria-label="Primary">
          <ul className={st.siteNavList}>
            {navigation.map((item) => {
              const isCurrent = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const linkAriaCurrent = isCurrent ? { ariaCurrent: 'page' as const } : {};

              return (
                <li key={item.href}>
                  <AppLink href={item.href} navigate={navigate} className={st.siteNavLink} {...linkAriaCurrent}>
                    {item.label}
                  </AppLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
};
