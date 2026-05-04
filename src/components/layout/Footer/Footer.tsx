import type { ReactElement } from "react";

import { GitHubMarkIcon, LinkedInIcon } from "../../icons";
import type { FooterProps } from "./Footer.interfaces";
import st from "./Footer.module.css";

export const Footer = ({
  descriptor,
  githubUrl,
  linkedInUrl,
  name,
}: FooterProps): ReactElement => {
  const currentYear = new Date().getFullYear();
  const hasSocialLinks = githubUrl !== undefined || linkedInUrl !== undefined;
  const copyrightLine = `© ${currentYear}`;

  return (
    <footer className={st.root}>
      <div className={st.footerShell}>
        <div className={st.footerInner}>
          <div className={st.footerBrand}>
            <p className={st.footerTag}>[ Portfolio.system ]</p>
            <p className={st.footerName}>{name}</p>
            <p className={st.footerDescriptor}>{descriptor}</p>
            <p className={st.footerMeta}>
              <span>{copyrightLine}</span>
            </p>
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
                    aria-label="Visit GitHub profile"
                  >
                    <span className={st.themeIcon} aria-hidden="true">
                      <GitHubMarkIcon className={st.socialIcon} />
                    </span>
                    <span className={st.socialLabel}>GitHub</span>
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
                    aria-label="Visit LinkedIn profile"
                  >
                    <span className={st.themeIcon} aria-hidden="true">
                      <LinkedInIcon className={st.socialIcon} />
                    </span>
                    <span className={st.socialLabel}>LinkedIn</span>
                  </a>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
};
