import type { CvDocumentData } from "../../data/site/cv/cv.interfaces";

export type CvPresentation = "showcase" | "resume";

export interface CvPageProps {
  data: CvDocumentData;
  presentation: CvPresentation;
}
