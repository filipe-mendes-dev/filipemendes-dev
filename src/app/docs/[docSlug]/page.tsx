import { notFound } from "next/navigation";
import type { ReactElement } from "react";

import { getDoc } from "../../../data/docs/docs.registry";
import { DocPageView } from "../../../views/Docs/DocPageView";
export { generateMetadata } from "./metadata";

interface DocRouteProps {
  params: Promise<{
    docSlug: string;
  }>;
}

const DocRoute = async ({ params }: DocRouteProps): Promise<ReactElement> => {
  const { docSlug } = await params;
  const doc = getDoc(docSlug);

  if (doc === undefined || doc.projectSlug !== undefined) {
    notFound();
  }

  return <DocPageView doc={doc} />;
};

export default DocRoute;
