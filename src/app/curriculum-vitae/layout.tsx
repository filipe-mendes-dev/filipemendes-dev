import type { ReactElement, ReactNode } from "react";

import { CvRouteDocumentStyles } from "./CvRouteDocumentStyles";

interface CurriculumVitaeLayoutProps {
  children: ReactNode;
}

const CurriculumVitaeLayout = ({
  children,
}: CurriculumVitaeLayoutProps): ReactElement => {
  return <CvRouteDocumentStyles>{children}</CvRouteDocumentStyles>;
};

export default CurriculumVitaeLayout;
