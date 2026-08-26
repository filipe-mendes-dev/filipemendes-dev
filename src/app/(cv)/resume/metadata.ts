import type { Metadata } from "next";

import { siteMetadata } from "../../../data/site/site.metadata";
import { createPageMetadata } from "../../../shared/seo/createPageMetadata";

const title = `Frontend Resume | ${siteMetadata.siteName}`;
const description =
  "Print-ready resume focused on frontend and mobile engineering experience.";

export const metadata: Metadata = {
  ...createPageMetadata({
    title,
    description,
    path: "/resume",
  }),
  robots: {
    index: false,
    follow: false,
  },
};
