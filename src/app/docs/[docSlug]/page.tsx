import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";

import { portfolio } from "../../../data/portfolio";
import { getDoc } from "../../../data/docs/docs.registry";
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

  if (doc === undefined) {
    return {
      title: `Docs | ${portfolio.siteTitle}`,
    };
  }

  const title = `${doc.title} | Docs | ${portfolio.siteTitle}`;

  return {
    title,
    description: doc.summary,
    openGraph: {
      title,
      description: doc.summary,
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description: doc.summary,
    },
  };
};

const DocRoute = async ({ params }: DocRouteProps): Promise<ReactElement> => {
  const { docSlug } = await params;
  const doc = getDoc(docSlug);

  if (doc === undefined) {
    notFound();
  }

  return <DocPageView doc={doc} />;
};

export default DocRoute;
