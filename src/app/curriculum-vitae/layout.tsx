import type { ReactElement, ReactNode } from "react";

import "./route.css";

interface CurriculumVitaeLayoutProps {
  children: ReactNode;
}

const CurriculumVitaeLayout = ({
  children,
}: CurriculumVitaeLayoutProps): ReactElement => {
  return <>{children}</>;
};

export default CurriculumVitaeLayout;
