import type { ReactElement } from 'react';

import { ExternalLinkIcon, GithubIcon, LinkedInIcon } from '../../components/icons';
import { PosterBlock } from '../../components/ui/PosterBlock';
import { Section } from '../../components/ui/Section';
import su from '../../shared/styles/utilities.module.css';
import type { ContactPageProps } from './ContactPage.interfaces';
import st from './ContactPage.module.css';

const getSocialIcon = (label: string): ReactElement => {
  const normalizedLabel = label.toLowerCase();

  if (normalizedLabel.includes('github')) {
    return <GithubIcon className={st.socialIcon} />;
  }

  if (normalizedLabel.includes('linkedin')) {
    return <LinkedInIcon className={st.socialIcon} />;
  }

  return <ExternalLinkIcon className={st.socialIcon} />;
};

export const ContactPage = ({ content }: ContactPageProps): ReactElement => {
  return (
    <div className={st.root}>
      <Section title="Contact" subtitle="Open to focused product and architecture collaboration.">
        <div className={st.contactGrid}>
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
                  <a href={item.href} className={`${su.textLink} ${st.socialLink}`} target="_blank" rel="noreferrer">
                    {getSocialIcon(item.label)}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </PosterBlock>

          <PosterBlock className={st.formPanel}>
            <h3 className={st.formTitle}>Send a Message</h3>
            <form className={st.contactForm} action={`mailto:${content.contact.email}`} method="post" encType="text/plain">
              <div className={st.field}>
                <label htmlFor="contact-name" className={st.fieldLabel}>
                  Name
                </label>
                <input id="contact-name" name="name" type="text" required className={st.fieldInput} />
              </div>
              <div className={st.field}>
                <label htmlFor="contact-email" className={st.fieldLabel}>
                  Email
                </label>
                <input id="contact-email" name="email" type="email" required className={st.fieldInput} />
              </div>
              <div className={st.field}>
                <label htmlFor="contact-message" className={st.fieldLabel}>
                  Message
                </label>
                <textarea id="contact-message" name="message" required rows={5} className={st.fieldInput} />
              </div>
              <button type="submit" className={st.formButton}>
                Send via Email
              </button>
            </form>
          </PosterBlock>
        </div>
      </Section>
    </div>
  );
};
