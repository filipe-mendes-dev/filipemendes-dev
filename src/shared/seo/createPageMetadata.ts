import type { Metadata } from "next";

import {
  siteMetadata,
  type SiteMetadataImage,
} from "../../data/site/site.metadata";

export interface PageMetadataImage {
  alt: string;
  url: string;
}

export interface PageMetadataInput {
  description: string;
  image?: PageMetadataImage;
  path: string;
  title: string;
  type?: "article" | "website";
}

const buildOpenGraphImage = (
  imageOverride?: PageMetadataImage
): SiteMetadataImage => {
  if (imageOverride === undefined) {
    return siteMetadata.openGraphImage;
  }

  return {
    ...siteMetadata.openGraphImage,
    alt: imageOverride.alt,
    url: imageOverride.url,
  };
};

export const createPageMetadata = ({
  title,
  description,
  path,
  type = "website",
  image,
}: PageMetadataInput): Metadata => {
  const openGraphImage = buildOpenGraphImage(image);
  const twitterImage = image?.url ?? siteMetadata.twitterImage;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteMetadata.siteName,
      type,
      images: [openGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [twitterImage],
    },
  };
};
