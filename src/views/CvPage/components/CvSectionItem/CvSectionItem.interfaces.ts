import type { ReactNode } from "react";

export interface CvSectionItemProps {
  title: string;
  titleClassName?: string;
  subtitle?: string;
  inlineSubtitle?: boolean;
  date?: string;
  href?: string;
  children?: ReactNode;
  hasBottomSeparator?: boolean;
}
