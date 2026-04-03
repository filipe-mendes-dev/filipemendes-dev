import type { ProjectModule } from "../projects.interfaces";
import { projectDocs } from "./docs.data";
import { projectDetail } from "./project-detail.data";
import { project } from "./project.data";

export const projectModule: ProjectModule = {
  project,
  detail: projectDetail,
  docs: projectDocs,
};

export { project, projectDetail, projectDocs };
