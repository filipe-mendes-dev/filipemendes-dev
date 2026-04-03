import {
  contactData,
  type SocialLink,
} from "../site/landing-page/contact.data";
import { type NavigationItem, siteData } from "../site/site.data";

export interface ShellViewModel {
  siteTitle: string;
  descriptor: string;
  navigation: NavigationItem[];
  footerSocials: SocialLink[];
}

export const getShellViewModel = (): ShellViewModel => {
  return {
    siteTitle: siteData.siteTitle,
    descriptor: siteData.descriptor,
    navigation: siteData.navigation,
    footerSocials: contactData.socials,
  };
};
