import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";

import {
  getDoc,
  getDocsProject,
} from "../../../../../data/docs/docs.registry";
import {
  createOpenGraphMetadata,
  createTwitterMetadata,
} from "../../../../../data/site/site.metadata";
import { siteData } from "../../../../../data/site/site.data";
import { DocPageView } from "../../../../../views/Docs/DocPageView";

interface ProjectDocRouteProps {
  params: Promise<{
    projectSlug: string;
    docSlug: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: ProjectDocRouteProps): Promise<Metadata> => {
  const { docSlug, projectSlug } = await params;
  const doc = getDoc(docSlug, projectSlug);

  if (doc === undefined) {
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

const ProjectDocRoute = async ({
  params,
}: ProjectDocRouteProps): Promise<ReactElement> => {
  const { docSlug, projectSlug } = await params;
  const project = getDocsProject(projectSlug);
  const doc = getDoc(docSlug, projectSlug);

  if (project === undefined || doc === undefined) {
    notFound();
  }

  return <DocPageView doc={doc} />;
};

export default ProjectDocRoute;
