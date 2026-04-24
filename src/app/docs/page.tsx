import type { ReactElement } from "react";

import { getDocsNavigationItems } from "../../data/docs/docs.registry";
import { DocsIndexView } from "../../views/Docs/DocsIndexView";
export { metadata } from "./metadata";

const DocsHomeRoute = (): ReactElement => {
  return (
    <DocsIndexView
      docs={getDocsNavigationItems()}
      eyebrow="Documentation Workspace"
      intro="A dedicated space for delivery notes, release policies and reference material that should live outside the main portfolio shell."
      title="Docs"
    />
  );
};

export default DocsHomeRoute;
