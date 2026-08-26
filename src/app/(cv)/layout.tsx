import type { ReactElement, ReactNode } from "react";

import { CvRouteDocumentStyles } from "../../views/CvPage";

interface CvLayoutProps {
  children: ReactNode;
}

const CvLayout = ({ children }: CvLayoutProps): ReactElement => {
  return <CvRouteDocumentStyles>{children}</CvRouteDocumentStyles>;
};

export default CvLayout;
