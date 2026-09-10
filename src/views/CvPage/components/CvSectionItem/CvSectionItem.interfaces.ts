import type { ReactNode } from "react";

export interface CvSectionItemProps {
  title: string;
  allowPrintBreak?: boolean;
  titleClassName?: string;
  subtitle?: string;
  inlineSubtitle?: boolean;
  date?: string;
  dateNote?: string;
  href?: string;
  children?: ReactNode;
  hasBottomSeparator?: boolean;
}
