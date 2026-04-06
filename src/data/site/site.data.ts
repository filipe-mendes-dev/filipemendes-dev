import type { SectionId } from "../../shared/navigation/sections";

export interface NavigationItem {
  label: string;
  href: string;
  sectionId?: SectionId;
}

export interface SiteData {
  siteTitle: string;
  descriptor: string;
  navigation: NavigationItem[];
}

export const siteData: SiteData = {
  siteTitle: "Filipe Mendes",
  descriptor: "Frontend & Mobile Engineer",
  navigation: [
    { label: "Home", href: "/", sectionId: "home" },
    { label: "Projects", href: "/", sectionId: "projects" },
    { label: "About Me", href: "/", sectionId: "about" },
    { label: "Contact", href: "/", sectionId: "contact" },
  ],
};
