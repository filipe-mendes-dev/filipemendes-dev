import type { Metadata } from "next";
import type { ReactElement } from "react";

import {
  createOpenGraphMetadata,
  createTwitterMetadata,
} from "../../data/site/site.metadata";
import { siteData } from "../../data/site/site.data";
import { CvPage } from "../../views/CvPage";

const title = `Curriculum Vitae | ${siteData.siteTitle}`;
const description =
  "Print-ready curriculum vitae page for frontend and mobile engineering experience.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: createOpenGraphMetadata(title, description, "website"),
  twitter: createTwitterMetadata(title, description),
  alternates: {
    canonical: "/curriculum-vitae",
  },
};

const CurriculumVitaeRoute = (): ReactElement => {
  return <CvPage />;
};

export default CurriculumVitaeRoute;
