import type { MetadataRoute } from "next";

import {
  getDocHref,
  getDocsNavigationItems,
  getDocsProjects,
} from "../data/docs/docs.registry";
import { projectsData } from "../data/projects";
import { getProjectHref } from "../data/projects/projects.interfaces";
import { siteMetadata } from "../data/site/site.metadata";

const sitemap = (): MetadataRoute.Sitemap => {
  const currentDate = new Date();
  const staticRoutes = ["/", "/curriculum-vitae", "/docs", "/arc-timer/support"];
  const projectRoutes = projectsData.map((project) => {
    return getProjectHref(project.slug);
  });
  const docsProjectRoutes = getDocsProjects().map((project) => {
    return `/docs/projects/${project.slug}`;
  });
  const docsRoutes = getDocsNavigationItems().map((doc) => {
    return getDocHref(doc);
  });

  return [...staticRoutes, ...projectRoutes, ...docsProjectRoutes, ...docsRoutes].map(
    (route) => {
      return {
        url: `${siteMetadata.siteUrl}${route}`,
        lastModified: currentDate,
      };
    },
  );
};

export default sitemap;
