import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";

import {
  getDocsProject,
  getProjectDocs,
} from "../../../../data/docs/docs.registry";
import { siteData } from "../../../../data/site/site.data";
import { DocsIndexView } from "../../../../views/Docs/DocsIndexView";

interface DocsProjectRouteProps {
  params: Promise<{
    projectSlug: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: DocsProjectRouteProps): Promise<Metadata> => {
  const { projectSlug } = await params;
  const project = getDocsProject(projectSlug);

  if (project === undefined) {
    return {
      title: `Docs | ${siteData.siteTitle}`,
    };
  }

  const title = `${project.name} Docs | ${siteData.siteTitle}`;

  return {
    title,
    description: project.description,
    openGraph: {
      title,
      description: project.description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description: project.description,
    },
  };
};

const DocsProjectRoute = async ({
  params,
}: DocsProjectRouteProps): Promise<ReactElement> => {
  const { projectSlug } = await params;
  const project = getDocsProject(projectSlug);

  if (project === undefined) {
    notFound();
  }

  return (
    <DocsIndexView
      docs={getProjectDocs(project.slug)}
      eyebrow="Project documentation"
      intro={project.description}
      title={project.name}
    />
  );
};

export default DocsProjectRoute;
