export interface PersonData {
  name: string;
  currentStatus: string;
  portrait: {
    alt: string;
    url: string;
    srcSet: string;
    sizes: string;
    printUrl: string;
    printSrcSet: string;
  };
}

export const personData: PersonData = {
  name: "Filipe Mendes",
  currentStatus: "Madeira, Portugal",
  portrait: {
    alt: "Portrait of Filipe Mendes from CV",
    url: "/images/profile-pictures/filipe-mendes-250.webp",
    srcSet:
      "/images/profile-pictures/filipe-mendes-250.webp 250w, /images/profile-pictures/filipe-mendes-500.webp 500w",
    sizes: "(min-width: 64rem) 192px, (min-width: 48rem) 176px, 152px",
    printUrl: "/images/profile-pictures/profile-picture.png",
    printSrcSet: "/images/profile-pictures/profile-picture.png 1643w",
  },
};
