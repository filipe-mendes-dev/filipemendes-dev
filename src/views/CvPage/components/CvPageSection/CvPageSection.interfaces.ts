import type { ReactElement, ReactNode, SVGProps } from "react";

export interface CvPageSectionProps {
  children: ReactNode;
  title: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
  className?: string;
  contentClassName?: string;
}
