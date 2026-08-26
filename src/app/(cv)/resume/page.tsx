import type { ReactElement } from "react";

import { frontendCvData } from "../../../data/site/cv/cv.data";
import { CvPage } from "../../../views/CvPage";
export { metadata } from "./metadata";

const ResumeRoute = (): ReactElement => {
  return <CvPage data={frontendCvData} presentation="resume" />;
};

export default ResumeRoute;
