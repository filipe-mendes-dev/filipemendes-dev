export interface PersonData {
  name: string;
  currentStatus: string;
  portrait: {
    alt: string;
    url: string;
    srcSet: string;
    sizes: string;
  };
}

export const personData: PersonData = {
  name: "Filipe Mendes",
  currentStatus: "Based in Madeira, Portugal.",
  portrait: {
    alt: "Portrait of Filipe Mendes from CV",
    url: "/images/filipe-mendes-250.webp",
    srcSet:
      "/images/filipe-mendes-250.webp 250w, /images/filipe-mendes-500.webp 500w",
    sizes: "(min-width: 64rem) 192px, (min-width: 48rem) 176px, 152px",
  },
};
