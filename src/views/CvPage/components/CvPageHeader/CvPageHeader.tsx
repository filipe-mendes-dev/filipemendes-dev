import type { ReactElement } from "react";

import {
  EmailIcon,
  GitHubMarkIcon,
  LinkedInIcon,
  LocationIcon,
  WebsiteIcon,
} from "../../../../components/icons";
import { cvData } from "../../../../data/site/cv/cv.data";
import type { CvContactLink } from "../../../../data/site/cv/cv.interfaces";
import { personData } from "../../../../data/site/person.data";
import type { CvPageHeaderProps } from "./CvPageHeader.interfaces";
import st from "./CvPageHeader.module.css";

const ICON_BY_KIND: Record<CvContactLink["kind"], typeof EmailIcon> = {
  email: EmailIcon,
  external: WebsiteIcon,
  github: GitHubMarkIcon,
  linkedin: LinkedInIcon,
};

const getContactIcon = (kind: CvContactLink["kind"]): ReactElement => {
  const Icon = ICON_BY_KIND[kind];
  return <Icon className={st.contactIcon} />;
};

export const CvPageHeader = (_props: CvPageHeaderProps): ReactElement => {
  const { contactLinks, personalInfo } = cvData;
  const { portrait } = personData;
  const { summaryLines, experienceSummary } = personalInfo;

  return (
    <header className={st.root}>
      <div className={st.mainRow}>
        <div className={st.portraitFrame}>
          <img
            src={portrait.url}
            alt={portrait.alt}
            srcSet={portrait.srcSet}
            sizes={portrait.sizes}
            className={`${st.portrait} ${st.screenPortrait}`}
          />
          <img
            src={portrait.printUrl}
            alt={portrait.alt}
            srcSet={portrait.printSrcSet}
            sizes="1643px"
            className={`${st.portrait} ${st.printPortrait}`}
          />
        </div>

        <div className={st.rightColumn}>
          <div className={st.identity}>
            <div className={st.nameRow}>
              <h1 className={st.name}>{personalInfo.name}</h1>
              <p className={st.location}>
                <LocationIcon className={st.locationIcon} />
                <span>{personalInfo.location}</span>
              </p>
            </div>
            <div className={st.roleLine}>
              <span className={st.role}>{personalInfo.title}</span>
              {experienceSummary !== undefined && (
                <>
                  <span className={st.roleMeta}>·</span>
                  <span className={st.roleMeta}>{experienceSummary}</span>
                </>
              )}
            </div>
          </div>

          {summaryLines !== undefined && (
            <p className={st.bio}>
              {summaryLines[0]}
              <br />
              {summaryLines[1]}
            </p>
          )}

          <ul className={st.contacts}>
            {contactLinks.map((item) => (
              <li className={st.contactEntry} key={item.label}>
                {getContactIcon(item.kind)}
                <a
                  href={item.href}
                  className={st.contactValue}
                  target={item.kind === "email" ? undefined : "_blank"}
                  rel={item.kind === "email" ? undefined : "noreferrer"}
                >
                  {item.displayValue}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};
