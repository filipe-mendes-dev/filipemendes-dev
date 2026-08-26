import type { ReactElement } from "react";

import { fullStackCvData } from "../../../../data/site/cv/cv.data";
import { CvPage } from "../../../../views/CvPage";
export { metadata } from "./metadata";

const FullStackResumeRoute = (): ReactElement => {
  return <CvPage data={fullStackCvData} presentation="resume" />;
};

export default FullStackResumeRoute;
