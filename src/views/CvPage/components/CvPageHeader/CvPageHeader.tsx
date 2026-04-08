import type { ReactElement } from "react";

import {
  EmailIcon,
  ExternalLinkIcon,
  GitHubMarkIcon,
  LinkedInIcon,
} from "../../../../components/icons";
import { cvData } from "../../../../data/site/cv/cv.data";
import type { CvContactLink } from "../../../../data/site/cv/cv.interfaces";
import { personData } from "../../../../data/site/person.data";
import type { CvPageHeaderProps } from "./CvPageHeader.interfaces";
import st from "./CvPageHeader.module.css";

const getContactIcon = (kind: CvContactLink["kind"]): ReactElement => {
  if (kind === "email") {
    return <EmailIcon className={st.contactIcon} />;
  }

  if (kind === "linkedin") {
    return <LinkedInIcon className={st.contactIcon} />;
  }

  if (kind === "github") {
    return <GitHubMarkIcon className={st.contactIcon} />;
  }

  return <ExternalLinkIcon className={st.contactIcon} />;
};

export const CvPageHeader = (_props: CvPageHeaderProps): ReactElement => {
  const { contactLinks, personalInfo } = cvData;
  const { portrait } = personData;

  return (
    <header className={st.root}>
      <div className={st.heroBlock}>
        <div className={st.portraitColumn}>
          <div className={st.portraitFrame}>
            <img
              src={portrait.url}
              alt={portrait.alt}
              srcSet={portrait.srcSet}
              sizes={portrait.sizes}
              className={st.portrait}
            />
          </div>
        </div>

        <div className={st.identity}>
          <h1 className={st.name}>{personalInfo.name}</h1>
          <p className={st.title}>{personalInfo.title}</p>
          <p className={st.location}>{personalInfo.location}</p>
          {personalInfo.summary !== undefined &&
            personalInfo.summary.length > 0 && (
              <p className={st.summary}>{personalInfo.summary}</p>
            )}
        </div>
      </div>

      <div className={st.identityMeta}>
        <ul className={st.contactList}>
          {contactLinks.map((item) => (
            <li className={st.contactItem} key={item.label}>
              <a
                href={item.href}
                className={st.contactLink}
                target={item.kind === "email" ? undefined : "_blank"}
                rel={item.kind === "email" ? undefined : "noreferrer"}
              >
                {getContactIcon(item.kind)}
                <span>{item.displayValue}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
