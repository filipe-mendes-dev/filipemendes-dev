import type { SectionId } from "../../shared/navigation/sections";
import { contactData, type SocialLink } from "../site/contact.data";
import { educationData, type EducationItem } from "../site/education.data";
import { experienceData, type ExperienceItem } from "../site/experience.data";
import { personData } from "../site/person.data";
import {
  getProjectHref,
  type ProjectNarrative,
  projectsData,
} from "../site/projects.data";
import {
  type PublicationItem,
  publicationsData
} from "../site/publications.data";

export interface LandingHeroActionViewModel {
  label: string;
  href: string;
  sectionId?: SectionId;
  variant: "primary" | "secondary" | "ghost";
}

export interface LandingHeroViewModel {
  name: string;
  role: string;
  summary: string;
  now: string;
  photoAlt: string;
  photoUrl: string;
  photoSrcSet: string;
  photoSizes: string;
  actions: LandingHeroActionViewModel[];
}

export interface LandingProjectCardViewModel {
  id: string;
  href: string;
  name: string;
  logoText: string;
  category: string;
  description: string;
  narrative: ProjectNarrative;
}

export interface LandingAboutViewModel {
  profile: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  publications: PublicationItem[];
}

export interface LandingContactViewModel {
  intro: string;
  email: string;
  availability: string;
  socials: SocialLink[];
}

export interface LandingPageViewModel {
  hero: LandingHeroViewModel;
  projects: LandingProjectCardViewModel[];
  about: LandingAboutViewModel;
  contact: LandingContactViewModel;
}

const landingHeroActions: LandingHeroActionViewModel[] = [
  {
    label: "View Projects",
    href: "/",
    sectionId: "projects",
    variant: "primary",
  },
  {
    label: "Contact",
    href: "/",
    sectionId: "contact",
    variant: "secondary",
  },
];

export const getLandingPageViewModel = (): LandingPageViewModel => {
  return {
    hero: {
      name: personData.name,
      role: personData.role,
      summary: personData.summary,
      now: personData.currentStatus,
      photoAlt: personData.portrait.alt,
      photoUrl: personData.portrait.url,
      photoSrcSet: personData.portrait.srcSet,
      photoSizes: personData.portrait.sizes,
      actions: landingHeroActions,
    },
    projects: projectsData.map((project) => {
      return {
        id: project.id,
        href: getProjectHref(project.slug),
        name: project.name,
        logoText: project.logoText,
        category: project.category,
        description: project.description,
        narrative: project.narrative,
      };
    }),
    about: {
      profile: personData.aboutProfile,
      experience: experienceData,
      education: educationData,
      publications: publicationsData,
    },
    contact: {
      intro: contactData.intro,
      email: contactData.email,
      availability: contactData.availability,
      socials: contactData.socials,
    },
  };
};
