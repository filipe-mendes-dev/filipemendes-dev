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

const defaultSiteUrl = "https://filipemendes.dev";

const resolveSiteUrl = (): string => {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? defaultSiteUrl
  );
};

export const siteMetadata: SiteMetadataConfig = {
  title: "Filipe Mendes | Frontend & Mobile Engineer",
  description:
    "Frontend and mobile engineer focused on reliable UI behavior, interaction quality, and structured case studies.",
  siteUrl: resolveSiteUrl(),
  openGraphImage: {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: `${personData.name} portfolio preview`,
  },
  twitterImage: "/twitter-image",
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
