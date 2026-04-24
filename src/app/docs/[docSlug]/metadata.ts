import type { Metadata } from "next";

import { getDoc, getDocHref } from "../../../data/docs/docs.registry";
import { siteMetadata } from "../../../data/site/site.metadata";
import { createPageMetadata } from "../../../shared/seo/createPageMetadata";
import { createNotFoundMetadata } from "../../../shared/seo/createNotFoundMetadata";

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
    return createNotFoundMetadata();
  }

  return createPageMetadata({
    title: `${doc.title} | Docs | ${siteMetadata.siteName}`,
    description: doc.summary,
    path: getDocHref(doc),
    type: "article",
  });
};
