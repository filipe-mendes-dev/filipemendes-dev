import type { Metadata } from "next";

import { siteMetadata } from "../../data/site/site.metadata";
import { createPageMetadata } from "../../shared/seo/createPageMetadata";

const title = `Docs | ${siteMetadata.siteName}`;
const description =
  "Standalone documentation workspace for project notes, policies and implementation references.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/docs",
});
