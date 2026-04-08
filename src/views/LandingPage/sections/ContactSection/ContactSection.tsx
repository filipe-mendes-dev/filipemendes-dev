"use client";

import { type ComponentProps, type ReactElement, useState } from "react";
import { motion, type Variants } from "framer-motion";

import {
  ExternalLinkIcon,
  GitHubMarkIcon,
  LinkedInIcon,
} from "../../../../components/icons";
import { TextActionLink } from "../../../../components/navigation/TextActionLink";
import { LandingPageSection } from "../../../../components/ui/Section";
import { SoftSurface } from "../../../../components/ui/SoftSurface";
import { useSectionRevealMotion } from "../../../../shared/motion/useSectionRevealMotion";
import su from "../../../../shared/styles/utilities.module.css";
import type { ContactSectionProps } from "./ContactSection.interfaces";
import st from "./ContactSection.module.css";

interface ContactFormValues {
  email: string;
  message: string;
  name: string;
}

type CopyStatus = "copied" | "failed" | null;

const copyFeedbackVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: [0, 1, 1],
    transition: {
      duration: 1,
      ease: "easeInOut",
      times: [0, 0.05, 1],
    },
  },
};

const copyTextToClipboard = async (value: string): Promise<void> => {
  if (!navigator.clipboard?.writeText) {
    throw new Error("Clipboard API unavailable");
  }

  await navigator.clipboard.writeText(value);
};

const getFormFieldValue = (formData: FormData, fieldName: string): string => {
  const value = formData.get(fieldName);

  if (typeof value === "string") {
    return value.trim();
  }

  return "";
};

const getSocialIcon = (label: string): ReactElement => {
  const normalizedLabel = label.toLowerCase();

  if (normalizedLabel.includes("github")) {
    return <GitHubMarkIcon className={st.socialIcon} />;
  }

  if (normalizedLabel.includes("linkedin")) {
    return <LinkedInIcon className={st.socialIcon} />;
  }

  return <ExternalLinkIcon className={st.socialIcon} />;
};

const getContactFormValues = (form: HTMLFormElement): ContactFormValues => {
  const formData = new FormData(form);

  return {
    name: getFormFieldValue(formData, "name"),
    email: getFormFieldValue(formData, "email"),
    message: getFormFieldValue(formData, "message"),
  };
};

const buildDraftSubject = ({ name }: ContactFormValues): string => {
  return `Portfolio inquiry from ${name}`;
};

const buildDraftBody = ({ message }: ContactFormValues): string => {
  return message;
};

export const ContactSection = ({
  content,
  isRevealEnabled,
}: ContactSectionProps): ReactElement => {
  const revealMotion = useSectionRevealMotion();
  const [copyStatus, setCopyStatus] = useState<CopyStatus>(null);

  const handleSubmit: NonNullable<ComponentProps<"form">["onSubmit"]> = (
    event
  ): void => {
    event.preventDefault();

    const values = getContactFormValues(event.currentTarget);
    const subject = encodeURIComponent(buildDraftSubject(values));
    const body = encodeURIComponent(buildDraftBody(values));

    window.location.href = `mailto:${content.email}?subject=${subject}&body=${body}`;
  };

  const handleEmailCopy = async (): Promise<void> => {
    try {
      await copyTextToClipboard(content.email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  };

  return (
    <LandingPageSection
      className={st.root}
      contentClassName={st.contactGrid}
      id="contact"
      isRevealEnabled={isRevealEnabled}
      title="Contact"
    >
      <motion.div variants={revealMotion.itemVariants}>
        <div className={st.supportRail}>
          <div className={st.introBlock}>
            <p className={st.eyebrow}>Direct Contact</p>
            <p className={st.intro}>{content.intro}</p>
          </div>

          <motion.div
            className={st.supportSections}
            variants={revealMotion.nestedGroupVariants}
          >
            <motion.section
              variants={revealMotion.itemVariants}
              className={st.supportSection}
              aria-labelledby="contact-direct-heading"
            >
              <h3 id="contact-direct-heading" className={st.supportTitle}>
                Email & Elsewhere
              </h3>
              <p className={st.supportBody}>{content.availability}</p>
              <div className={st.emailAction}>
                <button
                  type="button"
                  className={st.copyEmailButton}
                  disabled={copyStatus !== null}
                  onClick={() => {
                    void handleEmailCopy();
                  }}
                >
                  {content.email}
                </button>
                <motion.div
                  className={
                    copyStatus === "failed"
                      ? `${st.copyPill} ${st.copyPillError}`
                      : st.copyPill
                  }
                  initial={false}
                  variants={copyFeedbackVariants}
                  animate={copyStatus === null ? "hidden" : "visible"}
                  onAnimationComplete={() => {
                    if (copyStatus !== null) {
                      setCopyStatus(null);
                    }
                  }}
                  aria-live="polite"
                >
                  {copyStatus === "failed" ? "Copy failed" : "Copied"}
                </motion.div>
              </div>
              <ul className={st.contactLinks}>
                {content.socials.map((item) => (
                  <li key={item.label}>
                    <TextActionLink
                      href={item.href}
                      className={st.socialLink}
                      target="_blank"
                      rel="noreferrer"
                      leadingIcon={getSocialIcon(item.label)}
                    >
                      {item.label}
                    </TextActionLink>
                  </li>
                ))}
              </ul>
            </motion.section>
          </motion.div>
        </div>
      </motion.div>

      <motion.div variants={revealMotion.itemVariants}>
        <SoftSurface className={st.formPanel}>
          <div className={st.formHeader}>
            <p className={st.eyebrow}>Primary Action</p>
            <h3 className={st.formTitle}>Send a Message</h3>
          </div>
          <motion.form
            className={st.contactForm}
            onSubmit={handleSubmit}
            variants={revealMotion.nestedGroupVariants}
          >
            <motion.div variants={revealMotion.itemVariants}>
              <div className={st.field}>
                <label htmlFor="contact-name" className={st.fieldLabel}>
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className={st.fieldInput}
                />
              </div>
            </motion.div>
            <motion.div variants={revealMotion.itemVariants}>
              <div className={st.field}>
                <label htmlFor="contact-email" className={st.fieldLabel}>
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  className={st.fieldInput}
                />
              </div>
            </motion.div>
            <motion.div variants={revealMotion.itemVariants}>
              <div className={st.field}>
                <label htmlFor="contact-message" className={st.fieldLabel}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  autoComplete="off"
                  required
                  rows={6}
                  className={`${st.fieldInput} ${st.fieldTextarea}`}
                />
              </div>
            </motion.div>
            <motion.div variants={revealMotion.itemVariants}>
              <button
                type="submit"
                className={`${su.button} ${su.buttonPrimary} ${st.formButton}`}
              >
                Open Email Draft
              </button>
            </motion.div>
          </motion.form>
        </SoftSurface>
      </motion.div>
    </LandingPageSection>
  );
};
