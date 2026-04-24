import { projectModule as demoDocsProjectModule } from "./demo-docs";
import { projectModule as arcTimerProjectModule } from "./arc-timer";
import { projectModule as filipemendesDevProjectModule } from "./filipemendes-dev";
import {
  type LandingProjectData,
  type ProjectModule,
  type ProjectRecord,
  toLandingProjectData,
} from "./projects.interfaces";

export type {
  LandingProjectData,
  ProjectDetailContent,
  ProjectDocsContent,
  ProjectDetailFeatureItem,
  ProjectModule,
  ProjectRecord,
} from "./projects.interfaces";
export type { PageMetadataInput } from "../../shared/seo/createPageMetadata";
export {
  createProjectPageMetadata,
  getProjectHref,
  toLandingProjectData,
} from "./projects.interfaces";

export const projectModules: ProjectModule[] = [
  arcTimerProjectModule,
  filipemendesDevProjectModule,
  demoDocsProjectModule,
];

const publicProjectModules = projectModules.filter((projectModule) => {
  return projectModule.isVisibleOnLanding !== false;
});

export const projectsData: ProjectRecord[] = publicProjectModules.map(
  (projectModule) => projectModule.project
);

export const landingProjectsData: LandingProjectData[] =
  publicProjectModules.map((projectModule) =>
    toLandingProjectData(projectModule.project)
  );

export const getProjectModuleBySlug = (
  slug: string
): ProjectModule | undefined => {
  return projectModules.find(
    (projectModule) => projectModule.project.slug === slug
  );
};

export const getProjectRecordBySlug = (
  slug: string
): ProjectRecord | undefined => {
  return getProjectModuleBySlug(slug)?.project;
};
