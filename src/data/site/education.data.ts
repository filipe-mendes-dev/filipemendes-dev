export interface EducationItem {
  title: string;
  period?: string;
  details?: string;
  context?: string;
}

export const educationData: EducationItem[] = [
  {
    title: "MSc in Engineering Physics",
    period: "2015 — 2021",
    details: "Instituto Superior Técnico, University of Lisbon",
    context:
      "Completed coursework in software engineering, machine learning and scientific computing.",
  },
];
