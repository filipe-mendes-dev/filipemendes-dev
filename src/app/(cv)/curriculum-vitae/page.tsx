import type { ReactElement } from "react";

import { frontendCvData } from "../../../data/site/cv/cv.data";
import { CvPage } from "../../../views/CvPage";
export { metadata } from "./metadata";

const CurriculumVitaeRoute = (): ReactElement => {
  return <CvPage data={frontendCvData} presentation="showcase" />;
};

export default CurriculumVitaeRoute;
