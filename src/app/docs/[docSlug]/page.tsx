import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";

import { getDoc } from "../../../data/docs/docs.registry";
import {
  createOpenGraphMetadata,
  createTwitterMetadata,
} from "../../../data/site/site.metadata";
import { siteData } from "../../../data/site/site.data";
import { DocPageView } from "../../../views/Docs/DocPageView";

interface DocRouteProps {
  params: Promise<{
    docSlug: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: DocRouteProps): Promise<Metadata> => {
  const { docSlug } = await params;
  const doc = getDoc(docSlug);

  if (doc === undefined || doc.projectSlug !== undefined) {
    return {
      title: `Docs | ${siteData.siteTitle}`,
    };
  }

  const title = `${doc.title} | Docs | ${siteData.siteTitle}`;

  return {
    title,
    description: doc.summary,
    openGraph: createOpenGraphMetadata(title, doc.summary, "article"),
    twitter: createTwitterMetadata(title, doc.summary),
  };
};

const DocRoute = async ({ params }: DocRouteProps): Promise<ReactElement> => {
  const { docSlug } = await params;
  const doc = getDoc(docSlug);

  if (doc === undefined || doc.projectSlug !== undefined) {
    notFound();
  }

  return <DocPageView doc={doc} />;
};

export default DocRoute;
