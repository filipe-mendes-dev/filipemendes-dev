import {
  getProjectHref,
  getProjectModuleBySlug,
  projectsData,
} from "../../projects";
import { contactData } from "../landing-page/contact.data";
import { experienceData } from "../experience.data";
import { personData } from "../person.data";
import { publicationsData } from "../publications.data";
import {
  cvLanguages,
  cvPersonalInfo,
  cvProjectOverrides,
  cvStandaloneProjects,
  cvWebsiteLink,
} from "./cv.data";
import type {
  CvContactLink,
  CvDocumentData,
  CvExperienceEntry,
  CvProjectEntry,
  CvPublicationEntry,
} from "./cv.interfaces";

const mapContactLinks = (): CvContactLink[] => {
  const socialLinks: CvContactLink[] = contactData.socials.map((entry) => {
    return {
      label: entry.label,
      href: entry.href,
      displayValue:
        entry.label === "LinkedIn" ? "mendes-filipe-dev" : "filipe-mendes-dev",
      kind: entry.label === "LinkedIn" ? "linkedin" : "github",
    };
  });

  return [
    {
      label: "Email",
      href: `mailto:${contactData.email}`,
      displayValue: contactData.email,
      kind: "email",
    },
    {
      label: cvWebsiteLink.label,
      href: cvWebsiteLink.href,
      displayValue: cvWebsiteLink.displayValue,
      kind: "external",
    },
    ...socialLinks,
  ];
};

const mapExperienceEntries = (): CvExperienceEntry[] => {
  return experienceData.map((entry) => {
    return {
      title: entry.title,
      organization: entry.organization,
      timeframe: entry.timeframe,
      context: entry.context,
      bullets: entry.bullets,
      stack: entry.stack,
    };
  });
};

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

const mapPublicationEntries = (): CvPublicationEntry[] => {
  return publicationsData.map((entry) => {
    return {
      title: entry.title,
      venue: entry.venue,
      year: entry.year,
      href: entry.href,
    };
  });
};

export const cvData: CvDocumentData = {
  personalInfo: {
    name: personData.name,
    title: cvPersonalInfo.title ?? "Frontend & Mobile Engineer",
    location: personData.currentStatus,
    availability: contactData.availability,
  },
  contactLinks: mapContactLinks(),
  experience: mapExperienceEntries(),
  projects: mapProjectEntries(),
  publications: mapPublicationEntries(),
  languages: cvLanguages,
};
