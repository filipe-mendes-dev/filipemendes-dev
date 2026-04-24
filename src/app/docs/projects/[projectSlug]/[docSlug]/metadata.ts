import type { Metadata } from "next";

import { getDoc, getDocHref } from "../../../../../data/docs/docs.registry";
import { siteMetadata } from "../../../../../data/site/site.metadata";
import { createPageMetadata } from "../../../../../shared/seo/createPageMetadata";
import { createNotFoundMetadata } from "../../../../../shared/seo/createNotFoundMetadata";

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
    return createNotFoundMetadata();
  }

  return createPageMetadata({
    title: `${doc.title} | Docs | ${siteMetadata.siteName}`,
    description: doc.summary,
    path: getDocHref(doc),
    type: "article",
  });
};
