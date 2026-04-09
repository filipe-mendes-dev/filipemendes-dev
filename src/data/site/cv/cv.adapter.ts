import {
  getProjectHref,
  getProjectModuleBySlug,
  projectsData,
} from "../../projects";
import { personData } from "../person.data";
import {
  cvContactLinks,
  cvLanguages,
  cvPersonalInfo,
  cvProjectOverrides,
  cvStandaloneProjects,
} from "./cv.data";
import type {
  CvDocumentData,
  CvProjectEntry,
} from "./cv.interfaces";

const mapProjectEntries = (): CvProjectEntry[] => {
  const sharedProjects = projectsData.map((project) => {
    const override = cvProjectOverrides[project.slug];
    const detail = getProjectModuleBySlug(project.slug)?.detail;

    return {
      title: project.name,
      type: project.category,
      context:
        override?.context ?? detail?.hero.description ?? project.description,
      bullets:
        override?.bullets ??
        detail?.keyFeatures
          .slice(0, 3)
          .map(
            (item) =>
              `${item.title}${
                item.description !== undefined ? ` — ${item.description}` : ""
              }`
          ) ??
        [],
      stack: override?.stack ?? detail?.techStack ?? [],
      href: getProjectHref(project.slug),
    };
  });

  return [...sharedProjects, ...cvStandaloneProjects];
};

export const cvData: CvDocumentData = {
  personalInfo: {
    name: personData.name,
    title: cvPersonalInfo.title ?? "Frontend & Mobile Engineer",
    location: personData.currentStatus,
  },
  contactLinks: cvContactLinks,
  projects: mapProjectEntries(),
  languages: cvLanguages,
};
