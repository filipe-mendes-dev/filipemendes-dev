export interface EducationItem {
  title: string;
  period?: string;
  details?: string;
}

export const educationData: EducationItem[] = [
  {
    title: "MSc in Engineering Physics",
    period: "Sep 2015 - Jan 2021",
    details:
      "Instituto Superior Tecnico - IST. Thesis on applying neural networks to radiation source localization, which marked the transition into software development and strengthened skills in machine learning, data analysis, and technical problem-solving.",
  },
];
