import type { Metadata } from "next";
import type { ReactElement } from "react";

import { getDocsNavigationItems } from "../../data/docs/docs.registry";
import { siteData } from "../../data/site/site.data";
import { DocsIndexView } from "../../views/Docs/DocsIndexView";

const title = `Docs | ${siteData.siteTitle}`;
const description =
  "Standalone documentation workspace for project notes, policies, and implementation references.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

const DocsHomeRoute = (): ReactElement => {
  return (
    <DocsIndexView
      docs={getDocsNavigationItems()}
      eyebrow="Documentation Workspace"
      intro="A dedicated space for delivery notes, release policies, and reference material that should live outside the main portfolio shell."
      title="Docs"
    />
  );
};

export default DocsHomeRoute;
