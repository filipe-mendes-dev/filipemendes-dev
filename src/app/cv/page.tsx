import type { Metadata } from "next";
import type { ReactElement } from "react";

import {
  createOpenGraphMetadata,
  createTwitterMetadata,
} from "../../data/site/site.metadata";
import { siteData } from "../../data/site/site.data";
import { CvPage } from "../../views/CvPage";

const title = `CV | ${siteData.siteTitle}`;
const description =
  "Print-ready CV page for frontend and mobile engineering experience.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: createOpenGraphMetadata(title, description, "website"),
  twitter: createTwitterMetadata(title, description),
  alternates: {
    canonical: "/cv",
  },
};

const CvRoute = (): ReactElement => {
  return <CvPage />;
};

export default CvRoute;
