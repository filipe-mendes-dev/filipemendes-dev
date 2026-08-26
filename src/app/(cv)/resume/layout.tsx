import type { ReactElement, ReactNode } from "react";

import { CvPrintControls } from "../../../views/CvPage";

interface ResumeLayoutProps {
  children: ReactNode;
}

const ResumeLayout = ({ children }: ResumeLayoutProps): ReactElement => {
  return <CvPrintControls>{children}</CvPrintControls>;
};

export default ResumeLayout;
