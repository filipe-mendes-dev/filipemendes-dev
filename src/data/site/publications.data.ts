export interface PublicationItem {
  title: string;
  venue?: string;
  year?: string;
  href?: string;
}

export const publicationsData: PublicationItem[] = [
  {
    title:
      "Radioactive hot-spot localisation and identification using deep learning",
    venue: "Journal of Radiological Protection",
    year: "2021",
    href: "https://doi.org/10.1088/1361-6498/ac1a5c",
  },
  {
    title:
      "Study on the Application of EfficientDet to Real-Time Classification of Infrared Images from Video Surveillance",
    venue:
      "2022 International Conference on Electrical, Computer and Energy Technologies (ICECET)",
    year: "2022",
    href: "https://doi.org/10.1109/ICECET55527.2022.9872921",
  },
];
