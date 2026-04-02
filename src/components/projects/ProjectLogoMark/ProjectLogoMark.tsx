import type { ReactElement } from "react";

import Image from "next/image";

import {
  DocumentIcon,
  DocumentIconFilled,
  HomeIcon,
  HomeIconFilled,
} from "../../icons";
import type { ProjectLogoMarkProps } from "./ProjectLogoMark.interfaces";
import st from "./ProjectLogoMark.module.css";

export const ProjectLogoMark = ({
  isFilled = false,
  logo,
}: ProjectLogoMarkProps): ReactElement => {
  if (logo.logoIcon === "document") {
    return isFilled ? (
      <DocumentIconFilled className={st.icon} />
    ) : (
      <DocumentIcon className={st.icon} />
    );
  }

  if (logo.logoIcon === "home") {
    return isFilled ? (
      <HomeIconFilled className={st.icon} />
    ) : (
      <HomeIcon className={st.icon} />
    );
  }

  if (logo.logoImage === undefined) {
    return <span className={st.text}>{logo.logoText ?? ""}</span>;
  }

  return (
    <span className={st.root}>
      <Image
        alt=""
        className={`${st.image} ${st.lightThemeImage}`}
        src={logo.logoImage.lightTheme}
      />
      <Image
        alt=""
        className={`${st.image} ${st.darkThemeImage}`}
        src={logo.logoImage.darkTheme}
      />
    </span>
  );
};
