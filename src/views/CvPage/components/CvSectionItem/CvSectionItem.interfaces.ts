import type { ReactNode } from "react";

export interface CvSectionItemProps {
  title: string;
  subtitle?: string;
  date?: string;
  children?: ReactNode;
}
