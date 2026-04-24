import { personData } from "./person.data";
import { profileData } from "./profile.data";

export interface SiteMetadataImage {
  alt: string;
  height: number;
  url: string;
  width: number;
}

export interface SiteMetadataConfig {
  description: string;
  openGraphImage: SiteMetadataImage;
  siteName: string;
  siteUrl: string;
  title: string;
  twitterImage: string;
}

const defaultProductionSiteUrl = profileData.website.href;

const resolveSiteUrl = (): string => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return defaultProductionSiteUrl;
};

export const siteMetadata: SiteMetadataConfig = {
  siteName: personData.name,
  title: "Filipe Mendes | Frontend & Mobile Engineer",
  description: "Building production-grade web and mobile products.",
  siteUrl: resolveSiteUrl(),
  openGraphImage: {
    url: "/opengraph-image.png",
    width: 1200,
    height: 630,
    alt: `${personData.name} portfolio preview`,
  },
  twitterImage: "/opengraph-image.png",
};
