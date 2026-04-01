import type { ReactElement } from "react";

import Image from "next/image";

import type { ProjectLogoMarkProps } from "./ProjectLogoMark.interfaces";
import st from "./ProjectLogoMark.module.css";

export const ProjectLogoMark = ({
  logo,
}: ProjectLogoMarkProps): ReactElement => {
  if (logo.logoImage === undefined) {
    return <span className={st.text}>{logo.logoText}</span>;
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
