import type { ReactElement } from 'react';

import { PosterBlock } from '../../components/ui/PosterBlock';
import { Section } from '../../components/ui/Section';
import su from '../../shared/styles/utilities.module.css';
import type { ContactPageProps } from './ContactPage.interfaces';
import st from './ContactPage.module.css';

const getSocialIcon = (label: string): ReactElement => {
  const normalizedLabel = label.toLowerCase();

  if (normalizedLabel.includes('github')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={st.socialIcon}>
        <path
          fill="currentColor"
          d="M12 .5A11.5 11.5 0 0 0 .5 12.3c0 5.25 3.4 9.7 8.1 11.28.6.11.82-.27.82-.58 0-.3-.01-1.3-.02-2.36-3.3.73-4-1.44-4-1.44-.54-1.41-1.33-1.79-1.33-1.79-1.1-.77.08-.75.08-.75 1.2.09 1.84 1.27 1.84 1.27 1.08 1.91 2.82 1.36 3.5 1.04.1-.8.42-1.36.77-1.68-2.64-.31-5.42-1.36-5.42-6.05 0-1.34.46-2.43 1.22-3.28-.12-.31-.53-1.56.12-3.25 0 0 1-.33 3.3 1.25a11.2 11.2 0 0 1 6 0c2.3-1.58 3.3-1.25 3.3-1.25.65 1.69.24 2.94.12 3.25.76.85 1.22 1.94 1.22 3.28 0 4.7-2.79 5.74-5.45 6.04.43.39.81 1.13.81 2.29 0 1.65-.01 2.98-.01 3.39 0 .31.21.7.82.58 4.7-1.58 8.1-6.03 8.1-11.28A11.5 11.5 0 0 0 12 .5Z"
        />
      </svg>
    );
  }

  if (normalizedLabel.includes('linkedin')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={st.socialIcon}>
        <path
          fill="currentColor"
          d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46a2.48 2.48 0 0 0-.02-4.96ZM2.77 9.73h4.46V21.5H2.77V9.73Zm7.26 0h4.28v1.61h.06c.6-1.13 2.05-2.33 4.22-2.33 4.52 0 5.36 3.04 5.36 7v5.49h-4.46v-4.87c0-1.16-.02-2.66-1.58-2.66-1.58 0-1.82 1.26-1.82 2.57v4.96h-4.46V9.73Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={st.socialIcon}>
      <path
        fill="currentColor"
        d="M14 3h7v7h-2V6.41l-8.3 8.3-1.4-1.42 8.29-8.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"
      />
    </svg>
  );
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
