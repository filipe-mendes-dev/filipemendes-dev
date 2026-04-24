import type { Metadata } from "next";

import { getDoc, getDocHref } from "../../../../../data/docs/docs.registry";
import { siteMetadata } from "../../../../../data/site/site.metadata";
import { createPageMetadata } from "../../../../../shared/seo/createPageMetadata";

interface ProjectDocRouteMetadataProps {
  params: Promise<{
    projectSlug: string;
    docSlug: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: ProjectDocRouteMetadataProps): Promise<Metadata> => {
  const { docSlug, projectSlug } = await params;
  const doc = getDoc(docSlug, projectSlug);

  if (doc === undefined) {
    return createPageMetadata({
      title: `Docs | ${siteMetadata.siteName}`,
      description: siteMetadata.description,
      path: "/docs",
    });
  }

  return createPageMetadata({
    title: `${doc.title} | Docs | ${siteMetadata.siteName}`,
    description: doc.summary,
    path: getDocHref(doc),
    type: "article",
  });
};
