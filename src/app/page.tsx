import type { ReactElement } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { ExternalLinkIcon, GithubIcon, LinkedInIcon } from '../components/icons';
import { Container } from '../components/ui/Container';
import { PageSectionSurface } from '../components/ui/PageSectionSurface';
import surface from '../components/ui/PageSectionSurface/PageSectionSurface.module.css';
import { RevealItem } from '../components/ui/RevealItem';
import { Section } from '../components/ui/Section';
import { SoftSurface } from '../components/ui/SoftSurface';
import { type ActionLink, portfolio, type ProjectDetail, type SocialLink } from '../data/portfolio';
import { AboutPage } from '../pages/AboutPage';
import homeSt from '../pages/HomePage/HomePage.module.css';
import landingSt from '../pages/LandingPage/LandingPage.module.css';
import contactSt from '../pages/ContactPage/ContactPage.module.css';
import projectsSt from '../pages/ProjectsPage/ProjectsPage.module.css';
import { ProjectNarrativeList } from '../pages/ProjectsPage/components/ProjectNarrativeList';
import projectCardSt from '../pages/ProjectsPage/components/ProjectCard/ProjectCard.module.css';
import su from '../shared/styles/utilities.module.css';

const getActionClassName = (action: ActionLink): string => {
  const variantClass =
    action.variant === 'primary'
      ? su.buttonPrimary
      : action.variant === 'secondary'
        ? su.buttonSecondary
        : su.textLink;

  return `${su.button} ${variantClass} ${homeSt.heroActionLink}`;
};

const getActionHref = (action: ActionLink): string => {
  return action.sectionId === undefined ? action.href : `#${action.sectionId}`;
};

const getSocialIcon = (label: SocialLink['label']): ReactElement => {
  const normalizedLabel = label.toLowerCase();

  if (normalizedLabel.includes('github')) {
    return <GithubIcon className={contactSt.socialIcon} />;
  }

  if (normalizedLabel.includes('linkedin')) {
    return <LinkedInIcon className={contactSt.socialIcon} />;
  }

  return <ExternalLinkIcon className={contactSt.socialIcon} />;
};

const renderProjectCard = (project: ProjectDetail, index: number): ReactElement => {
  return (
    <RevealItem key={project.slug} index={index}>
      <SoftSurface className={projectCardSt.root}>
        <div className={projectCardSt.header}>
          <div className={projectCardSt.lead}>
            <div className={projectCardSt.marker} aria-hidden="true">
              {project.logoText}
            </div>

            <div className={projectCardSt.heading}>
              <p className={projectCardSt.category}>{project.category}</p>
              <h3 className={projectCardSt.title}>{project.name}</h3>
            </div>
          </div>
        </div>

        <p className={projectCardSt.description}>{project.description}</p>

        <div className={projectCardSt.actions}>
          <Link href={`/projects/${project.slug}`} className={`${projectCardSt.link} ${su.textLink}`}>
            View Product Details
          </Link>
        </div>

        <ProjectNarrativeList narrative={project.narrative} />
      </SoftSurface>
    </RevealItem>
  );
};

