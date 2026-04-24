import type { Metadata } from "next";

const notFoundTitle = "Not Found";
const notFoundDescription = "The requested page could not be found.";

export const createNotFoundMetadata = (): Metadata => {
  return {
    title: notFoundTitle,
    description: notFoundDescription,
    openGraph: {
      title: notFoundTitle,
      description: notFoundDescription,
      images: [],
    },
    robots: {
      index: false,
      follow: false,
    },
    twitter: {
      card: "summary",
      title: notFoundTitle,
      description: notFoundDescription,
      images: [],
    },
  };
};
