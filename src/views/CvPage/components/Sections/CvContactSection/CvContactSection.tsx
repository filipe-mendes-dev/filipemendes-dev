import type { ReactElement } from "react";

import {
  EmailIcon,
  ExternalLinkIcon,
  GitHubMarkIcon,
  LinkedInIcon,
} from "../../../../../components/icons";
import { CvPageSection } from "../../CvPageSection";
import type { CvContactSectionProps } from "./CvContactSection.interfaces";
import st from "./CvContactSection.module.css";

const getContactIcon = (kind: CvContactSectionProps["contactLinks"][number]["kind"]): ReactElement => {
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

export const CvContactSection = ({
  contactLinks,
}: CvContactSectionProps): ReactElement => {
  return (
    <CvPageSection icon={ExternalLinkIcon} title="Contact">
      <ul className={st.root}>
        {contactLinks.map((item) => (
          <li className={st.item} key={item.label}>
            <span className={st.label}>{item.label}</span>
            <a
              href={item.href}
              className={st.link}
              target={item.kind === "email" ? undefined : "_blank"}
              rel={item.kind === "email" ? undefined : "noreferrer"}
            >
              {getContactIcon(item.kind)}
              <span>{item.displayValue}</span>
            </a>
          </li>
        ))}
      </ul>
    </CvPageSection>
  );
};
