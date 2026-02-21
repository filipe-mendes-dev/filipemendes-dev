import type { ReactElement } from 'react';

import { Container } from '../../components/ui/Container';
import { PosterBlock } from '../../components/ui/PosterBlock';
import { Section } from '../../components/ui/Section';
import su from '../../shared/styles/utilities.module.css';
import type { ContactPageProps } from './ContactPage.interfaces';
import st from './ContactPage.module.css';

export const ContactPage = ({ content }: ContactPageProps): ReactElement => {
  return (
    <div className={st.root}>
      <Section title="Contact" subtitle="Open to focused product and architecture collaboration.">
        <Container>
          <PosterBlock className={st.contactPanel}>
            <p>{content.contact.intro}</p>
            <p>
              <span className={su.listTitle}>Email</span>
              <a href={`mailto:${content.contact.email}`} className={su.textLink}>
                {content.contact.email}
              </a>
            </p>
            <p>{content.contact.availability}</p>
            <ul className={st.contactLinks}>
              {content.contact.socials.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={su.textLink} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </PosterBlock>
        </Container>
      </Section>
    </div>
  );
};
