import type { Metadata } from "next";

import { getDoc, getDocHref } from "../../../data/docs/docs.registry";
import { siteMetadata } from "../../../data/site/site.metadata";
import { createPageMetadata } from "../../../shared/seo/createPageMetadata";

interface DocRouteMetadataProps {
  params: Promise<{
    docSlug: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: DocRouteMetadataProps): Promise<Metadata> => {
  const { docSlug } = await params;
  const doc = getDoc(docSlug);

  if (doc === undefined || doc.projectSlug !== undefined) {
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
