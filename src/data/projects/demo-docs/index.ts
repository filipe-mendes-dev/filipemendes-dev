import type { ProjectModule } from "../projects.interfaces";
import { projectDocs } from "./docs.data";
import { project } from "./project.data";

export const projectModule: ProjectModule = {
  project,
  docs: projectDocs,
  isDemo: true,
  isVisibleOnLanding: false,
};

export { project, projectDocs };
