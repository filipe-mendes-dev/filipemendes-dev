import type { Metadata } from "next";

import { siteMetadata } from "../../data/site/site.metadata";
import { createPageMetadata } from "../../shared/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: siteMetadata.title,
  description: siteMetadata.description,
  path: "/",
});
