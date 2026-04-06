import {
  projectModule as acinWebPlatformProjectModule,
} from "./acin-web-platform";
import {
  projectModule as demoDocsProjectModule,
} from "./demo-docs";
import {
  projectModule as arcTimerProjectModule,
} from "./arc-timer";
import {
  projectModule as inovInfraredDetectionProjectModule,
} from "./inov-infrared-detection";
import {
  projectModule as nearsoftMobileAppsProjectModule,
} from "./nearsoft-mobile-apps";
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
  ProjectNarrative,
  ProjectRecord,
} from "./projects.interfaces";
export {
  createProjectMetadata,
  getProjectHref,
  toLandingProjectData,
} from "./projects.interfaces";

export const projectModules: ProjectModule[] = [
  acinWebPlatformProjectModule,
  demoDocsProjectModule,
  arcTimerProjectModule,
  nearsoftMobileAppsProjectModule,
  inovInfraredDetectionProjectModule,
];

const publicProjectModules = projectModules.filter((projectModule) => {
  return projectModule.isVisibleOnLanding !== false;
});

export const projectsData: ProjectRecord[] = publicProjectModules.map(
  (projectModule) => projectModule.project,
);

export const landingProjectsData: LandingProjectData[] = publicProjectModules.map(
  (projectModule) => toLandingProjectData(projectModule.project),
);

export const getProjectModuleBySlug = (
  slug: string,
): ProjectModule | undefined => {
  return projectModules.find((projectModule) => projectModule.project.slug === slug);
};

export const getProjectRecordBySlug = (
  slug: string,
): ProjectRecord | undefined => {
  return getProjectModuleBySlug(slug)?.project;
};
