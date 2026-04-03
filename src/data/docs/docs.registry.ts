import type { ProjectLogo } from "../../components/projects/ProjectLogoMark";
import {
  getProjectRecordBySlug,
  type ProjectModule,
  projectModules,
} from "../projects";
import type { Doc, DocsProjectSummary, DocSummary } from "./docs.interfaces";

const isDocsDemoEnabled = process.env.ENABLE_DOCS_DEMOS === "true";
const documentLogo: ProjectLogo = {
  logoIcon: "document",
};

const projectDocsModules = projectModules.filter(
  (
    projectModule,
  ): projectModule is ProjectModule & {
    docs: NonNullable<ProjectModule["docs"]>;
  } => {
    return projectModule.docs !== undefined;
  },
);

const coreProjectDocsModules = projectDocsModules.filter((projectModule) => {
  return projectModule.isDemo !== true;
});

const demoProjectDocsModules = projectDocsModules.filter((projectModule) => {
  return projectModule.isDemo === true;
});

const coreDocsRegistry: Doc[] = coreProjectDocsModules.flatMap(
  (projectModule) => projectModule.docs.documents,
);

const demoDocsRegistry: Doc[] = demoProjectDocsModules.flatMap(
  (projectModule) => projectModule.docs.documents,
);

const docsRegistry: Doc[] = isDocsDemoEnabled
  ? [...coreDocsRegistry, ...demoDocsRegistry]
  : coreDocsRegistry;
const docsProjectsRegistry: DocsProjectSummary[] = (
  isDocsDemoEnabled ? projectDocsModules : coreProjectDocsModules
)
  .map((projectModule) => {
    return {
      slug: projectModule.project.slug,
      name: projectModule.project.name,
      logo: projectModule.project.logo,
      description: projectModule.docs.description,
      order: projectModule.docs.order,
    };
  })
  .sort((left, right) => left.order - right.order);

const getSortedDocs = (): Doc[] => {
  return [...docsRegistry].sort((left, right) => left.order - right.order);
};

export const getDocHref = ({
  projectSlug,
  slug,
}: Pick<DocSummary, "projectSlug" | "slug">): string => {
  if (projectSlug !== undefined) {
    return `/docs/projects/${projectSlug}/${slug}`;
  }

  return `/docs/${slug}`;
};

export const getDocLogo = (projectSlug?: string): ProjectLogo => {
  if (projectSlug === undefined) {
    return documentLogo;
  }

  return getProjectRecordBySlug(projectSlug)?.logo ?? documentLogo;
};

const getDocProjectName = (projectSlug?: string): string | undefined => {
  if (projectSlug === undefined) {
    return undefined;
  }

  return getProjectRecordBySlug(projectSlug)?.name;
};

const toDocSummary = (doc: Doc): DocSummary => {
  return {
    featured: doc.featured,
    lastUpdatedLabel: doc.lastUpdatedLabel,
    logo: getDocLogo(doc.projectSlug),
    order: doc.order,
    projectName: getDocProjectName(doc.projectSlug),
    projectSlug: doc.projectSlug,
    slug: doc.slug,
    summary: doc.summary,
    title: doc.title,
  };
};

export const getDocsNavigationItems = (): DocSummary[] => {
  return getSortedDocs().map(toDocSummary);
};

export const getDoc = (
  docSlug: string,
  projectSlug?: string,
): Doc | undefined => {
  const doc = docsRegistry.find((entry) => {
    if (entry.slug !== docSlug) {
      return false;
    }

    if (projectSlug === undefined) {
      return entry.projectSlug === undefined;
    }

    return entry.projectSlug === projectSlug;
  });

  if (doc === undefined) {
    return undefined;
  }

  return {
    ...doc,
    logo: getDocLogo(doc.projectSlug),
    projectName: getDocProjectName(doc.projectSlug),
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
