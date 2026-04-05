import {
  createProjectMetadata,
  type ProjectDetailContent,
} from "../projects.interfaces";
import { project } from "./project.data";

export const projectDetail: ProjectDetailContent = {
  hero: {
    name: project.name,
    logo: project.logo,
    category: project.category,
    description: project.description,
    positioning:
      "Positioning: computer vision and data pipeline work delivered as a Software Engineer at INOV.",
    isMobileApp: false,
    links: [
      {
        label: "Conference Publication",
        href: "https://doi.org/10.1109/ICECET55527.2022.9872921",
      },
    ],
  },
  screenshots: {
    items: [],
  },
  keyFeatures: [
    {
      title: "Real-time detection for vehicles, people, and deer",
    },
    {
      title: "Infrared footage collection and labeling for training",
    },
    {
      title: "Conference publication and presentation based on the work",
    },
  ],
  architecture: [
    {
      title:
        "EfficientDet neural network model adapted for infrared image classification",
    },
    {
      title: "Training workflow supported by curated and labeled thermal datasets",
    },
    {
      title: "Computer vision pipeline implemented with TensorFlow and OpenCV",
    },
  ],
  techStack: ["Python", "TensorFlow", "OpenCV", "EfficientDet"],
  metadata: createProjectMetadata(
    project.name,
    project.description,
  ),
};
