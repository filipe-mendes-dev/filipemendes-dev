"use client";

import type { ReactElement } from "react";

import { useCvPhoneNumber } from "../CvPrintControls";
import type { CvResumeHeaderProps } from "./CvResumeHeader.interfaces";
import st from "./CvResumeHeader.module.css";

export const CvResumeHeader = ({
  contactLinks,
  personalInfo,
}: CvResumeHeaderProps): ReactElement => {
  const phoneNumber = useCvPhoneNumber();

  return (
    <header className={st.root}>
      <div className={st.identity}>
        <h1 className={st.name}>{personalInfo.name}</h1>
      </div>

      <ul className={st.contacts}>
        {contactLinks.map((item) => (
          <li className={st.contactEntry} key={item.label}>
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

      <p className={st.location}>
        <span>{personalInfo.location}</span>
        {phoneNumber.length > 0 && (
          <>
            <span aria-hidden="true" className={st.separator}>
              |
            </span>
            <span>{phoneNumber}</span>
          </>
        )}
      </p>
    </header>
  );
};
