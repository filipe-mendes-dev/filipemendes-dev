import { getProjectRecordBySlug } from "../site/landing-page/projects.data";
import {
  arcTimerPrivacyAndPermissionsPolicy,
  arcTimerReleasePolicy,
} from "./arc-timer.docs";
import { nearsoftMobileAppsAppPublishingPolicy } from "./nearsoft-mobile-apps.docs";
import {
  nearsoftMobileAppsIncidentNotesTemplate,
  nearsoftMobileAppsLocalizationGuide,
  nearsoftMobileAppsReleaseChecklist,
  nearsoftMobileAppsSupportRunbook,
} from "./nearsoft-mobile-apps.demo.docs";
import { standaloneOperationsMemo } from "./standalone-demo.docs";
import type { Doc, DocsProjectSummary, DocSummary } from "./docs.interfaces";
import type { ProjectLogo } from "../../components/projects/ProjectLogoMark";

const isDocsDemoEnabled = process.env.ENABLE_DOCS_DEMOS === "true";
const documentLogo: ProjectLogo = {
  logoIcon: "document",
};

const coreDocsRegistry: Doc[] = [
  arcTimerReleasePolicy,
  arcTimerPrivacyAndPermissionsPolicy,
  nearsoftMobileAppsAppPublishingPolicy,
];

const demoDocsRegistry: Doc[] = [
  nearsoftMobileAppsReleaseChecklist,
  nearsoftMobileAppsSupportRunbook,
  nearsoftMobileAppsLocalizationGuide,
  nearsoftMobileAppsIncidentNotesTemplate,
  standaloneOperationsMemo,
];

const getDocsProjectSummary = (
  slug: string,
  description: string,
  order: number,
): DocsProjectSummary => {
  const project = getProjectRecordBySlug(slug);

  if (project === undefined) {
    throw new Error(`Missing docs project registry source for slug: ${slug}`);
  }

  return {
    slug: project.slug,
    name: project.name,
    logo: project.logo,
    description,
    order,
  };
};

const docsRegistry: Doc[] = isDocsDemoEnabled
  ? [...coreDocsRegistry, ...demoDocsRegistry]
  : coreDocsRegistry;
const docsProjectsRegistry: DocsProjectSummary[] = [
  getDocsProjectSummary(
    "arc-timer",
    "Release, privacy, and operational policy documentation for the Arc Timer mobile app.",
    1,
  ),
  getDocsProjectSummary(
    "nearsoft-mobile-apps",
    "Operational notes, publishing policies, and delivery references for the Nearsoft mobile work.",
    2,
  ),
];

const getSortedDocs = (): Doc[] => {
  return [...docsRegistry].sort((left, right) => left.order - right.order);
};

export const getDocLogo = (projectSlug?: string): ProjectLogo => {
  if (projectSlug === undefined) {
    return documentLogo;
  }

  return getProjectRecordBySlug(projectSlug)?.logo ?? documentLogo;
};

export const getDocsNavigationItems = (): DocSummary[] => {
  return getSortedDocs().map((doc) => ({
    featured: doc.featured,
    lastUpdatedLabel: doc.lastUpdatedLabel,
    logo: getDocLogo(doc.projectSlug),
    order: doc.order,
    projectSlug: doc.projectSlug,
    projectName: doc.projectName,
    slug: doc.slug,
    summary: doc.summary,
    title: doc.title,
  }));
};

export const getDoc = (docSlug: string): Doc | undefined => {
  const doc = docsRegistry.find((entry) => entry.slug === docSlug);

  if (doc === undefined) {
    return undefined;
  }

  return {
    ...doc,
    logo: getDocLogo(doc.projectSlug),
  };
};

export const getDocsProjects = (): DocsProjectSummary[] => {
  return [...docsProjectsRegistry].sort(
    (left, right) => left.order - right.order
  );
};

export const getDocsProject = (
  projectSlug: string
): DocsProjectSummary | undefined => {
  return docsProjectsRegistry.find((project) => project.slug === projectSlug);
};

export const getProjectDocs = (projectSlug: string): DocSummary[] => {
  return getDocsNavigationItems().filter(
    (doc) => doc.projectSlug === projectSlug
  );
};

export const getFeaturedDocs = (): DocSummary[] => {
  return getDocsNavigationItems().filter((doc) => doc.featured === true);
};
