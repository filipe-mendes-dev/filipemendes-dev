import type { MetadataRoute } from "next";

import { siteMetadata } from "../data/site/site.metadata";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
  };
};

export default robots;
