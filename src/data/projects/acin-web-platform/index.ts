import type { ProjectModule } from "../projects.interfaces";
import { projectDetail } from "./project-detail.data";
import { project } from "./project.data";

export const projectModule: ProjectModule = {
  project,
  detail: projectDetail,
};

export { project, projectDetail };
