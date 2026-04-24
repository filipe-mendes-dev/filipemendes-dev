import { notFound } from "next/navigation";
import type { ReactElement } from "react";

import {
  getDocsProject,
  getProjectDocs,
} from "../../../../data/docs/docs.registry";
import { DocsIndexView } from "../../../../views/Docs/DocsIndexView";
export { generateMetadata } from "./metadata";

interface DocsProjectRouteProps {
  params: Promise<{
    projectSlug: string;
  }>;
}

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
