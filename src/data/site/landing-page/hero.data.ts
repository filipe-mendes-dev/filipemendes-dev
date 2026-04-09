import type { SectionId } from "../../../shared/navigation/sections";
import { personData } from "../person.data";

export interface HeroAction {
  label: string;
  href: string;
  sectionId?: SectionId;
  variant: "primary" | "secondary" | "ghost";
}

export interface HeroData {
  kicker: string;
  name: string;
  headline: string;
  supportingText: string;
  status: string;
  photoAlt: string;
  photoUrl: string;
  photoSrcSet: string;
  photoSizes: string;
  actions: HeroAction[];
}

const heroActions: HeroAction[] = [
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

export const heroData: HeroData = {
  kicker: "Frontend & Mobile Engineer",
  name: personData.name,
  headline: "Building production-grade web and mobile products.",
  supportingText: "Careful implementation, reliable in real use.",
  status: personData.location,
  photoAlt: personData.portrait.alt,
  photoUrl: personData.portrait.url,
  photoSrcSet: personData.portrait.srcSet,
  photoSizes: personData.portrait.sizes,
  actions: heroActions,
};
