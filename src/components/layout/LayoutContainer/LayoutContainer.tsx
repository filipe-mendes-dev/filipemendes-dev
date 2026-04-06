import type { ReactElement } from "react";

import type { LayoutContainerProps } from "./LayoutContainer.interfaces";
import st from "./LayoutContainer.module.css";

export const LayoutContainer = ({
  children,
  className,
  as: Component = "div",
}: LayoutContainerProps): ReactElement => {
  const classes = className === undefined ? st.root : `${st.root} ${className}`;

  return <Component className={classes}>{children}</Component>;
};
