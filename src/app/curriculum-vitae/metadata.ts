import type { Metadata } from "next";

import { siteMetadata } from "../../data/site/site.metadata";
import { createPageMetadata } from "../../shared/seo/createPageMetadata";

const title = `Curriculum Vitae | ${siteMetadata.siteName}`;
const description =
  "Print-ready curriculum vitae page for frontend and mobile engineering experience.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/curriculum-vitae",
});
