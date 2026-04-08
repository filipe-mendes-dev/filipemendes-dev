import type { ReactElement, SVGProps } from "react";

export interface CvPageSectionHeadingProps {
  title: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
}
