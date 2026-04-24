import { notFound } from "next/navigation";
import type { ReactElement } from "react";

import {
  getDoc,
  getDocsProject,
} from "../../../../../data/docs/docs.registry";
import { DocPageView } from "../../../../../views/Docs/DocPageView";
export { generateMetadata } from "./metadata";

interface ProjectDocRouteProps {
  params: Promise<{
    projectSlug: string;
    docSlug: string;
  }>;
}

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
