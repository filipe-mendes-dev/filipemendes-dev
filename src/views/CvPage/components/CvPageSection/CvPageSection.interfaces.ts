import type { ReactNode } from "react";

export interface CvPageSectionProps {
  children: ReactNode;
  title: string;
  className?: string;
  contentClassName?: string;
}