const Page = (): ReactElement => {
  return (
    <PageSectionSurface className={landingSt.root}>
        <section id="home" className={`${surface.section} ${landingSt.homeSection} ${homeSt.heroSection}`}>
          <Container>
            <SoftSurface className={homeSt.heroWindowStage}>
              <div className={homeSt.heroGrid}>
                <div className={homeSt.heroMediaColumn}>
                  <figure className={homeSt.heroPhotoFrame}>
                    <Image
                      src={portfolio.hero.photoUrl}
                      alt={portfolio.hero.photoAlt}
                      width={500}
                      height={625}
                      sizes={portfolio.hero.photoSizes}
                      className={homeSt.heroPhoto}
                      priority
                    />
                  </figure>
                </div>

                <div className={homeSt.heroCopy}>
                  <p className={homeSt.heroRevealItem}>
                    <span className={homeSt.heroKicker}>Engineering Portfolio</span>
                  </p>

                  <h1 className={homeSt.heroTitle}>{portfolio.hero.name}</h1>

                  <div className={`${homeSt.heroBody} ${homeSt.heroRevealItem}`}>
                    <p className={homeSt.heroRole}>{portfolio.hero.role}</p>
                    <p className={homeSt.heroSummary}>{portfolio.hero.summary}</p>
                    <p className={homeSt.heroNow}>{portfolio.hero.now}</p>
                  </div>

                  <div className={`${homeSt.heroActions} ${homeSt.heroRevealItem}`}>
                    {portfolio.hero.actions.map((action) => (
                      <a key={action.label} href={getActionHref(action)} className={getActionClassName(action)}>
                        {action.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </SoftSurface>
          </Container>
        </section>

        <Section
          id="projects"
          className={`${surface.section} ${landingSt.projectsSection}`}
          title="Projects"
          subtitle="Each product is documented with a clear narrative from problem to measurable outcome."
        >
          <div className={projectsSt.projectsList} data-landing-reveal="visible">
            {portfolio.projects.map(renderProjectCard)}
          </div>
        </Section>

        <AboutPage
          content={portfolio}
          sectionId="about"
          sectionClassName={`${surface.section} ${landingSt.aboutSection}`}
        />

        <Section
          id="contact"
          className={`${surface.section} ${landingSt.contactSection}`}
          title="Contact"
          subtitle="Open to focused product and architecture collaboration."
        >
          <div className={contactSt.contactGrid} data-landing-reveal="visible">
            <RevealItem className={contactSt.supportRail} index={0}>
              <div className={contactSt.introBlock}>
                <p className={contactSt.eyebrow}>Direct Contact</p>
                <p className={contactSt.intro}>{portfolio.contact.intro}</p>
              </div>

              <div className={contactSt.supportSections}>
                <RevealItem index={0} role="support">
                  <section className={contactSt.supportSection} aria-labelledby="contact-direct-heading">
                    <h3 id="contact-direct-heading" className={contactSt.supportTitle}>
                      Email & Elsewhere
                    </h3>
                    <p className={contactSt.supportBody}>{portfolio.contact.availability}</p>
                    <a href={`mailto:${portfolio.contact.email}`} className={contactSt.primaryLink}>
                      {portfolio.contact.email}
                    </a>
                    <ul className={contactSt.contactLinks}>
                      {portfolio.contact.socials.map((item) => (
                        <li key={item.label}>
                          <a href={item.href} className={contactSt.socialLink} target="_blank" rel="noreferrer">
                            {getSocialIcon(item.label)}
                            <span>{item.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                </RevealItem>
              </div>
            </RevealItem>

            <RevealItem index={1}>
              <SoftSurface className={contactSt.formPanel}>
                <div className={contactSt.formHeader}>
                  <p className={contactSt.eyebrow}>Primary Action</p>
                  <h3 className={contactSt.formTitle}>Send a Message</h3>
                </div>

                <form className={contactSt.contactForm} action={`mailto:${portfolio.contact.email}`} method="post" encType="text/plain">
                  <RevealItem index={0} role="form-field">
                    <div className={contactSt.field}>
                      <label htmlFor="contact-name" className={contactSt.fieldLabel}>
                        Name
                      </label>
                      <input id="contact-name" name="name" type="text" autoComplete="name" required className={contactSt.fieldInput} />
                    </div>
                  </RevealItem>

                  <RevealItem index={1} role="form-field">
                    <div className={contactSt.field}>
                      <label htmlFor="contact-email" className={contactSt.fieldLabel}>
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        required
                        className={contactSt.fieldInput}
                      />
                    </div>
                  </RevealItem>

                  <RevealItem index={2} role="form-field">
                    <div className={contactSt.field}>
                      <label htmlFor="contact-message" className={contactSt.fieldLabel}>
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        autoComplete="off"
                        required
                        rows={6}
                        className={`${contactSt.fieldInput} ${contactSt.fieldTextarea}`}
                      />
                    </div>
                  </RevealItem>

                  <RevealItem index={3} role="form-field">
                    <button type="submit" className={`${su.button} ${su.buttonPrimary} ${contactSt.formButton}`}>
                      Open Email Draft
                    </button>
                  </RevealItem>
                </form>
              </SoftSurface>
            </RevealItem>
          </div>
        </Section>
      </PageSectionSurface>
  );
};

export default Page;
