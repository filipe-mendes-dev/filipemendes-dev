import type { ReactElement } from 'react';

import { ExternalLinkIcon, GithubIcon, LinkedInIcon } from '../../components/icons';
import { TextActionLink } from '../../components/navigation/TextActionLink';
import { Section } from '../../components/ui/Section';
import { SoftSurface } from '../../components/ui/SoftSurface';
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

export const ContactPage = ({ content, revealRef, headerRevealRef }: ContactPageProps): ReactElement => {
  return (
    <div className={st.root}>
      <Section
        title="Contact"
        subtitle="Open to focused product and architecture collaboration."
        {...(headerRevealRef === undefined ? {} : { headerRevealRef })}
      >
        <div ref={revealRef} className={st.contactGrid} data-landing-reveal="visible">
          <div className={st.supportRail}>
            <div className={st.introBlock}>
              <p className={st.eyebrow}>Direct Contact</p>
              <p className={st.intro}>{content.contact.intro}</p>
            </div>

            <div className={st.supportSections}>
              <section className={st.supportSection} aria-labelledby="contact-direct-heading">
                <h3 id="contact-direct-heading" className={st.supportTitle}>
                  Email & Elsewhere
                </h3>
                <p className={st.supportBody}>{content.contact.availability}</p>
                <TextActionLink href={`mailto:${content.contact.email}`} className={st.primaryLink}>
                  {content.contact.email}
                </TextActionLink>
                <ul className={st.contactLinks}>
                  {content.contact.socials.map((item) => (
                    <li key={item.label}>
                      <TextActionLink href={item.href} className={st.socialLink} target="_blank" rel="noreferrer" leadingIcon={getSocialIcon(item.label)}>
                        {item.label}
                      </TextActionLink>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <SoftSurface className={st.formPanel}>
            <div className={st.formHeader}>
              <p className={st.eyebrow}>Primary Action</p>
              <h3 className={st.formTitle}>Send a Message</h3>
            </div>
            <form className={st.contactForm} action={`mailto:${content.contact.email}`} method="post" encType="text/plain">
              <div className={st.field}>
                <label htmlFor="contact-name" className={st.fieldLabel}>
                  Name
                </label>
                <input id="contact-name" name="name" type="text" autoComplete="name" required className={st.fieldInput} />
              </div>
              <div className={st.field}>
                <label htmlFor="contact-email" className={st.fieldLabel}>
                  Email
                </label>
                <input id="contact-email" name="email" type="email" autoComplete="email" inputMode="email" required className={st.fieldInput} />
              </div>
              <div className={st.field}>
                <label htmlFor="contact-message" className={st.fieldLabel}>
                  Message
                </label>
                <textarea id="contact-message" name="message" autoComplete="off" required rows={6} className={`${st.fieldInput} ${st.fieldTextarea}`} />
              </div>
              <button type="submit" className={st.formButton}>
                Open Email Draft
              </button>
            </form>
          </SoftSurface>
        </div>
      </Section>
    </div>
  );
};
