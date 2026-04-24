import type { Metadata } from "next";

import { getDocsProject } from "../../../../data/docs/docs.registry";
import { siteMetadata } from "../../../../data/site/site.metadata";
import { createPageMetadata } from "../../../../shared/seo/createPageMetadata";

interface DocsProjectRouteMetadataProps {
  params: Promise<{
    projectSlug: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: DocsProjectRouteMetadataProps): Promise<Metadata> => {
  const { projectSlug } = await params;
  const project = getDocsProject(projectSlug);

  if (project === undefined) {
    return createPageMetadata({
      title: `Docs | ${siteMetadata.siteName}`,
      description: siteMetadata.description,
      path: "/docs",
    });
  }

  return createPageMetadata({
    title: `${project.name} Docs | ${siteMetadata.siteName}`,
    description: project.description,
    path: `/docs/projects/${project.slug}`,
  });
};
