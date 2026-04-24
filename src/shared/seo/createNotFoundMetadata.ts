import type { Metadata } from "next";

export const createNotFoundMetadata = (): Metadata => {
  return {
    title: "Not Found",
    robots: {
      index: false,
      follow: false,
    },
  };
};
