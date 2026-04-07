import type { Metadata } from "next";

import { personData } from "./person.data";

export interface SiteMetadataImage {
  alt: string;
  height: number;
  url: string;
  width: number;
}

export interface SiteMetadataConfig {
  description: string;
  openGraphImage: SiteMetadataImage;
  siteUrl: string;
  title: string;
  twitterImage: string;
}

const defaultLocalSiteUrl = "http://localhost:3000";

const resolveSiteUrl = (): string => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return defaultLocalSiteUrl;
};

export const siteMetadata: SiteMetadataConfig = {
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

export const createOpenGraphMetadata = (
  title: string,
  description: string,
  type: "article" | "website"
): NonNullable<Metadata["openGraph"]> => {
  return {
    title,
    description,
    type,
    images: [siteMetadata.openGraphImage],
  };
};

export const createTwitterMetadata = (
  title: string,
  description: string
): NonNullable<Metadata["twitter"]> => {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [siteMetadata.twitterImage],
  };
};
