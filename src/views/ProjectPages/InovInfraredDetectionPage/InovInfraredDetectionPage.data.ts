import type { Metadata } from "next";

import { siteData } from "../../../data/site/site.data";
import type {
  ProjectDetailHeroData,
  ProjectScreenshotItem,
} from '../ProjectDetailPage';

export const inovInfraredDetectionHero: ProjectDetailHeroData = {
  name: "INOV Infrared Detection Research",
  logo: {
    logoText: "IN",
  },
  category: "Applied Machine Learning",
  description:
    "Research and engineering work on real-time infrared image classification using EfficientDet, TensorFlow, and OpenCV.",
  positioning:
    "Positioning: computer vision and data pipeline work delivered as a Software Engineer at INOV.",
  isMobileApp: false,
  links: [
    {
      label: "Conference Publication",
      href: "https://doi.org/10.1109/ICECET55527.2022.9872921",
    },
  ],
};

export const inovInfraredDetectionScreenshots: ProjectScreenshotItem[] = [];

export const inovInfraredDetectionKeyFeatures: string[] = [
  "Real-time detection for vehicles, people, and deer",
  "Infrared footage collection and labeling for training",
  "Conference publication and presentation based on the work",
];

export const inovInfraredDetectionArchitecture: string[] = [
  "EfficientDet neural network model adapted for infrared image classification",
  "Training workflow supported by curated and labeled thermal datasets",
  "Computer vision pipeline implemented with TensorFlow and OpenCV",
];

export const inovInfraredDetectionTechStack: string[] = [
  "Python",
  "TensorFlow",
  "OpenCV",
  "EfficientDet",
];

const title = `${inovInfraredDetectionHero.name} | ${siteData.siteTitle}`;

export const inovInfraredDetectionMetadata: Metadata = {
  title,
  description: inovInfraredDetectionHero.description,
  openGraph: {
    title,
    description: inovInfraredDetectionHero.description,
    type: "article",
  },
  twitter: {
    card: "summary",
    title,
    description: inovInfraredDetectionHero.description,
  },
};
