import type { ProjectRecord } from "../projects.interfaces";

export const project: ProjectRecord = {
  id: "inov-infrared-detection",
  slug: "inov-infrared-detection",
  name: "INOV Infrared Detection Research",
  logo: {
    logoText: "IN",
  },
  category: "Applied Machine Learning",
  isProfessional: true,
  description:
    "Research and engineering work on real-time infrared image classification using EfficientDet, TensorFlow, and OpenCV.",
  narrative: {
    problem:
      "The project needed real-time detection of vehicles, people, and deer from infrared video surveillance data.",
    approach:
      "Developed EfficientDet-based detection solutions, collected and labeled infrared footage, tuned training parameters, and organized a real-world data acquisition event.",
    stack: "Python, TensorFlow, OpenCV, EfficientDet.",
    outcome:
      "Produced research that was published and presented at the 2022 International Conference on Electrical, Computer and Energy Technologies.",
  },
};
