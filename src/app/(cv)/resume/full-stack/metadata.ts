import type { Metadata } from "next";

import { siteMetadata } from "../../../../data/site/site.metadata";
import { createPageMetadata } from "../../../../shared/seo/createPageMetadata";

const title = `Software Engineer Resume | ${siteMetadata.siteName}`;
const description =
  "Print-ready resume focused on full-stack and applied AI engineering experience.";

export const metadata: Metadata = {
  ...createPageMetadata({
    title,
    description,
    path: "/resume/full-stack",
  }),
  robots: {
    index: false,
    follow: false,
  },
};
