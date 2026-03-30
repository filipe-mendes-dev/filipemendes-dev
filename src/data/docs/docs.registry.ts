import { nearsoftMobileAppsAppPublishingPolicy } from "./nearsoft-mobile-apps.docs";
import {
  nearsoftMobileAppsIncidentNotesTemplate,
  nearsoftMobileAppsLocalizationGuide,
  nearsoftMobileAppsReleaseChecklist,
  nearsoftMobileAppsSupportRunbook,
} from "./nearsoft-mobile-apps.demo.docs";
import type { Doc, DocsProjectSummary, DocSummary } from "./docs.interfaces";

const isDocsDemoEnabled = process.env.ENABLE_DOCS_DEMOS === "true";

const coreDocsRegistry: Doc[] = [nearsoftMobileAppsAppPublishingPolicy];

const demoDocsRegistry: Doc[] = [
  nearsoftMobileAppsReleaseChecklist,
  nearsoftMobileAppsSupportRunbook,
  nearsoftMobileAppsLocalizationGuide,
  nearsoftMobileAppsIncidentNotesTemplate,
];
const docsRegistry: Doc[] = isDocsDemoEnabled
  ? [...coreDocsRegistry, ...demoDocsRegistry]
  : coreDocsRegistry;
const docsProjectsRegistry: DocsProjectSummary[] = [
  {
    slug: "nearsoft-mobile-apps",
    name: "Nearsoft Mobile Banking Apps",
    description:
      "Operational notes, publishing policies, and delivery references for the Nearsoft mobile work.",
    order: 1,
  },
];

const getSortedDocs = (): Doc[] => {
  return [...docsRegistry].sort((left, right) => left.order - right.order);
};

export const getDocsNavigationItems = (): DocSummary[] => {
  return getSortedDocs().map((doc) => ({
    featured: doc.featured,
    order: doc.order,
    projectSlug: doc.projectSlug,
    projectName: doc.projectName,
    slug: doc.slug,
    summary: doc.summary,
    title: doc.title,
  }));
};

export const getDoc = (docSlug: string): Doc | undefined => {
  return docsRegistry.find((doc) => doc.slug === docSlug);
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
